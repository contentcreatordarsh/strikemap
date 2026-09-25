"use client";

import dynamic from "next/dynamic";

const StrikeMapClient = dynamic(() => import("@/components/StrikeMapClient"), {
  ssr: false,
  loading: () => (
    <div className="sm-loading">
      <p>Loading intel map…</p>
      <div className="sm-loading-bar" />
    </div>
  ),
});

export default function HomeMapClient() {
  return <StrikeMapClient />;
}
