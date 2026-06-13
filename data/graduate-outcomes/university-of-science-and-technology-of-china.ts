import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";

const outcome: SchoolGraduateOutcome = {
  slug: "university-of-science-and-technology-of-china",
  schoolName: "中国科学技术大学",
  reportLabel: "2023 届毕业生就业质量年度报告",
  reportYear: "2023",
  updatedAt: "2026-06-13",
  overview: {
    summary:
      "中科大是典型的「研究型 + 深造导向」高校，本科生绝大多数选择继续深造，本科深造率长期保持全国前列（2023 届达 75.5%），其中保研免试占绝对主力；直接就业者高度集中于科研院所、芯片半导体与头部科技企业，整体毕业去向落实率约 91.9%。",
    stats: [
      { label: "毕业生总数", value: "7083 人", note: "本科 1792 人、硕士 3933 人、博士 1358 人（2023 届）" },
      { label: "本科深造率", value: "75.5%", note: "1353 人国内外深造，免试推荐研究生 975 人" },
      { label: "本科国内升学率", value: "61.7%", note: "1105 人" },
      { label: "本科出国（境）率", value: "13.8%", note: "248 人，较 2019 届（约 24.8%）明显回落" },
      { label: "毕业去向落实率", value: "91.9%", note: "全校口径（本硕博合计）" },
    ],
  },
  industries: [
    { name: "科学研究和技术服务业", share: "约 57.8%", note: "中科大第一大就业行业，对应大量科研院所与研发岗（占比为相近年度本科口径，可作量级参考）" },
    { name: "信息传输、软件和信息技术服务业", share: "约 24.1%", note: "互联网与软件，华为、字节、腾讯、阿里等" },
    { name: "制造业", share: "约 7.2%", note: "含芯片半导体、新能源装备等先进制造" },
    { name: "金融业", share: "约 2.8%" },
    { name: "教育", share: "约 2.2%", note: "高校与科研教学岗" },
  ],
  regions: [
    { name: "安徽（含合肥）", note: "本校所在地，就业人数最多" },
    { name: "广东", note: "深圳、广州，对接科技与制造企业" },
    { name: "上海" },
    { name: "江苏" },
    { name: "浙江" },
    { name: "北京" },
    { name: "华东地区整体占比最高", note: "其次为华南、华北、华中" },
  ],
  keyEmployers: [
    "华为",
    "国家电网",
    "比亚迪",
    "中国电子科技集团",
    "长鑫存储",
    "中芯国际",
    "字节跳动",
    "腾讯",
    "阿里巴巴",
    "科大讯飞",
    "中国科学院相关研究所",
    "各省市选调生（2023 届选调生 234 人、公务员/选调合计 384 人）",
  ],
  byMajor: [
    {
      name: "全校本科（深造导向）",
      advanceRate: "75.5%",
      outcomeNote: "本科生主体选择保研免试或考研、出国深造，直接就业仅约 9.7%，是全国深造率最高的高校之一。",
    },
    {
      name: "数学、物理、化学等理学院系",
      advanceRate: "高（普遍高于全校均值）",
      outcomeNote: "基础学科以国内外名校读研读博为主，少量直接进入科研院所。",
    },
    {
      name: "信息与计算机类（计算机、电子信息、人工智能）",
      outcomeNote: "深造与就业并重，就业者多去向华为、字节、腾讯、阿里等头部科技企业及芯片半导体公司。",
    },
    {
      name: "微电子 / 集成电路相关",
      outcomeNote: "对接长鑫存储、中芯国际、中国电子科技集团等芯片半导体单位，行业景气度高。",
    },
    {
      name: "生命科学与医学部",
      outcomeNote: "以继续深造（国内外读研读博）和进入科研院所、生物医药企业为主。",
    },
    {
      name: "工程科学（力学、精密机械、热科学等）",
      outcomeNote: "深造为主，就业流向先进制造、新能源、国防军工等单位。",
    },
    {
      name: "硕士毕业生",
      outcomeNote: "约九成直接就业，企业就业为主，其中约两成进入央企与国企。",
    },
    {
      name: "博士毕业生",
      outcomeNote: "去向科研院所与高等院校比例较高（约 56%），其余进入企业研发与国防军工单位。",
    },
  ],
  salaryNote:
    "中科大官方《毕业生就业质量年度报告》未公布专业级或学校级平均薪酬，网络流传的起薪数字来源不一、口径混乱。为避免误导，本站暂不收录中科大的具体薪资数字。",
  sources: [
    {
      label: "中国科大信息公开 · 毕业生就业质量年度报告列表",
      url: "https://xxgk.ustc.edu.cn/gxbysjyzlndbg/list.htm",
      note: "学校信息公开官方栏目，列出历年就业质量年度报告，最新已发布为 2023 届。",
      sourceType: "official",
    },
    {
      label: "中国科大 · 2023 届毕业生就业质量年度报告",
      url: "https://xxgk.ustc.edu.cn/2024/1024/c37463a658224/page.htm",
      note: "2023 届报告官方页面（2024-10-24 发布）。",
      sourceType: "official",
    },
    {
      label: "自主选拔在线 · 中科大 2023 届就业质量报告解读",
      url: "https://www.zizzs.com/gk/anhuixingaokao/186654.html",
      note: "第三方对官方 2023 届报告的转述，含毕业生规模、深造率与重点单位。",
      sourceType: "third_party",
    },
    {
      label: "搜狐转载 · 中科大就业质量报告（行业与地域流向）",
      url: "https://www.sohu.com/a/630611839_121376563",
      note: "第三方转载，提供行业占比与主要雇主名单，部分为相近年度本科口径，仅作量级参考。",
      sourceType: "third_party",
    },
  ],
};

export default outcome;
