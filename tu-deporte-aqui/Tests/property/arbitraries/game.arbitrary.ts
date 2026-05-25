import fc from 'fast-check'

export const statusArbitrary = fc.oneof(
  fc.constantFrom(
    'live',
    'LIVE',
    'in_progress',
    'scheduled',
    'postponed',
    'final',
    'completed',
    'ongoing',
    'active',
    'bad_status',
    '',
    '   '
  ),
  fc.string(),
  fc.constant(null),
  fc.constant(undefined)
)

export const startTimeArbitrary = fc.oneof(
  
  fc.date({
  min: new Date('2025-01-01'),
  max: new Date('2030-12-31'),
}),
  fc.date().map((date: Date) => date.toISOString()),
  fc.integer(),
  fc.string(),
  fc.constant(null),
  fc.constant(undefined)
)

export const gameArbitrary = fc.record({
  status: statusArbitrary,
  gameStatus: statusArbitrary,
  game_state: statusArbitrary,

  start_time: startTimeArbitrary,
  startTime: startTimeArbitrary,
  scheduled_at: startTimeArbitrary,

  game_date: fc.option(
    fc.date().map((date: Date) =>
      date.toISOString().split('T')[0]
    )
  ),
})