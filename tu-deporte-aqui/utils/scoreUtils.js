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