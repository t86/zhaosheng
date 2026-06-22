export type ShanghaiScoreRecommendationTier = "reach" | "match" | "safe";

type AdmissionRecordLike = {
  schoolSlug?: unknown;
  schoolName?: unknown;
  year?: unknown;
  groupCode?: unknown;
  groupName?: unknown;
  minScore?: unknown;
  scoreType?: unknown;
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
  lineScore: number;
  year: number;
  diff: number;
  subjectRequirement: string | null;
  sourceUrl: string;
  sourceLabel: string;
  majorExamples: ShanghaiMajorExample[];
};

export type ShanghaiScoreRecommendationOptions = {
  majorExampleLimit?: number;
  candidateLimitPerTier?: number;
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

function getRecordKey(record: { schoolSlug?: unknown; groupCode?: unknown }) {
  return `${asString(record.schoolSlug)}::${asString(record.groupCode)}`;
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

function buildMajorIndex(records: MajorAdmissionRecordLike[]) {
  const majorIndex = new Map<string, MajorAdmissionRecordLike[]>();

  for (const record of records) {
    const majorName = asString(record.majorName);
    const key = getRecordKey(record);
    if (!majorName || key === "::") {
      continue;
    }
    const current = majorIndex.get(key) ?? [];
    current.push(record);
    majorIndex.set(key, current);
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

function getLatestExactGroups(records: AdmissionRecordLike[]) {
  const latest = new Map<string, AdmissionRecordLike>();

  for (const record of records) {
    const minScore = asNumber(record.minScore);
    const year = asNumber(record.year);
    const key = getRecordKey(record);
    if (record.scoreType !== "exact" || minScore == null || year == null || key === "::") {
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
      return left.diff - right.diff || right.lineScore - left.lineScore || left.schoolName.localeCompare(right.schoolName);
    }
    return right.lineScore - left.lineScore || Math.abs(left.diff) - Math.abs(right.diff) || left.schoolName.localeCompare(right.schoolName);
  });
}

export function recommendShanghaiGroupsByScore({
  score,
  admissionRecords,
  majorAdmissionRecords,
  options = {},
}: ShanghaiScoreRecommendationInput): ShanghaiScoreRecommendationResult {
  const majorExampleLimit = options.majorExampleLimit ?? DEFAULT_MAJOR_EXAMPLE_LIMIT;
  const candidateLimitPerTier = options.candidateLimitPerTier ?? DEFAULT_CANDIDATE_LIMIT_PER_TIER;
  const majorIndex = buildMajorIndex(majorAdmissionRecords);
  const buckets: Record<ShanghaiScoreRecommendationTier, ShanghaiScoreRecommendationCandidate[]> = {
    reach: [],
    match: [],
    safe: [],
  };

  for (const record of getLatestExactGroups(admissionRecords)) {
    const lineScore = asNumber(record.minScore);
    const year = asNumber(record.year);
    if (lineScore == null || year == null) {
      continue;
    }
    const diff = lineScore - score;
    const tier = classifyDiff(diff);
    if (!tier) {
      continue;
    }

    const key = getRecordKey(record);
    const relatedMajors = majorIndex.get(key) ?? [];
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
      lineScore,
      year,
      diff,
      subjectRequirement,
      sourceUrl: asString(record.sourceUrl),
      sourceLabel: asString(record.sourceLabel),
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
    reach: buckets.reach.slice(0, candidateLimitPerTier),
    match: buckets.match.slice(0, candidateLimitPerTier),
    safe: buckets.safe.slice(0, candidateLimitPerTier),
    totalCounts: {
      reach: buckets.reach.length,
      match: buckets.match.length,
      safe: buckets.safe.length,
    },
    thresholdSchoolCount: thresholdSchools.size,
  };
}
