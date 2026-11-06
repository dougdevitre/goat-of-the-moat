# Phase XII — Automated Browser Acceptance

The repository now includes `tests/dashboard_browser.cjs` and a GitHub Actions `browser` job.

The headless Chromium acceptance test exercises:
- Quick assessment and skip question.
- Switch to full evaluation.
- Optional onboarding and Skip Wizard classic mode.
- Synthetic sample (80 of 100 answered) and executive report appendix.
- JSON download.
- Opt-in local device save, reload/resume, reset, and classic entry.
- Browser JavaScript error detection.

## Run locally
```sh
npm install --no-save --no-package-lock playwright@1.58.2
npx playwright install chromium
python -m http.server 8000 --bind 127.0.0.1 &
BASE_URL=http://127.0.0.1:8000 node tests/dashboard_browser.cjs
```

## Scope
These tests do not certify WCAG compliance, validate the substantive evidence, or establish security for local browser storage. No authentication or server-side storage is used. Browser tests require a Chromium download in CI and may need adjustments as browser tooling evolves.

## Verification status
Dashboard and browser test JavaScript syntax verified. The browser suite is committed but execution on GitHub Actions has not yet been independently confirmed.
