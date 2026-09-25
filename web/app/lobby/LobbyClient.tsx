"use client";

import { useEffect, useState } from "react";
import BackgroundFX from "@/components/site/BackgroundFX";
import SiteNav from "@/components/site/SiteNav";
import BattleLobby, { type LobbyPlayer } from "@/components/game/BattleLobby";
import { ConnectingState, SignalLost } from "@/components/game/ConnectionStates";
import { api } from "@/lib/api";

function readParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function LobbyClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [code, setCode] = useState("STRIKE-000");
  const [gameId, setGameId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [red, setRed] = useState<LobbyPlayer[]>([]);
  const [blue, setBlue] = useState<LobbyPlayer[]>([]);

  useEffect(() => {
    const params = readParams();
    const id = params.get("id") ?? "";
    const joinCode = params.get("code") ?? "";
    setIsHost(params.get("host") === "1");
    setCode(joinCode || "…");

    const load = async () => {
      try {
        const key = id || joinCode;
        if (!key) {
          setError(true);
          setLoading(false);
          return;
        }
        const token = typeof window !== "undefined" ? localStorage.getItem("sm_bearer_token") : null;
        if (token && joinCode && !id) {
          try {
            await api(`/api/v1/games/${joinCode}/join`, { method: "POST", body: "{}" });
          } catch {
            /* may already be a member */
          }
        }
        const data = await api<{
          game: { id: string; code: string };
          teams: { color: string; playerCount: number }[];
        }>(`/api/v1/games/${key}`);
        setGameId(data.game.id);
        setCode(data.game.code);
        const redCount = data.teams.find((t) => t.color === "RED")?.playerCount ?? 0;
        const blueCount = data.teams.find((t) => t.color === "BLUE")?.playerCount ?? 0;
        setRed(
          Array.from({ length: redCount }, (_, i) => ({
            id: `red-${i}`,
            name: `Player ${i + 1}`,
            team: "RED" as const,
          })),
        );
        setBlue(
          Array.from({ length: blueCount }, (_, i) => ({
            id: `blue-${i}`,
            name: `Player ${i + 1}`,
            team: "BLUE" as const,
          })),
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const startBattle = async () => {
    await api(`/api/v1/games/${gameId}/start`, { method: "POST", body: "{}" });
    const team = readParams().get("team") ?? "blue";
    window.location.href = `/game/?id=${gameId}&team=${team}`;
  };

  return (
    <div className="sm-page-shell">
      <BackgroundFX />
      <SiteNav />
      <main className="sm-main sm-container sm-section" style={{ paddingTop: "var(--sm-nav-height)" }}>
        {loading ? <ConnectingState /> : null}
        {error ? <SignalLost onRetry={() => window.location.reload()} /> : null}
        {!loading && !error ? (
          <BattleLobby
            battleCode={code}
            red={red}
            blue={blue}
            isHost={isHost}
            onStart={startBattle}
            onReady={() => undefined}
          />
        ) : null}
      </main>
    </div>
  );
}
