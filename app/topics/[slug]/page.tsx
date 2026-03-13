import Link from "next/link";
import { notFound } from "next/navigation";
import { SchoolExplorer } from "@/components/SchoolExplorer";
import { getTrackRouteType } from "@/lib/featured-tracks";
import { getTopic, getTopicSchools } from "@/lib/schools";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  const topicSchools = getTopicSchools(topic.slug);
  const topicRegions = Array.from(new Set(topicSchools.map((school) => school.region)));
  const topicSchoolTypes = Array.from(new Set(topicSchools.map((school) => school.schoolType)));
  const topicRouteTypes = Array.from(
    new Set(
      topicSchools.flatMap((school) =>
        school.majorProfile?.featuredTracks?.map((track) => getTrackRouteType(track)) ?? [],
      ),
    ),
  );
  const schoolsWithFeaturedTracks = topicSchools.filter(
    (school) => (school.majorProfile?.featuredTracks?.length ?? 0) > 0,
  ).length;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
        <p className={styles.meta}>本专题当前收录 {topicSchools.length} 所 985 高校。</p>
        <div className={styles.metaRow}>
          <span className={styles.metaPill}>含特色班型 {schoolsWithFeaturedTracks} 所</span>
          <span className={styles.metaPill}>覆盖区域 {topicRegions.length} 个</span>
          {topicRouteTypes.map((routeType) => (
            <span className={styles.metaPill} key={routeType}>
              {routeType}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SchoolExplorer
          hideTopicFilter
          initialTopicSlug={topic.slug}
          queryPlaceholder={`搜 ${topic.shortTitle} 学校、城市、专业方向或班型，比如“计算机”“少年班”`}
          regions={topicRegions}
          schoolTypes={topicSchoolTypes}
          schools={topicSchools}
          topics={[]}
        />
      </section>
    </main>
  );
}
