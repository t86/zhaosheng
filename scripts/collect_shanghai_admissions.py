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
ALL_OUT_FILE = ROOT / "data" / "shanghai" / "all-admissions.json"
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


SCHOOL_DISPLAY_ALIASES = {
    "上海财大": "上海财经大学",
    "上海外大": "上海外国语大学",
    "上海海关": "上海海关学院",
    "上海海事": "上海海事大学",
    "上海海洋": "上海海洋大学",
    "上海中医": "上海中医药大学",
    "上海应技大": "上海应用技术大学",
    "上海电力": "上海电力大学",
    "上海电机": "上海电机学院",
    "上海立信": "上海立信会计金融学院",
    "上海政法": "上海政法学院",
    "上海商院": "上海商学院",
    "上海健康": "上海健康医学院",
    "上海师大": "上海师范大学",
    "上海理工": "上海理工大学",
    "华东政法": "华东政法大学",
    "华东理工": "华东理工大学",
    "上纽大": "上海纽约大学",
    "上科大": "上海科技大学",
    "上戏": "上海戏剧学院",
    "上音": "上海音乐学院",
    "公安学院": "上海公安学院",
    "海军军医": "海军军医大学",
    "北大医学": "北京大学医学部",
    "浙大医学": "浙江大学医学院",
    "复旦医学": "复旦大学上海医学院",
    "交大医学": "上海交通大学医学院",
    "哈工大": "哈尔滨工业大学",
    "哈工威海": "哈尔滨工业大学(威海)",
    "北师大": "北京师范大学",
    "北师港浸大": "北京师范大学-香港浸会大学联合国际学院",
    "北京航大": "北京航空航天大学",
    "北京邮电": "北京邮电大学",
    "北京交大": "北京交通大学",
    "北京化工": "北京化工大学",
    "北京中医": "北京中医药大学",
    "北京林大": "北京林业大学",
    "北京工大": "北京工业大学",
    "中国人大": "中国人民大学",
    "人大苏州": "中国人民大学(苏州校区)",
    "中国科大": "中国科学技术大学",
    "中国药大": "中国药科大学",
    "中国政法": "中国政法大学",
    "中国矿大": "中国矿业大学",
    "中国传媒": "中国传媒大学",
    "中国海洋": "中国海洋大学",
    "中国农大": "中国农业大学",
    "中国地大": "中国地质大学",
    "中国石油": "中国石油大学",
    "中央民族": "中央民族大学",
    "中央财大": "中央财经大学",
    "中央美院": "中央美术学院",
    "南大": "南京大学",
    "南师大": "南京师范大学",
    "南京理工": "南京理工大学",
    "南京航空": "南京航空航天大学",
    "南京邮电": "南京邮电大学",
    "南京医大": "南京医科大学",
    "南京中医": "南京中医药大学",
    "南京审计": "南京审计大学",
    "南京财大": "南京财经大学",
    "东华大学": "东华大学",
    "东南大学": "东南大学",
    "东北大学": "东北大学",
    "东北师大": "东北师范大学",
    "东北财大": "东北财经大学",
    "东北林大": "东北林业大学",
    "大连理工": "大连理工大学",
    "大连海事": "大连海事大学",
    "天津大学": "天津大学",
    "天津医大": "天津医科大学",
    "天津中医": "天津中医药大学",
    "天津工大": "天津工业大学",
    "天津财经": "天津财经大学",
    "河北工大": "河北工业大学",
    "山大威海": "山东大学(威海)",
    "山西医大": "山西医科大学",
    "厦门大学": "厦门大学",
    "厦门医大": "厦门医学院",
    "集美大学": "集美大学",
    "福建医大": "福建医科大学",
    "江西财大": "江西财经大学",
    "武汉大学": "武汉大学",
    "武汉理工": "武汉理工大学",
    "华中科大": "华中科技大学",
    "华中师大": "华中师范大学",
    "华中农大": "华中农业大学",
    "中南大学": "中南大学",
    "中南财大": "中南财经政法大学",
    "湖南大学": "湖南大学",
    "湖南师大": "湖南师范大学",
    "华南理工": "华南理工大学",
    "华南师大": "华南师范大学",
    "广州中医": "广州中医药大学",
    "深圳大学": "深圳大学",
    "南方科大": "南方科技大学",
    "港中深": "香港中文大学(深圳)",
    "广西大学": "广西大学",
    "重庆大学": "重庆大学",
    "重庆医大": "重庆医科大学",
    "西南大学": "西南大学",
    "西南交大": "西南交通大学",
    "西南财大": "西南财经大学",
    "西南政法": "西南政法大学",
    "川大华西": "四川大学华西医学中心",
    "四川大学": "四川大学",
    "电子科大": "电子科技大学",
    "西北工大": "西北工业大学",
    "西北农林": "西北农林科技大学",
    "西安交大": "西安交通大学",
    "西安电子": "西安电子科技大学",
    "西安财大": "西安财经大学",
    "兰州大学": "兰州大学",
    "云南大学": "云南大学",
    "宁夏大学": "宁夏大学",
    "新疆大学": "新疆大学",
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


def get_display_school_name(base_name: str, school_slug: str | None, school_names: dict[str, str]) -> str:
    if school_slug:
        return school_names[school_slug]
    return SCHOOL_DISPLAY_ALIASES.get(base_name, base_name)


def get_record_source_type(source: SourceConfig, group_code: str) -> str:
    if source.source_type != "q-group":
        return source.source_type
    if "Q" in group_code:
        return "q-group"
    return "supplemental-group"


def parse_min_score(score: str) -> int | None:
    if not score:
        return None
    if score == "580分及以上":
        return 580
    if score.isdigit():
        return int(score)
    return None


def to_admission_record(
    row: dict[str, Any],
    source: SourceConfig,
    school_slug: str | None,
    school_name: str,
    base_name: str,
) -> dict[str, Any]:
    min_score = parse_min_score(row["score"])
    if min_score is None:
        raise ValueError(f"Invalid score {row['score']!r} for {source.filename} {row['groupName']}")
    tie_breakers = (
        dict(zip(TIE_KEYS, row["tieBreakers"], strict=False))
        if len(row["tieBreakers"]) == len(TIE_KEYS)
        else None
    )

    return {
        "schoolSlug": school_slug,
        "schoolName": school_name,
        "schoolAlias": base_name,
        "year": source.year,
        "groupCode": row["groupCode"],
        "groupName": row["groupName"],
        "score": row["score"],
        "minScore": min_score,
        "scoreType": "threshold" if row["score"].endswith("分及以上") else "exact",
        "sourceType": get_record_source_type(source, row["groupCode"]),
        "sourceTrust": "official",
        "sourceLabel": source.label,
        "sourceUrl": source.url,
        "tieBreakers": tie_breakers,
    }


def build_dataset() -> dict[str, Any]:
    school_names = load_seed_names()
    records: list[dict[str, Any]] = []
    covered_slugs: set[str] = set()
    skipped_invalid_rows: list[dict[str, Any]] = []

    for source in SOURCES:
        path = ensure_raw_pdf(source)
        for row in extract_rows(path):
            if parse_min_score(row["score"]) is None:
                skipped_invalid_rows.append({"year": source.year, "filename": source.filename, **row})
                continue
            base_name = row["groupName"].split("(")[0]
            school_slug = match_school_slug(base_name)
            if not school_slug:
                continue

            covered_slugs.add(school_slug)
            records.append(to_admission_record(row, source, school_slug, school_names[school_slug], base_name))

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
            "sourceTrust": "official",
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
            "skippedInvalidRowCount": len(skipped_invalid_rows),
        },
        "records": records,
        "missingSchools": missing_schools,
    }


