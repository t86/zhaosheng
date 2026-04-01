import Link from "next/link";
import { SchoolExplorer } from "@/components/SchoolExplorer";
import { getFeaturedHotDirections, getHotDirectionCategories } from "@/lib/hot-directions";
import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
import { topicDefinitions } from "@/data/topics";
import { getShanghaiAdmissionsCoverage } from "@/lib/shanghai-admissions";
import {
  getCoverageStats,
  getRegions,
  getSchoolTypes,
  schools,
} from "@/lib/schools";
import styles from "./page.module.css";

const heroQuestions = [
  {
    title: "先定路径",
    description: "普通批、综评、强基该押哪条线，决定了后面看的页面顺序。",
  },
  {
    title: "先看组线",
    description: "上海同一所 985 会拆成多个院校专业组，不能只看校名。",
  },
  {
    title: "先排风险",
    description: "物化卡口、校区、学费、合作办学和调剂风险，比“学校总数”更关键。",
  },
];

const priorityPanels = [
  {
    title: "分数段与位次感",
    description: "家长先想知道孩子大概摸到哪一档 985，而不是先看百科式学校介绍。",
  },
  {
    title: "选科能报哪些组",
    description: "上海是院校专业组逻辑，物理、化学要求会直接决定能不能进池。",
  },
  {
    title: "同校不同组差多少",
    description: "同一所学校的不同组线和方向差异很大，必须横向比较而不是只看校名。",
  },
  {
    title: "专业去向值不值",
    description: "保研、深造、就业城市、实验班和转专业空间，才是最后愿不愿去的关键。",
  },
  {
    title: "隐性风险点",
    description: "校区、合作办学、语种、体检、单科要求和服从调剂，都是常见失误区。",
  },
  {
    title: "节点别撞车",
    description: "强基、综评、港校和普通批在 6-7 月会并行，真正难的是确认顺序。",
  },
];

const routeCards = [
  {
    kicker: "普通批主线",
    title: "先把上海近 5 年组线看透",
    description:
      "对 985 目标家庭来说，普通批仍然是主战场。首页应该先把“校名”翻译成“院校专业组”。",
    bullets: [
      "先看 2021-2025 官方组线，再看学校层标签。",
      "按院校专业组理解风险，比看单个学校平均分更贴近真实填报。",
      "适合先按冲、稳、保做组线池，再下钻到具体学校页。",
    ],
    href: "/admissions/shanghai",
    actionLabel: "查看上海组线 →",
    tone: "ink",
  },
  {
    kicker: "综评路径",
    title: "上海家长绕不开综评判断",
    description:
      "如果目标集中在交复同济等学校，综评不是附属内容，而是要尽早准备的核心路径。",
    bullets: [
      "先看自己是不是该把时间花在材料、面试和排序上。",
      "综评更像“分数 + 面试”的竞争，不是低分保底通道。",
      "适合在出分前后反复回看规则、入围线和学校案例。",
    ],
    href: "/selection",
    actionLabel: "查看强基与综评 →",
    tone: "teal",
  },
  {
    kicker: "强基路径",
    title: "强基是单校重仓，不是广撒网",
    description:
      "目标清北华五和顶尖 985 的家庭，会非常在意强基校测节奏和确认顺序。",
    bullets: [
      "强基更适合单校攻坚，先判断值不值得提前押注。",
      "校测时间和综评、港校、普通批常常撞在一起。",
      "首页要把它放进路径判断，而不是孤立成单独资料页。",
    ],
    href: "/selection",
    actionLabel: "先看强基模式 →",
    tone: "amber",
  },
];

const featureCards = [
  {
    kicker: "上海官方数据",
    title: "院校专业组数据库",
    description: "先用官方公开的组线判断学校池，再决定是否进入学校详情和专业层。",
    stats: ["2021-2025 年", "普通批 + Q 组", "只用官方来源"],
    href: "/admissions/shanghai",
    actionLabel: "打开上海组线页 →",
    tone: "blue",
  },
  {
    kicker: "家长高频页面",
    title: "强基与综评判断台",
    description: "把流程、模式、入围线、学校案例和面试准备拆开，避免全堆成一页。",
    stats: ["强基模式", "学校案例", "综评入围线"],
    href: "/selection",
    actionLabel: "打开专题页 →",
    tone: "plum",
  },
  {
    kicker: "高三下节奏",
    title: "3-7 月关键时间线",
    description: "把强基、综评、志愿填报和录取时间放到同一条线里，方便家长排优先级。",
    stats: ["高三下总览", "上海 6-7 月", "2025 录取流程"],
    href: "/timeline",
    actionLabel: "打开时间线 →",
    tone: "slate",
  },
];

