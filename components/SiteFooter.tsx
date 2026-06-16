import Link from "next/link";
import styles from "./SiteFooter.module.css";

const columnLinks = [
  { href: "/start", label: "没方向？从这开始" },
  { href: "/admissions/shanghai", label: "查分数·填志愿" },
  { href: "/compare", label: "学校对比" },
  { href: "/pitfalls", label: "避坑清单" },
  { href: "/tradeoffs", label: "怎么取舍" },
  { href: "/selection", label: "强基·综评" },
  { href: "/timeline", label: "时间线" },
  { href: "/schools", label: "学校库" },
  { href: "/directions", label: "热门方向" },
  { href: "/careers", label: "毕业去向" },
  { href: "/advancement", label: "保研深造" },
  { href: "/top-schools", label: "四校升学真相" },
  { href: "/salary", label: "专业薪资" },
  { href: "/advice", label: "专业建议" },
  { href: "/sources", label: "数据来源" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link className={styles.brand} href="/">
            上海高考 985 报考参考
          </Link>
          <p className={styles.tagline}>
            按真实决策流重排的上海高考志愿参考站，先判断路径，再下钻学校与专业组。
          </p>
        </div>

        <nav className={styles.links} aria-label="页脚导航">
          {columnLinks.map((item) => (
            <Link className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sourceBlock}>
          <Link className={styles.sourceLink} href="/sources">
            数据来源与口径 →
          </Link>
        </div>
      </div>

      <p className={styles.disclaimer}>
        本站为民间整理的公开信息参考，不构成报考建议，请以上海市教育考试院及各校官方发布为准。
      </p>
    </footer>
  );
}
