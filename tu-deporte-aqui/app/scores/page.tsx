type Game = {
  game_id: string;
  game_date: string;
  status: string;
  home_team_name: string;
  home_team_code: string;
  home_team_score: number | null;
  away_team_name: string;
  away_team_code: string;
  away_team_score: number | null;
};

export default async function ScoresPage() {
  const res = await fetch("http://localhost:3000/api/nba/scores", {
    cache: "no-store",
  });

  const result = await res.json();
  const games: Game[] = result.data || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">NBA Scores</h1>

      {result.error && (
        <p className="text-red-500">Error: {result.error}</p>
      )}

      {!result.error && games.length === 0 && (
        <p className="text-gray-500">No games available.</p>
      )}

      {games.map((game) => (
        <div key={game.game_id} className="border rounded p-4 space-y-2">
          <p className="text-sm text-gray-500">
            {game.game_date} · {game.status}
          </p>

          <div className="flex justify-between">
            <span>{game.away_team_name} ({game.away_team_code})</span>
            <span>{game.away_team_score ?? "-"}</span>
          </div>

          <div className="flex justify-between">
            <span>{game.home_team_name} ({game.home_team_code})</span>
            <span>{game.home_team_score ?? "-"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}