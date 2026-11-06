# Phase XV–XVII — Brand, Navigation, Static Pages

## Delivered
- Navy/gold brand system in `assets/site.css`.
- Compact goat-and-castle SVG crest in `assets/brand/crest.svg`, based on the user-supplied design direction; it is **not** an exact recreation of the full award artwork.
- Shared responsive header and mobile navigation in `assets/site.js`, including aria-expanded, keyboard Escape dismissal, active-page indication, and 44px touch targets.
- New branded homepage at `/`.
- Tools directory at `/tools/`.
- Individual static entry pages for assessment, Follow the Money, influence map, evidence verification, decision integrity, and reports.
- Static methodology, ethics, and help pages.
- Shared header, crest favicon, and navigation integrated into the two existing tool workspaces.

## Architecture and limitations
The dedicated tool pages currently provide introductions and links into existing interactive workspaces. The map, verification, and report functionality is **not yet extracted into independent standalone application components**. This migration should happen after browser acceptance testing to avoid breaking data flows.

The existing 100-question, 12-dimension, 1,000-point index is unchanged. No login, backend, or server storage was added.

## QA next steps
Confirm GitHub Actions smoke and browser jobs, test mobile menu interactions at 320px/375px/768px, verify accessible focus behavior and print reports, and check legacy JSON import/export. Test actual Vercel routes after deployment.
