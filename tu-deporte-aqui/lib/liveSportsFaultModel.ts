export type LiveGameRecord = {
  team1: string
  team2: string
  score1: number
  score2: number
  time: string
}

export type StandingRecord = {
  team: string
  points: number
  w: number
  l: number
}

export type NewsRecord = {
  title: string
  excerpt: string
}

export function hasValidTeamName(teamName: string): boolean {
  return teamName.trim().length > 0
}

export function hasValidScore(score: number): boolean {
  return Number.isInteger(score) && score >= 0
}

export function hasDifferentTeams(game: LiveGameRecord): boolean {
  return game.team1.trim().toLowerCase() !== game.team2.trim().toLowerCase()
}

export function hasValidGameTime(game: LiveGameRecord): boolean {
  return game.time.trim().length > 0
}

export function isValidLiveGame(game: LiveGameRecord): boolean {
  return (
    hasValidTeamName(game.team1) &&
    hasValidTeamName(game.team2) &&
    hasDifferentTeams(game) &&
    hasValidScore(game.score1) &&
    hasValidScore(game.score2) &&
    hasValidGameTime(game)
  )
}

export function isValidStanding(record: StandingRecord): boolean {
  return (
    hasValidTeamName(record.team) &&
    Number.isInteger(record.points) &&
    Number.isInteger(record.w) &&
    Number.isInteger(record.l) &&
    record.points >= 0 &&
    record.w >= 0 &&
    record.l >= 0
  )
}

export function isSortedByDescendingPoints(
  standings: StandingRecord[],
): boolean {
  return standings.every((record, index) => {
    if (index === 0) {
      return true
    }

    return standings[index - 1].points >= record.points
  })
}

export function isValidNewsRecord(news: NewsRecord): boolean {
  return news.title.trim().length > 0 && news.excerpt.trim().length > 0
}