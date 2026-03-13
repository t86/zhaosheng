import Link from "next/link";
import { notFound } from "next/navigation";
import { SchoolCard } from "@/components/SchoolCard";
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

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
        <p className={styles.meta}>本专题当前收录 {topicSchools.length} 所 985 高校。</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {topicSchools.map((school) => (
            <SchoolCard key={school.slug} school={school} />
          ))}
        </div>
      </section>
    </main>
  );
}
