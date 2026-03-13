import Link from "next/link";
import { getTrackRouteType } from "@/lib/featured-tracks";
import type { School } from "@/lib/schools";
import styles from "./SchoolCard.module.css";

type Props = {
  school: School;
};

function getDisplayHighlights(school: School) {
  return school.majorRanking.available
    ? school.majorRanking.majors.map((item) => item.name)
    : school.majorHighlights;
}

function getMetricPills(school: School) {
  const metrics: string[] = [];

  if (school.qualityReport?.undergraduateMajorCount) {
    metrics.push(`本科专业数 ${school.qualityReport.undergraduateMajorCount}`);
  }
  if (school.employmentReport?.undergraduateDestinationRate) {
    metrics.push(`本科去向 ${school.employmentReport.undergraduateDestinationRate}`);
  } else if (school.employmentReport?.overallDestinationRate) {
    metrics.push(`总体去向 ${school.employmentReport.overallDestinationRate}`);
  }
  if (school.employmentReport?.undergraduateFurtherStudyRate) {
    metrics.push(`本科深造 ${school.employmentReport.undergraduateFurtherStudyRate}`);
  }
  if (school.employmentReport?.monthlySalary) {
    metrics.push(`月薪 ${school.employmentReport.monthlySalary}`);
  }

  return metrics.slice(0, 3);
}

export function SchoolCard({ school }: Props) {
  const metricPills = getMetricPills(school);
  const hasReports = Boolean(school.qualityReport || school.employmentReport);
  const displayHighlights = getDisplayHighlights(school).slice(0, 4);
  const featuredTracks = school.majorProfile?.featuredTracks?.map((item) => item.name).slice(0, 2) ?? [];
  const hasFeaturedTracks = featuredTracks.length > 0;
  const featuredTrackRoutes = Array.from(
    new Set(
      school.majorProfile?.featuredTracks?.map((item) => getTrackRouteType(item)) ?? [],
    ),
  ).slice(0, 3);
  const highlightLabel = school.majorRanking.available ? "最强专业榜" : "代表方向";
  const footerBaseText = school.majorRanking.available
    ? hasReports
      ? "已补专业榜 + 部分官方报告"
      : "已补证据型专业榜"
    : hasReports
      ? "专业榜待补，已挂部分报告"
      : "专业榜待补，当前只保留代表方向";
  const footerText = hasFeaturedTracks ? `${footerBaseText} · 含特色班型` : footerBaseText;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.name}>{school.name}</h3>
          <p className={styles.meta}>
            {school.city} · {school.schoolType} · {school.affiliation}
          </p>
        </div>
      </header>

      <div className={styles.tags}>
        {school.topicDetails.map((topic) => (
          <span className={styles.tag} key={topic.slug}>
            {topic.shortTitle}
          </span>
        ))}
      </div>

      {metricPills.length > 0 ? (
        <div className={styles.metrics}>
          {metricPills.map((metric) => (
            <span className={styles.metric} key={metric}>
              {metric}
            </span>
          ))}
        </div>
      ) : null}

      <p className={styles.summary}>{school.summary}</p>

      <p className={styles.groupLabel}>{highlightLabel}</p>
      <div className={styles.highlights}>
        {displayHighlights.map((item, index) => (
          <span className={styles.highlight} key={item}>
            {school.majorRanking.available ? `#${index + 1} ${item}` : item}
          </span>
        ))}
      </div>

      {hasFeaturedTracks ? (
        <>
          <p className={styles.groupLabel}>特色班型/荣誉方向</p>
          <div className={styles.highlights}>
            {featuredTracks.map((item) => (
              <span className={styles.highlight} key={item}>
                {item}
              </span>
            ))}
          </div>
          {featuredTrackRoutes.length > 0 ? (
            <>
              <p className={styles.groupLabel}>班型口径</p>
              <div className={styles.routeTags}>
                {featuredTrackRoutes.map((item) => (
                  <span className={styles.routeTag} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : null}

      <footer className={styles.footer}>
        <span>{footerText}</span>
        <Link className={styles.link} href={`/schools/${school.slug}`}>
          查看学校 →
        </Link>
      </footer>
    </article>
  );
}
