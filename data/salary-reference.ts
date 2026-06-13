// 专业薪资参考数据。
// 重要口径：以下为「全国本科 · 毕业半年后月收入」量级参考，来自第三方调查机构
// 麦可思 MyCOS《2025 年中国本科生就业报告 / 就业蓝皮书》（对应 2024 届，2025 年 6 月发布，
// 全国样本约 17.1 万、覆盖 474 个本科专业），以及国家统计局、智联招聘等公开数据。
// 它不是某所学校、某个具体专业组、985 院校或上海地区的单独口径，更不是收入承诺；
// 仅用于帮助家长建立"不同专业方向大致薪资量级"的直觉。学校官方就业报告普遍不公布专业级薪资。

export type SalarySourceType = "third_party" | "official" | "non_official";

export type SalarySource = {
  label: string;
  url: string;
  note: string;
  sourceType: SalarySourceType;
  year: string;
};

export type HighPayingMajor = {
  rank: number;
  major: string;
  discipline: string; // 学科门类
  monthly: number; // 毕业半年后月收入（元）
  cohort: string;
};

export type SignalMajor = {
  name: string;
  signal: "green" | "red"; // 绿牌（需求增长、就业景气）/ 红牌（就业预警）
  cohort: string;
  note?: string;
};

export type IndustrySalary = {
  name: string;
  monthly: number; // 毕业半年后月收入（元）
  cohort: string;
  note?: string;
};

export type SalaryReference = {
  updatedAt: string;
  nationalAverage: {
    monthly: number;
    cohort: string;
    sourceLabel: string;
    sourceUrl: string;
  };
  methodology: string[];
  highPayingMajors: HighPayingMajor[];
  signalMajors: SignalMajor[];
  industries: IndustrySalary[];
  crossCheck: string;
  sources: SalarySource[];
};

