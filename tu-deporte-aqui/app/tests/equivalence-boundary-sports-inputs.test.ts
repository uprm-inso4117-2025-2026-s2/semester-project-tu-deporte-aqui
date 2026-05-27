import { describe, expect, it } from "vitest"
import {
  isValidGameId,
  isValidJerseyNumber,
  isValidNewsletterEmail,
  isValidScore,
  isValidTeamName,
  isValidWinsLosses,
} from "../../lib/sportsValidation"

describe("equivalence classes and boundary values for Tu Deporte Aquí inputs", () => {
  describe("team name validation", () => {
    it("accepts valid non-empty team names", () => {
      expect(isValidTeamName("Capitanes")).toBe(true)
    })

    it("rejects the empty-string equivalence class", () => {
      expect(isValidTeamName("")).toBe(false)
    })

    it("rejects the whitespace-only equivalence class", () => {
      expect(isValidTeamName("     ")).toBe(false)
    })
  })

  describe("score validation", () => {
    it("accepts the lower boundary score of zero", () => {
      expect(isValidScore(0)).toBe(true)
    })

    it("accepts the positive integer score equivalence class", () => {
      expect(isValidScore(75)).toBe(true)
    })

    it("rejects the negative score equivalence class", () => {
      expect(isValidScore(-1)).toBe(false)
    })

    it("rejects the decimal score equivalence class", () => {
      expect(isValidScore(10.5)).toBe(false)
    })
  })

  describe("wins and losses validation", () => {
    it("accepts the lower boundary value of zero", () => {
      expect(isValidWinsLosses(0)).toBe(true)
    })

    it("accepts the positive integer equivalence class", () => {
      expect(isValidWinsLosses(12)).toBe(true)
    })

    it("rejects the negative wins/losses equivalence class", () => {
      expect(isValidWinsLosses(-1)).toBe(false)
    })

    it("rejects decimal wins/losses", () => {
      expect(isValidWinsLosses(3.5)).toBe(false)
    })
  })

  describe("jersey number validation", () => {
    it("accepts the lower boundary jersey number", () => {
      expect(isValidJerseyNumber(0)).toBe(true)
    })

    it("accepts a normal valid jersey number", () => {
      expect(isValidJerseyNumber(23)).toBe(true)
    })

    it("accepts the upper boundary jersey number", () => {
      expect(isValidJerseyNumber(99)).toBe(true)
    })

    it("rejects the value below the lower boundary", () => {
      expect(isValidJerseyNumber(-1)).toBe(false)
    })

    it("rejects the value above the upper boundary", () => {
      expect(isValidJerseyNumber(100)).toBe(false)
    })

    it("rejects decimal jersey numbers", () => {
      expect(isValidJerseyNumber(23.5)).toBe(false)
    })
  })

  describe("game id validation", () => {
    it("accepts the minimum valid game id", () => {
      expect(isValidGameId(1)).toBe(true)
    })

    it("accepts positive integer game ids", () => {
      expect(isValidGameId(15)).toBe(true)
    })

    it("rejects zero as a boundary invalid game id", () => {
      expect(isValidGameId(0)).toBe(false)
    })

    it("rejects negative game ids", () => {
      expect(isValidGameId(-1)).toBe(false)
    })
  })

  describe("newsletter email validation", () => {
    it("accepts a valid email format", () => {
      expect(isValidNewsletterEmail("fan@example.com")).toBe(true)
    })

    it("accepts a valid email with surrounding spaces after trimming", () => {
      expect(isValidNewsletterEmail("  fan@example.com  ")).toBe(true)
    })

    it("rejects the missing-at-symbol equivalence class", () => {
      expect(isValidNewsletterEmail("fanexample.com")).toBe(false)
    })

    it("rejects whitespace-only email input", () => {
      expect(isValidNewsletterEmail("     ")).toBe(false)
    })
  })
})