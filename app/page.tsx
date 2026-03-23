import Link from "next/link";
import { topicDefinitions } from "@/data/topics";
import { SchoolExplorer } from "@/components/SchoolExplorer";
import {
  getCoverageStats,
  getRegions,
  getSchoolTypes,
  schools,
} from "@/lib/schools";
import styles from "./page.module.css";

export default function Home() {
  const coverage = getCoverageStats();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>985 高校专题站 · 面向高考志愿参考</span>
        <h1>先把 39 所 985 看透，再决定下一步怎么报。</h1>
        <p>
          这是一版只聚焦 985 的学校层数据站。当前优先展示学校标签、专业档案、区域分布和已经挂接上的公开报告快照，
          方便你先做学校池筛选，再决定是否进入更细的省份录取和专业组推荐。
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.eyebrow}>只看 985，不混入 211 和双一流扩展池</span>
          <span className={styles.eyebrow}>专题切片包括 C9、华东五校、军工 985 等</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span>学校总数</span>
            <strong>{coverage.schoolCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>专题数</span>
            <strong>{coverage.topicCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>专业档案覆盖</span>
            <strong>{coverage.majorProfileCovered}</strong>
          </div>
          <div className={styles.statCard}>
            <span>就业快照覆盖</span>
            <strong>{coverage.employmentCovered}</strong>
          </div>
        </div>
        <p className={styles.heroNote}>
          当前已补 {coverage.majorProfileCovered} 所学校的专业档案，并开始按 `高考直招 / 专项选拔 / 校内选拔 / 综合选拔 / 培养平台`
          区分特色班型口径。报告型指标依旧只在挂到学校公开的本科教学质量报告或就业质量报告后才展示。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>高三下时间线</h2>
          </div>
          <p>
            把你提供的多张规划图整理成时间线库，既能看总览，也能看上海 6-7 月、7-8 月和 2025 录取流程。
          </p>
        </div>
        <Link className={styles.timelineCard} href="/timeline">
          <div className={styles.timelineCardTopline}>
            <span className={styles.timelineBadge}>新补内容</span>
            <strong>高三时间线库</strong>
          </div>
          <p>
            现在已经拆成 4 段：高三下总览、上海 6-7 月、上海 7-8 月、2025 上海录取流程。桌面端是横向图表，手机端会自动折叠成卡片。
          </p>
          <div className={styles.timelinePreview}>
            <span style={{ left: "15%" }}>总览</span>
            <span style={{ left: "37%" }}>6-7月</span>
            <span style={{ left: "59%" }}>7-8月</span>
            <span style={{ left: "84%" }}>2025</span>
            <i style={{ left: "18%" }} />
            <i style={{ left: "41%" }} />
            <i style={{ left: "63%" }} />
            <i style={{ left: "86%" }} />
          </div>
          <div className={styles.timelineHint}>打开时间线 →</div>
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>强基与综评</h2>
          </div>
          <p>
            把你提供的强基批、综评批图片整理成专题页，拆开显示规则、模式、学校案例、分数线和面试建议。
          </p>
        </div>
        <Link className={styles.selectionCard} href="/selection">
          <div className={styles.selectionCardTopline}>
            <span className={styles.selectionBadge}>新补专题</span>
            <strong>强基与综评板块</strong>
          </div>
          <p>
            现在已经包含强基三种模式、复旦 / 武大 / 东南案例、上海 11 所综评高校、交大综评流程与 2025 入围线。
          </p>
          <div className={styles.selectionPreview}>
            <span>强基模式</span>
            <span>学校案例</span>
            <span>综评流程</span>
            <span>入围线</span>
          </div>
          <div className={styles.selectionHint}>打开专题 →</div>
        </Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>专题入口</h2>
          </div>
          <p>
            首页不是“39 所平铺”。先按专题切进去，会更接近家长和学生实际做筛选时的思路。
          </p>
        </div>
        <div className={styles.topicGrid}>
          {topicDefinitions.map((topic) => (
            <Link className={styles.topicCard} href={`/topics/${topic.slug}`} key={topic.slug}>
              <span>{topic.shortTitle}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className={styles.topicHint}>进入专题 →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>学校筛选器</h2>
          </div>
          <p>
            先按区域、学校类型、专题标签、专业方向和班型口径缩小池子。这一步更适合作为“学校层志愿池”而不是最终投档建议。
          </p>
        </div>
        <SchoolExplorer
          regions={getRegions()}
          schoolTypes={getSchoolTypes()}
          schools={schools}
          topics={topicDefinitions}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>这轮数据怎么用</h2>
          </div>
          <p>
            这一版强调“可浏览、可继续补数、可扩展成志愿系统”，不是把学校信息堆成百科页面。
          </p>
        </div>
        <div className={styles.methodGrid}>
          <div className={styles.methodCard}>
            <strong>1. 先做学校池</strong>
            <p>先用学校标签、区域和专业档案，把备选学校压到 8 到 12 所，再进入专业和省份录取规则层。</p>
          </div>
          <div className={styles.methodCard}>
            <strong>2. 只信公开来源</strong>
            <p>就业率、深造率和本科专业数这类字段，只在挂上公开报告来源时才显示，避免凭印象做排序。</p>
          </div>
          <div className={styles.methodCard}>
            <strong>3. 为下一轮留接口</strong>
            <p>后续可以继续接入省份位次、专业组选科要求和历年录取线，直接升级为真正的志愿推荐工具。</p>
          </div>
        </div>
        <div className={styles.linkRow}>
          <Link className={styles.footerLink} href="/admissions/shanghai">
            查看上海 2021-2025 官方投档线 →
          </Link>
          <Link className={styles.footerLink} href="/sources">
            查看数据口径与当前覆盖情况 →
          </Link>
        </div>
      </section>
    </main>
  );
}
