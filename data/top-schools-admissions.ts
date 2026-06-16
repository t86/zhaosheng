// 上海四校与清北复交录取：能查到什么、信什么。
// 核心原则：把"官方可核实"和"自媒体估算"严格分开。
// 中国近年禁止宣传高考升学率/状元，上海市教育考试院明确不向学校/机构提供中学排名数据，
// 所以"某中学考上多少清北"这类校级精确数字官方不存在；市面所有具体校级数字均为
// 升学公众号/知乎/家长论坛估算，本页一律标注"估算"，只作量级/方向参考，不可当准数。

export type Reliability = "official" | "estimate";

export type SourceRef = { label: string; url: string };

export type CanQueryItem = {
  topic: string;
  queryable: boolean; // 是否有官方可核实来源
  detail: string;
  source?: SourceRef;
};

export type CityStat = {
  label: string;
  rows: { year: string; value: string }[];
  tier: Reliability;
  note?: string;
};

export type ProbabilityItem = {
  label: string;
  value: string;
  detail: string;
};

export type SchoolEstimate = {
  name: string;
  qingbei: string; // 清北量级（估算）
  fudanSjtu: string; // 复交（综评为主）
};

export type SelfCheckPath = {
  title: string;
  detail: string;
  strength: "最硬" | "可核" | "有限";
  source?: SourceRef;
};

