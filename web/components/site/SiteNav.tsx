"use client";

import { useState } from "react";
import CTAButton from "./CTAButton";

const links = [
  { href: "#world", label: "The World" },
  { href: "#battles", label: "Live Battles" },
  { href: "/map/", label: "Intel Map" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sm-nav">
      <div className="sm-nav__inner sm-container">
        <a href="/" className="sm-nav__brand sm-brand-font">StrikeMap</a>
        <nav className={`sm-nav__links ${open ? "sm-nav__links--open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <CTAButton href="#play" variant="primary">Play Now</CTAButton>
        </nav>
        <button
          type="button"
          className="sm-nav__toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <style jsx>{`
        .sm-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--sm-nav-height);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--sm-border);
          background: rgba(3, 5, 8, 0.72);
          backdrop-filter: blur(12px);
        }
        .sm-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .sm-nav__brand {
          font-size: 0.85rem;
          color: var(--sm-text-primary);
          text-decoration: none;
        }
        .sm-nav__brand:hover {
          text-decoration: none;
          color: var(--sm-glow-cyan);
        }
        .sm-nav__links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .sm-nav__links a:not(.sm-cta) {
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--sm-text-secondary);
          text-decoration: none;
        }
        .sm-nav__links a:not(.sm-cta):hover {
          color: var(--sm-text-primary);
        }
        .sm-nav__toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        }
        .sm-nav__toggle span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--sm-text-primary);
        }
        @media (max-width: 768px) {
          .sm-nav__toggle {
            display: flex;
          }
          .sm-nav__links {
            position: fixed;
            top: var(--sm-nav-height);
            left: 0;
            right: 0;
            flex-direction: column;
            padding: 1.5rem;
            background: rgba(6, 10, 18, 0.96);
            border-bottom: 1px solid var(--sm-border);
            transform: translateY(-120%);
            opacity: 0;
            pointer-events: none;
            transition:
              transform var(--sm-duration-normal) var(--sm-ease-out),
              opacity var(--sm-duration-normal);
          }
          .sm-nav__links--open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
        }
      `}</style>
    </header>
  );
}
