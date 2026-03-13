import type { FeaturedTrackEntry } from "@/data/school-major-profiles";

export type TrackRouteType =
  | "高考直招"
  | "综合选拔"
  | "专项选拔"
  | "校内选拔"
  | "培养平台"
  | "其他口径";

export const trackRouteOrder: TrackRouteType[] = [
  "高考直招",
  "综合选拔",
  "专项选拔",
  "校内选拔",
  "培养平台",
  "其他口径",
];

export const trackRouteGuide: Record<
  TrackRouteType,
  { summary: string; advice: string }
> = {
  高考直招: {
    summary: "在填志愿阶段就能直接报，录取后通常直接进入该班或对应培养项目。",
    advice: "先看分省招生计划、专业组和选科要求，别把它误当成入校后再选。",
  },
  综合选拔: {
    summary: "通常要先报名，再参加学校组织的综合评价、校测或面试，高考成绩仍然重要。",
    advice: "重点确认报名时间、校测安排和所在省份是否开放该通道。",
  },
  专项选拔: {
    summary: "独立于普通本科批次或带有单独测试流程，常见于少年班、英才班、卓越计划。",
    advice: "这类项目时间线更早，错过报名通常就没有补报机会。",
  },
  校内选拔: {
    summary: "先按普通本科或大类进入学校，入校后再通过成绩、面试、营员考核等方式选拔。",
    advice: "高考能进学校不等于能进强班，真正门槛往往在入校后的竞争。",
  },
  培养平台: {
    summary: "更像书院、荣誉学院或培养平台，不一定对应单一专业或单一招生代码。",
    advice: "先弄清它是不是招生入口、能否二次选专业，以及培养与转出规则。",
  },
  其他口径: {
    summary: "当前官方信息能确认项目存在，但具体路径口径还不够统一。",
    advice: "优先点开来源链接，按学校最新招生简章或通知为准。",
  },
};

export function getTrackRouteType(track: FeaturedTrackEntry): TrackRouteType {
  if (track.category.includes("荣誉学院") || track.route.includes("培养平台")) {
    return "培养平台";
  }

  if (track.route.includes("专项选拔") || track.route.includes("单独招生")) {
    return "专项选拔";
  }

  if (track.route.includes("综合选拔")) {
    return "综合选拔";
  }

  if (
    track.route.includes("校内") ||
    track.route.includes("二次选拔") ||
    track.route.includes("补充选拔") ||
    track.route.includes("新生进校选拔") ||
    track.route.includes("大一末")
  ) {
    return "校内选拔";
  }

  if (
    track.route.includes("高考") ||
    track.route.includes("直招") ||
    track.route.includes("综合评价批次")
  ) {
    return "高考直招";
  }

  return "其他口径";
}
