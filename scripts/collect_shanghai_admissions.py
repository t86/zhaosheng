from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any
from urllib.request import urlopen

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "shanghai" / "raw"
OUT_FILE = ROOT / "data" / "shanghai-admissions.json"
SEED_FILE = ROOT / "data" / "school-seed.json"


@dataclass(frozen=True)
class SourceConfig:
    filename: str
    year: int
    label: str
    url: str
    source_type: str


SOURCES = [
    SourceConfig(
        filename="2021.pdf",
        year=2021,
        label="2021年上海市普通高校招生本科普通批次平行志愿院校专业组投档分数线",
        url="https://www.shmeea.edu.cn/download/20210722/20210722_1.pdf",
        source_type="regular",
    ),
    SourceConfig(
        filename="2021-q.pdf",
        year=2021,
        label="2021年上海市普通高校招生本科普通批次平行志愿院校Q组投档分数线",
        url="https://www.shmeea.edu.cn/download/20210722/20210722_2.pdf",
        source_type="q-group",
    ),
    SourceConfig(
        filename="2022.pdf",
        year=2022,
        label="2022年上海市普通高校招生本科普通批次平行志愿院校专业组投档分数线",
        url="https://www.shmeea.edu.cn/download/20220814/02.pdf",
        source_type="regular",
    ),
    SourceConfig(
        filename="2022-q.pdf",
        year=2022,
        label="2022年上海市普通高校招生本科普通批次平行志愿院校Q组投档分数线",
        url="https://www.shmeea.edu.cn/download/20220814/01.pdf",
        source_type="q-group",
    ),
    SourceConfig(
        filename="2023.pdf",
        year=2023,
        label="2023年上海市普通高校招生本科普通批次平行志愿院校专业组投档分数线",
        url="https://www.shmeea.edu.cn/download/20230721/11115.pdf",
        source_type="regular",
    ),
    SourceConfig(
        filename="2023-q.pdf",
        year=2023,
        label="2023年上海市普通高校招生本科普通批次平行志愿院校Q组投档分数线",
        url="https://www.shmeea.edu.cn/download/20230721/1114.pdf",
        source_type="q-group",
    ),
    SourceConfig(
        filename="2024.pdf",
        year=2024,
        label="2024年上海市普通高校招生本科普通批次平行志愿院校专业组投档分数线",
        url="https://www.shmeea.edu.cn/download/20240719/198.pdf",
        source_type="regular",
    ),
    SourceConfig(
        filename="2024-q.pdf",
        year=2024,
        label="2024年上海市普通高校招生本科普通批次平行志愿院校Q组投档分数线",
        url="https://www.shmeea.edu.cn/download/20240719/197.pdf",
        source_type="q-group",
    ),
    SourceConfig(
        filename="2025.pdf",
        year=2025,
        label="上海市2025年普通高校招生本科普通批次平行志愿院校专业组投档分数线",
        url="https://www.shmeea.edu.cn/download/20250719/186.pdf",
        source_type="regular",
    ),
    SourceConfig(
        filename="2025-q.pdf",
        year=2025,
        label="上海市2025年普通高校招生本科普通批次平行志愿院校Q组投档分数线",
        url="https://www.shmeea.edu.cn/download/20250719/185.pdf",
        source_type="q-group",
    ),
]


