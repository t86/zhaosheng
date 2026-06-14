import type { Metadata } from "next";
import Link from "next/link";
import { AdvancementTable } from "@/components/AdvancementTable";
import { getComparisonRows } from "@/lib/advancement";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "保研率与深造率横向对比 · 985 院校",
  description:
    "把各 985 院校官方就业报告里的保研率（推免率）、深造率、出国率放在一张可排序的表里横向对比，帮上海考生判断哪些学校升学出口更强。",
};

export default function AdvancementPage() {
  const rows = getComparisonRows();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>升学出口 · 横向对比</span>
        <h1>保研率与深造率，横着比一眼看出梯队</h1>
        <p className={styles.lead}>
          “这所学校好不好深造”是家长最常横向比的硬指标之一。下面把各 985
          官方就业报告里的<strong>保研率（推免率）</strong>、<strong>深造率</strong>、出国率放进一张可排序的表，
          点表头切换排序。绿色越深代表该项越靠前。
        </p>
      </section>

      <section className={styles.section}>
        <AdvancementTable rows={rows} />
      </section>

      <section className={styles.section}>
        <div className={styles.caveatCard}>
          <strong>怎么看这张表</strong>
          <ul>
            <li>
              <strong>保研率高</strong>≈ 校内升学通道宽：不用考研就能直升，竞争压力小、深造确定性高，是名校的重要隐性福利。
            </li>
            <li>
              <strong>深造率</strong>包含保研+考研+出国，反映整体“继续读书”的比例；理科与基础学科强的学校通常更高。
            </li>
            <li>
              口径有差异：各校就业报告统计方式、年份不完全一致，部分学校只公布全校口径或未单独公布推免率（表中显示“—”）。这张表用于建立量级直觉，不作精确排名。
            </li>
          </ul>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/schools">回学校库看每所学校的优势与短板 →</Link>
          <Link href="/careers">按未来去向找方向 →</Link>
        </div>
      </section>
    </main>
  );
}
