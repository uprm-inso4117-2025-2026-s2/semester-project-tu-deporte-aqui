import { NBAGame, GameStatus } from "./types";

function normalizeStatus(rawStatus?: string): GameStatus {
  const value = rawStatus?.toLowerCase() ?? "";

  if (value.includes("scheduled")) return "scheduled";
  if (value.includes("live") || value.includes("in progress")) return "live";
  if (value.includes("final") || value.includes("finished")) return "final";
  if (value.includes("postponed")) return "postponed";

  return "unknown";
}

/**
 * Adjust this mapper to fit your chosen external sports API.
 * The current version is intentionally generic.
 */
export function normalizeExternalGames(rawGames: any[]): NBAGame[] {
  return rawGames.map((game) => ({
    gameId: String(
      game.gameId ?? game.id ?? crypto.randomUUID()
    ),
    gameDate: String(
      game.gameDate ?? game.date ?? new Date().toISOString()
    ),
    status: normalizeStatus(
      game.status ?? game.gameStatus ?? game.long_status
    ),
    homeTeam: {
      id: String(game.homeTeam?.id ?? game.home_team_id ?? "unknown"),
      name: String(game.homeTeam?.name ?? game.home_team_name ?? "Unknown Home Team"),
      code: String(game.homeTeam?.code ?? game.home_team_code ?? "UNK"),
    },
    awayTeam: {
      id: String(game.awayTeam?.id ?? game.away_team_id ?? "unknown"),
      name: String(game.awayTeam?.name ?? game.away_team_name ?? "Unknown Away Team"),
      code: String(game.awayTeam?.code ?? game.away_team_code ?? "UNK"),
    },
    homeScore:
      game.homeScore ?? game.home_team_score ?? game.scores?.home ?? null,
    awayScore:
      game.awayScore ?? game.away_team_score ?? game.scores?.away ?? null,
    period: game.period ? String(game.period) : null,
    clock: game.clock ? String(game.clock) : null,
    source: "external",
    updatedAt: new Date().toISOString(),
  }));
}