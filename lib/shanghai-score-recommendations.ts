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
  sourceUrl?: unknown;
  sourceLabel?: unknown;
  sourceTrust?: unknown;
};

type MajorAdmissionRecordLike = {
  year?: unknown;
  referenceAdmissionYear?: unknown;
  schoolSlug?: unknown;
  schoolName?: unknown;
  groupCode?: unknown;
  groupName?: unknown;
  subjectRequirement?: unknown;
  plan2026?: unknown;
  tuition?: unknown;
  duration?: unknown;
  languageRequirement?: unknown;
  remarks?: unknown;
  majorName?: unknown;
  admittedCount?: unknown;
  admittedCount2025?: unknown;
  averageScore?: unknown;
  averageScore2025?: unknown;
  averageRank?: unknown;
  averageRank2025?: unknown;
  minScoreLabel?: unknown;
  minRankLabel?: unknown;
  sourceUrl?: unknown;
  sourceLabel?: unknown;
  sourceTrust?: unknown;
  planSourceLabel?: unknown;
  referenceSourceLabel?: unknown;
  planSourceTrust?: unknown;
  referenceSourceTrust?: unknown;
};

export type ShanghaiMajorExample = {
  majorName: string;
  plan2026?: number | null;
  tuition?: number | null;
  duration?: string;
  languageRequirement?: string;
  remarks?: string;
  admittedCount?: number | null;
  referenceAdmissionYear?: number | null;
  averageScore?: number | null;
  averageRank?: number | null;
  minScoreLabel?: string;
  minRankLabel?: string;
  sourceTrust?: string;
  sourceLabel?: string;
  planSourceTrust?: string;
  planSourceLabel?: string;
  referenceSourceTrust?: string;
  referenceSourceLabel?: string;
};

export type ShanghaiScoreRecommendationCandidate = {
  tier: ShanghaiScoreRecommendationTier;
  schoolSlug?: string;
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
  subjectRequirement?: string | null;
  sourceUrl?: string;
  sourceLabel?: string;
  sourceTrust: string;
  majorExamples: ShanghaiMajorExample[];
};

export type ShanghaiScoreRecommendationOptions = {
  majorExampleLimit?: number;
  candidateLimitPerTier?: number;
  scoreRankTable?: Record<string, unknown>;
  scoreYear?: number;
  subjectRequirement?: string;
};

export type ShanghaiScoreRecommendationInput = {
  score: number;
  admissionRecords: AdmissionRecordLike[];
  majorAdmissionRecords: MajorAdmissionRecordLike[];
  options?: ShanghaiScoreRecommendationOptions;
};

export type ShanghaiScoreRecommendationResult = {
  targetScore: number;
  scoreYear: number;
  targetRank: number | null;
  equivalentScores: {
    year: number;
    score: number | null;
  }[];
  reach: ShanghaiScoreRecommendationCandidate[];
  match: ShanghaiScoreRecommendationCandidate[];
  safe: ShanghaiScoreRecommendationCandidate[];
  totalCounts: {
    reach: number;
    match: number;
    safe: number;
  };
  thresholdSchoolCount: number;
};

const DEFAULT_MAJOR_EXAMPLE_LIMIT = 3;
const DEFAULT_CANDIDATE_LIMIT_PER_TIER = 8;
const DEFAULT_SCORE_YEAR = 2026;

const PRIORITY_SLUGS = [
  "fudan-university",
  "shanghai-jiao-tong-university",
  "tsinghua-university",
  "peking-university",
  "tongji-university",
  "zhejiang-university",
  "nanjing-university",
  "university-of-science-and-technology-of-china",
  "beihang-university",
];

function getPriority(slug?: string) {
  const idx = PRIORITY_SLUGS.indexOf(slug ?? "");
  return idx >= 0 ? idx : 999;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value.trim());
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}

function asScoreType(value: unknown): ShanghaiScoreRecommendationScoreType | undefined {
  if (value === "exact" || value === "threshold") {
    return value;
  }
  return undefined;
}

