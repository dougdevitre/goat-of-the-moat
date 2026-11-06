import json
import unittest
from pathlib import Path
from goat_moat.scoring import calculate_score, validate_dimensions

DIMENSIONS = json.loads((Path(__file__).resolve().parents[1] / "data" / "dimensions.json").read_text())


class ScoringTests(unittest.TestCase):
    def test_dimensions(self):
        self.assertTrue(validate_dimensions(DIMENSIONS))

    def test_perfect_score(self):
        rows = [{"question_id": f'{d["id"]}-{i:02d}', "judge_id": "a", "rating": 5, "confidence": "A", "evidence_ids": ["fixture"]} for d in DIMENSIONS for i in range(1, d["questions"] + 1)]
        result = calculate_score(DIMENSIONS, rows)
        self.assertEqual(result["raw_points"], 1000)
        self.assertTrue(result["coverage_gate_passed"])
        self.assertFalse(result["certified"])

    def test_missing_not_zero(self):
        result = calculate_score(DIMENSIONS, [])
        self.assertEqual(result["raw_points"], 0)
        self.assertEqual(result["coverage"], 0)
        self.assertIsNone(result["normalized_points"])
        self.assertFalse(result["coverage_gate_passed"])

    def test_median_and_disagreement(self):
        rows = [{"question_id": "D1-01", "judge_id": j, "rating": r, "confidence": "B", "evidence_ids": ["fixture"]} for j, r in (("a", 1), ("b", 3), ("c", 5))]
        result = calculate_score(DIMENSIONS, rows)
        self.assertEqual(result["raw_points"], 6)
        self.assertIn("D1-01", result["disagreements"])

    def test_reject_unreferenced_score(self):
        with self.assertRaises(ValueError):
            calculate_score(DIMENSIONS, [{"question_id": "D1-01", "judge_id": "a", "rating": 5, "confidence": "A", "evidence_ids": []}])


if __name__ == "__main__":
    unittest.main()
