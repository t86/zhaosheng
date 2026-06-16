import Link from "next/link";
import { ShanghaiOfficialRecordsTable } from "@/components/ShanghaiOfficialRecordsTable";
import { ShanghaiAdmissionsExplorer } from "@/components/ShanghaiAdmissionsExplorer";
import { ScoreLocator } from "@/components/ScoreLocator";
import { RankConverter } from "@/components/RankConverter";
import { shanghaiDecisionGuide, shanghaiFillStrategy } from "@/data/shanghai-decision-guide";
import {
  getShanghaiMajorAdmissionPreviewRecords,
  getShanghaiMajorAdmissionSummary,
} from "@/data/shanghai-major-admissions";
import { getShanghaiHighValueDataStatus } from "@/lib/shanghai-high-value-data";
import { getShanghaiHighValueImportManifest } from "@/lib/shanghai-high-value-imports";
import { getShanghaiFocusAdmissions } from "@/lib/shanghai-focus";
import { schools, schoolsBySlug } from "@/lib/schools";
import {
  getShanghaiAdmissionsCoverage,
  getShanghaiAdmissionsForSchool,
  shanghaiAdmissionsMeta,
  shanghaiAdmissionsMissingSchools,
} from "@/lib/shanghai-admissions";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "上海近 5 年院校专业组投档线查询 | 查分数",
  description:
    "按学校和年份筛选上海市教育考试院公开的 2021-2025 本科普通批平行志愿投档线（院校专业组口径），并附官方规则、填报核对清单和原始来源。",
};

