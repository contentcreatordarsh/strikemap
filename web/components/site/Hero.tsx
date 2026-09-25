"use client";

import CTAButton from "./CTAButton";
import GlassPanel from "./GlassPanel";
import ScrollIndicator from "./ScrollIndicator";
import TacticalGrid from "./TacticalGrid";

type Props = {
  activeBattles?: number;
  demoBattles?: boolean;
  onPlay?: () => void;
  onCreate?: () => void;
};

export default function Hero({
  activeBattles = 0,
  demoBattles = true,
  onPlay,
  onCreate,
}: Props) {
  const displayCount = demoBattles && activeBattles === 0 ? 12 : activeBattles;

  return (
    <section className="sm-hero" id="play">
      <TacticalGrid />
      <div className="sm-container sm-hero__grid">
        <div className="sm-hero__copy">
          <span className="sm-badge sm-badge--live">
            <span className="sm-badge-dot" />
            Live multiplayer
          </span>
          <h1 className="sm-hero__title sm-brand-font">
            StrikeMap
          </h1>
          <p className="sm-hero__lines sm-brand-font">
            Real world.<br />
            Real players.<br />
            One battlefield.
          </p>
          <div className="sm-hero__cta">
            <CTAButton variant="primary" onClick={onPlay}>Play now</CTAButton>
            <CTAButton variant="ghost" onClick={onCreate}>Create battle</CTAButton>
            <CTAButton href="/demo/" variant="ghost">Watch demo</CTAButton>
          </div>
          <GlassPanel className="sm-hero__stat">
            <p className="sm-hero__stat-label">Live battles</p>
            <p className="sm-hero__stat-value">
              {displayCount}
              <span> active{demoBattles && activeBattles === 0 ? " · demo" : ""}</span>
            </p>
          </GlassPanel>
        </div>
        <div className="sm-hero__viz" aria-hidden="true">
          <div className="sm-hero__viz-frame sm-glass-panel">
            <div className="sm-hero__radar" />
            <div className="sm-hero__zone sm-hero__zone--red" />
            <div className="sm-hero__zone sm-hero__zone--blue" />
            <div className="sm-hero__marker sm-hero__marker--a" />
            <div className="sm-hero__marker sm-hero__marker--b" />
            <div className="sm-hero__marker sm-hero__marker--c" />
            <p className="sm-hero__meta sm-brand-font">Sector grid · live</p>
          </div>
        </div>
      </div>
      <ScrollIndicator />
      <style jsx>{`
        .sm-hero {
          position: relative;
          min-height: calc(100vh - var(--sm-nav-height));
          padding: calc(var(--sm-nav-height) + 2rem) 0 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .sm-hero__grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: var(--sm-space-xl);
          align-items: center;
        }
        @media (max-width: 900px) {
          .sm-hero__grid {
            grid-template-columns: 1fr;
          }
        }
        .sm-hero__title {
          margin: 1rem 0 0.5rem;
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1;
          letter-spacing: 0.12em;
        }
        .sm-hero__lines {
          margin: 0;
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          line-height: 1.35;
          color: var(--sm-text-secondary);
          letter-spacing: 0.08em;
        }
        .sm-hero__cta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: var(--sm-space-lg);
        }
        .sm-hero__stat {
          margin-top: var(--sm-space-lg);
          max-width: 220px;
        }
        .sm-hero__stat-label {
          margin: 0;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--sm-text-muted);
        }
        .sm-hero__stat-value {
          margin: 0.35rem 0 0;
          font-family: var(--sm-font-display);
          font-size: 2rem;
          font-weight: 700;
        }
        .sm-hero__stat-value span {
          font-size: 0.75rem;
          color: var(--sm-text-muted);
          margin-left: 0.35rem;
        }
        .sm-hero__viz-frame {
          position: relative;
          min-height: 320px;
          overflow: hidden;
        }
        .sm-hero__radar {
          position: absolute;
          inset: 20%;
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: 50%;
          animation: radar 4s linear infinite;
        }
        .sm-hero__zone {
          position: absolute;
          width: 120px;
          height: 90px;
          border: 1px dashed;
          opacity: 0.5;
        }
        .sm-hero__zone--red {
          top: 25%;
          left: 15%;
          border-color: var(--sm-team-red);
          background: rgba(255, 71, 87, 0.08);
        }
        .sm-hero__zone--blue {
          bottom: 20%;
          right: 18%;
          border-color: var(--sm-team-blue);
          background: rgba(59, 157, 255, 0.08);
        }
        .sm-hero__marker {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        .sm-hero__marker--a {
          top: 40%;
          left: 45%;
          background: var(--sm-team-red);
          box-shadow: 0 0 12px var(--sm-team-red);
        }
        .sm-hero__marker--b {
          top: 55%;
          left: 62%;
          background: var(--sm-team-blue);
          animation: float 3s ease-in-out infinite;
        }
        .sm-hero__marker--c {
          top: 30%;
          right: 28%;
          background: var(--sm-glow-cyan);
          animation: float 3.5s ease-in-out infinite reverse;
        }
        .sm-hero__meta {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          margin: 0;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--sm-text-muted);
        }
        @keyframes radar {
          from {
            transform: scale(0.6);
            opacity: 0.6;
          }
          to {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-hero__radar,
          .sm-hero__marker--b,
          .sm-hero__marker--c {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
