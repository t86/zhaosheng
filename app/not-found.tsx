import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "页面不存在",
  description: "没有找到这个页面，可以从主要栏目重新进入。",
};

const entries = [
  { href: "/", label: "首页", hint: "先判断路径，再下钻学校" },
  { href: "/admissions/shanghai", label: "查分数", hint: "上海近 5 年院校专业组线" },
  { href: "/selection", label: "强基·综评", hint: "两条特殊招生路径判断" },
  { href: "/timeline", label: "时间线", hint: "高三下春考到录取节奏" },
  { href: "/schools", label: "学校库", hint: "39 所 985 学校索引" },
  { href: "/directions", label: "热门方向", hint: "未来 10 年方向猜想" },
  { href: "/sources", label: "数据来源", hint: "口径与覆盖情况说明" },
];

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>没有找到这个页面</h1>
      <p className={styles.lead}>
        链接可能已经调整或失效。可以从下面的主要栏目重新进入，继续查上海高考 985 报考信息。
      </p>

      <div className={styles.grid}>
        {entries.map((item) => (
          <Link className={styles.card} href={item.href} key={item.href}>
            <strong>{item.label}</strong>
            <span>{item.hint}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
