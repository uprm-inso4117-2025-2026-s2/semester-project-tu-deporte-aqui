export function formatScore(homeScore, awayScore) {
  if (homeScore == null || awayScore == null) {
    return "Score unavailable";
  }

  return `${homeScore} - ${awayScore}`;
}

export function mapGameStatus(rawStatus) {
  if (!rawStatus) return "Unknown";

  const normalized = rawStatus.toUpperCase();

  if (normalized === "FT" || normalized === "FINAL") return "Final";
  if (normalized === "LIVE" || normalized === "IN_PROGRESS") return "Live";
  if (normalized === "SCHED" || normalized === "SCHEDULED") return "Scheduled";

  return "Unknown";
}

const ALLOWED_GAME_STATE_TRANSITIONS = {
  Scheduled: new Set(["Scheduled", "Live"]),
  Live: new Set(["Live", "Final"]),
  Final: new Set(["Final"]),
};

export function isValidGameTransition(fromRawStatus, toRawStatus) {
  const from = mapGameStatus(fromRawStatus);
  const to = mapGameStatus(toRawStatus);

  if (from === "Unknown" || to === "Unknown") {
    return false;
  }

  return ALLOWED_GAME_STATE_TRANSITIONS[from]?.has(to) ?? false;
}

export function getAllowedGameStateTransitions() {
  return Object.entries(ALLOWED_GAME_STATE_TRANSITIONS).flatMap(([from, allowed]) =>
    [...allowed].map((to) => ({ from, to }))
  );
}

export function isValidScoreValue(score) {
  return typeof score === "number" && Number.isFinite(score) && score >= 0 && Number.isInteger(score);
}

export function isValidGameData(rawGame) {
  if (!rawGame || typeof rawGame !== "object") return false;

  if (typeof rawGame.homeTeam !== "string" || rawGame.homeTeam.trim() === "") return false;
  if (typeof rawGame.awayTeam !== "string" || rawGame.awayTeam.trim() === "") return false;

  if (!isValidScoreValue(rawGame.homeScore) || !isValidScoreValue(rawGame.awayScore)) {
    return false;
  }

  if (mapGameStatus(rawGame.status) === "Unknown") return false;
  if (rawGame.lastUpdated != null && Number.isNaN(new Date(rawGame.lastUpdated).getTime())) return false;

  return true;
}

export function isScoreComplete(homeScore, awayScore) {
  return homeScore !== null &&
    homeScore !== undefined &&
    awayScore !== null &&
    awayScore !== undefined;
}

export function isStaleTimestamp(lastUpdated, thresholdMinutes = 10) {
  if (!lastUpdated) return true;

  const lastUpdatedDate = new Date(lastUpdated);
  if (Number.isNaN(lastUpdatedDate.getTime())) return true;

  const now = new Date();
  const diffMs = now - lastUpdatedDate;
  const diffMinutes = diffMs / (1000 * 60);

  return diffMinutes > thresholdMinutes;
}