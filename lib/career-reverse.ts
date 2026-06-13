// 职业反推：从「未来想做什么」倒推到方向 / 学校。
//
// 口径：只基于已整理的 10 所顶尖 985 官方就业报告（data/graduate-outcomes）。
// 做法是「反向聚合」——把各校 keyEmployers / industries / overview.stats 里
// 明确点名某个去向的学校挑出来，再从该校 majorProfile.majors（站内强势专业序列）
// 或就业数据里取一个真实、对口的强势方向。匹配不到的学校不硬塞，宁可留空。
//
// 严格不编造：所有 schoolName / matchedSignal / direction 都来自真实数据文件。

import { graduateOutcomesBySlug } from "@/data/graduate-outcomes";
import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";
import { getSchool } from "@/lib/schools";

export type CareerPathSchool = {
  slug: string;
  schoolName: string;
  // 该校对应这条去向的真实强势方向（取自 majorProfile.majors 或官方就业数据）。
  direction: string;
  // 命中这条去向的真实信号（来自该校 keyEmployers / industries / stats 的原文片段）。
  matchedSignal: string;
};

export type CareerPath = {
  id: string;
  label: string; // 入口卡标题，如「进大厂 · 科技」
  emoji: string;
  tagline: string; // 一句话解释这条去向是什么
  // 用于匹配 keyEmployers / industries.name / stats 文本的关键词。
  keywords: string[];
  // 该校对应方向的取向：优先从强势专业里挑哪一类（用关键词在 major.name/cluster/tags 上匹配），
  // 取不到就回退到就业数据描述。
  majorHints: string[];
  schools: CareerPathSchool[];
};

// ---- 内部工具 ----

// 在一所学校的就业数据里找出「命中关键词」的原文信号片段（keyEmployers / industries / stats）。
function findSignal(
  outcome: SchoolGraduateOutcome,
  keywords: string[],
): string | undefined {
  const hit = (text: string) =>
    keywords.some((kw) => text.includes(kw));

  // 1) 重点就业单位（官方点名，最硬的信号）
  const employerHits = (outcome.keyEmployers ?? []).filter((e) => hit(e));
  if (employerHits.length > 0) {
    return `重点单位：${employerHits.slice(0, 3).join("、")}`;
  }

  // 2) 行业流向
  const industryHits = (outcome.industries ?? []).filter((i) => hit(i.name));
  if (industryHits.length > 0) {
    const top = industryHits[0];
    return `就业行业：${top.name}${top.share ? `（${top.share}）` : ""}`;
  }

  // 3) 学校级关键指标（如选调人数、深造率等）
  const statHits = (outcome.overview.stats ?? []).filter(
    (s) => hit(s.label) || hit(s.value) || (s.note ? hit(s.note) : false),
  );
  if (statHits.length > 0) {
    const top = statHits[0];
    return `${top.label}：${top.value}`;
  }

  return undefined;
}

// 从一所学校挑一个对口这条去向的真实强势方向。
// 先用 majorHints 在站内强势专业（majorProfile.majors）的 name/cluster/tags 上匹配；
// 命中就用该专业名；否则回退到匹配上的就业行业 / 重点单位描述，保证「真实即可」。
function pickDirection(
  slug: string,
  outcome: SchoolGraduateOutcome,
  majorHints: string[],
  keywords: string[],
): string {
  const school = getSchool(slug);
  const majors = school?.majorProfile?.majors ?? [];

  const matchedMajor = majors.find((m) => {
    const haystack = [m.name, m.cluster, ...(m.tags ?? [])].join(" ");
    return majorHints.some((hint) => haystack.includes(hint));
  });
  if (matchedMajor) {
    return `强势方向：${matchedMajor.name}`;
  }

  // 回退 1：byMajor 里命中关键词的院系
  const matchedByMajor = (outcome.byMajor ?? []).find((bm) =>
    majorHints.some((hint) => bm.name.includes(hint)),
  );
  if (matchedByMajor) {
    return `对口院系：${matchedByMajor.name}`;
  }

  // 回退 2：命中的就业行业
  const matchedIndustry = (outcome.industries ?? []).find((i) =>
    keywords.some((kw) => i.name.includes(kw)),
  );
  if (matchedIndustry) {
    return `就业方向：${matchedIndustry.name}`;
  }

  // 回退 3：取站内排第一的强势专业（仍是真实数据）
  if (majors.length > 0) {
    return `强势方向：${majors[0].name}`;
  }

  return "以官方就业报告披露的行业 / 单位流向为准";
}

