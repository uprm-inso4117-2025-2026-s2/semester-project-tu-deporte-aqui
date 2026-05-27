import { describe, it, expect } from 'vitest'
import {
  teamInfosBSN,
  teamInfosBaseLBP,
  teamInfosLAI,
} from '../app/teams/teamInfo'

const allTeams = [
  ...teamInfosBSN,
  ...teamInfosBaseLBP,
  ...teamInfosLAI,
]

const bsnWithPlayers = teamInfosBSN.filter(
  t => t.players && t.players.length > 0
)

const teamsWithLinks = allTeams.filter(
  t => t.socialLinks && Object.keys(t.socialLinks).length > 0
)

const teamsWithPastStats = teamInfosBSN.filter(
  t => t.pastSeasonStats && t.pastSeasonStats.length > 0
)

// ─── Record invariants ──────────────────────────────────────────────────────

describe('record invariants', () => {
  it('wins and losses are always non-negative', () => {
    allTeams.forEach(team => {
      expect(team.wins).toBeGreaterThanOrEqual(0)
      expect(team.losses).toBeGreaterThanOrEqual(0)
    })
  })

  it('wins and losses are always integers', () => {
    allTeams.forEach(team => {
      expect(Number.isInteger(team.wins)).toBe(true)
      expect(Number.isInteger(team.losses)).toBe(true)
    })
  })

  it('total games played is always non-negative', () => {
    allTeams.forEach(team => {
      expect(team.wins + team.losses).toBeGreaterThanOrEqual(0)
    })
  })
})

// ─── Team name invariants ───────────────────────────────────────────────────

describe('team name invariants', () => {
  it('team names are always non-empty strings', () => {
    allTeams.forEach(team => {
      expect(typeof team.name).toBe('string')
      expect(team.name.trim().length).toBeGreaterThan(0)
    })
  })
})

// ─── Player invariants ──────────────────────────────────────────────────────

describe('player invariants', () => {
  it('player names are always non-empty', () => {
    bsnWithPlayers.forEach(team => {
      team.players.forEach(player => {
        expect(typeof player.name).toBe('string')
        expect(player.name.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('player positions are always non-empty', () => {
    bsnWithPlayers.forEach(team => {
      team.players.forEach(player => {
        expect(typeof player.position).toBe('string')
        expect(player.position.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('player heights are always non-empty', () => {
    bsnWithPlayers.forEach(team => {
      team.players.forEach(player => {
        expect(typeof player.height).toBe('string')
        expect(player.height.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('isImport is always boolean when defined', () => {
    bsnWithPlayers.forEach(team => {
      team.players.forEach(player => {
        if (player.isImport !== undefined) {
          expect(typeof player.isImport).toBe('boolean')
        }
      })
    })
  })
})

// ─── Social link invariants ─────────────────────────────────────────────────

describe('social link invariants', () => {
  it('social link URLs are always valid https links', () => {
    teamsWithLinks.forEach(team => {
      const links = Object.values(team.socialLinks)

      links.forEach(url => {
        expect(typeof url).toBe('string')
        expect(url).toMatch(/^https:\/\//)
        expect(url.trim().length).toBeGreaterThan(8)
      })
    })
  })
})

// ─── Past season stats invariants ───────────────────────────────────────────

describe('past season stats invariants', () => {
  it('past season stats always have non-negative wins and losses', () => {
    teamsWithPastStats.forEach(team => {
      team.pastSeasonStats.forEach(stat => {
        expect(stat.wins).toBeGreaterThanOrEqual(0)
        expect(stat.losses).toBeGreaterThanOrEqual(0)
        expect(stat.season.trim().length).toBeGreaterThan(0)
      })
    })
  })
})

// ─── Sorting invariants ─────────────────────────────────────────────────────

describe('sorting invariants', () => {
  it('sorting by wins produces descending BSN standings', () => {
    const sorted = [...teamInfosBSN].sort((a, b) => b.wins - a.wins)

    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].wins).toBeGreaterThanOrEqual(sorted[i + 1].wins)
    }
  })

  it('sorting by wins produces descending LAI standings', () => {
    const sorted = [...teamInfosLAI].sort((a, b) => b.wins - a.wins)

    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].wins).toBeGreaterThanOrEqual(sorted[i + 1].wins)
    }
  })
})