function getRecordKey(record: AdmissionRecordLike | MajorAdmissionRecordLike) {
  const schoolSlug = asString(record.schoolSlug) ?? "";
  const groupCode = asString(record.groupCode) ?? "";
  return `${schoolSlug}::${groupCode}`;
}

function getNormalizedRecordKey(record: AdmissionRecordLike | MajorAdmissionRecordLike) {
  const schoolSlug = asString(record.schoolSlug) ?? "";
  const groupCode = asString(record.groupCode) ?? "";
  const normalizedGroupCode = groupCode.replace(/^0+/, "");
  return `${schoolSlug}::${normalizedGroupCode}`;
}

function classifyRecord(scoreType: ShanghaiScoreRecommendationScoreType, diff: number): ShanghaiScoreRecommendationTier | null {
  if (scoreType === "threshold") {
    // 580分及以上门槛高校（如复旦、交大）：仅当考生换算分在 580 附近（分差 diff <= 10，即约 570分以上）时才作为冲刺推荐
    if (diff <= 10) {
      return "reach";
    }
    return null;
  }
  if (diff >= 1 && diff <= 10) {
    return "reach";
  }
  if (diff >= -5 && diff <= 0) {
    return "match";
  }
  if (diff >= -20 && diff < -5) {
    return "safe";
  }
  return null;
}

