import shanghaiAdmissions from "@/data/shanghai-admissions.json";

type TieBreakers = {
  chineseMathTotal: number;
  chineseOrMathHigher: number;
  foreignLanguage: number;
  electiveHighest: number;
  electiveSecondHighest: number;
  electiveLowest: number;
  bonus: number;
};

export type ShanghaiAdmissionRecord = {
  schoolSlug: string;
  schoolName: string;
  year: number;
  groupCode: string;
  groupName: string;
  score: string;
  minScore: number | null;
  scoreType: "threshold" | "exact";
  sourceType: "regular" | "q-group" | "supplemental-group";
  sourceLabel: string;
  sourceUrl: string;
  tieBreakers?: TieBreakers | null;
};

type ShanghaiAdmissionsMeta = {
  region: string;
  years: number[];
  grain: string;
  generatedAt: string;
  notes: string[];
  sources: {
    year: number;
    filename: string;
    label: string;
    url: string;
    sourceType: "regular" | "q-group";
  }[];
};

type ShanghaiAdmissionsDataset = {
  meta: ShanghaiAdmissionsMeta;
  records: ShanghaiAdmissionRecord[];
  missingSchools: {
    schoolSlug: string;
    schoolName: string;
    note: string;
  }[];
};

const dataset = shanghaiAdmissions as ShanghaiAdmissionsDataset;

export const shanghaiAdmissionsMeta = dataset.meta;
export const shanghaiAdmissionsRecords = dataset.records;
export const shanghaiAdmissionsMissingSchools = dataset.missingSchools;

const recordsBySchool = new Map<string, ShanghaiAdmissionRecord[]>();
for (const record of shanghaiAdmissionsRecords) {
  const current = recordsBySchool.get(record.schoolSlug) ?? [];
  current.push(record);
  recordsBySchool.set(record.schoolSlug, current);
}

for (const records of recordsBySchool.values()) {
  records.sort(
    (left, right) =>
      right.year - left.year ||
      left.sourceType.localeCompare(right.sourceType) ||
      left.groupCode.localeCompare(right.groupCode),
  );
}

export function getShanghaiAdmissionsForSchool(schoolSlug: string) {
  return recordsBySchool.get(schoolSlug) ?? [];
}

export function getShanghaiAdmissionsCoverage() {
  return {
    totalRecords: shanghaiAdmissionsRecords.length,
    coveredSchoolCount: recordsBySchool.size,
    missingSchoolCount: shanghaiAdmissionsMissingSchools.length,
    years: shanghaiAdmissionsMeta.years,
  };
}
