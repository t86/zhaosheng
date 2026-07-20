export type ShanghaiScoreRecommendationTier = "reach" | "match" | "safe";
export type ShanghaiScoreRecommendationScoreType = "exact" | "threshold";

type ScoreRankRow = [number, number];

function scoreToRankInRows(rows: ScoreRankRow[] | undefined, score: number): number | null {
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
  for (let i = 0; i < rows.length - 1; i += 1) {
    const hi = rows[i];
    const lo = rows[i + 1];
    if (score <= hi[0] && score > lo[0]) {
      const frac = (hi[0] - score) / (hi[0] - lo[0]);
      return Math.round(hi[1] + frac * (lo[1] - hi[1]));
    }
  }
  return rows[0][1];
}

function rankToScoreInRows(rows: ScoreRankRow[] | undefined, rank: number): number | null {
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
  for (let i = 0; i < rows.length - 1; i += 1) {
    const hi = rows[i];
    const lo = rows[i + 1];
    if (rank >= hi[1] && rank <= lo[1]) {
      const frac = (rank - hi[1]) / (lo[1] - hi[1]);
      return Math.round(hi[0] - frac * (hi[0] - lo[0]));
    }
  }
  return rows[0][0];
}

type AdmissionRecordLike = {
  schoolSlug?: unknown;
  schoolName?: unknown;
  year?: unknown;
  groupCode?: unknown;
  groupName?: unknown;
  score?: unknown;
  minScore?: unknown;
  scoreType?: unknown;
  sourceTrust?: unknown;
  sourceUrl?: unknown;
  sourceLabel?: unknown;
};

type MajorAdmissionRecordLike = {
  schoolSlug?: unknown;
  schoolName?: unknown;
  groupCode?: unknown;
  groupName?: unknown;
  subjectRequirement?: unknown;
  majorName?: unknown;
  admittedCount?: unknown;
  averageScore?: unknown;
  averageRank?: unknown;
  minScoreLabel?: unknown;
  minRankLabel?: unknown;
  sourceUrl?: unknown;
  sourceLabel?: unknown;
};

export type ShanghaiMajorExample = {
  majorName: string;
  admittedCount: number;
  averageScore: number | null;
  averageRank: number | null;
  minScoreLabel: string;
  minRankLabel: string;
};

export type ShanghaiScoreRecommendationCandidate = {
  tier: ShanghaiScoreRecommendationTier;
  schoolSlug: string;
  schoolName: string;
  groupCode: string;
  groupName: string;
  scoreType: ShanghaiScoreRecommendationScoreType;
  scoreLabel: string;
  lineScore: number;
  year: number;
  diff: number;
  comparisonScore: number;
  comparisonYear: number;
  subjectRequirement: string | null;
  sourceUrl: string;
  sourceLabel: string;
  sourceTrust: string;
  majorExamples: ShanghaiMajorExample[];
};

export type ShanghaiScoreRecommendationOptions = {
  majorExampleLimit?: number;
  candidateLimitPerTier?: number;
  subjectRequirement?: string;
  scoreYear?: number;
  scoreRankTable?: unknown;
};

export type ShanghaiScoreRecommendationInput = {
  score: number;
  admissionRecords: AdmissionRecordLike[];
  majorAdmissionRecords: MajorAdmissionRecordLike[];
  options?: ShanghaiScoreRecommendationOptions;
};

export type ShanghaiScoreRecommendationResult = {
  targetScore: number;
  scoreYear: number | null;
  targetRank: number | null;
  equivalentScores: { year: number; score: number | null }[];
  reach: ShanghaiScoreRecommendationCandidate[];
  match: ShanghaiScoreRecommendationCandidate[];
  safe: ShanghaiScoreRecommendationCandidate[];
  totalCounts: Record<ShanghaiScoreRecommendationTier, number>;
  thresholdSchoolCount: number;
};

export const SHANGHAI_RECOMMENDATION_WINDOWS = {
  reachMax: 15,
  matchMin: -10,
  safeMin: -30,
} as const;

