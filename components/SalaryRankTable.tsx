"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { salaryRankRows, type SalaryRankRow } from "@/data/salary-rank";
import { getAdvancementStat } from "@/lib/advancement";
import styles from "./SalaryRankTable.module.css";

type SortKey = "rank" | "salaryIndex" | "avgMonthlySalary";

const LOCATIONS = Array.from(new Set(salaryRankRows.map((r) => r.location))).sort();
const TYPES = Array.from(new Set(salaryRankRows.map((r) => r.type))).sort();

export function SalaryRankTable() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<"all" | "985" | "211">("all");
  const [location, setLocation] = useState("全部地区");
  const [type, setType] = useState("全部类型");
  const [sortKey, setSortKey] = useState<SortKey>("rank");

  const rows = useMemo(() => {
    const filtered = salaryRankRows.filter((r) => {
      if (tier === "985" && !r.is985) return false;
      if (tier === "211" && !r.is211) return false;
      if (location !== "全部地区" && r.location !== location) return false;
      if (type !== "全部类型" && r.type !== type) return false;
      if (query.trim() && !r.name.includes(query.trim())) return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "rank") return a.rank - b.rank;
      return (b[sortKey] as number) - (a[sortKey] as number);
    });
    return sorted;
  }, [query, tier, location, type, sortKey]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="搜学校名，如“复旦”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.tierBtns}>
          {(["all", "985", "211"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tierBtn} ${tier === t ? styles.tierActive : ""}`}
              onClick={() => setTier(t)}
            >
              {t === "all" ? "全部" : t}
            </button>
          ))}
        </div>
        <select className={styles.select} value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>全部地区</option>
          {LOCATIONS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select className={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
          <option>全部类型</option>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select className={styles.select} value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
          <option value="rank">按榜单排名</option>
          <option value="avgMonthlySalary">按平均月薪</option>
          <option value="salaryIndex">按薪酬指数</option>
        </select>
      </div>

      <p className={styles.count}>共 {rows.length} 所</p>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>榜单排名</th>
              <th className={styles.left}>学校</th>
              <th>类型</th>
              <th>地区</th>
              <th>层次</th>
              <th>薪酬指数</th>
              <th>平均月薪（网传）</th>
              <th>深造率（官方）</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <Row key={row.rank} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ row }: { row: SalaryRankRow }) {
  const adv = row.slug ? getAdvancementStat(row.slug) : undefined;
  return (
    <tr>
      <td className={styles.rank}>{row.rank}</td>
      <td className={styles.left}>
        {row.slug ? (
          <Link href={`/schools/${row.slug}`}>{row.name}</Link>
        ) : (
          <span>{row.name}</span>
        )}
      </td>
      <td>{row.type}</td>
      <td>{row.location}</td>
      <td>
        {row.is985 ? <span className={styles.badge985}>985</span> : null}
        {row.is211 ? <span className={styles.badge211}>211</span> : null}
        {!row.is985 && !row.is211 ? <span className={styles.na}>—</span> : null}
      </td>
      <td>{row.salaryIndex}</td>
      <td>
        <strong>{row.avgMonthlySalary.toLocaleString()}</strong> 元
      </td>
      <td>
        {adv?.advanceRate != null ? (
          <span className={styles.official}>{adv.advanceRate}%</span>
        ) : (
          <span className={styles.na}>—</span>
        )}
      </td>
    </tr>
  );
}
