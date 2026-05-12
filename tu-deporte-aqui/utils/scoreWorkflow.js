import {
  formatScore,
  mapGameStatus,
  isScoreComplete,
  isStaleTimestamp,
} from "./scoreUtils";

/**
 * Transforms raw game data into a UI-ready game object.
 * This file is meant to represent a small integration layer
 * where multiple score processing utilities work together.
 */
export function buildDisplayGame(rawGame, staleThresholdMinutes = 10) {
  const homeScore = rawGame?.homeScore;
  const awayScore = rawGame?.awayScore;
  const rawStatus = rawGame?.status;
  const lastUpdated = rawGame?.lastUpdated;

  const status = mapGameStatus(rawStatus);
  const scoreComplete = isScoreComplete(homeScore, awayScore);
  const stale = isStaleTimestamp(lastUpdated, staleThresholdMinutes);

  return {
    homeTeam: rawGame?.homeTeam ?? "Unknown Home Team",
    awayTeam: rawGame?.awayTeam ?? "Unknown Away Team",
    status,
    scoreComplete,
    stale,
    displayScore: scoreComplete ? formatScore(homeScore, awayScore) : "Score unavailable",
  };
}