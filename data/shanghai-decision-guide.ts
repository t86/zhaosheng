export type ShanghaiDecisionSource = {
  label: string;
  url: string;
  note: string;
};

export type ShanghaiDecisionRule = {
  value: string;
  label: string;
  detail: string;
};

export type ShanghaiDecisionCheck = {
  title: string;
  description: string;
};

export type ShanghaiDecisionResource = {
  title: string;
  description: string;
  note: string;
  url: string;
  actionLabel: string;
};

export const shanghaiDecisionGuide = {
  status: {
    kicker: "站内更新状态",
    title: "2026 上海高考这轮已经核到什么",
    summary:
      "本站当前已经核到的 2026 上海高考官方文件是报名实施办法。秋季统一高考的志愿填报与投档录取结构，当前仍先按 2025 年上海市教育考试院正式实施办法展示。",
    bullets: [
      "2026 年上海市普通高校考试招生网上报名已于 2025 年 10 月 13 日启动，拟参加 2026 秋季统一高考的考生须在报名阶段同时勾选对应考试选项。",
      "2025 年上海本科阶段的官方志愿结构已经明确：综合评价批次 4 个平行志愿，本科普通批次 24 个平行志愿，每个院校专业组内设 4 个专业志愿。",
      "2025 年上海高考志愿辅助填报系统于 2025 年 6 月 16 日至 7 月 2 日开放。2026 年是否沿用、何时开放，仍要等上海市教育考试院后续通知。",
    ],
  },
  quickRules: [
    {
      value: "24",
      label: "普通批平行志愿",
      detail: "2025 官方办法明确，本科普通批次设置 24 个平行志愿。",
    },
    {
      value: "4",
      label: "综评批平行志愿",
      detail: "2025 官方办法明确，综合评价批次设置 4 个平行志愿。",
    },
    {
      value: "4",
      label: "组内专业志愿",
      detail: "每个院校专业组志愿内设 4 个专业志愿，且必须选择是否服从专业调剂。",
    },
  ] satisfies ShanghaiDecisionRule[],
  verifiedRules: [
    {
      value: "24",
      label: "本科普通批次",
      detail: "本科普通批次设置 24 个平行志愿，考生可以填满，也可以只填部分志愿。",
    },
    {
      value: "4",
      label: "综合评价批次",
      detail: "综合评价批次设置 4 个平行志愿，且考生须在初报名公示合格名单中并达到特殊类型招生控制分数线。",
    },
    {
      value: "4",
      label: "组内专业志愿",
      detail: "每个院校专业组志愿内设 4 个专业志愿，组内专业顺序和是否服从调剂都会影响最终去向。",
    },
    {
      value: "1:1",
      label: "普通批投档比例",
      detail: "本科普通批次按 1:1 比例正式投档；综合评价批次按 1:1.5 比例投档。",
    },
  ] satisfies ShanghaiDecisionRule[],
  checks: [
    {
      title: "先看招生章程的关键限制",
      description:
        "上海市教育考试院 2025 答记者问明确提醒，填报前要特别关注招生章程中的办学性质、办学地点、政治面貌、单科成绩、外语语种、身体条件和学费要求。",
    },
    {
      title: "先核选科是否真的匹配",
      description:
        "上海 2025 实施办法明确，考生选考科目只有与院校专业组科目要求相符时，才有填报资格；若要求两科或三科，关系是“和”，必须全部满足。",
    },
    {
      title: "先按位次和计划数看，不只看最低分",
      description:
        "上海市教育考试院 2025 答记者问明确建议，考生要综合考虑选考科目、分数、位次以及各院校专业组在沪招生计划数，合理填报各批次志愿。",
    },
    {
      title: "先用 2024 专业录取数据校准预期",
      description:
        "上海市 2025 本科阶段志愿填报特别提醒里，考试院专门把《2024 年上海市普通高等学校招生各专业录取人数及考分》列为核心参考资料，里面有最低分、平均分和平均分位次。",
    },
  ] satisfies ShanghaiDecisionCheck[],
  resources: [
    {
      title: "《2025 年上海高考指南》",
      description: "适合先把上海高招政策、志愿填报流程和投档录取注意事项整体看一遍。",
      note: "上海市教育考试院在 2025 本科阶段志愿填报特别提醒中列为官方参考书。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看提醒页 →",
    },
    {
      title: "《2025 年上海市普通高等学校招生专业目录》",
      description: "用来核对在沪招生院校、专业和计划数，是正式填报前的硬资料。",
      note: "适合和组线页一起看，避免只按学校名做判断。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看提醒页 →",
    },
    {
      title: "《2024 年上海市普通高等学校招生各专业录取人数及考分》",
      description: "可查看 2024 年各校录取最低分、平均分和平均分位次，是做“冲稳保”的核心参考。",
      note: "上海市教育考试院 2025 特别提醒里专门点名推荐。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看提醒页 →",
    },
  ] satisfies ShanghaiDecisionResource[],
  channels: [
    {
      title: "上海招考热线",
      description: "规则、控制线、志愿时间、征求志愿和官方 PDF 都从这里发。",
      note: "志愿期最该反复刷新的官方入口。",
      url: "https://www.shmeea.edu.cn/",
      actionLabel: "打开官网 →",
    },
    {
      title: "上海市教育考试院公众号",
      description: "直播预告、提醒、答记者问和节点通知更新更快。",
      note: "适合盯 6 月下旬到 7 月的高频通知。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看官方提醒 →",
    },
    {
      title: "《上海中学生报·高招周刊》",
      description: "这是考试院在 2025 特别提醒里明确列出的合作报刊渠道。",
      note: "更适合承接直播答疑、政策解读和本地家长高频问题。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看官方提醒 →",
    },
    {
      title: "高校官方招生网站",
      description: "最终一定要回到各校招生章程和招生网核对单科、语种、体检、学费和培养地点。",
      note: "学校官网是具体专业组限制条件的最终口径。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看官方提醒 →",
    },
  ] satisfies ShanghaiDecisionResource[],
  tools: [
    {
      title: "上海高考志愿辅助填报系统",
      description:
        "上海市教育考试院 2025 年说明里写明，该系统用于在线检索院校专业组和专业，并拟定本科志愿意向表。",
      note: "2025 年开放时间为 6 月 16 日至 7 月 2 日；2026 年开放安排待官方通知。",
      url: "https://www.shmeea.edu.cn/page/08000/20250615/19508.html",
      actionLabel: "查看系统说明 →",
    },
    {
      title: "教育部“阳光志愿”信息服务系统",
      description:
        "上海市教育考试院 2025 年说明里写明，阳光志愿支持依据成绩（位次）、历年录取情况、满意度和就业数据做个性化筛选。",
      note: "如果你后续要补“位次 + 就业 + 满意度”层，这就是最值得参考的官方形态。",
      url: "https://www.shmeea.edu.cn/page/08000/20250615/19508.html",
      actionLabel: "查看系统说明 →",
    },
  ] satisfies ShanghaiDecisionResource[],
  sources: [
    {
      label: "上海市 2025 年普通高等学校招生志愿填报与投档录取实施办法",
      url: "https://www.shmeea.edu.cn/page/06300/20250425/19280.html",
      note: "用于核对批次结构、志愿数量、组内专业数、投档比例、调剂和退档规则。",
    },
    {
      label: "市教育考试院负责人就上海市 2025 年普通高校招生录取工作答记者问",
      url: "https://www.shmeea.edu.cn/page/08000/20250623/19545.html",
      note: "用于核对控制线、选科组合、计划数、位次和章程里必须核对的限制条件。",
    },
    {
      label: "上海市 2025 年普通高校招生本科阶段志愿填报特别提醒",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      note: "用于核对志愿填报日期、官方信息发布渠道和参考资料。",
    },
    {
      label: "2025 年普通高校招生高考志愿信息服务系统即将开放",
      url: "https://www.shmeea.edu.cn/page/08000/20250615/19508.html",
      note: "用于核对上海本地辅助填报系统和教育部“阳光志愿”系统的公开介绍。",
    },
    {
      label: "2026 年上海市普通高校考试招生网上报名正式启动",
      url: "https://www.shmeea.edu.cn/page/08000/20251013/19807.html",
      note: "用于确认 2026 年上海高考报名阶段已经启动，且秋季统一高考考生需在报名时勾选对应考试选项。",
    },
  ] satisfies ShanghaiDecisionSource[],
};
