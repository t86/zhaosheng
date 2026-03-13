import Link from "next/link";
import { notFound } from "next/navigation";
import { ShanghaiOfficialRecordsTable } from "@/components/ShanghaiOfficialRecordsTable";
import {
  getTrackFitProfile,
  getTrackRouteType,
  trackRouteGuide,
} from "@/lib/featured-tracks";
import { getSchool } from "@/lib/schools";
import { getShanghaiAdmissionsForSchool } from "@/lib/shanghai-admissions";
import { getShanghaiFocusSchool } from "@/lib/shanghai-focus";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getFitNote(schoolType: string) {
  switch (schoolType) {
    case "师范":
      return "如果你未来可能考虑教育、心理、基础学科深造，这类学校的培养路径会更顺。";
    case "农业":
      return "如果你只盯着学校名气而忽略行业方向，容易低估农林学科真正的就业场景和科研价值。";
    case "军事":
      return "军校报考要先确认体检、政审和招生条件，学校层喜欢并不等于报考条件满足。";
    case "理工":
      return "理工型 985 的差异主要在强势方向，不在牌子本身，筛学校时要先锁专业兴趣。";
    default:
      return "综合类 985 适合第一轮学校池筛选，但真正拉开差距的通常还是专业方向和城市资源。";
  }
}

