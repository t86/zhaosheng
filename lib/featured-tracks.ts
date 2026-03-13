import type { FeaturedTrackEntry } from "@/data/school-major-profiles";

export type TrackRouteType =
  | "高考直招"
  | "综合选拔"
  | "专项选拔"
  | "校内选拔"
  | "培养平台"
  | "其他口径";

export type TrackFitProfile = {
  fitFor: string[];
  watchOut: string[];
  basis: string;
};

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

const profileBasis =
  "以下画像为站内基于班型名称、标签、录取口径和官方培养定位做的判断，不是学校官方承诺。";

const manualTrackProfiles: Record<string, Omit<TrackFitProfile, "basis">> = {
  "计算机科学实验班（姚班）": {
    fitFor: [
      "数理和编程基础都很强，愿意接受高密度理论训练与科研训练的学生。",
      "不满足于只学常规计算机课程，希望更早接触人工智能、量子信息等前沿方向的学生。",
    ],
    watchOut: [
      "它不是普通高考直接专业入口，真正门槛在校内综合选拔。",
      "课程强度高、节奏快，不适合只想拿名校牌子但不愿投入高强度学习的人。",
    ],
  },
  图灵班: {
    fitFor: [
      "适合计算机兴趣非常明确，愿意在入校后继续通过成绩和选拔竞争强班席位的学生。",
      "适合既想做系统能力训练，也愿意补理论和智能交叉的人。",
    ],
    watchOut: [
      "先要能进学校，再谈进班；学校录取线和图灵班门槛不是一回事。",
      "如果你不接受入校后二次竞争，这类班型风险会明显高于高考直招项目。",
    ],
  },
  "致远学院计算机科学方向（ACM班）": {
    fitFor: [
      "适合算法能力强、编程基础好、愿意在计算机方向走拔尖培养路线的学生。",
      "适合能接受入校后继续竞争，并愿意投入竞赛或科研型训练的人。",
    ],
    watchOut: [
      "它不是普通高考直接专业名称，核心门槛在校内荣誉方向选拔。",
      "如果你只是想学计算机但不想承担高竞争和高强度训练，不一定适合。",
    ],
  },
  "致远学院计算机科学方向（约翰·霍普克罗夫特班）": {
    fitFor: [
      "适合计算机理论基础好、愿意补系统能力和数学底层训练的学生。",
      "适合接受致远学院校内招生和荣誉培养节奏的人。",
    ],
    watchOut: [
      "当前口径是校内招生/校内选拔，不是高考志愿里直接锁定的班。",
      "看这类项目时要重点确认入校后的选拔节点和淘汰压力。",
    ],
  },
  香农计划: {
    fitFor: [
      "适合明确想走芯片、集成电路路线，并愿意接受本博融通培养的学生。",
      "适合不满足于普通电子信息大类、希望更早锁定产业与科研方向的人。",
    ],
    watchOut: [
      "这类项目的好处在路径更清晰，但也意味着更早锁定赛道。",
      "报之前要确认自己是真的想做芯片，而不是只觉得名字热门。",
    ],
  },
  相辉计划: {
    fitFor: [
      "适合不想过早被单一专业束缚、愿意接受大一打通和后续分流的学生。",
      "适合喜欢交叉培养、能接受更长培养周期和更高自主性的学生。",
    ],
    watchOut: [
      "项目越强调交叉和本博融通，越需要你自己主动规划，不适合完全被动型学生。",
      "报前要看清后续分流、导师匹配和转出规则。",
    ],
  },
  "工科试验班（竺可桢学院图灵班）": {
    fitFor: [
      "适合计算机方向明确，同时愿意接受竺可桢学院拔尖培养节奏的学生。",
      "适合能在高考阶段就确定自己更偏计算机强班路线的人。",
    ],
    watchOut: [
      "虽然是高考可见班型，但仍要看你所在省份是否真的开放该项目。",
      "这类试验班节奏快、课程深，不能只按“计算机更强一点”去理解。",
    ],
  },
  "量子科技先锋计划": {
    fitFor: [
      "适合数理基础强，对量子传感、量子计算、量子通信这类前沿方向真有兴趣的学生。",
      "适合愿意接受本博贯通和交叉平台训练的学生。",
    ],
    watchOut: [
      "前沿不等于轻松，这类项目对数学、物理底子要求通常更高。",
      "如果你只是冲着新名词报，后续课程可能会非常吃力。",
    ],
  },
  "少年班及创新试点班": {
    fitFor: [
      "适合学业明显超前、能适应提前进入大学体系的学生。",
      "适合愿意走长周期科研培养路线，而不是只追普通高考志愿安全感的人。",
    ],
    watchOut: [
      "它本质上不是普通高考替代项，时间线和选拔逻辑都独立。",
      "如果你的节奏更适合常规高考批次，就不该把少年班当默认路线。",
    ],
  },
};

