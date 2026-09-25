"use client";

import { useCallback, useEffect, useState } from "react";
import BackgroundFX from "@/components/site/BackgroundFX";
import SiteNav from "@/components/site/SiteNav";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import IntroScreen, { hasSeenIntro } from "@/components/site/IntroScreen";
import StoryExperience from "@/components/site/StoryExperience";
import LiveBattlesSection from "@/components/site/LiveBattlesSection";
import CreateBattleModal from "@/components/game/CreateBattleModal";
import JoinBattleModal from "@/components/game/JoinBattleModal";
import AuthModal from "@/components/game/AuthModal";
import type { BattleCard } from "@/lib/battles";
import { getToken } from "@/lib/api";
import { api } from "@/lib/api";

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"create" | "join" | null>(null);

  useEffect(() => {
    setShowIntro(!hasSeenIntro());
  }, []);

  const requireAuth = useCallback((action: "create" | "join") => {
    if (!getToken() && !process.env.NEXT_PUBLIC_API_URL) {
      if (action === "join") {
        setJoinOpen(true);
        return;
      }
      window.location.href = "/demo/";
      return;
    }
    if (!getToken()) {
      setPendingAction(action);
      setAuthOpen(true);
      return;
    }
    if (action === "create") setCreateOpen(true);
    else setJoinOpen(true);
  }, []);

  const onAuthSuccess = () => {
    if (pendingAction === "create") setCreateOpen(true);
    if (pendingAction === "join") setJoinOpen(true);
    setPendingAction(null);
  };

  const handleCreate = async (data: {
    name: string;
    team: "RED" | "BLUE";
    maxPlayers: number;
    durationMin: number;
  }) => {
    setCreateOpen(false);
    try {
      const result = await api<{ game: { id: string; code: string } }>("/api/v1/games", {
        method: "POST",
        body: JSON.stringify({
          name: data.name || "City Battle",
          center: { lat: 1.3521, lng: 103.8198 },
          radiusM: 5000,
          durationSeconds: data.durationMin * 60,
          teamCount: 2,
          maxPlayers: data.maxPlayers,
        }),
      });
      const team = data.team.toLowerCase();
      window.location.href = `/lobby/?id=${result.game.id}&code=${result.game.code}&team=${team}&host=1`;
    } catch {
      window.location.href = "/demo/";
    }
  };

  const handleJoinCode = (code: string) => {
    setJoinOpen(false);
    window.location.href = `/lobby/?code=${encodeURIComponent(code)}`;
  };

  const handleJoinBattle = (battle: BattleCard) => {
    if (battle.demo) {
      window.location.href = "/demo/";
      return;
    }
    if (battle.joinCode) {
      handleJoinCode(battle.joinCode);
    }
  };

  return (
    <>
      {showIntro ? <IntroScreen onEnter={() => setShowIntro(false)} /> : null}
      <div className="sm-page-shell">
        <BackgroundFX />
        <SiteNav />
        <main className="sm-main" style={{ paddingTop: "var(--sm-nav-height)" }}>
          <Hero />
          <StoryExperience />
          <LiveBattlesSection
            onJoin={handleJoinBattle}
            onCreate={() => requireAuth("create")}
          />
          <section className="sm-section sm-container">
            <p className="sm-demo-link">
              <a href="/demo/">Watch demo battle</a>
              <span aria-hidden="true"> · </span>
              <a href="/map/">Intel map (legacy)</a>
            </p>
          </section>
        </main>
        <Footer />
      </div>
      <CreateBattleModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <JoinBattleModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        onSubmit={handleJoinCode}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={onAuthSuccess} />
      <style jsx global>{`
        .sm-game-map {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .sm-demo-link {
          text-align: center;
          color: var(--sm-text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </>
  );
}
