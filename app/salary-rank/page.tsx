import type { Metadata } from "next";
import Link from "next/link";
import { SalaryRankTable } from "@/components/SalaryRankTable";
import { salaryRankMeta } from "@/data/salary-rank";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "网传高校薪酬榜 TOP100（2025 届平均月薪）· 仅供参考",
  description:
    "一份网络流传的全国高校毕业生薪酬指数排行榜 TOP100，含 2025 届平均月薪与薪酬指数，可按 985/211、地区、类型筛选排序。来源不可考、非官方，仅作量级参考；不要据此单一指标做志愿决策。",
};

export default function SalaryRankPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/salary">
          ← 返回专业薪资
        </Link>
        <span className={styles.eyebrow}>网传榜单 · 仅供参考</span>
        <h1>{salaryRankMeta.title}</h1>
        <div className={styles.warnCard}>
          <strong>先读这一句：这是网传榜，不是官方数据</strong>
          <p>{salaryRankMeta.sourceNote}</p>
        </div>
      </section>

      <section className={styles.section}>
        <SalaryRankTable />
        <p className={styles.note}>
          带绿色“深造率（官方）”的数字来自各校官方就业质量报告（仅站内收录的 985 院校有），和这份网传薪资是两套不同来源——
          一个官方、一个网传，放在一起方便你交叉看，别混为一谈。更可靠的薪资参考见{" "}
          <Link className={styles.inlineLink} href="/salary">
            专业薪资参考（麦可思口径）
          </Link>
          ，官方升学对比见{" "}
          <Link className={styles.inlineLink} href="/advancement">
            保研率与深造率横向对比
          </Link>
          。
        </p>
      </section>
    </main>
  );
}
