import json
import sys
from pathlib import Path

import pandas as pd


def clean(value):
    if pd.isna(value):
        return None
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def code(value, width=2):
    value = clean(value)
    if value is None:
        return ""
    text = str(value)
    return text.zfill(width) if text.isdigit() else text


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: import_fudan_expert_data.py <source.xlsx> <output.json>")

    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    frame = pd.read_excel(source, sheet_name="Sheet1", header=2)
    frame = frame[frame["院校名称"].astype(str).str.contains("复旦大学", na=False)].copy()

    rows = []
    for _, row in frame.iterrows():
        history = []
        for year, suffix in ((2025, "1"), (2024, "2"), (2023, "3")):
            if pd.isna(row[f"录取人数{suffix}"]) and pd.isna(row[f"最低分{suffix}"]):
                continue
            history.append(
                {
                    "year": year,
                    "admitted": clean(row[f"录取人数{suffix}"]),
                    "minScore": clean(row[f"最低分{suffix}"]),
                    "minRank": clean(row[f"最低位次{suffix}"]),
                    "averageScore": clean(row[f"平均分{suffix}"]),
                    "averageRank": clean(row[f"平均位次{suffix}"]),
                    "batch": clean(row[f"老批次{suffix}"]),
                }
            )

        rows.append(
            {
                "school": clean(row["院校名称"]),
                "batch": clean(row["批次"]),
                "collegeCode": code(row["院校代码"], 5),
                "groupCode": code(row["专业组代码"]),
                "majorCode": code(row["专业代码"]),
                "majorName": clean(row["专业名称"]),
                "majorFullName": clean(row["专业全称"]),
                "subjectRequirement": clean(row["选科要求"]),
                "plan2026": clean(row["计划人数"]),
                "tuition": clean(row["学费"]),
                "duration": clean(row["学制"]),
                "estimatedRank2026": clean(row["26年预估位次"]),
                "isNew2026": clean(row["是否新增"]) == "新增",
                "history": history,
            }
        )

    payload = {
        "meta": {
            "title": "上海 2026 年志愿填报大数据（专家版）",
            "sourceLabel": source.name,
            "sourceType": "user-provided-third-party-workbook",
            "scope": "上海考生；复旦大学及复旦大学医学院；2026 招生计划与 2023-2025 同专业历史录取映射",
            "notes": [
                "2026 字段是招生计划及第三方预估位次，不是正式录取结果。",
                "2023-2025 数据按 2026 专业条目映射，专业新增、改名或批次变化会造成历史缺失，不能据此反推完整年度招生总量。",
                "填报前须以上海市教育考试院正式招生专业目录、投档结果和复旦大学招生章程为准。",
            ],
        },
        "rows": rows,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