export const topSchoolsAdmissions = {
  updatedAt: "2026-06-16",
  intro:
    "上海“四校”指上海中学、华东师大二附中、复旦附中、交大附中。家长最想问的“四校各自考上多少清北复交、占多大比例”，这类校级精确数字官方并不发布——下面把“官方能查到什么”和“只有自媒体估算的”分开讲清楚。",
  banNote:
    "上海市教育考试院明确表示不向任何机构或学校提供区域和中学的排名数据，叠加“严禁宣传升学率、状元、上线率”的禁令，学校因此不发高考喜报。所以“某校清北 X 人”这种数据产品官方根本不存在，不是没找到，是制度上不发布。",

  canQuery: [
    {
      topic: "上海考生总数、本科线/特控线上线人数、高分段人数",
      queryable: true,
      detail: "上海市教育考试院每年随成绩公布“一分一段表/成绩分布表”，全市口径，最可靠。",
      source: { label: "上海市教育考试院成绩分布表（中国教育在线转载）", url: "https://gaokao.eol.cn/shang_hai/dongtai/202506/t20250623_2676343.shtml" },
    },
    {
      topic: "清北“零志愿”批次在沪录取数",
      queryable: true,
      detail: "考试院发布，但按高校汇总、不按中学。2024 年清华录取 26、北大本部 27 + 医学部 1，零志愿合计约 54 人。",
      source: { label: "上海市教育考试院 2024 零志愿批次录取", url: "https://www.shmeea.edu.cn/page/08000/20240708/18644.html" },
    },
    {
      topic: "清北强基计划在沪“招生名额”",
      queryable: true,
      detail: "两校招生网公示，但公示的是计划名额（2024 清华沪约 45、北大沪约 35），不是“哪所中学录了几个”。",
    },
    {
      topic: "竞赛保送清北名单（含姓名 + 所在中学）",
      queryable: true,
      detail: "教育部阳光高考平台公示拟录取名单，是少数能逐人核到具体中学的官方渠道——最硬。",
      source: { label: "教育部阳光高考平台·保送生公示", url: "https://gaokao.chsi.com.cn/" },
    },
    {
      topic: "复旦/上交综合评价录取名单",
      queryable: true,
      detail: "两校招办官网公示。注意复旦只公布姓名、不公布中学，靠姓名反推中学会有误差。",
      source: { label: "复旦大学综合评价录取公示", url: "https://ao.fudan.edu.cn/zhpj/list.htm" },
    },
    {
      topic: "国际部（如上中 SHSID）海外录取",
      queryable: true,
      detail: "学校官网每年发布正式《大学录取结果汇报》（藤校/牛剑 offer 份数），出国方向官方可查。",
      source: { label: "上海中学国际部 2025 届录取汇报", url: "https://cn.shsid.org/info/1661/61201.htm" },
    },
    {
      topic: "某校高考清北人数 / 清北复交率",
      queryable: false,
      detail: "学校不公布、官方不提供。市面所有“清北 X 人”“清北复交率 X%”均为升学自媒体/家长论坛估算，同一年同校不同来源常差十几人。",
    },
  ] as CanQueryItem[],

  cityStats: [
    {
      label: "高考考生数（秋考）",
      rows: [
        { year: "2023", value: "约 5.4 万" },
        { year: "2024", value: "约 5.4 万" },
        { year: "2025", value: "约 6.3 万（明显扩容）" },
      ],
      tier: "official",
    },
    {
      label: "特控线以上人数（≈ 冲头部高校基础盘）",
      rows: [
        { year: "2023", value: "18,635（504 分）" },
        { year: "2024", value: "18,767（503 分）" },
        { year: "2025", value: "22,797（505 分）" },
      ],
      tier: "official",
      note: "特殊类型招生控制线，可近似理解为“高水平/一本”参考线。",
    },
    {
      label: "本科线以上人数",
      rows: [
        { year: "2024", value: "41,594（403 分）" },
        { year: "2025", value: "49,276（402 分）" },
      ],
      tier: "official",
    },
    {
      label: "清北在沪录取规模",
      rows: [
        { year: "2024", value: "零志愿官方 54 人；各渠道相加估约 200 人" },
        { year: "2025", value: "零志愿约 62 人；强基自媒体口径在沪约 106 人" },
      ],
      tier: "estimate",
      note: "官方硬数只有“零志愿”；强基/保送等相加得的“约 200 人”是自媒体估算和，各渠道易重复或遗漏。",
    },
    {
      label: "复旦 + 上交在沪录取规模",
      rows: [{ year: "2024-2025", value: "合计约 1300–1700 人（以综合评价为主）" }],
      tier: "estimate",
      note: "复交是综评录取上海考生的大头；单校拆分（复旦约 600、交大约 710）为自媒体按计划目录整理。",
    },
  ] as CityStat[],

  probabilities: [
    { label: "上海考生上清北", value: "约 0.35%–0.43%", detail: "约 200 人 ÷ 约 5.4–6 万考生，几百分之一。" },
    { label: "上海考生上复交", value: "约 3%", detail: "约 1300–1700 人 ÷ 约 5.4–6 万考生，约三十分之一。" },
    { label: "复交 vs 清北难度", value: "约 7–8 倍", detail: "复交在沪招生量远大于清北，所以“上海人考上复交”的概率大致是“考上清北”的 7–8 倍。" },
  ] as ProbabilityItem[],

  schoolEstimates: [
    { name: "上海中学", qingbei: "约 40–70 人（全市最强）", fudanSjtu: "强（综评约 121）" },
    { name: "华东师大二附中", qingbei: "约 40–55 人", fudanSjtu: "强（综评约 102）" },
    { name: "复旦附中", qingbei: "约 20–45 人", fudanSjtu: "很强（综评约 146）" },
    { name: "交大附中", qingbei: "约 11–19 人（四校里偏少）", fudanSjtu: "综评最强（约 166，常居首）" },
  ] as SchoolEstimate[],

  share: {
    qingbei: "2025 强基口径：清北在沪约 106 人分布在约 21 所高中，四校（主校）合计约占 78%，上中 + 华二 + 复附三校约占 67%。",
    fudanSjtu: "2025 综评口径：总录取约 1310 人，四校主校约占 41%，算上分校约 60%。",
    conclusion:
      "清北/复交录取高度集中在四校 + 八大金刚 + 头部市重点，普通高中极少——这个“集中度极高”的方向多源印证、可信；但任何精确百分比都依赖未公开的逐校名单，属自媒体估算。",
  },

  selfCheck: [
    {
      title: "竞赛保送清北",
      detail: "教育部阳光高考平台公示拟录取名单，含姓名 + 中学，可逐人核到具体学校。",
      strength: "最硬",
      source: { label: "阳光高考平台", url: "https://gaokao.chsi.com.cn/" },
    },
    {
      title: "复旦 / 上交综评录取",
      detail: "两校招办官网公示录取名单（复旦只给姓名、不给中学，反推有误差）。",
      strength: "可核",
      source: { label: "复旦综评公示", url: "https://ao.fudan.edu.cn/zhpj/list.htm" },
    },
    {
      title: "清北强基计划",
      detail: "官方只对考生本人公布结果、阳光高考公示简章，但不发布校级排名。",
      strength: "有限",
    },
    {
      title: "出国方向",
      detail: "上中等国际部官网有正式《大学录取结果汇报》，藤校/牛剑 offer 份数官方可查。",
      strength: "可核",
      source: { label: "上中国际部录取汇报", url: "https://cn.shsid.org/info/1661/61201.htm" },
    },
  ] as SelfCheckPath[],

  bottomLine:
    "判断一所学校的头部实力，用“强基 + 保送 + 综评”这三类官方可核名单去倒推，比信“清北 X 人”的喜报可靠得多。把“四校占上海清北复交大头、集中度极高”当作可信方向，但任何具体人数和百分比都应默认是自媒体估算、学校未公布、官方不提供。",
};
