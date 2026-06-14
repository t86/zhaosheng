"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompareRow } from "@/lib/build-compare-row";
import styles from "./SchoolCompare.module.css";

export type SchoolOption = {
  slug: string;
  name: string;
  city: string;
  schoolType: string;
};

type RecommendedCombo = {
  label: string;
  slugs: string[];
};

type SchoolCompareProps = {
  options: SchoolOption[];
  rows: Record<string, CompareRow>;
  recommended: RecommendedCombo[];
};

const MAX_SELECTED = 3;

function freedomTone(freedom: CompareRow["transferFreedom"]): string {
  if (freedom === "宽松") {
    return styles.tonePositive;
  }
  if (freedom === "较受限") {
    return styles.toneCaution;
  }
  return "";
}

// 把一项可能为 null 的值渲染成单元格内容，缺失统一显示"—"
function cell(value: React.ReactNode | null | undefined): React.ReactNode {
  if (value === null || value === undefined || value === "") {
    return <span className={styles.missing}>—</span>;
  }
  return value;
}

function formatPercent(value: number | null): React.ReactNode {
  if (value === null) {
    return <span className={styles.missing}>—</span>;
  }
  return `${value}%`;
}

export default function SchoolCompare({
  options,
  rows,
  recommended,
}: SchoolCompareProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const optionMap = useMemo(() => {
    const map = new Map<string, SchoolOption>();
    for (const option of options) {
      map.set(option.slug, option);
    }
    return map;
  }, [options]);

  const selectedRows = useMemo(
    () => selected.map((slug) => rows[slug]).filter(Boolean),
    [selected, rows],
  );

  const atLimit = selected.length >= MAX_SELECTED;

  function toggle(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      if (current.length >= MAX_SELECTED) {
        return current;
      }
      return [...current, slug];
    });
  }

  function applyCombo(slugs: string[]) {
    setSelected(slugs.slice(0, MAX_SELECTED).filter((slug) => optionMap.has(slug)));
  }

  function clearAll() {
    setSelected([]);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.pickerHead}>
        <div>
          <strong>选择 2-3 所学校</strong>
          <p>从下面点选，最多 3 所；再点一次可取消。</p>
        </div>
        <span className={styles.counter}>
          已选 {selected.length} / {MAX_SELECTED}
          {selected.length > 0 ? (
            <button className={styles.clearBtn} onClick={clearAll} type="button">
              清空
            </button>
          ) : null}
        </span>
      </div>

      <div className={styles.optionGrid}>
        {options.map((option) => {
          const isOn = selected.includes(option.slug);
          const disabled = !isOn && atLimit;
          return (
            <button
              aria-pressed={isOn}
              className={`${styles.optionBtn} ${isOn ? styles.optionOn : ""}`}
              disabled={disabled}
              key={option.slug}
              onClick={() => toggle(option.slug)}
              type="button"
            >
              <span className={styles.optionName}>{option.name}</span>
              <span className={styles.optionMeta}>
                {option.city} · {option.schoolType}
              </span>
            </button>
          );
        })}
      </div>

      {selectedRows.length === 0 ? (
        <div className={styles.emptyCard}>
          <strong>还没有选学校</strong>
          <p>
            上面挑 2-3 所你正在纠结的候选，下面会把它们的城市、分数、深造、转专业、
            优势短板和王牌专业薪资量级并排列出来。也可以直接用下面的推荐组合：
          </p>
          <div className={styles.comboRow}>
            {recommended.map((combo) => (
              <button
                className={styles.comboBtn}
                key={combo.label}
                onClick={() => applyCombo(combo.slugs)}
                type="button"
              >
                {combo.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.dimHead} scope="col">
                  对比维度
                </th>
                {selectedRows.map((row) => (
                  <th className={styles.schoolHead} key={row.slug} scope="col">
                    <Link className={styles.schoolLink} href={`/schools/${row.slug}`}>
                      {row.name}
                    </Link>
                    {row.tagline ? (
                      <span className={styles.tagline}>{row.tagline}</span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">城市</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>{cell(row.city)}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">院校类型</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>{cell(row.schoolType)}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">代表方向</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    {row.directions.length > 0 ? (
                      <div className={styles.tagWrap}>
                        {row.directions.map((dir) => (
                          <span className={styles.tag} key={dir}>
                            {dir}
                          </span>
                        ))}
                      </div>
                    ) : (
                      cell(null)
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">
                  最近一年最低组线
                  <span className={styles.dimNote}>上海，最低投档专业组</span>
                </th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    {row.minScore ? (
                      <div className={styles.scoreCell}>
                        <strong>{row.minScore.minScore}</strong>
                        <span className={styles.scoreMeta}>
                          {row.minScore.year} · {row.minScore.groupName}
                          {row.minScore.scoreType === "threshold" ? "（控制线口径）" : ""}
                        </span>
                      </div>
                    ) : (
                      cell(null)
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">
                  保研 / 推免率
                  <span className={styles.dimNote}>部分为按公示反算</span>
                </th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    <div className={styles.scoreCell}>
                      <strong>{formatPercent(row.tuimianRate)}</strong>
                      {row.tuimianRate !== null && row.tuimianComputed ? (
                        <span className={styles.scoreMeta}>按推免公示反算</span>
                      ) : null}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">深造率（含考研/出国）</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    <div className={styles.scoreCell}>
                      <strong>{formatPercent(row.advanceRate)}</strong>
                      {row.advanceRate !== null && row.advancementCohort ? (
                        <span className={styles.scoreMeta}>{row.advancementCohort}</span>
                      ) : null}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">出国（境）率</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>{formatPercent(row.abroadRate)}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">转专业自由度</th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    {row.transferFreedom ? (
                      <span
                        className={`${styles.freedomTag} ${freedomTone(row.transferFreedom)}`}
                      >
                        {row.transferFreedom}
                      </span>
                    ) : (
                      cell(null)
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">一句优势</th>
                {selectedRows.map((row) => (
                  <td className={styles.proseCell} key={row.slug}>
                    {cell(row.strength)}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">一句短板 / 要权衡</th>
                {selectedRows.map((row) => (
                  <td className={styles.proseCell} key={row.slug}>
                    {cell(row.watchout)}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row">
                  王牌专业薪资量级
                  <span className={styles.dimNote}>全国同名专业口径</span>
                </th>
                {selectedRows.map((row) => (
                  <td key={row.slug}>
                    {row.majorSalaries.length > 0 ? (
                      <ul className={styles.salaryList}>
                        {row.majorSalaries.map((match) => (
                          <li key={match.major}>
                            <span className={styles.salaryMajor}>{match.major}</span>
                            {match.national ? (
                              <span className={styles.salaryValue}>
                                {match.national.monthly.toLocaleString()} 元/月
                              </span>
                            ) : null}
                            {match.signal ? (
                              <span
                                className={`${styles.signalTag} ${
                                  match.signal.signal === "green"
                                    ? styles.signalGreen
                                    : styles.signalRed
                                }`}
                              >
                                {match.signal.signal === "green" ? "绿牌" : "红牌"}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      cell(null)
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