// 去向标签定义（关键词 + 取向提示均贴合 10 校真实数据）。
const PATH_DEFS: Omit<CareerPath, "schools">[] = [
  {
    id: "tech",
    label: "进大厂 · 科技",
    emoji: "💻",
    tagline:
      "想进华为、腾讯、阿里、字节、比亚迪、中芯国际、长江存储这类科技与硬科技企业。",
    keywords: [
      "华为",
      "腾讯",
      "阿里",
      "字节",
      "百度",
      "京东",
      "美团",
      "比亚迪",
      "中芯国际",
      "长江存储",
      "长鑫存储",
      "海康威视",
      "紫光展锐",
      "科大讯飞",
      "中兴",
      "信息技术",
      "软件",
      "信息传输",
    ],
    majorHints: [
      "计算机",
      "电子",
      "信息",
      "自动化",
      "人工智能",
      "智能",
      "集成电路",
      "微电子",
      "软件",
      "通信",
    ],
  },
  {
    id: "civil",
    label: "进体制 · 选调",
    emoji: "🏛️",
    tagline:
      "想走选调生、公务员，或进国家电网、航天、核工业、兵器等关乎国计民生的央企与机关。",
    keywords: [
      "选调",
      "公务员",
      "党政机关",
      "机关",
      "公共管理",
      "国家电网",
      "电网",
      "航天",
      "核工业",
      "兵器",
      "船舶",
      "航空工业",
      "电子科技集团",
      "中国电科",
      "国防",
      "部委",
      "央企",
      "国资委",
    ],
    majorHints: [
      "电气",
      "能源",
      "航空",
      "航天",
      "核",
      "船舶",
      "兵器",
      "自动化",
      "法学",
      "公共管理",
      "经济",
      "管理",
    ],
  },
  {
    id: "finance",
    label: "进金融",
    emoji: "📈",
    tagline: "想进银行、证券、基金、保险等金融机构，或做金融工程、量化、咨询。",
    keywords: [
      "金融",
      "银行",
      "证券",
      "基金",
      "保险",
      "投资",
      "工商银行",
      "中国银行",
      "中央金融",
    ],
    majorHints: [
      "金融",
      "经济",
      "管理",
      "数学",
      "统计",
      "会计",
      "财",
    ],
  },
  {
    id: "medical",
    label: "进医疗 · 三甲",
    emoji: "🩺",
    tagline: "想当医生、进三甲医院与医疗卫生系统，或读临床医学、走规培。",
    keywords: [
      "三甲",
      "医院",
      "临床",
      "医学",
      "卫生",
      "医疗",
      "社会工作",
    ],
    majorHints: [
      "临床",
      "医学",
      "口腔",
      "基础医学",
      "药",
      "生命",
    ],
  },
  {
    id: "research",
    label: "深造做科研",
    emoji: "🔬",
    tagline:
      "想本科后继续读研读博、进高校与科研院所，把基础学科或前沿方向做深。",
    keywords: [
      "深造",
      "升学",
      "科学研究",
      "科研",
      "中国科学院",
      "研究所",
      "学术",
      "双一流",
      "QS",
    ],
    majorHints: [
      "数学",
      "物理",
      "化学",
      "理学",
      "生命",
      "材料",
      "力学",
      "基础",
    ],
  },
];

// 一所学校是否「明确点名」这条去向：keyEmployers / industries / stats 里命中关键词即算。
function matchesPath(outcome: SchoolGraduateOutcome, keywords: string[]): boolean {
  return findSignal(outcome, keywords) !== undefined;
}

// 反向聚合：对每条去向，扫描 10 校，挑出明确点名该去向的学校。
export function buildCareerPaths(): CareerPath[] {
  const outcomes = Object.values(graduateOutcomesBySlug).filter(
    (o): o is SchoolGraduateOutcome => Boolean(o),
  );

  return PATH_DEFS.map((def) => {
    const schools: CareerPathSchool[] = outcomes
      .filter((outcome) => matchesPath(outcome, def.keywords))
      .map((outcome) => ({
        slug: outcome.slug,
        schoolName: outcome.schoolName,
        direction: pickDirection(
          outcome.slug,
          outcome,
          def.majorHints,
          def.keywords,
        ),
        matchedSignal: findSignal(outcome, def.keywords) ?? "",
      }));

    return { ...def, schools };
  }).filter((path) => path.schools.length > 0);
}

// 站内已整理的就业报告学校数（用于口径声明，不写死）。
export function getCoveredSchoolCount(): number {
  return Object.values(graduateOutcomesBySlug).filter(Boolean).length;
}
