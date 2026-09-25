type Props = {
  sectorLabel: string;
  progress: number;
  capturingTeam?: "RED" | "BLUE" | null;
  contested?: boolean;
};

export default function TerritoryStatus({
  sectorLabel,
  progress,
  capturingTeam,
  contested,
}: Props) {
  const pct = Math.min(100, Math.max(0, progress));
  const teamColor =
    capturingTeam === "RED"
      ? "var(--sm-team-red)"
      : capturingTeam === "BLUE"
        ? "var(--sm-team-blue)"
        : "var(--sm-glow-cyan)";

  return (
    <div className="sm-territory-status sm-glass-panel">
      <p className="sm-territory-status__label">
        Territory: <strong>{sectorLabel}</strong>
        {contested ? <span className="sm-territory-status__contested"> · Contested</span> : null}
      </p>
      <div className="sm-territory-status__bar">
        <div
          className="sm-territory-status__fill"
          style={{ width: `${pct}%`, background: teamColor }}
        />
      </div>
      <p className="sm-territory-status__meta">
        {pct}% {capturingTeam ? `· Capturing — ${capturingTeam}` : ""}
      </p>
      <style jsx>{`
        .sm-territory-status {
          padding: var(--sm-space-md) var(--sm-space-lg);
        }
        .sm-territory-status__label {
          margin: 0 0 0.5rem;
          font-size: 0.8rem;
          color: var(--sm-text-secondary);
        }
        .sm-territory-status__contested {
          color: var(--sm-accent-magenta);
        }
        .sm-territory-status__bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 1px;
          overflow: hidden;
        }
        .sm-territory-status__fill {
          height: 100%;
          transition: width var(--sm-duration-normal) var(--sm-ease-out);
        }
        .sm-territory-status__meta {
          margin: 0.35rem 0 0;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sm-text-muted);
        }
      `}</style>
    </div>
  );
}
