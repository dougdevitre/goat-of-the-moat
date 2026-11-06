# Phase XVIII — Functional Tool Pages and Client-Side Sharing

Five dedicated static URLs now host functional versions of the existing Decision Integrity workspace:

- `/tools/follow-the-money/` — funding, vendor and incentive records.
- `/tools/influence-map/` — interactive SVG relationships and evidence drilldown prioritized above the other sections.
- `/tools/evidence/` — verification classifications and records-to-request checklist prioritized above the other sections.
- `/tools/decision-integrity/` — conflict disclosures, safeguards, and beneficiary outcomes.
- `/tools/reports/` — printable neutral report and evidence register prioritized above the other sections.

Each page contains the working review controls, import/export, sample data, and printable report. All sections remain accessible on each page so records can be added and edited without losing context.

## Explicit same-tab sharing

The three buttons **Share to other tools (this tab)**, **Load shared review**, and **Forget shared review** use browser `sessionStorage` under `goat-moat-integrity-session-v1`.

- Sharing is opt-in; no background autosave or server submission.
- Share creates a snapshot. Changes in one page do not automatically update another; select Share again after editing.
- Load validates the existing `decision-integrity-1.0` JSON schema and requires confirmation before replacing the current working review.
- Forget clears the session copy. Session storage is not encryption, is not suitable for confidential data, and may survive a reload in the same tab until the tab session ends.
- JSON export remains the durable offline backup.
- The separate 100-question competitive assessment keeps its existing draft workflow; this phase does not merge scoring data with integrity reviews.

## Architecture

This phase embeds the proven client-side workspace into each tool page with a focus-specific layout. **Shared code extraction is still recommended** to eliminate duplicated application scripts and reduce maintenance overhead.

## Verification

Static syntax checks and smoke assertions cover the tool pages. Chromium tests now exercise cross-page opt-in sharing, map, evidence and reports. CI execution must be independently confirmed. No authentication or server-side storage was added; the 100-question index remains unchanged.
