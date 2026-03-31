import records from "@/data/shanghai/high-value/major-admissions.json";

export type ShanghaiMajorAdmissionRecord = {
  year: number;
  schoolSlug: string;
  schoolName: string;
  majorName: string;
  admittedCount: number;
  minScore?: number;
  averageScore?: number;
  averageRank?: number;
  sourceLabel: string;
  sourceUrl: string;
};

export const shanghaiMajorAdmissionsRecords = records as ShanghaiMajorAdmissionRecord[];
