import shanghaiAllAdmissions from "@/data/shanghai/all-admissions.json";

type TieBreakers = {
  chineseMathTotal: number;
  chineseOrMathHigher: number;
  foreignLanguage: number;
  electiveHighest: number;
  electiveSecondHighest: number;
  electiveLowest: number;
  bonus: number;
};

export type ShanghaiAllAdmissionRecord = {
  schoolSlug: string | null;
  schoolName: string;
  schoolAlias: string;
  year: number;
  groupCode: string;
  groupName: string;
  score: string;
  minScore: number | null;
  scoreType: "threshold" | "exact";
  sourceType: "regular" | "q-group" | "supplemental-group";
  sourceTrust: "official";
  sourceLabel: string;
  sourceUrl: string;
  tieBreakers?: TieBreakers | null;
};

type ShanghaiAllAdmissionsMeta = {
  region: string;
  years: number[];
  grain: string;
  scope: string;
  sourceTrust: "official";
  generatedAt: string;
  notes: string[];
  matchedSeedSchoolCount: number;
  skippedInvalidRowCount: number;
  sources: {
    year: number;
    filename: string;
    label: string;
    url: string;
    sourceType: "regular" | "q-group";
  }[];
};

type ShanghaiAllAdmissionsDataset = {
  meta: ShanghaiAllAdmissionsMeta;
  records: ShanghaiAllAdmissionRecord[];
};

const dataset = shanghaiAllAdmissions as ShanghaiAllAdmissionsDataset;

export const shanghaiAllAdmissionsMeta = dataset.meta;
export const shanghaiAllAdmissionsRecords = dataset.records;

export function getShanghaiAllAdmissionsCoverage() {
  return {
    totalRecords: shanghaiAllAdmissionsRecords.length,
    schoolCount: new Set(shanghaiAllAdmissionsRecords.map((record) => record.schoolName)).size,
    seedSchoolCount: shanghaiAllAdmissionsMeta.matchedSeedSchoolCount,
    years: shanghaiAllAdmissionsMeta.years,
  };
}
