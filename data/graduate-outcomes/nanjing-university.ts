import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";

const outcome: SchoolGraduateOutcome = {
  slug: "nanjing-university",
  schoolName: "南京大学",
  reportLabel: "2024 届毕业生就业质量报告",
  reportYear: "2024",
  updatedAt: "2026-06-13",
  overview: {
    summary:
      "南京大学是典型的「深造导向」名校：本科毕业生七成以上选择继续升学深造，境内升学几乎全部进入「双一流」高校，出国留学也多被全球顶尖名校录取。直接就业的毕业生以信息技术、制造业、公共管理、教育、科研等行业为主，地域上以江苏本地为主、辐射沪京粤浙，长三角加京粤五地吸纳了七成以上的就业毕业生。",
    stats: [
      {
        label: "本科毕业生升学深造率",
        value: "70.64%",
        note: "2024 届本科，含境内升学与出国（境）留学，截至 2024-08-31",
      },
      {
        label: "本科升学最主要去向",
        value: "升学 3425 人（占 52.60%）",
        note: "升学是 2024 届本科毕业生人数最多的单一去向",
      },
      {
        label: "境内升学流向「双一流」高校占比",
        value: "96.42%",
        note: "在国内继续读研的本科生中，绝大多数进入双一流建设高校",
      },
      {
        label: "出国（境）留学进入 QS 前 50 高校占比",
        value: "62.89%",
        note: "出国深造的本科生中近 2/3 被 QS 排名前 50 高校录取",
      },
      {
        label: "出国（境）留学进入 QS 前 100 高校占比",
        value: "75.67%",
        note: "出国深造本科生约 3/4 进入 QS 前 100 高校",
      },
      {
        label: "本科毕业率",
        value: "93.92%",
        note: "2024 届本科生毕业率（学位授予率 93.60%）",
      },
    ],
  },
  industries: [
    { name: "信息传输、软件和信息技术服务业", share: "17.82%" },
    { name: "制造业", share: "17.62%" },
    { name: "公共管理、社会保障和社会组织", share: "9.70%" },
    { name: "教育", share: "9.70%" },
    { name: "科学研究和技术服务业", share: "9.31%" },
  ],
  regions: [
    { name: "江苏省", share: "40.13%", note: "本地就业为主" },
    { name: "上海市", share: "10.28%" },
    { name: "北京市", share: "9.95%" },
    { name: "广东省", share: "6.04%" },
    { name: "浙江省", share: "5.38%" },
    {
      name: "江浙沪 + 京粤五地合计",
      share: "71.78%",
      note: "长三角加京粤吸纳了七成以上就业毕业生",
    },
  ],
  salaryNote:
    "官方《2024 届毕业生就业质量报告》未公布全校或专业级平均薪酬数字，网络流传的各专业起薪来源不一、口径混乱，本站暂不收录精确数字以免误导。家长如需薪资参考，建议以官方报告中的行业与去向分布作为判断依据。",
  sources: [
    {
      label: "南京大学 2024 届毕业生就业质量报告（信息公开网）",
      url: "https://xxgk.nju.edu.cn/83/52/c16401a754514/page.htm",
      note: "学校信息公开门户发布的官方报告页面，发布于 2025-04-14",
      sourceType: "official",
    },
    {
      label: "南京大学信息公开 - 毕业生就业质量报告列表",
      url: "https://xxgk.nju.edu.cn/16401/list.htm",
      note: "学校官方历年就业质量报告归档目录",
      sourceType: "official",
    },
    {
      label: "南京大学 2024 届本科毕业生就业质量报告（高考资讯转载）",
      url: "https://www.gaokzx.com/gk/gaokao/135065.html",
      note: "第三方平台转载并整理的本科就业数据，核心数字与官方一致，供交叉核对",
      sourceType: "non_official",
    },
  ],
};

export default outcome;