export default async function SchoolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const school = getSchool(slug);

  if (!school) {
    notFound();
  }

  const focusMajors = school.majorProfile?.majors.map((item) => item.name) ?? school.majorHighlights;
  const featuredTracks = school.majorProfile?.featuredTracks ?? [];
  const presentRouteTypes = Array.from(
    new Set(featuredTracks.map((track) => getTrackRouteType(track))),
  );
  const shanghaiRecords = getShanghaiAdmissionsForSchool(slug);
  const shanghaiFocus = getShanghaiFocusSchool(slug);
  const showShanghaiSection = Boolean(shanghaiFocus || shanghaiRecords.length > 0);
  const ranking = school.majorRanking;
  const rankingScopeLabel = !ranking.available
    ? "当前待补"
    : ranking.confidence === "high"
      ? "高证据榜"
      : ranking.confidence === "medium"
        ? "已补公开证据"
        : "基础榜待补证据";
  const metricCards = [
    {
      label: "本科专业数",
      value: school.qualityReport?.undergraduateMajorCount ?? "待补",
      meta: school.qualityReport?.yearLabel ?? "暂无公开快照",
    },
    {
      label: "本科/总体去向",
      value:
        school.employmentReport?.undergraduateDestinationRate ??
        school.employmentReport?.overallDestinationRate ??
        "待补",
      meta: school.employmentReport?.yearLabel ?? "暂无公开快照",
    },
    {
      label: "本科深造率",
      value: school.employmentReport?.undergraduateFurtherStudyRate ?? "待补",
      meta: "仅展示抓到公开字段时的值",
    },
    {
      label: "月薪快照",
      value: school.employmentReport?.monthlySalary ?? "待补",
      meta: "学校未公开时不展示",
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>

        <div className={styles.header}>
          <div>
            <h1>{school.name}</h1>
            <p className={styles.meta}>
              {school.city} · {school.province} · {school.schoolType} · {school.affiliation}
              <br />
              创建于 {school.founded} 年 · 官方域名 {school.officialDomain}
            </p>
            <p className={styles.summary}>{school.summary}</p>
            <div className={styles.tagRow}>
              {school.topicDetails.map((topic) => (
                <span className={styles.tag} key={topic.slug}>
                  {topic.title}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.factGrid}>
            <div className={styles.factCard}>
              <span>区域</span>
              <strong>{school.region}</strong>
            </div>
            <div className={styles.factCard}>
              <span>学校类型</span>
              <strong>{school.schoolType}</strong>
            </div>
            <div className={styles.factCard}>
              <span>主管单位</span>
              <strong>{school.affiliation}</strong>
            </div>
            <div className={styles.factCard}>
              <span>城市</span>
              <strong>{school.city}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>公开报告快照</h2>
        <div className={styles.metricGrid}>
          {metricCards.map((item) => (
            <div className={styles.metricCard} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p className={styles.sourceMeta}>{item.meta}</p>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          这里显示的是学校层快照，不是省份、专业组或位次建议。真正做志愿时，必须再叠加你所在省份的招生计划和选科规则。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.majorHeader}>
          <div>
            <h2>最强专业排行榜</h2>
            <p className={styles.majorLead}>
              {ranking.available
                ? school.majorProfile?.description ?? ranking.methodology
                : "这一栏只展示有出处链接、能回溯到公开来源的专业排行。拿不到可核验来源时，这里宁可留空。"}
            </p>
          </div>
          <span className={styles.scopePill}>
            {rankingScopeLabel}
          </span>
        </div>

        {ranking.available ? (
          <>
            <div className={styles.methodCard}>
              <p className={styles.note}>{ranking.methodology}</p>
              <p className={styles.note}>{ranking.sourcePolicy}</p>
            </div>

            <div className={styles.majorGrid}>
              {ranking.majors.map((item) => (
                <article className={styles.majorCard} key={item.name}>
                  <div className={styles.majorTopline}>
                    <span className={styles.rankBadge}>#{item.rank}</span>
                    <span className={styles.clusterLabel}>{item.cluster}</span>
                    <span className={styles.tierBadge}>{item.tier}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <div className={styles.majorTags}>
                    {item.tags.map((tag) => (
                      <span className={styles.majorTag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.note ? <p className={styles.majorNote}>{item.note}</p> : null}
                  <p className={styles.majorReason}>{item.rationale}</p>
                </article>
              ))}
            </div>

            <div className={styles.profileSources}>
              {ranking.sources.map((source) => (
                <div className={styles.profileSource} key={source.url}>
                  <strong>{source.label}</strong>
                  <p>{source.note}</p>
                  <p className={styles.sourceMeta}>
                    {source.kind === "official"
                      ? "官方来源"
                      : source.kind === "public"
                        ? "公开资料"
                        : "社区补充"}{" "}
                    · 权重 {source.weight === "high" ? "高" : source.weight === "medium" ? "中" : "低"}
                  </p>
                  <a
                    className={styles.profileLink}
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    查看来源 →
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.methodCard}>
            <p className={styles.note}>{ranking.methodology}</p>
            <p className={styles.note}>{ranking.sourcePolicy}</p>
            <p className={styles.note}>{ranking.missingReason}</p>
            <div className={styles.inlineLinks}>
              {ranking.sources.map((source) => (
                <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                  {source.label} →
                </a>
              ))}
            </div>
          </div>
        )}

        <p className={styles.note}>
          {ranking.available
            ? "这份榜单已经接入学校公开证据，但它仍然是站内解释型排序，不是教育部或第三方机构发布的正式榜单。"
            : "当前没有证据就不入榜。等补到学校官网、阳光高考或学科建设公开材料后，再把这所学校的专业排行放出来。"}
        </p>
      </section>

      {featuredTracks.length > 0 ? (
        <section className={styles.section}>
          <div className={styles.majorHeader}>
            <div>
              <h2>特色班型/荣誉方向</h2>
              <p className={styles.majorLead}>
                这里单列的是学校公开的强班、试验班、英才班或荣誉方向。它们不自动等于普通本科专业，判断时先看“招生口径”。
              </p>
            </div>
            <span className={styles.scopePill}>有官方出处</span>
          </div>

          <div className={styles.routeGuideGrid}>
            {presentRouteTypes.map((routeType) => (
              <article className={styles.routeGuideCard} key={routeType}>
                <strong>{routeType}</strong>
                <p>{trackRouteGuide[routeType].summary}</p>
                <p className={styles.sourceMeta}>怎么看：{trackRouteGuide[routeType].advice}</p>
              </article>
            ))}
          </div>

          <div className={styles.trackGrid}>
            {featuredTracks.map((track) => {
              const fitProfile = getTrackFitProfile(track);

              return (
                <article className={styles.trackCard} key={track.name}>
                  <div className={styles.trackTopline}>
                    <span className={styles.trackBadge}>{track.category}</span>
                    <span className={styles.clusterLabel}>{getTrackRouteType(track)}</span>
                    <span className={styles.routeBadge}>{track.route}</span>
                  </div>
                  <h3>{track.name}</h3>
                  <div className={styles.trackTags}>
                    {track.tags.map((tag) => (
                      <span className={styles.trackTag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {track.note ? <p className={styles.trackNote}>{track.note}</p> : null}
                  <div className={styles.trackProfileGrid}>
                    <div className={styles.trackProfileCard}>
                      <strong>更适合</strong>
                      <ul className={styles.trackProfileList}>
                        {fitProfile.fitFor.map((item) => (
                          <li key={`${track.name}-fit-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.trackProfileCard}>
                      <strong>报前确认</strong>
                      <ul className={styles.trackProfileList}>
                        {fitProfile.watchOut.map((item) => (
                          <li key={`${track.name}-watch-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className={styles.trackBasis}>{fitProfile.basis}</p>
                  <div className={styles.trackSources}>
                    {track.sources.map((source) => (
                      <div className={styles.profileSource} key={`${track.name}-${source.url}`}>
                        <strong>{source.label}</strong>
                        <p>{source.note}</p>
                        <a
                          className={styles.profileLink}
                          href={source.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          查看来源 →
                        </a>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <p className={styles.note}>
            如果你是冲着 `姚班`、`ACM班` 这类项目来的，不能只看学校名或专业名。先确认它到底是高考直招、综合选拔，还是入校后二次选拔。
          </p>
        </section>
      ) : null}

      <section className={styles.section}>
        <h2>筛选提示</h2>
        <div className={styles.listCard}>
          <p className={styles.note}>{getFitNote(school.schoolType)}</p>
          <p className={styles.note}>
            当前建议优先对比 {focusMajors.slice(0, 5).join("、")} 这些方向，再决定是否进入该校的专业和分省录取页面。
          </p>
          {featuredTracks.length > 0 ? (
            <p className={styles.note}>
              这所学校还挂了 {featuredTracks.slice(0, 3).map((item) => item.name).join("、")}
              这类特色班型。它们往往更强，但招生口径也更特殊。
            </p>
          ) : null}
        </div>
      </section>

      {showShanghaiSection ? (
        <section className={styles.section}>
          <div className={styles.majorHeader}>
            <div>
              <h2>上海 2021-2025 官方公开线</h2>
              <p className={styles.majorLead}>
                这里把学校官网公开线和上海市教育考试院专业组线拆开显示。它们都是真实口径，但粒度不同，不能直接当成“单个专业最低分”。
              </p>
            </div>
            <Link className={styles.scopeLink} href="/admissions/shanghai">
              查看上海完整表 →
            </Link>
          </div>

          {shanghaiFocus ? (
            <>
              <h3 className={styles.subheading}>学校官网公开线</h3>
              <p className={styles.note}>{shanghaiFocus.note}</p>
              {shanghaiFocus.records.length > 0 ? (
                <ShanghaiOfficialRecordsTable records={shanghaiFocus.records} />
              ) : (
                <p className={styles.note}>当前只保留了官方入口，这轮还没并入学校详情页的分数表。</p>
              )}
              <div className={styles.inlineLinks}>
                {shanghaiFocus.sources.map((source) => (
                  <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                    {source.label} →
                  </a>
                ))}
              </div>
            </>
          ) : null}

          {shanghaiRecords.length > 0 ? (
            <>
              <h3 className={styles.subheading}>上海考试院专业组线</h3>
              <div className={styles.tableWrap}>
                <table className={styles.scoreTable}>
                  <thead>
                    <tr>
                      <th>年份</th>
                      <th>组别</th>
                      <th>投档线</th>
                      <th>口径</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shanghaiRecords.map((record) => (
                      <tr key={`${record.year}-${record.groupCode}-${record.sourceType}`}>
                        <td>{record.year}</td>
                        <td>
                          <strong>{record.groupName}</strong>
                          <span className={styles.tableMeta}>{record.groupCode}</span>
                        </td>
                        <td>{record.score}</td>
                        <td>
                          <a
                            className={styles.tableLink}
                            href={record.sourceUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {record.sourceType === "regular"
                              ? "普通批"
                              : record.sourceType === "q-group"
                                ? "Q组"
                                : "单独公布"}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          <p className={styles.note}>
            如果你需要的是“某个本科专业的精确最低分”，还要继续补上海版《招生各专业录取人数及考分》或学校公开到专业层的材料；当前这批学校稳定公开的通常还是学校线、分类线或专业组线。
          </p>
        </section>
      ) : null}

      <section className={styles.section}>
        <h2>官方入口</h2>
        <div className={styles.linkGrid}>
          <div className={styles.linkCard}>
            <span>学校官网</span>
            <strong>{school.officialDomain}</strong>
            <a className={styles.sourceLink} href={school.officialWebsite} rel="noreferrer" target="_blank">
              打开官网 →
            </a>
          </div>
          <div className={styles.linkCard}>
            <span>本科教学质量报告</span>
            <strong>{school.qualityReport?.yearLabel ?? "待补"}</strong>
            {school.qualityReport?.url ? (
              <a className={styles.sourceLink} href={school.qualityReport.url} rel="noreferrer" target="_blank">
                查看来源 →
              </a>
            ) : null}
          </div>
          <div className={styles.linkCard}>
            <span>就业质量报告</span>
            <strong>{school.employmentReport?.yearLabel ?? "待补"}</strong>
            {school.employmentReport?.url ? (
              <a className={styles.sourceLink} href={school.employmentReport.url} rel="noreferrer" target="_blank">
                查看来源 →
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
