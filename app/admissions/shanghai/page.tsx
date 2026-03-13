import Link from "next/link";
import { ShanghaiOfficialRecordsTable } from "@/components/ShanghaiOfficialRecordsTable";
import { ShanghaiAdmissionsExplorer } from "@/components/ShanghaiAdmissionsExplorer";
import { getShanghaiFocusAdmissions } from "@/lib/shanghai-focus";
import { schools, schoolsBySlug } from "@/lib/schools";
import {
  getShanghaiAdmissionsCoverage,
  getShanghaiAdmissionsForSchool,
  shanghaiAdmissionsMeta,
  shanghaiAdmissionsMissingSchools,
} from "@/lib/shanghai-admissions";
import styles from "./page.module.css";

export default function ShanghaiAdmissionsPage() {
  const coverage = getShanghaiAdmissionsCoverage();
  const focusSchools = getShanghaiFocusAdmissions().map((item) => ({
    ...item,
    school: item.schoolSlug ? schoolsBySlug.get(item.schoolSlug) : undefined,
  }));
  const summaries = schools.map((school) => ({
    school,
    records: getShanghaiAdmissionsForSchool(school.slug),
  }));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>上海 · 2021-2025 官方公开录取线</span>
        <h1>先看清上海最近 5 年的院校专业组投档线，再谈专业填报。</h1>
        <p className={styles.lead}>
          这里展示的是上海市教育考试院公开的本科普通批次平行志愿投档数据，当前口径是
          “院校专业组”，不是单个本科专业最低分。对上海考生来说，这个口径比“学校平均分”更接近实际填报。
        </p>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span>年份范围</span>
            <strong>{coverage.years[0]}-{coverage.years.at(-1)}</strong>
          </div>
          <div className={styles.statCard}>
            <span>已检出学校</span>
            <strong>{coverage.coveredSchoolCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>公开记录数</span>
            <strong>{coverage.totalRecords}</strong>
          </div>
          <div className={styles.statCard}>
            <span>当前口径</span>
            <strong>{shanghaiAdmissionsMeta.grain}</strong>
          </div>
        </div>

        <div className={styles.noteCard}>
          {shanghaiAdmissionsMeta.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>重点学校深挖</h2>
          </div>
          <p>
            这批学校优先补的是“官方已经公开到哪一层”。有的学校只公开学校线，有的公开分类线，有的还能对上考试院专业组线。
          </p>
        </div>

        <div className={styles.focusGrid}>
          {focusSchools.map((item) => (
            <article className={styles.focusCard} key={item.schoolName}>
              <div className={styles.focusHeader}>
                <div>
                  <span className={styles.focusBadge}>{item.badge}</span>
                  <h3>{item.schoolName}</h3>
                  <p className={styles.focusNote}>{item.note}</p>
                </div>
                {item.school ? (
                  <Link className={styles.focusLink} href={`/schools/${item.school.slug}`}>
                    学校详情 →
                  </Link>
                ) : (
                  <a
                    className={styles.focusLink}
                    href={item.sources[0]?.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    官方入口 →
                  </a>
                )}
              </div>

              {item.records.length > 0 ? (
                <ShanghaiOfficialRecordsTable records={item.records} />
              ) : (
                <p className={styles.focusEmpty}>当前只保留官方入口，本轮不并入 985 主池统计。</p>
              )}

              <div className={styles.focusSources}>
                {item.sources.map((source) => (
                  <a href={source.url} key={`${item.schoolName}-${source.url}`} rel="noreferrer" target="_blank">
                    {source.label} →
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>未检出学校</h2>
          </div>
          <p>
            这几所学校在 2021 年到 2025 年上海市教育考试院公开的本科普通批次平行志愿表中，没有检出匹配记录。
          </p>
        </div>
        <div className={styles.missingRow}>
          {shanghaiAdmissionsMissingSchools.map((item) => (
            <div className={styles.missingCard} key={item.schoolSlug}>
              <strong>{item.schoolName}</strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>上海近 5 年组线</h2>
          </div>
          <p>
            可按学校和年份筛选。Q组与考试院单独公布的组别也一并列进来了，避免把 2025 这类拆表年份漏掉。
          </p>
        </div>

        <ShanghaiAdmissionsExplorer summaries={summaries} years={coverage.years} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>原始来源</h2>
          </div>
          <p>所有记录都回链到上海市教育考试院原始 PDF。</p>
        </div>
        <div className={styles.sourceGrid}>
          {shanghaiAdmissionsMeta.sources.map((source) => (
            <a
              className={styles.sourceCard}
              href={source.url}
              key={source.filename}
              rel="noreferrer"
              target="_blank"
            >
              <span>
                {source.year} · {source.sourceType === "regular" ? "普通批" : "Q组/单独公布"}
              </span>
              <strong>{source.label}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
