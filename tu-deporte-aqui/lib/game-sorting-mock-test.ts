/**
 * Basic verification for game sorting logic.
 *
 * This file is a smoke check: it uses mock data and validates
 * key issue rules (status priority, normalization, and tie-breaking by time).
 */

/**
 * Steps to run the game sorting smoke check:
 * 1. Make sure your environment is ready (Node.js, node, and npm).
 * 2. In the project folder (tu-deporte-aqui), run:
 *    - npm.cmd install
 *    - npm.cmd run typecheck
 *    - npm.cmd install -D tsx (if not installed)
 *
 * 3. Run the smoke check:
 *    - node --import tsx -e "import('./lib/game-sorting-mock-test.ts').then((m) => m.printGameSortingResults())"
 * 4. Verify the output:
 *    - Sorted list of 6 games: live -> live -> upcoming -> delayed -> final -> unknown
 *    - 6 checks with ✓ (all passed)
 *    - totalChecks: 6 | passedChecks: 6 | failedChecks: 0 | allPassed: true
 */

import { normalizeGameStatus, sortGamesByStatus } from "@/lib/game-sorting"
import { mockGames, type MockGame } from "@/lib/mock-games"

export interface SmokeCheckResult {
  name: string
  passed: boolean
  details: string
}

function toStatusList(games: MockGame[]) {
  return games.map((game) => normalizeGameStatus(game.status))
}

function isSortedByStartTimeWithinStatus(games: MockGame[], status: string) {
  const subset = games.filter((game) => normalizeGameStatus(game.status) === status)

  for (let i = 1; i < subset.length; i += 1) {
    const previous = Date.parse(`${subset[i - 1].game_date}T${subset[i - 1].start_time}`)
    const current = Date.parse(`${subset[i].game_date}T${subset[i].start_time}`)

    if (current < previous) {
      return false
    }
  }

  return true
}

export function runGameSortingSmokeChecks(data: MockGame[] = mockGames): SmokeCheckResult[] {
  const sorted = sortGamesByStatus(data)
  const normalizedStatusOrder = toStatusList(sorted)

  const firstUpcomingIndex = normalizedStatusOrder.indexOf("upcoming")
  const firstFinalIndex = normalizedStatusOrder.indexOf("final")
  const firstDelayedIndex = normalizedStatusOrder.indexOf("delayed")

  const livePositions = normalizedStatusOrder
    .map((status, index) => ({ status, index }))
    .filter((item) => item.status === "live")
    .map((item) => item.index)

  const results: SmokeCheckResult[] = [
    {
      name: "Live games appear first",
      passed:
        livePositions.length > 0
          ? livePositions.every(
            (position) =>
              position <
              (firstUpcomingIndex === -1 ? Number.MAX_SAFE_INTEGER : firstUpcomingIndex),
          )
          : true,
      details: `Order: ${normalizedStatusOrder.join(" -> ")}`,
    },
    {
      name: "Upcoming games appear after live",
      passed:
        firstUpcomingIndex === -1 ||
        livePositions.length === 0 ||
        firstUpcomingIndex > Math.max(...livePositions),
      details: `Live positions: [${livePositions.join(", ")}], first upcoming index: ${firstUpcomingIndex}`,
    },
    {
      name: "Final games appear after active and scheduled",
      passed:
        firstFinalIndex === -1 ||
        firstFinalIndex > Math.max(...livePositions, firstUpcomingIndex),
      details: `First final index: ${firstFinalIndex}, first upcoming index: ${firstUpcomingIndex}`,
    },
    {
      name: "Delayed/postponed games are normalized",
      passed: firstDelayedIndex !== -1,
      details: `First delayed index: ${firstDelayedIndex}`,
    },
    {
      name: "Same-status games are sorted by start time",
      passed:
        isSortedByStartTimeWithinStatus(sorted, "live") &&
        isSortedByStartTimeWithinStatus(sorted, "upcoming"),
      details: "Checked live and upcoming groups for ascending game_date + start_time order",
    },
    {
      name: "Status naming variations are normalized",
      passed:
        normalizeGameStatus("in_progress") === "live" &&
        normalizeGameStatus("scheduled") === "upcoming" &&
        normalizeGameStatus("postponed") === "delayed" &&
        normalizeGameStatus("final") === "final",
      details: "Validated in_progress, scheduled, postponed, and final",
    },
  ]

  return results
}

export function printGameSortingResults(data: MockGame[] = mockGames) {
  const summary = getGameSortingSmokeSummary(data)

  console.log("\n=== Sorted Games ===")
  for (const game of summary.sortedGames) {
    const pos = String(game.position).padEnd(2)
    const status = `[${game.status}]`.padEnd(10)
    const league = game.league.padEnd(42)
    const venue = game.venue.padEnd(42)
    const time = game.time.slice(11, 16)
    console.log(`${pos} ${status} ${league} - ${venue} ${time}`)
  }

  console.log("\n=== Smoke Check Results ===")
  for (const result of summary.results) {
    const icon = result.passed ? "✓" : "✗"
    console.log(`${icon} ${result.name}`)
  }

  console.log(`\ntotalChecks: ${summary.totalChecks} | passedChecks: ${summary.passedChecks} | failedChecks: ${summary.failedChecks} | allPassed: ${summary.allPassed}`)
}

export function getGameSortingSmokeSummary(data: MockGame[] = mockGames) {
  const results = runGameSortingSmokeChecks(data)
  const passedChecks = results.filter((result) => result.passed).length
  const sorted = sortGamesByStatus(data)

  const sortedGames = sorted.map((game, index) => ({
    position: index + 1,
    status: normalizeGameStatus(game.status),
    league: game.league,
    venue: game.venue,
    time: `${game.game_date} ${game.start_time}`,
  }))

  return {
    totalChecks: results.length,
    passedChecks,
    failedChecks: results.length - passedChecks,
    allPassed: passedChecks === results.length,
    sortedGames,
    results,
  }
}
