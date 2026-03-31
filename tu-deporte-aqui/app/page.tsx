"use client";
import React, { useEffect, useState } from "react";

interface Game {
  id: number;
  home_team: { id: number; name: string } | null;
  away_team: { id: number; name: string } | null;
  home_score: number;
  away_score: number;
  status: string;
  info_status?: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/games")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al cargar los juegos");
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Cargando juegos...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // ...importaciones y lógica existente...

  // Encuentra el juego más reciente (puedes ajustar la lógica según tu modelo de datos)
  const mostRecentGame = games.length > 0 ? games[0] : null;
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


  return (
    <>
      <div className="p-4 flex flex-col items-center">

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
              </div>  {/* Aqui añadi algo para mostrar el status del juego */}
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

        {/* Standings Table Section */}
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
              {/* 6 filas vacías para standings */}
              {[...Array(6)].map((_, idx) => (
                <tr key={idx} className="text-white text-base border-t border-neutral-700">
                  <td className="py-2 px-2 flex items-center gap-2">
                    {/* Aquí puedes poner un logo si lo tienes */}
                    <span className="w-6 h-6 bg-neutral-700 rounded-full inline-block"></span>
                    <span className="ml-2"> </span>
                  </td>
                  <td className="py-2 px-2 text-center"></td>
                  <td className="py-2 px-2 text-center"></td>
                  <td className="py-2 px-2 text-center"></td>
                  <td className="py-2 px-2 text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-8">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Juegos</h1>
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
            {games.map((game) => (
              <tr key={game.id} className="text-center">
                <td className="py-2 px-4 border font-medium">
                  {game.home_team?.name || "Equipo Local"} vs {game.away_team?.name || "Equipo Visitante"}
                </td>
                <td className="py-2 px-4 border">
                  {game.home_score} - {game.away_score}
                </td>
                <td className="py-2 px-4 border">
                  {getStatusLabel(game.status)}
                </td>
                <td className="py-2 px-4 border">{game.info_status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Esto es otro layout que puedes usar para mostrar la tabla de juegos, pero el diseño que tiene actualmente es más agradable. 
//return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 text-green-600">Juegos</h1>
//       <table className="min-w-full border border-gray-300 rounded">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-2 px-4 border text-green-700">Equipos</th>
//             <th className="py-2 px-4 border text-green-700">Puntuación</th>
//             <th className="py-2 px-4 border text-green-700">Status del Juego</th>
//             <th className="py-2 px-4 border text-green-700">Status de Información</th>
//           </tr>
//         </thead>
//         <tbody>
//           {games.map((game) => (
//             <tr key={game.id} className="text-center">
//               <td className="py-2 px-4 border font-medium">
//                 {game.home_team?.name || "Equipo Local"} vs {game.away_team?.name || "Equipo Visitante"}
//               </td>
//               <td className="py-2 px-4 border">
//                 {game.home_score} - {game.away_score}
//               </td>
//               <td className="py-2 px-4 border">{game.status}</td>
//               <td className="py-2 px-4 border">{game.info_status || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }