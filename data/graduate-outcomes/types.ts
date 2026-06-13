// 毕业生去向与深造/就业数据类型。
// 数据口径：以各校官方《毕业生就业质量报告》和官网披露为主；
// 专业级薪资官方普遍不公布，若引用第三方（如麦可思）必须用 sourceType 标注并注明年份。

export type OutcomeSourceType =
  | "official" // 学校官方就业质量报告 / 官网
  | "official_story" // 学校官网转载的报道
  | "third_party" // 第三方机构（麦可思等），非学校官方
  | "non_official"; // 其他网络行情，仅作参考

export type GraduateOutcomeSource = {
  label: string;
  url: string;
  note: string;
  sourceType: OutcomeSourceType;
};

export type OutcomeStat = {
  label: string; // 如「深造率」「境外深造」「就业率」「毕业生总数」
  value: string; // 如「78.3%」「约 9000 人」
  note?: string;
};

export type OutcomeFlow = {
  name: string; // 行业名 / 地域名 / 单位名
  share?: string; // 如「23.5%」，缺失则不写
  note?: string;
};

export type MajorOutcome = {
  name: string; // 院系或专业名
  advanceRate?: string; // 深造率，如「65%」
  outcomeNote?: string; // 去向描述（深造/就业流向）
  salary?: {
    value: string; // 如「约 18 万元/年」
    year?: string; // 数据年份
    sourceType: OutcomeSourceType; // 薪资几乎都是 third_party
    sourceLabel: string; // 来源说明，如「麦可思 2024 届」
  };
};

export type SchoolGraduateOutcome = {
  slug: string;
  schoolName: string;
  reportLabel: string; // 如「2024 届毕业生就业质量报告」
  reportYear: string; // 如「2024」
  updatedAt: string; // 数据整理日期，如「2026-06-13」
  overview: {
    summary: string; // 1-2 句学校级去向概述
    stats: OutcomeStat[]; // 深造率 / 出国率 / 就业率 / 毕业生总数等
  };
  industries?: OutcomeFlow[]; // 主要就业行业流向
  regions?: OutcomeFlow[]; // 主要就业地域流向
  keyEmployers?: string[]; // 重点就业单位（官方报告点名）
  byMajor?: MajorOutcome[]; // 院系/专业级去向（官方报告附录有的才填）
  salaryNote?: string; // 薪资整体说明与口径提醒
  sources: GraduateOutcomeSource[];
};
