"""Deterministic, evidence-aware scoring. Not an award certification service."""
from collections import defaultdict
from statistics import median


def validate_dimensions(dimensions):
    ids = [d["id"] for d in dimensions]
    if len(ids) != 12 or len(set(ids)) != 12:
        raise ValueError("Exactly 12 unique dimensions required")
    if sum(d["weight"] for d in dimensions) != 1000:
        raise ValueError("Dimension weights must total 1000")
    if sum(d["questions"] for d in dimensions) != 100:
        raise ValueError("Question counts must total 100")
    if any(d["weight"] <= 0 or d["questions"] <= 0 for d in dimensions):
        raise ValueError("Weights and question counts must be positive")
    return True


def calculate_score(dimensions, ratings):
    """Return preliminary scores, coverage, and disagreement flags.

    ratings: iterable of {question_id, judge_id, rating, confidence, evidence_ids}.
    Only ratings with evidence and confidence A/B/C are scored. U is missing.
    """
    validate_dimensions(dimensions)
    questions = {f'{d["id"]}-{i:02d}': d for d in dimensions for i in range(1, d["questions"] + 1)}
    by_question = defaultdict(list)
    seen = set()
    for row in ratings:
        qid, judge = row["question_id"], row["judge_id"]
        if qid not in questions:
            raise ValueError(f"Unknown question: {qid}")
        if (qid, judge) in seen:
            raise ValueError(f"Duplicate judge rating: {qid}/{judge}")
        seen.add((qid, judge))
        rating = row.get("rating")
        confidence = row.get("confidence", "U")
        if confidence not in ("A", "B", "C", "U"):
            raise ValueError("Invalid confidence")
        if confidence == "U" or rating is None:
            continue
        if isinstance(rating, bool) or not isinstance(rating, (int, float)) or not 0 <= rating <= 5:
            raise ValueError("Rating must be between 0 and 5")
        if not row.get("evidence_ids"):
            raise ValueError(f"Evidence reference required for {qid}")
        by_question[qid].append(float(rating))

    earned = 0.0
    covered_weight = 0.0
    dimension_results = {}
    disagreements = []
    for d in dimensions:
        question_weight = d["weight"] / d["questions"]
        dim_earned = 0.0
        dim_covered = 0.0
        for i in range(1, d["questions"] + 1):
            qid = f'{d["id"]}-{i:02d}'
            values = by_question.get(qid, [])
            if not values:
                continue
            dim_covered += question_weight
            dim_earned += median(values) / 5 * question_weight
            if max(values) - min(values) >= 2:
                disagreements.append(qid)
        earned += dim_earned
        covered_weight += dim_covered
        dimension_results[d["id"]] = {
            "earned": round(dim_earned, 2),
            "coverage": round(dim_covered / d["weight"], 4),
            "weight": d["weight"],
        }
    coverage = covered_weight / 1000
    normalized = earned / coverage if coverage else None
    eligible_coverage = coverage >= 0.85 and all(v["coverage"] >= 0.60 for v in dimension_results.values())
    return {
        "raw_points": round(earned, 2),
        "coverage": round(coverage, 4),
        "normalized_points": round(normalized, 2) if normalized is not None else None,
        "dimension_results": dimension_results,
        "disagreements": disagreements,
        "coverage_gate_passed": eligible_coverage,
        "certified": False,
    }
