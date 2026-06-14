import type { Metadata } from "next";
import Link from "next/link";
import { DaXiaoNianChart } from "@/components/DaXiaoNianChart";
import { pitfalls, pitfallsMeta } from "@/data/pitfalls";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "填志愿十大常见错误 · 上海院校专业组避坑",
  description:
    "面向上海高三家长的填志愿避坑清单：滑档、退档、调剂到坑专业、压线进名校读冷门、选科对不上、只看去年最低分等十类经典错误，每条给现象、为什么坑、怎么避，规则口径以上海 2026 实施办法为准。",
};

export default function PitfallsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>{pitfallsMeta.eyebrow}</span>
        <h1>{pitfallsMeta.title}</h1>
        <p className={styles.lead}>{pitfallsMeta.lead}</p>
        <p className={styles.note}>{pitfallsMeta.note}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>十大常见错误</h2>
          </div>
          <p>从最容易整批掉档的几类排起。看每一条时，先对照自己现在的志愿表，再决定要不要改。</p>
        </div>

        <div className={styles.pitfallList}>
          {pitfalls.map((item) => (
            <article className={styles.pitfallCard} key={item.rank}>
              <header className={styles.pitfallHead}>
                <span className={styles.pitfallNo}>{item.rank}</span>
                <h3>{item.title}</h3>
              </header>

              <div className={styles.pitfallBody}>
                <div className={styles.pitfallRow}>
                  <span className={`${styles.tag} ${styles.tagPhenomenon}`}>现象</span>
                  <p>{item.phenomenon}</p>
                </div>
                <div className={styles.pitfallRow}>
                  <span className={`${styles.tag} ${styles.tagWhy}`}>为什么坑</span>
                  <p>{item.why}</p>
                </div>
                <div className={styles.pitfallRow}>
                  <span className={`${styles.tag} ${styles.tagAvoid}`}>怎么避</span>
                  <p>{item.avoid}</p>
                </div>
              </div>

              {item.relatedLink ? (
                <Link className={styles.relatedLink} href={item.relatedLink.href}>
                  {item.relatedLink.label}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>看图理解“大小年”</h2>
          </div>
          <p>
            投档线不是一条直线往上走。下面三个 985 院校专业组的近 5 年上海投档线，都出现了
            “升—回落—再反弹”，这正是第六、第十两条要提醒的事。
          </p>
        </div>
        <DaXiaoNianChart />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>下一步</h2>
          </div>
          <p>知道了坑在哪，回到数据和流程，把每一个志愿逐条核一遍。</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/admissions/shanghai#explorer">回上海数据页按校查组线和位次 →</Link>
          <Link href="/start">不知从哪开始？看填报起步路径 →</Link>
        </div>
      </section>
    </main>
  );
}
