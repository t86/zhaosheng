import type { Metadata } from "next";
import Link from "next/link";
import { topSchoolsAdmissions } from "@/data/top-schools-admissions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "上海四校与清北复交录取：能查到什么、信什么",
  description:
    "上海四校（上中/华二/复附/交附）清北复交升学数据，分“官方可核实”和“自媒体估算”两层呈现：上海整体录取规模与概率、四校量级与占比、以及家长自查路径，避免被升学喜报误导。",
};

const ts = topSchoolsAdmissions;

export default function TopSchoolsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>升学数据 · 可靠度分层</span>
        <h1>上海四校与清北复交：能查到什么，该信什么</h1>
        <p className={styles.lead}>{ts.intro}</p>
        <div className={styles.banCard}>
          <strong>先说一个前提</strong>
          <p>{ts.banNote}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>哪些能查、哪些查不到</h2>
          </div>
          <p>绿色为官方可核实，灰色为官方不发布（市面数字均属估算）。</p>
        </div>
        <div className={styles.queryList}>
          {ts.canQuery.map((item) => (
            <div
              className={`${styles.queryCard} ${item.queryable ? styles.qYes : styles.qNo}`}
              key={item.topic}
            >
              <div className={styles.queryTop}>
                <span className={item.queryable ? styles.badgeYes : styles.badgeNo}>
                  {item.queryable ? "官方可核" : "官方不发布"}
                </span>
                <strong>{item.topic}</strong>
              </div>
              <p>{item.detail}</p>
              {item.source ? (
                <a href={item.source.url} rel="noreferrer" target="_blank">
                  {item.source.label} →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>上海整体盘子</h2>
          </div>
          <p>分母是官方可核的；录取规模与概率为方向性估算（已标注）。</p>
        </div>
        <div className={styles.statGrid}>
          {ts.cityStats.map((stat) => (
            <article className={styles.statCard} key={stat.label}>
              <div className={styles.statHead}>
                <strong>{stat.label}</strong>
                <span className={stat.tier === "official" ? styles.tierOfficial : styles.tierEstimate}>
                  {stat.tier === "official" ? "官方" : "估算"}
                </span>
              </div>
              <ul>
                {stat.rows.map((row) => (
                  <li key={row.year}>
                    <span>{row.year}</span>
                    <strong>{row.value}</strong>
                  </li>
                ))}
              </ul>
              {stat.note ? <p className={styles.statNote}>{stat.note}</p> : null}
            </article>
          ))}
        </div>

        <div className={styles.probRow}>
          {ts.probabilities.map((p) => (
            <div className={styles.probCard} key={p.label}>
              <span>{p.label}</span>
              <strong>{p.value}</strong>
              <p>{p.detail}</p>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          概率均为“录取数 ÷ 考生数”的方向性估算，非官方录取率。清北“约 200 人”是各渠道相加的估算和，官方硬数只有零志愿（2024 = 54 人）。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>四校各自清北复交（量级）</h2>
          </div>
          <span className={styles.estimatePill}>全部为自媒体估算</span>
        </div>
        <p className={styles.warn}>
          以下每个数字都来自升学自媒体/家长盘点，学校未公布、官方不提供；同一年同校不同来源常差十几人（混用“录取/报到”“含不含强基保送/分校”）。只看量级，别把任何具体数字当真。
        </p>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.left}>学校</th>
                <th>清北（估算量级）</th>
                <th>复旦 + 上交（综评为主）</th>
              </tr>
            </thead>
            <tbody>
              {ts.schoolEstimates.map((s) => (
                <tr key={s.name}>
                  <td className={styles.left}>{s.name}</td>
                  <td>{s.qingbei}</td>
                  <td>{s.fudanSjtu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          量级排序（方向可信）：清北人数 上中 ≥ 华二 &gt; 复附 &gt; 交附；但复交综评 交附 / 复附很强。四校升复交主要靠综评而非裸分。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>四校占上海清北复交的比例</h2>
          </div>
          <p>“集中度极高”方向可信，具体百分比为估算。</p>
        </div>
        <div className={styles.shareGrid}>
          <div className={styles.shareCard}>
            <strong>清北方向</strong>
            <p>{ts.share.qingbei}</p>
          </div>
          <div className={styles.shareCard}>
            <strong>复交方向</strong>
            <p>{ts.share.fudanSjtu}</p>
          </div>
        </div>
        <p className={styles.note}>{ts.share.conclusion}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>家长自查路径（比信喜报靠谱）</h2>
          </div>
          <p>想核实一所学校的头部实力，去这些官方可核的名单倒推。</p>
        </div>
        <div className={styles.checkGrid}>
          {ts.selfCheck.map((c) => (
            <article className={styles.checkCard} key={c.title}>
              <div className={styles.checkTop}>
                <strong>{c.title}</strong>
                <span className={styles.strengthPill}>{c.strength}</span>
              </div>
              <p>{c.detail}</p>
              {c.source ? (
                <a href={c.source.url} rel="noreferrer" target="_blank">
                  {c.source.label} →
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <div className={styles.bottomLine}>
          <strong>一句话</strong>
          <p>{ts.bottomLine}</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/compare">把候选学校并排比 →</Link>
          <Link href="/advancement">看保研深造横向对比 →</Link>
          <Link href="/sources">数据来源与口径 →</Link>
        </div>
        <p className={styles.note}>数据整理于 {ts.updatedAt}。</p>
      </section>
    </main>
  );
}
