type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  return (
    <header className={`sm-section-heading sm-section-heading--${align}`}>
      {eyebrow ? <p className="sm-section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="sm-section-heading__title sm-brand-font">{title}</h2>
      {subtitle ? <p className="sm-section-heading__subtitle">{subtitle}</p> : null}
      <style jsx>{`
        .sm-section-heading {
          margin-bottom: var(--sm-space-xl);
        }
        .sm-section-heading--center {
          text-align: center;
        }
        .sm-section-heading__eyebrow {
          margin: 0 0 var(--sm-space-sm);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--sm-glow-cyan);
        }
        .sm-section-heading__title {
          margin: 0;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          line-height: 1.15;
        }
        .sm-section-heading__subtitle {
          margin: var(--sm-space-md) 0 0;
          max-width: 42ch;
          color: var(--sm-text-secondary);
          font-size: 1.05rem;
        }
        .sm-section-heading--center .sm-section-heading__subtitle {
          margin-inline: auto;
        }
      `}</style>
    </header>
  );
}
