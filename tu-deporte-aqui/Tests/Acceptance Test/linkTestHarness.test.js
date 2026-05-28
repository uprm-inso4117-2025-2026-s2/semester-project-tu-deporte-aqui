// Making sure link harness is working.
// All these test must pass for it to be working.

import { describe, it, expect, vi } from "vitest";
import { checkLink } from "../../utils/linkTestHarness";

vi.mock("./linkChecker.js", async () => {
  const fakeResponses = {
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

  async function fakeFetch(url) {
    const res = fakeResponses[url];
    if (!res) throw new Error(`No mock defined for: ${url}`);
    return res;
  }

  return {
    fetchLink: fakeFetch,
    checkLink: async (url, expectedStrings = []) => {
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

// Remove .skip to run against the real network
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
