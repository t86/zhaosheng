"use client";

import { useMemo, useState } from "react";
import type { FudanExpertAdmissionRow } from "@/data/fudan-shanghai-expert";
import styles from "./FudanExpertAdmissions.module.css";

type Props = { rows: FudanExpertAdmissionRow[] };

function formatNumber(value: number | null) {
  return value == null ? "—" : value.toLocaleString("zh-CN");
}

export function FudanExpertAdmissions({ rows }: Props) {
  const batches = Array.from(new Set(rows.map((row) => row.batch)));
  const [batch, setBatch] = useState("全部批次");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return rows.filter((row) => {
      const batchMatches = batch === "全部批次" || row.batch === batch;
      const text = `${row.school} ${row.majorName} ${row.majorFullName} ${row.groupCode}`.toLowerCase();
      return batchMatches && (!keyword || text.includes(keyword));
    });
  }, [batch, query, rows]);
  const visible = showAll ? filtered : filtered.slice(0, 18);

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <label>
          <span>批次</span>
          <select value={batch} onChange={(event) => { setBatch(event.target.value); setShowAll(false); }}>
            <option>全部批次</option>
            {batches.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className={styles.search}>
          <span>搜专业 / 班型 / 专业组</span>
          <input
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setShowAll(false); }}
            placeholder="例如：人工智能、临床医学、Q3"
          />
        </label>
        <strong className={styles.resultCount}>匹配 {filtered.length} 条</strong>
      </div>

      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>批次 / 专业组</th><th>专业与选科</th><th>2026 计划</th><th>2026 预估位次</th>
              <th>2025</th><th>2024</th><th>2023</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const history = new Map(row.history.map((item) => [item.year, item]));
              return (
                <tr key={`${row.collegeCode}-${row.groupCode}-${row.majorCode}-${row.majorFullName}`}>
                  <td><strong>{row.batch}</strong><span>{row.school} · {row.groupCode}组</span></td>
                  <td><strong>{row.majorName}{row.isNew2026 ? <em>新增</em> : null}</strong><span>{row.majorFullName}</span><small>{row.subjectRequirement} · {row.duration}年 · {row.tuition.toLocaleString("zh-CN")}元/年</small></td>
                  <td><b>{row.plan2026}</b> 人</td>
                  <td>{formatNumber(row.estimatedRank2026)}</td>
                  {[2025, 2024, 2023].map((year) => {
                    const item = history.get(year);
                    return <td key={year}>{item ? <><b>{formatNumber(item.minScore)}分</b><span>{formatNumber(item.minRank)}位 · {formatNumber(item.admitted)}人</span></> : "—"}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length > 18 ? (
        <button className={styles.more} type="button" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "收起" : `展开全部 ${filtered.length} 条`}
        </button>
      ) : null}
    </div>
  );
}
