import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import type { FamilyTrack } from "@/data/senior-spring-timeline";
import { seniorSpringTimeline } from "@/data/senior-spring-timeline";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "高三下时间线 | 985 高校志愿参考库",
  description: "把高三下学期的强基、综评、港校和录取节点放到同一条时间轴里看。",
};

function getToneClassName(tone: "warm" | "cool" | "alert" | "soft") {
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
        <span className={styles.kicker}>高三下决策时间线</span>
        <h1>把强基、综评、港校和录取节点，放回一条时间轴里看。</h1>
        <p>{seniorSpringTimeline.subtitle}</p>
        <div className={styles.heroMeta}>
          <span className={styles.heroPill}>按 2024 规划示例整理</span>
          <span className={styles.heroPill}>图源来自你提供的图片</span>
          <span className={styles.heroPill}>非官方统一时间表</span>
        </div>
        <p className={styles.heroNote}>{seniorSpringTimeline.caption}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>学生准备主时间轴</h2>
            <p>
              上半区是考试和面试节奏，下半区是报名、志愿和录取节点。图上用了不同颜色区分“日常节奏、报名动作、关键考试、最终结果”。
            </p>
          </div>
          <Link className={styles.headerLink} href="/sources">
            查看数据口径 →
          </Link>
        </div>

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
          <div className={styles.chartShell}>
            <div className={styles.topBand}>
              {topMilestones.map((item) => (
                <article
                  className={`${styles.milestoneCard} ${getToneClassName(item.tone)}`}
                  key={`${item.band}-${item.title}`}
                  style={
                    {
                      left: `${item.position}%`,
                      top: `${item.stack * 76}px`,
                    } as CSSProperties
                  }
                >
                  <strong>{item.title}</strong>
                  <span>{item.timeLabel}</span>
                  {item.note ? <p>{item.note}</p> : null}
                </article>
              ))}
            </div>

            <div className={styles.axisBand}>
              <div className={styles.axisLine} />
              <div className={styles.axisGlow} />
              {seniorSpringTimeline.axis.map((marker) => (
                <div
                  className={styles.axisMarker}
                  key={marker.label}
                  style={{ left: `${marker.position}%` } as CSSProperties}
                >
                  <span className={styles.markerDot} />
                  <strong>{marker.label}</strong>
                </div>
              ))}
            </div>

            <div className={styles.bottomBand}>
              {bottomMilestones.map((item) => (
                <article
                  className={`${styles.milestoneCard} ${styles.bottomCard} ${getToneClassName(item.tone)}`}
                  key={`${item.band}-${item.title}`}
                  style={
                    {
                      left: `${item.position}%`,
                      top: `${item.stack * 76}px`,
                    } as CSSProperties
                  }
                >
                  <strong>{item.title}</strong>
                  <span>{item.timeLabel}</span>
                </article>
              ))}
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
            <h2>家长准备泳道</h2>
            <p>
              图片下半区不是“高考后再看学校”，而是把上科大、上纽大、港校这些时间更早的节点单独拎出来，提醒家长从 3 月就开始跟进。
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
            <li>上科大 / 南科大在原图里是合并展示，我这里也按一条节奏线保留。</li>
            <li>如果你后面给我更多年份的版本，我可以把这页升级成按年份切换的高三下时间线库。</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
