import { getSchool } from "@/lib/schools";
import { getAdvancementStat } from "@/lib/advancement";
import { getSchoolDepth } from "@/data/school-depth/index";
import { getShanghaiAdmissionsForSchool } from "@/lib/shanghai-admissions";
import { matchMajorSalaries, type MajorSalaryMatch } from "@/lib/major-salary-match";

// 把分散在各数据源里的"决策维度"按 slug 拼成一行，供并排对比表使用。
// 口径铁律：任何拿不到/官方未单列的字段一律置 null（页面显示"—"），绝不编造或估算。

export type CompareMinScore = {
  // 最近一年的最低投档线（取该校所有专业组里 minScore 最小的一组）
  year: number;
  groupName: string;
  groupCode: string;
  score: string; // 原始展示字符串，可能是 "投档线 580" 这类
  minScore: number;
  scoreType: "threshold" | "exact"; // threshold=控制线/最低位，exact=精确投档线
};

export type CompareRow = {
  slug: string;
  name: string;
  // 基础画像
  city: string | null;
  schoolType: string | null;
  // 代表方向（majorHighlights 前几个）
  directions: string[];
  // 最近一年最低组线（缺则 null）
  minScore: CompareMinScore | null;
  // 深造数据（缺则 null）
  tuimianRate: number | null;
  tuimianComputed: boolean; // true=按推免公示反算，非报告直给
  advanceRate: number | null;
  abroadRate: number | null;
  advancementCohort: string | null; // 数据届次，如「2024届」
  // 转专业自由度
  transferFreedom: "宽松" | "有条件" | "较受限" | null;
  // 一句优势 / 一句短板
  strength: string | null;
  watchout: string | null;
  tagline: string | null;
  // 王牌专业全国薪资量级（全国同名专业口径，非本校实测）
  majorSalaries: MajorSalaryMatch[];
  // 该 slug 是否能在各数据源里找到
  found: boolean;
};

const MAX_DIRECTIONS = 4;

function pickLatestMinScore(slug: string): CompareMinScore | null {
  const records = getShanghaiAdmissionsForSchool(slug);
  if (records.length === 0) {
    return null;
  }

  // records 已按 year 降序排序，取最近一年
  const latestYear = records[0].year;
  const sameYear = records.filter(
    (record) => record.year === latestYear && record.minScore != null,
  );
  if (sameYear.length === 0) {
    return null;
  }

  // 同一年里取最低分的那一组（最容易进的口径），作为该校"最低组线"
  const lowest = sameYear.reduce((min, record) =>
    (record.minScore as number) < (min.minScore as number) ? record : min,
  );

  return {
    year: lowest.year,
    groupName: lowest.groupName,
    groupCode: lowest.groupCode,
    score: lowest.score,
    minScore: lowest.minScore as number,
    scoreType: lowest.scoreType,
  };
}

export function buildCompareRow(slug: string): CompareRow {
  const school = getSchool(slug);
  const advancement = getAdvancementStat(slug);
  const depth = getSchoolDepth(slug);

  const directions = (school?.majorHighlights ?? []).slice(0, MAX_DIRECTIONS);
  const majorSalaries =
    directions.length > 0 ? matchMajorSalaries(directions) : [];

  return {
    slug,
    name: school?.name ?? slug,
    city: school?.city ?? null,
    schoolType: school?.schoolType ?? null,
    directions,
    minScore: pickLatestMinScore(slug),
    tuimianRate: advancement?.tuimianRate ?? null,
    tuimianComputed: Boolean(advancement?.tuimianComputed),
    advanceRate: advancement?.advanceRate ?? null,
    abroadRate: advancement?.abroadRate ?? null,
    advancementCohort:
      advancement && advancement.cohort !== "none" ? advancement.cohort : null,
    transferFreedom: depth?.transferMajor.freedom ?? null,
    strength: depth?.strengths[0]?.title ?? null,
    watchout: depth?.watchouts[0]?.title ?? null,
    tagline: depth?.tagline ?? null,
    majorSalaries,
    found: Boolean(school),
  };
}
