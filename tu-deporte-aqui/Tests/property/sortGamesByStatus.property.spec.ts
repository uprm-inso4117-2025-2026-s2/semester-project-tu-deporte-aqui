import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

import {
  sortGamesByStatus,
  getGameStatusPriority,
} from '@/lib/game-sorting'

import type { SortableGameRecord } from '@/lib/game-sorting'

import { gameArbitrary } from './arbitraries//game.arbitrary'

function extractStatus(game: any) {
  return game.status ?? game.gameStatus ?? game.game_state
}


describe('sortGamesByStatus (property tests)', () => {

  it('never throws on random input', () => {
    fc.assert(
      fc.property(
        fc.array(gameArbitrary),
        (games: SortableGameRecord[]) => {
          expect(() => sortGamesByStatus(games)).not.toThrow()
        }
      )
    )
  })

  it('preserves array length', () => {
    fc.assert(
      fc.property(
        fc.array(gameArbitrary),
        (games: SortableGameRecord[]) => {
          const result = sortGamesByStatus(games)

          expect(result.length).toBe(games.length)
        }
      )
    )
  })

  it('respects status priority ordering', () => {
    fc.assert(
      fc.property(
        fc.array(gameArbitrary),
        (games: SortableGameRecord[]) => {
          const sorted = sortGamesByStatus(games)

          for (let i = 1; i < sorted.length; i++) {
            const prev = getGameStatusPriority(
  extractStatus(sorted[i - 1])
)

const curr = getGameStatusPriority(
  extractStatus(sorted[i])
)
            expect(prev).toBeLessThanOrEqual(curr)
          }
        }
      )
    )
  })

  it('is deterministic', () => {
    fc.assert(
      fc.property(
        fc.array(gameArbitrary),
        (games: SortableGameRecord[]) => {
          const a = sortGamesByStatus(games)
          const b = sortGamesByStatus(games)

          expect(a).toEqual(b)
        }
      )
    )
  })

})