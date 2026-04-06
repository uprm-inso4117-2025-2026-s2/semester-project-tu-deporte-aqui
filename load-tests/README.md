# Load Testing for tu-deporte-aqui

This folder contains k6 load tests for API endpoints.
The tests run against the local server and are a proof of concept for branch `games-n-standings`.
No production files are changed.

## Requirements

- k6 installed locally
- Local dev server running at `http://localhost:3000`

## Install k6 (Windows)

Download `k6.exe` from the official `grafana/k6` GitHub releases and extract it to a local folder:
https://github.com/grafana/k6/releases

Example: `C:\tools\k6` or another folder of your choice.

Verify installation:

```powershell
& "C:\path\to\k6\k6.exe" version
```

## Run the test

1. Start the app in `tu-deporte-aqui/`:

```powershell
npm.cmd run dev
```

2. In a new terminal, run k6:

```powershell
& "C:\path\to\k6\k6.exe" run ".\load-tests\api-endpoints.test.js"
```

## What this script tests

- User ramp: 20 -> 50 -> 0 virtual users
- Total time: about 50 seconds
- Endpoints:
  - `GET /api/games`
  - `GET /api/standings`
- Main metrics:
  - Response time (`p95 < 500ms`)
  - Error rate (`< 10%`)
  - HTTP status checks (`200`)

## Save results to JSON

```powershell
& "C:\path\to\k6\k6.exe" run --out json=.\load-tests\results.json ".\load-tests\api-endpoints.test.js"
```

This creates `results.json` for PR evidence.

## Quick troubleshooting

If you get `Cannot connect to http://localhost:3000`:
- Make sure `npm.cmd run dev` is running
- Make sure port 3000 is not blocked by another process

If you get a script path error:
- Confirm `load-tests/api-endpoints.test.js` exists
- Confirm the full file path is correct
