import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class RegistryTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.dimensions = json.loads((ROOT / "data/dimensions.json").read_text())
        cls.registry = json.loads((ROOT / "data/questions.v0.1.json").read_text())
        cls.questions = cls.registry["questions"]

    def test_exactly_one_hundred_unique_ids(self):
        ids = [q["id"] for q in self.questions]
        self.assertEqual(len(ids), 100)
        self.assertEqual(len(set(ids)), 100)

    def test_dimension_membership_and_question_counts(self):
        for dimension in self.dimensions:
            subset = [q for q in self.questions if q["dimension_id"] == dimension["id"]]
            self.assertEqual(len(subset), dimension["questions"])
            self.assertEqual(sum(q["points"] for q in subset), dimension["weight"])
            self.assertEqual([q["id"] for q in subset], [f'{dimension["id"]}-{i:02d}' for i in range(1, dimension["questions"] + 1)])

    def test_total_weight_and_required_fields(self):
        self.assertEqual(sum(q["points"] for q in self.questions), 1000)
        for q in self.questions:
            for field in ("question", "metric", "measurement_method", "evidence_requirement", "version", "calibration_status", "source_status"):
                self.assertTrue(q[field], (q["id"], field))
            self.assertEqual((q["score_min"], q["score_max"]), (0, 5))

    def test_draft_is_not_mislabeled_as_certified(self):
        self.assertEqual(self.registry["status"], "draft_not_certified")
        self.assertTrue(all(q["calibration_status"] == "provisional" for q in self.questions))


if __name__ == "__main__":
    unittest.main()
