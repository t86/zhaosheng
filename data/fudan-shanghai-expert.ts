import rawData from "./fudan-shanghai-expert.json";

export type FudanAdmissionHistory = {
  year: number;
  admitted: number | null;
  minScore: number | null;
  minRank: number | null;
  averageScore: number | null;
  averageRank: number | null;
  batch: string | null;
};

export type FudanExpertAdmissionRow = {
  school: string;
  batch: string;
  collegeCode: string;
  groupCode: string;
  majorCode: string;
  majorName: string;
  majorFullName: string;
  subjectRequirement: string;
  plan2026: number;
  tuition: number;
  duration: number;
  estimatedRank2026: number | null;
  isNew2026: boolean;
  history: FudanAdmissionHistory[];
};

export const fudanShanghaiExpertData = rawData as {
  meta: {
    title: string;
    sourceLabel: string;
    sourceType: string;
    scope: string;
    notes: string[];
  };
  rows: FudanExpertAdmissionRow[];
};

export function getFudanShanghaiExpertSummary() {
  const rows = fudanShanghaiExpertData.rows;
  const byBatch = Array.from(new Set(rows.map((row) => row.batch))).map((batch) => ({
    batch,
    majorCount: rows.filter((row) => row.batch === batch).length,
    plan: rows.filter((row) => row.batch === batch).reduce((sum, row) => sum + row.plan2026, 0),
  }));

  return {
    majorCount: rows.length,
    plan2026: rows.reduce((sum, row) => sum + row.plan2026, 0),
    medicalPlan2026: rows
      .filter((row) => row.school === "复旦大学医学院")
      .reduce((sum, row) => sum + row.plan2026, 0),
    newMajorCount: rows.filter((row) => row.isNew2026).length,
    byBatch,
  };
}
