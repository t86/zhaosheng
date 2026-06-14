"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AdvancementStat } from "@/data/advancement-types";
import { advanceTier, tuimianTier, type AdvancementTier } from "@/lib/advancement";
import styles from "./AdvancementTable.module.css";

type SortKey = "tuimianRate" | "advanceRate" | "abroadRate";

const COLUMNS: { key: SortKey; label: string; tier?: (rate: number | null) => AdvancementTier | null }[] = [
  { key: "tuimianRate", label: "保研率", tier: tuimianTier },
  { key: "advanceRate", label: "深造率", tier: advanceTier },
  { key: "abroadRate", label: "出国率" },
];

function tierClass(tier: AdvancementTier | null): string {
  switch (tier) {
    case "顶尖":
      return styles.tierTop;
    case "高":
      return styles.tierHigh;
    case "中":
      return styles.tierMid;
    default:
      return styles.tierLow;
  }
}

export function AdvancementTable({ rows }: { rows: AdvancementStat[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("advanceRate");

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return bv - av;
    });
  }, [rows, sortKey]);

  return (
    <div className={styles.wrap}>
      <div className={styles.sortBar}>
        <span>按</span>
        {COLUMNS.map((col) => (
          <button
            key={col.key}
            type="button"
            className={`${styles.sortBtn} ${sortKey === col.key ? styles.sortActive : ""}`}
            onClick={() => setSortKey(col.key)}
          >
            {col.label}
          </button>
        ))}
        <span>从高到低</span>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.left}>学校</th>
              <th>保研率</th>
              <th>深造率</th>
              <th>出国率</th>
              <th className={styles.left}>届次 / 来源</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const tTier = tuimianTier(row.tuimianRate);
              const aTier = advanceTier(row.advanceRate);
              return (
                <tr key={row.slug}>
                  <td className={styles.left}>
                    <Link href={`/schools/${row.slug}`}>{row.schoolName}</Link>
                  </td>
                  <td>
                    {row.tuimianRate != null ? (
                      <span className={styles.rateCell}>
                        <span className={`${styles.rate} ${tierClass(tTier)}`}>{row.tuimianRate}%</span>
                        {row.tuimianComputed ? (
                          <span className={styles.estTag} title={row.tuimianBasis}>
                            估算
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      <span className={styles.na}>—</span>
                    )}
                  </td>
                  <td>
                    {row.advanceRate != null ? (
                      <span className={`${styles.rate} ${tierClass(aTier)}`}>{row.advanceRate}%</span>
                    ) : (
                      <span className={styles.na}>—</span>
                    )}
                  </td>
                  <td>
                    {row.abroadRate != null ? (
                      <span className={styles.plain}>{row.abroadRate}%</span>
                    ) : (
                      <span className={styles.na}>—</span>
                    )}
                  </td>
                  <td className={styles.left}>
                    <span className={styles.cohort}>{row.cohort}</span>
                    {row.sources[0] ? (
                      <a
                        className={styles.srcLink}
                        href={row.sources[0].url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        来源 →
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.foot}>
        “—” 表示该校官方未单独公布该项。标“估算”的保研率为按官方推免公示人数 ÷ 本科毕业人数反算（鼠标悬停看依据），其余为就业报告直接公布。
        保研率=推免率（推荐免试），深造率=推免+考研+出国合计。不同学校口径与年份不完全一致，仅供量级横向参考。
      </p>
    </div>
  );
}
