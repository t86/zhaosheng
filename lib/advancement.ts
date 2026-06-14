import { advancementStats } from "@/data/advancement-stats";
import type { AdvancementStat } from "@/data/advancement-types";

export type AdvancementTier = "顶尖" | "高" | "中" | "一般";

const bySlug = new Map(advancementStats.map((stat) => [stat.slug, stat]));

export function getAdvancementStat(slug: string): AdvancementStat | undefined {
  return bySlug.get(slug);
}

export function tuimianTier(rate: number | null): AdvancementTier | null {
  if (rate == null) {
    return null;
  }
  if (rate >= 40) return "顶尖";
  if (rate >= 25) return "高";
  if (rate >= 15) return "中";
  return "一般";
}

export function advanceTier(rate: number | null): AdvancementTier | null {
  if (rate == null) {
    return null;
  }
  if (rate >= 70) return "顶尖";
  if (rate >= 55) return "高";
  if (rate >= 40) return "中";
  return "一般";
}

// 在"有该指标数据"的学校中，该校从高到低排第几（1 = 最高）；无数据返回 null
function rankAmong(
  slug: string,
  pick: (stat: AdvancementStat) => number | null,
): { rank: number; total: number } | null {
  const withData = advancementStats
    .filter((stat) => pick(stat) != null)
    .sort((a, b) => (pick(b) as number) - (pick(a) as number));
  const idx = withData.findIndex((stat) => stat.slug === slug);
  if (idx < 0) {
    return null;
  }
  return { rank: idx + 1, total: withData.length };
}

export function getTuimianRank(slug: string) {
  return rankAmong(slug, (stat) => stat.tuimianRate);
}

export function getAdvanceRank(slug: string) {
  return rankAmong(slug, (stat) => stat.advanceRate);
}

// 横向对比表用：默认按深造率（缺失则按保研率）从高到低
export function getComparisonRows(): AdvancementStat[] {
  return [...advancementStats]
    .filter((stat) => stat.advanceRate != null || stat.tuimianRate != null)
    .sort((a, b) => {
      const av = a.advanceRate ?? a.tuimianRate ?? -1;
      const bv = b.advanceRate ?? b.tuimianRate ?? -1;
      return bv - av;
    });
}
