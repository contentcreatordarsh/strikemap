type Props = {
  label: string;
  variant?: "default" | "urgent";
};

export default function GameTimer({ label, variant = "default" }: Props) {
  return (
    <div className={`sm-game-timer sm-game-timer--${variant}`}>
      <span className="sm-game-timer__value sm-brand-font">{label}</span>
      <style jsx>{`
        .sm-game-timer {
          text-align: center;
        }
        .sm-game-timer__value {
          font-size: 1.25rem;
          letter-spacing: 0.12em;
        }
        .sm-game-timer--urgent .sm-game-timer__value {
          color: var(--sm-accent-red);
        }
      `}</style>
    </div>
  );
}
