"use client";

import { useMemo, useState } from "react";
import {
  equivalentAcrossYears,
  getControlLine,
  isYearSparse,
  rankYears,
  scoreToRank,
} from "@/lib/score-rank";
import styles from "./RankConverter.module.css";

const DEFAULT_YEAR = rankYears[0];

export function RankConverter() {
  const [input, setInput] = useState("");
  const [year, setYear] = useState(DEFAULT_YEAR);

  const score = Number(input);
  const valid = input.trim() !== "" && Number.isFinite(score) && score >= 490 && score <= 660;

  const rows = useMemo(
    () => (valid ? equivalentAcrossYears(year, score) : []),
    [valid, year, score],
  );
  const baseRank = valid ? scoreToRank(year, score) : null;

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>位次 / 等效分换算</h3>
          <p className={styles.lead}>
            分数年年波动，<strong>位次更稳定</strong>。同一个分数在不同年份代表的竞争位置可能差很多。
            输入一个分数和它所在的年份，看它换算成位次、以及在其他年份“同样位置”大约对应多少分。
          </p>
        </div>
        <div className={styles.inputs}>
          <label>
            <span>分数</span>
            <input
              className={styles.input}
              inputMode="numeric"
              placeholder="如 580"
              value={input}
              onChange={(event) => setInput(event.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
            />
          </label>
          <label>
            <span>年份</span>
            <select
              className={styles.select}
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
            >
              {rankYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {valid && baseRank != null ? (
        <>
          <p className={styles.result}>
            {year} 年 <strong>{score}</strong> 分 ≈ 全市位次 <strong>{baseRank.toLocaleString()}</strong> 名
            {getControlLine(year) != null ? `（当年本科线 ${getControlLine(year)}）` : ""}
          </p>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>年份</th>
                  <th>同位置对应分数</th>
                  <th>该年最低位次</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year} className={r.year === year ? styles.active : ""}>
                    <td>
                      {r.year}
                      {isYearSparse(r.year) ? <span className={styles.approx}>近似</span> : null}
                    </td>
                    <td>
                      <strong>{r.score != null ? `${r.score} 分` : "—"}</strong>
                    </td>
                    <td>{r.rank != null ? `${r.rank.toLocaleString()} 名` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            读法：同一行是“竞争位置相同”的等效分——比如 2025 年某分，和 2024 年某分对应的是同一个位次。
            用它把往年投档线换算到同一把位次尺子上比较，比直接比裸分准。2025 为每 10 分锚点插值（标“近似”），
            高考出分后会接入当年一分一段表。
          </p>
        </>
      ) : (
        <p className={styles.placeholder}>
          输入一个 490–660 之间的分数试试。{input.trim() !== "" && !valid ? "（请输入有效分数）" : ""}
        </p>
      )}
    </div>
  );
}
