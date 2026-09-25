export type TeamColor = "RED" | "BLUE" | "PURPLE" | "GREEN";

export const TEAM_COLORS: Record<TeamColor, string> = {
  RED: "#ff3d57",
  BLUE: "#3d8bff",
  PURPLE: "#b84dff",
  GREEN: "#3dffa8",
};

export type GameStatus = "LOBBY" | "COUNTDOWN" | "ACTIVE" | "FINISHED" | "CANCELLED";

export interface Team {
  id: string;
  color: TeamColor;
  name: string;
  playerCount: number;
  score: number;
  territoriesControlled: number;
}

export interface Game {
  id: string;
  code: string;
  name: string;
  status: GameStatus;
  center: { lat: number; lng: number };
  radiusM: number;
  durationSeconds: number;
  maxPlayers: number;
  teams: Team[];
  startedAt?: string;
  endsAt?: string;
  finishedAt?: string;
  createdAt: string;
}
