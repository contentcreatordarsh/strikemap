"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import GlassPanel from "./GlassPanel";
import CTAButton from "./CTAButton";
import { DEMO_BATTLES, fetchPublicBattles, type BattleCard } from "@/lib/battles";

type Props = {
  onJoin: (battle: BattleCard) => void;
  onCreate: () => void;
};

export default function LiveBattlesSection({ onJoin, onCreate }: Props) {
  const [battles, setBattles] = useState<BattleCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublicBattles()
      .then((list) => {
        if (!cancelled) setBattles(list);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not reach battle service");
          setBattles(DEMO_BATTLES);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = battles === null;
  const isDemo = battles === DEMO_BATTLES || (battles?.every((b) => b.demo) ?? false);

  return (
    <section className="sm-section sm-container" id="battles">
      <SectionHeading
        eyebrow="Live"
        title="Live battles"
        subtitle={
          isDemo
            ? "Showing demo listings until the public games API is available."
            : "Join an active battle in your region."
        }
      />
      {loading ? (
        <div className="sm-loading">
          <p>Connecting to battlefield…</p>
          <div className="sm-loading-bar" />
        </div>
      ) : error ? (
        <p className="sm-battles__error sm-status sm-status--warning">
          <span className="sm-status-indicator" />
          {error}
        </p>
      ) : null}
      {!loading && battles && battles.length === 0 ? (
        <GlassPanel className="sm-battles__empty">
          <p className="sm-brand-font">No active battles</p>
          <p>Create the first battle.</p>
          <CTAButton variant="primary" onClick={onCreate}>Create battle</CTAButton>
        </GlassPanel>
      ) : null}
      {!loading && battles && battles.length > 0 ? (
        <ul className="sm-battles__list">
          {battles.map((b) => (
            <li key={b.id}>
              <GlassPanel className="sm-battles__card">
                <div className="sm-battles__head">
                  <h3 className="sm-brand-font">{b.title}</h3>
                  {b.demo ? <span className="sm-badge">Demo</span> : null}
                </div>
                <div className="sm-battles__scores">
                  <span className="sm-battles__red">Red {b.redCount}</span>
                  <span className="sm-battles__time">{b.timeRemaining}</span>
                  <span className="sm-battles__blue">Blue {b.blueCount}</span>
                </div>
                <CTAButton variant="ghost" fullWidth onClick={() => onJoin(b)}>Join</CTAButton>
              </GlassPanel>
            </li>
          ))}
        </ul>
      ) : null}
      <style jsx>{`
        .sm-battles__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .sm-battles__card h3 {
          margin: 0;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
        }
        .sm-battles__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .sm-battles__scores {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.8rem;
        }
        .sm-battles__red {
          color: var(--sm-team-red);
        }
        .sm-battles__blue {
          color: var(--sm-team-blue);
        }
        .sm-battles__time {
          font-family: var(--sm-font-display);
          letter-spacing: 0.08em;
          color: var(--sm-text-secondary);
        }
        .sm-battles__empty {
          text-align: center;
        }
        .sm-battles__empty p:first-child {
          margin: 0 0 0.5rem;
        }
        .sm-battles__error {
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
}
