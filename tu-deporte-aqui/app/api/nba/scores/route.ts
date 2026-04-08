import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("nba_games")
      .select("*")
      .order("game_date", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          data: [],
          error: error.message,
          meta: {
            count: 0,
            source: "supabase",
            generatedAt: new Date().toISOString(),
          },
        },
        { status: 500 }
      );
    }

    const normalized = (data ?? [])
      .map((game) => ({
        gameId: game.game_id,
        gameDate: game.game_date,
        status: normalizeStatus(game.status),
        homeTeam: {
          name: game.home_team_name,
          code: game.home_team_code,
        },
        awayTeam: {
          name: game.away_team_name,
          code: game.away_team_code,
        },
        homeScore: game.home_team_score,
        awayScore: game.away_team_score,
        updatedAt: game.updated_at,
      }))
      .filter((game) => game.status === "live" || game.status === "final");

    return NextResponse.json(
      {
        data: normalized,
        error: null,
        meta: {
          count: normalized.length,
          source: "supabase",
          generatedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: [],
        error: error instanceof Error ? error.message : "Unknown error",
        meta: {
          count: 0,
          source: "supabase",
          generatedAt: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

function normalizeStatus(status: string | null): "scheduled" | "live" | "final" | "unknown" {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("scheduled")) return "scheduled";
  if (value.includes("live")) return "live";
  if (value.includes("final")) return "final";

  return "unknown";
}