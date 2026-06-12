import type { Metadata } from "next";
import { SchoolCard } from "@/components/SchoolCard";
import { schools } from "@/lib/schools";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "学校库 · 39 所 985 院校索引",
  description:
    "按地区分组的 39 所 985 院校索引，每所可下钻到学校详情，查看代表方向、特色班型与公开报告快照。",
};

const regionOrder = ["华北", "东北", "华东", "华中", "华南", "西南", "西北"];

export default function SchoolsIndexPage() {
  const grouped = regionOrder
    .map((region) => ({
      region,
      items: schools.filter((school) => school.region === region),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <span className={styles.eyebrow}>学校库 · 985 院校索引</span>
        <h1>按地区浏览 {schools.length} 所 985 院校，点开任意一所看代表方向与公开报告。</h1>
        <p className={styles.lead}>
          这是学校层的入口页：先按地区找到目标学校，再进入学校详情核对代表方向、特色班型和公开数据。具体填报仍以上海近 5 年院校专业组线为准。
        </p>
      </section>

      {grouped.map((group) => (
        <section className={styles.regionSection} key={group.region}>
          <div className={styles.regionHeader}>
            <h2>{group.region}</h2>
            <span className={styles.regionCount}>{group.items.length} 所</span>
          </div>
          <div className={styles.grid}>
            {group.items.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
