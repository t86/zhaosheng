import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";

export type GroupMajorInfo = {
  majorName: string;
  groupCode: string;
  groupName: string;
  admittedCount: number;
  minScoreLabel: string;
  minRankLabel: string;
  averageScore?: number;
  averageRank?: number;
  subjectRequirement: string;
};

export type AdjustmentRiskAnalysis = {
  schoolSlug: string;
  schoolName: string;
  groupCode: string;
  groupName: string;
  totalGroupMajorsCount: number;
  selectedCount: number;
  groupMajors: GroupMajorInfo[];
  selectedMajors: string[];
  fallbackMajors: GroupMajorInfo[]; // 前 4 志愿之外的组内专业池（调剂目标池）
  unacceptableMajors: string[];
  unacceptableHitsInFallback: GroupMajorInfo[];
  obeyAdjustment: boolean;
  adjustmentLikelihood: "low" | "medium" | "high";
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number; // 0 ~ 100
  title: string;
  summary: string;
  advice: string[];
};

export function getSchoolGroupMajors(schoolSlug: string, groupCode?: string): GroupMajorInfo[] {
  let records = shanghaiMajorAdmissionsRecords.filter((r) => r.schoolSlug === schoolSlug);

  if (groupCode && groupCode.trim() !== "") {
    const cleanTargetCode = groupCode.trim();
    const cleanShortCode = cleanTargetCode.replace(/^0+/, "");
    const matching = records.filter((r) => {
      if (r.groupCode === cleanTargetCode) return true;
      if (r.groupCode.endsWith(cleanTargetCode)) return true;
      if (cleanShortCode && (r.groupCode.endsWith(cleanShortCode) || r.groupCode.replace(/^0+/, "") === cleanShortCode)) return true;
      if (r.groupName.includes(cleanTargetCode)) return true;
      return false;
    });

    if (matching.length > 0) {
      records = matching;
    }
  }

  // 排序：均分位次靠前的排在前面（即最热门的排最前）
  const uniqueMap = new Map<string, GroupMajorInfo>();
  for (const r of records) {
    if (!uniqueMap.has(r.majorName)) {
      uniqueMap.set(r.majorName, {
        majorName: r.majorName,
        groupCode: r.groupCode,
        groupName: r.groupName,
        admittedCount: r.admittedCount,
        minScoreLabel: r.minScoreLabel,
        minRankLabel: r.minRankLabel,
        averageScore: r.averageScore,
        averageRank: r.averageRank,
        subjectRequirement: r.subjectRequirement,
      });
    }
  }

  return Array.from(uniqueMap.values()).sort((a, b) => {
    const rankA = a.averageRank ?? Number.MAX_SAFE_INTEGER;
    const rankB = b.averageRank ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return (b.averageScore ?? 0) - (a.averageScore ?? 0);
  });
}

