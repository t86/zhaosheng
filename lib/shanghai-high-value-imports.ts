import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";
import { shanghaiMajorPlanRecords } from "@/data/shanghai-major-plans";

export type ShanghaiHighValueImportDatasetId = "major-admissions" | "major-plans";

export type ShanghaiHighValueImportManifestEntry = {
  id: ShanghaiHighValueImportDatasetId;
  title: string;
  description: string;
  targetFile: string;
  sourceTitle: string;
  sourceUrl: string;
  requiredFields: string[];
  optionalFields: string[];
};

export type ShanghaiHighValueImportDatasetStatus = {
  id: ShanghaiHighValueImportDatasetId;
  title: string;
  targetFile: string;
  status: "待导入" | "待校验" | "已接入";
  recordCount: number;
  missingRequiredFieldCount: number;
};

export type ShanghaiHighValueImportValidationReport = {
  datasets: ShanghaiHighValueImportDatasetStatus[];
  command: string;
};

const reminderSource = shanghaiDecisionGuide.sources[2];

const manifest: ShanghaiHighValueImportManifestEntry[] = [
  {
    id: "major-admissions",
    title: "专业层录取结果",
    description:
      "承接《2024 年上海市普通高等学校招生各专业录取人数及考分》里的录取人数、最低分、平均分和平均分位次。",
    targetFile: "data/shanghai/high-value/major-admissions.json",
    sourceTitle: "《2024 年上海市普通高等学校招生各专业录取人数及考分》",
    sourceUrl: reminderSource.url,
    requiredFields: [
      "year",
      "schoolSlug",
      "schoolName",
      "majorName",
      "admittedCount",
      "minScore",
      "averageScore",
      "averageRank",
      "sourceLabel",
      "sourceUrl",
    ],
    optionalFields: [],
  },
  {
    id: "major-plans",
    title: "在沪计划数",
    description:
      "承接《2025 年上海市普通高等学校招生专业目录》里的学校、专业组或专业层招生计划数。",
    targetFile: "data/shanghai/high-value/major-plans.json",
    sourceTitle: "《2025 年上海市普通高等学校招生专业目录》",
    sourceUrl: reminderSource.url,
    requiredFields: ["year", "schoolSlug", "schoolName", "plannedCount", "sourceLabel", "sourceUrl"],
    optionalFields: ["majorName", "groupName"],
  },
];

function countMissingRequiredFields(records: Record<string, unknown>[], requiredFields: string[]) {
  let count = 0;

  for (const record of records) {
    for (const field of requiredFields) {
      const value = record[field];

      if (value == null) {
        count += 1;
        continue;
      }

      if (typeof value === "string" && value.trim().length === 0) {
        count += 1;
      }
    }
  }

  return count;
}

function buildDatasetStatus(
  entry: ShanghaiHighValueImportManifestEntry,
  records: Record<string, unknown>[],
): ShanghaiHighValueImportDatasetStatus {
  const recordCount = records.length;
  const missingRequiredFieldCount = countMissingRequiredFields(records, entry.requiredFields);

  if (recordCount === 0) {
    return {
      id: entry.id,
      title: entry.title,
      targetFile: entry.targetFile,
      status: "待导入",
      recordCount,
      missingRequiredFieldCount,
    };
  }

  return {
    id: entry.id,
    title: entry.title,
    targetFile: entry.targetFile,
    status: missingRequiredFieldCount > 0 ? "待校验" : "已接入",
    recordCount,
    missingRequiredFieldCount,
  };
}

export function getShanghaiHighValueImportManifest() {
  return manifest;
}

export function validateShanghaiHighValueImports(): ShanghaiHighValueImportValidationReport {
  return {
    datasets: [
      buildDatasetStatus(manifest[0], shanghaiMajorAdmissionsRecords as Record<string, unknown>[]),
      buildDatasetStatus(manifest[1], shanghaiMajorPlanRecords as Record<string, unknown>[]),
    ],
    command: "pnpm dlx tsx scripts/validate-shanghai-high-value-imports.ts",
  };
}
