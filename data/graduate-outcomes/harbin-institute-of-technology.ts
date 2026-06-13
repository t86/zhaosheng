import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";

const outcome: SchoolGraduateOutcome = {
  slug: "harbin-institute-of-technology",
  schoolName: "哈尔滨工业大学",
  reportLabel: "2024 届毕业生就业质量报告",
  reportYear: "2024",
  updatedAt: "2026-06-13",
  overview: {
    summary:
      "哈工大是典型的“国防七子”工科强校，深造氛围浓厚、留校读研比例高，本科生升学率接近七成。就业上高度集中于航天国防、电子信息、装备制造等关键领域，近四成毕业生进入国资委央企及世界 500 强，重点领域就业占比已连续 10 年保持在 80% 以上。",
    stats: [
      { label: "本科毕业生总数", value: "3971 人", note: "2024 届本部本科" },
      {
        label: "本科升学率（深造率）",
        value: "69.82%",
        note: "2771 人升学，含推免 1651 人、考研 541 人、第二学位 340 人、出国 239 人",
      },
      {
        label: "国内升学",
        value: "2532 人",
        note: "其中读研留在哈工大约 80.47%，另有部分进入其他 C9 及中科院、航天科技等科研院所",
      },
      { label: "出国（境）留学", value: "239 人", note: "分布 16 个国家/地区 68 所高校，进入世界前 100 高校占 80.75%" },
      { label: "本科初次就业率", value: "98.61%" },
      {
        label: "进入央企及世界 500 强",
        value: "近 40%",
        note: "国资委央企及世界 500 强企业",
      },
    ],
  },
  industries: [
    { name: "航天与国防（军工集团）", share: "约 30%", note: "进入各大军工集团，国防就业近年增长 101.93%、航天增长 119.46%" },
    { name: "信息技术 / 电子通信", note: "华为、中兴、腾讯等常年招录" },
    { name: "装备制造", note: "一汽、上汽、中国中车等长期稳定合作" },
    { name: "工业和信息化领域", note: "工信领域就业人数近年增长 21.29%" },
    { name: "基层就业（选调等）", note: "基层就业人数近年增长 82.19%" },
  ],
  regions: [
    { name: "山东" },
    { name: "辽宁" },
    { name: "浙江" },
    { name: "黑龙江" },
    { name: "江苏" },
    { name: "广东" },
  ],
  keyEmployers: [
    "中国航天科技集团",
    "中国航天科工集团",
    "中国核工业集团",
    "中国电子科技集团",
    "华为",
    "中兴通讯",
    "国家电网",
    "中国建筑集团",
    "中国石油天然气集团",
    "中国一汽",
    "上汽集团",
    "中国中车",
  ],
  byMajor: [
    {
      name: "本部本科整体",
      advanceRate: "69.82%",
      outcomeNote: "升学为主，留校读研比例高（国内读研约八成进入哈工大），就业集中于航天国防、电子信息与装备制造",
    },
  ],
  salaryNote:
    "哈工大官方《毕业生就业质量报告》未公布专业级平均薪酬，网络流传的起薪数字来源不一，本站暂不收录以免误导。报告披露的是行业与单位流向、深造率等口径。",
  sources: [
    {
      label: "哈工大就业网（学生就业指导与服务中心）",
      url: "https://job.hit.edu.cn/",
      note: "学校官方就业指导中心网站，就业质量报告与招聘信息发布渠道",
      sourceType: "official",
    },
    {
      label: "哈尔滨工业大学 2024 届本科毕业生就业质量报告（转载）",
      url: "https://www.gaokzx.com/gk/gaokao/134960.html",
      note: "第三方转载官方就业质量报告，含重点单位、行业与地域流向",
      sourceType: "official_story",
    },
    {
      label: "“哈工大毕业生都去哪了？”（官方数据报道）",
      url: "https://www.mbachina.com/html/xw/202502/608518.html",
      note: "转载官方就业数据，含近 40% 进央企/500 强、国防航天增长等口径",
      sourceType: "official_story",
    },
  ],
};

export default outcome;
