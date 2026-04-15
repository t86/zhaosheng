import type { Metadata } from "next";
import Link from "next/link";
import {
  selectionGuide,
  type BulletPanel,
  type HeadlineSchoolNote,
  type HeadlineSchoolCard,
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

function StatusCard({ panel }: { panel: BulletPanel }) {
  return (
    <article className={`${styles.statusCard} ${getToneClassName(panel.tone)}`}>
      <strong>{panel.title}</strong>
      {panel.subtitle ? <span className={styles.statusSubtitle}>{panel.subtitle}</span> : null}
      <ul className={styles.bulletList}>
        {panel.bullets.map((item) => (
          <li key={`${panel.title}-${item}`}>{item}</li>
        ))}
      </ul>
      {panel.note ? <p className={styles.panelNote}>{panel.note}</p> : null}
    </article>
  );
}

function HeadlineSchoolMatrixCard({ card }: { card: HeadlineSchoolCard }) {
  return (
    <article className={styles.headlineCard}>
      <div className={styles.headlineCardHeader}>
        <div>
          <span className={styles.headlineBadge}>
            {card.coverageLevel === "official-2026"
              ? "2026 官方简章"
              : card.coverageLevel === "official-2025"
                ? "2025 官方完整口径"
                : "2025 稳定口径"}
          </span>
          <h3>{card.school}</h3>
          <p className={styles.headlineStatus}>{card.status}</p>
        </div>
        <span className={styles.headlineUpdate}>
          {card.updateStatus === "official-2026" ? "2026 已发布" : "2026 待更新"}
        </span>
      </div>

      <dl className={styles.headlineMetaList}>
        <div className={styles.headlineMetaItem}>
          <dt>专业范围</dt>
          <dd>{card.majorRange}</dd>
        </div>
        <div className={styles.headlineMetaItem}>
          <dt>入围口径</dt>
          <dd>{card.qualificationRule}</dd>
        </div>
        <div className={styles.headlineMetaItem}>
          <dt>校测结构</dt>
          <dd>{card.assessment}</dd>
        </div>
        <div className={styles.headlineMetaItem}>
          <dt>破格/例外</dt>
          <dd>{card.exceptionRule}</dd>
        </div>
        <div className={styles.headlineMetaItem}>
          <dt>更适合</dt>
          <dd>{card.bestFor}</dd>
        </div>
        <div className={styles.headlineMetaItem}>
          <dt>准备重点</dt>
          <dd>{card.prepFocus}</dd>
        </div>
      </dl>

      <div className={styles.headlineTakeaway}>{card.takeaway}</div>
    </article>
  );
}

function HeadlineSchoolNoteCard({ note }: { note: HeadlineSchoolNote }) {
  return (
    <article className={styles.headlineNoteCard}>
      <strong>{note.school}</strong>
      <ul className={styles.bulletList}>
        {note.notes.map((item) => (
          <li key={`${note.school}-${item}`}>{item}</li>
        ))}
      </ul>
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
            <h2>先判断孩子适不适合强基，再看学校和准备</h2>
            <p>
              这部分先回答上海高分家庭最常见的三个问题：`孩子适不适合强基`、`清北华五分别更适合什么样的孩子`、
              `如果决定冲强基，前面几个月到底该准备什么`。学校规则和案例仍然保留，但顺序改成先判断、再择校、最后执行。
            </p>
          </div>
        </div>

        <div className={styles.disclaimerCard}>{qiangji.disclaimer}</div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>状态区</span>
            <h3>截至 2026-04-15：哪些学校已出 2026 简章</h3>
            <p>先按最新已发布的官方简章读规则；还没出新简章的学校，继续沿用 2025 稳定口径判断。</p>
          </div>
        </div>

        <div className={styles.statusGrid}>
          {qiangji.statusPanels.map((panel) => (
            <StatusCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>先做判断</span>
            <h3>什么样的孩子更适合强基</h3>
            <p>先看匹配度，再看学校名。对上海高分家庭来说，这一步比比较案例更重要。</p>
          </div>
        </div>

        <div className={styles.panelGridThree}>
          {qiangji.audiencePanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>头部学校矩阵</span>
            <h3>清北华五强基速览</h3>
            <p>这里把学校规则、适合什么样的孩子和准备重点放在同一屏，方便先做单校判断，再看案例。</p>
          </div>
        </div>

        <div className={styles.headlineMatrix}>
          {qiangji.headlineSchoolCards.map((card) => (
            <HeadlineSchoolMatrixCard key={card.school} card={card} />
          ))}
        </div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>准备清单</span>
            <h3>如果决定冲强基，需要先准备什么</h3>
            <p>把学校、校测、材料、体测和时间线拆开准备，能减少高考后一周的临场混乱。</p>
          </div>
        </div>

        <div className={styles.panelGridTwo}>
          {qiangji.preparationPanels.map((panel) => (
            <BulletCard key={panel.title} panel={panel} />
          ))}
        </div>

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
            <h2>复旦、清华、上交三所 2025 重点案例，拆成可读时间线</h2>
            <p>这三所学校正好覆盖出分前笔试、分省入围、系统确认和综合成绩公式等关键差异。</p>
          </div>
        </div>

        <div className={styles.caseList}>
          {qiangji.focusSchoolCases.map((item) => (
            <TimelineCase item={item} key={item.school} />
          ))}
        </div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>补充说明</span>
            <h3>北大、浙大、南大、中科大先看摘要</h3>
            <p>这四所学校不展开整条时间线，先保留对家长更有用的规则摘要，后续再按需补完整案例。</p>
          </div>
        </div>

        <div className={styles.headlineNoteGrid}>
          {qiangji.headlineSchoolNotes.map((note) => (
            <HeadlineSchoolNoteCard key={note.school} note={note} />
          ))}
        </div>

        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionKicker}>港校提醒</span>
            <h3>港大上海平台只作补充提醒</h3>
            <p>这里仅保留港大在沪教研与教学协同的公开口径，不把它写成强基主线内容。</p>
          </div>
        </div>

        <div className={styles.panelGridOne}>
          <BulletCard panel={qiangji.hongKongReminder} />
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