function containsKeyword(track: FeaturedTrackEntry, keywords: string[]) {
  const haystack = [track.name, track.category, track.route, track.note ?? "", ...track.tags].join(" ");
  return keywords.some((keyword) => haystack.includes(keyword));
}

function pushUnique(target: string[], value: string) {
  if (!target.includes(value)) {
    target.push(value);
  }
}

export function getTrackFitProfile(track: FeaturedTrackEntry): TrackFitProfile {
  const manual = manualTrackProfiles[track.name];

  if (manual) {
    return {
      ...manual,
      basis: profileBasis,
    };
  }

  const routeType = getTrackRouteType(track);
  const fitFor: string[] = [];
  const watchOut: string[] = [];

  if (routeType === "高考直招") {
    pushUnique(fitFor, "适合目标明确，愿意在填报阶段就直接锁定该培养路径的学生。");
    pushUnique(watchOut, "先确认该项目是否在你所在省份开放，以及它对应的专业组和选科要求。");
  }

  if (routeType === "综合选拔") {
    pushUnique(fitFor, "适合高考成绩和校测能力都比较强，能同时准备两条线的学生。");
    pushUnique(watchOut, "这类项目通常既看高考也看校测，不适合临时起意。");
  }

  if (routeType === "专项选拔") {
    pushUnique(fitFor, "适合愿意提前准备报名、测试和面试流程的学生。");
    pushUnique(watchOut, "专项选拔时间线更早，错过报名节点通常就没有机会。");
  }

  if (routeType === "校内选拔") {
    pushUnique(fitFor, "适合先冲学校，再接受入校后二次竞争的学生。");
    pushUnique(watchOut, "高考能进学校不等于能进强班，真正门槛往往在入校后的竞争。");
  }

  if (routeType === "培养平台") {
    pushUnique(fitFor, "适合不想太早被单一专业锁死、愿意接受平台式培养的学生。");
    pushUnique(watchOut, "先看清它是不是招生入口、后续怎么选专业，以及能否自由流动。");
  }

  if (containsKeyword(track, ["数学", "物理", "量子", "基础科学", "理论", "竞赛"])) {
    pushUnique(fitFor, "适合数理基础强，愿意接受更深理论训练和科研导向培养的学生。");
  }

  if (containsKeyword(track, ["计算机", "人工智能", "算法", "系统", "网络安全", "智能"])) {
    pushUnique(fitFor, "适合编程兴趣强，愿意做系统、算法或人工智能方向高强度训练的学生。");
  }

  if (containsKeyword(track, ["航空航天", "空天", "飞行器", "航天"])) {
    pushUnique(fitFor, "适合明确接受硬核工科训练，并愿意长期投入空天方向的学生。");
  }

  if (containsKeyword(track, ["集成电路", "芯片", "微电子"])) {
    pushUnique(fitFor, "适合真正想走芯片和集成电路方向，而不是只看热门标签的学生。");
  }

  if (containsKeyword(track, ["医学", "基础医学", "口腔"])) {
    pushUnique(fitFor, "适合能接受更长培养周期，对医学科研或临床前训练有准备的学生。");
    pushUnique(watchOut, "医学类强班通常培养周期更长，报前要确认分流和转出规则。");
  }

  if (containsKeyword(track, ["中法", "港大", "联合培养", "国际化", "赴法", "英语"])) {
    pushUnique(fitFor, "适合能接受联合培养、语言要求和跨校资源调度的学生。");
    pushUnique(watchOut, "联合培养项目通常伴随语言、课程对接和培养成本差异，报前要看清规则。");
  }

  if (containsKeyword(track, ["本博贯通", "本研贯通", "本博一体化", "交叉培养", "未来技术"])) {
    pushUnique(fitFor, "适合愿意接受跨学科和更长培养周期，不急着把自己锁死在单一课程包里的学生。");
  }

  if (containsKeyword(track, ["荣誉课程", "科研训练", "科技英才班", "拔尖培养", "领军计划"])) {
    pushUnique(watchOut, "这类项目通常对学习主动性要求更高，不适合完全依赖外部安排的人。");
  }

  if (fitFor.length === 0) {
    fitFor.push("适合对该方向培养目标明确、愿意接受更强训练强度的学生。");
  }

  if (watchOut.length === 0) {
    watchOut.push("报前先点开官方来源，确认你所在省份和你自己的时间线是否真的匹配。");
  }

  return {
    fitFor: fitFor.slice(0, 3),
    watchOut: watchOut.slice(0, 2),
    basis: profileBasis,
  };
}
