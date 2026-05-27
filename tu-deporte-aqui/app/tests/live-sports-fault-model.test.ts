import { describe, expect, it } from "vitest"
import {
  isSortedByDescendingPoints,
  isValidLiveGame,
  isValidNewsRecord,
  isValidStanding,
} from "../../lib/liveSportsFaultModel"

describe("fault model checks for live sports data display", () => {
  describe("live games faults", () => {
    it("F-1: rejects live games with negative scores", () => {
      expect(
        isValidLiveGame({
          team1: "Capitanes",
          team2: "Vaqueros",
          score1: -1,
          score2: 75,
          time: "Q4 3:45",
        }),
      ).toBe(false)
    })

    it("F-2: rejects live games where both teams are the same", () => {
      expect(
        isValidLiveGame({
          team1: "Capitanes",
          team2: "Capitanes",
          score1: 80,
          score2: 75,
          time: "Q4 3:45",
        }),
      ).toBe(false)
    })

    it("F-3: rejects live games with missing time/status", () => {
      expect(
        isValidLiveGame({
          team1: "Capitanes",
          team2: "Vaqueros",
          score1: 80,
          score2: 75,
          time: "   ",
        }),
      ).toBe(false)
    })

    it("F-4: accepts a valid live game record", () => {
      expect(
        isValidLiveGame({
          team1: "Capitanes",
          team2: "Vaqueros",
          score1: 80,
          score2: 75,
          time: "Q4 3:45",
        }),
      ).toBe(true)
    })
  })

  describe("standings faults", () => {
    it("F-5: rejects standings with negative wins", () => {
      expect(
        isValidStanding({
          team: "Capitanes",
          points: 45,
          w: -1,
          l: 4,
        }),
      ).toBe(false)
    })

    it("F-6: rejects standings with negative losses", () => {
      expect(
        isValidStanding({
          team: "Capitanes",
          points: 45,
          w: 18,
          l: -1,
        }),
      ).toBe(false)
    })

    it("F-7: rejects standings with empty team names", () => {
      expect(
        isValidStanding({
          team: "   ",
          points: 45,
          w: 18,
          l: 4,
        }),
      ).toBe(false)
    })

    it("F-8: detects standings that are not sorted by descending points", () => {
      expect(
        isSortedByDescendingPoints([
          { team: "Criollos", points: 41, w: 15, l: 7 },
          { team: "Capitanes", points: 45, w: 18, l: 4 },
          { team: "Vaqueros", points: 42, w: 17, l: 5 },
        ]),
      ).toBe(false)
    })

    it("F-9: accepts standings sorted by descending points", () => {
      expect(
        isSortedByDescendingPoints([
          { team: "Capitanes", points: 45, w: 18, l: 4 },
          { team: "Vaqueros", points: 42, w: 17, l: 5 },
          { team: "Criollos", points: 41, w: 15, l: 7 },
        ]),
      ).toBe(true)
    })
  })

  describe("news faults", () => {
    it("F-10: rejects news records with empty titles", () => {
      expect(
        isValidNewsRecord({
          title: "   ",
          excerpt: "Valid news excerpt.",
        }),
      ).toBe(false)
    })

    it("F-11: rejects news records with empty excerpts", () => {
      expect(
        isValidNewsRecord({
          title: "Capitanes Win Championship",
          excerpt: "   ",
        }),
      ).toBe(false)
    })

    it("F-12: accepts valid news records", () => {
      expect(
        isValidNewsRecord({
          title: "Capitanes Win Championship",
          excerpt: "A valid news excerpt.",
        }),
      ).toBe(true)
    })
  })
})