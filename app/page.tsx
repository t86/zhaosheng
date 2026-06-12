import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedHotDirections } from "@/lib/hot-directions";
import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
import { getShanghaiAdmissionsCoverage } from "@/lib/shanghai-admissions";
import { getCoverageStats } from "@/lib/schools";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "上海高三家长版 · 985 高考志愿判断台",
  description:
    "面向上海高三家长与学生：先分清普通批、综合评价、强基三条路，再用近 5 年官方院校专业组线、学校库和高三下时间线判断怎么报 985。数据来源于上海市教育考试院公开口径。",
};

const routeCards = [
  {
    kicker: "普通批 · 主战场",
    title: "裸分填志愿，先看组线",
    description:
      "对多数 985 目标家庭，普通批仍是主线。报的不是“校名”，而是“院校专业组”，同一所学校会拆成多个组、分数差别很大。",
    bullets: [
      "按 2021-2025 官方组线做冲、稳、保，而不是只看学校平均分。",
      "每个院校专业组志愿内设 4 个专业，必须确认是否服从组内调剂。",
    ],
    href: "/admissions/shanghai#explorer",
    actionLabel: "打开上海组线筛选器 →",
    tone: "ink",
  },
  {
    kicker: "综合评价 · 高分+面试",
    title: "高考分加校测面试一起算",
    description:
      "目标集中在交复同济等学校时，综评是一条要尽早准备的核心路径，看的是“分数 + 面试”的综合竞争，而不是低分保底通道。",
    bullets: [
      "要提前准备材料、面试和志愿排序，出分前后反复核对规则与入围线。",
      "综合评价批次设 4 个平行志愿，需在合格名单内并达到对应控制线。",
    ],
    href: "/selection#zongping",
    actionLabel: "看综合评价判断 →",
    tone: "teal",
  },
  {
    kicker: "强基计划 · 单校攻坚",
    title: "单校攻坚，入围先看分",
    description:
      "目标顶尖 985 的高分家庭，强基更适合单校攻坚：先看自己分数够不够入围一所目标校，再决定值不值得提前押注。",
    bullets: [
      "入围通常按高考分排序，校测时间常和综评、普通批节奏撞车。",
      "更适合把它当成单校选择题来判断，而不是孤立的一份资料。",
    ],
    href: "/selection#qiangji",
    actionLabel: "看强基单校判断 →",
    tone: "amber",
  },
];

const entryCards = [
  {
    kicker: "高三下节奏",
    title: "3-7 月关键时间线",
    description:
      "把春考、外语一考、小三门等级考，和强基、综评、志愿填报、录取放进同一条线里排优先级，避免节点撞车。",
    stats: ["春考 / 外语一考", "小三门等级考", "3-7 月总览"],
    href: "/timeline",
    actionLabel: "打开时间线 →",
    tone: "blue",
  },
  {
    kicker: "目标校筛选",
    title: "985 学校库",
    description:
      "按区域、学校类型和专业方向收窄目标池，再下钻到具体学校的标签、优势方向和风险点。",
    stats: ["按区域筛", "按类型筛", "按方向筛"],
    href: "/schools",
    actionLabel: "打开学校库 →",
    tone: "plum",
  },
  {
    kicker: "方向参考",
    title: "未来热门方向猜想",
    description:
      "把政策点名、产业热度和家长讨论压成一个起步入口，建立方向感后，仍要回到学校和专业组核对。",
    stats: ["Top 10", "争议方向", "进入路径"],
    href: "/directions",
    actionLabel: "看热门方向 →",
    tone: "slate",
  },
];

export default function Home() {
  const coverage = getCoverageStats();
  const shanghaiCoverage = getShanghaiAdmissionsCoverage();
  const featuredDirections = getFeaturedHotDirections();
  const yearStart = shanghaiCoverage.years[0];
  const yearEnd = shanghaiCoverage.years.at(-1);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>上海高三家长版 · 985 志愿判断台</span>
            <h1>先分清三条路，再决定 985 怎么报。</h1>
            <p className={styles.heroLead}>
              上海考 985 主要有普通批、综合评价、强基三条路。先判断哪条是主线，再用近 5
              年官方院校专业组线、学校库和高三下时间线，把学校和专业组的选择压缩到能决策的范围。
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/admissions/shanghai#explorer">
                先看上海近 5 年组线 →
              </Link>
              <Link className={styles.secondaryAction} href="/timeline">
                看高三下时间线 →
              </Link>
            </div>

            <div className={styles.heroPills}>
              <span>{coverage.schoolCount} 所 985 主池</span>
              <span>
                {yearStart}-{yearEnd} 官方组线
              </span>
              <span>{shanghaiCoverage.totalRecords} 条上海公开记录</span>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelTopline}>
              <span className={styles.panelBadge}>进站先记</span>
              <strong>上海家长最常用的 3 个数字</strong>
            </div>

            <div className={styles.ruleGrid}>
              {shanghaiDecisionGuide.quickRules.map((item) => (
                <div className={styles.ruleCard} key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>

            <p className={styles.panelNote}>{shanghaiDecisionGuide.status.summary}</p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>三条路，30 秒看懂</h2>
          </div>
          <p>
            普通批、综评、强基不是三个平行专题，而是三条不同的决策路径。先认准自己的主线，再决定后面看哪些页。
          </p>
        </div>

        <div className={styles.routeGrid}>
          {routeCards.map((card) => (
            <article className={styles.routeCard} data-tone={card.tone} key={card.title}>
              <span className={styles.routeKicker}>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p className={styles.routeLead}>{card.description}</p>
              <ul className={styles.routeList}>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link className={styles.routeLink} href={card.href}>
                {card.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>判断完路径，再用这三个工具</h2>
          </div>
          <p>
            认准主线之后，再用时间线排节奏、用学校库收窄目标池、用热门方向建立方向感。
          </p>
        </div>

        <div className={styles.featureGrid}>
          {entryCards.map((card) => (
            <Link
              className={styles.featureCard}
              data-tone={card.tone}
              href={card.href}
              key={card.title}
            >
              <span className={styles.featureKicker}>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className={styles.featureStats}>
                {card.stats.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={styles.featureLink}>{card.actionLabel}</div>
            </Link>
          ))}
        </div>

        <div className={styles.directionPreviewGrid}>
          {featuredDirections.map((direction) => (
            <article className={styles.directionPreviewCard} key={direction.slug}>
              <div className={styles.directionPreviewTopline}>
                <span>#{direction.rank}</span>
                <h3>{direction.name}</h3>
              </div>
              <p>{direction.oneLiner}</p>
              <div className={styles.directionPreviewPills}>
                {direction.entryPaths.slice(0, 3).map((item) => (
                  <span key={`${direction.slug}-${item}`}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.disabledCard}>
            <span className={styles.featureKicker}>整理中</span>
            <h3>专业级录取数据</h3>
            <p>
              专业层的逐年录取数据仍在整理，暂未开放。开放前，请先用上海院校专业组线和学校库做判断。
            </p>
            <div className={styles.featureLink}>整理中，暂不可点入</div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>数据来源与最近更新</h2>
          </div>
          <p>
            本站只重组、清理公开数据，不自造分数线。所有上海规则按上海市教育考试院公开口径整理。
          </p>
        </div>

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

        <div className={styles.linkRow}>
          <Link className={styles.footerLink} href="/admissions/shanghai#explorer">
            查看上海 {yearStart}-{yearEnd} 官方投档线 →
          </Link>
          <Link className={styles.footerLink} href="/sources">
            查看数据来源与当前覆盖情况 →
          </Link>
        </div>
      </section>
    </main>
  );
}
