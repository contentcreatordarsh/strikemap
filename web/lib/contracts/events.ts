import type { Game, Team } from "./game";
import type { Player } from "./player";
import type { Territory } from "./territory";
import type { TeamColor } from "./game";

export const WS_PROTOCOL_VERSION = "STRIKEMAP_GAME_V1";

export interface GameMessage<T = unknown> {
  type: string;
  eventId: string;
  serverTime: string;
  gameId: string;
  sequence: number;
  payload: T;
}

export interface GameStatePayload {
  game: Game;
  teams: Team[];
  players: Player[];
  territories: Territory[];
  objectives: unknown[];
  serverTime: string;
}

export interface ScoreUpdatedPayload {
  scores: Record<TeamColor, number>;
}