def build_all_dataset() -> dict[str, Any]:
    school_names = load_seed_names()
    records: list[dict[str, Any]] = []
    matched_seed_slugs: set[str] = set()
    skipped_invalid_rows: list[dict[str, Any]] = []

    for source in SOURCES:
        path = ensure_raw_pdf(source)
        for row in extract_rows(path):
            if parse_min_score(row["score"]) is None:
                skipped_invalid_rows.append({"year": source.year, "filename": source.filename, **row})
                continue
            base_name = row["groupName"].split("(")[0]
            school_slug = match_school_slug(base_name)
            if school_slug:
                matched_seed_slugs.add(school_slug)
            school_name = get_display_school_name(base_name, school_slug, school_names)
            records.append(to_admission_record(row, source, school_slug, school_name, base_name))

    records.sort(
        key=lambda item: (
            -item["year"],
            item["sourceType"] != "regular",
            item["schoolName"],
            item["groupCode"],
        )
    )

    return {
        "meta": {
            "region": "上海",
            "years": [2021, 2022, 2023, 2024, 2025],
            "grain": "院校专业组",
            "scope": "全国高校在上海招生的本科普通批次院校专业组投档线",
            "sourceTrust": "official",
            "generatedAt": date.today().isoformat(),
            "notes": [
                "本数据集来自上海市教育考试院公开 PDF，口径为上海考生本科普通批院校专业组投档线。",
                "schoolSlug 仅对站内已有重点学校填写；没有站内详情页的学校保留 schoolName 和原始 groupName。",
                "580分及以上表示考试院只公开阈值，没有进一步披露精确分数。",
                "第三方预测资料不写入本官方数据集，需使用独立 sourceTrust 或 sourceType 标注。",
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
            "matchedSeedSchoolCount": len(matched_seed_slugs),
            "skippedInvalidRowCount": len(skipped_invalid_rows),
            "skippedInvalidRows": skipped_invalid_rows,
        },
        "records": records,
    }


def main() -> None:
    dataset = build_dataset()
    OUT_FILE.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    all_dataset = build_all_dataset()
    ALL_OUT_FILE.write_text(
        json.dumps(all_dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(dataset['records'])} records to {OUT_FILE}")
    print(f"Missing schools: {len(dataset['missingSchools'])}")
    print(f"Wrote {len(all_dataset['records'])} records to {ALL_OUT_FILE}")


if __name__ == "__main__":
    main()
