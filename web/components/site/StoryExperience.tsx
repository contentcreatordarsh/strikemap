"use client";

import SectionHeading from "./SectionHeading";
import GlassPanel from "./GlassPanel";
import PlayerMarker from "../game/PlayerMarker";

const steps = ["Move", "Contest", "Capture", "Control"];

export default function StoryExperience() {
  return (
    <div className="sm-story">
      <section className="sm-section sm-container" id="world">
        <SectionHeading
          eyebrow="Section 01"
          title="The world"
          subtitle="The real world becomes your battlefield — streets, parks, and landmarks turn into contested sectors."
        />
        <GlassPanel className="sm-story__panel">
          <div className="sm-story__map-preview" aria-hidden="true">
            <div className="sm-story__grid-lines" />
            <div className="sm-story__boundary" />
            <PlayerMarker team="RED" />
            <PlayerMarker team="BLUE" />
          </div>
        </GlassPanel>
      </section>

      <section className="sm-section sm-container" id="teams">
        <SectionHeading
          eyebrow="Section 02"
          title="Choose your side"
          subtitle="Two forces. One map. Pick red or blue and fight for every meter."
        />
        <div className="sm-story__sides">
          <GlassPanel className="sm-story__side sm-story__side--red">
            <span className="sm-brand-font">Red</span>
            <p>Aggressive pushes. Hold the line.</p>
          </GlassPanel>
          <GlassPanel className="sm-story__side sm-story__side--blue">
            <span className="sm-brand-font">Blue</span>
            <p>Coordinated control. Outmaneuver.</p>
          </GlassPanel>
        </div>
      </section>

      <section className="sm-section sm-container" id="capture">
        <SectionHeading
          eyebrow="Section 03"
          title="Claim territory"
          subtitle="Presence matters. Stay in the zone to flip sectors and stack score."
        />
        <div className="sm-story__steps">
          {steps.map((s, i) => (
            <div key={s} className="sm-story__step" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="sm-brand-font">{s}</span>
            </div>
          ))}
        </div>
        <div className="sm-story__capture-demo sm-glass-panel">
          <div className="sm-story__capture-bar">
            <div className="sm-story__capture-fill" />
          </div>
        </div>
      </section>

      <section className="sm-section sm-container">
        <SectionHeading
          eyebrow="Section 04"
          title="Play with others"
          subtitle="Squad up in lobbies, drop into live battles, and see every move on the map."
        />
        <GlassPanel>
          <div className="sm-story__multi">
            {[1, 2, 3, 4].map((n) => (
              <PlayerMarker key={n} team={n % 2 ? "RED" : "BLUE"} size="sm" />
            ))}
          </div>
        </GlassPanel>
      </section>

      <section className="sm-section sm-container">
        <SectionHeading
          eyebrow="Section 05"
          title="Every second counts"
          subtitle="Battles run on a clock. When time hits zero, the highest score wins."
        />
        <p className="sm-story__timer sm-brand-font">00:00 → BOOM</p>
      </section>

      <section className="sm-section sm-container sm-story__final" id="enter">
        <SectionHeading align="center" eyebrow="Section 06" title="Enter the battle" />
        <p className="sm-story__ready sm-brand-font">Ready?</p>
        <div className="sm-story__final-cta">
          <a href="#battles" className="sm-story__cta-link sm-brand-font">Play StrikeMap</a>
        </div>
      </section>

      <style jsx>{`
        .sm-story__panel {
          min-height: 200px;
        }
        .sm-story__map-preview {
          position: relative;
          min-height: 180px;
          display: flex;
          gap: 2rem;
          align-items: center;
          justify-content: center;
        }
        .sm-story__grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 229, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .sm-story__boundary {
          position: absolute;
          width: 60%;
          height: 55%;
          border: 1px dashed var(--sm-border-strong);
        }
        .sm-story__sides {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .sm-story__sides {
            grid-template-columns: 1fr;
          }
        }
        .sm-story__side span {
          font-size: 1.25rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .sm-story__side--red span {
          color: var(--sm-team-red);
        }
        .sm-story__side--blue span {
          color: var(--sm-team-blue);
        }
        .sm-story__side p {
          margin: 0;
          color: var(--sm-text-secondary);
        }
        .sm-story__steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) {
          .sm-story__steps {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .sm-story__step {
          padding: 1rem;
          text-align: center;
          border: 1px solid var(--sm-border);
          background: rgba(0, 229, 255, 0.03);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
        }
        .sm-story__capture-demo {
          padding: 1.5rem;
        }
        .sm-story__capture-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .sm-story__capture-fill {
          width: 72%;
          height: 100%;
          background: linear-gradient(90deg, var(--sm-team-red), var(--sm-accent-magenta));
          animation: capture-pulse 3s ease-in-out infinite;
        }
        @keyframes capture-pulse {
          0%,
          100% {
            width: 62%;
          }
          50% {
            width: 78%;
          }
        }
        .sm-story__multi {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          padding: 1rem;
        }
        .sm-story__timer {
          font-size: clamp(2rem, 6vw, 3.5rem);
          text-align: center;
          color: var(--sm-glow-cyan);
          margin: 0;
        }
        .sm-story__final {
          text-align: center;
          padding-bottom: var(--sm-space-3xl);
        }
        .sm-story__ready {
          font-size: clamp(2rem, 8vw, 4rem);
          margin: 0 0 1.5rem;
        }
        .sm-story__cta-link {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, var(--sm-glow-cyan), var(--sm-glow-blue));
          color: var(--sm-bg-void);
          text-decoration: none;
          letter-spacing: 0.16em;
          font-size: 0.8rem;
        }
        .sm-story__cta-link:hover {
          text-decoration: none;
          box-shadow: 0 0 32px rgba(0, 229, 255, 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-story__capture-fill {
            animation: none;
            width: 72%;
          }
        }
      `}</style>
    </div>
  );
}
