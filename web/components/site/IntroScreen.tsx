"use client";

import { useEffect, useState } from "react";
import CTAButton from "./CTAButton";
import TacticalGrid from "./TacticalGrid";

const STORAGE_KEY = "strikemap_intro_entered";

type Props = {
  onEnter: () => void;
};

export function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markIntroEntered(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export default function IntroScreen({ onEnter }: Props) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleEnter = () => {
    markIntroEntered();
    setLeaving(true);
    window.setTimeout(() => onEnter(), 520);
  };

  return (
    <div
      className={`sm-intro ${visible ? "sm-intro--visible" : ""} ${leaving ? "sm-intro--leave" : ""}`}
      role="dialog"
      aria-label="Enter StrikeMap"
    >
      <TacticalGrid intensity="low" />
      <div className="sm-intro__content">
        <p className="sm-intro__signal">Tactical link established</p>
        <h1 className="sm-intro__title sm-brand-font">StrikeMap</h1>
        <CTAButton variant="primary" onClick={handleEnter}>Enter the game</CTAButton>
      </div>
      <style jsx>{`
        .sm-intro {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          background: var(--sm-bg-void);
          opacity: 0;
          transition: opacity var(--sm-duration-slow) var(--sm-ease-out);
        }
        .sm-intro--visible {
          opacity: 1;
        }
        .sm-intro--leave {
          opacity: 0;
          pointer-events: none;
        }
        .sm-intro__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2rem;
        }
        .sm-intro__signal {
          margin: 0 0 1rem;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--sm-text-muted);
        }
        .sm-intro__title {
          margin: 0 0 2rem;
          font-size: clamp(2.5rem, 10vw, 4.5rem);
          letter-spacing: 0.2em;
          text-shadow: 0 0 40px rgba(0, 229, 255, 0.35);
        }
      `}</style>
    </div>
  );
}