SCHOOL_ALIASES = {
    "tsinghua-university": {"清华大学", "清华"},
    "peking-university": {"北京大学", "北大", "北大医学"},
    "renmin-university-of-china": {"中国人民大学", "中国人大", "人大苏州"},
    "beijing-normal-university": {"北京师范大学", "北师大"},
    "beihang-university": {"北京航空航天大学", "北京航大", "北航"},
    "beijing-institute-of-technology": {"北京理工大学", "北京理工", "北理工"},
    "china-agricultural-university": {"中国农业大学", "中国农大"},
    "minzu-university-of-china": {"中央民族大学", "中央民族"},
    "nankai-university": {"南开大学"},
    "tianjin-university": {"天津大学"},
    "dalian-university-of-technology": {"大连理工大学", "大连理工"},
    "northeastern-university": {"东北大学"},
    "jilin-university": {"吉林大学"},
    "harbin-institute-of-technology": {"哈尔滨工业大学", "哈工大"},
    "fudan-university": {"复旦大学", "复旦医学"},
    "shanghai-jiao-tong-university": {"上海交通大学", "上海交大", "交大医学"},
    "tongji-university": {"同济大学"},
    "east-china-normal-university": {"华东师范大学", "华东师大"},
    "nanjing-university": {"南京大学"},
    "southeast-university": {"东南大学"},
    "zhejiang-university": {"浙江大学", "浙大", "浙大医学"},
    "university-of-science-and-technology-of-china": {
        "中国科学技术大学",
        "中国科技大学",
        "中国科大",
        "中科大",
    },
    "xiamen-university": {"厦门大学"},
    "shandong-university": {"山东大学", "山大威海"},
    "ocean-university-of-china": {"中国海洋大学", "中国海洋"},
    "wuhan-university": {"武汉大学"},
    "huazhong-university-of-science-and-technology": {"华中科技大学", "华中科大"},
    "central-south-university": {"中南大学"},
    "hunan-university": {"湖南大学"},
    "national-university-of-defense-technology": {"国防科技大学"},
    "sun-yat-sen-university": {"中山大学", "中山医"},
    "south-china-university-of-technology": {"华南理工大学", "华南理工"},
    "chongqing-university": {"重庆大学"},
    "sichuan-university": {"四川大学", "川大华西"},
    "university-of-electronic-science-and-technology-of-china": {
        "电子科技大学",
        "电子科大",
    },
    "xian-jiaotong-university": {"西安交通大学", "西安交大"},
    "northwestern-polytechnical-university": {"西北工业大学", "西北工大"},
    "northwest-a-and-f-university": {"西北农林科技大学", "西北农林"},
    "lanzhou-university": {"兰州大学"},
}


ROW_PATTERN = re.compile(r"(\d{5}|\d{3}Q\d+)\s+([^\s\d]+?\((?:\d{2}|Q\d+)\))\s+")
TIE_KEYS = [
    "chineseMathTotal",
    "chineseOrMathHigher",
    "foreignLanguage",
    "electiveHighest",
    "electiveSecondHighest",
    "electiveLowest",
    "bonus",
]


def load_seed_names() -> dict[str, str]:
    records = json.loads(SEED_FILE.read_text(encoding="utf-8"))
    return {record["slug"]: record["name"] for record in records}


def ensure_raw_pdf(source: SourceConfig) -> Path:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    path = RAW_DIR / source.filename
    if path.exists():
        return path

    with urlopen(source.url) as response:
        path.write_bytes(response.read())

    return path


def normalize_pdf_text(text: str) -> str:
    text = re.sub(r"第\s*\d+\s*页，共\s*\d+\s*页", " ", text)
    text = text.replace("上海市教育考试院", " ")
    text = text.replace("580 分及以上", "580分及以上")
    text = re.sub(r"[\x00-\x1f\x7f]", " ", text)
    text = re.sub(r"\(\s+", "(", text)
    text = re.sub(r"\s+\)", ")", text)
    return re.sub(r"\s+", " ", text).strip()


