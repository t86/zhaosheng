export type ShanghaiEstimatedGroupRecord = {
  estimatedScore: number;
  schoolName: string;
  schoolAlias: string;
  schoolSlug: string | null;
  groupName: string;
  groupCode: string;
  line2025: number | null;
  sourceImage: string;
};

export type ShanghaiEstimatedGroupDataset = {
  meta?: {
    year?: unknown;
    sourceLabel?: unknown;
    sourceType?: unknown;
    scope?: unknown;
    notes?: unknown;
  };
  records?: unknown;
};

export type ShanghaiEstimatedGroupMatch = ShanghaiEstimatedGroupRecord & {
  diff: number;
};

export type ShanghaiEstimatedGroupSummary = {
  year: number | null;
  sourceType: string;
  sourceLabel: string;
  recordCount: number;
  localShanghaiCount: number;
};

export type ShanghaiEstimatedGroupLookupOptions = {
  score: number;
  window?: number;
  limit?: number;
};

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNullableString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function toEstimatedRecord(value: unknown): ShanghaiEstimatedGroupRecord | null {
  if (typeof value !== "object" || value == null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const estimatedScore = asNumber(record.estimatedScore);
  const schoolName = asString(record.schoolName);
  const schoolAlias = asString(record.schoolAlias);
  const groupName = asString(record.groupName);
  const groupCode = asString(record.groupCode);

  if (estimatedScore == null || !schoolName || !schoolAlias || !groupName || !groupCode) {
    return null;
  }

  return {
    estimatedScore,
    schoolName,
    schoolAlias,
    schoolSlug: asNullableString(record.schoolSlug),
    groupName,
    groupCode,
    line2025: asNumber(record.line2025),
    sourceImage: asString(record.sourceImage),
  };
}

export function getShanghaiEstimatedGroupRecords(dataset: unknown): ShanghaiEstimatedGroupRecord[] {
  if (typeof dataset !== "object" || dataset == null) {
    return [];
  }

  const records = (dataset as ShanghaiEstimatedGroupDataset).records;
  if (!Array.isArray(records)) {
    return [];
  }

  return records
    .map(toEstimatedRecord)
    .filter((record): record is ShanghaiEstimatedGroupRecord => record !== null);
}

export function getShanghaiEstimatedGroupSummary(dataset: unknown): ShanghaiEstimatedGroupSummary {
  const data = typeof dataset === "object" && dataset != null ? (dataset as ShanghaiEstimatedGroupDataset) : {};
  const records = getShanghaiEstimatedGroupRecords(dataset);

  return {
    year: asNumber(data.meta?.year),
    sourceType: asString(data.meta?.sourceType),
    sourceLabel: asString(data.meta?.sourceLabel),
    recordCount: records.length,
    localShanghaiCount: records.length,
  };
}

export function findShanghaiEstimatedGroupsByScore(
  dataset: unknown,
  { score, window = 3, limit = 12 }: ShanghaiEstimatedGroupLookupOptions,
): ShanghaiEstimatedGroupMatch[] {
  if (!Number.isFinite(score)) {
    return [];
  }

  return getShanghaiEstimatedGroupRecords(dataset)
    .map((record) => ({
      ...record,
      diff: record.estimatedScore - score,
    }))
    .filter((record) => Math.abs(record.diff) <= window)
    .sort(
      (left, right) =>
        Math.abs(left.diff) - Math.abs(right.diff) ||
        right.estimatedScore - left.estimatedScore ||
        (right.line2025 ?? 0) - (left.line2025 ?? 0) ||
        left.schoolName.localeCompare(right.schoolName) ||
        left.groupCode.localeCompare(right.groupCode),
    )
    .slice(0, limit);
}