export const salaryReference: SalaryReference = {
  updatedAt: "2026-06-13",
  nationalAverage: {
    monthly: 6199,
    cohort: "2024 届",
    sourceLabel: "麦可思《2025 年中国本科生就业报告》（经第一财经、新浪财经转载）",
    sourceUrl: "https://www.yicai.com/news/102662440.html",
  },
  methodology: [
    "数字均来自麦可思 MyCOS《2025 年中国本科生就业报告》，统计口径是「全国本科毕业生·毕业半年后月收入」，对应 2024 届，2025 年 6 月发布。",
    "这是全国本科大类口径，不是 985、不是上海、也不是某校某专业组的单独数据。同一个专业，名校与普通院校、一线与三四线城市的实际收入差距可能很大。",
    "下方「高薪专业榜」是麦可思公开的「月收入最高的 10 个本科专业」，是按【具体专业】排的，不是整个专业大类的平均值——整个大类的平均会低于榜上数字，别把它当成该方向人人都能拿到的收入。",
    "薪资只是选专业的一个维度。请结合孩子的兴趣、学科特长、红绿牌就业景气趋势，以及目标院校的官方就业报告综合判断。",
  ],
  highPayingMajors: [
    { rank: 1, major: "信息安全", discipline: "工学", monthly: 7599, cohort: "2024 届" },
    { rank: 2, major: "微电子科学与工程", discipline: "工学", monthly: 7282, cohort: "2024 届" },
    { rank: 3, major: "电子科学与技术", discipline: "工学", monthly: 7215, cohort: "2024 届" },
    { rank: 4, major: "自动化", discipline: "工学", monthly: 7108, cohort: "2024 届" },
    { rank: 5, major: "软件工程", discipline: "工学", monthly: 7092, cohort: "2024 届" },
    { rank: 6, major: "材料成型及控制工程", discipline: "工学", monthly: 7077, cohort: "2024 届" },
    { rank: 7, major: "光电信息科学与工程", discipline: "工学", monthly: 7076, cohort: "2024 届" },
    { rank: 8, major: "电子信息科学与技术", discipline: "工学", monthly: 7058, cohort: "2024 届" },
    { rank: 9, major: "机械设计制造及其自动化", discipline: "工学", monthly: 7051, cohort: "2024 届" },
    { rank: 10, major: "机械电子工程", discipline: "工学", monthly: 7018, cohort: "2024 届" },
  ],
  signalMajors: [
    { name: "电气工程及其自动化", signal: "green", cohort: "2024 届", note: "需求增长、就业景气，连续多年绿牌。" },
    { name: "微电子科学与工程", signal: "green", cohort: "2024 届", note: "半导体方向，2024 届月收入约 7282 元、本科高薪榜第 2 位。" },
    { name: "机械电子工程", signal: "green", cohort: "2024 届", note: "智能制造方向，2024 届高薪榜第 10 位。" },
    { name: "新能源科学与工程", signal: "green", cohort: "2024 届", note: "对应新能源产业扩张，需求增长。" },
    { name: "车辆工程", signal: "green", cohort: "2024 届", note: "受新能源汽车产业带动进入绿牌名单。" },
    { name: "机器人工程", signal: "green", cohort: "2024 届", note: "智能制造/自动化方向新兴绿牌。" },
    { name: "公共事业管理", signal: "red", cohort: "2024 届", note: "就业落实率、薪资、满意度综合偏低，就业预警。" },
    { name: "音乐表演", signal: "red", cohort: "2024 届", note: "艺术类红牌，就业去向落实率与薪资偏低。" },
    { name: "绘画", signal: "red", cohort: "2024 届", note: "连续五年红牌，长期就业预警。" },
    { name: "法学", signal: "red", cohort: "2024 届", note: "连续五年红牌；报考需结合法考通过率与就业现实理性评估。" },
    { name: "美术学", signal: "red", cohort: "2024 届", note: "艺术理论类红牌，就业满意度与薪资综合偏低。" },
  ],
  industries: [
    {
      name: "电子电气设备制造业（含计算机、通信、家电等）",
      monthly: 7153,
      cohort: "2023 届",
      note: "该届首次反超 IT 业登顶本科就业行业薪酬榜。",
    },
    {
      name: "信息传输、软件和信息技术服务业",
      monthly: 7113,
      cohort: "2022 届",
      note: "长期居本科就业行业薪酬前列。",
    },
  ],
  crossCheck:
    "用不同来源对「IT、电子、金融类显著高于平均」这一量级做交叉印证：国家统计局数据显示，2024 年城镇非私营单位中工资最高的行业仍是信息传输软件和信息技术服务业、金融业、科学研究和技术服务业；智联招聘《2024 年三季度招聘薪酬报告》也显示基金证券、保险、银行业招聘月薪明显高于 38 城平均。需注意：统计局/智联是全行业全人群口径，数值高于麦可思「应届本科毕业半年后」口径，两者不可直接相减，仅作量级方向印证。",
  sources: [
    {
      label: "第一财经：2024 届本科毕业生月均收入 6199 元，前十高薪专业均为工科（转载麦可思《2025 年中国本科生就业报告》）",
      url: "https://www.yicai.com/news/102662440.html",
      note: "确认 2024 届本科平均月收入 6199 元，及高薪专业 Top10 的逐字数字。",
      sourceType: "third_party",
      year: "2025",
    },
    {
      label: "人民政协网：2025 年版就业蓝皮书发布，绿牌专业揭晓",
      url: "http://www.rmzxw.com.cn/c/2025-06-11/3732505.shtml",
      note: "麦可思《2025 年版就业蓝皮书》绿牌专业名单与定义，数据为 2024 届。",
      sourceType: "third_party",
      year: "2025",
    },
    {
      label: "人民日报客户端/中国教育在线：2025 年本科红牌专业公布",
      url: "https://www.peopleapp.com/rmharticle/30049515009",
      note: "麦可思《2025 年版就业蓝皮书》红牌专业名单；法学、绘画连续五年红牌。",
      sourceType: "third_party",
      year: "2025",
    },
    {
      label: "国家统计局：2024 年城镇单位就业人员平均工资情况",
      url: "https://www.stats.gov.cn/sj/sjjd/202505/t20250516_1959829.html",
      note: "官方全行业口径，用于对 IT/金融高于平均的量级做交叉印证。",
      sourceType: "official",
      year: "2025",
    },
    {
      label: "观察者网：麦可思《2024 年中国本科生就业报告》行业薪酬（电子电气设备制造业反超）",
      url: "https://user.guancha.cn/main/content?id=1250189",
      note: "2023 届本科就业行业月收入数据来源。",
      sourceType: "third_party",
      year: "2024",
    },
  ],
};
