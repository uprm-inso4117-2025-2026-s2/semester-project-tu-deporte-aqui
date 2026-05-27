/**
 * Reusable utility to sort games by status and start time.
 *
 * This logic is independent from the data source (mock, API, or DB)
 * and normalizes different status naming conventions so ordering
 * stays consistent across the platform.
 */
export type NormalizedGameStatus =
  | "live"
  | "upcoming"
  | "delayed"
  | "final"
  | "unknown"

export type SortableStatus = string | null | undefined

export type SortableStartTime = string | number | Date | null | undefined

export interface SortableGameRecord {
  status?: SortableStatus
  gameStatus?: SortableStatus
  game_state?: SortableStatus
  start_time?: SortableStartTime
  startTime?: SortableStartTime
  scheduled_at?: SortableStartTime
  game_date?: string | null | undefined
}

export interface SortGamesOptions<T> {
  getStatus?: (game: T) => SortableStatus
  getStartTime?: (game: T) => SortableStartTime
}

const STATUS_ALIASES: Record<string, NormalizedGameStatus> = {
  live: "live",
  in_progress: "live",
  inprogress: "live",
  ongoing: "live",
  active: "live",

  upcoming: "upcoming",
  scheduled: "upcoming",
  not_started: "upcoming",
  pregame: "upcoming",
  pending: "upcoming",

  delayed: "delayed",
  postponed: "delayed",
  suspended: "delayed",
  rain_delay: "delayed",

  final: "final",
  finished: "final",
  complete: "final",
  completed: "final",
  ended: "final",
}

const STATUS_PRIORITY: Record<NormalizedGameStatus, number> = {
  // Main display priority.
  live: 0,
  upcoming: 1,
  delayed: 2,
  final: 3,
  unknown: 4,
}

function normalizeStatusKey(input: string) {
  return input.trim().toLowerCase().replace(/[\s-]+/g, "_")
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function combineDateAndTime(dateValue: unknown, timeValue: unknown) {
  if (typeof dateValue !== "string" || typeof timeValue !== "string") {
    return null
  }

  const date = dateValue.trim()
  const time = timeValue.trim()

  if (!date || !time) {
    return null
  }

  // Combine date and time to support tie-breaking by actual start.
  return `${date}T${time}`
}

function toTimestamp(value: SortableStartTime) {
  // If start time is invalid or missing, place it at the end.
  if (value == null) {
    return Number.POSITIVE_INFINITY
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY
  }

  if (value instanceof Date) {
    const timestamp = value.getTime()
    return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY
  }

  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY
}

function getDefaultStatus(game: unknown): SortableStatus {
  if (!isRecord(game)) {
    return undefined
  }

  const candidate = game.status ?? game.gameStatus ?? game.game_state
  return typeof candidate === "string" ? candidate : undefined
}

function getDefaultStartTime(game: unknown): SortableStartTime {
  if (!isRecord(game)) {
    return undefined
  }

  const directStartTime = game.start_time ?? game.startTime ?? game.scheduled_at

  if (
    typeof directStartTime === "string" ||
    typeof directStartTime === "number" ||
    directStartTime instanceof Date
  ) {
    if (typeof directStartTime === "string" && typeof game.game_date === "string") {
      return combineDateAndTime(game.game_date, directStartTime) ?? directStartTime
    }

    return directStartTime
  }

  return combineDateAndTime(game.game_date, game.start_time)
}

export function normalizeGameStatus(input: SortableStatus): NormalizedGameStatus {
  if (!input) {
    return "unknown"
  }

  // Normalize variants like in_progress, scheduled, postponed, etc.
  const key = normalizeStatusKey(input)
  return STATUS_ALIASES[key] ?? "unknown"
}

export function getGameStatusPriority(status: SortableStatus) {
  return STATUS_PRIORITY[normalizeGameStatus(status)]
}

export function sortGamesByStatus<T>(games: T[], options: SortGamesOptions<T> = {}) {
  const getStatus = options.getStatus ?? ((game: T) => getDefaultStatus(game))
  const getStartTime = options.getStartTime ?? ((game: T) => getDefaultStartTime(game))

  return games
    .map((game, index) => ({ game, index }))
    .sort((left, right) => {
      const leftPriority = getGameStatusPriority(getStatus(left.game))
      const rightPriority = getGameStatusPriority(getStatus(right.game))

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority
      }

      // Secondary rule: sort by start time within the same status.
      const leftTime = toTimestamp(getStartTime(left.game))
      const rightTime = toTimestamp(getStartTime(right.game))

      if (leftTime !== rightTime) {
        return leftTime - rightTime
      }

      // Keep stable order when priority and time are the same.
      return left.index - right.index
    })
    .map(({ game }) => game)
}
