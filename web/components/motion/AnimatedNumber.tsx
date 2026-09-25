"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  className?: string;
};

export default function AnimatedNumber({ value, className = "" }: Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;

    const start = performance.now();
    const duration = 420;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
