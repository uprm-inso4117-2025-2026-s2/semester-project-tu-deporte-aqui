import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { buildDisplayGame } from "./scoreWorkflow";

describe("score integration workflow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-25T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("builds a correct display object for a live game with complete score", () => {
    const rawGame = {
      homeTeam: "Capitanes",
      awayTeam: "Mets",
      homeScore: 81,
      awayScore: 77,
      status: "LIVE",
      lastUpdated: "2026-03-25T11:56:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result).toEqual({
      homeTeam: "Capitanes",
      awayTeam: "Mets",
      status: "Live",
      scoreComplete: true,
      stale: false,
      displayScore: "81 - 77",
    });
  });

  it("builds a correct display object for a final game", () => {
    const rawGame = {
      homeTeam: "Piratas",
      awayTeam: "Leones",
      homeScore: 90,
      awayScore: 88,
      status: "FT",
      lastUpdated: "2026-03-25T11:55:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.status).toBe("Final");
    expect(result.scoreComplete).toBe(true);
    expect(result.stale).toBe(false);
    expect(result.displayScore).toBe("90 - 88");
  });

  it("returns score unavailable when score data is incomplete", () => {
    const rawGame = {
      homeTeam: "Indios",
      awayTeam: "Criollos",
      homeScore: null,
      awayScore: 72,
      status: "LIVE",
      lastUpdated: "2026-03-25T11:58:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.status).toBe("Live");
    expect(result.scoreComplete).toBe(false);
    expect(result.displayScore).toBe("Score unavailable");
    expect(result.stale).toBe(false);
  });

  it("marks the game as stale when the timestamp is too old", () => {
    const rawGame = {
      homeTeam: "Santeros",
      awayTeam: "Atléticos",
      homeScore: 64,
      awayScore: 61,
      status: "LIVE",
      lastUpdated: "2026-03-25T11:40:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.scoreComplete).toBe(true);
    expect(result.displayScore).toBe("64 - 61");
    expect(result.stale).toBe(true);
  });

  it("returns unknown status for unsupported raw status values", () => {
    const rawGame = {
      homeTeam: "Gigantes",
      awayTeam: "Vaqueros",
      homeScore: 55,
      awayScore: 54,
      status: "PAUSED_UNSUPPORTED",
      lastUpdated: "2026-03-25T11:57:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.status).toBe("Unknown");
    expect(result.scoreComplete).toBe(true);
    expect(result.displayScore).toBe("55 - 54");
    expect(result.stale).toBe(false);
  });

  it("uses fallback team names when names are missing", () => {
    const rawGame = {
      homeScore: 70,
      awayScore: 68,
      status: "FINAL",
      lastUpdated: "2026-03-25T11:54:00Z",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.homeTeam).toBe("Unknown Home Team");
    expect(result.awayTeam).toBe("Unknown Away Team");
    expect(result.status).toBe("Final");
    expect(result.displayScore).toBe("70 - 68");
  });

  it("treats invalid timestamps as stale", () => {
    const rawGame = {
      homeTeam: "Brujos",
      awayTeam: "Cariduros",
      homeScore: 79,
      awayScore: 74,
      status: "LIVE",
      lastUpdated: "not-a-date",
    };

    const result = buildDisplayGame(rawGame, 10);

    expect(result.scoreComplete).toBe(true);
    expect(result.displayScore).toBe("79 - 74");
    expect(result.stale).toBe(true);
  });
});