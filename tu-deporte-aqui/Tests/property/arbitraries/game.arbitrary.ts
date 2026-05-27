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
  fc.string({ maxLength: 20 }),
  fc.constant(null),
  fc.constant(undefined)
)


const TimestampArbitrary = fc.integer({
  min: new Date('2025-01-01').getTime(),
  max: new Date('2030-12-31').getTime(),
})

const ISODateArbitrary = TimestampArbitrary.map((ts) =>
  new Date(ts).toISOString()
)

const safeDayArbitrary = TimestampArbitrary.map((ts) =>
  new Date(ts).toISOString().split('T')[0]
)


export const startTimeArbitrary = fc.oneof(
  ISODateArbitrary,
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

  game_date: fc.option(safeDayArbitrary),
})