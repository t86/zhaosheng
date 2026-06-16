import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
import {
  getShanghaiMajorAdmissionSummary,
  shanghaiMajorAdmissionsRecords,
} from "@/data/shanghai-major-admissions";
import { shanghaiMajorPlanRecords } from "@/data/shanghai-major-plans";
import { validateShanghaiHighValueImports } from "@/lib/shanghai-high-value-imports";

export type ShanghaiHighValueDataCard = {
  metricLabel: string;
  sourceTitle: string;
  sourceUrl: string;
  statusLabel: string;
  importedCount: string;
  coverageLabel: string;
  summary: string;
};

function uniqueSchoolCount(records: { schoolSlug: string }[]) {
  return new Set(records.map((record) => record.schoolSlug)).size;
}

export function getShanghaiHighValueDataStatus(): ShanghaiHighValueDataCard[] {
  const sourceReminder = shanghaiDecisionGuide.sources[2];
  const validation = validateShanghaiHighValueImports();
  const admissionsStatus = validation.datasets.find((item) => item.id === "major-admissions");
  const plansStatus = validation.datasets.find((item) => item.id === "major-plans");
  const admissionsSchoolCount = uniqueSchoolCount(shanghaiMajorAdmissionsRecords);
  const planSchoolCount = uniqueSchoolCount(shanghaiMajorPlanRecords);
  const majorAdmissionSummary = getShanghaiMajorAdmissionSummary();
  const averageRankCount = shanghaiMajorAdmissionsRecords.filter(
    (record) => record.averageRank != null,
  ).length;

  return [
    {
      metricLabel: "平均分位次",
      sourceTitle: "《2025 年上海市普通高等学校招生各专业录取人数及考分》",
      sourceUrl: majorAdmissionSummary.sourceUrl,
      statusLabel: admissionsStatus?.status ?? "待导入",
      importedCount: `${averageRankCount} 条`,
      coverageLabel: `${admissionsSchoolCount} 所学校`,
      summary:
        "这层来自上海市教育考试院《2025 年上海市普通高等学校招生各专业录取人数及考分》。站内首批已结构化导入 985 重点学校池，保留平均分位次用于比较专业热度和录取难度。",
    },
    {
      metricLabel: "各专业录取人数",
      sourceTitle: "《2025 年上海市普通高等学校招生各专业录取人数及考分》",
      sourceUrl: majorAdmissionSummary.sourceUrl,
      statusLabel: admissionsStatus?.status ?? "待导入",
      importedCount: `${shanghaiMajorAdmissionsRecords.length} 条`,
      coverageLabel: `${admissionsSchoolCount} 所学校`,
      summary:
        "同一本书册给出专业层录取人数、最低分标签、最低分位次、平均分和平均分位次。站内当前按学校池首批接入，不把 OCR 待复核数据扩大成全量官方库。",
    },
    {
      metricLabel: "在沪计划数",
      sourceTitle: "《2025 年上海市普通高等学校招生专业目录》",
      sourceUrl: sourceReminder.url,
      statusLabel: plansStatus?.status ?? "待导入",
      importedCount: `${shanghaiMajorPlanRecords.length} 条`,
      coverageLabel: `${planSchoolCount} 所学校`,
      summary:
        "在沪计划数要回到《招生专业目录》核对。专业目录是上海填志愿时核计划数的正式口径，当前还没导入，所以本站现阶段更适合先做学校池、风险和公开组线判断。",
    },
  ];
}
