"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
        };
      })
      .filter(
        (summary) =>
          (schoolSlug === "all" || summary.school.slug === schoolSlug) &&
          (schoolSlug !== "all" || summary.records.length > 0) &&
          (schoolSlug === "all" ? summary.filteredRecords.length > 0 : true) &&
          (!query ||
            summary.school.name.includes(query) ||
            summary.school.city.includes(query) ||
            summary.filteredRecords.some((record) => record.groupName.includes(query))),
      );
  }, [query, schoolSlug, summaries, year]);

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
