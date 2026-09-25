"use client";

export default function ScrollIndicator() {
  return (
    <div className="sm-scroll-cue" aria-hidden="true">
      <span className="sm-scroll-cue__text">Scroll</span>
      <span className="sm-scroll-cue__line" />
      <style jsx>{`
        .sm-scroll-cue {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-top: var(--sm-space-xl);
          opacity: 0.6;
        }
        .sm-scroll-cue__text {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sm-text-muted);
        }
        .sm-scroll-cue__line {
          width: 1px;
          height: 40px;
          background: linear-gradient(var(--sm-glow-cyan), transparent);
          animation: scroll-pulse 2s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0%,
          100% {
            transform: scaleY(0.6);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-scroll-cue__line {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
