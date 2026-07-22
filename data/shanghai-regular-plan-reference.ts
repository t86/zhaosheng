import dataset from "@/data/shanghai/regular-2026-plan-reference.json";

export type ShanghaiRegularPlanReferenceMajor = {
  sourceRow: number;
  majorCode: string;
  majorName: string;
  plan2026: number | null;
  tuition: number | null;
  admittedCount2025: number | null;
  minScoreLabel: string;
  minScore2025: number | null;
  minRankLabel: string;
  averageScore2025: number | null;
  averageRank2025: number | null;
};

export type ShanghaiRegularPlanReferenceGroup = {
  schoolSlug: string;
  schoolName: string;
  schoolAlias: string;
  schoolRegion: string;
  category: string;
  groupCode: string;
  groupName: string;
  groupSuffix: string;
  subjectRequirement: string;
  groupPlan2026: number | null;
  groupLine2026Label: string;
  groupLine2026: number | null;
  groupLine2026Type: "exact" | "threshold" | null;
  groupAdmittedCount2025: number | null;
  groupMinScore2025Label: string;
  groupMinScore2025: number | null;
  groupAverageScore2025: number | null;
  groupAverageRank2025: number | null;
  officialSourceType: string;
  officialSourceUrl: string;
  majors: ShanghaiRegularPlanReferenceMajor[];
};

export type ShanghaiRegularPlanReferenceMeta = {
  region: string;
  year: number;
  referenceAdmissionYear: number;
  batch: "本科普通批次";
  grain: string;
  sourceTrust: "third-party-reference";
  sourceLabel: string;
  sourceFile: string;
  sourceQuality: string;
  generatedAt: string;
  recordCount: number;
  groupCount: number;
  schoolCount: number;
  matchedOfficialGroupCount: number;
  unmatchedGroupCount: number;
  groupPlan2026Total: number;
  majorPlan2026Total: number;
  categoryCounts: Record<string, number>;
  subjectRequirementCounts: Record<string, number>;
  unmatchedGroups: {
    rowNumber: number;
    schoolName: string;
    groupName: string;
    subjectRequirement: string;
    groupPlan2026: number | null;
  }[];
  notes: string[];
};

type ShanghaiRegularPlanReferenceDataset = {
  meta: ShanghaiRegularPlanReferenceMeta;
  groups: ShanghaiRegularPlanReferenceGroup[];
};

const regularPlanReferenceDataset = dataset as ShanghaiRegularPlanReferenceDataset;

export const shanghaiRegularPlanReferenceMeta = regularPlanReferenceDataset.meta;
export const shanghaiRegularPlanReferenceGroups = regularPlanReferenceDataset.groups;

export const shanghaiRegularPlanReferenceMajorRecords = shanghaiRegularPlanReferenceGroups.flatMap((group) =>
  group.majors.map((major) => ({
    year: shanghaiRegularPlanReferenceMeta.year,
    referenceAdmissionYear: shanghaiRegularPlanReferenceMeta.referenceAdmissionYear,
    batch: shanghaiRegularPlanReferenceMeta.batch,
    sourceTrust: shanghaiRegularPlanReferenceMeta.sourceTrust,
    sourceLabel: shanghaiRegularPlanReferenceMeta.sourceLabel,
    sourceUrl: "",
    sourceFile: shanghaiRegularPlanReferenceMeta.sourceFile,
    sourceRow: major.sourceRow,
    sourceQuality: shanghaiRegularPlanReferenceMeta.sourceQuality,
    schoolSlug: group.schoolSlug,
    schoolName: group.schoolName,
    schoolAlias: group.schoolAlias,
    schoolRegion: group.schoolRegion,
    category: group.category,
    groupCode: group.groupCode,
    groupName: group.groupName,
    groupSuffix: group.groupSuffix,
    subjectRequirement: group.subjectRequirement,
    groupPlan2026: group.groupPlan2026,
    groupLine2026Label: group.groupLine2026Label,
    groupLine2026: group.groupLine2026,
    groupLine2026Type: group.groupLine2026Type,
    groupAdmittedCount2025: group.groupAdmittedCount2025,
    groupMinScore2025Label: group.groupMinScore2025Label,
    groupMinScore2025: group.groupMinScore2025,
    groupAverageScore2025: group.groupAverageScore2025,
    groupAverageRank2025: group.groupAverageRank2025,
    officialSourceType: group.officialSourceType,
    officialSourceUrl: group.officialSourceUrl,
    majorCode: major.majorCode,
    majorName: major.majorName,
    plan2026: major.plan2026,
    tuition: major.tuition,
    admittedCount: major.admittedCount2025,
    admittedCount2025: major.admittedCount2025,
    minScoreLabel: major.minScoreLabel,
    minScore2025: major.minScore2025,
    minRankLabel: major.minRankLabel,
    averageScore: major.averageScore2025,
    averageScore2025: major.averageScore2025,
    averageRank: major.averageRank2025,
    averageRank2025: major.averageRank2025,
  })),
);

export function getShanghaiRegularPlanReferenceSummary() {
  return {
    year: shanghaiRegularPlanReferenceMeta.year,
    referenceAdmissionYear: shanghaiRegularPlanReferenceMeta.referenceAdmissionYear,
    recordCount: shanghaiRegularPlanReferenceMeta.recordCount,
    groupCount: shanghaiRegularPlanReferenceMeta.groupCount,
    schoolCount: shanghaiRegularPlanReferenceMeta.schoolCount,
    matchedOfficialGroupCount: shanghaiRegularPlanReferenceMeta.matchedOfficialGroupCount,
    unmatchedGroupCount: shanghaiRegularPlanReferenceMeta.unmatchedGroupCount,
    sourceLabel: shanghaiRegularPlanReferenceMeta.sourceLabel,
    sourceQuality: shanghaiRegularPlanReferenceMeta.sourceQuality,
  };
}