export default function Home() {
  const coverage = getCoverageStats();
  const shanghaiCoverage = getShanghaiAdmissionsCoverage();
  const featuredDirections = getFeaturedHotDirections();
  const hotDirectionCategories = getHotDirectionCategories();
  const yearStart = shanghaiCoverage.years[0];
  const yearEnd = shanghaiCoverage.years.at(-1);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>上海高三家长版 · 985 志愿判断台</span>
            <h1>先判断哪条路能进 985，再决定学校和专业组怎么报。</h1>
            <p className={styles.heroLead}>
              这一版首页不再先讲学校总数，而是先回答家长真正关心的 4 件事：
              `走哪条路径`、`先看哪些组线`、`选科卡口在哪里`、`哪些风险必须提前排除`。
              学校池、专题页和时间线仍然都在，但顺序按真实决策流重排。
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/admissions/shanghai">
                先看上海近 5 年组线 →
              </Link>
              <Link className={styles.secondaryAction} href="/selection">
                看强基与综评 →
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
              <span className={styles.panelBadge}>进站先看</span>
              <strong>上海家长最常问的 3 件事</strong>
            </div>

            <div className={styles.questionList}>
              {heroQuestions.map((item) => (
                <article className={styles.questionCard} key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              ))}
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

            <p className={styles.panelNote}>
              {shanghaiDecisionGuide.status.summary}
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>上海官方规则先读</h2>
          </div>
          <p>
            这一组全部按上海市教育考试院公开口径整理，先把本科批次结构、投档单位和填报边界看清，再决定怎么用站内学校池。
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

          <div className={styles.officialRuleGrid}>
            {shanghaiDecisionGuide.verifiedRules.map((item) => (
              <article className={styles.officialRuleCard} key={`${item.label}-${item.value}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.sourceLinkRow}>
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
            <h2>填报前先核对这 4 件事</h2>
          </div>
          <p>
            这一组不是经验贴，而是把考试院在 2025 官方问答和特别提醒里反复强调的检查动作，拆成家长更容易执行的清单。
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
            <h2>首页应该先回答什么</h2>
          </div>
          <p>
            如果目标是 985 及以上，首页不该先平铺学校，而要先告诉家长什么信息最值得花时间看。
          </p>
        </div>

        <div className={styles.priorityGrid}>
          {priorityPanels.map((item) => (
            <article className={styles.priorityCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>先判断路径，再下钻学校</h2>
          </div>
          <p>
            对上海家庭来说，普通批、综评、强基不是三个平行专题，而是三条不同的决策路径。
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
            <h2>高价值入口前置</h2>
          </div>
          <p>
            首页先把家长会反复打开的内容放上来，后面再进入专题切片和学校池筛选。
          </p>
        </div>

        <div className={styles.featureGrid}>
          {featureCards.map((card) => (
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
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>未来 10 年热门方向猜想</h2>
          </div>
          <p>
            这不是官方结论，而是把政策点名、产业热度和家长讨论压缩成一个更适合开始讨论的入口。真正填志愿时，还是要回到学校、专业组和风险卡。
          </p>
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

        <div className={styles.directionCategoryRow}>
          {hotDirectionCategories.map((category) => (
            <Link className={styles.directionCategoryLink} href={`/directions#${category.slug}`} key={category.slug}>
              <strong>{category.name}</strong>
              <span>{category.description}</span>
            </Link>
          ))}
        </div>

        <div className={styles.directionFooter}>
          <Link className={styles.footerLink} href="/directions">
            查看完整 Top 10 与争议方向 →
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>按目标方向切学校池</h2>
          </div>
          <p>
            专题入口保留，但不再抢首屏。它更适合在你已经判断完路径之后，拿来缩小学校比较范围。
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
            <h2>学校池筛选器</h2>
          </div>
          <p>
            这一步不再承担首页主导叙事，而是作为第二层工具：按区域、学校类型、专题标签和专业方向快速收窄目标池。
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
            <h2>这站现在怎么用最省时间</h2>
          </div>
          <p>先做判断，再做筛选，最后再回看学校细节和数据口径。</p>
        </div>

        <div className={styles.methodGrid}>
          <div className={styles.methodCard}>
            <strong>1. 先看路径</strong>
            <p>先判断普通批、综评、强基哪个是主线，别把三条线的准备节奏混在一起。</p>
          </div>
          <div className={styles.methodCard}>
            <strong>2. 再看组线</strong>
            <p>先看上海官方院校专业组线，把学校池压缩到可决策的范围，再进学校详情页。</p>
          </div>
          <div className={styles.methodCard}>
            <strong>3. 最后补细节</strong>
            <p>最后再补专业档案、就业去向、校区和数据来源，不把精力浪费在无关学校上。</p>
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
