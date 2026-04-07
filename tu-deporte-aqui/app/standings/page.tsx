type Standing = {
  team_id: string;
  team_name: string;
  team_code: string;
  conference: string;
  rank: number;
  wins: number;
  losses: number;
  win_pct: number;
  games_back: number | null;
  streak: string | null;
};

export default async function StandingsPage() {
  const res = await fetch("http://localhost:3000/api/nba/standings", {
    cache: "no-store",
  });

  const result = await res.json();
  const standings: Standing[] = result.data || [];

  const east = standings.filter((t) => t.conference === "East");
  const west = standings.filter((t) => t.conference === "West");

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">NBA Standings</h1>

      {/* ERROR STATE */}
      {result.error && (
        <p className="text-red-500">Error: {result.error}</p>
      )}

      {/* EMPTY STATE */}
      {!result.error && standings.length === 0 && (
        <p className="text-gray-500">No standings available.</p>
      )}

      {/* EAST */}
      {east.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Eastern Conference
          </h2>

          <div className="space-y-2">
            {east.map((team) => (
              <div
                key={team.team_id}
                className="border p-3 rounded flex justify-between"
              >
                <span>
                  #{team.rank} {team.team_name}
                </span>
                <span>
                  {team.wins}-{team.losses}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WEST */}
      {west.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Western Conference
          </h2>

          <div className="space-y-2">
            {west.map((team) => (
              <div
                key={team.team_id}
                className="border p-3 rounded flex justify-between"
              >
                <span>
                  #{team.rank} {team.team_name}
                </span>
                <span>
                  {team.wins}-{team.losses}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}