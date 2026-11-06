# Phase XIII — Interactive Funding and Influence Map

The Decision Integrity Review now visualizes each recorded financial or decision relationship in an interactive SVG map.

- Each reviewer-entered relationship is shown as a pair of nodes connected by a line.
- A directional arrow is used **only** when the reviewer explicitly writes exactly two roles separated by `→` or `->`. No direction is inferred otherwise.
- Solid lines denote the reviewer's **Documented** or **Disclosed and managed** classification; dashed lines denote other statuses. These are not independent findings.
- Selecting a relationship with a mouse or keyboard (Enter/Space) reveals the full recorded facts, evidence reference, source date, financial arrangement, and alternative explanations.
- Adding, removing, importing, clearing, or loading the synthetic example updates the map.
- The map is included in browser print output, with the neutral relationship register retained.
- The existing 100-question, 1,000-point index remains unchanged; no authentication or server storage was added.

## Verification
JavaScript syntax checked after implementation. Static and Chromium acceptance tests now include map controls and evidence drilldown. CI/browser execution still requires confirmation.

## Caution
Map lines visualize the reviewer's assertions, not verified causation or misconduct. Relationships with missing evidence must be investigated rather than assumed to be true.