function sortCandidates(
  tier: ShanghaiScoreRecommendationTier,
  candidates: ShanghaiScoreRecommendationCandidate[],
) {
  candidates.sort((left, right) => {
    if (tier === "reach") {
      const leftThreshold = left.scoreType === "threshold" ? 1 : 0;
      const rightThreshold = right.scoreType === "threshold" ? 1 : 0;
      if (leftThreshold !== rightThreshold) {
        return rightThreshold - leftThreshold;
      }
      if (left.scoreType === "threshold" && right.scoreType === "threshold") {
        const pLeft = getPriority(left.schoolSlug);
        const pRight = getPriority(right.schoolSlug);
        if (pLeft !== pRight) {
          return pLeft - pRight;
        }
      }
      return left.diff - right.diff || right.year - left.year || left.schoolName.localeCompare(right.schoolName);
    }
    if (tier === "match") {
      return right.diff - left.diff || right.year - left.year || left.schoolName.localeCompare(right.schoolName);
    }
    return right.diff - left.diff || right.year - left.year || left.schoolName.localeCompare(right.schoolName);
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

  const thresholdCandidates = candidates.filter((candidate) => candidate.scoreType === "threshold");
  const exactCandidates = candidates.filter((candidate) => candidate.scoreType === "exact");

  if (exactCandidates.length === 0) {
    return thresholdCandidates.slice(0, limit);
  }

  if (thresholdCandidates.length === 0) {
    return exactCandidates.slice(0, limit);
  }

  // 保证门槛线候选高校多样化（如复旦、交大各占前列名额）
  const uniqueThresholdBySchool: ShanghaiScoreRecommendationCandidate[] = [];
  const seenThresholdSchools = new Set<string>();
  const remainingThreshold: ShanghaiScoreRecommendationCandidate[] = [];
  for (const c of thresholdCandidates) {
    if (!seenThresholdSchools.has(c.schoolName)) {
      seenThresholdSchools.add(c.schoolName);
      uniqueThresholdBySchool.push(c);
    } else {
      remainingThreshold.push(c);
    }
  }
  const orderedThreshold = [...uniqueThresholdBySchool, ...remainingThreshold];

  const thresholdLimit = Math.min(orderedThreshold.length, Math.max(1, Math.floor(limit / 2)));
  const exactLimit = limit - thresholdLimit;
  const picked = [...orderedThreshold.slice(0, thresholdLimit), ...exactCandidates.slice(0, exactLimit)];
  sortCandidates(tier, picked);
  return picked;
}

function buildComparisonContext(score: number, options: ShanghaiScoreRecommendationOptions) {
  const scoreYear = options.scoreYear ?? DEFAULT_SCORE_YEAR;
  const scoreRankTable = options.scoreRankTable;
  if (!scoreRankTable) {
    return {
      scoreYear,
      targetRank: null,
      equivalentScores: [],
      getComparisonScore: () => score,
    };
  }

  const rowsByYear = ((scoreRankTable.rowsByYear ?? scoreRankTable.table ?? {}) as Record<string, ScoreRankRow[] | undefined>);
  const years = Array.isArray(scoreRankTable.years)
    ? (scoreRankTable.years as number[])
    : Object.keys(rowsByYear).map(Number).filter((year) => !Number.isNaN(year)).sort();
  const targetRank = scoreToRankInRows(rowsByYear[String(scoreYear)], score);

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
    majors.sort(compareMajorExampleRecords);
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

function hasPlanReference(record: MajorAdmissionRecordLike) {
  return asNumber(record.plan2026) != null;
}

function getMajorRecordAverageRank(record: MajorAdmissionRecordLike) {
  return asNumber(record.averageRank) ?? asNumber(record.averageRank2025);
}

function getMajorRecordAverageScore(record: MajorAdmissionRecordLike) {
  return asNumber(record.averageScore) ?? asNumber(record.averageScore2025);
}

function compareMajorExampleRecords(left: MajorAdmissionRecordLike, right: MajorAdmissionRecordLike) {
  const leftRank = getMajorRecordAverageRank(left) ?? Number.MAX_SAFE_INTEGER;
  const rightRank = getMajorRecordAverageRank(right) ?? Number.MAX_SAFE_INTEGER;
  const leftScore = getMajorRecordAverageScore(left) ?? 0;
  const rightScore = getMajorRecordAverageScore(right) ?? 0;
  const leftPlanPriority = hasPlanReference(left) ? 0 : 1;
  const rightPlanPriority = hasPlanReference(right) ? 0 : 1;

  return leftRank - rightRank || rightScore - leftScore || leftPlanPriority - rightPlanPriority;
}

function dedupeMajorExampleRecords(records: MajorAdmissionRecordLike[]) {
  const byMajorName = new Map<string, MajorAdmissionRecordLike>();
  for (const record of records) {
    const majorName = asString(record.majorName);
    if (!majorName) {
      continue;
    }
    const current = byMajorName.get(majorName);
    if (!current || compareMajorExampleRecords(record, current) < 0) {
      byMajorName.set(majorName, record);
    }
  }
  return Array.from(byMajorName.values()).sort(compareMajorExampleRecords);
}

function toMajorExamples(records: MajorAdmissionRecordLike[], limit: number): ShanghaiMajorExample[] {
  return dedupeMajorExampleRecords(records).slice(0, limit).map((record) => ({
    majorName: asString(record.majorName) ?? "",
    plan2026: asNumber(record.plan2026),
    tuition: asNumber(record.tuition),
    duration: asString(record.duration),
    languageRequirement: asString(record.languageRequirement),
    remarks: asString(record.remarks),
    admittedCount: asNumber(record.admittedCount) ?? asNumber(record.admittedCount2025) ?? 0,
    referenceAdmissionYear: asNumber(record.referenceAdmissionYear) ?? asNumber(record.year),
    averageScore: getMajorRecordAverageScore(record),
    averageRank: getMajorRecordAverageRank(record),
    minScoreLabel: asString(record.minScoreLabel),
    minRankLabel: asString(record.minRankLabel),
    sourceTrust: asString(record.sourceTrust),
    sourceLabel: asString(record.sourceLabel),
    planSourceTrust: asString(record.planSourceTrust),
    planSourceLabel: asString(record.planSourceLabel),
    referenceSourceTrust: asString(record.referenceSourceTrust),
    referenceSourceLabel: asString(record.referenceSourceLabel),
  }));
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
      schoolName: asString(record.schoolName) ?? "",
      groupCode: asString(record.groupCode) ?? "",
      groupName: asString(record.groupName) ?? "",
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
      const slug = asString(record.schoolSlug);
      if (slug) {
        thresholdSchools.add(slug);
      }
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
