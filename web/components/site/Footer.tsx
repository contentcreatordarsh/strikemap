export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="sm-footer">
      <div className="sm-container sm-footer__inner">
        <p className="sm-brand-font sm-footer__brand">StrikeMap</p>
        <p className="sm-footer__tag">Real world. Real players. One battlefield.</p>
        <div className="sm-tactical-line sm-footer__line" />
        <p className="sm-footer__copy">© {year} StrikeMap · Edge + multiplayer stack</p>
      </div>
      <style jsx>{`
        .sm-footer {
          position: relative;
          z-index: 1;
          padding: var(--sm-space-2xl) 0 var(--sm-space-xl);
          border-top: 1px solid var(--sm-border);
          margin-top: var(--sm-space-2xl);
        }
        .sm-footer__inner {
          text-align: center;
        }
        .sm-footer__brand {
          margin: 0;
          font-size: 0.9rem;
        }
        .sm-footer__tag {
          margin: 0.5rem 0 0;
          color: var(--sm-text-muted);
          font-size: 0.85rem;
        }
        .sm-footer__line {
          margin: var(--sm-space-lg) auto;
          max-width: 200px;
        }
        .sm-footer__copy {
          margin: 0;
          font-size: 0.75rem;
          color: var(--sm-text-muted);
        }
      `}</style>
    </footer>
  );
}
