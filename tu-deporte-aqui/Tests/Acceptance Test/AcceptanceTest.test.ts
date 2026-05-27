import {
  normalizeGameStatus,
  getGameLabelStatus,
} from "@/lib/label_status"
import { describe, test, expect } from 'vitest'

describe("normalizeGameStatus", () => {
  test("should normalize live aliases correctly", () => {
    expect(normalizeGameStatus("live")).toBe("live")
    expect(normalizeGameStatus("in_progress")).toBe("live")
    expect(normalizeGameStatus("ongoing")).toBe("live")
  })

  test("should normalize upcoming aliases correctly", () => {
    expect(normalizeGameStatus("scheduled")).toBe("upcoming")
    expect(normalizeGameStatus("pregame")).toBe("upcoming")
  })

  test("should normalize delayed aliases correctly", () => {
    expect(normalizeGameStatus("postponed")).toBe("delayed")
    expect(normalizeGameStatus("suspended")).toBe("delayed")
  })

  test("should normalize final aliases correctly", () => {
    expect(normalizeGameStatus("finished")).toBe("final")
    expect(normalizeGameStatus("completed")).toBe("final")
  })

  test("should normalize canceled aliases correctly", () => {
    expect(normalizeGameStatus("cancelled")).toBe("canceled")
    expect(normalizeGameStatus("abandoned")).toBe("canceled")
  })

  test("should return unknown for invalid statuses", () => {
    expect(normalizeGameStatus("random_status")).toBe("unknown")
  })

  test("should return unknown for empty values", () => {
    expect(normalizeGameStatus(null)).toBe("unknown")
    expect(normalizeGameStatus(undefined)).toBe("unknown")
  })
})

describe("getGameLabelStatus", () => {
  test("should return Provisional for live games", () => {
    expect(getGameLabelStatus("live")).toBe("Provisional")
  })

  test("should return Provisional for upcoming games", () => {
    expect(getGameLabelStatus("scheduled")).toBe("Provisional")
  })

  test("should return Provisional for delayed games", () => {
    expect(getGameLabelStatus("suspended")).toBe("Provisional")
  })

  test("should return Confirmed for final games", () => {
    expect(getGameLabelStatus("finished")).toBe("Confirmed")
  })

  test("should return Non oficial for canceled games", () => {
    expect(getGameLabelStatus("cancelled")).toBe("Non oficial")
  })

  test("should return Non oficial for unknown games", () => {
    expect(getGameLabelStatus("invalid")).toBe("Non oficial")
  })
})