import copy
import json
import unittest
from pathlib import Path
from goat_moat.calibration import validate_calibration, validate_evidence_records, evidence_quality_summary

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = json.loads((ROOT / "data/questions.v0.1.json").read_text())
CALIBRATION = json.loads((ROOT / "data/calibration.v0.1.json").read_text())


class CalibrationTests(unittest.TestCase):
    def test_full_question_coverage(self):
        self.assertTrue(validate_calibration(REGISTRY, CALIBRATION))

    def test_six_anchors_for_every_question(self):
        self.assertEqual(sum(len(r["score_anchors"]) for r in CALIBRATION["question_calibrations"]), 600)

    def test_duplicate_question_rejected(self):
        broken = copy.deepcopy(CALIBRATION)
        broken["question_calibrations"][1]["question_id"] = broken["question_calibrations"][0]["question_id"]
        with self.assertRaises(ValueError):
            validate_calibration(REGISTRY, broken)

    def test_evidence_requires_source_date(self):
        with self.assertRaises(ValueError):
            validate_evidence_records([{"id":"E1","confidence":"A","source":"report"}])

    def test_unverified_evidence_not_certified(self):
        result = evidence_quality_summary([{"id":"E1","confidence":"U","source":"example","source_date":"2026-01-01"}])
        self.assertEqual(result["verified_primary_count"], 0)
        self.assertFalse(result["certified"])


if __name__ == "__main__":
    unittest.main()
