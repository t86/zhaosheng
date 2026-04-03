import Link from "next/link";
import { hotDirectionReferenceLinks } from "@/data/hot-directions";
import { getHotDirectionTopic } from "@/lib/hot-directions";
import styles from "./page.module.css";

export default function HotDirectionsPage() {
  const topic = getHotDirectionTopic();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>方向判断页 · 不是官方排名</span>
        <h1>{topic.title}</h1>
        <p className={styles.lead}>{topic.description}</p>
        <p className={styles.disclaimer}>{topic.disclaimer}</p>

        <div className={styles.anchorRow}>
          <a href="#main-top-ten">看主榜</a>
          <a href="#controversy">看争议补位</a>
          <a href="#categories">看三种视角</a>
        </div>
      </section>

      <section className={styles.section} id="main-top-ten">
        <div className={styles.sectionHeader}>
          <div>
            <h2>Top 10 主榜</h2>
          </div>
          <p>这些方向不是“最赚钱专业”名单，而是未来 10 年最值得持续讨论、最容易影响志愿选择的方向标签。</p>
        </div>

        <div className={styles.cardGrid}>
          {topic.mainDirections.map((direction) => (
            <article className={styles.directionCard} id={direction.slug} key={direction.slug}>
              <div className={styles.cardTopline}>
                <span className={styles.rank}>#{direction.rank}</span>
                <h3>{direction.name}</h3>
              </div>
              <p className={styles.oneLiner}>{direction.oneLiner}</p>

              <div className={styles.factBlock}>
                <strong>为什么热</strong>
                <p>{direction.whyHot}</p>
              </div>
              <div className={styles.factBlock}>
                <strong>为什么也可能被高估</strong>
                <p>{direction.caution}</p>
              </div>

              <div className={styles.dualGrid}>
                <div>
                  <small>家长会在意什么</small>
                  <p>{direction.parentLens}</p>
                </div>
                <div>
                  <small>学生要想清楚什么</small>
                  <p>{direction.studentLens}</p>
                </div>
              </div>

              <div className={styles.pillGroup}>
                {direction.entryPaths.map((item) => (
                  <span className={styles.entryPill} key={`${direction.slug}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>

              <div className={styles.candidateBlock}>
                <div className={styles.candidateHeader}>
                  <strong>方向候选池</strong>
                  <p>按方向贴合度、学校平台和本科培养辨识度排序，不是录取分排序。</p>
                </div>

                <ol className={styles.candidateList}>
                  {direction.candidatePrograms.slice(0, 5).map((candidate, index) => (
                    <li
                      className={styles.candidateItem}
                      key={`${direction.slug}-${candidate.school.slug}-${candidate.entryLabel}`}
                    >
                      <span className={styles.candidateRank}>{index + 1}</span>
                      <div className={styles.candidateBody}>
                        <p className={styles.candidateTitle}>
                          <Link href={`/schools/${candidate.school.slug}`}>{candidate.school.name}</Link>
                          <span>{candidate.entryLabel}</span>
                        </p>
                        <p className={styles.candidateRationale}>{candidate.rationale}</p>
                        <div className={styles.candidateTags}>
                          {candidate.tags.map((tag) => (
                            <span className={styles.candidateTag} key={`${direction.slug}-${candidate.school.slug}-${tag}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                {direction.candidatePrograms.length > 5 ? (
                  <details className={styles.candidateMore}>
                    <summary>展开另外 {direction.candidatePrograms.length - 5} 个候选</summary>
                    <ol className={styles.candidateList} start={6}>
                      {direction.candidatePrograms.slice(5).map((candidate, index) => (
                        <li
                          className={styles.candidateItem}
                          key={`${direction.slug}-more-${candidate.school.slug}-${candidate.entryLabel}`}
                        >
                          <span className={styles.candidateRank}>{index + 6}</span>
                          <div className={styles.candidateBody}>
                            <p className={styles.candidateTitle}>
                              <Link href={`/schools/${candidate.school.slug}`}>{candidate.school.name}</Link>
                              <span>{candidate.entryLabel}</span>
                            </p>
                            <p className={styles.candidateRationale}>{candidate.rationale}</p>
                            <div className={styles.candidateTags}>
                              {candidate.tags.map((tag) => (
                                <span
                                  className={styles.candidateTag}
                                  key={`${direction.slug}-more-${candidate.school.slug}-${tag}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </details>
                ) : null}
              </div>

              {direction.schoolLinks.length > 0 ? (
                <div className={styles.schoolLinks}>
                  {direction.schoolLinks.map((school) => (
                    <Link href={`/schools/${school.slug}`} key={`${direction.slug}-${school.slug}`}>
                      {school.name} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="controversy">
        <div className={styles.sectionHeader}>
          <div>
            <h2>争议补位</h2>
          </div>
          <p>这些方向有人会强推，但我暂时不把它们放进主榜。原因不是不重要，而是热度更圈层化、路径更窄或兑现周期更长。</p>
        </div>

        <div className={styles.controversyGrid}>
          {topic.controversyDirections.map((direction) => (
            <article className={styles.controversyCard} key={direction.slug}>
              <h3>{direction.name}</h3>
              <p className={styles.oneLiner}>{direction.oneLiner}</p>
              <p>{direction.caution}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="categories">
        <div className={styles.sectionHeader}>
          <div>
            <h2>三种视角看同一批方向</h2>
          </div>
          <p>这不是重新排榜，而是把同一批方向换到不同家庭偏好里重看一遍。</p>
        </div>

        <div className={styles.categoryStack}>
          {topic.categories.map((category) => (
            <article className={styles.categoryCard} id={category.slug} key={category.slug}>
              <div className={styles.categoryHeader}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <div className={styles.categoryRow}>
                {category.directions.map((direction) => (
                  <a className={styles.categoryPill} href={`#${direction.slug}`} key={`${category.slug}-${direction.slug}`}>
                    {direction.name}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>怎么看这份榜</h2>
          </div>
          <p>这份页面更适合解决“要不要继续深挖这个方向”，不适合解决“今天就该报哪个专业组”。</p>
        </div>

        <div className={styles.methodGrid}>
          <article className={styles.methodCard}>
            <strong>先用方向标签讨论</strong>
            <p>先判断一个方向值不值得花时间研究，再回到具体专业名称、学校和专业组。</p>
          </article>
          <article className={styles.methodCard}>
            <strong>再回到本科入口</strong>
            <p>同一个方向常常对应多个本科入口，比如机器人可能分散在机械、控制、电气和计算机里。</p>
          </article>
          <article className={styles.methodCard}>
            <strong>最后回到上海组线</strong>
            <p>真正填志愿时还是要回院校专业组、选科要求、计划数和风险卡，不要拿趋势判断替代实际录取口径。</p>
          </article>
        </div>

        <div className={styles.referenceRow}>
          {hotDirectionReferenceLinks.map((item) => (
            <a href={item.url} key={item.url} rel="noreferrer" target="_blank">
              {item.label} →
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
