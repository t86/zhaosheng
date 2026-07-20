export type Shanghai2026BatchLineTone = "official-lines" | "official-status" | "third-party-reference";

export type Shanghai2026BatchLineSource = {
  label: string;
  url: string;
  trust: "official" | "third-party";
};

export type Shanghai2026BatchLineStatus = {
  batch: string;
  statusLabel: string;
  lineLabel: string;
  tone: Shanghai2026BatchLineTone;
  summary: string;
  facts: string[];
  sources: Shanghai2026BatchLineSource[];
};

export const shanghai2026BatchLineStatuses: Shanghai2026BatchLineStatus[] = [
  {
    batch: "本科普通批次",
    statusLabel: "官方投档线已接入",
    lineLabel: "院校专业组投档线",
    tone: "official-lines",
    summary:
      "上海考试院 7 月 19 日公布普通批院校专业组投档线，本页已把普通表、Q 组和部分中外合作办学等单独表一并结构化。580 分及以上仍按考试院原文保留为阈值，不反推具体分数。",
    facts: ["7 月 19 日公布", "按院校专业组计划 1:1 投档", "可直接参与填分数匹配"],
    sources: [
      {
        label: "上海考试院 · 2026 本科普通批投档线",
        url: "https://cdn.shmeea.edu.cn/resource/upload/www/20260706/53767.pdf",
        trust: "official",
      },
      {
        label: "上海考试院 · 2026 Q组及部分中外合作等投档线",
        url: "https://cdn.shmeea.edu.cn/resource/upload/www/20260706/1635.pdf",
        trust: "official",
      },
    ],
  },
  {
    batch: "综合评价批次",
    statusLabel: "官方入围分布已公开",
    lineLabel: "入围成绩分布、校测与录取公示，不是统一投档线",
    tone: "official-status",
    summary:
      "考试院公布的是综评入围考生成绩分布表和各校入围分布入口；录取由高考成绩、校测成绩和招生章程共同决定。复旦官方披露 2026 上海综评最低入围线 583 分、综评录取 600 人，可作为重点校样例，但不能当作所有学校统一录取线。",
    facts: ["可填 4 个平行院校专业组", "按计划 1:1.5 投档", "7 月 9 日起各校公示/查询录取结果"],
    sources: [
      {
        label: "上海考试院 · 2026 综评入围成绩分布表",
        url: "https://www.shmeea.edu.cn/page/02200/20260623/20374.html",
        trust: "official",
      },
      {
        label: "复旦大学 · 2026 上海综评录取结果",
        url: "https://news.fudan.edu.cn/2026/0709/c1247a149789/page.htm",
        trust: "official",
      },
    ],
  },
  {
    batch: "零志愿批次",
    statusLabel: "录取完成，结构化线待官方表",
    lineLabel: "录取查询与第三方摘要，暂未检索到考试院统一分数线 PDF",
    tone: "third-party-reference",
    summary:
      "考试院日程确认零志愿批次 7 月 9 日录取并开通查询，实施办法明确零志愿按 1:1 投档。第三方自主选拔在线转述清华、北大零志愿最低均为 611 分及以上，并给出计划/录取人数；站内先标注为第三方摘要，等官方原始表可核后再结构化录入。",
    facts: ["7 月 9 日录取并查询", "零志愿按 1:1 投档", "第三方摘要：清北普通零志愿最低 611 分及以上"],
    sources: [
      {
        label: "上海考试院 · 2026 录取工作日程",
        url: "https://www.shmeea.edu.cn/page/08000/20260609/20321.html",
        trust: "official",
      },
      {
        label: "自主选拔在线 · 2026 上海零批次投档线摘要",
        url: "https://www.zizzs.com/gk/gaokao/224824.html",
        trust: "third-party",
      },
    ],
  },
];

export function getShanghai2026BatchLineStatusSummary() {
  return {
    batchCount: shanghai2026BatchLineStatuses.length,
    officialLineBatchCount: shanghai2026BatchLineStatuses.filter((item) => item.tone === "official-lines").length,
    officialStatusBatchCount: shanghai2026BatchLineStatuses.filter((item) => item.tone === "official-status").length,
    thirdPartyReferenceBatchCount: shanghai2026BatchLineStatuses.filter(
      (item) => item.tone === "third-party-reference",
    ).length,
  };
}
