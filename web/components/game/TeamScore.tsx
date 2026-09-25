type Props = {
  team: "RED" | "BLUE";
  score: number;
};

export default function TeamScore({ team, score }: Props) {
  const isRed = team === "RED";
  return (
    <div className={`sm-team-score sm-team-score--${team.toLowerCase()}`}>
      <span className="sm-team-score__label sm-brand-font">{team}</span>
      <span className="sm-team-score__value">{score.toLocaleString()}</span>
      <style jsx>{`
        .sm-team-score {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 5rem;
        }
        .sm-team-score__label {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
        }
        .sm-team-score__value {
          font-family: var(--sm-font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .sm-team-score--red .sm-team-score__label,
        .sm-team-score--red .sm-team-score__value {
          color: var(--sm-team-red);
        }
        .sm-team-score--blue {
          text-align: right;
        }
        .sm-team-score--blue .sm-team-score__label,
        .sm-team-score--blue .sm-team-score__value {
          color: var(--sm-team-blue);
        }
      `}</style>
    </div>
  );
}
