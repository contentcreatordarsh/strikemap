"use client";

import CTAButton from "../site/CTAButton";

export function ConnectingState() {
  return (
    <div className="sm-loading">
      <p>Connecting to battlefield…</p>
      <div className="sm-loading-bar" />
    </div>
  );
}

export function SignalLost({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="sm-signal-lost sm-glass-panel">
      <h2 className="sm-brand-font">Signal lost</h2>
      <p>Unable to connect to the battlefield.</p>
      <CTAButton variant="primary" onClick={onRetry}>Retry</CTAButton>
      <style jsx>{`
        .sm-signal-lost {
          text-align: center;
          max-width: 360px;
          margin: 2rem auto;
          padding: 2rem;
        }
        h2 {
          margin: 0 0 0.5rem;
          color: var(--sm-accent-red);
        }
        p {
          color: var(--sm-text-secondary);
          margin: 0 0 1.25rem;
        }
      `}</style>
    </div>
  );
}

export function BattleComplete({
  red,
  blue,
  winner,
}: {
  red: number;
  blue: number;
  winner?: "RED" | "BLUE";
}) {
  return (
    <div className="sm-battle-complete sm-glass-panel">
      <h2 className="sm-brand-font">Battle complete</h2>
      <div className="sm-battle-complete__scores">
        <div>
          <span>Red</span>
          <strong>{red.toLocaleString()}</strong>
        </div>
        <div>
          <span>Blue</span>
          <strong>{blue.toLocaleString()}</strong>
        </div>
      </div>
      {winner ? <p className="sm-battle-complete__winner">Victory — {winner}</p> : null}
      <div className="sm-battle-complete__actions">
        <CTAButton href="/demo/" variant="primary">Play again</CTAButton>
        <CTAButton href="/" variant="ghost">Return home</CTAButton>
      </div>
      <style jsx>{`
        .sm-battle-complete {
          text-align: center;
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
        }
        h2 {
          margin: 0 0 1.5rem;
        }
        .sm-battle-complete__scores {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 1rem;
        }
        .sm-battle-complete__scores span {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: var(--sm-text-muted);
        }
        .sm-battle-complete__scores strong {
          font-family: var(--sm-font-display);
          font-size: 2rem;
        }
        .sm-battle-complete__winner {
          color: var(--sm-glow-cyan);
          letter-spacing: 0.1em;
        }
        .sm-battle-complete__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}
