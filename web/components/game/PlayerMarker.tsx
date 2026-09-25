type Props = {
  team: "RED" | "BLUE";
  label?: string;
  size?: "sm" | "md";
};

export default function PlayerMarker({ team, label, size = "md" }: Props) {
  const color = team === "RED" ? "var(--sm-team-red)" : "var(--sm-team-blue)";
  return (
    <span className={`sm-player-marker sm-player-marker--${size}`} title={label}>
      <span className="sm-player-marker__dot" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      {label ? <span className="sm-player-marker__label">{label}</span> : null}
      <style jsx>{`
        .sm-player-marker {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .sm-player-marker__dot {
          border-radius: 50%;
          border: 2px solid #fff;
          flex-shrink: 0;
        }
        .sm-player-marker--md .sm-player-marker__dot {
          width: 12px;
          height: 12px;
        }
        .sm-player-marker--sm .sm-player-marker__dot {
          width: 8px;
          height: 8px;
        }
        .sm-player-marker__label {
          font-size: 0.7rem;
          color: var(--sm-text-secondary);
        }
      `}</style>
    </span>
  );
}
