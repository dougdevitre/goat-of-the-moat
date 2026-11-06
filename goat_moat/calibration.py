"""Validation and evidence-quality gates for provisional calibration records."""
from collections import Counter

VALID_CONFIDENCE = frozenset(("A", "B", "C", "U"))


def validate_calibration(registry, calibration):
    questions = registry["questions"]
    expected = {q["id"] for q in questions}
    records = calibration["question_calibrations"]
    ids = [r["question_id"] for r in records]
    if len(ids) != 100 or len(set(ids)) != 100 or set(ids) != expected:
        raise ValueError("Calibration must cover exactly the 100 registry questions")
    for record in records:
        anchors = record["score_anchors"]
        if [a["rating"] for a in anchors] != list(range(6)):
            raise ValueError(f"Missing or unordered anchors: {record['question_id']}")
        if any(not a.get("criterion") for a in anchors):
            raise ValueError(f"Empty score anchor: {record['question_id']}")
    return True


def validate_evidence_records(records):
    """Validate metadata only; this does not establish that evidence is truthful."""
    seen = set()
    for row in records:
        identifier = row.get("id")
        if not identifier or identifier in seen:
            raise ValueError("Evidence IDs must be present and unique")
        seen.add(identifier)
        if row.get("confidence") not in VALID_CONFIDENCE:
            raise ValueError("Invalid confidence")
        if not row.get("source") or not row.get("source_date"):
            raise ValueError(f"Source and date required for {identifier}")
    return True


def evidence_quality_summary(records):
    validate_evidence_records(records)
    counts = Counter(row["confidence"] for row in records)
    return {"total": len(records), "confidence_counts": {c: counts[c] for c in ("A", "B", "C", "U")}, "verified_primary_count": counts["A"], "certified": False}
