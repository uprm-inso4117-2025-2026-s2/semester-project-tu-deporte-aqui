/*
To test code, add the following stuff to page.tsx aka the main page
the console.logs have to be added inside the page function, before the return
and to see the console and the results, do "npm run dev" (after installing all dependencies and setting the .env.local)
then open http://localhost:3000 and on your keyborad open dev tools (press f12)
results should appear there.
Code: 

"use client"

import { getGameLabelStatus } from "../lib/label_status"


  console.log("live =>", getGameLabelStatus("live"))
  console.log("scheduled =>", getGameLabelStatus("scheduled"))
  console.log("final =>", getGameLabelStatus("final"))
  console.log("cancelled =>", getGameLabelStatus("cancelled"))
  console.log("random =>", getGameLabelStatus("random"))

*/


/*
Labels:
- Provisional: game is not finished yet
- Confirmed: game has finished
- Non oficial: status is unknown, unreliable, canceled, or unofficial
*/
export type NormalizedGameStatus =
  | "live"
  | "upcoming"
  | "delayed"
  | "final"
  | "canceled"
  | "unknown"

export type GameLabelStatus = "Provisional" | "Confirmed" | "Non oficial"

export type SortableStatus = string | null | undefined

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

  canceled: "canceled",
  cancelled: "canceled",
  abandoned: "canceled",
  interrupted: "canceled",
  disputed: "canceled",
}

function normalizeStatusKey(input: string) {
  return input.trim().toLowerCase().replace(/[\s-]+/g, "_")
}

export function normalizeGameStatus(input: SortableStatus): NormalizedGameStatus {
  if (!input) {
    return "unknown"
  }

  const key = normalizeStatusKey(input)
  return STATUS_ALIASES[key] ?? "unknown"
}

export function getGameLabelStatus(status: SortableStatus): GameLabelStatus {
  const normalized = normalizeGameStatus(status)

  switch (normalized) {
    case "live":
    case "upcoming":
    case "delayed":
      return "Provisional"

    case "final":
      return "Confirmed"

    case "canceled":
    case "unknown":
    default:
      return "Non oficial"
  }
}