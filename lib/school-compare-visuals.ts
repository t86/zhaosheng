import type { CompareRow } from "@/lib/build-compare-row";

export type AdvancementMetric = {
  slug: string;
  name: string;
  tuimianRate: number | null;
  tuimianComputed: boolean;
  advanceRate: number | null;
  abroadRate: number | null;
  cohort: string | null;
};

export type ScoreMetric = {
  slug: string;
  name: string;
  minScore: number | null;
  groupName: string | null;
  year: number | null;
  scoreType: "threshold" | "exact" | null;
};

export type CompareVisualMetrics = {
  schools: { slug: string; name: string; city: string | null; schoolType: string | null }[];
  advancementComparison: AdvancementMetric[];
  scoreComparison: ScoreMetric[];
  directionsOverlap: string[];
  uniqueDirections: Record<string, string[]>;
  maxTuimianRate: number;
  maxAdvanceRate: number;
};

export type CompareVerdictSummary = {
  highlights: string[];
  takeaway: string;
};

export function generateCompareVisualMetrics(rows: CompareRow[]): CompareVisualMetrics {
  const schools = rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    city: r.city,
    schoolType: r.schoolType,
  }));

  const advancementComparison: AdvancementMetric[] = rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    tuimianRate: r.tuimianRate,
    tuimianComputed: r.tuimianComputed,
    advanceRate: r.advanceRate,
    abroadRate: r.abroadRate,
    cohort: r.advancementCohort,
  }));

  const scoreComparison: ScoreMetric[] = rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    minScore: r.minScore?.minScore ?? null,
    groupName: r.minScore?.groupName ?? null,
    year: r.minScore?.year ?? null,
    scoreType: r.minScore?.scoreType ?? null,
  }));

  // 计算优势方向交集与各自特色
  const allDirLists = rows.map((r) => r.directions);
  const dirCounts = new Map<string, number>();
  for (const list of allDirLists) {
    for (const d of list) {
      dirCounts.set(d, (dirCounts.get(d) ?? 0) + 1);
    }
  }

  const directionsOverlap = Array.from(dirCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([dir]) => dir);

  const uniqueDirections: Record<string, string[]> = {};
  for (const r of rows) {
    uniqueDirections[r.slug] = r.directions.filter((d) => (dirCounts.get(d) ?? 0) === 1);
  }

  const maxTuimianRate = Math.max(
    50,
    ...rows.map((r) => r.tuimianRate ?? 0),
  );
  const maxAdvanceRate = Math.max(
    80,
    ...rows.map((r) => r.advanceRate ?? 0),
  );

  return {
    schools,
    advancementComparison,
    scoreComparison,
    directionsOverlap,
    uniqueDirections,
    maxTuimianRate,
    maxAdvanceRate,
  };
}

export function getCompareVerdictSummary(rows: CompareRow[]): CompareVerdictSummary {
  if (rows.length === 0) {
    return { highlights: [], takeaway: "请选择学校开始对比。" };
  }

  const highlights: string[] = [];

  // 1. 保研与深造对比
  const withTuimian = rows.filter((r) => r.tuimianRate != null);
  if (withTuimian.length >= 2) {
    const sortedTuimian = [...withTuimian].sort((a, b) => (b.tuimianRate ?? 0) - (a.tuimianRate ?? 0));
    const highest = sortedTuimian[0];
    const lowest = sortedTuimian[sortedTuimian.length - 1];
    const diff = ((highest.tuimianRate ?? 0) - (lowest.tuimianRate ?? 0)).toFixed(1);
    highlights.push(
      `保研深造：${highest.name} 推免率最高（${highest.tuimianRate}%），相比 ${lowest.name}（${lowest.tuimianRate}%）高约 ${diff} 个百分点。`,
    );
  }

  // 2. 投档线与录取门槛对比
  const withScore = rows.filter((r) => r.minScore != null && r.minScore.scoreType === "exact");
  if (withScore.length >= 2) {
    const sortedScore = [...withScore].sort((a, b) => (b.minScore?.minScore ?? 0) - (a.minScore?.minScore ?? 0));
    const highest = sortedScore[0];
    const lowest = sortedScore[sortedScore.length - 1];
    const scoreDiff = (highest.minScore?.minScore ?? 0) - (lowest.minScore?.minScore ?? 0);
    if (scoreDiff > 0) {
      highlights.push(
        `在沪录取门槛：${highest.name} 最近一年最低组线（${highest.minScore?.minScore}分）高于 ${lowest.name}（${lowest.minScore?.minScore}分），分差约 ${scoreDiff} 分。`,
      );
    }
  }

  // 3. 转专业与培养机制对比
  const withFreedom = rows.filter((r) => r.transferFreedom != null);
  if (withFreedom.length >= 2) {
    const relaxed = withFreedom.filter((r) => r.transferFreedom === "宽松");
    if (relaxed.length > 0) {
      highlights.push(
        `转专业政策：${relaxed.map((r) => r.name).join("、")} 转专业整体较宽松（零门槛或多次机会），对专业被调剂后的后备挽救更有利。`,
      );
    }
  }

  // 4. 地域与学科特色
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean)));
  if (cities.length > 1) {
    highlights.push(`地域分布跨越 ${cities.join(" 与 ")}，若考虑本地实习与校友网络，建议重点结合未来就业目标城市。`);
  }

  let takeaway = "两校/三校各有侧重：若看重未来读研与学术发展，优先对比保研推免率；若看重专业满意度，关注转专业难度；若冲刺顶尖王牌，关注具体专业组而非仅看学校线。";
  if (rows.length === 2) {
    takeaway = `在 ${rows[0].name} 与 ${rows[1].name} 之间做选择时：如果分数能够到两校强势专业，按学科兴趣和城市发展优先；如果是压线进校，务必重点权衡组内专业调剂风险与转专业自由度。`;
  }

  return {
    highlights,
    takeaway,
  };
}
