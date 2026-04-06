"use client";
import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getGameLabelStatus } from "../lib/label_status";

interface Game {
  id: number;
  home_team: { id: number; name: string } | null;
  away_team: { id: number; name: string } | null;
  home_score: number;
  away_score: number;
  status: string;
  info_status?: string;
}

interface Standing {
  id: number;
  team_id: number;
  wins: number;
  losses: number;
  teams?: {
    name: string;
  };
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("live =>", getGameLabelStatus("live"));
  console.log("scheduled =>", getGameLabelStatus("scheduled"));
  console.log("final =>", getGameLabelStatus("final"));
  console.log("cancelled =>", getGameLabelStatus("cancelled"));
  console.log("random =>", getGameLabelStatus("random"));

  async function loadGames() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/games");
      if (!res.ok) throw new Error("Error al cargar los juegos");
      const data = await res.json();
      setGames(data);

      const standingsRes = await fetch("/api/standings");
      if (!standingsRes.ok) throw new Error("Error al cargar los standings");
      const standingsData = await standingsRes.json();
      setStandings(standingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadGames();
  }, []);

  if (loading) return <div className="p-4">Cargando juegos...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // ...importaciones y lógica existente...

  // Encuentra el juego más reciente (puedes ajustar la lógica según tu modelo de datos)
  const mostRecentGame = games.length > 0 ? games[0] : null;

  const isFinalStatus = (status: string) => {
    const normalized = status.toLowerCase();
    return ["final", "finished", "complete", "completed", "ended"].includes(normalized);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "final": return "Finalizado";
      case "scheduled": return "Por jugar";
      case "cancelled": return "Cancelado";
      case "postponed": return "Pospuesto";
      case "live": return "En vivo";
      case "delayed": return "Retrasado";
      default: return status;
    }
  };

  const getStatusPresentation = (status: string) => {
    const normalized = status.toLowerCase();
    switch (normalized) {
      case "live":
      case "in_progress":
      case "ongoing":
        return { icon: "●", text: "En vivo", className: "text-emerald-300" };
      case "scheduled":
      case "upcoming":
      case "not_started":
        return { icon: "…", text: "Programado", className: "text-amber-200" };
      case "final":
      case "finished":
      case "complete":
      case "completed":
      case "ended":
        return { icon: "✓", text: "Final", className: "text-emerald-300" };
      case "cancelled":
      case "canceled":
        return { icon: "✕", text: "Cancelado", className: "text-rose-300" };
      case "postponed":
        return { icon: "⏸", text: "Pospuesto", className: "text-orange-300" };
      case "delayed":
        return { icon: "⏳", text: "Retrasado", className: "text-orange-200" };
      default:
        return { icon: "?", text: getStatusLabel(status), className: "text-neutral-300" };
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_32%),linear-gradient(180deg,_#050505_0%,_#0b0b0b_45%,_#050505_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)] [background-size:22px_22px]"
      />

      <div className="relative p-4 flex flex-col items-center">

        {/* Most Recent Game */}
        <div className="w-full max-w-xl bg-neutral-900 rounded-xl shadow-lg mb-8 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-yellow-400 font-semibold flex items-center">
              <span className="mr-1">☀️</span> OFFICIAL STATS
            </span>
            <span className="text-white text-sm font-semibold">Most Recent Game</span>
          </div>
          <div className="flex justify-between items-center bg-neutral-800 rounded-lg p-4">
            {/* Equipo local */}
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-green-400 mt-2">
                {mostRecentGame ? getStatusLabel(mostRecentGame.status) : ""}
              </div>
              <span className="text-4xl font-bold text-yellow-400">
                {mostRecentGame?.home_team?.name?.charAt(0) || "-"}
              </span>
              <span className="text-xs text-white mt-1">
                {mostRecentGame?.home_team?.name || "Equipo Local"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="bg-blue-900 text-white rounded px-3 py-1 text-xl font-bold">
                  {mostRecentGame?.home_score ?? "-"}
                </span>
                <span className="mx-2 text-white text-xl font-bold">—</span>
                <span className="bg-blue-900 text-white rounded px-3 py-1 text-xl font-bold">
                  {mostRecentGame?.away_score ?? "-"}
                </span>
              </div>
            </div>
            {/* Equipo visitante */}
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-700">
                {mostRecentGame?.away_team?.name?.charAt(0) || "-"}
              </span>
              <span className="text-xs text-white mt-1">
                {mostRecentGame?.away_team?.name || "Equipo Visitante"}
              </span>
            </div>
          </div>
        </div>

        {/* Standings Table */}
        <div className="w-full max-w-xl bg-neutral-800 rounded-xl shadow-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-white text-base">
                <th className="py-2 px-2 text-left">Team</th>
                <th className="py-2 px-2">Games</th>
                <th className="py-2 px-2">Wins</th>
                <th className="py-2 px-2">Losts</th>
                <th className="py-2 px-2">Percentaje</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-neutral-400 text-sm">
                    No standings available.
                  </td>
                </tr>
              ) : (
                standings.map((team, idx) => {
                  const games = team.wins + team.losses;
                  const pct = games > 0
                    ? (team.wins / games).toFixed(3).replace(/^0/, "")
                    : "—";
                  return (
                    <tr key={team.id} className="text-white text-base border-t border-neutral-700">
                      <td className="py-2 px-2 flex items-center gap-2">
  {/* Ranking number */}
  <span className="w-6 h-6 bg-neutral-700 rounded-full inline-flex items-center justify-center text-xs font-bold text-neutral-300">
    {idx + 1}
  </span>

  {/* Fake logo + name */}
  {(() => {
   const teamName = team.teams?.name || `Team ${team.team_id}`;
    const initial = teamName.charAt(0);

    return (
      <>
        <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
          {initial}
        </div>
        <span className="ml-2">{teamName}</span>
      </>
    );
  })()}
</td>
                      <td className="py-2 px-2 text-center">{games}</td>
                      <td className="py-2 px-2 text-center text-emerald-300 font-semibold">{team.wins}</td>
                      <td className="py-2 px-2 text-center text-rose-300">{team.losses}</td>
                      <td className="py-2 px-2 text-center font-mono">{pct}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Games Table */}
      <div className="relative w-full flex justify-center px-4 pb-8">
        <div className="w-full max-w-5xl mt-8 rounded-xl bg-neutral-900 p-4 shadow-lg">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-green-500">Juegos</h1>
              <p className="text-sm text-neutral-400">Resultados y partidos programados del calendario actual.</p>
            </div>
            <button
              type="button"
              onClick={() => void loadGames()}
              aria-label="Refresh games"
              title="Refresh games"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-green-500/40 bg-green-500/10 text-green-300 transition hover:bg-green-500/20"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-green-700">Equipos</th>
                  <th className="py-2 px-4 border text-green-700">Puntuación</th>
                  <th className="py-2 px-4 border text-green-700">Status del Juego</th>
                  <th className="py-2 px-4 border text-green-700">Status de Información</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => {
                  const homeTeam = game.home_team?.name || "Equipo Local";
                  const awayTeam = game.away_team?.name || "Equipo Visitante";
                  const statusView = getStatusPresentation(game.status);
                  const hasScores = typeof game.home_score === "number" && typeof game.away_score === "number";
                  const isFinal = isFinalStatus(game.status);

                  let homeTeamColor = "text-neutral-100";
                  let awayTeamColor = "text-neutral-100";
                  let homeScoreColor = "text-neutral-100";
                  let awayScoreColor = "text-neutral-100";

                  if (isFinal && hasScores) {
                    if (game.home_score > game.away_score) {
                      homeTeamColor = "text-emerald-300";
                      awayTeamColor = "text-rose-300";
                      homeScoreColor = "text-emerald-300";
                      awayScoreColor = "text-rose-300";
                    } else if (game.home_score < game.away_score) {
                      homeTeamColor = "text-rose-300";
                      awayTeamColor = "text-emerald-300";
                      homeScoreColor = "text-rose-300";
                      awayScoreColor = "text-emerald-300";
                    } else {
                      homeTeamColor = "text-amber-200";
                      awayTeamColor = "text-amber-200";
                      homeScoreColor = "text-amber-200";
                      awayScoreColor = "text-amber-200";
                    }
                  }

                  return (
                    <tr key={game.id} className="text-center">
                      <td className="py-2 px-4 border font-medium">
                        <span className={homeTeamColor}>{homeTeam}</span>
                        <span className="mx-1 text-neutral-400">vs</span>
                        <span className={awayTeamColor}>{awayTeam}</span>
                      </td>
                      <td className="py-2 px-4 border font-semibold">
                        <span className={homeScoreColor}>{game.home_score ?? "-"}</span>
                        <span className="mx-2 text-neutral-400">-</span>
                        <span className={awayScoreColor}>{game.away_score ?? "-"}</span>
                      </td>
                      <td className="py-2 px-4 border">
                        <span className={`inline-flex items-center gap-2 font-medium ${statusView.className}`}>
                          <span aria-hidden>{statusView.icon}</span>
                          <span>{statusView.text}</span>
                        </span>
                      </td>
                      <td className="py-2 px-4 border text-neutral-100">{game.status || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}