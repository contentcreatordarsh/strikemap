"use client";

import { useEffect, useState } from "react";

export function useGameTimer(endsAt?: string | null): string {
  const [label, setLabel] = useState("—:—");

  useEffect(() => {
    if (!endsAt) {
      setLabel("—:—");
      return;
    }
    const end = new Date(endsAt).getTime();
    const tick = () => {
      const sec = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      setLabel(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  return label;
}
