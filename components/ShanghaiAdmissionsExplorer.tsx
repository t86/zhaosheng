"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getShanghaiAdmissionsInsight } from "@/lib/shanghai-admissions-insights";
import type { School } from "@/lib/schools";
import type { ShanghaiAdmissionRecord } from "@/lib/shanghai-admissions";
import styles from "./ShanghaiAdmissionsExplorer.module.css";

type SchoolAdmissionsSummary = {
  school: School;
  records: ShanghaiAdmissionRecord[];
};

type Props = {
  summaries: SchoolAdmissionsSummary[];
  years: number[];
};

function getSourceLabel(sourceType: ShanghaiAdmissionRecord["sourceType"]) {
  switch (sourceType) {
    case "q-group":
      return "Q组";
    case "supplemental-group":
      return "单独公布";
    default:
      return "普通批";
  }
}

export function ShanghaiAdmissionsExplorer({ summaries, years }: Props) {
  const [schoolSlug, setSchoolSlug] = useState("all");
  const [year, setYear] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return summaries
      .map((summary) => {
        const filteredRecords = summary.records.filter(
          (record) => year === "all" || record.year === Number(year),
        );

        return {
          ...summary,
          filteredRecords,
          insight: getShanghaiAdmissionsInsight(summary.school.slug, summary.records),
        };
      })
      .filter(
        (summary) =>
          (schoolSlug === "all" || summary.school.slug === schoolSlug) &&
          (schoolSlug !== "all" || summary.records.length > 0) &&
          (schoolSlug === "all" ? summary.filteredRecords.length > 0 : true) &&
          (tagFilter === "all" ||
            summary.insight?.tags.some((tag) => {
              switch (tagFilter) {
                case "exact":
                  return tag.label === "含精确组线";
                case "threshold":
                  return tag.label === "含 580+ 阈值";
                case "q-group":
                  return tag.label === "含 Q 组";
                case "official":
                  return tag.label === "学校官网补口径";
                default:
                  return true;
              }
            })) &&
          (!query ||
            summary.school.name.includes(query) ||
            summary.school.city.includes(query) ||
            summary.filteredRecords.some((record) => record.groupName.includes(query))),
      );
  }, [query, schoolSlug, summaries, tagFilter, year]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <input
          className={styles.input}
          placeholder="搜学校或组名，比如“复旦”“Q组”“医学”"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className={styles.select}
          value={schoolSlug}
          onChange={(event) => setSchoolSlug(event.target.value)}
        >
          <option value="all">全部学校</option>
          {summaries.map((summary) => (
            <option key={summary.school.slug} value={summary.school.slug}>
              {summary.school.name}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={tagFilter}
          onChange={(event) => setTagFilter(event.target.value)}
        >
          <option value="all">全部读法标签</option>
          <option value="exact">含精确组线</option>
          <option value="threshold">含 580+ 阈值</option>
          <option value="q-group">含 Q 组</option>
          <option value="official">学校官网补口径</option>
        </select>
        <select
          className={styles.select}
          value={year}
          onChange={(event) => setYear(event.target.value)}
        >
          <option value="all">全部年份</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className={styles.count}>当前命中 {filtered.length} 所学校</p>

      <div className={styles.sections}>
        {filtered.map((summary) => (
          <section className={styles.schoolCard} key={summary.school.slug}>
            <div className={styles.schoolHeader}>
              <div>
                <h3>{summary.school.name}</h3>
                <p>
                  {summary.school.city} · {summary.school.schoolType} · 最近 5 年官方公开组线{" "}
                  {summary.records.length} 条
                </p>
              </div>
              <Link className={styles.link} href={`/schools/${summary.school.slug}`}>
                学校详情 →
              </Link>
            </div>

            {summary.insight ? (
              <div className={styles.insightBlock}>
                <div className={styles.tagRow}>
                  {summary.insight.tags.map((tag) => (
                    <span className={styles.tag} data-tone={tag.tone} key={`${summary.school.slug}-${tag.label}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div className={styles.metaGrid}>
                  <div className={styles.metaCard}>
                    <span>覆盖年份</span>
                    <strong>{summary.insight.yearsCovered.join(" / ")}</strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>精确组线</span>
                    <strong>{summary.insight.exactRecordCount}</strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>阈值记录</span>
                    <strong>{summary.insight.thresholdRecordCount}</strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>Q组记录</span>
                    <strong>{summary.insight.qGroupCount}</strong>
                  </div>
                </div>
                <p className={styles.insightLead}>{summary.insight.headline}</p>
                <p className={styles.insightNote}>{summary.insight.note}</p>
              </div>
            ) : null}

            {summary.filteredRecords.length > 0 ? (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>年份</th>
                      <th>组别</th>
                      <th>投档线</th>
                      <th>口径</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.filteredRecords.map((record) => (
                      <tr key={`${record.year}-${record.groupCode}-${record.sourceType}`}>
                        <td>{record.year}</td>
                        <td>
                          <strong>{record.groupName}</strong>
                          <span className={styles.code}>{record.groupCode}</span>
                        </td>
                        <td>{record.score}</td>
                        <td>
                          <a
                            className={styles.sourceLink}
                            href={record.sourceUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {getSourceLabel(record.sourceType)}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.empty}>
                {summary.records.length === 0
                  ? "2021-2025 年上海市教育考试院公开的本科普通批次平行志愿表中，当前没有检出这所学校的匹配记录。"
                  : "当前筛选条件下没有命中记录。该校如果确实在本页列表中，先尝试切回“全部年份”。"}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
