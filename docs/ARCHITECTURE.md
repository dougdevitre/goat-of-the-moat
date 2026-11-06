# Architecture and methodology

## Current

- Python standard-library scoring module.
- JSON dimension registry with 100 stable question identifiers.
- Median aggregation across independent judges.
- Explicit evidence references and confidence flags.
- Missing-data coverage and disagreement detection.
- GitHub Actions unit tests.

## Not yet implemented

- The full question wording, detailed evidence criteria, numerical calibration anchors, and applicability rules must be imported and versioned from the founding charter.
- Evidence verification and source provenance are not independently validated by the current engine.
- Authentication, judge recusal, multi-tenant permissions, immutable audit trails, and report certification.
- Inapplicability decisions and their adjusted denominators require formal approval workflow.

## Certification

A numerical score alone cannot certify an award. The certification process must additionally verify eligibility, confidence, ethics, independent judging, and methodology calibration.
