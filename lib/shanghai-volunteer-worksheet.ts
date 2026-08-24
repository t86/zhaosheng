import type { ShanghaiScoreRecommendationCandidate } from "@/lib/shanghai-score-recommendations";

export type VolunteerSlot = {
  index: number; // 1 ~ 24
  schoolName: string;
  schoolSlug?: string;
  groupCode: string;
  groupName: string;
  lineScore?: number;
  year?: number;
  tier?: "reach" | "match" | "safe" | "custom";
  subjectRequirement?: string | null;
  majors: string[]; // 最多 4 个专业志愿
  obeyAdjustment: boolean; // 是否服从调剂（默认 true）
  notes?: string;
};

export type InversionWarning = {
  fromIndex: number;
  toIndex: number;
  message: string;
};

export type WorksheetDiagnosis = {
  filledCount: number;
  totalSlots: number;
  isComplete: boolean;
  reachCount: number;
  matchCount: number;
  safeCount: number;
  customCount: number;
  inversions: InversionWarning[];
  noAdjustmentSlots: number[]; // 志愿序号列表
  emptyMajorSlots: number[];
  suggestions: string[];
};

export const TOTAL_VOLUNTEER_SLOTS = 24;

export function createEmptyVolunteerWorksheet(): VolunteerSlot[] {
  return Array.from({ length: TOTAL_VOLUNTEER_SLOTS }, (_, idx) => ({
    index: idx + 1,
    schoolName: "",
    groupCode: "",
    groupName: "",
    majors: [],
    obeyAdjustment: true,
  }));
}

export function diagnoseVolunteerWorksheet(slots: VolunteerSlot[]): WorksheetDiagnosis {
  const filledSlots = slots.filter((slot) => slot.schoolName.trim() !== "");
  const filledCount = filledSlots.length;
  const isComplete = filledCount === TOTAL_VOLUNTEER_SLOTS;

  let reachCount = 0;
  let matchCount = 0;
  let safeCount = 0;
  let customCount = 0;

  const inversions: InversionWarning[] = [];
  const noAdjustmentSlots: number[] = [];
  const emptyMajorSlots: number[] = [];

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (!slot.schoolName.trim()) continue;

    if (slot.tier === "reach") reachCount++;
    else if (slot.tier === "match") matchCount++;
    else if (slot.tier === "safe") safeCount++;
    else customCount++;

    if (!slot.obeyAdjustment) {
      noAdjustmentSlots.push(slot.index);
    }

    if (slot.majors.length === 0) {
      emptyMajorSlots.push(slot.index);
    }

    // 检查分数倒挂（前一个志愿参考分比后一个低超过 1 分以上）
    for (let j = i + 1; j < slots.length; j++) {
      const nextSlot = slots[j];
      if (!nextSlot.schoolName.trim()) continue;

      if (
        slot.lineScore != null &&
        nextSlot.lineScore != null &&
        slot.lineScore < nextSlot.lineScore
      ) {
        inversions.push({
          fromIndex: slot.index,
          toIndex: nextSlot.index,
          message: `第 ${slot.index} 志愿（${slot.schoolName} ${slot.lineScore}分）与第 ${nextSlot.index} 志愿（${nextSlot.schoolName} ${nextSlot.lineScore}分）存在分数倒挂风险`,
        });
      }
      break; // 只与下一个有效志愿比
    }
  }

  const suggestions: string[] = [];

  if (filledCount === 0) {
    suggestions.push("尚未填满 24 个志愿，建议先从查分匹配区把冲/稳/保候选加入志愿表。");
  } else if (filledCount < TOTAL_VOLUNTEER_SLOTS) {
    suggestions.push(`当前已填 ${filledCount}/${TOTAL_VOLUNTEER_SLOTS} 个志愿，未填满可能浪费平行志愿录取机会。`);
  }

  if (inversions.length > 0) {
    suggestions.push(`检测到 ${inversions.length} 处志愿分数倒挂，建议点击“按参考分从高到低自动排序”进行理顺。`);
  }

  if (noAdjustmentSlots.length > 0) {
    suggestions.push(
      `第 ${noAdjustmentSlots.join("、")} 志愿未勾选“服从调剂”。如果组内 4 个专业均未被录取，将面临直接被退档的高风险！`,
    );
  }

  if (filledCount > 0 && safeCount === 0) {
    suggestions.push("当前志愿表中缺少“保底”志愿，建议至少安排 4~6 个往年投档线明显低于自身位次的稳妥专业组防滑档。");
  }

  if (filledCount > 0 && reachCount > 12) {
    suggestions.push("冲刺类志愿占比过高（>12个），建议合理控制冲刺数量，强化中间稳妥志愿池（推荐 冲:稳:保 比例为 6:12:6）。");
  }

  return {
    filledCount,
    totalSlots: TOTAL_VOLUNTEER_SLOTS,
    isComplete,
    reachCount,
    matchCount,
    safeCount,
    customCount,
    inversions,
    noAdjustmentSlots,
    emptyMajorSlots,
    suggestions,
  };
}

export function sortWorksheetByScore(slots: VolunteerSlot[]): VolunteerSlot[] {
  const filled = slots.filter((s) => s.schoolName.trim() !== "");
  const empty = slots.filter((s) => s.schoolName.trim() === "");

  // 有参考分的排在前面，从高到低排序；无分数的保持原有相对顺序
  filled.sort((a, b) => {
    const scoreA = a.lineScore ?? 0;
    const scoreB = b.lineScore ?? 0;
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    return a.index - b.index;
  });

  const combined = [...filled, ...empty];
  return combined.map((slot, idx) => ({
    ...slot,
    index: idx + 1,
  }));
}

