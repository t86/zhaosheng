import type { Metadata } from "next";
import Link from "next/link";
import { buildCareerPaths, getCoveredSchoolCount } from "@/lib/career-reverse";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "按未来去向找方向 · 毕业生都去哪了",
  description:
    "从“将来想做什么”倒推方向与学校：进大厂、进体制选调、进金融、进医疗三甲、深造做科研，看哪些顶尖 985 在官方就业报告里明确点名了这条去向，以及它们对口的强势方向。",
};

export default function CareersPage() {
  const paths = buildCareerPaths();
  const coveredCount = getCoveredSchoolCount();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>
          职业反推 · 基于 {coveredCount} 所顶尖 985 官方就业报告
        </span>
        <h1>先想清楚将来想做什么，再倒推方向和学校</h1>
        <p className={styles.lead}>
          很多家长是从分数往下挑学校。这一页换个方向：先选一个孩子隐约向往的{" "}
          <strong>未来去向</strong>，再看哪些学校在官方就业报告里
          <strong>明确出现过</strong>这条路，以及它们对口的强势方向。
          它不替你做决定，只帮全家建立一点方向感。
        </p>

        <div className={styles.anchorCard}>
          <span>当前已整理的去向标签</span>
          <strong>{paths.length} 类</strong>
          <p>每一类下都只列在官方报告里真实点过名的学校，匹配不到的不硬塞。</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.disclaimerCard}>
          <strong>请先读这条口径声明</strong>
          <p>
            仅基于已整理的 {coveredCount} 所顶尖 985
            官方就业报告，不代表全部院校；就业去向逐年变化，仅供建立方向感。
            “对口强势方向”取自站内整理的强势专业序列或官方就业数据，
            不是教育部官方专业排名，更不保证个人一定能进对应单位。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>选一个未来去向，展开看对应学校</h2>
          </div>
          <p>
            点开每张卡，看哪些学校在官方报告里点名了这条去向，以及该校对口的强势方向；
            学校名可直接点进它的详情页。
          </p>
        </div>

        <div className={styles.pathGrid}>
          {paths.map((path) => (
            <details className={styles.pathCard} key={path.id}>
              <summary className={styles.pathSummary}>
                <span className={styles.pathEmoji} aria-hidden="true">
                  {path.emoji}
                </span>
                <span className={styles.pathTitle}>
                  <strong>{path.label}</strong>
                  <span className={styles.pathTagline}>{path.tagline}</span>
                </span>
                <span className={styles.pathCount}>
                  {path.schools.length} 所点名
                </span>
              </summary>

              <ul className={styles.schoolList}>
                {path.schools.map((school) => (
                  <li className={styles.schoolItem} key={school.slug}>
                    <Link
                      className={styles.schoolName}
                      href={`/schools/${school.slug}`}
                    >
                      {school.schoolName} →
                    </Link>
                    <span className={styles.schoolDirection}>
                      {school.direction}
                    </span>
                    {school.matchedSignal ? (
                      <span className={styles.schoolSignal}>
                        {school.matchedSignal}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <p className={styles.note}>
          同一所学校会出现在多条去向下——顶尖综合校本来就路路通。
          看到孩子反复出现在某条去向里，再回到那几所学校细看专业组，会更有把握。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>下一步</h2>
          </div>
          <p>有了方向感，再去把方向落成具体的学科类别和薪资量级判断。</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/directions">按学科方向继续筛选 →</Link>
          <Link href="/salary">看不同方向的薪资量级 →</Link>
        </div>
      </section>
    </main>
  );
}
