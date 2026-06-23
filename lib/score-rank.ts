import table from "@/data/shanghai/score-rank-table.json";
import { rankToScoreInRows, scoreToRankInRows, type ScoreRankRow } from "./score-rank-core";

// 上海高考"位次/等效分"换算。基于各年成绩分布表（一分一段）：
// cumulative = 该分数及以上累计人数 = 该分的最低位次。
// 2021-2026 均为逐分；各年覆盖到站内已录入的最低公开锚点。
// 重要：官方成绩分布表顶端只公布到约 615-623 分（约全市前 50 名）"及以上"为一个桶，
// 再往上不逐分公布——因此高分段（约 620 分以上）无法精确定位位次，本工具对超出范围的
// 输入一律返回 null（如实显示"无法定位"），不向上外推、不假装能算。

const RANK_TABLE = (table as unknown as { table: Record<string, ScoreRankRow[]> }).table;
const YEAR_META = (
  table as unknown as {
    meta: { years: Record<string, { controlLine: number | null; sparse: boolean }> };
  }
).meta.years;

export const rankYears = Object.keys(RANK_TABLE)
  .map(Number)
  .sort((a, b) => b - a);

export function getControlLine(year: number): number | null {
  return YEAR_META[String(year)]?.controlLine ?? null;
}

export function isYearSparse(year: number): boolean {
  return YEAR_META[String(year)]?.sparse ?? false;
}

// 该年成绩分布表覆盖的分数上限（最高锚点）。超过它就无法定位位次。
export function getTopScore(year: number): number | null {
  const rows = RANK_TABLE[String(year)];
  return rows && rows.length ? rows[0][0] : null;
}

// 分数 → 该年最低位次（线性插值）。超出数据范围（高于最高锚点或低于最低锚点）返回 null。
export function scoreToRank(year: number, score: number): number | null {
  return scoreToRankInRows(RANK_TABLE[String(year)], score);
}

// 位次 → 该年对应分数（线性插值）。位次优于最高锚点（即在前 ~50 名内、超出数据）返回 null。
export function rankToScore(year: number, rank: number): number | null {
  return rankToScoreInRows(RANK_TABLE[String(year)], rank);
}

// 等效分：某年某分 → 另一年同位次大约对应多少分（任一端超范围返回 null）
export function equivalentScore(fromYear: number, score: number, toYear: number): number | null {
  const rank = scoreToRank(fromYear, score);
  if (rank == null) {
    return null;
  }
  return rankToScore(toYear, rank);
}

// 一个分数对应的位次，在各年的等效分（同一位次=同一竞争位置）。
// 位次恒定（就是 baseRank）；某年若该位次超出数据范围，score 为 null。
export function equivalentAcrossYears(
  baseYear: number,
  score: number,
): { baseRank: number | null; rows: { year: number; score: number | null; controlLine: number | null }[] } {
  const baseRank = scoreToRank(baseYear, score);
  const rows = rankYears.map((year) => ({
    year,
    score: baseRank == null ? null : year === baseYear ? score : rankToScore(year, baseRank),
    controlLine: getControlLine(year),
  }));
  return { baseRank, rows };
}
