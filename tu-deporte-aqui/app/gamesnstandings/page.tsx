"use client";
import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getGameLabelStatus } from "../../lib/label_status";


interface Game {
  id: number;
  home_team: { id: number; name: string } | null;
  away_team: { id: number; name: string } | null;
  home_score: number;
  away_score: number;
  status: string;
  info_status?: string;

  league?: string;
  season?: string;
  game_date?: string;
  start_time?: string;
  venue?: string;
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
  const TeamLogos : Record<string, string>  ={"Bay Titans": "/standingsImages/Tampa_Bay_Titans_Logo.png", 
    "Iron Wolves": "/standingsImages/IronWolves.jpg", 
  "River Hawks": "/standingsImages/Riverhawks-Badge.png",
   "Memphis Lions": "/standingsImages/MemphisLions.jpeg",
  "Cangrejeros de Santurce":"/standingsImages/CangrejerosSanturce.png",
  "Leones de Ponce" : "/standingsImages/LeonesPonce.png",
  "Gigantes de Carolina" : "/standingsImages/GigantesdeCarolina.png",
  "Criollos de Caguas" : "/standingsImages/CriollosCaguas.jpeg",
  "Indios de Mayagüez" : "/standingsImages/IndiosMayaguez.png",
  "Senadores de San Juan" : "/standingsImages/SenadoresSanJuan.jpg"

 };
  

