# Dashboard modes

The deployed UI offers three entry points:

1. **Quick assessment:** 12 introductory questions, one per dimension, labeled indicative only.
2. **Full guided evaluation:** 100 questions with one-at-a-time prompts, plain-language choices, evidence help, progress and results.
3. **Skip wizard / classic dashboard:** direct access to the complete question set with dimension navigation and technical details.

Users can switch between guided and classic views without discarding ratings in the current tab. Each scored question requires a 0–5 rating, confidence A/B/C, and evidence reference. Missing or unverified evidence remains unscored. Export is JSON and must be completed before leaving the tab; no persistent storage or authenticated judge workflow exists.

Run locally from repository root: `python -m http.server 8000` and open `http://localhost:8000/dashboard/`.

## Important limitations

This is a research prototype. It does not validate evidence truthfulness, provide secure persistence, or certify awards. The quick assessment is not a 1,000-point evaluation. Do not enter confidential evidence or personal data.
