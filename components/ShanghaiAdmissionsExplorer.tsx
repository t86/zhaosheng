"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildShanghaiCompareCard } from "@/lib/shanghai-admissions-compare";
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
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);

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

  const compareCards = useMemo(() => {
    return compareSlugs
      .map((slug) => summaries.find((summary) => summary.school.slug === slug))
      .filter((summary): summary is SchoolAdmissionsSummary => Boolean(summary))
      .map((summary) => buildShanghaiCompareCard(summary));
  }, [compareSlugs, summaries]);

  function toggleCompare(slug: string) {
    setCompareSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 4) {
        return current;
      }

      return [...current, slug];
    });
  }

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

      <p className={styles.count}>
        当前命中 {filtered.length} 所学校
        {compareCards.length > 0 ? ` · 已加入对比 ${compareCards.length}/4` : ""}
      </p>

      {compareCards.length > 0 ? (
        <section className={styles.compareTray}>
          <div className={styles.compareHeader}>
            <div>
              <h3>已选学校对比</h3>
              <p>这一栏只对比当前站内已经核到的公开组线、阈值、Q 组和学校官网补口径，不替代位次判断。</p>
            </div>
            <button
              className={styles.clearButton}
              type="button"
              onClick={() => setCompareSlugs([])}
            >
              清空对比
            </button>
          </div>

          <div className={styles.compareGrid}>
            {compareCards.map((card) => (
              <article className={styles.compareCard} key={card.schoolSlug}>
                <div className={styles.compareTopline}>
                  <div>
                    <strong>{card.schoolName}</strong>
                    <p>{card.schoolMeta}</p>
                  </div>
                  <span className={styles.compareLeadTag}>{card.readMethodTag}</span>
                </div>

                {card.tags.length > 0 ? (
                  <div className={styles.tagRow}>
                    {card.tags.map((tag) => (
                      <span className={styles.tag} data-tone={tag.tone} key={`${card.schoolSlug}-${tag.label}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className={styles.compareFacts}>
                  <div className={styles.compareFact}>
                    <span>最新年份</span>
                    <strong>{card.latestYear}</strong>
                  </div>
                  <div className={styles.compareFact}>
                    <span>精确组线</span>
                    <strong>{card.exactLines}</strong>
                  </div>
                  <div className={styles.compareFact}>
                    <span>阈值记录</span>
                    <strong>{card.thresholdLines}</strong>
                  </div>
                  <div className={styles.compareFact}>
                    <span>Q组记录</span>
                    <strong>{card.qGroupLines}</strong>
                  </div>
                  <div className={styles.compareFact}>
                    <span>官网补口径</span>
                    <strong>{card.officialSupplement}</strong>
                  </div>
                  <div className={styles.compareFact}>
                    <span>最新快照</span>
                    <strong>{card.latestSnapshot}</strong>
                  </div>
                </div>

                <p className={styles.compareNote}>{card.readMethod}</p>
                <Link className={styles.link} href={card.detailHref}>
                  学校详情 →
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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
              <div className={styles.actions}>
                <button
                  className={styles.compareButton}
                  type="button"
                  disabled={
                    !compareSlugs.includes(summary.school.slug) && compareSlugs.length >= 4
                  }
                  onClick={() => toggleCompare(summary.school.slug)}
                >
                  {compareSlugs.includes(summary.school.slug)
                    ? "移出对比"
                    : compareSlugs.length >= 4
                      ? "对比已满"
                      : "加入对比"}
                </button>
                <Link className={styles.link} href={`/schools/${summary.school.slug}`}>
                  学校详情 →
                </Link>
              </div>
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
