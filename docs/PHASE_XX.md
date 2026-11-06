# Phase XX — Quality Assurance and Release Gate

## Automated checks

The existing CI workflow runs:

1. `node tests/dashboard_smoke.cjs` for application JavaScript, shared assets, static routes, controls, and registry invariants.
2. `python -m unittest discover -s tests -v` for scoring and calibration.
3. `node tests/dashboard_browser.cjs` in Playwright Chromium for guided, classic and quick assessment flows; synthetic example, export, draft save/resume and reset; neutral decision integrity, evidence verification and map; and opt-in same-tab session sharing between dedicated tools.

Phase XX extends the browser suite to check the responsive menu at **320px, 375px, and 768px**, Escape dismissal, `aria-expanded`, drawer inertness, horizontal overflow, and desktop navigation at 1280px.

## Local execution

```sh
node tests/dashboard_smoke.cjs
python -m unittest discover -s tests -v
npm install --no-save --no-package-lock playwright@1.58.2
npx playwright install chromium
python -m http.server 8000 --bind 127.0.0.1 &
BASE_URL=http://127.0.0.1:8000 node tests/dashboard_browser.cjs
```

## Release criteria

- [ ] GitHub Actions smoke/scoring job passed.
- [ ] GitHub Actions Chromium job passed.
- [ ] Mobile and desktop layouts visually reviewed.
- [ ] Keyboard-only navigation and focus order reviewed.
- [ ] Print/Save PDF output reviewed for clipping and page breaks.
- [ ] JSON export/import round trip tested using legacy and current review files.
- [ ] Custom domain loads with valid HTTPS.

These boxes intentionally remain unchecked until observed, not inferred from syntax checks or Vercel READY status.

## Preserved architecture

No authentication, backend or server-side storage. Decision integrity sharing uses opt-in same-tab `sessionStorage`; competitive assessment remains 100 questions, 12 dimensions, 1,000 possible points. Do not enter sensitive personal data in either tool.
