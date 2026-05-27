export type StandingRecord = {
  team: string
  points: number
  w: number
  l: number
  trend: "up" | "down" | "neutral"
}

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase()
}

export function buildSearchUrl(query: string): string | null {
  const normalizedQuery = normalizeSearchQuery(query)

  if (!normalizedQuery) {
    return null
  }

  return `/search?q=${encodeURIComponent(normalizedQuery)}`
}

export function sortStandingsByPoints(
  standings: StandingRecord[],
): StandingRecord[] {
  return [...standings].sort((a, b) => b.points - a.points)
}

export function getTeamNames(standings: StandingRecord[]): string[] {
  return standings.map((record) => record.team).sort()
}