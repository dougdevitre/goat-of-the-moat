# GOAT of the MOAT

Evidence-driven competitive moat evaluation for legal technology.

## Status

**Research prototype — not an official rating or award certification system.** No production deployment or confidential evidence storage is configured.

## Evaluation model

- 100 questions across 12 dimensions, totaling 1,000 points.
- Ratings from 0–5, with evidence confidence recorded separately.
- Independent judge scores are combined using the median.
- Missing evidence is not scored as zero; coverage is reported separately.
- Published awards require independent evidence, conflict review, calibration, and approval.

## Local development

Requires Python 3.11+. No third-party packages are needed for the core scoring engine.

```bash
python -m unittest discover -s tests -v
python -m goat_moat.demo
```

## Repository layout

- `goat_moat/` — deterministic scoring and eligibility checks
- `data/` — canonical dimension weights and question identifiers
- `tests/` — scoring and validation tests
- `docs/` — architecture, security, and methodology
- `.github/workflows/` — CI checks

## Security

This repository is public. **Never commit customer records, confidential evidence, judge identities, credentials, API keys, or proprietary submissions.** See `docs/SECURITY.md`.

## Roadmap

1. Import and validate the complete 100-question charter with question-specific metric and evidence fields.
2. Add versioned calibration anchors and peer-group definitions.
3. Build an authenticated evidence registry and judge workflow.
4. Run a six-organization pilot before publishing any rankings.

Licensed under the MIT License (see LICENSE).
