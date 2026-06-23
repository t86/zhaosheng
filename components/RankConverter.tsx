"use client";

import { useMemo, useState } from "react";
import {
  equivalentAcrossYears,
  getControlLine,
  getTopScore,
  isYearSparse,
  rankYears,
} from "@/lib/score-rank";
import styles from "./RankConverter.module.css";

const DEFAULT_YEAR = rankYears[0];

export function RankConverter() {
  const [input, setInput] = useState("");
  const [year, setYear] = useState(DEFAULT_YEAR);

  const score = Number(input);
  const valid = input.trim() !== "" && Number.isFinite(score) && score >= 0 && score <= 660;

  const result = useMemo(
    () => (valid ? equivalentAcrossYears(year, score) : null),
    [valid, year, score],
  );

  const topScore = getTopScore(year);
  // 超出该年数据范围（高于成绩分布表上限）
  const aboveRange = valid && result != null && result.baseRank == null && topScore != null && score > topScore;

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

      {!valid ? (
        <p className={styles.placeholder}>
          输入一个 0–660 之间的分数试试。{input.trim() !== "" ? "（请输入有效分数）" : ""}
        </p>
      ) : aboveRange ? (
        <p className={styles.outRange}>
          {year} 年的官方成绩分布表只公布到 <strong>{topScore} 分及以上</strong>（约全市前 50 名）为一个区间，
          再往上不逐分公布。<strong>{score} 分</strong>属于这个顶端区间，无法精确定位位次或换算等效分——
          这一段拼的就是顶尖名校的录取，建议直接参照目标院校近几年的录取位次/分数。
        </p>
      ) : result != null && result.baseRank != null ? (
        <>
          <p className={styles.result}>
            {year} 年 <strong>{score}</strong> 分 ≈ 全市位次约 <strong>{result.baseRank.toLocaleString()}</strong> 名
            {getControlLine(year) != null ? `（当年本科线 ${getControlLine(year)}）` : ""}。
            下表是<strong>同一位次</strong>在各年的等效分。
          </p>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>年份</th>
                  <th>同位次（约 {result.baseRank.toLocaleString()} 名）的等效分</th>
                  <th>当年本科线</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.year} className={r.year === year ? styles.active : ""}>
                    <td>
                      {r.year}
                      {isYearSparse(r.year) ? <span className={styles.approx}>近似</span> : null}
                    </td>
                    <td>
                      {r.score != null ? (
                        <strong>{r.score} 分</strong>
                      ) : (
                        <span className={styles.na}>顶端区间，超出数据</span>
                      )}
                    </td>
                    <td>{r.controlLine != null ? `${r.controlLine} 分` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            读法：同一行是“竞争位置相同”的等效分——比如 {year} 年 {score} 分，和上表其它年份对应分数处在同一个位次。
            用它把往年投档线换算到同一把位次尺子上比较，比直接比裸分准。数据来自上海市教育考试院 2021-2026 成绩分布表（逐分），
            各年最高分段官方只公布到“及以上”区间、无法逐分定位。
          </p>
        </>
      ) : (
        <p className={styles.outRange}>这个分数超出了 {year} 年成绩分布表的覆盖范围，无法换算。</p>
      )}
    </div>
  );
}
