# Phase IX — Demonstration and Reporting

## Features
- **Synthetic demonstration:** From the homepage select *Explore a synthetic sample*. The generator populates 80 fictional ratings with evidence references prefixed `SYNTHETIC-EXAMPLE-`. The sample does not describe a real organization.
- **Executive report:** Within an evaluation select *Print executive report / Save PDF*. The browser print dialog produces a report showing the Phase VIII scorecard and evidence quality checklist. PDF output depends on the browser's Print / Save as PDF feature; no server renders documents.
- **Static smoke checks:** `node tests/dashboard_smoke.cjs` checks JavaScript syntax, required UI elements, synthetic markers, print controls, dimensions, and question IDs. GitHub Actions runs this alongside Python tests.

## Limitations
Browser-level interaction and accessibility checks are still needed. Printed reports are provisional and are not certified awards. Browser-local save and JSON import/export remain opt-in. No authentication or server-side storage has been added. Do not enter confidential information.

## Recommended manual acceptance checklist
1. Open the homepage and load the synthetic sample.
2. Confirm synthetic labels and 80 of 100 ratings.
3. Switch between guided and classic modes; verify answers remain.
4. Open print preview and inspect the executive report.
5. Export JSON, reset, import, and check answers restore.
6. Check the experience on mobile and with keyboard-only navigation.
