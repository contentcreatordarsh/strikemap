"use client";

import { useEffect, useMemo, useState } from "react";
import GameShell from "@/components/game/GameShell";
import GameMap from "@/components/game/GameMap";
import GameHUD from "@/components/game/GameHUD";
import { useGameSocket } from "@/hooks/useGameSocket";
import { ConnectingState, SignalLost, BattleComplete } from "@/components/game/ConnectionStates";
import type { TeamColor } from "@/lib/contracts/game";

function readParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function GameClient() {
  const [gameId, setGameId] = useState("");
  const [started, setStarted] = useState(true);

  useEffect(() => {
    const id = readParams().get("id");
    if (id) setGameId(id);
    else window.location.href = "/demo/";
  }, []);

  const { snapshot, status, finished } = useGameSocket({
    gameId,
    demo: false,
    enabled: started && Boolean(gameId),
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
      {!snapshot && status === "offline" ? (
        gameId ? (
          <SignalLost onRetry={() => window.location.reload()} />
        ) : (
          <ConnectingState />
        )
      ) : null}
      <div className="sm-game-viewport">
        <GameMap snapshot={snapshot} center={snapshot?.game.center} />
      </div>
      <style jsx>{`
        .sm-game-viewport {
          position: relative;
          height: 100vh;
          height: 100dvh;
        }
      `}</style>
    </GameShell>
  );
}
