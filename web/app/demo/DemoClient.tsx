"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GameShell from "@/components/game/GameShell";
import GameHUD from "@/components/game/GameHUD";
import { useGameSocket } from "@/hooks/useGameSocket";
import { useGameTimer } from "@/hooks/useGameTimer";
import { ConnectingState, SignalLost, BattleComplete } from "@/components/game/ConnectionStates";
import { api } from "@/lib/api";
import type { TeamColor } from "@/lib/contracts/game";

const GameMap = dynamic(() => import("@/components/game/GameMap"), { ssr: false });

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
  const timerLabel = useGameTimer(snapshot?.game.endsAt);

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

  const showConnecting = !ready || (!snapshot && (status === "offline" || status === "reconnecting"));

  return (
    <GameShell
      hud={
        snapshot ? (
          <GameHUD
            redScore={redScore}
            blueScore={blueScore}
            timerLabel={timerLabel}
            timerUrgent={timerLabel !== "—:—" && timerLabel.startsWith("00:")}
            sectorLabel={activeTerritory?.id ?? "Sector 01"}
            captureProgress={activeTerritory?.captureProgress ?? 0}
            capturingTeam={capturingTeam === "RED" || capturingTeam === "BLUE" ? capturingTeam : null}
            contested={activeTerritory?.status === "CONTESTED"}
          />
        ) : null
      }
    >
      <div className="sm-demo-banner sm-badge">Demo mode — simulated battle</div>
      {showConnecting ? (
        initError ? (
          <SignalLost onRetry={() => window.location.reload()} />
        ) : (
          <ConnectingState />
        )
      ) : null}
      <div className="sm-game-viewport">
        {ready ? <GameMap snapshot={snapshot} /> : null}
      </div>
      <style jsx>{`
        .sm-demo-banner {
          position: fixed;
          top: calc(var(--sm-nav-height) + var(--sm-safe-top) + 0.5rem);
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
