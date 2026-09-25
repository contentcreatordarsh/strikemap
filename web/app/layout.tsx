import type { Metadata } from "next";
import { Orbitron, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StrikeMap — Real-world multiplayer territory battles",
  description:
    "Turn your city into a live battlefield. Capture territory, team up, and compete in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
