export function isValidTeamName(teamName: string): boolean {
  return teamName.trim().length > 0
}

export function isValidScore(score: number): boolean {
  return Number.isInteger(score) && score >= 0
}

export function isValidWinsLosses(value: number): boolean {
  return Number.isInteger(value) && value >= 0
}

export function isValidJerseyNumber(jerseyNumber: number): boolean {
  return (
    Number.isInteger(jerseyNumber) &&
    jerseyNumber >= 0 &&
    jerseyNumber <= 99
  )
}

export function isValidGameId(gameId: number): boolean {
  return Number.isInteger(gameId) && gameId > 0
}

export function isValidNewsletterEmail(email: string): boolean {
  const trimmedEmail = email.trim()

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
}