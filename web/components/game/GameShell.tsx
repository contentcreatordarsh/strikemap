"use client";

import type { ReactNode } from "react";
import BackgroundFX from "../site/BackgroundFX";

type Props = {
  children: ReactNode;
  hud?: ReactNode;
};

export default function GameShell({ children, hud }: Props) {
  return (
    <div className="sm-game-shell">
      <BackgroundFX />
      {hud}
      <main className="sm-game-shell__main">{children}</main>
      <style jsx>{`
        .sm-game-shell {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .sm-game-shell__main {
          flex: 1;
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
