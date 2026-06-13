import type { Metadata } from "next";
import { SchoolExplorer } from "@/components/SchoolExplorer";
import { topicDefinitions } from "@/data/topics";
import { getRegions, getSchoolTypes, schools } from "@/lib/schools";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "学校库 · 39 所 985 院校筛选",
  description:
    "按地区、类型、专业方向和特色班型筛选 39 所 985 院校，搜“上海”“微电子”“姚班”等关键词，点开任意一所看代表方向、特色班型与公开报告快照。",
};

export default function SchoolsIndexPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <span className={styles.eyebrow}>学校库 · 985 院校筛选</span>
        <h1>按地区、类型和方向筛 {schools.length} 所 985，点开任意一所看代表方向与公开数据。</h1>
        <p className={styles.lead}>
          这是学校层的入口页：用下面的筛选器按地区、类型、专业方向或特色班型缩小范围，也可以直接搜关键词，再进入学校详情核对代表方向、特色班型和公开数据。具体填报仍以上海近 5 年院校专业组线为准。
        </p>
      </section>

      <section className={styles.explorerSection}>
        <SchoolExplorer
          schools={schools}
          regions={getRegions()}
          schoolTypes={getSchoolTypes()}
          topics={topicDefinitions}
          queryPlaceholder="搜学校、城市、专业方向或班型，比如“上海”“微电子”“姚班”"
        />
      </section>
    </main>
  );
}