export function fillWorksheetFromRecommendations(
  existingSlots: VolunteerSlot[],
  candidates: {
    reach: ShanghaiScoreRecommendationCandidate[];
    match: ShanghaiScoreRecommendationCandidate[];
    safe: ShanghaiScoreRecommendationCandidate[];
  },
): VolunteerSlot[] {
  const slots = createEmptyVolunteerWorksheet();
  let currentIdx = 0;

  // 推荐分配策略：前 6 个冲，中间 12 个稳，后 6 个保
  const reachPool = candidates.reach.slice(0, 6);
  const matchPool = candidates.match.slice(0, 12);
  const safePool = candidates.safe.slice(0, 6);

  const allItems = [...reachPool, ...matchPool, ...safePool];
  const seenKeys = new Set<string>();

  for (const item of allItems) {
    if (currentIdx >= TOTAL_VOLUNTEER_SLOTS) break;
    const itemKey = `${item.schoolSlug || item.schoolName}::${item.groupCode}`;
    if (seenKeys.has(itemKey)) {
      continue;
    }
    seenKeys.add(itemKey);

    slots[currentIdx] = {
      index: currentIdx + 1,
      schoolName: item.schoolName,
      schoolSlug: item.schoolSlug,
      groupCode: item.groupCode,
      groupName: item.groupName,
      lineScore: item.lineScore,
      year: item.year,
      tier: item.tier,
      subjectRequirement: item.subjectRequirement,
      majors: item.majorExamples.map((m) => m.majorName).slice(0, 4),
      obeyAdjustment: true,
    };
    currentIdx++;
  }

  return slots;
}

export function exportWorksheetToCsv(slots: VolunteerSlot[]): string {
  const headers = [
    "志愿序号",
    "院校名称",
    "院校专业组代码",
    "院校专业组名称",
    "选科要求",
    "往年参考分",
    "志愿梯队",
    "专业志愿1",
    "专业志愿2",
    "专业志愿3",
    "专业志愿4",
    "是否服从专业调剂",
    "备注说明",
  ];

  const rows = slots
    .filter((slot) => slot.schoolName.trim() !== "")
    .map((slot) => {
      const majors = slot.majors || [];
      return [
        slot.index,
        `"${slot.schoolName.replace(/"/g, '""')}"`,
        `"${slot.groupCode}"`,
        `"${slot.groupName.replace(/"/g, '""')}"`,
        `"${slot.subjectRequirement || "不限"}"`,
        slot.lineScore ?? "—",
        slot.tier === "reach" ? "冲" : slot.tier === "match" ? "稳" : slot.tier === "safe" ? "保" : "自选",
        `"${(majors[0] || "").replace(/"/g, '""')}"`,
        `"${(majors[1] || "").replace(/"/g, '""')}"`,
        `"${(majors[2] || "").replace(/"/g, '""')}"`,
        `"${(majors[3] || "").replace(/"/g, '""')}"`,
        slot.obeyAdjustment ? "是" : "否",
        `"${(slot.notes || "").replace(/"/g, '""')}"`,
      ].join(",");
    });

  // UTF-8 BOM for Microsoft Excel compatibility
  return "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
}

export function exportWorksheetToText(slots: VolunteerSlot[]): string {
  const filled = slots.filter((slot) => slot.schoolName.trim() !== "");
  if (filled.length === 0) {
    return "【上海高考 24 个院校专业组志愿意向表】\n（暂无填报内容）";
  }

  const lines = [
    "═════════════════════════════════════════════",
    "   上海高考 24 个院校专业组模拟志愿意向表",
    `   生成日期：${new Date().toLocaleDateString("zh-CN")}`,
    `   已填报：${filled.length} / 24 个志愿`,
    "═════════════════════════════════════════════\n",
  ];

  for (const slot of filled) {
    const tierLabel = slot.tier === "reach" ? "【冲】" : slot.tier === "match" ? "【稳】" : slot.tier === "safe" ? "【保】" : "【自选】";
    const num = String(slot.index).padStart(2, "0");
    lines.push(
      `第 ${num} 志愿：${slot.schoolName} ${tierLabel}`,
      `   专业组：${slot.groupName} (${slot.groupCode}) ｜ 选科：${slot.subjectRequirement || "不限"} ｜ 参考分：${slot.lineScore ?? "—"}`,
    );

    const majorList = (slot.majors || []).filter(Boolean);
    if (majorList.length > 0) {
      lines.push(`   专业选择：${majorList.map((m, i) => `[${i + 1}] ${m}`).join("  ")}`);
    } else {
      lines.push("   专业选择：（待选定具体专业）");
    }

    lines.push(`   服从调剂: ${slot.obeyAdjustment ? "是 (防退档)" : "否 (退档风险极高)"}`);
    if (slot.notes) {
      lines.push(`   备注: ${slot.notes}`);
    }
    lines.push("─────────────────────────────────────────────");
  }

  lines.push(
    "\n【填报特别提醒】",
    "1. 实际填报以当年《2026年上海市普通高等学校招生专业目录》和上海市教育考试院正式志愿表样表为准。",
    "2. 平行志愿严格按'分数优先、遵循志愿、一轮投档'，请确保 24 个志愿梯队顺序从高到低排列。",
    "3. 调剂仅在被投档的院校专业组内部进行；未录入前4专业且不服从调剂将被直接退档进入征求志愿。",
  );

  return lines.join("\n");
}