  const [games, setGames] = useState<Game[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [selectedLeague, setSelectedLeague] = useState("LBPRC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  console.log("live =>", getGameLabelStatus("live"));
  console.log("scheduled =>", getGameLabelStatus("scheduled"));
  console.log("final =>", getGameLabelStatus("final"));
  console.log("cancelled =>", getGameLabelStatus("cancelled"));
  console.log("random =>", getGameLabelStatus("random"));

  const lbprcStandings = [
  { name: "Cangrejeros de Santurce", wins: 26 },
  { name: "Leones de Ponce", wins: 23 },
  { name: "Gigantes de Carolina", wins: 20 },
  { name: "Criollos de Caguas", wins: 20 },
  { name: "Indios de Mayagüez", wins: 21 },
  { name: "Senadores de San Juan", wins: 28 },
].map((team, idx) => ({
  ...team,
  games: 40,
  losses: 40 - team.wins,
  id: idx + 1,
}))
const dataToRender =
  selectedLeague === "LBPRC" ? lbprcStandings : standings;

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

  const homeTeamName = mostRecentGame?.home_team?.name === "River Hawks" ? "Memphis Lions":
  mostRecentGame?.home_team?.name || "Equipo Local";



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
        return { icon: "●", text: "Live", className: "text-emerald-300" };
      case "scheduled":
      case "upcoming":
      case "not_started":
        return { icon: "…", text: "Scheduled", className: "text-amber-200" };
      case "final":
      case "finished":
      case "complete":
      case "completed":
      case "ended":
        return { icon: "✓", text: "Final", className: "text-emerald-300" };
      case "cancelled":
      case "canceled":
        return { icon: "✕", text: "Canceled", className: "text-rose-300" };
      case "postponed":
        return { icon: "⏸", text: "Postponed", className: "text-orange-300" };
      case "delayed":
        return { icon: "⏳", text: "Delayed", className: "text-orange-200" };
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

      
      <div className="w-full h-14 bg-neutral-950 border-b border-neutral-800 flex items-center px-6 z-30 relative">
        <div className="flex items-center gap-3">
          <div className="h-2 w-10 bg-green-500 rounded-full" />
          <h1 className="text-white text-xl font-bold tracking-widest uppercase">
            Standings
          </h1>
        </div>
      </div>

      
      <div className="relative p-4 flex flex-col items-center pt-6">
        

        {/* Most Recent Game */}
        <div>
          <h1 className="text-2xl font-bold text-green-500 font['Inter']">
            Most Recent Game 
          </h1>

          </div>
          
        <div className="w-full max-w-xl bg-neutral-900 rounded-xl shadow-lg mb-8 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-yellow-400 font-semibold flex items-center">
              <span className="mr-1">☀️</span> OFFICIAL STATS
            </span>
            <span className="text-white text-lg font-semibold"> League: TBL</span>
          </div>
          <div className="flex justify-between items-center bg-neutral-800 rounded-lg p-4">
            {/* Equipo local */}
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-green-400 mt-2">
                {mostRecentGame ? getStatusLabel(mostRecentGame.status) : ""}
              </div>
              <img
              src ={TeamLogos[homeTeamName]}
              alt ={homeTeamName}
              className ="w-20 h-20 object-contain"
              />
              <span className="text-lg text-white mt-1">
                {homeTeamName}
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
              <img
                src ={mostRecentGame?.away_team?.name?TeamLogos[mostRecentGame?.away_team?.name] : "/standingsImages/default.png"}
                alt= {mostRecentGame?.away_team?.name || "Away Team"}
                className = "w-20 h-20 object-contain"
              />
              
              <span className="text-lg text-white mt-1">
                {mostRecentGame?.away_team?.name || "Equipo Visitante"}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between w-full max-w-xl">
          <h1 className="text-2xl font-bold text-green-400">
            2025-26 Regular Season Standings
          </h1>

          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="bg-neutral-900 text-white border border-green-500 px-3 py-1 rounded"
          >
            <option value="LBPRC">LBPRC</option>
            <option value="TBL">TBL</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="w-full max-w-4xl bg-neutral-800 rounded-xl p-4">
          <table className="min-w-full text-xl">
            <thead>
              <tr className="text-white">
                <th className="text-left">Team</th>
                <th>Games</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>WIN%</th>
              </tr>
            </thead>

            <tbody>
              {dataToRender.map((team: any, idx: number) => {
                const teamName =
                  selectedLeague === "LBPRC"
                    ? team.name
                    : team.teams?.name;

                const games =
                  selectedLeague === "LBPRC"
                    ? team.games
                    : team.wins + team.losses;

                const wins = team.wins;
                const losses = team.losses;

                const pct =
                  games > 0
                    ? (wins / games).toFixed(3).replace(/^0/, "")
                    : "—";

                return (
                  <tr key={team.id} className="text-white border-t">
                    <td className="py-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-lg">
                        {idx + 1}
                      </div>
                      <img
                        src={TeamLogos[teamName] || "/standingsImages/default.png"}
                        alt={teamName}
                          width={32}
                                height={32}
                                className="object-contain"
/>
                      <span className="text-xl font-bold tracking-wide" >
                        {teamName}</span>
                    </td>

                    <td className="text-center">{games}</td>
                    <td className="text-center text-emerald-300">{wins}</td>
                    <td className="text-center text-rose-300">{losses}</td>
                    <td className="text-center font-mono">{pct}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

      
      <div className="w-full h-14 bg-neutral-950 border-b border-neutral-800 flex items-center px-6 z-30 relative">
        <div className="flex items-center gap-3">
          <div className="h-2 w-10 bg-green-500 rounded-full" />
          <h1 className="text-white text-xl font-bold tracking-widest uppercase">
            Live Games
          </h1>
        </div>
      </div>

      <div className="relative w-full flex justify-center px-4 pb-8">
        <div className="w-full max-w-5xl mt-8 rounded-xl bg-neutral-900 p-4 shadow-lg">

        
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-green-500">Games</h1>
              <p className="text-lg text-neutral-400">
                Results and scheduled matches for the current calendar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadGames()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-green-500/40 bg-green-500/10 text-green-300 hover:bg-green-500/20"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border border-gray-300 rounded">

              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-green-700 text-xl font-bold">Teams</th>
                  <th className="py-2 px-4 border text-green-700 text-xl font-bold">Scores</th>
                  <th className="py-2 px-4 border text-green-700 text-xl font-bold">Status</th>
                </tr>
              </thead>

              <tbody>
                {games.map((game) => {
                  const homeTeam = game.home_team?.name || "Equipo Local";
                  const awayTeam = game.away_team?.name || "Equipo Visitante";

                  const statusView = getStatusPresentation(game.status);

                  const hasScores =
                    typeof game.home_score === "number" &&
                    typeof game.away_score === "number";

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
                        <div>
                          <span className={`${homeTeamColor} text-xl`}>{homeTeam}</span>
                          <span className="mx-1 text-neutral-400">vs</span>
                          <span className={`${awayTeamColor} text-xl`}>{awayTeam}</span>
                        </div>

                        
                        <div className="text-lg text-neutral-400 mt-1 ">
                          {game.league ?? "League"} • {game.venue ?? "Venue"}
                        </div>
                      </td>

                      
                      <td className="py-2 px-4 border font-semibold">
                        <span className={`${homeScoreColor} text-xl`}>
                          {game.home_score ?? "-"}
                        </span>
                        <span className="mx-2 text-neutral-400">-</span>
                        <span className={`${awayScoreColor}text-xl`}>
                          {game.away_score ?? "-"}
                        </span>
                      </td>

                      
                      <td className="py-2 px-4 border">
                        <span
                          className={`inline-flex items-center gap-2 font-medium text-xl ${statusView.className}`}
                        >
                          <span>{statusView.icon}</span>
                          <span>{statusView.text}</span>
                        </span>
                      </td>

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