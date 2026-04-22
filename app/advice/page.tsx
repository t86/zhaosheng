import type { Metadata } from "next";
import Link from "next/link";
import { videoAdviceLibrary } from "@/data/video-advice";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "专业建议 | 985 高校志愿参考库",
  description: "把视频来源里的专业判断整理成结构化笔记，先做专业体感判断，再回到学校与专业组。",
};

export default function AdvicePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>专业建议入口页 · 视频来源整理版</span>
        <h1>视频来源专业建议笔记库</h1>
        <p className={styles.lead}>{videoAdviceLibrary.description}</p>
        <p className={styles.note}>{videoAdviceLibrary.note}</p>

        <div className={styles.statRow}>
          <article className={styles.statCard}>
            <span>已整理</span>
            <strong>3 条</strong>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>已整理笔记</h2>
          </div>
          <p>第一版只承载已完成转写和整理的视频内容，先把能直接放进站内的判断保留下来。</p>
        </div>

        {videoAdviceLibrary.publishedNotes.map((note) => (
          <article className={styles.noteCard} key={note.slug}>
            <div className={styles.noteHeader}>
              <div>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
              </div>
              <a href={note.sourceUrl} rel="noreferrer" target="_blank">
                查看来源 →
              </a>
            </div>

            <div className={styles.metaGrid}>
              <article className={styles.metaCard}>
                <strong>适合怎么用</strong>
                <p>{note.usage}</p>
              </article>
              <article className={styles.metaCard}>
                <strong>提取方式</strong>
                <p>{note.extraction}</p>
              </article>
            </div>

            <div className={styles.sectionGrid}>
              {note.sections.map((section) => (
                <article className={styles.detailCard} key={`${note.slug}-${section.title}`}>
                  <strong>{section.title}</strong>
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={styles.caveatCard}>
              <strong>使用提醒</strong>
              <ul>
                {note.caveats.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {videoAdviceLibrary.pendingSources.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>待补录来源</h2>
            </div>
            <p>这些来源已经登记进库，但当前还没有拿到可稳定提取的正文或音频。</p>
          </div>

          <div className={styles.pendingGrid}>
            {videoAdviceLibrary.pendingSources.map((item) => (
              <article className={styles.pendingCard} key={item.sourceUrl}>
                <h3>{item.title}</h3>
                <p>{item.status}</p>
                <p className={styles.nextStep}>{item.nextStep}</p>
                <a href={item.sourceUrl} rel="noreferrer" target="_blank">
                  打开原链接 →
                </a>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
