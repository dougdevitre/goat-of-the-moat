"""Run a synthetic demonstration without real nominee or judge information."""
import json
from pathlib import Path
from .scoring import calculate_score


def main():
    dimensions = json.loads((Path(__file__).resolve().parents[1] / "data" / "dimensions.json").read_text())
    ratings = [{"question_id": f'{d["id"]}-{i:02d}', "judge_id": "synthetic-judge", "rating": 3, "confidence": "B", "evidence_ids": ["SYNTHETIC-ONLY"]} for d in dimensions for i in range(1, d["questions"] + 1)]
    print(json.dumps(calculate_score(dimensions, ratings), indent=2))


if __name__ == "__main__":
    main()
