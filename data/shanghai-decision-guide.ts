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
    title: "2026 上海志愿填报规则已经核到什么",
    summary:
      "本站当前已经核到上海市教育考试院 2026 年 4 月 2 日发布的《上海市 2026 年普通高等学校招生志愿填报与投档录取实施办法》。本科阶段仍以院校专业组为志愿和投档基本单位，具体本科志愿填报日期待后续公布。",
    bullets: [
      "2026 年本科阶段以院校专业组方式招生，一个院校专业组就是一个独立志愿；原则上中外合作办学专业单设院校专业组。",
      "2026 年本科志愿结构已经明确：综合评价批次设置 4 个平行志愿，零志愿批次设置 3 个平行志愿，本科普通批次设置 24 个平行志愿。",
      "2026 年所有本科志愿均在统一高考科目成绩公布后填报，具体填报日期仍要等上海市教育考试院后续公布。",
    ],
  },
  quickRules: [
    {
      value: "24",
      label: "普通批平行志愿",
      detail: "2026 官方办法明确，本科普通批次设置 24 个平行志愿。",
    },
    {
      value: "4",
      label: "综评批平行志愿",
      detail: "2026 官方办法明确，综合评价批次设置 4 个平行志愿。",
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
      value: "3",
      label: "零志愿批次",
      detail: "零志愿批次设置 3 个平行志愿，2026 官方办法已把它列入本科招生批次顺序。",
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
    {
      value: "2次",
      label: "普通批征求志愿",
      detail:
        "本科普通批次录取完毕后开展两次征求志愿；第二次征求志愿实行降分录取政策，是否同意降分由高校自主决定。",
    },
  ] satisfies ShanghaiDecisionRule[],
  checks: [
    {
      title: "先看招生章程的关键限制",
      description:
        "上海 2026 实施办法要求考生填报时仔细阅读高校招生章程，并明确专业录取办法、专业调剂规则由高校在章程或事先公布规则中确定。",
    },
    {
      title: "先核选科是否真的匹配",
      description:
        "上海 2026 实施办法明确，考生选考科目只有与院校专业组科目要求相符时才有填报资格；若要求两科或三科，关系是“和”，必须全部满足。",
    },
    {
      title: "先按位次和计划数看，不只看最低分",
      description:
        "上海 2026 实施办法明确，高校按院校专业组编制在沪本科计划，原则上具体到组内专业；同一高校不同院校专业组的计划原则上不能互相调剂使用。",
    },
    {
      title: "先把调剂理解成组内调剂",
      description:
        "上海 2026 实施办法明确，专业调剂只能在被投档的院校专业组内进行；不是被同一学校任意专业组接走，也不是跨组补位。",
    },
    {
      title: "先按同分排序看末位风险",
      description:
        "本科普通批次同分排序先看语文加数学合计，再看语文或数学单科、外语、选考最高科、选考次高科，最后才比较考生志愿顺序；志愿顺序相同的同分同位考生同时投档。",
    },
    {
      title: "先确认退档不是自己可控的后悔按钮",
      description:
        "上海 2026 实施办法明确，因不服从专业志愿调剂、不符合专业录取条件等原因不能录取的考生由高校作退档处理；考生不得以自愿放弃为理由申请退档。",
    },
    {
      title: "先记住征求志愿不是所有批次都有",
      description:
        "2026 本科阶段只有本科艺体类批次和本科普通批次设征求志愿，其他批次不设征求志愿；普通批录取完毕后开展两次征求志愿。",
    },
    {
      title: "先用 2024 专业录取数据校准预期",
      description:
        "上海市 2025 本科阶段志愿填报特别提醒里，考试院专门把《2024 年上海市普通高等学校招生各专业录取人数及考分》列为核心参考资料，里面有最低分、平均分和平均分位次。",
    },
  ] satisfies ShanghaiDecisionCheck[],
  resources: [
    {
      title: "2026 本科普通批次院校专业组目录（样表）",
      description:
        "先看院校专业组目录长什么样，理解上海不是按校名整体投档，而是按院校专业组阅读计划和选科要求。",
      note: "上海市教育考试院 2026 实施办法官方附件，样表用于理解目录结构，不等于后续正式发布的完整专业目录。",
      url: "https://www.shmeea.edu.cn/download/20260402/1.pdf",
      actionLabel: "打开样表 PDF →",
    },
    {
      title: "2026 本科普通批次志愿表（样表）",
      description:
        "直接看 24 个平行志愿、每个院校专业组内专业志愿，以及是否服从调剂如何呈现。",
      note: "上海市教育考试院 2026 实施办法官方附件表4，官方样表适合提前模拟“冲稳保”排序和组内专业顺序，但不等于正式填报系统。",
      url: "https://www.shmeea.edu.cn/download/20260402/8.pdf",
      actionLabel: "打开志愿表样表 →",
    },
    {
      title: "2026 综合评价批次志愿表（样表）",
      description: "核对综评批次 4 个平行志愿如何填写，适合有综评资格准备的家庭提前对照。",
      note: "上海市教育考试院 2026 实施办法官方附件表1，官方样表用于理解填报结构，最终仍以正式系统和高校要求为准。",
      url: "https://www.shmeea.edu.cn/download/20260402/5.pdf",
      actionLabel: "打开综评样表 →",
    },
    {
      title: "2026 特殊类型招生志愿表（样表）",
      description:
        "给高水平运动队等特殊类型招生家庭核对零志愿批次和本科普通批次的填表结构。",
      note: "上海市教育考试院 2026 实施办法官方附件表5，官方样表不是普通批通用表，适合特殊类型资格家庭单独核对。",
      url: "https://www.shmeea.edu.cn/download/20260402/9.pdf",
      actionLabel: "打开特殊类型样表 →",
    },
    {
      title: "《2025 年上海高考指南》",
      description: "适合先把上海高招政策、志愿填报流程和投档录取注意事项整体看一遍。",
      note: "上海市教育考试院在 2025 本科阶段志愿填报特别提醒中列为官方参考书；2026 正式书册仍待后续通知。",
      url: "https://www.shmeea.edu.cn/page/02200/20250623/19543.html",
      actionLabel: "查看提醒页 →",
    },
    {
      title: "《2025 年上海市普通高等学校招生专业目录》",
      description: "用来核对在沪招生院校、专业和计划数，是正式填报前的硬资料。",
      note: "2025 版适合和组线页一起看，避免只按学校名做判断；2026 正式目录仍以考试院后续发布为准。",
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
      label: "上海市 2026 年普通高等学校招生志愿填报与投档录取实施办法",
      url: "https://www.shmeea.edu.cn/page/06300/20260402/20156.html",
      note: "用于核对 2026 批次结构、志愿数量、选科要求、投档比例、同分排序、专业调剂和退档规则。",
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
