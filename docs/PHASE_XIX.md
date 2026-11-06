# Phase XIX — Shared Workspace Architecture

The six pages that render the decision integrity application now reference:

- `/assets/decision-integrity.js` — the single shared application implementation.
- `/assets/decision-integrity.css` — the single shared stylesheet.

Pages: legacy `/dashboard/decision-integrity.html` and the five dedicated tools at `/tools/follow-the-money/`, `/tools/influence-map/`, `/tools/evidence/`, `/tools/decision-integrity/`, and `/tools/reports/`.

## Preserved behavior

- Neutral relationship and evidence register, verification workflow, prioritized records requests, interactive funding map, and print report.
- Explicit opt-in same-tab `sessionStorage` sharing and JSON import/export; no automatic synchronization, authentication, or server-side storage.
- Focus-specific placement of the map, evidence verification, and report sections on dedicated pages.
- The competitive assessment and its 100-question, 12-dimension, 1,000-point index remain unchanged.

## Quality controls

The dependency-free smoke test now checks that all dedicated pages load the shared assets, that the shared JS parses, and that all expected controls remain. The Chromium acceptance suite retains cross-page sharing tests. Static source and syntax checks passed during implementation; CI/browser execution results are not independently confirmed.

## Next

Run and confirm the GitHub Actions browser job; test at 320, 375, and 768px, keyboard navigation and print layouts. Consider componentizing individual views after full browser regression tests are green.
