import type { Metadata } from "next";
import Link from "next/link";
import {
  selectionGuide,
  type BulletPanel,
  type GuideTimelineCase,
  type SchoolMode,
  type SelectionTone,
} from "@/data/selection-guides";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "强基与综评 | 985 高校志愿参考库",
  description: "把强基批和上海综评批的规则、模式、学校案例、入围线和面试建议拆成结构化板块。",
};

function getToneClassName(tone: SelectionTone) {
  switch (tone) {
    case "warm":
      return styles.toneWarm;
    case "cool":
      return styles.toneCool;
    case "alert":
      return styles.toneAlert;
    default:
      return styles.toneSoft;
  }
}

function BulletCard({ panel }: { panel: BulletPanel }) {
  return (
    <article className={`${styles.panelCard} ${getToneClassName(panel.tone)}`}>
      <strong>{panel.title}</strong>
      {panel.subtitle ? <span className={styles.panelSubtitle}>{panel.subtitle}</span> : null}
      <ul className={styles.bulletList}>
        {panel.bullets.map((item) => (
          <li key={`${panel.title}-${item}`}>{item}</li>
        ))}
      </ul>
      {panel.note ? <p className={styles.panelNote}>{panel.note}</p> : null}
    </article>
  );
}

function ModeCard({ mode }: { mode: SchoolMode }) {
  return (
    <article className={`${styles.modeCard} ${getToneClassName(mode.tone)}`}>
      <div className={styles.modeHeader}>
        <div>
          <strong>{mode.title}</strong>
          <span>{mode.timing}</span>
        </div>
        <span className={styles.modeBadge}>{mode.schools.length} 所</span>
      </div>
      <p className={styles.modeSummary}>{mode.strategy}</p>
      <div className={styles.schoolChipRow}>
        {mode.schools.map((school) => (
          <span className={styles.schoolChip} key={`${mode.title}-${school}`}>
            {school}
          </span>
        ))}
      </div>
      <ul className={styles.bulletList}>
        {mode.features.map((item) => (
          <li key={`${mode.title}-${item}`}>{item}</li>
        ))}
      </ul>
      <p className={styles.modeOpportunity}>{mode.opportunity}</p>
    </article>
  );
}

