"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const players = [
  { id: "nba-001", name: "LeBron James", team: "Los Angeles Lakers", position: "Forward", league: "NBA", image: "/images/lebron.png" },
  { id: "nba-002", name: "Stephen Curry", team: "Golden State Warriors", position: "Guard", league: "NBA", image: "/images/curry.jpg" },
  { id: "nba-003", name: "Kevin Durant", team: "Phoenix Suns", position: "Forward", league: "NBA", image: "/images/kevin.jpg" },
  { id: "nba-004", name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", position: "Forward", league: "NBA", image: "/images/giannis.webp" },
  { id: "nba-005", name: "Nikola Jokic", team: "Denver Nuggets", position: "Center", league: "NBA", image: "/images/nikola.webp" },
  { id: "nba-006", name: "Luka Doncic", team: "Dallas Mavericks", position: "Guard", league: "NBA", image: "/images/luka.webp" },
  { id: "nba-007", name: "Jayson Tatum", team: "Boston Celtics", position: "Forward", league: "NBA", image: "/images/jayson.webp" },
  { id: "nba-008", name: "Joel Embiid", team: "Philadelphia 76ers", position: "Center", league: "NBA", image: "/images/joel.webp" },
  { id: "nba-009", name: "Anthony Davis", team: "Los Angeles Lakers", position: "Forward/Center", league: "NBA", image: "/images/anthony.webp" },
  { id: "nba-010", name: "Shai Gilgeous-Alexander", team: "Oklahoma City Thunder", position: "Guard", league: "NBA", image: "/images/shai.webp" },
  { id: "nba-011", name: "Victor Wembanyama", team: "San Antonio Spurs", position: "Center", league: "NBA", image: "/images/victor.webp" },
  { id: "nba-012", name: "Anthony Edwards", team: "Minnesota Timberwolves", position: "Guard", league: "NBA", image: "/images/anthonyEdwards.webp" },
  { id: "nba-013", name: "Devin Booker", team: "Phoenix Suns", position: "Guard", league: "NBA", image: "/images/devin.webp" },
  { id: "nba-014", name: "Ja Morant", team: "Memphis Grizzlies", position: "Guard", league: "NBA", image: "/images/ja.webp" },
  { id: "nba-015", name: "Damian Lillard", team: "Milwaukee Bucks", position: "Guard", league: "NBA", image: "/images/damian.webp" },
  { id: "nba-016", name: "Bam Adebayo", team: "Miami Heat", position: "Center", league: "NBA", image: "/images/bam.webp" },
  { id: "nba-017", name: "Jimmy Butler", team: "Miami Heat", position: "Forward", league: "NBA", image: "/images/jimmy.webp" },
  { id: "nba-018", name: "Kyrie Irving", team: "Dallas Mavericks", position: "Guard", league: "NBA", image: "/images/kyrie.webp" },
  { id: "nba-019", name: "Kawhi Leonard", team: "LA Clippers", position: "Forward", league: "NBA", image: "/images/kawhi.webp" },
  { id: "nba-020", name: "Paul George", team: "Philadelphia 76ers", position: "Forward", league: "NBA", image: "/images/paul.webp" },
  { id: "nba-021", name: "Donovan Mitchell", team: "Cleveland Cavaliers", position: "Guard", league: "NBA", image: "/images/donovan.webp" },
  { id: "nba-022", name: "Jalen Brunson", team: "New York Knicks", position: "Guard", league: "NBA", image: "/images/jalen.webp" },
  { id: "nba-023", name: "Tyrese Haliburton", team: "Indiana Pacers", position: "Guard", league: "NBA", image: "/images/tyrese.webp" },
  { id: "nba-024", name: "Jaylen Brown", team: "Boston Celtics", position: "Guard/Forward", league: "NBA", image: "/images/jaylen.webp" },
  { id: "nba-025", name: "Zion Williamson", team: "New Orleans Pelicans", position: "Forward", league: "NBA", image: "/images/zion.webp" },
  { id: "nba-026", name: "Trae Young", team: "Atlanta Hawks", position: "Guard", league: "NBA", image: "/images/trae.webp" },
  { id: "nba-027", name: "LaMelo Ball", team: "Charlotte Hornets", position: "Guard", league: "NBA", image: "/images/lamelo.webp" },
  { id: "nba-028", name: "Paolo Banchero", team: "Orlando Magic", position: "Forward", league: "NBA", image: "/images/paolo.webp" },
  { id: "nba-029", name: "Chet Holmgren", team: "Oklahoma City Thunder", position: "Forward/Center", league: "NBA", image: "/images/chet.webp" },
  { id: "nba-030", name: "Jamal Murray", team: "Denver Nuggets", position: "Guard", league: "NBA", image: "/images/jamal.webp" },
];

export default function AthletesPage() {
  const [search, setSearch] = useState("");

  const filteredPlayers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return players.filter((player) =>
      `${player.name} ${player.team} ${player.position} ${player.league}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">NBA Athletes</h1>
          <p className="mt-2 text-slate-300">
            Search 30 NBA players by name, team, or position.
          </p>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search NBA players..."
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
            >
              <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl bg-white/10">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-bold">{player.name}</h2>
              <p className="mt-2 text-slate-300">{player.team}</p>
              <p className="text-slate-400">{player.position}</p>
              <p className="text-slate-400">{player.league}</p>

              <Link
                href={`/athletes/${player.id}`}
                className="mt-4 inline-block rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <p className="mt-8 text-center text-slate-400">No athletes found.</p>
        )}
      </section>
    </main>
  );
}