const DEFAULT_MAJOR_EXAMPLE_LIMIT = 3;
const DEFAULT_CANDIDATE_LIMIT_PER_TIER = 14;

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asScoreType(value: unknown): ShanghaiScoreRecommendationScoreType | null {
  return value === "exact" || value === "threshold" ? value : null;
}

function getRecordKey(record: { schoolSlug?: unknown; groupCode?: unknown }) {
  return `${asString(record.schoolSlug)}::${asString(record.groupCode)}`;
}

function getNormalizedRecordKey(record: { schoolSlug?: unknown; groupCode?: unknown }) {
  const schoolSlug = asString(record.schoolSlug);
  const groupCode = asString(record.groupCode);
  if (!schoolSlug || groupCode.length < 3) {
    return "";
  }
  return `${schoolSlug}::${groupCode.slice(-3)}`;
}

function classifyDiff(diff: number): ShanghaiScoreRecommendationTier | null {
  if (diff > 0 && diff <= SHANGHAI_RECOMMENDATION_WINDOWS.reachMax) {
    return "reach";
  }
  if (diff <= 0 && diff >= SHANGHAI_RECOMMENDATION_WINDOWS.matchMin) {
    return "match";
  }
  if (diff < SHANGHAI_RECOMMENDATION_WINDOWS.matchMin && diff >= SHANGHAI_RECOMMENDATION_WINDOWS.safeMin) {
    return "safe";
  }
  return null;
}

function classifyRecord(scoreType: ShanghaiScoreRecommendationScoreType, diff: number): ShanghaiScoreRecommendationTier | null {
  if (scoreType === "threshold") {
    return diff <= 0 ? "reach" : null;
  }
  return classifyDiff(diff);
}

const THRESHOLD_SCHOOL_PRIORITY = [
  "fudan-university",
  "shanghai-jiao-tong-university",
  "renmin-university-of-china",
  "zhejiang-university",
  "nanjing-university",
  "university-of-science-and-technology-of-china",
  "beihang-university",
  "beijing-normal-university",
  "tongji-university",
  "east-china-normal-university",
] as const;

function getThresholdPriority(candidate: ShanghaiScoreRecommendationCandidate) {
  const priority = THRESHOLD_SCHOOL_PRIORITY.indexOf(candidate.schoolSlug as (typeof THRESHOLD_SCHOOL_PRIORITY)[number]);
  return priority === -1 ? Number.MAX_SAFE_INTEGER : priority;
}

function getGroupPriority(candidate: ShanghaiScoreRecommendationCandidate) {
  if (candidate.groupCode.includes("Q")) {
    return 2;
  }
  if (candidate.groupName.includes("医学")) {
    return 1;
  }
  return 0;
}

function getScoreRankRows(scoreRankTable: unknown): Record<string, ScoreRankRow[]> | null {
  if (typeof scoreRankTable !== "object" || scoreRankTable == null) {
    return null;
  }
  const table = (scoreRankTable as { table?: unknown }).table;
  if (typeof table !== "object" || table == null) {
    return null;
  }
  return table as Record<string, ScoreRankRow[]>;
}

function buildComparisonContext(score: number, options: ShanghaiScoreRecommendationOptions) {
  const scoreYear = options.scoreYear ?? null;
  const rowsByYear = getScoreRankRows(options.scoreRankTable);

  if (scoreYear == null || !rowsByYear) {
    return {
      scoreYear,
      targetRank: null,
      equivalentScores: [] as { year: number; score: number | null }[],
      getComparisonScore: () => score,
    };
  }

  const targetRank = scoreToRankInRows(rowsByYear[String(scoreYear)], score);
  const years = Object.keys(rowsByYear)
    .map(Number)
    .filter(Number.isFinite)
    .sort((left, right) => right - left);
  const equivalentScores = years.map((year) => ({
    year,
    score: targetRank == null ? null : rankToScoreInRows(rowsByYear[String(year)], targetRank),
  }));

  return {
    scoreYear,
    targetRank,
    equivalentScores,
    getComparisonScore: (year: number) => {
      if (targetRank == null) {
        return score;
      }
      return rankToScoreInRows(rowsByYear[String(year)], targetRank) ?? score;
    },
  };
}