export function analyzeAdjustmentRisk(params: {
  schoolSlug: string;
  schoolName: string;
  groupCode: string;
  groupName: string;
  selectedMajors: string[]; // 用户选择的前 1~4 个专业
  unacceptableMajors?: string[]; // 用户明确不愿接受的专业
  obeyAdjustment?: boolean; // 默认 true
}): AdjustmentRiskAnalysis {
  const {
    schoolSlug,
    schoolName,
    groupCode,
    groupName,
    selectedMajors,
    unacceptableMajors = [],
    obeyAdjustment = true,
  } = params;

  const groupMajors = getSchoolGroupMajors(schoolSlug, groupCode);
  const totalGroupMajorsCount = groupMajors.length;
  const selectedCount = selectedMajors.length;

  const selectedSet = new Set(selectedMajors.map((m) => m.trim()));
  const unacceptableSet = new Set(unacceptableMajors.map((m) => m.trim()));

  // 调剂兜底池：组内未被用户选中的所有其他专业
  const fallbackMajors = groupMajors.filter((m) => !selectedSet.has(m.majorName));
  const unacceptableHitsInFallback = fallbackMajors.filter((m) =>
    unacceptableSet.has(m.majorName),
  );

  // 计算调剂被触发的可能性：如果用户选择的专业全是该组排名前 35% 的高分王牌，触发调剂概率高
  let adjustmentLikelihood: "low" | "medium" | "high" = "medium";
  if (groupMajors.length > 0) {
    const topTierCount = Math.max(1, Math.ceil(groupMajors.length * 0.35));
    const topTierMajors = new Set(groupMajors.slice(0, topTierCount).map((m) => m.majorName));
    const isAllTopTier = selectedMajors.length > 0 && selectedMajors.every((m) => topTierMajors.has(m));

    const bottomTierCount = Math.max(1, Math.ceil(groupMajors.length * 0.35));
    const bottomTierMajors = new Set(groupMajors.slice(-bottomTierCount).map((m) => m.majorName));
    const hasBottomTier = selectedMajors.some((m) => bottomTierMajors.has(m));

    if (isAllTopTier && selectedCount < totalGroupMajorsCount) {
      adjustmentLikelihood = "high";
    } else if (hasBottomTier || selectedCount >= totalGroupMajorsCount) {
      adjustmentLikelihood = "low";
    }
  }

  // 评估综合风险级别
  let riskLevel: "low" | "medium" | "high" | "critical" = "low";
  let riskScore = 20;

  if (!obeyAdjustment) {
    // 不服从调剂是最高退档风险
    riskLevel = "critical";
    riskScore = 95;
  } else if (unacceptableHitsInFallback.length > 0) {
    if (unacceptableHitsInFallback.length >= 2 || adjustmentLikelihood === "high") {
      riskLevel = "critical";
      riskScore = 90;
    } else {
      riskLevel = "high";
      riskScore = 75;
    }
  } else if (adjustmentLikelihood === "high") {
    riskLevel = "high";
    riskScore = 65;
  } else if (adjustmentLikelihood === "medium") {
    riskLevel = "medium";
    riskScore = 45;
  }

  // 生成诊断建议
  const advice: string[] = [];
  let title = "调剂风险可控";
  let summary = "专业志愿梯度较为合理，组内兜底专业跨度在可控范围。";

  if (!obeyAdjustment) {
    title = "极高退档风险（未勾选服从调剂）";
    summary = "上海高考平行志愿为一轮投档，若进档后所填 4 个专业未录取且不服从调剂，将被直接退档至征求志愿！";
    advice.push("强烈建议勾选“服从调剂”防退档；若确实无法接受组内部分专业，应直接更换其他院校专业组，切忌赌不被调剂。");
  } else if (unacceptableHitsInFallback.length > 0) {
    title = `调剂命中排斥专业风险（${unacceptableHitsInFallback.length} 个不愿去专业在兜底池中）`;
    summary = `若前 ${selectedCount} 个专业未录满，你将有很大可能被调剂到：${unacceptableHitsInFallback.map((m) => m.majorName).join("、")}。`;
    advice.push("调剂只在组内进行，无法跨组调剂。如组内包含不可接受的专业，请先做'最坏情况自检'：如果被分到该专业是否能接受？");
    advice.push("若不能接受，应将该院校专业组从志愿表中剔除，换成组内所有专业均可接受的专业组。");
  } else if (adjustmentLikelihood === "high") {
    title = "热门聚集风险（所选专业均属该组最高分）";
    summary = "所选专业均为该组历史录取均分最高的王牌专业，一旦分数不占优势，极易滑入组内调剂池。";
    advice.push("建议在 4 个专业中至少安排 1~2 个组内均分居中或偏后、且自己能接受的专业作为组内稳妥垫底。");
    advice.push(`若发生调剂，组内剩余可能去往的方向包括：${fallbackMajors.slice(0, 3).map((m) => m.majorName).join("、")}${fallbackMajors.length > 3 ? " 等" : ""}。`);
  } else {
    advice.push("当前专业志愿梯度分布良好，包含了组内压线或中段专业，被强制调剂的概率较低。");
    advice.push("已勾选服从调剂，可有效保障进档后不被退档。");
  }

  return {
    schoolSlug,
    schoolName,
    groupCode,
    groupName,
    totalGroupMajorsCount,
    selectedCount,
    groupMajors,
    selectedMajors,
    fallbackMajors,
    unacceptableMajors,
    unacceptableHitsInFallback,
    obeyAdjustment,
    adjustmentLikelihood,
    riskLevel,
    riskScore,
    title,
    summary,
    advice,
  };
}
