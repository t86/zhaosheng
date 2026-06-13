import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";

const outcome: SchoolGraduateOutcome = {
  slug: "fudan-university",
  schoolName: "复旦大学",
  reportLabel: "2024 届毕业生就业质量相关数据（本科口径）",
  reportYear: "2024",
  updatedAt: "2026-06-13",
  overview: {
    summary:
      "复旦大学本科毕业生以继续深造为主流，深造率长期保持在七成以上：约四分之三的本科生选择国内升学或出国（境）留学，直接就业的比例不到两成。直接就业者高度集中在上海，行业以金融、信息技术、医疗卫生、教育科研、咨询与高端制造为主。",
    stats: [
      {
        label: "本科毕业生总数（2024 届）",
        value: "约 3328 人",
        note: "应届本科毕业生口径，不含港澳台侨及留学生；当年本科毕业生计划数约 3450 人。",
      },
      {
        label: "深造率（升学合计）",
        value: "74.70%",
        note: "国内升学 1849 人 + 出国（境）留学 637 人，合计 2486 人。",
      },
      {
        label: "国内升学",
        value: "1849 人",
      },
      {
        label: "出国（境）留学",
        value: "637 人",
      },
      {
        label: "直接就业",
        value: "517 人（约 15.5%）",
      },
      {
        label: "总体就业率（落实率）",
        value: "90.23%",
        note: "截至 2024 年 8 月 31 日的初次去向落实率，含升学、就业等。",
      },
    ],
  },
  industries: [
    { name: "金融业（银行、证券、基金、保险）", note: "复旦经管、数理类毕业生重要去向之一。" },
    { name: "信息传输、软件和信息技术服务业", note: "含头部互联网与科技企业。" },
    { name: "卫生和社会工作（医疗卫生）", note: "上海医学院相关学科主要去向。" },
    { name: "教育与科研", note: "高校、科研院所、基础教育等。" },
    { name: "租赁和商务服务业（咨询等）" },
    { name: "高端制造与半导体、新能源" },
  ],
  regions: [
    { name: "上海", note: "本科及研究生留沪就业比例长期居高，是复旦毕业生最集中的就业地。" },
    { name: "广东" },
    { name: "浙江" },
    { name: "北京" },
    { name: "江苏" },
  ],
  keyEmployers: [
    "华为",
    "中兴通讯",
    "长鑫存储",
    "海康威视",
    "紫光展锐",
    "京东",
    "美团",
    "百度",
    "各大银行与证券、基金、保险机构",
    "三甲医院与医疗卫生机构",
    "高校与科研院所",
    "各省市定向选调生（选调）",
  ],
  byMajor: [
    {
      name: "数学科学学院 / 物理学等理科",
      outcomeNote:
        "深造率在全校位居前列，多数学生赴国内外名校读研，直接就业者多流向金融、信息技术等领域。",
    },
    {
      name: "经济学院 / 管理学院（经管类）",
      outcomeNote:
        "去向以升学深造和金融、咨询、互联网、实体行业就业为主；硕士层面金融、咨询是主要就业方向，留沪比例高。",
    },
    {
      name: "计算与智能创新学院（计算机类）",
      outcomeNote:
        "本科就业率长期位于全校前列，深造与就业并重，就业集中于头部互联网与科技企业。",
    },
    {
      name: "上海医学院（临床医学等）",
      outcomeNote:
        "长学制与升学深造为主，直接就业者主要进入三甲医院及医疗卫生机构。",
    },
    {
      name: "新闻学院",
      outcomeNote:
        "升学与就业并行，就业流向媒体、互联网内容与传播、企事业宣传等领域。",
    },
    {
      name: "法学院",
      outcomeNote:
        "去向含国内外升学、律所、公检法系统、企业法务及选调等。",
    },
    {
      name: "化学、生命科学等理科院系",
      outcomeNote:
        "以国内升学和出国（境）深造为主，少量进入科研院所、生物医药与制造企业。",
    },
  ],
  salaryNote:
    "复旦大学官方就业质量报告未公布专业级薪资，网络流传的精确起薪数字来源不一、口径各异，本站暂不收录以免误导。如需薪资参考请以学生本人入职 offer 与权威第三方报告为准。",
  sources: [
    {
      label: "复旦大学信息公开网 · 毕业生就业质量年度报告",
      url: "https://xxgk.fudan.edu.cn/bysjyzlndbg/list.htm",
      note: "复旦大学官方就业质量报告发布栏目（截至检索时公开版本最新至 2022 年，2024 届数据来自学校发布并经多家媒体转载）。",
      sourceType: "official",
    },
    {
      label: "复旦大学学生职业发展教育服务中心",
      url: "https://career.fudan.edu.cn/index.html",
      note: "学校就业指导官方网站。",
      sourceType: "official",
    },
    {
      label: "复旦大学管理学院 2024 届全日制毕业生就业报告（PDF）",
      url: "https://cdo-student.fdsm.fudan.edu.cn/resource/public/upload/2025/01/23/1737598973-197f264662-b9af-8787-6044-f66a8e83aabd.pdf",
      note: "复旦管理学院官方发布的院系级就业报告，含行业与去向流向。",
      sourceType: "official",
    },
    {
      label: "北京高考在线 · 复旦大学 2024 届本科毕业生就业质量报告",
      url: "https://www.gaokzx.com/gk/gaokao/135064.html",
      note: "转载复旦大学官方 2024 届本科就业核心数据（毕业生数、就业率、升学率、出国率）。",
      sourceType: "official_story",
    },
    {
      label: "搜狐教育 · 复旦大学 2023-2024 学年本科教学质量报告就业深造情况",
      url: "https://www.sohu.com/a/840618340_177136",
      note: "转载复旦本科教学质量报告中的去向数据，用于核对深造率与就业率。",
      sourceType: "official_story",
    },
  ],
};

export default outcome;
