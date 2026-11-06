# Phase XIV — Evidence Verification and Records-to-Request Workflow

The Follow the Money companion review now supports per-relationship verification metadata.

## Statuses
- Not reviewed
- Primary document independently checked
- Independent secondary source corroborated
- Claim not independently verified
- Disclosure or relevant record missing
- Competing or conflicting evidence

Verified and corroborated classifications require a nonempty evidence reference and a reviewer description of the verification method. These remain reviewer-entered statements; the software does not validate the source independently.

## Checklist priority
1. Conflicting evidence or missing disclosures.
2. Missing evidence reference, unverified claim, or potential conflict requiring review.
3. Not yet reviewed.
4. Other records, including reviewed evidence.

These are **follow-up priorities, not risk scores or misconduct findings**. Category-specific default requests include contracts, funding terms, beneficial ownership disclosures, recusals, procurement minutes, and independent outcome studies. Reviewers can replace default requests with specific records.

## Data and reports
Verification metadata is included in the existing JSON export/import and neutral printable report. Legacy JSON records without verification metadata remain valid and default to Not reviewed. No changes to the 100-question GMI, authentication, or server storage.

## Verification
JavaScript syntax and static smoke checks are available. Chromium browser tests were extended for verification requirements, but actual CI completion is not yet confirmed.
