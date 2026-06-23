export type ScoreRankRow = [number, number]; // [score, cumulative]

// 分数 → 该年最低位次（线性插值）。超出数据范围（高于最高锚点或低于最低锚点）返回 null。
export function scoreToRankInRows(rows: ScoreRankRow[] | undefined, score: number): number | null {
  if (!rows || rows.length === 0) {
    return null;
  }
  if (score > rows[0][0]) {
    return null;
  }
  const last = rows[rows.length - 1];
  if (score < last[0]) {
    return null;
  }
  if (score === last[0]) {
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
  return rows[0][1];
}

// 位次 → 该年对应分数（线性插值）。位次优于最高锚点（即在前 ~50 名内、超出数据）返回 null。
export function rankToScoreInRows(rows: ScoreRankRow[] | undefined, rank: number): number | null {
  if (!rows || rows.length === 0) {
    return null;
  }
  if (rank < rows[0][1]) {
    return null;
  }
  const last = rows[rows.length - 1];
  if (rank > last[1]) {
    return null;
  }
  for (let i = 0; i < rows.length - 1; i++) {
    const hi = rows[i]; // 位次小、分高
    const lo = rows[i + 1]; // 位次大、分低
    if (rank >= hi[1] && rank <= lo[1]) {
      const frac = (rank - hi[1]) / (lo[1] - hi[1]);
      return Math.round(hi[0] - frac * (hi[0] - lo[0]));
    }
  }
  return rows[0][0];
}
