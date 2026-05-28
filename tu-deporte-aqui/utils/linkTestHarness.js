/**
 * Fetches a URL and returns status code + page content.
 * @param {string} url
 * @returns {Promise<{ status: number, body: string }>}
 */
export async function fetchLink(url) {
  const response = await fetch(url);
  const body = await response.text();
  return { status: response.status, body };
}

/**
 * Checks that a URL returns 200 and that all expected strings appear in the body.
 * @param {string} url
 * @param {string[]} expectedStrings
 * @returns {Promise<{ ok: boolean, status: number, missing: string[] }>}
 */
export async function checkLink(url, expectedStrings = []) {
  const { status, body } = await fetchLink(url);
  const missing = expectedStrings.filter((s) => !body.includes(s));
  return {
    ok: status === 200 && missing.length === 0,
    status,
    missing,
  };
}