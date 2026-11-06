# Follow the Money — Decision Integrity Review

A separate, non-scoring companion to the 100-question GOAT OF THE MOAT index.

**Entry:** `/dashboard/decision-integrity.html`, linked from the homepage and evaluation workspace.

## Review workflow
1. Identify the decision, intended beneficiaries, alternatives, selection criteria, and decision date.
2. Record funding sources, vendor arrangements, decision-maker disclosures, incentive structures, outcomes, and procurement/accountability evidence.
3. For each relationship, record parties or roles, financial arrangement, documentation status, factual statement, evidence reference, source date, and safeguards or alternative explanations.
4. Compare payment triggers against documented individual and public outcomes, with baseline, measurement period and limitations.
5. Generate a neutral printable report or export JSON for offline use.

## Interpretation and safeguards
- A financial relationship is not proof of improper influence or misconduct.
- Distinguish **documented**, **disclosed and managed**, **potential conflict requiring review**, **reported but unverified**, **unknown/not disclosed**, and **no conflict identified in reviewed records**. The last status does not establish absence of a conflict.
- Entries are reviewer-supplied, not independently verified. Missing evidence references are counted; the system does not judge truthfulness or infer motive.
- Include competing explanations, recusal or oversight safeguards, and unresolved evidence gaps.
- The report makes no automated finding of corruption, ethical violations, or legal liability.
- No points are added to or deducted from the existing 100-question, 1,000-point GMI. The companion review is not a certification.

## Data and privacy
No authentication, backend, server storage, or automatic browser persistence. The current review exists only in the tab until exported. JSON import validates the schema and field limits. Browser print can produce a PDF. Do not include confidential or personally identifying information.

## Validation
Static JavaScript syntax checks, smoke assertions, and Chromium acceptance coverage are included in the repository. Actual CI execution and print layout require verification.
