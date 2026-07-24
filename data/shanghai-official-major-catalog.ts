import dataset from "@/data/shanghai/official-2026-major-recommendations.json";

type OfficialMajorRecommendationMajor = {
  majorCode: string;
  majorName: string;
  duration: string;
  plan2026: number | null;
  tuition: number | null;
  languageRequirement: string;
  remarks: string;
  admittedCount2025: number | null;
  minScoreLabel: string;
  minScore2025: number | null;
  minRankLabel: string;
  averageScore2025: number | null;
  averageRank2025: number | null;
};

type OfficialMajorRecommendationGroup = {
  schoolSlug: string;
  schoolName: string;
  schoolAlias: string;
  schoolRegion: string;
  category: string;
  groupCode: string;
  groupName: string;
  groupSuffix: string;
  subjectRequirement: string;
  officialSourceUrl: string;
  majors: OfficialMajorRecommendationMajor[];
};

type OfficialMajorRecommendationDataset = {
  meta: {
    region: string;
    year: number;
    referenceAdmissionYear: number;
    batch: "本科普通批次";
    sourceTrust: "official";
    sourceLabel: string;
    sourceFile: string;
    sourceQuality: string;
    recordCount: number;
    groupCount: number;
    schoolCount: number;
    parsedPdfRecordCount: number;
    missingPdfTextParseMajorCount: number;
    referenceSourceTrust: "third-party-reference";
    referenceSourceLabel: string;
    referenceSourceFile: string;
  };
  groups: OfficialMajorRecommendationGroup[];
};

const officialMajorRecommendationDataset = dataset as OfficialMajorRecommendationDataset;

export const shanghaiOfficialMajorCatalogMeta = officialMajorRecommendationDataset.meta;

export const shanghaiOfficialMajorCatalogMajorRecords = officialMajorRecommendationDataset.groups.flatMap((group) =>
  group.majors.map((major) => ({
    year: shanghaiOfficialMajorCatalogMeta.year,
    referenceAdmissionYear: shanghaiOfficialMajorCatalogMeta.referenceAdmissionYear,
    batch: shanghaiOfficialMajorCatalogMeta.batch,
    sourceTrust: shanghaiOfficialMajorCatalogMeta.sourceTrust,
    sourceLabel: shanghaiOfficialMajorCatalogMeta.sourceLabel,
    sourceUrl: group.officialSourceUrl,
    sourceFile: shanghaiOfficialMajorCatalogMeta.sourceFile,
    sourceQuality: shanghaiOfficialMajorCatalogMeta.sourceQuality,
    planSourceTrust: shanghaiOfficialMajorCatalogMeta.sourceTrust,
    planSourceLabel: shanghaiOfficialMajorCatalogMeta.sourceLabel,
    referenceSourceTrust: shanghaiOfficialMajorCatalogMeta.referenceSourceTrust,
    referenceSourceLabel: shanghaiOfficialMajorCatalogMeta.referenceSourceLabel,
    referenceSourceFile: shanghaiOfficialMajorCatalogMeta.referenceSourceFile,
    schoolSlug: group.schoolSlug,
    schoolName: group.schoolName,
    schoolAlias: group.schoolAlias,
    schoolRegion: group.schoolRegion,
    category: group.category,
    groupCode: group.groupCode,
    groupName: group.groupName,
    groupSuffix: group.groupSuffix,
    subjectRequirement: group.subjectRequirement,
    officialSourceUrl: group.officialSourceUrl,
    majorCode: major.majorCode,
    majorName: major.majorName,
    duration: major.duration,
    plan2026: major.plan2026,
    tuition: major.tuition,
    languageRequirement: major.languageRequirement,
    remarks: major.remarks,
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

export function getShanghaiOfficialMajorCatalogSummary() {
  return {
    year: shanghaiOfficialMajorCatalogMeta.year,
    recordCount: shanghaiOfficialMajorCatalogMeta.recordCount,
    groupCount: shanghaiOfficialMajorCatalogMeta.groupCount,
    schoolCount: shanghaiOfficialMajorCatalogMeta.schoolCount,
    parsedPdfRecordCount: shanghaiOfficialMajorCatalogMeta.parsedPdfRecordCount,
    missingPdfTextParseMajorCount: shanghaiOfficialMajorCatalogMeta.missingPdfTextParseMajorCount,
    sourceLabel: shanghaiOfficialMajorCatalogMeta.sourceLabel,
    referenceSourceLabel: shanghaiOfficialMajorCatalogMeta.referenceSourceLabel,
  };
}
