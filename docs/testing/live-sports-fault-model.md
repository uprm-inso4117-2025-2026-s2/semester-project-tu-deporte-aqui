# Fault Model for Live Sports Data Display

## Lecture Topic Connection

This lecture topic task applies fault modeling to Tu Deporte Aquí's live sports information. A fault model identifies likely categories of faults so testing can target realistic failures instead of relying only on generic checks.

## Scope

The model focuses on:

- Live Games
- Standings
- News cards

## Fault Model Table

| ID | Feature | Possible Fault | User-Visible Failure | Test Implemented |
|---|---|---|---|---|
| F-1 | Live Games | Negative score | User sees an impossible score | Reject negative scores |
| F-2 | Live Games | Same team appears twice | Game appears invalid | Reject duplicate teams |
| F-3 | Live Games | Missing time/status | User cannot tell game status | Reject empty time field |
| F-4 | Live Games | Valid game data | Game should display correctly | Accept valid live game |
| F-5 | Standings | Negative wins | Invalid team record appears | Reject negative wins |
| F-6 | Standings | Negative losses | Invalid team record appears | Reject negative losses |
| F-7 | Standings | Empty team name | Blank row appears | Reject empty team names |
| F-8 | Standings | Wrong ranking order | Teams appear in incorrect order | Detect unsorted standings |
| F-9 | Standings | Correct ranking order | Teams appear ranked by points | Accept descending order |
| F-10 | News | Empty title | Blank news card appears | Reject empty title |
| F-11 | News | Empty excerpt | News card lacks useful information | Reject empty excerpt |
| F-12 | News | Valid news data | News card should display correctly | Accept valid news record |

## Reliability Benefit

This model focuses testing on realistic sports data failures that could damage user trust. Since Tu Deporte Aquí displays live sports information, invalid scores, duplicated teams, incorrect standings, or empty news cards can make the platform seem unreliable even if the page technically loads.

## Debrief

Implemented files:

- `lib/liveSportsFaultModel.ts`
- `tests/live-sports-fault-model.test.ts`

Command used:

```bash
npm test -- --run