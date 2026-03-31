import Link from "next/link";
import { ShanghaiOfficialRecordsTable } from "@/components/ShanghaiOfficialRecordsTable";
import { ShanghaiAdmissionsExplorer } from "@/components/ShanghaiAdmissionsExplorer";
import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
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
  const officialBundles = [
    {
      title: "官方参考资料",
      description: "这批是上海市教育考试院 2025 本科阶段志愿填报特别提醒里直接列出的材料。",
      items: shanghaiDecisionGuide.resources,
    },
    {
      title: "官方辅助工具",
      description: "如果后续要补站内的位次、对比和意向表能力，这组最值得参考。",
      items: shanghaiDecisionGuide.tools,
    },
    {
      title: "官方信息入口",
      description: "规则、直播、咨询、章程和临时提醒，最终都应该回到这些入口核对。",
      items: shanghaiDecisionGuide.channels,
    },
  ];
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
            <h2>先把官方规则看清</h2>
          </div>
          <p>
            这一页先用上海市教育考试院正式文件把“怎么看组线、怎么核资格、怎么排风险”说清楚，再去看学校和年份筛选。
          </p>
        </div>

        <div className={styles.truthLayout}>
          <article className={styles.statusCard}>
            <span className={styles.statusKicker}>{shanghaiDecisionGuide.status.kicker}</span>
            <h3>{shanghaiDecisionGuide.status.title}</h3>
            <p>{shanghaiDecisionGuide.status.summary}</p>
            <ul className={styles.statusList}>
              {shanghaiDecisionGuide.status.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <div className={styles.ruleGrid}>
            {shanghaiDecisionGuide.verifiedRules.map((item) => (
              <article className={styles.ruleCard} key={`${item.label}-${item.value}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.sourceLinks}>
          {shanghaiDecisionGuide.sources.map((source) => (
            <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
              {source.label} →
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>填报前先核对的 4 件事</h2>
          </div>
          <p>
            这一组把考试院在 2025 答记者问和特别提醒里反复强调的动作，整理成可以执行的清单。
          </p>
        </div>

        <div className={styles.checkGrid}>
          {shanghaiDecisionGuide.checks.map((item) => (
            <article className={styles.checkCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>官方参考资料和入口</h2>
          </div>
          <p>
            站内后续要补“位次、计划数、对比台、志愿意向表”，最应该向这几类官方资料和工具对齐，而不是先抄第三方说法。
          </p>
        </div>

        <div className={styles.bundleStack}>
          {officialBundles.map((bundle) => (
            <div className={styles.bundleSection} key={bundle.title}>
              <div className={styles.bundleHeader}>
                <h3>{bundle.title}</h3>
                <p>{bundle.description}</p>
              </div>
              <div className={styles.resourceGrid}>
                {bundle.items.map((item) => (
                  <a
                    className={styles.resourceCard}
                    href={item.url}
                    key={`${bundle.title}-${item.title}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span>{item.note}</span>
                    <div className={styles.resourceLink}>{item.actionLabel}</div>
                  </a>
                ))}
              </div>
            </div>
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

        <div className={styles.gapCard}>
          <strong>当前最关键但尚未接入的两层数据</strong>
          <p>
            上海市教育考试院在 2025 本科阶段志愿填报特别提醒里，明确把《2024 年上海市普通高等学校招生各专业录取人数及考分》列为核心参考资料，
            其中包含最低分、平均分和平均分位次；而《2025 年上海市普通高等学校招生专业目录》则用于核对在沪招生院校、专业和计划数。本站当前先公开接入的是可回链的考试院组线，
            还没有把这两层书册数据结构化进来，所以这页更适合先做学校池和风险判断，而不是直接替代最终冲稳保决策。
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
