import Image from "next/image";
import { notFound } from "next/navigation";

type AthleteProfile = {
  id: string;
  name: string;
  team: string;
  position: string;
  image: string;
  bio: string;
  stats: {
    gamesPlayed: number;
    ppg: number;
    rpg: number;
    apg: number;
    fgPercentage: string;
    threePointPercentage: string;
  };
};

const athletes: Record<string, AthleteProfile> = {
  "1": {
    id: "1",
    name: "LeBron James",
    team: "Los Angeles Lakers (#23)",
    position: "Forward (capable of playing Point Guard through Center)",
    image: "/images/lebron.png",
    bio: "LeBron James is one of the most accomplished basketball players of all time. Known for his elite scoring, passing, versatility, and leadership, he has remained a dominant force in professional basketball across multiple eras.",
    stats: {
      gamesPlayed: 55,
      ppg: 20.7,
      rpg: 6.0,
      apg: 7.0,
      fgPercentage: "51.2%",
      threePointPercentage: "31.4%",
    },
  },
};

export default async function AthletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const athlete = athletes[id];

  if (!athlete) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
          <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400" />

          <div className="grid grid-cols-1 gap-10 p-6 md:p-8 lg:grid-cols-[420px_1fr] lg:p-10">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
                <div className="relative h-[420px] w-full md:h-[520px]">
                  <Image
                    src={athlete.image}
                    alt={athlete.name}
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-300">
                  Athlete Profile
                </span>
                <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1 text-sm font-semibold text-purple-200">
                  2025–26 Season
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                {athlete.name}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                {athlete.bio}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                    Team
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {athlete.team}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                    Position
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {athlete.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Games Played" value={athlete.stats.gamesPlayed} />
          <StatCard label="Points Per Game" value={athlete.stats.ppg} />
          <StatCard label="Rebounds Per Game" value={athlete.stats.rpg} />
          <StatCard label="Assists Per Game" value={athlete.stats.apg} />
          <StatCard label="Field Goal %" value={athlete.stats.fgPercentage} />
          <StatCard
            label="3-Point %"
            value={athlete.stats.threePointPercentage}
          />
        </section>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}