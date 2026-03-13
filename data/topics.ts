export type TopicDefinition = {
  slug:
    | "c9"
    | "east-china-five"
    | "defense-seven-985"
    | "teacher-training-985"
    | "medical-strong"
    | "agriculture-forestry"
    | "humanities-social-science"
    | "west-pillar";
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
};

export const topicDefinitions: TopicDefinition[] = [
  {
    slug: "c9",
    title: "C9 联盟",
    shortTitle: "C9",
    description: "顶尖研究型大学群，适合用来识别最高分段学校梯队。",
    accent: "amber",
  },
  {
    slug: "east-china-five",
    title: "华东五校",
    shortTitle: "华五",
    description: "复旦、上交、南大、浙大、中科大，是家长和高分考生最常对比的一组。",
    accent: "blue",
  },
  {
    slug: "defense-seven-985",
    title: "国防七子中的 985",
    shortTitle: "军工 985",
    description: "只展示 985 范围内的军工强校，适合对航空航天、兵器、国防科技感兴趣的学生。",
    accent: "red",
  },
  {
    slug: "teacher-training-985",
    title: "师范 985",
    shortTitle: "师范",
    description: "两所头部师范类 985，教育学、心理学和基础学科培养很有辨识度。",
    accent: "green",
  },
  {
    slug: "medical-strong",
    title: "医学实力强",
    shortTitle: "医学",
    description: "适合医学志向明确、想兼顾综合平台与附属医院资源的学生。",
    accent: "plum",
  },
  {
    slug: "agriculture-forestry",
    title: "农林方向强",
    shortTitle: "农林",
    description: "聚焦农业、林学、食品与生命科学的 985 组合。",
    accent: "forest",
  },
  {
    slug: "humanities-social-science",
    title: "人文社科强",
    shortTitle: "人文社科",
    description: "适合法学、经济、管理、新闻和文史方向优先的学生做初筛。",
    accent: "ink",
  },
  {
    slug: "west-pillar",
    title: "西部支点 985",
    shortTitle: "西部",
    description: "覆盖成渝、西安、兰州等西部核心城市，适合希望兼顾性价比和区域机会的学生。",
    accent: "sunset",
  },
];

export const topicDefinitionMap = new Map(
  topicDefinitions.map((topic) => [topic.slug, topic]),
);