function buildMajorIndex(records: MajorAdmissionRecordLike[]) {
  const majorIndex = new Map<string, MajorAdmissionRecordLike[]>();

  for (const record of records) {
    const majorName = asString(record.majorName);
    const key = getRecordKey(record);
    if (!majorName || key === "::") {
      continue;
    }
    const keys = new Set([key, getNormalizedRecordKey(record)].filter(Boolean));
    for (const indexKey of keys) {
      const current = majorIndex.get(indexKey) ?? [];
      current.push(record);
      majorIndex.set(indexKey, current);
    }
  }

  for (const majors of majorIndex.values()) {
    majors.sort((left, right) => {
      const leftRank = asNumber(left.averageRank) ?? Number.MAX_SAFE_INTEGER;
      const rightRank = asNumber(right.averageRank) ?? Number.MAX_SAFE_INTEGER;
      const leftScore = asNumber(left.averageScore) ?? 0;
      const rightScore = asNumber(right.averageScore) ?? 0;
      return leftRank - rightRank || rightScore - leftScore;
    });
  }

  return majorIndex;
}

function getRelatedMajors(record: AdmissionRecordLike, majorIndex: Map<string, MajorAdmissionRecordLike[]>) {
  return majorIndex.get(getRecordKey(record)) ?? majorIndex.get(getNormalizedRecordKey(record)) ?? [];
}

function getLatestGroups(records: AdmissionRecordLike[]) {
  const latest = new Map<string, AdmissionRecordLike>();

  for (const record of records) {
    const minScore = asNumber(record.minScore);
    const year = asNumber(record.year);
    const scoreType = asScoreType(record.scoreType);
    const recordKey = getRecordKey(record);
    const key = `${recordKey}::${scoreType}`;
    if (!scoreType || minScore == null || year == null || recordKey === "::") {
      continue;
    }

    const current = latest.get(key);
    const currentYear = current ? asNumber(current.year) : null;
    if (!current || currentYear == null || year > currentYear) {
      latest.set(key, record);
    }
  }

  return Array.from(latest.values());
}

function toMajorExamples(records: MajorAdmissionRecordLike[], limit: number): ShanghaiMajorExample[] {
  return records.slice(0, limit).map((record) => ({
    majorName: asString(record.majorName),
    admittedCount: asNumber(record.admittedCount) ?? 0,
    averageScore: asNumber(record.averageScore),
    averageRank: asNumber(record.averageRank),
    minScoreLabel: asString(record.minScoreLabel),
    minRankLabel: asString(record.minRankLabel),
  }));
}

function sortCandidates(
  tier: ShanghaiScoreRecommendationTier,
  candidates: ShanghaiScoreRecommendationCandidate[],
) {
  candidates.sort((left, right) => {
    if (tier === "reach") {
      if (left.scoreType !== right.scoreType) {
        return left.scoreType === "threshold" ? -1 : 1;
      }
      if (left.scoreType === "threshold" && right.scoreType === "threshold") {
        return (
          getThresholdPriority(left) - getThresholdPriority(right) ||
          getGroupPriority(left) - getGroupPriority(right) ||
          right.comparisonScore - left.comparisonScore ||
          left.groupCode.localeCompare(right.groupCode)
        );
      }
      return left.diff - right.diff || right.lineScore - left.lineScore || left.schoolName.localeCompare(right.schoolName);
    }
    return right.lineScore - left.lineScore || Math.abs(left.diff) - Math.abs(right.diff) || left.schoolName.localeCompare(right.schoolName);
  });
}

