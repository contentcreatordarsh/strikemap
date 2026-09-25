import type { TeamColor } from "./game";

export type PlayerStatus = "ONLINE" | "OFFLINE" | "DISCONNECTED";

export interface Player {
  id: string;
  username: string;
  team: TeamColor;
  level: number;
  xp: number;
  status: PlayerStatus;
  location?: {
    lat: number;
    lng: number;
    accuracyM?: number;
    updatedAt: string;
  };
}
