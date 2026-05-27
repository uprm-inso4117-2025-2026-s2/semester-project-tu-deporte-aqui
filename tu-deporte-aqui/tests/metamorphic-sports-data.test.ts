import { describe, expect, it } from "vitest"
import {
  buildSearchUrl,
  getTeamNames,
  normalizeSearchQuery,
  sortStandingsByPoints,
  type StandingRecord,
} from "../lib/sportsDataUtils"

const sampleStandings: StandingRecord[] = [
  { team: "Capitanes", points: 45, w: 18, l: 4, trend: "neutral" },
  { team: "Criollos", points: 41, w: 15, l: 7, trend: "down" },
  { team: "Vaqueros", points: 42, w: 17, l: 5, trend: "up" },
]

describe("metamorphic testing for Tu Deporte Aquí sports data", () => {
  it("MR-1: adding spaces to a search query should not change the normalized query", () => {
    expect(normalizeSearchQuery("basketball")).toBe(
      normalizeSearchQuery("   basketball   "),
    )
  })

  it("MR-2: changing query casing should not change the normalized query", () => {
    expect(normalizeSearchQuery("Basketball")).toBe(
      normalizeSearchQuery("basketball"),
    )
  })

  it("MR-3: building a search URL should trim and lowercase the query", () => {
    expect(buildSearchUrl("  Basketball  ")).toBe("/search?q=basketball")
  })

  it("MR-4: empty and whitespace-only searches should both produce no URL", () => {
    expect(buildSearchUrl("")).toBeNull()
    expect(buildSearchUrl("     ")).toBeNull()
  })

  it("MR-5: sorting standings should preserve the same teams", () => {
    const sortedStandings = sortStandingsByPoints(sampleStandings)

    expect(getTeamNames(sortedStandings)).toEqual(getTeamNames(sampleStandings))
  })

  it("MR-6: sorting standings twice should produce the same result as sorting once", () => {
    const sortedOnce = sortStandingsByPoints(sampleStandings)
    const sortedTwice = sortStandingsByPoints(sortedOnce)

    expect(sortedTwice).toEqual(sortedOnce)
  })

  it("MR-7: sorted standings should be ordered from highest points to lowest points", () => {
    const sortedStandings = sortStandingsByPoints(sampleStandings)

    expect(sortedStandings.map((record) => record.points)).toEqual([
      45,
      42,
      41,
    ])
  })
})