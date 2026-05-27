/**
 * Mock games used to validate sorting logic during development.
 *
 * Includes multiple statuses (live, scheduled, in_progress, postponed, final,
 * unknown_state) to cover normalization and date/time tie-breaking.
 */
export interface MockGame {
  id: number
  league: string
  season: number
  game_date: string
  start_time: string
  venue: string
  status: string
  home_team_id: number
  away_team_id: number
  home_score: number | null
  away_score: number | null
}

export const mockGames: MockGame[] = [
  // Live
  {
    id: 101,
    league: "Liga de Béisbol Superior Doble A",
    season: 2026,
    game_date: "2026-03-16",
    start_time: "18:00:00",
    venue: "Estadio Hiram Bithorn, San Juan",
    status: "live",
    home_team_id: 1,
    away_team_id: 2,
    home_score: 2,
    away_score: 1,
  },
  // Upcoming (scheduled)
  {
    id: 102,
    league: "Liga de Béisbol Profesional Roberto Clemente",
    season: 2026,
    game_date: "2026-03-16",
    start_time: "21:00:00",
    venue: "Estadio Roberto Clemente Walker, Carolina",
    status: "scheduled",
    home_team_id: 3,
    away_team_id: 4,
    home_score: null,
    away_score: null,
  },
  // Live (in_progress)
  {
    id: 103,
    league: "Liga de Béisbol Superior Doble A",
    season: 2026,
    game_date: "2026-03-16",
    start_time: "17:30:00",
    venue: "Estadio Isidoro García, Mayagüez",
    status: "in_progress",
    home_team_id: 5,
    away_team_id: 6,
    home_score: 4,
    away_score: 3,
  },
  // Delayed (postponed)
  {
    id: 104,
    league: "Liga Atlética Interuniversitaria - Fútbol",
    season: 2026,
    game_date: "2026-03-17",
    start_time: "19:00:00",
    venue: "Estadio Juan Ramón Loubriel, Bayamón",
    status: "postponed",
    home_team_id: 7,
    away_team_id: 8,
    home_score: null,
    away_score: null,
  },
  // Final
  {
    id: 105,
    league: "Baloncesto Superior Nacional (BSN)",
    season: 2026,
    game_date: "2026-03-15",
    start_time: "16:00:00",
    venue: "Coliseo Rubén Rodríguez, Bayamón",
    status: "final",
    home_team_id: 9,
    away_team_id: 10,
    home_score: 5,
    away_score: 2,
  },
  // Unknown
  {
    id: 106,
    league: "Baloncesto Superior Nacional (BSN)",
    season: 2026,
    game_date: "2026-03-16",
    start_time: "20:00:00",
    venue: "Coliseo Guillermo Angulo, Ponce",
    status: "unknown_state",
    home_team_id: 11,
    away_team_id: 12,
    home_score: null,
    away_score: null,
  },
]