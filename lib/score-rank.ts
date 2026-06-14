import table from "@/data/shanghai/score-rank-table.json";

// 上海高考"位次/等效分"换算。基于各年成绩分布表（一分一段）：
// cumulative = 该分数及以上累计人数 = 该分的最低位次。
// 2021-2024 逐分，2025 为每 10 分锚点（线性插值，结果为近似）。
// 位次法的意义：分数年年波动，位次更稳定；用同一把"位次尺子"跨年对照才不会被裸分误导。

type Row = [number, number]; // [score, cumulative]

const RANK_TABLE = (table as unknown as { table: Record<string, Row[]> }).table;
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

// 分数 → 该年最低位次（线性插值；超出锚点范围则取边界）
export function scoreToRank(year: number, score: number): number | null {
  const rows = RANK_TABLE[String(year)];
  if (!rows || rows.length === 0) {
    return null;
  }
  // rows 按 score 从高到低
  if (score >= rows[0][0]) {
    return rows[0][1];
  }
  const last = rows[rows.length - 1];
  if (score <= last[0]) {
    return last[1];
  }
  for (let i = 0; i < rows.length - 1; i++) {
    const hi = rows[i]; // 高分、位次小
    const lo = rows[i + 1]; // 低分、位次大
    if (score <= hi[0] && score > lo[0]) {
      const frac = (hi[0] - score) / (hi[0] - lo[0]);
      return Math.round(hi[1] + frac * (lo[1] - hi[1]));
    }
  }
  return null;
}

// 位次 → 该年对应分数（线性插值）
export function rankToScore(year: number, rank: number): number | null {
  const rows = RANK_TABLE[String(year)];
  if (!rows || rows.length === 0) {
    return null;
  }
  if (rank <= rows[0][1]) {
    return rows[0][0];
  }
  const last = rows[rows.length - 1];
  if (rank >= last[1]) {
    return last[0];
  }
  for (let i = 0; i < rows.length - 1; i++) {
    const hi = rows[i]; // 位次小、分高
    const lo = rows[i + 1]; // 位次大、分低
    if (rank >= hi[1] && rank <= lo[1]) {
      const frac = (rank - hi[1]) / (lo[1] - hi[1]);
      return Math.round(hi[0] - frac * (hi[0] - lo[0]));
    }
  }
  return null;
}

// 等效分：某年某分 → 另一年同位次大约对应多少分
export function equivalentScore(fromYear: number, score: number, toYear: number): number | null {
  const rank = scoreToRank(fromYear, score);
  if (rank == null) {
    return null;
  }
  return rankToScore(toYear, rank);
}

// 一个分数在所有可用年份的等效分 + 位次（用于横向展示"同一竞争位置逐年是多少分"）
export function equivalentAcrossYears(
  baseYear: number,
  score: number,
): { year: number; score: number | null; rank: number | null }[] {
  const rank = scoreToRank(baseYear, score);
  return rankYears.map((year) => ({
    year,
    score: year === baseYear ? score : equivalentScore(baseYear, score, year),
    rank: rank == null ? null : scoreToRank(year, equivalentScore(baseYear, score, year) ?? score),
  }));
}
