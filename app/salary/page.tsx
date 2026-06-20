import type { Metadata } from "next";
import Link from "next/link";
import { salaryReference } from "@/data/salary-reference";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "专业薪资参考 · 全国本科大类量级",
  description:
    "面向上海高三家长的专业薪资参考：基于麦可思就业蓝皮书的全国本科毕业半年后月收入、高薪专业榜与红绿牌就业景气，明确口径、不编造、非某校某专业精确值。",
};

export default function SalaryPage() {
  const ref = salaryReference;
  const greens = ref.signalMajors.filter((item) => item.signal === "green");
  const reds = ref.signalMajors.filter((item) => item.signal === "red");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>专业薪资参考 · 第三方口径 · {ref.nationalAverage.cohort}</span>
        <h1>专业薪资，先看量级再谈选择</h1>
        <p className={styles.lead}>
          学校官方就业报告普遍不公布专业级薪资。这一页用第三方调查机构麦可思的全国本科数据，
          帮你建立“不同专业方向大致能拿多少”的量级直觉——它是<strong>全国本科</strong>口径，
          不是 985、不是上海、也不是某校某专业组的精确收入。
        </p>

        <div className={styles.anchorCard}>
          <span>全国本科平均月收入（毕业半年后）</span>
          <strong>{ref.nationalAverage.monthly.toLocaleString()} 元</strong>
          <p>
            {ref.nationalAverage.cohort} · {ref.nationalAverage.sourceLabel}
          </p>
        </div>

        <p className={styles.note}>
          想看按学校排的“薪酬榜”？站内另收录了一份{" "}
          <Link className={styles.rankLink} href="/salary-rank">
            网传高校薪酬榜 TOP100 →
          </Link>
          （含 2025 届平均月薪，可筛选排序）。注意它是<strong>网传、非官方</strong>，来源不可考、仅作量级参考；本页的麦可思口径更可靠。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>先读：这页数字怎么用</h2>
          </div>
          <p>薪资只是选专业的一个维度，看之前请先理解口径和边界。</p>
        </div>
        <div className={styles.methodologyCard}>
          <ul>
            {ref.methodology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>高薪专业榜（毕业半年后月收入）</h2>
          </div>
          <p>
            麦可思公开的「月收入最高的 10 个本科专业」，{ref.highPayingMajors[0]?.cohort}。
            按<strong>具体专业</strong>排名，不是整个大类的平均——大类均值会低于榜上数字。
          </p>
        </div>
        <div className={styles.rankTable}>
          {ref.highPayingMajors.map((item) => (
            <div className={styles.rankRow} key={item.major}>
              <span className={styles.rankNo}>{item.rank}</span>
              <span className={styles.rankMajor}>{item.major}</span>
              <span className={styles.rankDiscipline}>{item.discipline}</span>
              <strong className={styles.rankSalary}>{item.monthly.toLocaleString()} 元</strong>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          十个专业全部是工科。这意味着选到电子信息、计算机、自动化、机械等方向，
          起薪量级整体高于本科平均；但具体到人，还要看院校层次、城市和个人发展。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>就业景气：绿牌与红牌专业</h2>
          </div>
          <p>麦可思按需求与综合就业表现给出的信号，{greens[0]?.cohort}。比单看起薪更能反映趋势。</p>
        </div>
        <div className={styles.signalGrid}>
          <div className={styles.signalCol}>
            <h3 className={styles.greenHead}>绿牌（需求增长、就业景气）</h3>
            <ul className={styles.signalList}>
              {greens.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  {item.note ? <span>{item.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.signalCol}>
            <h3 className={styles.redHead}>红牌（就业预警）</h3>
            <ul className={styles.signalList}>
              {reds.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  {item.note ? <span>{item.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.note}>
          红牌不等于“不能报”。如果孩子真有兴趣和天赋，名校的红牌专业照样能走得很好；
          但如果只是随大流，红牌提示你要更谨慎地看就业现实。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>行业薪酬参考与交叉印证</h2>
          </div>
          <p>从行业角度再看一眼，并用另一来源印证量级方向。</p>
        </div>
        <div className={styles.industryGrid}>
          {ref.industries.map((item) => (
            <article className={styles.industryCard} key={item.name}>
              <strong>{item.monthly.toLocaleString()} 元</strong>
              <span>{item.name}</span>
              <p className={styles.sourceMeta}>
                {item.cohort}
                {item.note ? ` · ${item.note}` : ""}
              </p>
            </article>
          ))}
        </div>
        <div className={styles.crossCheckCard}>
          <strong>交叉印证</strong>
          <p>{ref.crossCheck}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>数据来源</h2>
          </div>
          <p>每一项数字都可回到下面的公开来源核对。</p>
        </div>
        <div className={styles.sourceGrid}>
          {ref.sources.map((source) => (
            <div className={styles.sourceCard} key={source.url}>
              <span className={styles.sourceTag}>
                {source.sourceType === "official" ? "官方统计" : "第三方机构"} · {source.year}
              </span>
              <strong>{source.label}</strong>
              <p>{source.note}</p>
              <a href={source.url} rel="noreferrer" target="_blank">
                查看来源 →
              </a>
            </div>
          ))}
        </div>
        <p className={styles.note}>数据整理于 {ref.updatedAt}。</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>下一步</h2>
          </div>
          <p>有了薪资量级直觉，再回到学校与专业，把方向落到具体院校。</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/careers">按未来去向找方向（毕业都去哪）→</Link>
          <Link href="/directions#quiz">不确定方向？做个方向自测 →</Link>
          <Link href="/schools">去学校库按方向筛选 →</Link>
          <Link href="/admissions/shanghai#explorer">回上海数据页按校查分 →</Link>
        </div>
      </section>
    </main>
  );
}
