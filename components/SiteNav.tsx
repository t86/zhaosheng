import Link from "next/link";
import styles from "./SiteNav.module.css";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/start", label: "没方向？从这开始" },
  { href: "/admissions/shanghai", label: "查分数·填志愿" },
  { href: "/compare", label: "学校对比" },
  { href: "/pitfalls", label: "避坑清单" },
  { href: "/selection", label: "强基·综评" },
  { href: "/timeline", label: "时间线" },
  { href: "/schools", label: "学校库" },
  { href: "/directions", label: "热门方向" },
  { href: "/careers", label: "毕业去向" },
  { href: "/advancement", label: "保研深造" },
  { href: "/salary", label: "专业薪资" },
  { href: "/advice", label: "专业建议" },
  { href: "/sources", label: "数据来源" },
];

export function SiteNav() {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>985</span>
          <span className={styles.brandText}>上海高考志愿参考</span>
        </Link>
        <nav className={styles.nav} aria-label="主导航">
          {navItems.map((item) => (
            <Link className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
