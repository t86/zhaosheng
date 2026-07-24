#!/usr/bin/env python3
"""Import the 2026 Shanghai undergraduate regular-batch major catalog.

The official PDF is text-based, but its table cells are not exported as a
table. This parser restores rows by word coordinates, then reconciles the
result with the already-structured 2026 regular-plan reference so the website
keeps stable group/major ordering while gaining official catalog remarks.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Any

import fitz


DEFAULT_PDF_PATH = Path(
    "/Users/tl/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/"
    "wxid_icnw0n1ekpvz21_30fa/msg/file/2026-07/2026年上海市普通高等学校招生专业目录.pdf"
)
DEFAULT_REFERENCE_PATH = Path("data/shanghai/regular-2026-plan-reference.json")
DEFAULT_OUTPUT_PATH = Path("data/shanghai/official-2026-major-catalog.json")
DEFAULT_RECOMMENDATIONS_OUTPUT_PATH = Path("data/shanghai/official-2026-major-recommendations.json")

START_PDF_PAGE = 142
END_PDF_PAGE = 404
CATEGORY_LABELS = {"公办", "民办", "独立学院"}
LANGUAGE_LABELS = {"不限", "英语", "日语", "法语", "德语", "俄语", "西班牙语"}


@dataclass
class ParsedMajor:
    major_code: str
    major_name: str
    duration: str
    plan_2026: int | None
    tuition: int | None
    language_requirement: str
    remarks: str
    pdf_page: int
    qa_flags: list[str] = field(default_factory=list)


@dataclass
class ParsedGroup:
    school_name: str
    school_alias: str
    school_category: str
    school_plan_2026: int | None
    group_code: str
    group_name: str
    subject_requirement: str
    group_plan_2026: int | None
    group_remarks: str
    pdf_page: int
    majors: list[ParsedMajor] = field(default_factory=list)


def clean_text(value: str | None) -> str:
    value = re.sub(r"\s+", "", value or "")
    return value.replace("｜", "").replace("|", "").replace("，", ",").strip()


def normalize_name(value: str | None) -> str:
    value = clean_text(value)
    value = value.replace("（", "(").replace("）", ")")
    value = value.replace(",", "").replace("、", "")
    value = re.sub(r"[—-]\d+[—-]", "", value)
    return value


def parse_int(value: str | None) -> int | None:
    match = re.search(r"\d+", value or "")
    return int(match.group()) if match else None


def first_x(words: list[tuple], predicate) -> float | None:
    for word in words:
        if predicate(word):
            return float(word[0])
    return None


def page_boundaries(words: list[tuple]) -> dict[str, float]:
    def is_header(word: tuple) -> bool:
        return float(word[1]) < 110

    x_subject = first_x(words, lambda word: is_header(word) and str(word[4]).startswith("科目要求"))
    x_major_code = first_x(words, lambda word: is_header(word) and word[4] == "代码" and float(word[0]) > 100)
    x_name = first_x(words, lambda word: is_header(word) and str(word[4]).startswith("院校专业组"))
    x_duration = first_x(words, lambda word: is_header(word) and word[4] == "学制")
    x_plan = first_x(words, lambda word: is_header(word) and word[4] == "数" and float(word[0]) > 280)
    x_standard = first_x(words, lambda word: is_header(word) and str(word[4]).startswith("标准语种"))

    if None not in (x_subject, x_major_code, x_name, x_duration, x_plan, x_standard):
        return {
            "group": x_subject,
            "subject": x_major_code - 2,
            "majorCode": x_name - 23,
            "name": x_duration - 2,
            "duration": x_plan - 2,
            "plan": x_standard - 8,
            "tuition": x_standard + 27,
            "language": x_standard + 57,
        }

    return {
        "group": 90,
        "subject": 138,
        "majorCode": 157,
        "name": 307,
        "duration": 327,
        "plan": 350,
        "tuition": 380,
        "language": 410,
    }


def column_for(x: float, boundaries: dict[str, float]) -> str:
    if x < boundaries["group"]:
        return "group"
    if x < boundaries["subject"]:
        return "subject"
    if x < boundaries["majorCode"]:
        return "majorCode"
    if x < boundaries["name"]:
        return "name"
    if x < boundaries["duration"]:
        return "duration"
    if x < boundaries["plan"]:
        return "plan"
    if x < boundaries["tuition"]:
        return "tuition"
    if x < boundaries["language"]:
        return "language"
    return "remarks"


def split_language_and_tuition(tuition: str, language: str, remarks: str) -> tuple[str, str, str]:
    if language.startswith("不限") and language != "不限":
        remarks = ("含" + language[2:].lstrip("含|") + remarks).replace("含含", "含")
        language = "不限"
    if re.match(r"^\d{4,6}不限", tuition):
        rest = tuition.split("不限", 1)[1]
        tuition = tuition.split("不限", 1)[0]
        language = "不限"
        remarks = rest + remarks
    if tuition.endswith("不限") and not language:
        tuition = tuition[:-2]
        language = "不限"
    return tuition, language, remarks


def page_lines(page: fitz.Page) -> list[dict[str, str]]:
    words = page.get_text("words")
    boundaries = page_boundaries(words)
    visual_lines: list[dict[str, Any]] = []

    for word in words:
        x0, y0, _x1, y1, text, *_rest = word
        if y0 < 104 or y0 > 780:
            continue
        text = clean_text(text)
        if not text:
            continue
        center_y = (float(y0) + float(y1)) / 2
        for visual_line in visual_lines:
            if abs(float(visual_line["center_y"]) - center_y) < 4.5:
                visual_line["words"].append(word)
                visual_line["center_y"] = (
                    float(visual_line["center_y"]) * (len(visual_line["words"]) - 1) + center_y
                ) / len(visual_line["words"])
                break
        else:
            visual_lines.append({"center_y": center_y, "words": [word]})

    lines: list[dict[str, str]] = []
    column_names = ["group", "subject", "majorCode", "name", "duration", "plan", "tuition", "language", "remarks"]
    for visual_line in sorted(visual_lines, key=lambda item: item["center_y"]):
        columns = {name: [] for name in column_names}
        sorted_words = sorted(visual_line["words"], key=lambda item: item[0])
        for word in sorted_words:
            columns[column_for(float(word[0]), boundaries)].append(clean_text(word[4]))
        line = {name: clean_text("".join(columns[name])) for name in column_names}
        line["raw"] = "|".join(clean_text(word[4]) for word in sorted_words)
        lines.append(line)
    return lines


def should_skip_header(line: dict[str, str]) -> bool:
    raw = line["raw"]
    return "专业组代码" in raw or "专业代码" in raw or raw in {"代码|代码|学制|数|标准语种"}


def append_continuation(current_major: ParsedMajor, line: dict[str, str]) -> None:
    name = line["name"]
    duration = line["duration"]
    plan = line["plan"]
    tuition = line["tuition"]
    language = line["language"]
    remarks = line["remarks"]

    if name and not re.fullmatch(r"\d+", name):
        current_major.major_name += name
    continuation_parts = []
    if language and language != "不限":
        continuation_parts.append(language)
    if remarks:
        continuation_parts.append(remarks)
    continuation_remarks = "".join(continuation_parts)
    if continuation_remarks:
        current_major.remarks += continuation_remarks
    if duration == "医" and current_major.duration == "八年":
        current_major.duration = "八年医"
    if not current_major.plan_2026 and plan:
        current_major.plan_2026 = parse_int(plan)
        current_major.qa_flags.append("planFromContinuation")
    if not current_major.tuition and tuition:
        current_major.tuition = parse_int(tuition)
        current_major.qa_flags.append("tuitionFromContinuation")


def infer_major_details(major: ParsedMajor, next_code: int) -> int:
    if re.fullmatch(r"\d{2}", major.major_code):
        next_code = int(major.major_code) + 1
    else:
        major.major_code = f"{next_code:02d}"
        major.qa_flags.append("inferredMajorCode")
        next_code += 1

    if not major.duration:
        match = re.match(r"^(.*?)([23456])$", major.major_name)
        if match:
            major.major_name = match.group(1)
            major.duration = match.group(2)
            major.qa_flags.append("splitDurationFromName")

    major.major_name = clean_text(re.sub(r"[—-]\d+[—-]", "", major.major_name))
    major.remarks = clean_text(re.sub(r"[—-]\d+[—-]", "", major.remarks))
    return next_code


def parse_pdf_groups(pdf_path: Path) -> list[ParsedGroup]:
    doc = fitz.open(pdf_path)
    groups: list[ParsedGroup] = []
    current_school: dict[str, Any] | None = None
    current_alias = ""
    current_group: ParsedGroup | None = None
    current_major: ParsedMajor | None = None

    for page_index in range(START_PDF_PAGE - 1, END_PDF_PAGE):
        for line in page_lines(doc[page_index]):
            if should_skip_header(line):
                continue

            group_text = line["group"]
            subject = line["subject"]
            major_code = line["majorCode"]
            name = line["name"]
            duration = line["duration"]
            plan = line["plan"]
            tuition = line["tuition"]
            language = line["language"]
            remarks = line["remarks"]
            tuition, language, remarks = split_language_and_tuition(tuition, language, remarks)

            category = remarks if remarks in CATEGORY_LABELS else language if language in CATEGORY_LABELS else ""
            school_plan = parse_int(plan) or parse_int(duration)
            if (
                group_text
                and school_plan is not None
                and category
                and not re.fullmatch(r"[0-9A-Z]{5}", group_text)
                and not major_code
            ):
                current_school = {
                    "schoolName": group_text,
                    "schoolPlan2026": school_plan,
                    "schoolCategory": category,
                    "pdfPage": page_index + 1,
                }
                current_alias = ""
                current_group = None
                current_major = None
                continue

            if group_text.startswith("院校简称：") or name.startswith("院校简称："):
                current_alias = (group_text + name).replace("院校简称：", "")
                continue

            group_remarks = remarks or (language if language and language not in LANGUAGE_LABELS else "")
            if re.fullmatch(r"[0-9A-Z]{5}", group_text) and current_school:
                current_group = ParsedGroup(
                    school_name=current_school["schoolName"],
                    school_alias=current_alias,
                    school_category=current_school["schoolCategory"],
                    school_plan_2026=current_school["schoolPlan2026"],
                    group_code=group_text,
                    group_name=name,
                    subject_requirement=subject,
                    group_plan_2026=parse_int(plan) or parse_int(duration),
                    group_remarks=group_remarks,
                    pdf_page=page_index + 1,
                )
                groups.append(current_group)
                current_major = None
                continue

            is_major = False
            normalized_major_code = ""
            if re.fullmatch(r"\d{2}", major_code):
                is_major = True
                normalized_major_code = major_code
            elif re.match(r"^\d{2}\D+", major_code):
                is_major = True
                normalized_major_code = major_code[:2]
                name = major_code[2:] + name
            elif current_group and name and (duration or plan or tuition):
                is_major = True

            if is_major and current_group:
                if not duration:
                    duration_match = re.match(r"^(.*?)([23456])$", name)
                    if duration_match:
                        name = duration_match.group(1)
                        duration = duration_match.group(2)
                if duration.startswith("八年"):
                    duration_plan_match = re.match(r"^(八年)(\d+)$", duration)
                    if duration_plan_match and not plan:
                        duration = "八年医"
                        plan = duration_plan_match.group(2)
                if duration.isdigit() and len(duration) > 1:
                    if not plan and len(duration) == 2:
                        plan = duration[1]
                    duration = duration[0]

                current_major = ParsedMajor(
                    major_code=normalized_major_code,
                    major_name=name,
                    duration=duration,
                    plan_2026=parse_int(plan),
                    tuition=parse_int(tuition),
                    language_requirement=language,
                    remarks=remarks,
                    pdf_page=page_index + 1,
                )
                current_group.majors.append(current_major)
                continue

            if current_major and any(line[key] for key in ["name", "duration", "plan", "tuition", "language", "remarks"]):
                append_continuation(current_major, line)
                continue

            if current_group and not current_group.majors and group_remarks:
                current_group.group_remarks += group_remarks

    for group in groups:
        next_code = 1
        for major in group.majors:
            next_code = infer_major_details(major, next_code)
    return groups


def score_candidate(reference_major: dict[str, Any], parsed_major: ParsedMajor) -> int:
    score = 0
    reference_name = normalize_name(reference_major.get("majorName"))
    parsed_name = normalize_name(parsed_major.major_name)
    if reference_major.get("majorCode") == parsed_major.major_code:
        score += 20
    if reference_name and parsed_name:
        if reference_name == parsed_name:
            score += 40
        elif reference_name in parsed_name or parsed_name in reference_name:
            score += 25
        else:
            common_prefix = 0
            for left, right in zip(reference_name, parsed_name):
                if left != right:
                    break
                common_prefix += 1
            score += min(common_prefix, 10)
    if reference_major.get("plan2026") == parsed_major.plan_2026:
        score += 8
    if reference_major.get("tuition") == parsed_major.tuition:
        score += 6
    if parsed_major.remarks:
        score += 3
    if parsed_major.duration:
        score += 2
    return score


def find_parsed_major(reference_major: dict[str, Any], parsed_group: ParsedGroup | None) -> ParsedMajor | None:
    if not parsed_group:
        return None
    candidates = parsed_group.majors
    if not candidates:
        return None
    scored = sorted(
        ((score_candidate(reference_major, candidate), candidate) for candidate in candidates),
        key=lambda item: item[0],
        reverse=True,
    )
    best_score, best_candidate = scored[0]
    return best_candidate if best_score >= 18 else None


def reconcile_group(reference_group: dict[str, Any], parsed_group: ParsedGroup | None) -> dict[str, Any]:
    group_flags: list[str] = []
    if not parsed_group:
        group_flags.append("missingFromPdfTextParse")

    group_plan = reference_group.get("groupPlan2026")
    parsed_group_plan = parsed_group.group_plan_2026 if parsed_group else None
    if parsed_group_plan is not None and parsed_group_plan != group_plan:
        group_flags.append("groupPlanReconciledWithStructuredReference")

    majors: list[dict[str, Any]] = []
    for reference_major in reference_group.get("majors", []):
        parsed_major = find_parsed_major(reference_major, parsed_group)
        qa_flags = list(parsed_major.qa_flags if parsed_major else [])
        if not parsed_major:
            qa_flags.append("missingFromPdfTextParse")

        plan_2026 = reference_major.get("plan2026")
        parsed_plan = parsed_major.plan_2026 if parsed_major else None
        if parsed_plan is not None and parsed_plan != plan_2026:
            qa_flags.append("planReconciledWithStructuredReference")

        tuition = reference_major.get("tuition")
        parsed_tuition = parsed_major.tuition if parsed_major else None
        if parsed_tuition is not None and parsed_tuition != tuition:
            qa_flags.append("tuitionReconciledWithStructuredReference")

        majors.append(
            {
                "sourceRow": reference_major.get("sourceRow"),
                "majorCode": reference_major.get("majorCode", ""),
                "majorName": reference_major.get("majorName", ""),
                "duration": parsed_major.duration if parsed_major else "",
                "plan2026": plan_2026,
                "tuition": tuition,
                "languageRequirement": parsed_major.language_requirement if parsed_major else "",
                "remarks": parsed_major.remarks if parsed_major else "",
                "pdfPage": parsed_major.pdf_page if parsed_major else parsed_group.pdf_page if parsed_group else None,
                "printedPage": (parsed_major.pdf_page if parsed_major else parsed_group.pdf_page if parsed_group else 0) - 6
                if (parsed_major or parsed_group)
                else None,
                "sourceFields": {
                    "majorOrder": "structured-reference",
                    "plan2026": "structured-reference",
                    "tuition": "structured-reference",
                    "duration": "official-pdf-text" if parsed_major and parsed_major.duration else "",
                    "languageRequirement": "official-pdf-text" if parsed_major and parsed_major.language_requirement else "",
                    "remarks": "official-pdf-text" if parsed_major and parsed_major.remarks else "",
                },
                "qaFlags": sorted(set(qa_flags)),
            }
        )

    return {
        "schoolSlug": reference_group.get("schoolSlug", ""),
        "schoolName": reference_group.get("schoolName", ""),
        "schoolAlias": reference_group.get("schoolAlias", ""),
        "schoolRegion": reference_group.get("schoolRegion", ""),
        "category": reference_group.get("category", ""),
        "schoolCategory": parsed_group.school_category if parsed_group else "",
        "schoolPlan2026": parsed_group.school_plan_2026 if parsed_group else None,
        "groupCode": reference_group.get("groupCode", ""),
        "groupName": parsed_group.group_name if parsed_group and parsed_group.group_name else reference_group.get("groupName", ""),
        "groupSuffix": reference_group.get("groupSuffix", ""),
        "subjectRequirement": parsed_group.subject_requirement
        if parsed_group and parsed_group.subject_requirement
        else reference_group.get("subjectRequirement", ""),
        "groupPlan2026": group_plan,
        "groupRemarks": parsed_group.group_remarks if parsed_group else "",
        "groupLine2026Label": reference_group.get("groupLine2026Label", ""),
        "groupLine2026": reference_group.get("groupLine2026"),
        "groupLine2026Type": reference_group.get("groupLine2026Type"),
        "officialSourceType": reference_group.get("officialSourceType", ""),
        "officialSourceUrl": reference_group.get("officialSourceUrl", ""),
        "pdfPage": parsed_group.pdf_page if parsed_group else None,
        "printedPage": parsed_group.pdf_page - 6 if parsed_group else None,
        "sourceFields": {
            "groupOrder": "structured-reference",
            "groupPlan2026": "structured-reference",
            "groupRemarks": "official-pdf-text" if parsed_group and parsed_group.group_remarks else "",
            "majors": "official-pdf-text + structured-reference reconciliation",
        },
        "qaFlags": sorted(set(group_flags)),
        "majors": majors,
    }


def build_catalog(pdf_path: Path, reference_path: Path) -> dict[str, Any]:
    reference_dataset = json.loads(reference_path.read_text(encoding="utf-8"))
    parsed_groups = parse_pdf_groups(pdf_path)
    parsed_by_code = {group.group_code: group for group in parsed_groups}

    groups = [reconcile_group(reference_group, parsed_by_code.get(reference_group["groupCode"])) for reference_group in reference_dataset["groups"]]
    record_count = sum(len(group["majors"]) for group in groups)
    group_count = len(groups)
    school_count = len({group["schoolName"] for group in groups})
    missing_group_count = sum(1 for group in groups if "missingFromPdfTextParse" in group["qaFlags"])
    missing_major_count = sum(
        1 for group in groups for major in group["majors"] if "missingFromPdfTextParse" in major["qaFlags"]
    )
    reconciled_plan_count = sum(
        1 for group in groups for major in group["majors"] if "planReconciledWithStructuredReference" in major["qaFlags"]
    )

    return {
        "meta": {
            "region": "上海",
            "year": 2026,
            "batch": "本科普通批次",
            "grain": "院校专业组-专业",
            "sourceTrust": "official",
            "sourceLabel": "上海市教育考试院《2026年上海市普通高等学校招生专业目录》",
            "sourceFile": pdf_path.name,
            "sourceQuality": "official PDF text parse reconciled with structured 2026 regular-plan reference",
            "generatedAt": date.today().isoformat(),
            "startPdfPage": START_PDF_PAGE,
            "endPdfPage": END_PDF_PAGE,
            "recordCount": record_count,
            "groupCount": group_count,
            "schoolCount": school_count,
            "parsedPdfGroupCount": len(parsed_groups),
            "parsedPdfRecordCount": sum(len(group.majors) for group in parsed_groups),
            "missingPdfTextParseGroupCount": missing_group_count,
            "missingPdfTextParseMajorCount": missing_major_count,
            "reconciledPlanCount": reconciled_plan_count,
            "referenceSourceLabel": reference_dataset["meta"]["sourceLabel"],
            "referenceSourceTrust": reference_dataset["meta"]["sourceTrust"],
            "notes": [
                "PDF 页码为阅读器页码；printedPage 按目录正文页码约等于 PDF 页码减 6。",
                "专业组/专业顺序、专业代码、计划数和学费用已结构化的 2026 普通批参考表校验，避免 PDF 文字层粘连导致错列。",
                "学制、外语语种、专业备注、组备注优先来自官方 PDF 文字层；未解析到的记录在 qaFlags 中标记。",
            ],
        },
        "groups": groups,
    }


def shorten_for_client(value: str, limit: int = 220) -> str:
    value = clean_text(value)
    return value if len(value) <= limit else value[:limit] + "..."


def build_recommendations_dataset(catalog: dict[str, Any], reference_path: Path) -> dict[str, Any]:
    reference_dataset = json.loads(reference_path.read_text(encoding="utf-8"))
    reference_by_group = {group["groupCode"]: group for group in reference_dataset["groups"]}
    groups: list[dict[str, Any]] = []
    record_count = 0

    for group in catalog["groups"]:
        reference_group = reference_by_group.get(group["groupCode"], {})
        reference_majors = {
            major["majorCode"]: major for major in reference_group.get("majors", [])
        }
        majors: list[dict[str, Any]] = []
        for major in group["majors"]:
            reference_major = reference_majors.get(major["majorCode"], {})
            record_count += 1
            majors.append(
                {
                    "majorCode": major["majorCode"],
                    "majorName": major["majorName"],
                    "duration": major["duration"],
                    "plan2026": major["plan2026"],
                    "tuition": major["tuition"],
                    "languageRequirement": major["languageRequirement"],
                    "remarks": shorten_for_client(major["remarks"]),
                    "admittedCount2025": reference_major.get("admittedCount2025"),
                    "minScoreLabel": reference_major.get("minScoreLabel", ""),
                    "minScore2025": reference_major.get("minScore2025"),
                    "minRankLabel": reference_major.get("minRankLabel", ""),
                    "averageScore2025": reference_major.get("averageScore2025"),
                    "averageRank2025": reference_major.get("averageRank2025"),
                }
            )
        groups.append(
            {
                "schoolSlug": group["schoolSlug"],
                "schoolName": group["schoolName"],
                "schoolAlias": group["schoolAlias"],
                "schoolRegion": group["schoolRegion"],
                "category": group["category"],
                "groupCode": group["groupCode"],
                "groupName": group["groupName"],
                "groupSuffix": group["groupSuffix"],
                "subjectRequirement": group["subjectRequirement"],
                "officialSourceUrl": group["officialSourceUrl"],
                "majors": majors,
            }
        )

    return {
        "meta": {
            "region": catalog["meta"]["region"],
            "year": catalog["meta"]["year"],
            "referenceAdmissionYear": reference_dataset["meta"]["referenceAdmissionYear"],
            "batch": catalog["meta"]["batch"],
            "sourceTrust": catalog["meta"]["sourceTrust"],
            "sourceLabel": catalog["meta"]["sourceLabel"],
            "sourceFile": catalog["meta"]["sourceFile"],
            "sourceQuality": catalog["meta"]["sourceQuality"],
            "recordCount": record_count,
            "groupCount": catalog["meta"]["groupCount"],
            "schoolCount": catalog["meta"]["schoolCount"],
            "parsedPdfRecordCount": catalog["meta"]["parsedPdfRecordCount"],
            "missingPdfTextParseMajorCount": catalog["meta"]["missingPdfTextParseMajorCount"],
            "referenceSourceTrust": reference_dataset["meta"]["sourceTrust"],
            "referenceSourceLabel": reference_dataset["meta"]["sourceLabel"],
            "referenceSourceFile": reference_dataset["meta"]["sourceFile"],
            "notes": [
                "This compact file is for the score recommendation UI bundle.",
                "Full parsed catalog with qaFlags and source fields lives in official-2026-major-catalog.json.",
            ],
        },
        "groups": groups,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", type=Path, default=DEFAULT_PDF_PATH)
    parser.add_argument("--reference", type=Path, default=DEFAULT_REFERENCE_PATH)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    parser.add_argument("--recommendations-output", type=Path, default=DEFAULT_RECOMMENDATIONS_OUTPUT_PATH)
    args = parser.parse_args()

    catalog = build_catalog(args.pdf, args.reference)
    recommendations = build_recommendations_dataset(catalog, args.reference)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    args.recommendations_output.write_text(
        json.dumps(recommendations, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    meta = catalog["meta"]
    print(
        f"wrote {args.output}: {meta['recordCount']} majors, {meta['groupCount']} groups "
        f"({meta['parsedPdfRecordCount']} parsed directly from PDF text)"
    )
    print(f"wrote {args.recommendations_output}: {recommendations['meta']['recordCount']} compact records")


if __name__ == "__main__":
    main()
