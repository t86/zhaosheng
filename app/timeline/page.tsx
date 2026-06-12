import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  seniorSpringTimeline,
  shanghaiEarlyExamFocus,
  shanghaiAdmissionFlow2025,
  shanghaiJuneJulyTimeline,
  shanghaiJulyAugustTimeline,
  type FamilyTrack,
  type PositionedTimelineItem,
  type SplitTimeline,
  type TimelineTone,
} from "@/data/senior-spring-timeline";
import TimelineNow from "@/components/TimelineNow";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "高三时间线 · 上海高考 6-7 月节奏与录取流程 | 985 高校志愿参考库",
  description: "按当前时间点定位现在该做什么：高考出分、志愿填报、强基校测、综评校测排在第一屏，已结束的春考、外语一考和小三门下沉到阶段回顾。",
};

const splitTimelines = [shanghaiJuneJulyTimeline, shanghaiJulyAugustTimeline];

const sectionNav = [
  {
    href: `#${shanghaiJuneJulyTimeline.id}`,
    label: "上海 6-7 月",
    title: "出分到综评前",
    description: "把高考出分、港校 offer、开放日和综评面试挤在一条线上看。",
  },
  {
    href: `#${shanghaiJulyAugustTimeline.id}`,
    label: "上海 7-8 月",
    title: "录取期跟踪",
    description: "强基、综评、提前批、普通批和入学准备的完整跟踪表。",
  },
  {
    href: `#${shanghaiAdmissionFlow2025.id}`,
    label: "2025 流程",
    title: "上海批次流程",
    description: "按批次看强基、综评、零志愿、提前批和普通批分别在哪一天。",
  },
  {
    href: "#overview",
    label: "总览",
    title: "高三下总览",
    description: "3 月到 7 月的强基、综评、港校与录取总节奏，以及强基准备不是 6 月才开始。",
  },
  {
    href: `#${shanghaiEarlyExamFocus.id}`,
    label: "已完成阶段",
    title: "春考与等级考回顾",
    description: "1 月外语一考、春考校测和 5 月小三门已结束，下沉到页尾备查。",
  },
];

