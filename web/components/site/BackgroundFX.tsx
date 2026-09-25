"use client";

export default function BackgroundFX() {
  return (
    <div className="sm-bg-fx" aria-hidden="true">
      <div className="sm-bg-fx__gradient" />
      <div className="sm-bg-fx__orb sm-bg-fx__orb--cyan" />
      <div className="sm-bg-fx__orb sm-bg-fx__orb--blue" />
      <div className="sm-bg-fx__noise" />
      <style jsx>{`
        .sm-bg-fx {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: var(--sm-bg-void);
        }
        .sm-bg-fx__gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45, 125, 255, 0.22), transparent 55%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(0, 229, 255, 0.08), transparent 50%),
            radial-gradient(ellipse 50% 35% at 0% 80%, rgba(201, 75, 255, 0.06), transparent 45%),
            linear-gradient(180deg, var(--sm-bg-deep) 0%, var(--sm-bg-void) 100%);
        }
        .sm-bg-fx__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: drift 18s ease-in-out infinite alternate;
        }
        .sm-bg-fx__orb--cyan {
          width: 420px;
          height: 420px;
          top: 10%;
          left: 15%;
          background: rgba(0, 229, 255, 0.15);
        }
        .sm-bg-fx__orb--blue {
          width: 520px;
          height: 520px;
          bottom: 5%;
          right: 10%;
          background: rgba(45, 125, 255, 0.12);
          animation-delay: -6s;
        }
        .sm-bg-fx__noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @keyframes drift {
          from {
            transform: translate(0, 0) scale(1);
          }
          to {
            transform: translate(24px, -16px) scale(1.05);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-bg-fx__orb {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
