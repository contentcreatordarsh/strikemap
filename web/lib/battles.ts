export type BattleCard = {
  id: string;
  title: string;
  redCount: number;
  blueCount: number;
  timeRemaining: string;
  joinCode?: string;
  demo: boolean;
};

export const DEMO_BATTLES: BattleCard[] = [
  {
    id: "demo-sg-042",
    title: "Singapore #042",
    redCount: 4,
    blueCount: 3,
    timeRemaining: "06:32 remaining",
    joinCode: "DEMO-SG",
    demo: true,
  },
  {
    id: "demo-tky-018",
    title: "Tokyo #018",
    redCount: 2,
    blueCount: 5,
    timeRemaining: "02:14 remaining",
    joinCode: "DEMO-TK",
    demo: true,
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Returns demo battles when no list endpoint exists or API is unreachable. */
export async function fetchPublicBattles(): Promise<BattleCard[]> {
  if (!API_BASE) {
    return DEMO_BATTLES;
  }
  try {
    const res = await fetch(`${API_BASE}/api/v1/games/public`, { credentials: "include" });
    if (!res.ok) {
      return DEMO_BATTLES;
    }
    const json = (await res.json()) as { ok?: boolean; data?: { battles?: BattleCard[] } };
    if (json.ok && json.data?.battles?.length) {
      return json.data.battles;
    }
  } catch {
    /* fall through */
  }
  return DEMO_BATTLES;
}
