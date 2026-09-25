"use client";

import { useEffect, useMemo, useState } from "react";
import GameShell from "@/components/game/GameShell";
import GameMap from "@/components/game/GameMap";
import GameHUD from "@/components/game/GameHUD";
import { useGameSocket } from "@/hooks/useGameSocket";
import { ConnectingState, SignalLost, BattleComplete } from "@/components/game/ConnectionStates";
import { api } from "@/lib/api";
import type { TeamColor } from "@/lib/contracts/game";

const DEMO_ID = "demo_city_battle";

export default function DemoClient() {
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState(false);

  useEffect(() => {
    api("/api/v1/games/demo/init", { method: "POST", body: "{}" })
      .then(() => setReady(true))
      .catch(() => {
        setInitError(true);
        setReady(true);
      });
  }, []);

  const { snapshot, status, finished } = useGameSocket({
    gameId: DEMO_ID,
    demo: true,
    enabled: ready,
  });

  const redScore = snapshot?.teams.find((t) => t.color === "RED")?.score ?? 0;
  const blueScore = snapshot?.teams.find((t) => t.color === "BLUE")?.score ?? 0;

  const timerLabel = useMemo(() => {
    if (!snapshot?.game.endsAt) return "—:—";
    const end = new Date(snapshot.game.endsAt).getTime();
    const sec = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [snapshot]);

  const activeTerritory = snapshot?.territories.find(
    (t) => t.status === "CONTESTED" || t.captureProgress > 0,
  );

  const capturingTeam = activeTerritory?.contestedBy ?? activeTerritory?.ownerTeam ?? null;

  if (finished) {
    const winner: TeamColor | undefined =
      redScore > blueScore ? "RED" : blueScore > redScore ? "BLUE" : undefined;
    return (
      <GameShell>
        <BattleComplete red={redScore} blue={blueScore} winner={winner} />
      </GameShell>
    );
  }

  return (
    <GameShell
      hud={
        snapshot ? (
          <GameHUD
            redScore={redScore}
            blueScore={blueScore}
            timerLabel={timerLabel}
            sectorLabel={activeTerritory?.id ?? "Sector 01"}
            captureProgress={activeTerritory?.captureProgress ?? 0}
            capturingTeam={capturingTeam === "RED" || capturingTeam === "BLUE" ? capturingTeam : null}
            contested={activeTerritory?.status === "CONTESTED"}
          />
        ) : null
      }
    >
      <div className="sm-demo-banner sm-badge">Demo mode — simulated battle</div>
      {!ready || (!snapshot && status === "offline") ? (
        initError ? (
          <SignalLost onRetry={() => window.location.reload()} />
        ) : (
          <ConnectingState />
        )
      ) : null}
      <div className="sm-game-viewport">
        <GameMap snapshot={snapshot} />
      </div>
      <style jsx>{`
        .sm-demo-banner {
          position: fixed;
          top: calc(var(--sm-nav-height) + 0.5rem);
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
        }
        .sm-game-viewport {
          position: relative;
          height: 100vh;
          height: 100dvh;
        }
      `}</style>
    </GameShell>
  );
}
