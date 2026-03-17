import Link from "next/link";
import { getShanghaiFocusAdmissions } from "@/lib/shanghai-focus";
import { trackRouteGuide, trackRouteOrder } from "@/lib/featured-tracks";
import { schools } from "@/lib/schools";
import { shanghaiAdmissionsMeta } from "@/lib/shanghai-admissions";
import styles from "./page.module.css";

const schoolsWithMajorProfiles = schools.filter((school) => school.majorProfile);
const schoolsWithReports = schools.filter(
  (school) => school.qualityReport || school.employmentReport,
);
const shanghaiFocusSchools = getShanghaiFocusAdmissions();
const rankingMethodSources = [
  {
    label: "阳光高考 · 院校信息库",
    url: "https://gaokao.chsi.com.cn/sch/",
    note: "用于交叉核对学校办学属性、招生信息和院校公开口径。",
  },
  {
    label: "教育部 · 本科专业目录（2025年）",
    url: "https://www.moe.gov.cn/srcsite/A08/moe_1034/s4930/202504/t20250422_1188239.html",
    note: "用于校对专业名称、专业代码和专业设置口径。",
  },
  {
    label: "教育部 · 第二轮“双一流”建设高校及建设学科名单",
    url: "https://www.moe.gov.cn/srcsite/a22/s7065/202202/w020220214318455516037.pdf",
    note: "用于判断学校层和学科层的国家建设信号，不直接等于本科专业排名。",
  },
];

