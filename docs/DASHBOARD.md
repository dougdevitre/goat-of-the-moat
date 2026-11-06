# Judge workbench — local prototype

Run from repository root:

```bash
python -m http.server 8000
```

Visit http://localhost:8000/dashboard/

The dashboard loads the versioned 100-question registry and 12 dimension definitions, permits one provisional judge's scoring per question, requires a non-sensitive evidence reference and confidence A/B/C, calculates raw weighted points and coverage, and exports JSON. Entries exist **only in the current browser tab's memory** and disappear on refresh; export before leaving.

## Limitations

- Not authenticated or multi-user; no server-side storage or encryption.
- Evidence references are not verified and scores are not certified.
- This is not a substitute for independent judges, calibration, recusal, evidence review, or formal eligibility checks.
- No remote deployment has been performed.
- Do not enter confidential records or personal data.

## Production next steps

Implement identity and role management, server-side validation, encrypted evidence registry, per-organization assessment lifecycle, reviewer recusal, immutable audit trail, and signed exports. Run usability and accessibility testing before production.
