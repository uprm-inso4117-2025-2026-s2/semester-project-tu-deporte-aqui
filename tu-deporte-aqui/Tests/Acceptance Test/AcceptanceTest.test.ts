import {
  normalizeGameStatus,
  getGameLabelStatus,
} from "@/lib/label_status"
import { describe, test, expect, it, vi } from 'vitest'
import { checkLink } from "../../utils/linkTestHarness"

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

// Making sure link harness is working.
// All these test must pass for it to be working.
vi.mock("../../utils/linkTestHarness", async () => {
  const fakeResponses : Record<string, { status: number; body: string }> = {
    "https://example.com": {
      status: 200,
      body: "<h1>Example Domain</h1><p>This domain is for use in illustrative examples.</p>",
    },
    "https://example.com/about": {
      status: 200,
      body: "<title>About Us</title><p>Welcome to our about page.</p>",
    },
    "https://example.com/missing": {
      status: 404,
      body: "<h1>Not Found</h1>",
    },
    "https://example.com/error": {
      status: 500,
      body: "Internal Server Error",
    },
  };

  async function fakeFetch(url: string) {
    const res = fakeResponses[url];
    if (!res) throw new Error(`No mock defined for: ${url}`);
    return res;
  }

  return {
    fetchLink: fakeFetch,
    checkLink: async (url: string, expectedStrings = []) => {
      const { status, body } = await fakeFetch(url);
      const missing = expectedStrings.filter((s) => !body.includes(s));
      return { ok: status === 200 && missing.length === 0, status, missing };
    },
  };
});

describe("checkStatus", () => {
  it("returns ok:true for a 200 response", async () => {
    const result = await checkLink("https://example.com");
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
  });

  it("returns ok:false for a 404 response", async () => {
    const result = await checkLink("https://example.com/missing");
    expect(result.ok).toBe(false);
    expect(result.status).toBe(404);
  });

  it("returns ok:false for a 500 response", async () => {
    const result = await checkLink("https://example.com/error");
    expect(result.ok).toBe(false);
    expect(result.status).toBe(500);
  });
});

describe("checkContent", () => {
  it("passes when all expected strings are present", async () => {
    const result = await checkLink("https://example.com", [
      "Example Domain",
      "illustrative examples",
    ]);
    expect(result.ok).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("fails when an expected string is absent", async () => {
    const result = await checkLink("https://example.com", [
      "Example Domain",
      "this string does not exist",
    ]);
    expect(result.ok).toBe(false);
    expect(result.missing).toContain("this string does not exist");
  });

  it("fails with status error even if strings would match", async () => {
    const result = await checkLink("https://example.com/missing", ["Not Found"]);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(404);
    expect(result.missing).toEqual([]);
  });

  it("passes with no expected strings (status-only check)", async () => {
    const result = await checkLink("https://example.com/about");
    expect(result.ok).toBe(true);
  });

  it("reports all missing strings", async () => {
    const result = await checkLink("https://example.com", [
      "alpha",
      "beta",
      "Example Domain",
    ]);
    expect(result.missing).toEqual(["alpha", "beta"]);
  });
});

describe("real network checks", () => {
  it("example.com returns 200", async () => {
    const result = await checkLink("https://example.com");
    expect(result.ok).toBe(true);
  });

  it("example.com contains expected content", async () => {
    const result = await checkLink("https://example.com", ["Example Domain"]);
    expect(result.ok).toBe(true);
    expect(result.missing).toEqual([]);
  });
});
