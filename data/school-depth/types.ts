// 学校"深挖"数据：优势 / 短板 / 转专业与多向发展资源，以及特色班型的课程与培养特点。
// 口径：优势与短板基于学科评估、双一流学科、地域与行业地位等公开事实，短板一律以
// "要权衡/要注意"的中性措辞呈现、有依据，不做无凭据的负面评价；转专业与辅修等政策以
// 各校公开培养方案/教务规定为准，逐年可能调整，最终以目标年份官方为准。

export type DepthSource = {
  label: string;
  url: string;
};

export type SchoolStrength = {
  title: string;
  detail: string;
};

export type SchoolWatchout = {
  title: string;
  detail: string;
};

export type MultiPathItem = {
  title: string; // 如「转专业」「辅修/双学位」「微专业」「交叉学科平台」「创新创业」
  detail: string;
};

export type SchoolDepth = {
  slug: string;
  schoolName: string;
  updatedAt: string;
  tagline?: string; // 一句话定位
  strengths: SchoolStrength[]; // 优势 / 最强
  watchouts: SchoolWatchout[]; // 短板 / 要权衡
  transferMajor: {
    freedom: "宽松" | "有条件" | "较受限";
    detail: string;
  };
  multiPath: MultiPathItem[]; // 多向发展资源
  crossfield: string; // 转行 / 跨方向的现实评估
  sources: DepthSource[];
};

export type TrackCurriculum = {
  schoolSlug: string;
  track: string; // 与 featured track 的 name 完全一致
  coreCourses: string[]; // 代表性核心课程
  trainingFeatures: string[]; // 培养特点（本研贯通 / 导师制 / 小班 / 国际化等）
  sources: DepthSource[];
};