export default function SourcesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <h1>数据口径</h1>
        <p>
          当前站点把数据分成四层。第一层是对 39 所 985 的稳定主表，包含学校标签、区域和办学属性。第二层是学校-专业档案，当前已补
          {schoolsWithMajorProfiles.length} 所学校的代表专业方向，并开始单列 `姚班`、`ACM班`、`图灵班` 这类有官方出处的特色班型/荣誉方向。对于少数官方明确披露班型整体去向的项目，页面也会补充本科毕业去向概览。第三层是“专业线分析”，把 `计算机 / 临床医学 / 集成电路 / 经济学 / 航空航天` 这类高频专业线拆成全国位置、培养强度、毕业出口和替代学校。第四层是来自学校公开报告的快照型指标，比如本科专业数、毕业去向落实率、深造率和薪资。
        </p>
      </section>

      <section className={styles.section}>
        <h2>这轮采用的原则</h2>
        <ol className={styles.list}>
          <li>只做 985，不混入 211、双一流或行业强校扩展池。</li>
          <li>专业档案只在找到学校官网、招生页或本科教育公开信息后才补，不靠主观印象硬填。</li>
          <li>`姚班`、`ACM班`、试验班、荣誉方向会单列展示，不和普通本科专业混写。</li>
          <li>特色班型会继续区分 `高考直招 / 综合选拔 / 专项选拔 / 校内选拔 / 培养平台`，避免把招生口径不同的项目混在一起比较。</li>
          <li>特色班毕业去向只挂学校官方已经明确披露的班型层整体口径，不做逐届逐人的补猜，也不拿少量样本冒充全量名单。</li>
          <li>当只能拿到宣传故事、非官方整理，或者官方没有公开班级层统计时，页面会显式标注 `官方宣传/故事`、`非官方整理` 或“参考画像”，不和官方统计口径混为一谈。</li>
          <li>专业线分析里的“更高目标 / 同层可比 / 分数不够替代”属于站内解释层，只在已有 985 学校池里做静态推荐，不等于个性化志愿建议。</li>
          <li>就业、深造和薪资不做猜测，没有挂到公开来源就留空。</li>
          <li>最强专业排行榜默认“官方优先”，论坛和社区信息最多只做低权重校验，不直接压过官方证据。</li>
          <li>学校层数据优先服务“学校池筛选”，还不是最终投档建议。</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>最强专业榜怎么来的</h2>
        <ol className={styles.list}>
          <li>先看学校官网、本科招生页、本科教学质量报告等官方公开信息。</li>
          <li>再用阳光高考、教育部专业目录和“双一流”学科名单交叉校对学校层信号。</li>
          <li>当页面展开到“专业线分析”时，会继续补一层站内解释：校内强项、全国位置、培养强度和出口质量。</li>
          <li>只有当官方证据不够细时，才考虑把社区或论坛讨论当作低权重补充，而且会显式标成低权重。</li>
          <li>页面上的顺序表示站内当前强势序列，不等于教育部官方排名或第三方商业排名。</li>
        </ol>
        <div className={styles.sourceGrid}>
          {rankingMethodSources.map((source) => (
            <div className={styles.sourceCard} key={source.url}>
              <strong>{source.label}</strong>
              <p>{source.note}</p>
              <a href={source.url} rel="noreferrer" target="_blank">
                查看来源 →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>特色班型录取途径怎么读</h2>
        <p>
          页面里的“更适合 / 报前确认”属于站内解释层，依据的是班型名称、标签、录取口径和官方培养定位，不是学校官方承诺。真正填报前，仍然要回到招生简章、学院通知和当年选拔办法。
        </p>
        <div className={styles.sourceGrid}>
          {trackRouteOrder.map((routeType) => (
            <div className={styles.sourceCard} key={routeType}>
              <strong>{routeType}</strong>
              <p>{trackRouteGuide[routeType].summary}</p>
              <p>{trackRouteGuide[routeType].advice}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>当前已补的专业档案</h2>
        <div className={styles.sourceGrid}>
          {schoolsWithMajorProfiles.map((school) => (
            <div className={styles.sourceCard} key={school.slug}>
              <strong>{school.name}</strong>
              <p>
                {school.majorProfile?.scopeLabel}
                <br />
                {school.majorProfile?.description}
                {school.majorProfile?.featuredTracks?.length ? (
                  <>
                    <br />
                    已补 {school.majorProfile.featuredTracks.length} 条特色班型/荣誉方向
                  </>
                ) : null}
              </p>
              {school.majorProfile?.sources.map((source) => (
                <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                  {source.label} →
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>当前已挂接的公开报告</h2>
        <div className={styles.sourceGrid}>
          {schoolsWithReports.map((school) => (
            <div className={styles.sourceCard} key={school.slug}>
              <strong>{school.name}</strong>
              <p>
                {school.qualityReport?.title ?? "暂无本科教学质量报告快照"}
                <br />
                {school.employmentReport?.title ?? "暂无就业质量报告快照"}
              </p>
              {school.qualityReport?.url ? (
                <a href={school.qualityReport.url} rel="noreferrer" target="_blank">
                  本科教学质量报告 →
                </a>
              ) : null}
              {school.employmentReport?.url ? (
                <a href={school.employmentReport.url} rel="noreferrer" target="_blank">
                  就业质量报告 →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>上海 2021-2025 官方投档线来源</h2>
        <div className={styles.sourceGrid}>
          {shanghaiAdmissionsMeta.sources.map((source) => (
            <div className={styles.sourceCard} key={source.filename}>
              <strong>
                {source.year} · {source.sourceType === "regular" ? "普通批" : "Q组/单独公布"}
              </strong>
              <p>{source.label}</p>
              <a href={source.url} rel="noreferrer" target="_blank">
                打开 PDF →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>重点学校上海公开线来源</h2>
        <div className={styles.sourceGrid}>
          {shanghaiFocusSchools.map((school) => (
            <div className={styles.sourceCard} key={school.schoolName}>
              <strong>{school.schoolName}</strong>
              <p>{school.note}</p>
              {school.sources.map((source) => (
                <a href={source.url} key={`${school.schoolName}-${source.url}`} rel="noreferrer" target="_blank">
                  {source.label} →
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>下一轮最该补什么</h2>
        <ol className={styles.list}>
          <li>分省份的历年录取位次。</li>
          <li>按专业组或专业方向的招生规则和选科要求。</li>
          <li>更多学校的官方就业报告快照。</li>
        </ol>
      </section>
    </main>
  );
}
