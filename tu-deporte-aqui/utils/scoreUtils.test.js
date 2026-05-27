import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  formatScore,
  mapGameStatus,
  isScoreComplete,
  isStaleTimestamp,
  isValidGameTransition,
  isValidGameData,
} from "./scoreUtils";

const VALID_GAME_STATUSES = ["FT", "FINAL", "LIVE", "IN_PROGRESS", "SCHED", "SCHEDULED"];
const INVALID_GAME_STATUSES = ["PAUSED", "UNKNOWN", "POSTPONED", "", null, undefined];
const TEAM_NAMES = ["Capitanes", "Mets", "Piratas", "Leones", "Indios", "Criollos"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTeamName() {
  return TEAM_NAMES[randomInt(0, TEAM_NAMES.length - 1)];
}

function randomValidGame() {
  return {
    homeTeam: randomTeamName(),
    awayTeam: `${randomTeamName()} FC`,
    homeScore: randomInt(0, 120),
    awayScore: randomInt(0, 120),
    status: VALID_GAME_STATUSES[randomInt(0, VALID_GAME_STATUSES.length - 1)],
    lastUpdated: new Date(Date.now() - randomInt(0, 1000 * 60 * 60)).toISOString(),
  };
}

describe("scoreUtils", () => {
  describe("formatScore", () => {
    it("formats valid scores correctly", () => {
      expect(formatScore(80, 75)).toBe("80 - 75");
    });

    it("returns fallback text when home score is missing", () => {
      expect(formatScore(null, 75)).toBe("Score unavailable");
    });

    it("returns fallback text when away score is missing", () => {
      expect(formatScore(80, undefined)).toBe("Score unavailable");
    });
  });

  describe("mapGameStatus", () => {
    it("maps FT to Final", () => {
      expect(mapGameStatus("FT")).toBe("Final");
    });

    it("maps FINAL to Final", () => {
      expect(mapGameStatus("FINAL")).toBe("Final");
    });

    it("maps LIVE to Live", () => {
      expect(mapGameStatus("LIVE")).toBe("Live");
    });

    it("maps IN_PROGRESS to Live", () => {
      expect(mapGameStatus("IN_PROGRESS")).toBe("Live");
    });

    it("maps SCHED to Scheduled", () => {
      expect(mapGameStatus("SCHED")).toBe("Scheduled");
    });

    it("returns Unknown for unsupported status", () => {
      expect(mapGameStatus("POSTPONED")).toBe("Unknown");
    });

    it("returns Unknown for empty status", () => {
      expect(mapGameStatus("")).toBe("Unknown");
    });
  });

  describe("isScoreComplete", () => {
    it("returns true when both scores exist", () => {
      expect(isScoreComplete(90, 82)).toBe(true);
    });

    it("returns false when home score is null", () => {
      expect(isScoreComplete(null, 82)).toBe(false);
    });

    it("returns false when away score is undefined", () => {
      expect(isScoreComplete(90, undefined)).toBe(false);
    });
  });

  describe("randomized score validation", () => {
    it("accepts valid random game payloads", () => {
      for (let i = 0; i < 50; i += 1) {
        expect(isValidGameData(randomValidGame())).toBe(true);
      }
    });

    it("rejects invalid score values", () => {
      const invalidScoreGame = {
        ...randomValidGame(),
        homeScore: -1,
      };

      expect(isValidGameData(invalidScoreGame)).toBe(false);
    });

    it("rejects invalid raw status values", () => {
      const invalidStatusGame = {
        ...randomValidGame(),
        status: INVALID_GAME_STATUSES[randomInt(0, INVALID_GAME_STATUSES.length - 1)],
      };

      expect(isValidGameData(invalidStatusGame)).toBe(false);
    });

    it("rejects missing team names", () => {
      const invalidTeamGame = {
        ...randomValidGame(),
        homeTeam: "",
      };

      expect(isValidGameData(invalidTeamGame)).toBe(false);
    });

    it("rejects invalid timestamps", () => {
      const invalidTimestampGame = {
        ...randomValidGame(),
        lastUpdated: "not-a-date",
      };

      expect(isValidGameData(invalidTimestampGame)).toBe(false);
    });
  });

  describe("isStaleTimestamp", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-03-25T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("returns false when timestamp is within threshold", () => {
      const recent = "2026-03-25T11:55:00Z";
      expect(isStaleTimestamp(recent, 10)).toBe(false);
    });

    it("returns true when timestamp is older than threshold", () => {
      const old = "2026-03-25T11:40:00Z";
      expect(isStaleTimestamp(old, 10)).toBe(true);
    });

    it("returns true when timestamp is missing", () => {
      expect(isStaleTimestamp(null, 10)).toBe(true);
    });

    it("returns true when timestamp is invalid", () => {
      expect(isStaleTimestamp("not-a-date", 10)).toBe(true);
    });
  });

  describe("isValidGameTransition", () => {
    it("allows Scheduled -> Live", () => {
      expect(isValidGameTransition("SCHED", "LIVE")).toBe(true);
    });

    it("allows Live -> Final", () => {
      expect(isValidGameTransition("LIVE", "FT")).toBe(true);
    });

    it("rejects Final -> Live", () => {
      expect(isValidGameTransition("FT", "LIVE")).toBe(false);
    });

    it("rejects Scheduled -> Final", () => {
      expect(isValidGameTransition("SCHED", "FT")).toBe(false);
    });

    it("rejects unknown status transitions", () => {
      expect(isValidGameTransition("LIVE", "PAUSED_UNSUPPORTED")).toBe(false);
      expect(isValidGameTransition("UNKNOWN", "FT")).toBe(false);
    });
  });
});