export default function ShanghaiAdmissionsPage() {
  const coverage = getShanghaiAdmissionsCoverage();
  const highValueDataStatus = getShanghaiHighValueDataStatus();
  const highValueImportManifest = getShanghaiHighValueImportManifest();
  const majorAdmissionSummary = getShanghaiMajorAdmissionSummary();
  const majorAdmissionPreviewRecords = getShanghaiMajorAdmissionPreviewRecords(10);
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

      <section className={styles.section} id="explorer">
        <div className={styles.sectionHeader}>
          <div>
            <h2>上海近 5 年组线（可按学校和年份筛选）</h2>
          </div>
          <p>
            这是本页的核心查询工具。Q组与考试院单独公布的组别也一并列进来了，避免把 2025 这类拆表年份漏掉。
          </p>
        </div>

        <ScoreLocator />

        <RankConverter />

        <div className={styles.bridgeNote}>
          看到冲 / 稳 / 保清单只是第一步。平行志愿真正要做的，是把这三档<strong>合并成一张从高到低的 24 行有序表</strong>，
          并对每个组决定 4 个专业的顺序和是否服从调剂。
          <a href="#fill-strategy">往下看“这 24 个志愿到底怎么填” →</a>
        </div>

        <ShanghaiAdmissionsExplorer summaries={summaries} years={coverage.years} />

        <div className={styles.adjustCard}>
          <strong>勾“服从调剂”前，先做这三步自检</strong>
          <ol>
            <li>打开这个院校专业组对应的《招生专业目录》，看清组里到底捆了<strong>哪些专业</strong>（不是只看组名和分数）。</li>
            <li>圈出组里你<strong>最不能接受</strong>的那个专业，问自己：被调剂到它，也认吗？</li>
            <li>认，就勾服从（能防退档）；不认，就别勾这个组、换一个组内专业你都能接受的——而不是赌不会被调剂。</li>
          </ol>
          <p className={styles.note}>
            调剂只在被投档的这个组内进行：组内 4 个专业没录上又不服从，会被退档；服从则可能被调到组内任意专业。
          </p>
        </div>
      </section>

      <section className={styles.section} id="fill-strategy">
        <div className={styles.sectionHeader}>
          <div>
            <h2>这 24 个志愿到底怎么填</h2>
          </div>
          <p>
            上海普通批可填 24 个院校专业组、每组 4 个专业 + 是否服从调剂。看清楚候选只是上半场，下面是把它落成一张志愿表的五步。
          </p>
        </div>

        <div className={styles.fillGrid}>
          {shanghaiFillStrategy.map((item) => (
            <article className={styles.fillCard} key={item.step}>
              <span className={styles.fillNo}>{item.step}</span>
              <h3>{item.title}</h3>
              <p className={styles.fillAction}>{item.action}</p>
              <p className={styles.fillWhy}>为什么：{item.why}</p>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          以上为依据上海 2026 普通批实施办法整理的填报方法，不替你决定具体志愿；正式填报请以当年官方招生专业目录、志愿表样表和实施办法为准。更深的避坑案例见{" "}
          <a href="/pitfalls">填志愿十大常见错误</a>。
        </p>

        <details className={styles.governanceDetails}>
          <summary>数据口径、已接入专业考分与待补计划数（点击展开）</summary>
          <div className={styles.governanceBody}>
            <p>
              本站当前公开接入的是可回链的上海市教育考试院组线，口径为“院校专业组”，更适合先做学校池和风险判断。
              本次已把用户提供的考试院版《2025 年上海市普通高等学校招生各专业录取人数及考分》首批结构化到站内，
              当前覆盖 {majorAdmissionSummary.schoolCount} 所重点学校、{majorAdmissionSummary.recordCount} 条专业层记录。
              表内保留“≥580”“≤4096”等官方阈值标签，不把被隐藏的高分最低分反推成具体分数；在沪计划数仍需等待
              《2026 年上海市普通高等学校招生专业目录》核对。
            </p>

            <div className={styles.dataStatusGrid}>
              {highValueDataStatus.map((item) => (
                <article className={styles.dataStatusCard} key={item.metricLabel}>
                  <div className={styles.dataStatusTopline}>
                    <strong>{item.metricLabel}</strong>
                    <span>{item.statusLabel}</span>
                  </div>
                  <div className={styles.dataStatusFacts}>
                    <div>
                      <small>已导入</small>
                      <p>{item.importedCount}</p>
                    </div>
                    <div>
                      <small>覆盖学校</small>
                      <p>{item.coverageLabel}</p>
                    </div>
                  </div>
                  <p>{item.summary}</p>
                  <a href={item.sourceUrl} rel="noreferrer" target="_blank">
                    {item.sourceTitle} →
                  </a>
                </article>
              ))}
            </div>

            <div className={styles.importReadyNote}>
              <strong>导入口径说明</strong>
              <p>
                仓库仍保留 {highValueImportManifest.length} 份上海高价值资料的数据槽位。专业录取考分已经先导入重点学校池；
                招生专业目录和计划数尚未导入，后续会在逐条核对后再上站。
              </p>
            </div>

            <div className={styles.majorAdmissionPanel}>
              <div className={styles.majorAdmissionHeader}>
                <div>
                  <span>{majorAdmissionSummary.year} · 专业层样例</span>
                  <h3>2025 专业录取考分样例</h3>
                  <p>
                    这张表用于帮助家长理解“组线之外，组内专业的录取人数、平均分和平均分位次”。完整数据会按学校进入详情页。
                  </p>
                </div>
                <a href={majorAdmissionSummary.sourceUrl} rel="noreferrer" target="_blank">
                  {majorAdmissionSummary.sourceLabel} →
                </a>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.majorAdmissionTable}>
                  <thead>
                    <tr>
                      <th>学校/批次</th>
                      <th>专业与专业组</th>
                      <th>录取数</th>
                      <th>最低分</th>
                      <th>平均分位次</th>
                    </tr>
                  </thead>
                  <tbody>
                    {majorAdmissionPreviewRecords.map((record) => (
                      <tr key={`${record.schoolSlug}-${record.batch}-${record.groupCode}-${record.majorName}`}>
                        <td>
                          <strong>{record.schoolName}</strong>
                          <span>{record.batch}</span>
                        </td>
                        <td>
                          <strong>{record.majorName}</strong>
                          <span>
                            {record.groupCode} · {record.groupName}
                          </span>
                        </td>
                        <td>{record.admittedCount}</td>
                        <td>
                          {record.minScoreLabel}
                          <span>{record.minRankLabel}</span>
                        </td>
                        <td>
                          {record.averageScore}
                          <span>{record.averageRank}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </details>
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
            <h2>填报前先核对这些事</h2>
          </div>
          <p>
            这一组把考试院 2026 实施办法和官方提醒里反复强调的动作，整理成可以执行的清单。
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
