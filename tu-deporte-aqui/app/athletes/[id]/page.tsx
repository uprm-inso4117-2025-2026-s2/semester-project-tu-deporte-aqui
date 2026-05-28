import { notFound } from "next/navigation";

type Athlete = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  number: number | null;
  teams: {
    name: string | null;
    league: string | null;
    city: string | null;
  } | null;
};

async function getAthlete(id: string): Promise<Athlete | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/athletes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const result = await res.json();
  return result.data;
}

export default async function AthletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const athlete = await getAthlete(id);

  if (!athlete) notFound();

  const athleteName =
    `${athlete.first_name ?? ""} ${athlete.last_name ?? ""}`.trim() ||
    "Unknown Athlete";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-sm font-semibold text-yellow-400">Athlete Profile</p>

        <h1 className="mt-2 text-4xl font-bold">{athleteName}</h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          {athleteName} is a {athlete.position ?? "player"} for the{" "}
          {athlete.teams?.name ?? "team"} in the{" "}
          {athlete.teams?.league ?? "league"}. This profile displays core player
          information from the athlete API route.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard label="Team" value={athlete.teams?.name ?? "No team listed"} />
          <InfoCard label="Position" value={athlete.position ?? "No position listed"} />
          <InfoCard
            label="Number"
            value={athlete.number !== null ? `#${athlete.number}` : "No number listed"}
          />
          <InfoCard label="League" value={athlete.teams?.league ?? "No league listed"} />
          <InfoCard label="City" value={athlete.teams?.city ?? "No city listed"} />
          <InfoCard label="Profile ID" value={athlete.id} />
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold">{value}</p>
    </div>
  );
}