from __future__ import annotations

import io
import json
import re
import time
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SEED_FILE = ROOT / "data" / "school-seed.json"
OUTPUT_FILE = ROOT / "data" / "school-metrics.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}
TIMEOUT = 20
MAX_RESULTS = 8
ALLOWED_FALLBACK_HOSTS = ("ncss.cn", "dxs.moe.gov.cn")

session = requests.Session()
session.headers.update(HEADERS)


def load_seed() -> list[dict[str, Any]]:
    return json.loads(SEED_FILE.read_text(encoding="utf-8"))


def ddg_search(query: str) -> list[dict[str, str]]:
    response = session.get(
        "https://lite.duckduckgo.com/lite/",
        params={"q": query},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    results: list[dict[str, str]] = []

    for title_node in soup.select("a[href]"):
        raw_href = title_node.get("href", "")
        if "duckduckgo.com/l/?" not in raw_href:
            continue
        url = normalize_ddg_href(raw_href)
        if not url:
            continue

        results.append(
            {
                "title": title_node.get_text(" ", strip=True),
                "url": url,
                "snippet": "",
            }
        )
        if len(results) >= MAX_RESULTS:
            break

    time.sleep(0.8)

    return results


def normalize_ddg_href(raw_href: str) -> str:
    if raw_href.startswith("//duckduckgo.com/l/?"):
        query = parse_qs(urlparse(f"https:{raw_href}").query)
        return query.get("uddg", [""])[0]
    if raw_href.startswith("/l/?"):
        query = parse_qs(urlparse(f"https://duckduckgo.com{raw_href}").query)
        return query.get("uddg", [""])[0]
    return raw_href


def host_matches(url: str, *hosts: str) -> bool:
    hostname = urlparse(url).netloc.lower()
    return any(hostname == host or hostname.endswith(f".{host}") for host in hosts)


def dedupe_results(results: list[dict[str, str]]) -> list[dict[str, str]]:
    seen: set[str] = set()
    unique: list[dict[str, str]] = []
    for result in results:
        if result["url"] in seen:
            continue
        seen.add(result["url"])
        unique.append(result)
    return unique


def score_result(
    result: dict[str, str],
    domain: str,
    school_name: str,
    keywords: tuple[str, ...],
    allow_fallback_hosts: bool,
) -> int:
    score = 0
    title = result["title"]
    url = result["url"]

    if school_name in title:
        score += 3
    if all(keyword in title or keyword in result["snippet"] for keyword in keywords):
        score += 3
    elif any(keyword in title or keyword in result["snippet"] for keyword in keywords):
        score += 1
    if url.endswith(".pdf"):
        score += 1

    if host_matches(url, domain):
        score += 6
    elif allow_fallback_hosts and host_matches(url, *ALLOWED_FALLBACK_HOSTS):
        score += 4
    else:
        score -= 4

    return score


def choose_result(
    school_name: str,
    domain: str,
    queries: list[str],
    keywords: tuple[str, ...],
    allow_fallback_hosts: bool = False,
) -> dict[str, str] | None:
    combined: list[dict[str, str]] = []
    for query in queries:
        combined.extend(ddg_search(query))

    best_score = -10**9
    best_result: dict[str, str] | None = None
    for result in dedupe_results(combined):
        score = score_result(result, domain, school_name, keywords, allow_fallback_hosts)
        if score > best_score:
            best_score = score
            best_result = result

    if best_score < 2:
        return None
    return best_result


def extract_text_from_pdf(content: bytes) -> str:
    reader = PdfReader(io.BytesIO(content))
    chunks = []
    for page in reader.pages:
        chunks.append(page.extract_text() or "")
    return "\n".join(chunks)


def discover_pdf_url(base_url: str, soup: BeautifulSoup, domain: str) -> str | None:
    candidates: list[str] = []
    for node in soup.select("a[href]"):
        href = node.get("href", "").strip()
        if not href:
            continue
        if ".pdf" not in href.lower() and "pdfview" not in href.lower():
            continue
        candidates.append(urljoin(base_url, href))

    for candidate in candidates:
        if host_matches(candidate, domain):
            return candidate
    return candidates[0] if candidates else None


def fetch_source_payload(url: str, domain: str, prefer_pdf: bool) -> dict[str, Any]:
    response = session.get(url, timeout=TIMEOUT)
    response.raise_for_status()
    content_type = response.headers.get("content-type", "").lower()

    if url.lower().endswith(".pdf") or "application/pdf" in content_type:
        return {
            "final_url": response.url,
            "text": extract_text_from_pdf(response.content),
            "title": "",
        }

    response.encoding = response.apparent_encoding or response.encoding
    soup = BeautifulSoup(response.text, "html.parser")
    title = soup.title.get_text(" ", strip=True) if soup.title else ""

    if prefer_pdf:
        pdf_url = discover_pdf_url(response.url, soup, domain)
        if pdf_url:
            pdf_response = session.get(pdf_url, timeout=TIMEOUT)
            pdf_response.raise_for_status()
            if "application/pdf" in pdf_response.headers.get("content-type", "").lower() or pdf_url.lower().endswith(".pdf"):
                return {
                    "final_url": pdf_response.url,
                    "text": extract_text_from_pdf(pdf_response.content),
                    "title": title,
                }

    text = soup.get_text("\n", strip=True)
    return {"final_url": response.url, "text": text, "title": title}


def compact_text(text: str) -> str:
    return re.sub(r"\s+", "", text)


def match_value(text: str, patterns: list[str]) -> str | None:
    compact = compact_text(text)
    for pattern in patterns:
        match = re.search(pattern, compact)
        if match:
            return match.group(1)
    return None


def match_year_label(*parts: str) -> str | None:
    combined = " ".join(parts)
    patterns = [r"(20\d{2}[—\-–]20\d{2}学年)", r"(20\d{2}届)", r"(20\d{2}年)"]
    for pattern in patterns:
        match = re.search(pattern, combined)
        if match:
            return match.group(1)
    return None


def build_quality_metrics(source: dict[str, Any]) -> dict[str, Any]:
    text = source["text"]
    return {
        "title": source["title"] or "本科教学质量报告",
        "url": source["final_url"],
        "yearLabel": match_year_label(source["title"], source["text"]),
        "undergraduateMajorCount": match_value(
            text,
            [
                r"设置(\d+)个本科专业",
                r"共设有(\d+)个本科专业",
                r"现有(\d+)个本科专业",
                r"开设(\d+)个本科专业",
                r"本科专业总数为(\d+)个",
            ],
        ),
    }


def build_employment_metrics(source: dict[str, Any]) -> dict[str, Any]:
    text = source["text"]
    return {
        "title": source["title"] or "毕业生就业质量报告",
        "url": source["final_url"],
        "yearLabel": match_year_label(source["title"], source["text"]),
        "overallDestinationRate": match_value(
            text,
            [
                r"(?:总体|毕业生)(?:毕业)?(?:去向落实率|毕业去向落实率|就业去向落实率|就业率)(?:为|达|达到|约为|超|超过)?((?:超)?\d+(?:\.\d+)?%)",
                r"(?:去向落实率|毕业去向落实率|就业去向落实率)(?:为|达|达到|约为|超|超过)?((?:超)?\d+(?:\.\d+)?%)",
            ],
        ),
        "undergraduateDestinationRate": match_value(
            text,
            [
                r"本科(?:毕业生)?(?:总体)?(?:毕业去向落实率|就业去向落实率|去向落实率|就业率)(?:为|达|达到|约为|超|超过)?((?:超)?\d+(?:\.\d+)?%)",
            ],
        ),
        "undergraduateFurtherStudyRate": match_value(
            text,
            [
                r"本科(?:毕业生)?(?:继续)?深造率(?:为|达|达到|约为)?(\d+(?:\.\d+)?%)",
                r"本科(?:毕业生)?(?:升学率|国内外升学率)(?:为|达|达到|约为)?(\d+(?:\.\d+)?%)",
            ],
        ),
        "monthlySalary": match_value(
            text,
            [
                r"(?:平均月收入|平均月薪|平均月度薪酬|平均月薪酬)(?:为|达|达到|约为)?(\d+(?:\.\d+)?元)",
                r"(?:月收入|月薪|月度薪酬)(?:为|达|达到|约为)?(\d+(?:\.\d+)?元)",
            ],
        ),
    }


def enrich_school(school: dict[str, Any]) -> dict[str, Any]:
    school_name = school["name"]
    domain = school["officialDomain"]

    quality_result = choose_result(
        school_name,
        domain,
        [
            f"{school_name} 本科教学质量报告 site:{domain} pdf",
            f"{school_name} 本科教学质量报告 site:{domain}",
        ],
        keywords=("本科教学质量报告",),
    )

    employment_result = choose_result(
        school_name,
        domain,
        [
            f"{school_name} 毕业生就业质量报告 pdf",
            f"{school_name} 就业质量报告 pdf",
            f"{school_name} 毕业生就业质量报告",
        ],
        keywords=("就业质量报告",),
        allow_fallback_hosts=True,
    )

    enriched: dict[str, Any] = {"updatedAt": ""}

    if quality_result:
        source = fetch_source_payload(quality_result["url"], domain, prefer_pdf=True)
        enriched["qualityReport"] = build_quality_metrics(source)
    if employment_result:
        source = fetch_source_payload(employment_result["url"], domain, prefer_pdf=False)
        enriched["employmentReport"] = build_employment_metrics(source)

    return enriched


def main() -> None:
    schools = load_seed()
    output: dict[str, Any] = {}

    for school in schools:
        print(f"[collect] {school['name']}")
        try:
            output[school["slug"]] = enrich_school(school)
        except Exception as exc:
            output[school["slug"]] = {"error": str(exc)}
            print(f"  -> skipped: {exc}")

    OUTPUT_FILE.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"saved {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
