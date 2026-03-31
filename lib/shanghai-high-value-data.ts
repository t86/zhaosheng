import { shanghaiDecisionGuide } from "@/data/shanghai-decision-guide";
import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";
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
  const averageRankCount = shanghaiMajorAdmissionsRecords.filter(
    (record) => record.averageRank != null,
  ).length;

  return [
    {
      metricLabel: "平均分位次",
      sourceTitle: "《2024 年上海市普通高等学校招生各专业录取人数及考分》",
      sourceUrl: sourceReminder.url,
      statusLabel: admissionsStatus?.status ?? "待导入",
      importedCount: `${averageRankCount} 条`,
      coverageLabel: `${admissionsSchoolCount} 所学校`,
      summary:
        "这层真源来自上海市教育考试院特别提醒点名的《各专业录取人数及考分》。当前仓库还没导入书册或官方系统导出的结构化数据，所以不能假装已经有平均分位次。",
    },
    {
      metricLabel: "各专业录取人数",
      sourceTitle: "《2024 年上海市普通高等学校招生各专业录取人数及考分》",
      sourceUrl: sourceReminder.url,
      statusLabel: admissionsStatus?.status ?? "待导入",
      importedCount: `${shanghaiMajorAdmissionsRecords.length} 条`,
      coverageLabel: `${admissionsSchoolCount} 所学校`,
      summary:
        "同一本《各专业录取人数及考分》会给出专业层录取人数、最低分、平均分等硬字段。真正接入后，才有资格做更细的专业层冲稳保判断。",
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
