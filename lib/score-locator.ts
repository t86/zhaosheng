import {
  shanghaiAdmissionsRecords,
  type ShanghaiAdmissionRecord,
} from "@/lib/shanghai-admissions";

// 按分数把"够得着的院校专业组"分成冲/稳/保三层。
// 口径提醒：只用 scoreType==="exact"（考试院公布了精确投档线）的记录做分层；
// "580 分及以上"这类只公布阈值（threshold）的高分段无法精确定位，单列提示另查。
// 投档线是"院校专业组线"，不是单个专业最低分，仅供建立现实区间的量级判断。

export type ScoreTier = "reach" | "match" | "safe";

export type LocatedGroup = {
  schoolSlug: string;
  schoolName: string;
  groupName: string;
  groupCode: string;
  minScore: number;
  year: number;
  diff: number; // minScore - target，正=线比你高（要冲），负=线比你低
  tier: ScoreTier;
};

export type ScoreLocateResult = {
  target: number;
  reach: LocatedGroup[];
  match: LocatedGroup[];
  safe: LocatedGroup[];
  thresholdSchools: { schoolSlug: string; schoolName: string }[];
};

// 每个(学校,专业组)只保留最近一年的精确投档线作为参照
function latestExactGroups(): ShanghaiAdmissionRecord[] {
  const best = new Map<string, ShanghaiAdmissionRecord>();
  for (const record of shanghaiAdmissionsRecords) {
    if (record.scoreType !== "exact" || record.minScore == null) {
      continue;
    }
    const key = `${record.schoolSlug}::${record.groupCode}`;
    const current = best.get(key);
    if (!current || record.year > current.year) {
      best.set(key, record);
    }
  }
  return [...best.values()];
}

export const SCORE_WINDOWS = {
  reachMax: 15, // 线比你高 0~15 分：冲
  matchMin: -10, // 线比你低 0~10 分：稳
  safeMin: -30, // 线比你低 10~30 分：保
};

export function locateByScore(target: number): ScoreLocateResult {
  const reach: LocatedGroup[] = [];
  const match: LocatedGroup[] = [];
  const safe: LocatedGroup[] = [];

  for (const record of latestExactGroups()) {
    const minScore = record.minScore as number;
    const diff = minScore - target;
    let tier: ScoreTier | null = null;
    if (diff > 0 && diff <= SCORE_WINDOWS.reachMax) {
      tier = "reach";
    } else if (diff <= 0 && diff >= SCORE_WINDOWS.matchMin) {
      tier = "match";
    } else if (diff < SCORE_WINDOWS.matchMin && diff >= SCORE_WINDOWS.safeMin) {
      tier = "safe";
    }
    if (!tier) {
      continue;
    }
    const group: LocatedGroup = {
      schoolSlug: record.schoolSlug,
      schoolName: record.schoolName,
      groupName: record.groupName,
      groupCode: record.groupCode,
      minScore,
      year: record.year,
      diff,
      tier,
    };
    if (tier === "reach") {
      reach.push(group);
    } else if (tier === "match") {
      match.push(group);
    } else {
      safe.push(group);
    }
  }

  reach.sort((a, b) => a.diff - b.diff); // 离你最近的冲在前
  match.sort((a, b) => b.minScore - a.minScore);
  safe.sort((a, b) => b.minScore - a.minScore);

  const thresholds = new Map<string, string>();
  for (const record of shanghaiAdmissionsRecords) {
    if (record.scoreType === "threshold") {
      thresholds.set(record.schoolSlug, record.schoolName);
    }
  }

  return {
    target,
    reach,
    match,
    safe,
    thresholdSchools: [...thresholds].map(([schoolSlug, schoolName]) => ({
      schoolSlug,
      schoolName,
    })),
  };
}