function takeDisplayCandidates(
  tier: ShanghaiScoreRecommendationTier,
  candidates: ShanghaiScoreRecommendationCandidate[],
  limit: number,
) {
  if (tier !== "reach") {
    return candidates.slice(0, limit);
  }

  const schoolOrder: string[] = [];
  const bySchool = new Map<string, ShanghaiScoreRecommendationCandidate[]>();
  for (const candidate of candidates) {
    const key = candidate.schoolSlug || candidate.schoolName;
    if (!bySchool.has(key)) {
      schoolOrder.push(key);
      bySchool.set(key, []);
    }
    bySchool.get(key)?.push(candidate);
  }

  const selected: ShanghaiScoreRecommendationCandidate[] = [];
  while (selected.length < limit) {
    let added = false;
    for (const school of schoolOrder) {
      const next = bySchool.get(school)?.shift();
      if (!next) {
        continue;
      }
      selected.push(next);
      added = true;
      if (selected.length >= limit) {
        break;
      }
    }
    if (!added) {
      break;
    }
  }

  return selected;
}

export function recommendShanghaiGroupsByScore({
  score,
  admissionRecords,
  majorAdmissionRecords,
  options = {},
}: ShanghaiScoreRecommendationInput): ShanghaiScoreRecommendationResult {
  const majorExampleLimit = options.majorExampleLimit ?? DEFAULT_MAJOR_EXAMPLE_LIMIT;
  const candidateLimitPerTier = options.candidateLimitPerTier ?? DEFAULT_CANDIDATE_LIMIT_PER_TIER;
  const comparisonContext = buildComparisonContext(score, options);
  const majorIndex = buildMajorIndex(majorAdmissionRecords);
  const buckets: Record<ShanghaiScoreRecommendationTier, ShanghaiScoreRecommendationCandidate[]> = {
    reach: [],
    match: [],
    safe: [],
  };

  for (const record of getLatestGroups(admissionRecords)) {
    const lineScore = asNumber(record.minScore);
    const year = asNumber(record.year);
    const scoreType = asScoreType(record.scoreType);
    if (lineScore == null || year == null || !scoreType) {
      continue;
    }
    const comparisonScore = comparisonContext.getComparisonScore(year);
    const diff = lineScore - comparisonScore;
    const tier = classifyRecord(scoreType, diff);
    if (!tier) {
      continue;
    }

    const relatedMajors = getRelatedMajors(record, majorIndex);
    const subjectRequirement = relatedMajors.length > 0 ? asString(relatedMajors[0].subjectRequirement) : null;
    if (options.subjectRequirement && subjectRequirement !== options.subjectRequirement) {
      continue;
    }

    buckets[tier].push({
      tier,
      schoolSlug: asString(record.schoolSlug),
      schoolName: asString(record.schoolName),
      groupCode: asString(record.groupCode),
      groupName: asString(record.groupName),
      scoreType,
      scoreLabel: asString(record.score) || `${lineScore}`,
      lineScore,
      year,
      diff,
      comparisonScore,
      comparisonYear: year,
      subjectRequirement,
      sourceUrl: asString(record.sourceUrl),
      sourceLabel: asString(record.sourceLabel),
      sourceTrust: asString(record.sourceTrust) || "official",
      majorExamples: toMajorExamples(relatedMajors, majorExampleLimit),
    });
  }

  sortCandidates("reach", buckets.reach);
  sortCandidates("match", buckets.match);
  sortCandidates("safe", buckets.safe);

  const thresholdSchools = new Set<string>();
  for (const record of admissionRecords) {
    if (record.scoreType === "threshold") {
      thresholdSchools.add(asString(record.schoolSlug));
    }
  }

  return {
    targetScore: score,
    scoreYear: comparisonContext.scoreYear,
    targetRank: comparisonContext.targetRank,
    equivalentScores: comparisonContext.equivalentScores,
    reach: takeDisplayCandidates("reach", buckets.reach, candidateLimitPerTier),
    match: takeDisplayCandidates("match", buckets.match, candidateLimitPerTier),
    safe: takeDisplayCandidates("safe", buckets.safe, candidateLimitPerTier),
    totalCounts: {
      reach: buckets.reach.length,
      match: buckets.match.length,
      safe: buckets.safe.length,
    },
    thresholdSchoolCount: thresholdSchools.size,
  };
}
