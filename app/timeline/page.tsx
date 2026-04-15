import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  seniorSpringTimeline,
  shanghaiAdmissionFlow2025,
  shanghaiJuneJulyTimeline,
  shanghaiJulyAugustTimeline,
  type FamilyTrack,
  type PositionedTimelineItem,
  type SplitTimeline,
  type TimelineTone,
} from "@/data/senior-spring-timeline";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "高三时间线库 | 985 高校志愿参考库",
  description: "把高三下的总览节奏、上海 6-7 月、7-8 月安排和 2025 录取流程放到同一套图表里看。",
};

const splitTimelines = [shanghaiJuneJulyTimeline, shanghaiJulyAugustTimeline];

const sectionNav = [
  {
    href: "#overview",
    label: "总览",
    title: "高三下总览",
    description: "3 月到 7 月的强基、综评、港校与录取总节奏，以及强基准备不是 6 月才开始。",
  },
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
          <span className={styles.metaPill}>按图片整理</span>
          <span className={styles.metaPill}>图源来自你提供的图片</span>
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

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.kicker}>高三时间线库</span>
        <h1>把强基、综评、港校和录取节点，按阶段拆开看。</h1>
        <p>
          这页不再只有一张总览图，而是把你给的 4 组时间表拆成 `总览节奏`、`上海 6-7 月细表`、`上海
          7-8 月录取跟踪` 和 `2025 上海录取流程` 四段，方便按阶段查看。对强基家庭尤其重要的是：
          强基准备不是 6 月才开始，很多从高二下到高三上的学校判断、校测积累和体测准备，都会直接影响后面的确认动作。
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroPill}>已整理 4 张时间表</span>
          <span className={styles.heroPill}>图片整理版</span>
          <span className={styles.heroPill}>非官方统一日历</span>
        </div>
        <p className={styles.heroNote}>
          你给的图片里既有 `2024 规划示例`，也有 `2025 时间表`。我在页面里分别标清来源，不把它们混成一套官方日历。
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
            <span className={styles.metaPill}>按 2024 规划示例整理</span>
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
              图片下半区不是“高考后再看学校”，而是提醒家长从 3 月开始就同步搜集信息、跑宣讲会、跟进港校和实验型大学的流程。
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

      {splitTimelines.map((timeline) => (
        <SplitTimelineSection key={timeline.id} timeline={timeline} />
      ))}

      <section className={styles.section} id={shanghaiAdmissionFlow2025.id}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>{shanghaiAdmissionFlow2025.kicker}</span>
            <h2>{shanghaiAdmissionFlow2025.title}</h2>
            <p>{shanghaiAdmissionFlow2025.summary}</p>
          </div>
          <div className={styles.sectionMeta}>
            <span className={styles.metaPill}>上海批次流程图</span>
            <span className={styles.metaPill}>图源来自你提供的图片</span>
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
            <li>这页只整理了图片里清晰可见的节点，不额外补猜你没有提供的日期。</li>
            <li>时间线页现在同时包含总览图、上海 6-7 月、上海 7-8 月和 2025 流程图，口径以各自图片标题为准。</li>
            <li>如果你后面继续给我更多年份或更多省份的图，我可以把这页升级成按地区和年份切换的时间线库。</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
