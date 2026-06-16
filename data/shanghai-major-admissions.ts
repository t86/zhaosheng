import records from "@/data/shanghai/high-value/major-admissions.json";

export type ShanghaiAdmissionBatch = "综合评价批次" | "零志愿批次" | "本科提前批次" | "本科普通批次";

export type ShanghaiMajorAdmissionRecord = {
  year: number;
  batch: ShanghaiAdmissionBatch;
  schoolSlug: string;
  schoolName: string;
  groupCode: string;
  groupName: string;
  subjectRequirement: string;
  majorName: string;
  admittedCount: number;
  highestScoreLabel?: string | null;
  minScoreLabel: string;
  minRankLabel: string;
  minScore?: number | null;
  minRank?: number | null;
  averageScore?: number;
  averageRank?: number;
  sourceLabel: string;
  sourceUrl: string;
  sourcePage: number;
  sourceQuality: string;
};

export const shanghaiMajorAdmissionsRecords = records as ShanghaiMajorAdmissionRecord[];

const batchOrder: Record<ShanghaiAdmissionBatch, number> = {
  综合评价批次: 1,
  零志愿批次: 2,
  本科提前批次: 3,
  本科普通批次: 4,
};

function compareMajorRecords(left: ShanghaiMajorAdmissionRecord, right: ShanghaiMajorAdmissionRecord) {
  return (
    batchOrder[left.batch] - batchOrder[right.batch] ||
    left.groupCode.localeCompare(right.groupCode) ||
    left.sourcePage - right.sourcePage ||
    (left.averageRank ?? Number.MAX_SAFE_INTEGER) - (right.averageRank ?? Number.MAX_SAFE_INTEGER) ||
    (right.averageScore ?? 0) - (left.averageScore ?? 0) ||
    left.majorName.localeCompare(right.majorName)
  );
}

const recordsBySchool = new Map<string, ShanghaiMajorAdmissionRecord[]>();
for (const record of shanghaiMajorAdmissionsRecords) {
  const current = recordsBySchool.get(record.schoolSlug) ?? [];
  current.push(record);
  recordsBySchool.set(record.schoolSlug, current);
}

for (const schoolRecords of recordsBySchool.values()) {
  schoolRecords.sort(compareMajorRecords);
}

const featuredPreviewMajors = [
  { schoolSlug: "fudan-university", majorName: "工科试验班(相辉学堂香农计划)" },
  { schoolSlug: "shanghai-jiao-tong-university", majorName: "人工智能(拔尖英才试点班)" },
  { schoolSlug: "zhejiang-university", majorName: "工科试验班(竺可桢学院图灵班)" },
  { schoolSlug: "nanjing-university", majorName: "人工智能" },
  { schoolSlug: "university-of-science-and-technology-of-china", majorName: "数学类" },
];

export function getShanghaiMajorAdmissionsForSchool(schoolSlug: string) {
  return recordsBySchool.get(schoolSlug) ?? [];
}

export function getShanghaiMajorAdmissionPreviewRecords(limit = 12) {
  const rankedRecords = [...shanghaiMajorAdmissionsRecords]
    .filter((record) => record.averageRank != null)
    .sort(
      (left, right) =>
        (left.averageRank ?? Number.MAX_SAFE_INTEGER) - (right.averageRank ?? Number.MAX_SAFE_INTEGER) ||
        (right.averageScore ?? 0) - (left.averageScore ?? 0) ||
        left.schoolName.localeCompare(right.schoolName),
    );
  const featuredRecords = featuredPreviewMajors
    .map((featured) =>
      rankedRecords.find(
        (record) =>
          record.schoolSlug === featured.schoolSlug &&
          record.majorName === featured.majorName,
      ),
    )
    .filter((record): record is ShanghaiMajorAdmissionRecord => Boolean(record));
  const featuredKeys = new Set(
    featuredRecords.map((record) => `${record.schoolSlug}-${record.groupCode}-${record.majorName}`),
  );
  const fillerRecords = rankedRecords.filter(
    (record) => !featuredKeys.has(`${record.schoolSlug}-${record.groupCode}-${record.majorName}`),
  );

  return [...featuredRecords, ...fillerRecords].slice(0, limit);
}

export function getShanghaiMajorAdmissionSummary() {
  const batches = Array.from(new Set(shanghaiMajorAdmissionsRecords.map((record) => record.batch))).sort(
    (left, right) => batchOrder[left] - batchOrder[right],
  );

  return {
    year: 2025,
    recordCount: shanghaiMajorAdmissionsRecords.length,
    schoolCount: recordsBySchool.size,
    batches,
    sourceLabel:
      shanghaiMajorAdmissionsRecords[0]?.sourceLabel ??
      "上海市教育考试院《2025年上海市普通高等学校招生各专业录取人数及考分》",
    sourceUrl: shanghaiMajorAdmissionsRecords[0]?.sourceUrl ?? "https://www.shmeea.edu.cn/",
    sourceQuality:
      "从用户提供的考试院版 PDF 图片页 OCR 结构化导入，保留“≥580”“≤4096”等阈值标签，不反推被隐藏的精确最低分。",
  };
}
