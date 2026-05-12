import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  formatScore,
  mapGameStatus,
  isScoreComplete,
  isStaleTimestamp,
} from "./scoreUtils";

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
});