function getToneClassName(tone: TimelineTone) {
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

function getBandHeight(items: PositionedTimelineItem[]) {
  const maxStack = items.reduce((currentMax, item) => Math.max(currentMax, item.stack), 0);
  return `${maxStack * 84 + 116}px`;
}

function TimelineItems({ items, compact = false }: { items: PositionedTimelineItem[]; compact?: boolean }) {
  return items.map((item) => (
    <article
      className={`${styles.milestoneCard} ${compact ? styles.compactCard : ""} ${getToneClassName(item.tone)}`}
      key={`${item.title}-${item.timeLabel}`}
      style={
        {
          left: `${item.position}%`,
          top: `${item.stack * 84}px`,
        } as CSSProperties
      }
    >
      <strong>{item.title}</strong>
      <span>{item.timeLabel}</span>
      {item.note ? <p>{item.note}</p> : null}
    </article>
  ));
}

function Axis({ markers }: { markers: SplitTimeline["axis"] | typeof seniorSpringTimeline.axis }) {
  return (
    <div className={styles.axisBand}>
      <div className={styles.axisLine} />
      <div className={styles.axisGlow} />
      {markers.map((marker) => (
        <div
          className={styles.axisMarker}
          key={`${marker.label}-${marker.position}`}
          style={{ left: `${marker.position}%` } as CSSProperties}
        >
          <span className={styles.markerDot} />
          <strong>{marker.label}</strong>
        </div>
      ))}
    </div>
  );
}

function SplitTimelineSection({ timeline }: { timeline: SplitTimeline }) {
  return (
    <section className={styles.section} id={timeline.id}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionKicker}>{timeline.kicker}</span>
          <h2>{timeline.title}</h2>
          <p>{timeline.summary}</p>
        </div>
        <div className={styles.sectionMeta}>
          <span className={styles.metaPill}>按公开节点整理</span>
          <span className={styles.metaPill}>来源：上海市教育考试院公开数据</span>
        </div>
      </div>

      <p className={styles.caption}>{timeline.caption}</p>

      <div className={styles.dualLaneMeta}>
        <article className={styles.laneMetaCard}>
          <span className={styles.laneBadge}>{timeline.topLabel}</span>
          <p>{timeline.topDescription}</p>
        </article>
        <article className={styles.laneMetaCard}>
          <span className={styles.laneBadge}>{timeline.bottomLabel}</span>
          <p>{timeline.bottomDescription}</p>
        </article>
      </div>

      <div className={styles.chartViewport}>
        <div className={styles.chartShell}>
          <div className={styles.topBand} style={{ minHeight: getBandHeight(timeline.topItems) } as CSSProperties}>
            <TimelineItems compact items={timeline.topItems} />
          </div>
          <Axis markers={timeline.axis} />
          <div
            className={styles.bottomBand}
            style={{ minHeight: getBandHeight(timeline.bottomItems) } as CSSProperties}
          >
            <TimelineItems compact items={timeline.bottomItems} />
          </div>
        </div>
      </div>

      <div className={styles.mobileStream}>
        <div className={styles.mobileGroup}>
          <h3>{timeline.topLabel}</h3>
          <div className={styles.mobileGrid}>
            {timeline.topItems.map((item) => (
              <article
                className={`${styles.mobileCard} ${getToneClassName(item.tone)}`}
                key={`mobile-top-${timeline.id}-${item.title}`}
              >
                <strong>{item.title}</strong>
                <span>{item.timeLabel}</span>
                {item.note ? <p>{item.note}</p> : null}
              </article>
            ))}
          </div>
        </div>
        <div className={styles.mobileGroup}>
          <h3>{timeline.bottomLabel}</h3>
          <div className={styles.mobileGrid}>
            {timeline.bottomItems.map((item) => (
              <article
                className={`${styles.mobileCard} ${getToneClassName(item.tone)}`}
                key={`mobile-bottom-${timeline.id}-${item.title}`}
              >
                <strong>{item.title}</strong>
                <span>{item.timeLabel}</span>
                {item.note ? <p>{item.note}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.insightGrid}>
        {timeline.insights.map((item) => (
          <article className={styles.takeawayCard} key={`${timeline.id}-${item.title}`}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.sourceCard}>
        <strong>整理提醒</strong>
        <ul className={styles.noteList}>
          {timeline.warnings.map((item) => (
            <li key={`${timeline.id}-${item}`}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function TimelinePage() {
  const topMilestones = seniorSpringTimeline.studentMilestones.filter((item) => item.band === "top");
  const bottomMilestones = seniorSpringTimeline.studentMilestones.filter(
    (item) => item.band === "bottom",
  );
  const familyTracks: FamilyTrack[] = seniorSpringTimeline.familyTracks;

  const springReview = (
    <section className={styles.section} id={shanghaiEarlyExamFocus.id}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionKicker}>{shanghaiEarlyExamFocus.kicker}</span>
          <h2>{shanghaiEarlyExamFocus.title}</h2>
          <p>{shanghaiEarlyExamFocus.summary}</p>
        </div>
        <div className={styles.sectionMeta}>
          <span className={styles.metaPill}>上海考试院官方口径</span>
          <span className={styles.metaPill}>2026 节点</span>
        </div>
      </div>

      <div className={styles.preludeGrid}>
        {shanghaiEarlyExamFocus.milestones.map((item) => (
          <article className={`${styles.preludeCard} ${getToneClassName(item.tone)}`} key={`${item.date}-${item.title}`}>
            <strong>{item.title}</strong>
            <span>{item.date}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className={styles.takeawayGrid}>
        {shanghaiEarlyExamFocus.strategyCards.map((item) => (
          <article className={styles.takeawayCard} key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionKicker}>高三家长执行清单</span>
          <h2>按出分、填报、校测和等级考倒排动作</h2>
          <p>这组清单把官方日期转成家长要盯的动作，重点是英语一考后的精力重排和小三门确认。</p>
        </div>
      </div>

      <div className={styles.takeawayGrid}>
        {shanghaiEarlyExamFocus.parentActionChecklist.map((item) => (
          <article className={styles.takeawayCard} key={`${item.period}-${item.title}`}>
            <strong>{item.period}｜{item.title}</strong>
            <ul className={styles.noteList}>
              {item.items.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionKicker}>春考决策卡</span>
          <h2>先判断春招值不值得继续走</h2>
          <p>出分后先看门槛、专业池、志愿数量和章程硬限制，再决定是否把春招推进到校测和确认阶段。</p>
        </div>
      </div>

      <div className={styles.takeawayGrid}>
        {shanghaiEarlyExamFocus.springDecisionCards.map((item) => (
          <article className={styles.takeawayCard} key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionKicker}>预录取/候补确认</span>
          <h2>3 月确认动作按资格状态处理</h2>
          <p>预录取、候补和双资格的网上确认规则不同，家长要先按孩子拿到的资格状态分流。</p>
        </div>
      </div>

      <div className={styles.takeawayGrid}>
        {shanghaiEarlyExamFocus.confirmationCards.map((item) => (
          <article className={styles.takeawayCard} key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.takeawayGrid}>
        {shanghaiEarlyExamFocus.gradeExamCards.map((item) => (
          <article className={styles.takeawayCard} key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.sourceCard}>
        <strong>春考和小三门注意事项</strong>
        <ul className={styles.noteList}>
          {shanghaiEarlyExamFocus.warnings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className={styles.noteList}>
          {shanghaiEarlyExamFocus.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="noreferrer" target="_blank">
                {source.label} →
              </a>
              <br />
              {source.note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.kicker}>高三时间线库</span>
        <h1>先看现在该做什么：6-7 月出分、志愿、强基与综评校测一屏盯清。</h1>
        <p>
          这页先按当前时间点定位“现在该做什么”，把 <strong>高考出分、志愿填报、强基校测、综评校测</strong>
          这些 6-7 月的动作放到第一屏；已经结束的<strong>春考 / 外语一考 / 小三门等级考</strong>下沉到页尾的“已完成阶段回顾”。
          四组时间表分别是<strong>总览节奏</strong>、<strong>上海 6-7 月细表</strong>、<strong>上海 7-8 月录取跟踪</strong>和
          <strong>2025 上海录取流程</strong>。对强基家庭尤其重要的是：强基准备不是 6 月才开始，很多从高二下到高三上的学校判断、校测积累和体测准备，都会直接影响后面的确认动作。
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroPill}>春考与外语一考</span>
          <span className={styles.heroPill}>小三门等级考</span>
          <span className={styles.heroPill}>3-7 月时间线</span>
        </div>
        <p className={styles.heroNote}>
          页面里会分别标清<strong>上海考试院官方节点</strong>和<strong>公开数据整理版</strong>，不把两种口径混成一套日历。详见
          <Link className={styles.headerLink} href="/sources">
            数据来源页
          </Link>
          。
        </p>

        <div className={styles.anchorGrid}>
          {sectionNav.map((item) => (
            <a className={styles.anchorCard} href={item.href} key={item.href}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      <TimelineNow />

      {splitTimelines.map((timeline) => (
        <SplitTimelineSection key={timeline.id} timeline={timeline} />
      ))}

      <section className={styles.section} id="overview">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>总览</span>
            <h2>高三下总时间轴</h2>
            <p>
              这是总览版，适合先看“今年春天到录取结束”整体怎么排。学生准备和家长准备拆开后，能更直观看到谁该在什么时候动起来。
            </p>
          </div>
          <div className={styles.sectionMeta}>
            <span className={styles.metaPill}>参考 2024 届考生的真实安排</span>
            <Link className={styles.headerLink} href="/sources">
              查看数据口径 →
            </Link>
          </div>
        </div>

        <p className={styles.caption}>{seniorSpringTimeline.caption}</p>

        <div className={styles.legendRow}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.toneSoft}`} />常规节点
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.toneWarm}`} />准备重点 / 报名期
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.toneCool}`} />面试 / 综评 / 校测
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.toneAlert}`} />高考 / 录取结果
          </span>
        </div>

        <div className={styles.studentLayout}>
          <div className={styles.sideLabel}>学生准备</div>
          <div className={styles.chartViewport}>
            <div className={styles.chartShell}>
              <div className={styles.topBand} style={{ minHeight: getBandHeight(topMilestones) } as CSSProperties}>
                <TimelineItems items={topMilestones} />
              </div>
              <Axis markers={seniorSpringTimeline.axis} />
              <div
                className={styles.bottomBand}
                style={{ minHeight: getBandHeight(bottomMilestones) } as CSSProperties}
              >
                <TimelineItems items={bottomMilestones} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobileStream}>
          <div className={styles.mobileGroup}>
            <h3>上半区：考试与面试</h3>
            <div className={styles.mobileGrid}>
              {topMilestones.map((item) => (
                <article
                  className={`${styles.mobileCard} ${getToneClassName(item.tone)}`}
                  key={`mobile-top-${item.title}`}
                >
                  <strong>{item.title}</strong>
                  <span>{item.timeLabel}</span>
                  {item.note ? <p>{item.note}</p> : null}
                </article>
              ))}
            </div>
          </div>

          <div className={styles.mobileGroup}>
            <h3>下半区：报名、志愿与录取</h3>
            <div className={styles.mobileGrid}>
              {bottomMilestones.map((item) => (
                <article
                  className={`${styles.mobileCard} ${getToneClassName(item.tone)}`}
                  key={`mobile-bottom-${item.title}`}
                >
                  <strong>{item.title}</strong>
                  <span>{item.timeLabel}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>家长准备泳道</span>
            <h2>把更早的校测和港校节奏单独拎出来</h2>
            <p>
              这条泳道不是“高考后再看学校”，而是提醒家长从 3 月开始就同步搜集信息、跑宣讲会、跟进港校和实验型大学的流程。
            </p>
          </div>
        </div>

        <div className={styles.familyLaneList}>
          {familyTracks.map((track) => (
            <article className={styles.familyLane} key={track.school}>
              <div className={styles.familyLabel}>
                <h3>{track.school}</h3>
                {track.subtitle ? <p>{track.subtitle}</p> : null}
              </div>
              <div className={styles.familyTrackViewport}>
                <div className={styles.familyTrackShell}>
                  <div className={styles.familyTrackLine} />
                  {track.events.map((event) => (
                    <article
                      className={`${styles.familyEvent} ${getToneClassName(event.tone)}`}
                      key={`${track.school}-${event.title}`}
                      style={{ left: `${event.position}%` } as CSSProperties}
                    >
                      <strong>{event.title}</strong>
                      <span>{event.timeLabel}</span>
                      {event.note ? <p>{event.note}</p> : null}
                    </article>
                  ))}
                </div>
              </div>
              <div className={styles.mobileGrid}>
                {track.events.map((event) => (
                  <article
                    className={`${styles.mobileCard} ${getToneClassName(event.tone)}`}
                    key={`mobile-${track.school}-${event.title}`}
                  >
                    <strong>{event.title}</strong>
                    <span>{event.timeLabel}</span>
                    {event.note ? <p>{event.note}</p> : null}
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id={shanghaiAdmissionFlow2025.id}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>{shanghaiAdmissionFlow2025.kicker}</span>
            <h2>{shanghaiAdmissionFlow2025.title}</h2>
            <p>{shanghaiAdmissionFlow2025.summary}</p>
          </div>
          <div className={styles.sectionMeta}>
            <span className={styles.metaPill}>上海批次流程图</span>
            <span className={styles.metaPill}>来源：上海市教育考试院公开数据</span>
          </div>
        </div>

        <p className={styles.caption}>{shanghaiAdmissionFlow2025.caption}</p>

        <div className={styles.preludeGrid}>
          {shanghaiAdmissionFlow2025.examPrelude.map((item) => (
            <article className={`${styles.preludeCard} ${getToneClassName(item.tone)}`} key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.timeLabel}</span>
            </article>
          ))}
        </div>

        <div className={styles.flowShell}>
          <div className={styles.flowRibbon} />
          <div className={styles.flowCallout}>港澳大学录取约 7/5，需要和强基、综评确认节奏一起看</div>
          <div className={styles.flowGrid}>
            {shanghaiAdmissionFlow2025.stages.map((stage) => (
              <article className={`${styles.flowStage} ${getToneClassName(stage.tone)}`} key={stage.title}>
                <span className={styles.flowDate}>{stage.date}</span>
                <h3>{stage.title}</h3>
                <div className={styles.flowGroupList}>
                  {stage.groups.map((group) => (
                    <div className={styles.flowGroup} key={`${stage.title}-${group.label}`}>
                      <strong>{group.label}</strong>
                      <ul>
                        {group.items.map((item) => (
                          <li key={`${stage.title}-${group.label}-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.takeawayGrid}>
          <article className={styles.takeawayCard}>
            <strong>看批次，不只是看学校名</strong>
            <p>
              这张图的价值不是告诉你“哪所学校厉害”，而是帮你看清楚：不同学校和项目，实际分散在不同批次，不会在同一天一起出结果。
            </p>
          </article>
          <article className={styles.takeawayCard}>
            <strong>7 月上旬是冲突高发区</strong>
            <p>
              强基批、综评批、零志愿批和港澳大学录取都压在 7 月上旬附近，真正难的是做确认顺序，而不是记住批次名称。
            </p>
          </article>
          <article className={styles.takeawayCard}>
            <strong>普通批只是最后一层大池子</strong>
            <p>
              从图里看，普通批在 7/23 才落下来，它不是所有人都要走到的唯一入口，而是很多前置批次之后的最后大池子。
            </p>
          </article>
        </div>

        <div className={styles.sourceCard}>
          <strong>整理提醒</strong>
          <p>{shanghaiAdmissionFlow2025.hongKongNote}</p>
          <ul className={styles.noteList}>
            {shanghaiAdmissionFlow2025.warnings.map((item) => (
              <li key={`flow-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.takeawayGrid}>
          {seniorSpringTimeline.takeaways.map((item) => (
            <article className={styles.takeawayCard} key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.sourceCard}>
          <strong>整理说明</strong>
          <p>{seniorSpringTimeline.warning}</p>
          <ul className={styles.noteList}>
            <li>这页只整理上海市教育考试院公开数据里清晰可见的节点，不额外补猜未公布的日期。</li>
            <li>时间线页现在同时包含总览图、上海 6-7 月、上海 7-8 月和 2025 流程图，口径以各自来源标题为准。</li>
            <li>后续若有更多年份或更多省份的公开节点，这页会升级成按地区和年份切换的时间线库。</li>
          </ul>
        </div>
      </section>

      <details className={styles.reviewDetails}>
        <summary className={styles.reviewSummary}>
          <span>已完成阶段回顾</span>
          <strong>春考 / 外语一考 / 小三门等级考</strong>
          <p>这些节点集中在 1 月到 5 月，目前已结束，收进折叠区供回看与备查。点击展开。</p>
        </summary>
        <div className={styles.reviewBody}>{springReview}</div>
      </details>
    </main>
  );
}
