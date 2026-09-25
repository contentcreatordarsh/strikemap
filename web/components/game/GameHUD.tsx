import TeamScore from "./TeamScore";
import GameTimer from "./GameTimer";
import TerritoryStatus from "./TerritoryStatus";

type Props = {
  redScore: number;
  blueScore: number;
  timerLabel: string;
  sectorLabel?: string;
  captureProgress?: number;
  capturingTeam?: "RED" | "BLUE" | null;
  contested?: boolean;
};

export default function GameHUD({
  redScore,
  blueScore,
  timerLabel,
  sectorLabel = "Sector 01",
  captureProgress = 0,
  capturingTeam,
  contested,
}: Props) {
  return (
    <div className="sm-game-hud">
      <header className="sm-game-hud__top sm-glass-panel">
        <TeamScore team="RED" score={redScore} />
        <GameTimer label={timerLabel} />
        <TeamScore team="BLUE" score={blueScore} />
      </header>
      <footer className="sm-game-hud__bottom">
        <TerritoryStatus
          sectorLabel={sectorLabel}
          progress={captureProgress}
          capturingTeam={capturingTeam}
          contested={contested}
        />
      </footer>
      <style jsx>{`
        .sm-game-hud {
          position: fixed;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--sm-space-md);
        }
        .sm-game-hud__top {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
        }
        .sm-game-hud__bottom {
          pointer-events: auto;
          max-width: 420px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
