export type GameStatus = "scheduled" | "live" | "final" | "postponed" | "unknown";

export interface NBATeamInfo {
  id: string;
  name: string;
  code: string;
}

export interface NBAGame {
  gameId: string;
  gameDate: string;
  status: GameStatus;
  homeTeam: NBATeamInfo;
  awayTeam: NBATeamInfo;
  homeScore: number | null;
  awayScore: number | null;
  period: string | null;
  clock: string | null;
  source: "external" | "supabase";
  updatedAt: string;
}

export interface ApiSuccess<T> {
  data: T;
  error: null;
  meta?: {
    count?: number;
    source?: string;
    generatedAt?: string;
  };
}

export interface ApiError {
  data: [];
  error: string;
  meta?: {
    source?: string;
    generatedAt?: string;
  };
}