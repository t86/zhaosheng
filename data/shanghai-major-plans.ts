import records from "@/data/shanghai/high-value/major-plans.json";

export type ShanghaiMajorPlanRecord = {
  year: number;
  schoolSlug: string;
  schoolName: string;
  majorName?: string;
  groupName?: string;
  plannedCount: number;
  sourceLabel: string;
  sourceUrl: string;
};

export const shanghaiMajorPlanRecords = records as ShanghaiMajorPlanRecord[];
