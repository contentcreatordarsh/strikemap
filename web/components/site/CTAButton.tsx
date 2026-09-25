"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  fullWidth?: boolean;
};

export default function CTAButton({
  children,
  variant = "primary",
  href,
  fullWidth,
  className = "",
  ...rest
}: Props) {
  const classes = `sm-cta sm-cta--${variant} ${fullWidth ? "sm-cta--full" : ""} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        <span className="sm-cta__label">{children}</span>
        <style jsx>{ctaStyles}</style>
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      <span className="sm-cta__label">{children}</span>
      <style jsx>{ctaStyles}</style>
    </button>
  );
}

const ctaStyles = `
  .sm-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.6rem;
    font-family: var(--sm-font-display);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-normal) var(--sm-ease-out),
      background var(--sm-duration-fast);
    position: relative;
    overflow: hidden;
  }
  .sm-cta--full {
    width: 100%;
  }
  .sm-cta__label {
    position: relative;
    z-index: 1;
  }
  .sm-cta--primary {
    color: var(--sm-bg-void);
    background: linear-gradient(135deg, var(--sm-glow-cyan), var(--sm-glow-blue));
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: 0 0 24px rgba(0, 229, 255, 0.25);
  }
  .sm-cta--primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 32px rgba(0, 229, 255, 0.4);
    text-decoration: none;
  }
  .sm-cta--ghost {
    color: var(--sm-text-primary);
    background: rgba(0, 229, 255, 0.04);
    border-color: var(--sm-border-strong);
  }
  .sm-cta--ghost:hover {
    background: rgba(0, 229, 255, 0.1);
    text-decoration: none;
  }
  .sm-cta--danger {
    color: #fff;
    background: linear-gradient(135deg, var(--sm-accent-red), var(--sm-accent-magenta));
    border-color: rgba(255, 61, 92, 0.4);
  }
  .sm-cta:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;
