"use client";

import { useEffect, useRef, useState } from "react";
import type { GameMessage, GameStatePayload } from "@/lib/contracts/events";
import { WS_PROTOCOL_VERSION } from "@/lib/contracts/events";
import { api, getToken } from "@/lib/api";

export type ConnStatus = "live" | "reconnecting" | "offline";

function wsBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    const u = new URL(apiUrl);
    const proto = u.protocol === "https:" ? "wss:" : "ws:";
    return `${proto}//${u.host}`;
  }
  if (typeof window !== "undefined") {
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    return `${proto}://${window.location.host}`;
  }
  return "ws://localhost:8787";
}

export function useGameSocket(opts: { gameId: string; demo?: boolean; enabled: boolean }) {
  const [snapshot, setSnapshot] = useState<GameStatePayload | null>(null);
  const [status, setStatus] = useState<ConnStatus>("offline");
  const [finished, setFinished] = useState(false);
  const lastSequenceRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const retryTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!opts.enabled || !opts.gameId) return;
    let cancelled = false;
    let watchId: number | null = null;

    const connect = async () => {
      if (cancelled) return;
      setStatus(retryRef.current > 0 ? "reconnecting" : "offline");
      let protocols: string[] = [WS_PROTOCOL_VERSION];
      if (!opts.demo) {
        try {
          const { token } = await api<{ token: string }>(
            `/api/v1/games/${opts.gameId}/realtime/connect`,
            { method: "POST", body: "{}" },
          );
          protocols.push(token);
        } catch {
          setStatus("offline");
          return;
        }
      }
      const ws = new WebSocket(`${wsBaseUrl()}/ws/games/${opts.gameId}`, protocols);
      wsRef.current = ws;
      ws.onopen = () => {
        retryRef.current = 0;
        setStatus("live");
      };
      ws.onclose = () => {
        wsRef.current = null;
        if (cancelled) return;
        setStatus(retryRef.current > 0 ? "reconnecting" : "offline");
        retryRef.current += 1;
        retryTimerRef.current = window.setTimeout(
          () => void connect(),
          Math.min(8000, 500 * retryRef.current),
        );
      };
      ws.onmessage = (ev) => {
        const msg = JSON.parse(ev.data) as GameMessage;
        if (msg.sequence > lastSequenceRef.current + 1 && lastSequenceRef.current > 0) {
          ws.send(
            JSON.stringify({
              type: "REQUEST_SNAPSHOT",
              eventId: crypto.randomUUID(),
              serverTime: new Date().toISOString(),
              gameId: opts.gameId,
              sequence: 0,
              payload: {},
            }),
          );
        }
        if (msg.sequence) lastSequenceRef.current = msg.sequence;
        if (msg.type === "GAME_STATE") setSnapshot(msg.payload as GameStatePayload);
        if (msg.type === "GAME_FINISHED") setFinished(true);
        if (msg.type === "SCORE_UPDATED") {
          const p = msg.payload as { scores: Record<string, number> };
          setSnapshot((prev) => {
            if (!prev) return prev;
            const teams = prev.teams.map((t) => ({
              ...t,
              score: p.scores[t.color] ?? t.score,
            }));
            return { ...prev, teams };
          });
        }
      };
    };

    void connect();

    if (navigator.geolocation && !opts.demo && getToken()) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const ws = wsRef.current;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          ws.send(
            JSON.stringify({
              type: "PLAYER_MOVE",
              eventId: crypto.randomUUID(),
              serverTime: new Date().toISOString(),
              gameId: opts.gameId,
              sequence: 0,
              payload: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                accuracyM: pos.coords.accuracy,
                timestamp: new Date().toISOString(),
              },
            }),
          );
        },
        () => undefined,
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 },
      );
    }

    return () => {
      cancelled = true;
      if (retryTimerRef.current) window.clearTimeout(retryTimerRef.current);
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [opts.gameId, opts.demo, opts.enabled]);

  return { snapshot, status, finished };
}
