import { describe, it, expect } from 'vitest'
import {
  teamInfosBSN,
  teamInfosBaseLBP,
  teamInfosLAI,
} from '../app/teams/teamInfo'

describe('BSN – filtering', () => {
  it('returns only teams with winning records', () => {
    const winning = teamInfosBSN.filter(t => t.wins > t.losses)

    expect(winning.length).toBeGreaterThan(0)

    winning.forEach(t => {
      expect(t.wins).toBeGreaterThan(t.losses)
    })
  })

  it('returns only teams with losing records', () => {
    const losing = teamInfosBSN.filter(t => t.losses > t.wins)

    expect(losing.length).toBeGreaterThan(0)

    losing.forEach(t => {
      expect(t.losses).toBeGreaterThan(t.wins)
    })
  })
})

describe('BSN – standings sort', () => {
  it('sorting by wins descending places Osos de Manatí first', () => {
    const sorted = [...teamInfosBSN].sort((a, b) => b.wins - a.wins)

    expect(sorted[0].name).toBe('Osos de Manatí')
  })

  it('Leones de Ponce are last with 0 wins', () => {
    const sorted = [...teamInfosBSN].sort((a, b) => b.wins - a.wins)
    const last = sorted[sorted.length - 1]

    expect(last.name).toBe('Leones de Ponce')
    expect(last.wins).toBe(0)
  })
})

describe('BSN – roster validation', () => {
  it('all players have names', () => {
    teamInfosBSN.forEach(team => {
      if (team.players) {
        team.players.forEach(player => {
          expect(player.name.trim().length).toBeGreaterThan(0)
        })
      }
    })
  })

  it('all players have valid positions', () => {
    const validPositions = [
      'PG',
      'SG',
      'SF',
      'PF',
      'C',
      'G',
      'F',
      'GF',
      'G/F',
      'PG/SG',
    ]

    teamInfosBSN.forEach(team => {
      if (team.players) {
        team.players.forEach(player => {
          expect(validPositions).toContain(player.position)
        })
      }
    })
  })
})

describe('LBP – standings', () => {
  it('Bravos de Cidra lead the standings', () => {
    const sorted = [...teamInfosBaseLBP].sort(
      (a, b) => b.wins - a.wins
    )

    expect(sorted[0].name).toBe('Bravos de Cidra')
    expect(sorted[0].wins).toBe(14)
  })

  it('Caribes de Peñuelas are last', () => {
    const sorted = [...teamInfosBaseLBP].sort(
      (a, b) => b.wins - a.wins
    )

    const last = sorted[sorted.length - 1]

    expect(last.name).toBe('Caribes de Peñuelas')
  })
})

describe('LAI – standings', () => {
  it('UPR - Mayagüez leads the standings', () => {
    const sorted = [...teamInfosLAI].sort(
      (a, b) => b.wins - a.wins
    )

    expect(sorted[0].name).toBe('UPR - Mayagüez')
    expect(sorted[0].wins).toBe(17)
  })

  it('Atlantic University are last with 2 wins', () => {
    const sorted = [...teamInfosLAI].sort(
      (a, b) => b.wins - a.wins
    )

    const last = sorted[sorted.length - 1]

    expect(last.name).toBe('Atlantic University')
    expect(last.wins).toBe(2)
  })
})