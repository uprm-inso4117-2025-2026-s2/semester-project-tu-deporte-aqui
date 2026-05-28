import { checkLink } from '../../utils/linkTestHarness'
import { describe, it, expect } from "vitest";

const BASE_URL: string = process.env.NEXT_PUBLIC_DEV_URL ?? 'https://localhost:3000'

describe("Checking if teams page loads (make sure to start server)", () => {
  it("returns 200 on base URL", async () => {
    const result = await checkLink(`${BASE_URL}/teams`);
    expect(result.ok).toBe(true);
  })

  describe("Checking team links", async () => {
    // getting first team
    const response = await fetch(`${BASE_URL}/teams`)
    const html = await response.text()
    const regexp = html.match(/(?<=href=")teams\/.+?(?=")/)

    const first_team_link = regexp && regexp[0] || ""

    it("found the link", async () => {
      expect(first_team_link).not.toBe("")
    })

    describe("Checking that the links go to the team's page", async () => {
      const team_name = decodeURI(first_team_link).slice(10)

      it("returns 200 on the team's page", async () => {
        const result = await checkLink(`${BASE_URL}/${first_team_link}`);
        expect(result.ok).toBe(true);
      })

      it("contain's the team's name", async () => {
        const result = await checkLink(`${BASE_URL}/${first_team_link}`, [team_name]);
        expect(result.ok).toBe(true);
        expect(result.missing).toEqual([]);
      })
    })
  });
});