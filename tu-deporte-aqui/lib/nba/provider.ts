import { normalizeExternalGames } from "./normalize";
import { NBAGame } from "./types";
import { supabaseServer } from "@/lib/supabaseServer";

const NBA_API_BASE_URL = process.env.NBA_API_BASE_URL;
const NBA_API_KEY = process.env.NBA_API_KEY;

/**
 * Fetch from external provider.
 * Replace endpoint/headers/query params to match the provider your team chooses.
 */
export async function fetchLatestGamesFromExternal(): Promise<NBAGame[]> {
  if (!NBA_API_BASE_URL) {
    throw new Error("NBA_API_BASE_URL is not configured.");
  }

  const url = `${NBA_API_BASE_URL}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(NBA_API_KEY ? { Authorization: `Bearer ${NBA_API_KEY}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`External API request failed with status ${response.status}`);
  }

  const json = await response.json();

  /**
   * Adjust this depending on the provider response shape.
   * Common shapes are:
   * - json.data
   * - json.response
   * - json.games
   */
  const rawGames = json.data ?? json.response ?? json.games ?? [];

  if (!Array.isArray(rawGames)) {
    throw new Error("External API returned an invalid games payload.");
  }

  return normalizeExternalGames(rawGames);
}

/**
 * Optional fallback: fetch recent games from Supabase if external source fails
 * or if you want to serve stored data.
 */
export async function fetchRecentGamesFromSupabase(): Promise<NBAGame[]> {
  const { data, error } = await supabaseServer
    .from("nba_games")
    .select("*")
    .order("game_date", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((game) => ({
    gameId: String(game.game_id),
    gameDate: String(game.game_date),
    status: mapStoredStatus(game.status),
    homeTeam: {
      id: String(game.home_team_code),
      name: String(game.home_team_name),
      code: String(game.home_team_code),
    },
    awayTeam: {
      id: String(game.away_team_code),
      name: String(game.away_team_name),
      code: String(game.away_team_code),
    },
    homeScore: game.home_team_score,
    awayScore: game.away_team_score,
    period: game.period ?? null,
    clock: game.clock ?? null,
    source: "supabase",
    updatedAt: game.updated_at ?? new Date().toISOString(),
  }));
}

function mapStoredStatus(status?: string): NBAGame["status"] {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("scheduled")) return "scheduled";
  if (value.includes("live")) return "live";
  if (value.includes("final")) return "final";
  if (value.includes("postponed")) return "postponed";

  return "unknown";
}