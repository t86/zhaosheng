import type { HotDirectionSlug } from "@/data/hot-directions";

// 轻量方向自测：纯静态、确定性映射。
// 把 3-4 道单选题的答案组合，收敛到 hot-directions 主榜里真实存在的方向 slug。
// 只用主榜 10 个方向（页面卡片带 #slug 锚点，name/oneLiner 可查到），不造新 slug。

export type DirectionQuizOptionValue = string;

export type DirectionQuizOption = {
  value: DirectionQuizOptionValue;
  label: string;
  hint?: string;
};

export type DirectionQuizQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  options: DirectionQuizOption[];
};

export type DirectionQuizAnswers = Record<string, DirectionQuizOptionValue>;

export const directionQuizDisclaimer =
  "这不是科学测评，只是帮你把十几个方向缩小到值得继续看的几个，最终请结合孩子的兴趣和实际成绩判断。";

export const directionQuizQuestions: DirectionQuizQuestion[] = [
  {
    id: "goal",
    prompt: "第一步：你们更想要哪种结果？",
    helper: "先想清楚最看重什么，方向取舍才有依据。",
    options: [
      {
        value: "stable",
        label: "求稳就业",
        hint: "职业路径清晰、长期需求稳定、家长能理解的回报。",
      },
      {
        value: "future",
        label: "搏未来风口",
        hint: "愿意承担赛道波动，赌一个还在放大的新方向。",
      },
      {
        value: "elite",
        label: "冲顶尖科研",
        hint: "看重学科门槛、科研训练和顶尖平台资源。",
      },
    ],
  },
  {
    id: "math",
    prompt: "第二步：能不能接受高强度数理与编程训练？",
    helper: "很多热门方向真正拉开差距的是数学和代码，先诚实评估。",
    options: [
      {
        value: "strong",
        label: "完全可以",
        hint: "对公式、推导和写代码不抵触，甚至有点喜欢。",
      },
      {
        value: "ok",
        label: "一般，能扛",
        hint: "不算最强项，但愿意为方向去补。",
      },
      {
        value: "weak",
        label: "不太行",
        hint: "更想避开长期高强度数理和编程的路线。",
      },
    ],
  },
  {
    id: "style",
    prompt: "第三步：更偏动手实践，还是理论研究？",
    helper: "这决定你在同一个方向里会更舒服走工程线还是科研线。",
    options: [
      {
        value: "hands",
        label: "偏动手实践",
        hint: "喜欢做出东西、解决现场问题、看到落地结果。",
      },
      {
        value: "theory",
        label: "偏理论研究",
        hint: "喜欢钻原理、做研究，能接受较长的科研周期。",
      },
    ],
  },
  {
    id: "subject",
    prompt: "第四步：孩子的学科倾向更偏哪边？",
    helper: "用来给方向短名单做最后一层微调。",
    options: [
      {
        value: "physical",
        label: "数理 / 信息强",
        hint: "数学、物理、信息类学得相对顺手。",
      },
      {
        value: "bio",
        label: "生物 / 化学强",
        hint: "生物、化学更有感觉，对生命和医学话题感兴趣。",
      },
      {
        value: "human",
        label: "人文社科强",
        hint: "语言、社科类更擅长，理工科不是优势。",
      },
      {
        value: "unsure",
        label: "还不确定",
        hint: "学科倾向还没明显分化。",
      },
    ],
  },
];

// 主榜真实方向 slug（与 hotDirectionMainRecords 一一对应，均带页面锚点）
const STABLE_POOL: HotDirectionSlug[] = [
  "clinical-medicine",
  "smart-manufacturing",
  "new-energy-storage",
  "cybersecurity",
  "integrated-circuits",
  "biomedicine",
];

const FUTURE_POOL: HotDirectionSlug[] = [
  "artificial-intelligence",
  "embodied-robotics",
  "low-altitude-aerospace",
  "quantum-technology",
  "biomedicine",
];

const ELITE_POOL: HotDirectionSlug[] = [
  "artificial-intelligence",
  "integrated-circuits",
  "quantum-technology",
  "embodied-robotics",
  "biomedicine",
  "clinical-medicine",
];

