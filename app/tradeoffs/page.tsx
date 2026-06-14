import type { Metadata } from "next";
import Link from "next/link";
import { tradeoffsContent } from "@/data/tradeoffs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "学校 vs 专业 vs 城市怎么权衡 · 一套判断框架",
  description:
    "面向上海高三家长：把「冲名校冷门专业还是稳一档王牌专业」「留沪还是去外地更高平台」「平台还是兴趣」「为城市让步几分」「本博贯通要不要绑」这些纠结，拆成对照式利弊和判断条件，给框架不替你拍板。",
};

export default function TradeoffsPage() {
  const content = tradeoffsContent;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>决策框架 · 给判断条件，不替你拍板</span>
        <h1>到底该怎么取舍：一套判断框架，不替你拍板</h1>
        <p className={styles.lead}>{content.intro}</p>
        <p className={styles.note}>{content.disclaimer}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>几个最常见的纠结</h2>
          </div>
          <p>每条都给「倾向 A」「倾向 B」和「什么情况选哪个」，帮你把判断条件想清楚。</p>
        </div>

        <div className={styles.propList}>
          {content.propositions.map((prop, index) => (
            <article className={styles.propCard} key={prop.id}>
              <div className={styles.propHeader}>
                <span className={styles.propNo}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{prop.question}</h3>
                  <p>{prop.context}</p>
                </div>
              </div>

              <div className={styles.compareGrid}>
                <div className={styles.compareCol}>
                  <span className={styles.tagA}>倾向：{prop.forA.label}</span>
                  <ul>
                    {prop.forA.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.compareCol}>
                  <span className={styles.tagB}>倾向：{prop.forB.label}</span>
                  <ul>
                    {prop.forB.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.suggestionCard}>
                <strong>什么情况选哪个</strong>
                <p>{prop.suggestion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>决定之前，先问自己这几个问题</h2>
          </div>
          <p>把这几条对着自家情况逐一回答，模糊的纠结会变成能落地的判断。</p>
        </div>

        <div className={styles.checkList}>
          {content.selfCheck.map((item, index) => (
            <article className={styles.checkCard} key={item.prompt}>
              <span className={styles.checkNo}>Q{index + 1}</span>
              <div>
                <strong>{item.prompt}</strong>
                <p>{item.why}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.closingCard}>
          <p>{content.closingNote}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>下一步</h2>
          </div>
          <p>用具体数据和方向判断，把这套框架落到真实的院校与专业上。</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/careers">按未来去向找方向（毕业都去哪）→</Link>
          <Link href="/advancement">看保研、深造与升学路径 →</Link>
          <Link href="/salary">先建立专业薪资量级直觉 →</Link>
          <Link href="/schools">去学校库按方向与城市筛选 →</Link>
        </div>
      </section>
    </main>
  );
}
