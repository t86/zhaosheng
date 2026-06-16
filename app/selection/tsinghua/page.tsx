import type { Metadata } from "next";
import Link from "next/link";
import { tsinghuaQiangji } from "@/data/tsinghua-qiangji";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "清华强基实战指南（过来人经验）· 流程 / 报名材料 / 校测策略",
  description:
    "一位清华强基过来人家长的一手经验：完整流程时间线、考试科目与综合分构成、报名材料准备的实操技巧、校测笔试的得分预期与答题战术；并标注 2024 做法与 2025 简章变化。经验参考，非官方。",
};

const q = tsinghuaQiangji;

function Block({ block }: { block: { title: string; points: string[]; note?: string } }) {
  return (
    <div className={styles.block}>
      <h3>{block.title}</h3>
      <ul className={styles.list}>
        {block.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {block.note ? <p className={styles.blockNote}>{block.note}</p> : null}
    </div>
  );
}

export default function TsinghuaQiangjiPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/selection#qiangji">
          ← 返回强基·综评
        </Link>
        <span className={styles.eyebrow}>清华强基 · 过来人经验</span>
        <h1>清华强基实战指南：流程、报名材料、校测策略</h1>
        <p className={styles.lead}>{q.sourceNote}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>整体流程时间线（2024 届）</h2>
          </div>
          <p>从 4 月报名到 7 月录取，出分到笔试只隔约 3 天——准备窗口极短。</p>
        </div>
        <div className={styles.timeline}>
          {q.timeline.map((step) => (
            <article className={styles.tlItem} key={step.title}>
              <span className={styles.tlDate}>{step.date}</span>
              <div className={styles.tlBody}>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>考试科目与综合分</h2>
          </div>
          <span className={styles.estPill}>含 2025 变化</span>
        </div>
        <Block block={q.examFormat} />
        <Block block={q.scoreFormula} />
        <div className={styles.changeCard}>
          <strong>2025 简章的几处变化</strong>
          <ul className={styles.list}>
            {q.changes2025.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>报名材料准备</h2>
          </div>
          <p>拼的是细致和如实——尤其获奖材料的扫描件命名，最容易出错。</p>
        </div>
        <Block block={q.application} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>校测笔试策略与答题战术</h2>
          </div>
          <span className={styles.estPill}>得分预期为经验估计</span>
        </div>
        <Block block={q.writtenStrategy} />
        <Block block={q.answeringTactics} />
        <div className={styles.bottomLine}>
          <strong>一句话</strong>
          <p>{q.bottomLine}</p>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.note}>
          以上为过来人经验整理（{q.updatedAt}），<strong>非官方</strong>，流程与分值逐年会变，正式报考请以清华大学当年强基计划招生简章和阳光高考平台为准。先搞清“破格入围 vs 普通入围”等规则，见{" "}
          <Link className={styles.inlineLink} href="/selection#qiangji">
            强基·综评页
          </Link>
          。
        </p>
      </section>
    </main>
  );
}
