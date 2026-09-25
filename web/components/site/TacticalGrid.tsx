"use client";

type Props = {
  intensity?: "low" | "medium";
};

export default function TacticalGrid({ intensity = "medium" }: Props) {
  return (
    <div
      className={`sm-tactical-grid sm-tactical-grid--${intensity}`}
      aria-hidden="true"
    >
      <style jsx>{`
        .sm-tactical-grid {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%);
        }
        .sm-tactical-grid--low {
          opacity: 0.45;
          background-size: 64px 64px;
        }
      `}</style>
    </div>
  );
}
