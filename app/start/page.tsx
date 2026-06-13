import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "从这里开始 · 陪孩子定方向四步走",
  description:
    "给完全没方向、很焦虑的上海高三家长的总纲：不用一上来就查分背政策，按分清三条路、缩专业方向、定现实区间、缩学校池排节奏四步走，把无限的选择一步步缩小。",
};

type Step = {
  no: number;
  title: string;
  reassure: string;
  checklist: string[];
  links: { href: string; label: string; accent?: boolean }[];
};

const steps: Step[] = [
  {
    no: 1,
    title: "分清三条路、定一条主线",
    reassure:
      "这一步你只需要弄清楚：除了普通高考裸分，还有强基计划和综合评价两条路，先判断孩子大概走哪条，别一上来什么都想抓。",
    checklist: [
      "和孩子一起搞清楚“裸分填报、强基、综评”分别是什么、各适合谁。",
      "对照孩子的成绩段和学科特点，圈出最可能走得通的那一条作为主线。",
      "把另外两条当作备选记下来，先不展开，避免精力分散。",
    ],
    links: [{ href: "/selection", label: "看强基与综评怎么选 →" }],
  },
  {
    no: 2,
    title: "用兴趣和特长缩专业方向",
    reassure:
      "这一步你只需要把“孩子大概喜欢、擅长什么”收敛成几个专业大方向，不用现在就定到具体哪个专业。",
    checklist: [
      "陪孩子做一次方向自测，把模糊的兴趣转成几个可讨论的方向。",
      "对每个方向看一眼大致薪资量级和就业红绿牌，建立现实预期。",
      "和孩子聊“为什么排除某些方向”，比硬选一个更省心。",
    ],
    links: [
      { href: "/directions#quiz", label: "做方向自测 →", accent: true },
      { href: "/salary", label: "看不同方向薪资与红绿牌 →" },
      { href: "/careers", label: "按未来去向找方向 →" },
    ],
  },
  {
    no: 3,
    title: "用分数和选科定现实区间",
    reassure:
      "这一步你只需要把孩子的分数段和选科组合放进去，看看现实里大致够得着哪一档，把幻想和焦虑都拉回到数据上。",
    checklist: [
      "准备好孩子最近一次的成绩位次和小三门选科组合。",
      "按分数和选科查一遍，看够得着哪一档的学校和专业组。",
      "把“稳一稳、冲一冲、保一保”三档心里先有个数。",
    ],
    links: [{ href: "/admissions/shanghai#explorer", label: "按分数和选科看够得着哪些 →", accent: true }],
  },
  {
    no: 4,
    title: "缩学校池、排时间节奏",
    reassure:
      "这一步你只需要把前几步圈出的方向和区间，落到一份不太长的学校名单，再按当前日期看这周该做什么。",
    checklist: [
      "在学校库里按方向和区间筛出一份候选名单，先求“少而准”。",
      "对照招生节奏，确认最近有没有报名、确认、测试等关键节点。",
      "按当前日期看这周该做的具体事项，把大目标拆成本周能落地的几件事。",
    ],
    links: [
      { href: "/schools", label: "去学校库筛候选 →" },
      { href: "/timeline", label: "看这周该做啥 →" },
    ],
  },
];

export default function StartPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>从这里开始 · 陪孩子定方向四步走</span>
        <h1>先别慌，一步步把选择缩小</h1>
        <p className={styles.lead}>
          先别慌。不用一上来就查分、就背政策。志愿这件事看起来无边无际，
          其实可以按四步走，把“全国上千所学校、几百个专业”一步步缩小成
          “孩子大概走哪条路、适合哪几个方向、现实够得着哪一档、最后盯哪几所”。
        </p>
        <p className={styles.reassure}>
          这一页是给“暂时完全没方向”的家长的总纲。不用一次做完，每一步只做这一步该做的事，
          做完顺手点进对应的工具页，下一步自然就清楚了。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>陪孩子定方向 · 四步走</h2>
          </div>
          <p>每一步都告诉你“这一步只需要做什么”，下面的清单可以照着勾，做完再走下一步。</p>
        </div>

        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <article className={styles.stepCard} key={step.no}>
              <div className={styles.stepTop}>
                <span className={styles.stepNo}>{step.no}</span>
                <div className={styles.stepTitleWrap}>
                  <h3>{step.title}</h3>
                  <p className={styles.stepReassure}>{step.reassure}</p>
                </div>
              </div>

              <ul className={styles.checklist}>
                {step.checklist.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.stepLinks}>
                {step.links.map((link) => (
                  <Link
                    className={`${styles.stepLink} ${link.accent ? styles.stepLinkAccent : ""}`}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          四步不一定要严格按顺序，但建议先有主线和方向，再去对分数和学校——
          否则很容易一上来就被一堆分数线和名单淹没。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>已经大概有方向了？</h2>
          </div>
          <p>如果孩子方向和区间心里已经有数，不必走完整套流程，直接进工具页就好。</p>
        </div>
        <div className={styles.shortcutCard}>
          <p>下面两个入口最常用：一个按分数和选科看够得着哪些，一个直接进学校库筛候选名单。</p>
          <div className={styles.shortcutLinks}>
            <Link href="/admissions/shanghai#explorer">按分数和选科查一查 →</Link>
            <Link href="/schools">直接进学校库筛候选 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