def extract_rows(path: Path) -> list[dict[str, Any]]:
    reader = PdfReader(str(path))
    text = "".join((page.extract_text() or "") + "\n" for page in reader.pages)
    flat = normalize_pdf_text(text)

    matches = list(ROW_PATTERN.finditer(flat))
    rows: list[dict[str, Any]] = []

    for index, match in enumerate(matches):
        code, group_name = match.group(1), match.group(2)
        segment_start = match.end()
        segment_end = matches[index + 1].start() if index + 1 < len(matches) else len(flat)
        segment = flat[segment_start:segment_end].strip()
        parts = segment.split()
        if not parts:
            continue

        score = parts[0]
        cursor = 1
        if score == "580" and cursor < len(parts) and parts[cursor].startswith("分及以上"):
            score = "580分及以上"
            cursor += 1

        tie_values: list[int] = []
        if score != "580分及以上":
            while cursor < len(parts) and len(tie_values) < len(TIE_KEYS):
                item = parts[cursor]
                if not item.isdigit():
                    break
                tie_values.append(int(item))
                cursor += 1

        rows.append(
            {
                "groupCode": code,
                "groupName": group_name,
                "score": score,
                "tieBreakers": tie_values,
            }
        )

    return rows


def match_school_slug(base_name: str) -> str | None:
    for slug, aliases in SCHOOL_ALIASES.items():
        if base_name in aliases:
            return slug
    return None


def get_record_source_type(source: SourceConfig, group_code: str) -> str:
    if source.source_type != "q-group":
        return source.source_type
    if "Q" in group_code:
        return "q-group"
    return "supplemental-group"


def build_dataset() -> dict[str, Any]:
    school_names = load_seed_names()
    records: list[dict[str, Any]] = []
    covered_slugs: set[str] = set()

    for source in SOURCES:
        path = ensure_raw_pdf(source)
        for row in extract_rows(path):
            base_name = row["groupName"].split("(")[0]
            school_slug = match_school_slug(base_name)
            if not school_slug:
                continue

            covered_slugs.add(school_slug)
            min_score = int(row["score"].replace("分及以上", "")) if row["score"] else None
            tie_breakers = (
                dict(zip(TIE_KEYS, row["tieBreakers"], strict=False))
                if len(row["tieBreakers"]) == len(TIE_KEYS)
                else None
            )

            records.append(
                {
                    "schoolSlug": school_slug,
                    "schoolName": school_names[school_slug],
                    "year": source.year,
                    "groupCode": row["groupCode"],
                    "groupName": row["groupName"],
                    "score": row["score"],
                    "minScore": min_score,
                    "scoreType": "threshold" if row["score"].endswith("分及以上") else "exact",
                    "sourceType": get_record_source_type(source, row["groupCode"]),
                    "sourceLabel": source.label,
                    "sourceUrl": source.url,
                    "tieBreakers": tie_breakers,
                }
            )

    records.sort(
        key=lambda item: (
            item["schoolName"],
            -item["year"],
            item["sourceType"] != "regular",
            item["groupCode"],
        )
    )

    missing_schools = [
        {
            "schoolSlug": slug,
            "schoolName": school_names[slug],
            "note": "2021-2025 年上海市教育考试院公开的本科普通批次平行志愿表中未检出该校记录。",
        }
        for slug in school_names
        if slug not in covered_slugs
    ]

    return {
        "meta": {
            "region": "上海",
            "years": [2021, 2022, 2023, 2024, 2025],
            "grain": "院校专业组",
            "generatedAt": date.today().isoformat(),
            "notes": [
                "当前公开口径为院校专业组投档线，不是单个本科专业最低分。",
                "580分及以上表示考试院只公开阈值，没有进一步披露精确分数。",
                "部分 Q 组和单独公布的院校专业组在独立 PDF 中发布，已一并并入本数据集。",
            ],
            "sources": [
                {
                    "year": source.year,
                    "filename": source.filename,
                    "label": source.label,
                    "url": source.url,
                    "sourceType": source.source_type,
                }
                for source in SOURCES
            ],
        },
        "records": records,
        "missingSchools": missing_schools,
    }


def main() -> None:
    dataset = build_dataset()
    OUT_FILE.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(dataset['records'])} records to {OUT_FILE}")
    print(f"Missing schools: {len(dataset['missingSchools'])}")


if __name__ == "__main__":
    main()