function poolForGoal(goal?: DirectionQuizOptionValue): HotDirectionSlug[] {
  if (goal === "stable") return STABLE_POOL;
  if (goal === "future") return FUTURE_POOL;
  if (goal === "elite") return ELITE_POOL;
  // 还没选第一题时，给一个温和的默认池
  return ["artificial-intelligence", "smart-manufacturing", "clinical-medicine"];
}

// 给某个方向在当前答案下打一个确定性权重，权重越高越靠前。
function scoreDirection(
  slug: HotDirectionSlug,
  answers: DirectionQuizAnswers,
): number {
  let score = 0;

  // 数理与编程承受度
  const physicsHeavy: HotDirectionSlug[] = [
    "artificial-intelligence",
    "integrated-circuits",
    "quantum-technology",
    "embodied-robotics",
    "cybersecurity",
    "smart-manufacturing",
    "low-altitude-aerospace",
    "new-energy-storage",
  ];
  const lowMathFriendly: HotDirectionSlug[] = [
    "clinical-medicine",
    "biomedicine",
  ];

  if (answers.math === "strong" && physicsHeavy.includes(slug)) score += 3;
  if (answers.math === "ok" && physicsHeavy.includes(slug)) score += 1;
  if (answers.math === "weak") {
    if (lowMathFriendly.includes(slug)) score += 3;
    if (physicsHeavy.includes(slug)) score -= 3;
  }

  // 动手实践 vs 理论研究
  const handsOn: HotDirectionSlug[] = [
    "smart-manufacturing",
    "embodied-robotics",
    "new-energy-storage",
    "low-altitude-aerospace",
    "cybersecurity",
    "clinical-medicine",
  ];
  const theoryLeaning: HotDirectionSlug[] = [
    "quantum-technology",
    "integrated-circuits",
    "artificial-intelligence",
    "biomedicine",
  ];
  if (answers.style === "hands" && handsOn.includes(slug)) score += 2;
  if (answers.style === "theory" && theoryLeaning.includes(slug)) score += 2;

  // 学科倾向
  const physicalLeaning: HotDirectionSlug[] = [
    "artificial-intelligence",
    "integrated-circuits",
    "quantum-technology",
    "embodied-robotics",
    "cybersecurity",
    "smart-manufacturing",
    "low-altitude-aerospace",
    "new-energy-storage",
  ];
  const bioLeaning: HotDirectionSlug[] = ["biomedicine", "clinical-medicine"];

  if (answers.subject === "physical" && physicalLeaning.includes(slug)) score += 3;
  if (answers.subject === "bio") {
    if (bioLeaning.includes(slug)) score += 4;
    if (physicalLeaning.includes(slug)) score -= 1;
  }
  if (answers.subject === "human") {
    // 人文社科强：本榜没有纯文科方向，给偏交叉、门槛相对可补的方向轻微倾斜，
    // 同时压一压纯硬核数理方向，提醒别硬冲。
    if (slug === "clinical-medicine" || slug === "biomedicine") score += 1;
    if (slug === "quantum-technology" || slug === "integrated-circuits") score -= 2;
  }
  // unsure 不加不减，保持方向池原始倾向

  return score;
}

export type DirectionQuizResult = {
  slugs: HotDirectionSlug[];
  answeredCount: number;
  totalQuestions: number;
};

// 确定性计算方向短名单：同分时按方向池原始顺序（稳定排序）。
export function computeDirectionShortlist(
  answers: DirectionQuizAnswers,
): DirectionQuizResult {
  const totalQuestions = directionQuizQuestions.length;
  const answeredCount = directionQuizQuestions.filter(
    (q) => answers[q.id],
  ).length;

  const pool = poolForGoal(answers.goal);

  const ranked = pool
    .map((slug, index) => ({
      slug,
      // index 越小原始优先级越高，用负值并入分数保证同分稳定
      weight: scoreDirection(slug, answers) - index * 0.01,
    }))
    .sort((a, b) => b.weight - a.weight)
    .map((item) => item.slug);

  // 输出 3-5 个：池子本身就是 5-6 个，取前 5，至少 3 个
  const shortlist = ranked.slice(0, 5);

  return {
    slugs: shortlist,
    answeredCount,
    totalQuestions,
  };
}