function TimelineCase({ item }: { item: GuideTimelineCase }) {
  return (
    <article className={styles.caseCard}>
      <div className={styles.caseHeader}>
        <div>
          <span className={styles.caseEyebrow}>
            {item.school} · {item.year}
          </span>
          <h3>{item.school}</h3>
          <p>{item.subtitle}</p>
        </div>
        <span className={`${styles.caseTone} ${getToneClassName(item.tone)}`}>{item.year}</span>
      </div>

      <div className={styles.caseTimelineShell}>
        <div className={styles.caseTimelineLine} />
        <div className={styles.caseTimelineGrid}>
          {item.steps.map((step) => (
            <article className={styles.caseStep} key={`${item.school}-${step.date}-${step.title}`}>
              <span className={styles.caseDate}>{step.date}</span>
              <strong>{step.title}</strong>
              {step.note ? <p>{step.note}</p> : null}
            </article>
          ))}
        </div>
      </div>

      <div className={styles.caseInfoGrid}>
        {item.infoPanels.map((panel) => (
          <article className={styles.caseInfoCard} key={`${item.school}-${panel.title}`}>
            <strong>{panel.title}</strong>
            <ul className={styles.bulletList}>
              {panel.items.map((info) => (
                <li key={`${item.school}-${panel.title}-${info}`}>{info}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {item.formula ? <div className={styles.formulaCard}>{item.formula}</div> : null}

      <div className={styles.noteCard}>
        <strong>图片备注</strong>
        <ul className={styles.bulletList}>
          {item.notes.map((note) => (
            <li key={`${item.school}-${note}`}>{note}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function SelectionPage() {
  const { hero, decisionPanels, actionPanels, qiangji, zongping } = selectionGuide;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.kicker}>强基与综评专题</span>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
        <div className={styles.heroPillRow}>
          {hero.pills.map((pill) => (
            <span className={styles.heroPill} key={pill}>
              {pill}
            </span>
          ))}
        </div>
        <p className={styles.heroNote}>{hero.note}</p>

        <div className={styles.statGrid}>
          {hero.stats.map((item) => (
            <article className={styles.statCard} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        <div className={styles.anchorGrid}>
          {hero.anchors.map((item) => (
            <a className={styles.anchorCard} href={item.href} key={item.href}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>决策整理</span>
            <h2>先判断该主攻强基，还是主攻综评</h2>
            <p>
              这部分不是重复图片信息，而是把前面那些规则、流程和案例压成一个更容易执行的判断框架。
            </p>
          </div>
        </div>

        <div className={styles.panelGridThree}>
          {decisionPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.panelGridThree}>
          {actionPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="qiangji">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>强基板块</span>
            <h2>先看总览，再看规则和模式</h2>
            <p>
              这组图片先补齐了 `28 所学校总览 / 报名时间 / 只能报 1 所 / 提前测试 12 所` 这层底图；
              再往下才是 `出分前校测 / 出分后只面试 / 出分后笔试 + 面试` 三种模式，以及入围算法究竟是不是裸高考分。
            </p>
          </div>
        </div>

        <div className={styles.disclaimerCard}>{qiangji.disclaimer}</div>

        <div className={styles.panelGridThree}>
          {qiangji.overviewPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.panelGridTwo}>
          {qiangji.comparePanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.panelGridTwo}>
          {qiangji.fitPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.modeGrid}>
          {qiangji.modes.map((mode) => (
            <ModeCard key={mode.title} mode={mode} />
          ))}
        </div>

        <div className={styles.panelGridTwo}>
          {qiangji.algorithmPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="qiangji-cases">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>强基案例</span>
            <h2>复旦、武大、东南三张 2025 图，拆成可读时间线</h2>
            <p>这三所学校正好覆盖了出分前笔试、出分后按高考分入围、双确认流程等不同口径。</p>
          </div>
        </div>

        <div className={styles.caseList}>
          {qiangji.schoolCases.map((item) => (
            <TimelineCase item={item} key={item.school} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>强基延伸</span>
            <h2>工科方向、锁档、出路和备考</h2>
            <p>这部分更偏“怎么看”和“怎么准备”，属于图片里的经验判断和案例解释层。</p>
          </div>
        </div>

        <div className={styles.exampleGrid}>
          {qiangji.engineeringSchools.map((group) => (
            <article className={styles.exampleCard} key={group.school}>
              <strong>{group.school}</strong>
              <ul className={styles.bulletList}>
                {group.examples.map((item) => (
                  <li key={`${group.school}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.panelGridThree}>
          {qiangji.interpretationPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.panelGridTwo}>
          {qiangji.examAdvice.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="zongping">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>综评板块</span>
            <h2>上海综评更像“多一次录取机会 + 面试加权系统”</h2>
            <p>
              你给的综评图片核心就三件事：`哪些学校在上海做综评`、`交大这类学校怎么走流程`、`为什么面试和志愿顺序不能随便填`。
            </p>
          </div>
        </div>

        <div className={styles.disclaimerCard}>{zongping.disclaimer}</div>

        <div className={styles.panelGridTwo}>
          {zongping.overviewPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.panelGridOne}>
          {zongping.interviewImportance.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>交大综评案例</span>
            <h2>把交大综评流程和专业组拆开看</h2>
            <p>
              交大这组图片信息最全，既有流程，也有规则、入围线、面试、不同专业组的专业分布，所以直接做成案例页骨架。
            </p>
          </div>
        </div>

        <TimelineCase item={zongping.shanghaiSchoolCase} />

        <div className={styles.exampleGrid}>
          {zongping.programGroups.map((group) => (
            <article className={styles.exampleCard} key={group.school}>
              <strong>{group.school}</strong>
              <ul className={styles.bulletList}>
                {group.examples.map((item) => (
                  <li key={`${group.school}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.panelGridOne}>
          {zongping.interviewAdvice.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="zongping-lines">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>2025 分数线</span>
            <h2>上海综评批入围线</h2>
            <p>这张表直接按你图片里的 2025 分数线重排，方便横向看哪一组最高、哪一组更低。</p>
          </div>
        </div>

        <div className={styles.tableShell}>
          <table className={styles.cutoffTable}>
            <thead>
              <tr>
                <th>学校</th>
                {zongping.cutoffTable.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zongping.cutoffTable.rows.map((row) => (
                <tr key={row.school}>
                  <th>{row.school}</th>
                  {zongping.cutoffTable.columns.map((column) => (
                    <td key={`${row.school}-${column}`}>{row.values[column as keyof typeof row.values] ?? "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.noteCard}>
          <strong>图片备注</strong>
          <ul className={styles.bulletList}>
            {zongping.cutoffTable.notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
