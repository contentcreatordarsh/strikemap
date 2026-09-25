"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GameShell from "@/components/game/GameShell";
import GameHUD from "@/components/game/GameHUD";
import { useGameSocket } from "@/hooks/useGameSocket";
import { useGameTimer } from "@/hooks/useGameTimer";
import { ConnectingState, SignalLost, BattleComplete } from "@/components/game/ConnectionStates";
import type { TeamColor } from "@/lib/contracts/game";

const GameMap = dynamic(() => import("@/components/game/GameMap"), { ssr: false });

function readParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function GameClient() {
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    const id = readParams().get("id");
    if (id) setGameId(id);
    else window.location.href = "/demo/";
  }, []);

  const { snapshot, status, finished } = useGameSocket({
    gameId,
    demo: false,
    enabled: Boolean(gameId),
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

  const showLost = gameId && !snapshot && status === "offline";

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
      {!gameId ? <ConnectingState /> : null}
      {showLost ? <SignalLost onRetry={() => window.location.reload()} /> : null}
      {!snapshot && status === "reconnecting" ? (
        <div className="sm-reconnect-banner sm-badge">Reconnecting…</div>
      ) : null}
      <div className="sm-game-viewport">
        {gameId ? <GameMap snapshot={snapshot} center={snapshot?.game.center} /> : null}
      </div>
      <style jsx>{`
        .sm-game-viewport {
          position: relative;
          height: 100vh;
          height: 100dvh;
        }
        .sm-reconnect-banner {
          position: fixed;
          top: calc(var(--sm-nav-height) + var(--sm-safe-top) + 0.5rem);
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
        }
      `}</style>
    </GameShell>
  );
}
