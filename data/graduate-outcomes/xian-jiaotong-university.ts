import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";

const outcome: SchoolGraduateOutcome = {
  slug: "xian-jiaotong-university",
  schoolName: "西安交通大学",
  reportLabel: "2024 届毕业生就业质量报告",
  reportYear: "2024",
  updatedAt: "2026-06-13",
  overview: {
    summary:
      "西安交大是 C9、工科与管理见长的老牌名校，深造氛围浓、本科升学率约三分之二。就业高度集中于装备制造、信息技术、能源电力与科研机构，重点行业及重点单位（央企、国家级科研院所、世界 500 强）就业占比超六成。作为扎根西部的高校，近半数毕业生留在西部就业创业，同时长三角、大湾区、京津冀也是重要去向。",
    stats: [
      { label: "毕业生总数", value: "11623 人", note: "硕士 5823 人（50.10%）、本科 4807 人（41.36%）、博士 993 人（8.54%）" },
      {
        label: "本科生深造率",
        value: "66.8%",
        note: "本科毕业生升学（国内读研＋出国留学）合计比例",
      },
      {
        label: "国内升学去向",
        value: "约 96.4%",
        note: "国内升学毕业生进入双一流高校及顶尖科研机构的比例",
      },
      {
        label: "出国（境）留学",
        value: "487 人",
        note: "其中约 73.9% 进入 QS 排名前 100 的世界名校",
      },
      {
        label: "重点行业及重点单位就业占比",
        value: "64.1%",
        note: "到国资委直属骨干央企、重要科研机构、世界 500 强名企等就业人数占就业总数比例",
      },
      {
        label: "进入骨干央企及国家级重点科研机构",
        value: "30.0%",
        note: "覆盖国资委直属央企 79 家，约占其总数 65%",
      },
      {
        label: "选调生 / 公务员",
        value: "366 人",
        note: "被各级机关录用为选调生和公务员，较上一年增长约 18.1%",
      },
    ],
  },
  industries: [
    { name: "制造业", share: "20.4%", note: "装备制造、汽车、电子设备等，西交大传统优势行业" },
    { name: "软件和信息技术服务业", share: "16.6%", note: "互联网与 IT，吸纳大量本硕毕业生" },
    { name: "科学研究与技术服务业", share: "12.0%", note: "各类研究院所与技术服务机构" },
    { name: "电力、热力、燃气及水的生产供应", note: "电气强校，国家电网等电力央企为重要去向" },
    { name: "金融业", note: "银行、证券等，报告列为热门就业方向之一" },
  ],
  regions: [
    { name: "西部地区", share: "47.7%", note: "扎根西部，近半数毕业生留西部就业创业" },
    { name: "东部地区", share: "39.9%", note: "长三角、大湾区、京津冀等经济发达区域" },
    { name: "中部地区", share: "10.5%" },
    { name: "东北地区", share: "1.8%" },
  ],
  keyEmployers: [
    "国家电网（录用人数居各企业前列）",
    "国资委直属骨干央企（覆盖约 79 家）",
    "国家级重点科研机构",
    "世界 500 强企业（覆盖约 103 家）",
    "华为",
    "中央金融企业",
    "各级党政机关（选调生 / 公务员 366 人）",
  ],
  byMajor: [
    {
      name: "本科整体",
      advanceRate: "66.8%",
      outcomeNote: "深造为主（国内升学约 96.4% 进入双一流及顶尖科研机构，出国约 73.9% 进 QS 前 100），就业集中于制造、信息技术、能源电力与科研机构",
    },
    {
      name: "硕士整体",
      advanceRate: "7.6%",
      outcomeNote: "以就业为主，企业是最主要去向，重点流向央企、世界 500 强及科研院所",
    },
  ],
  salaryNote:
    "西安交大官方《2024 届毕业生就业质量报告》未公布专业级平均薪酬，报告披露的是行业、地域、重点单位流向与深造率等口径。网络流传的专业起薪数字来源不一，本站暂不收录以免误导。",
  sources: [
    {
      label: "西安交通大学信息公开网 · 就业指导",
      url: "https://xxgk.xjtu.edu.cn/xxgkml/jxzlxx/jyzd.htm",
      note: "学校官方信息公开网就业指导栏目，历年毕业生就业质量报告发布渠道",
      sourceType: "official",
    },
    {
      label: "西安交通大学 2024 年毕业生就业质量报告（PDF）",
      url: "https://pdf.gk100.com/employment/report/2024/20250412/c114cf4a1feba9c7.pdf",
      note: "官方就业质量报告 PDF 版，含毕业生规模、深造率、行业地域流向、重点单位等数据",
      sourceType: "official",
    },
    {
      label: "“西安交通大学 2024 届毕业生都去哪了？”（数据解析）",
      url: "https://m.sohu.com/a/873582508_121123744/",
      note: "第三方依据官方报告整理，含毕业生总数、深造率、行业与地域占比、重点单位口径",
      sourceType: "official_story",
    },
    {
      label: "西安交通大学 2024 届毕业生就业质量报告（转载）",
      url: "https://www.gaokzx.com/gk/gaokao/134006.html",
      note: "第三方转载官方就业质量报告，含本科规模与重点行业就业等数据",
      sourceType: "official_story",
    },
  ],
};

export default outcome;
