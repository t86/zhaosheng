export type TimelineTone = "warm" | "cool" | "alert" | "soft";

export type AxisMarker = {
  label: string;
  position: number;
};

export type StudentMilestone = {
  title: string;
  timeLabel: string;
  position: number;
  band: "top" | "bottom";
  stack: number;
  tone: TimelineTone;
  note?: string;
};

export type FamilyTrackEvent = {
  title: string;
  timeLabel: string;
  position: number;
  tone: TimelineTone;
  note?: string;
};

export type FamilyTrack = {
  school: string;
  subtitle?: string;
  events: FamilyTrackEvent[];
};

export type InsightCard = {
  title: string;
  body: string;
};

export type PositionedTimelineItem = {
  title: string;
  timeLabel: string;
  position: number;
  stack: number;
  tone: TimelineTone;
  note?: string;
};

export type SplitTimeline = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  caption: string;
  axis: AxisMarker[];
  topLabel: string;
  topDescription: string;
  bottomLabel: string;
  bottomDescription: string;
  topItems: PositionedTimelineItem[];
  bottomItems: PositionedTimelineItem[];
  insights: InsightCard[];
  warnings: string[];
};

export type AdmissionFlowGroup = {
  label: string;
  items: string[];
};

export type AdmissionFlowStage = {
  date: string;
  title: string;
  tone: TimelineTone;
  groups: AdmissionFlowGroup[];
};

export type EarlyExamMilestone = {
  date: string;
  title: string;
  detail: string;
  tone: TimelineTone;
};

export type EarlyExamCard = {
  title: string;
  body: string;
};

export type EarlyExamSource = {
  label: string;
  url: string;
  note: string;
};

export type EarlyExamActionChecklistItem = {
  period: string;
  title: string;
  items: string[];
};

export const shanghaiEarlyExamFocus = {
  id: "spring-grade-focus",
  kicker: "上海官方节点",
  title: "春考、外语一考和小三门先排进高三节奏",
  summary:
    "高三家长不要等到 6 月才开始排时间。上海春考、1 月外语一考和 5 月等级考，会先决定英语精力分配、春考是否继续、以及小三门最后冲刺节奏。",
  milestones: [
    {
      date: "2026年1月3日",
      title: "春考语文、数学",
      detail: "9:00-11:30 考语文，14:00-16:00 考数学；春考统一文化考试三门总分 450 分。",
      tone: "alert",
    },
    {
      date: "2026年1月4日",
      title: "外语笔试 / 外语一考",
      detail: "9:00-10:45 考外语笔试。官方明确春季考试外语科目考试即为 1 月份外语科目考试。",
      tone: "alert",
    },
    {
      date: "2026年1月5日",
      title: "外语听说测试",
      detail: "9:00 起分场次开考，英语以准考证场次报到截止时间为准，非通用语种以准考证为准。",
      tone: "alert",
    },
    {
      date: "2026年1月21日",
      title: "出分和最低控制线",
      detail: "公布语文、数学、外语考试成绩，同时公布春季考试招生志愿填报最低控制线。",
      tone: "warm",
    },
    {
      date: "2026年1月30日-31日",
      title: "春考填报志愿",
      detail: "统一文化考试成绩达到最低控制线的考生，最多填报 2 个专业志愿。",
      tone: "warm",
    },
    {
      date: "2026年2月5日",
      title: "自主测试资格线",
      detail: "各招生院校公布自主测试资格线、测试时间和地点。",
      tone: "cool",
    },
    {
      date: "2026年2月6日-7日",
      title: "选择测试时间地点",
      detail: "获得自主测试资格的考生登录相关院校网站，按院校要求选择测试时间和地点。",
      tone: "cool",
    },
    {
      date: "2026年2月28日-3月1日",
      title: "院校自主测试",
      detail: "各招生院校组织自主测试，原则上 1 门，采用面试或技能测试，总分 150 分。",
      tone: "cool",
    },
    {
      date: "2026年3月4日",
      title: "预录取和候补名单",
      detail: "各校网上公布预录取和候补资格考生名单，家长需要回到报考院校网站逐校查看。",
      tone: "alert",
    },
    {
      date: "2026年3月6日-7日",
      title: "录取专业信息登记",
      detail: "有两个预录取、预录取加候补、两个候补等情形的考生，需要网上办理录取专业信息登记或候补确认。",
      tone: "alert",
    },
    {
      date: "2026年3月9日-13日",
      title: "最终录取公示",
      detail: "各校网上公示最终录取考生名单并完成录取工作；通过春考录取后不得再参加其他考试招生。",
      tone: "alert",
    },
    {
      date: "2026年5月5日-6日",
      title: "小三门等级考",
      detail: "等级考集中在两天完成，直接影响本科阶段高考成绩结构和后续志愿池。",
      tone: "warm",
    },
  ] satisfies EarlyExamMilestone[],
  strategyCards: [
    {
      title: "英语一考高分后，6月外语改成保温",
      body:
        "1月外语就是外语一考。若英语在春考阶段已经拿到明显高分，后面可以把6月外语从主攻科目降为保温复盘，把大块时间让给语文、数学和小三门；但两次外语科目考试语种必须一致，是否参加二考仍按个人目标和学校安排确认。",
    },
    {
      title: "春考录取不是“先占坑再慢慢看”",
      body:
        "春考采用统一文化考试加院校自主测试。通过春考录取的考生，包括候补最终被录取的考生，不得再参加后续其他考试招生，所以确认前要把专业、学校和秋考机会一起算清楚。",
    },
    {
      title: "校测选择后不要缺考",
      body:
        "获得自主测试资格后要在2月6日-7日选测试时间和地点。后续缺考院校自主测试，测试成绩按零分计入春考总分，并参与后续录取排序。",
    },
  ] satisfies EarlyExamCard[],
  springDecisionCards: [
    {
      title: "251分只是春招志愿门槛",
      body:
        "2026 年春招志愿填报最低控制线为 251分。达到 251分只是具备填报志愿的资格，不等于拿到院校专业自主测试资格；各校会在 2月5日按专业计划和填报考生成绩另划自主测试资格线。",
    },
    {
      title: "春招池子先看清：26所、116专业、3639计划",
      body:
        "2026 年春招共有 26所本科试点院校、116个招生专业、3639个招生计划。它更像上海本地本科特色专业和应用型本科试点通道，不是普通批 985 池的提前版。",
    },
    {
      title: "最多2个专业志愿，最后一次提交为准",
      body:
        "每名具备资格的考生最多填报 2个专业志愿，可以是同一所院校的2个专业，也可以是不同院校的各1个专业。1月31日16:00系统关闭后，以关闭前最后一次提交信息作为投档依据。",
    },
    {
      title: "不填春招志愿，不影响后续秋考",
      body:
        "已参加春考且具备志愿填报资格的考生，可以选择不填报春招志愿；不填报的，后续仍可参加本人已报考的秋季统一高考等其他类别考试。",
    },
    {
      title: "填前先读招生章程的硬限制",
      body:
        "春招填报前要回到各招生院校章程，逐项核对男女比例、身体条件、专业资格考试、专业测试方式、综合素质评价信息使用办法等要求，确认自己符合条件再填。",
    },
  ] satisfies EarlyExamCard[],
  confirmationCards: [
    {
      title: "两个专业预录取：3月6日必须选一个",
      body:
        "取得两个专业预录取资格的考生，须在 3月6日9:00-15:00 网上选择一个专业进行录取专业信息登记。",
    },
    {
      title: "预录取加候补：可保预录取，也可冲候补",
      body:
        "取得一个专业预录取和一个专业候补录取资格的考生，须在 3月6日9:00-15:00 上网确认；可直接选择预录取专业，也可选择候补专业进行候补资格确认。",
    },
    {
      title: "两个专业候补：3月7日只确认一个",
      body:
        "取得两个专业候补录取资格的考生，须在 3月7日9:00-12:00 网上选择一个专业进行候补资格确认；确认候补资格不一定会被录取，要看该校预录取考生确认情况。",
    },
    {
      title: "单个资格：先看是否需要操作",
      body:
        "只取得一个专业预录取资格的考生，默认被预录取，无需操作；只取得一个专业候补录取资格的考生，须等待院校确认是否取得预录取资格，不一定会被录取。",
    },
    {
      title: "提交动作要做完，截止后不能改",
      body:
        "网上确认选择专业后，必须点击红色按钮提交选择并退出。规定时间内可返回修改；截止时间后系统关闭，考生不得修改。",
    },
  ] satisfies EarlyExamCard[],
  parentActionChecklist: [
    {
      period: "1月21日出分后",
      title: "先定英语和春招精力分配",
      items: [
        "把英语一考成绩和家庭预设目标分放在一起看，若已经明显达标，6月外语从主攻降为保温复盘。",
        "把释放出来的大块时间转给语文、数学和小三门，避免春招出分后仍按原计划平均用力。",
        "同时用 251分最低控制线判断是否具备春招志愿填报资格，但不要把它当成自主测试资格线。",
      ],
    },
    {
      period: "1月30日-31日",
      title: "春招志愿只做少而准的选择",
      items: [
        "最多 2个专业志愿，先按孩子能否接受该专业和学校层次筛掉明显不愿去的选项。",
        "同一院校 2个专业和不同院校各 1个专业都可以填，填报前要核对招生章程里的身体条件、男女比例和测试方式。",
        "1月31日16:00系统关闭后按最后一次提交信息为准，家长要留出复核和提交截图时间。",
      ],
    },
    {
      period: "2月5日-3月1日",
      title: "拿到校测资格后盯紧院校网站",
      items: [
        "2月5日看各校自主测试资格线、测试时间和地点，确认不是所有达线填报考生都能进校测。",
        "2月6日-7日按院校要求选择测试时间和地点，别把报名系统和学校系统混在一起。",
        "校测和后续等级考都要提前核对准考证和身份证，缺考春考校测会按零分计入春考总分。",
      ],
    },
    {
      period: "3月下旬-5月等级考",
      title: "小三门按确认和赴考两条线倒排",
      items: [
        "在校生等级考报名报考和信息确认时间为 3月26日10:00至3月28日16:00，错过后很难补救。",
        "学校 4月7日至4月11日组织信息确认，家长要核对三门等级考科目是否就是最终组合。",
        "5月5日-6日参加等级考，按官方提醒提前45分钟到考点，开考15分钟后禁止进入考点。",
      ],
    },
  ] satisfies EarlyExamActionChecklistItem[],
  gradeExamCards: [
    {
      title: "等级考两天排法",
      body:
        "5月5日考化学、思想政治、物理；5月6日考历史、地理、生物学。每科考试 60 分钟，家长要按孩子实际三科组合倒排最后冲刺。",
    },
    {
      title: "3月底完成报名报考",
      body:
        "在校生报名报考和相关信息确认时间为3月26日10:00至3月28日16:00，学校后续在4月7日至4月11日组织信息确认。",
    },
    {
      title: "小三门不是临时换科",
      body:
        "5月等级性考试设思想政治、历史、地理、物理、化学、生物学6门，考生自主选择3门；报名参加统一高考当年，应同时选择报考3门等级性考试科目，报考后不可更换考试科目。",
    },
  ] satisfies EarlyExamCard[],
  warnings: [
    "合格性考试成绩不合格的考生不得报考对应科目的等级性考试。",
    "等级考提醒要求考生凭准考证和有效身份证件参加考试，准考证不得书写任何内容。",
    "等级考期间适逢“五一”假期和工作日，官方建议提前45分钟到达考点，所有科目开考15分钟后禁止进入考点。",
    "春考志愿填报还要求应届高中毕业考生7门高中学业水平合格性考试成绩全部合格。",
  ],
  sources: [
    {
      label: "2026 年上海市普通高校春季考试招生实施办法",
      url: "https://www.shmeea.edu.cn/page/08000/20251118/19863.html",
      note: "用于核对春考考试科目、1月外语一考、出分、志愿填报、自主测试和录取确认节点。",
    },
    {
      label: "2026 年上海市普通高校春季考试招生工作日程表",
      url: "https://www.shmeea.edu.cn/download/20251118/03.pdf",
      note: "用于核对春考从统一文化考试到最终录取公示的日期表。",
    },
    {
      label: "2026 年上海市普通高校春季考试招生志愿填报将于 1 月 30 日 9:00 开始",
      url: "https://www.shmeea.edu.cn/page/08000/20260127/20055.html",
      note: "用于核对 251 分门槛、最多 2 个专业志愿、系统关闭后最后一次提交为准。",
    },
    {
      label: "上海市教育考试院负责人就 2026 年春季高考成绩公布答记者问",
      url: "https://www.shmeea.edu.cn/page/02300/20260121/20029.html",
      note: "用于核对 26 所院校、116 个专业、3639 个计划，以及填前核对招生章程限制。",
    },
    {
      label: "2026 年上海市普通高校春季考试招生预录取及候补资格网上确认",
      url: "https://www.shmeea.edu.cn/page/09000/20260304/20084.html",
      note: "用于核对 3 月 6-7 日不同预录取、候补资格状态的网上确认规则。",
    },
    {
      label: "2026 年上海市普通高中学业水平考试报名工作通知",
      url: "https://www.shmeea.edu.cn/page/02100/20260316/20107.html",
      note: "用于核对5月等级考科目时间、报名报考时间、三门等级考选择和不可更换规则。",
    },
    {
      label: "2026 年上海市普通高中学业水平等级性考试即将举行",
      url: "https://www.shmeea.edu.cn/page/02100/20260427/20195.html",
      note: "用于核对等级考赴考提醒、提前到场和开考后禁止入场要求。",
    },
    {
      label: "上海市教育委员会关于做好 2026 年普通高校考试招生报名工作的通知",
      url: "https://edu.sh.gov.cn/xxgk2_zdgz_rxgkyzs_04/20250924/01df54b2a2c042078c125ad18a8f18d5.html",
      note: "用于核对秋季统一高考外语一年两考、1月外语即春考外语，以及两次外语语种必须一致。",
    },
  ] satisfies EarlyExamSource[],
};

export const seniorSpringTimeline = {
  id: "overview",
  title: "高三下时间安排",
  subtitle:
    "按你提供的 2024 规划图整理成结构化时间线，核心目的是把强基、综评、港校和录取节奏放到一张图里看。",
  caption: "图片右上角原注：按 2024 年小旭的规划作为例子。",
  warning:
    "这不是官方统一日历，而是基于图片整理的示意版。真正填报时，仍然要回到各校当年招生简章、报名系统和省级考试院通知。",
  axis: [
    { label: "3月", position: 18 },
    { label: "4月", position: 31 },
    { label: "5月", position: 47 },
    { label: "6月", position: 61 },
    { label: "7月", position: 74 },
    { label: "7/5", position: 81 },
    { label: "7/8", position: 86 },
    { label: "7/11", position: 91 },
    { label: "7/23", position: 97 },
  ] satisfies AxisMarker[],
  studentMilestones: [
    {
      title: "期中",
      timeLabel: "3月",
      position: 18,
      band: "top",
      stack: 2,
      tone: "soft",
    },
    {
      title: "高考体检",
      timeLabel: "3月",
      position: 24,
      band: "top",
      stack: 1,
      tone: "soft",
    },
    {
      title: "二模",
      timeLabel: "4月",
      position: 33,
      band: "top",
      stack: 2,
      tone: "cool",
    },
    {
      title: "小三门",
      timeLabel: "4月冲刺",
      position: 42,
      band: "top",
      stack: 0,
      tone: "warm",
      note: "图片中带星号标出，强调在等级考前集中准备。",
    },
    {
      title: "等级考",
      timeLabel: "5月",
      position: 49,
      band: "top",
      stack: 2,
      tone: "cool",
    },
    {
      title: "语数（英）",
      timeLabel: "5月后段",
      position: 56,
      band: "top",
      stack: 0,
      tone: "warm",
      note: "图片中同样用星号强调，表示等级考后把重心收回主科。",
    },
    {
      title: "高考",
      timeLabel: "6月",
      position: 61,
      band: "top",
      stack: 2,
      tone: "alert",
    },
    {
      title: "强基面试",
      timeLabel: "6月末到7月初",
      position: 68,
      band: "top",
      stack: 1,
      tone: "cool",
    },
    {
      title: "港校录取截止",
      timeLabel: "7月初",
      position: 79,
      band: "top",
      stack: 0,
      tone: "alert",
    },
    {
      title: "综评面试",
      timeLabel: "7月上旬",
      position: 84,
      band: "top",
      stack: 2,
      tone: "cool",
    },
    {
      title: "强基报名",
      timeLabel: "4月",
      position: 38,
      band: "bottom",
      stack: 0,
      tone: "warm",
    },
    {
      title: "综评报名",
      timeLabel: "5月",
      position: 51,
      band: "bottom",
      stack: 0,
      tone: "warm",
    },
    {
      title: "高考志愿填报",
      timeLabel: "7月",
      position: 73,
      band: "bottom",
      stack: 0,
      tone: "cool",
    },
    {
      title: "强基批录取",
      timeLabel: "7/5",
      position: 81,
      band: "bottom",
      stack: 0,
      tone: "alert",
    },
    {
      title: "综评批录取",
      timeLabel: "7/8",
      position: 86,
      band: "bottom",
      stack: 0,
      tone: "alert",
    },
    {
      title: "提前批录取",
      timeLabel: "7/11",
      position: 91,
      band: "bottom",
      stack: 0,
      tone: "alert",
    },
    {
      title: "普通批录取",
      timeLabel: "7/23",
      position: 97,
      band: "bottom",
      stack: 0,
      tone: "alert",
    },
  ] satisfies StudentMilestone[],
  familyTracks: [
    {
      school: "上科大 / 南科大",
      subtitle: "图片里合并展示为一条家长准备线，更适合按同类校测节奏理解。",
      events: [
        {
          title: "报名截止",
          timeLabel: "5月前后",
          position: 49,
          tone: "warm",
        },
        {
          title: "线下宣讲会",
          timeLabel: "报名期内",
          position: 55,
          tone: "soft",
        },
        {
          title: "初审结果",
          timeLabel: "6月",
          position: 61,
          tone: "cool",
        },
        {
          title: "面试",
          timeLabel: "6月末到7月",
          position: 67,
          tone: "alert",
        },
      ],
    },
    {
      school: "上纽大",
      events: [
        {
          title: "校园开放日",
          timeLabel: "3/17",
          position: 22,
          tone: "soft",
        },
        {
          title: "预录结果",
          timeLabel: "4/12",
          position: 35,
          tone: "cool",
        },
      ],
    },
    {
      school: "港科大",
      events: [
        {
          title: "线下宣讲会",
          timeLabel: "3/17",
          position: 24,
          tone: "soft",
        },
        {
          title: "面试",
          timeLabel: "6月",
          position: 69,
          tone: "alert",
        },
      ],
    },
    {
      school: "港大",
      events: [
        {
          title: "多元计划截止",
          timeLabel: "3/21",
          position: 24,
          tone: "warm",
        },
        {
          title: "多元计划加分公布",
          timeLabel: "5月",
          position: 48,
          tone: "cool",
        },
        {
          title: "高考成绩入学面试（如有）",
          timeLabel: "6月下旬",
          position: 67,
          tone: "alert",
        },
        {
          title: "面试窗口",
          timeLabel: "6/28-7/7",
          position: 79,
          tone: "alert",
          note: "图片最右侧用日期区间单独标出。",
        },
      ],
    },
  ] satisfies FamilyTrack[],
  takeaways: [
    {
      title: "强基只能报一所",
      body: "图片底部原话就是“强基只能报一所”。这类项目更像强目标型选择，不能像综评那样广撒网。",
    },
    {
      title: "综评尽量别只报一所",
      body: "图片底部给出的建议是“综评能多报就多报”。站内理解是：综评更像时间管理题，要盯报名和面试窗口。",
    },
    {
      title: "港校节奏通常更早",
      body: "图里专门把“港校录取截止”拉到 7 月上旬，说明它往往早于内地提前批和普通批，需要更早做决策。",
    },
    {
      title: "家长准备不是被动等高考后",
      body: "下半区单列了上科大、上纽大、港校相关节点，说明信息搜集、宣讲会和材料准备往往要从 3 月就同步推进。",
    },
  ] satisfies InsightCard[],
};

export const shanghaiJuneJulyTimeline = {
  id: "shanghai-6-7",
  kicker: "上海高三时间表",
  title: "6 月到 7 月：出分、港校、综评挤在一起",
  summary:
    "这张图把上海考生从高考结束到综评面试前的密集动作拉得很细，适合用来盯出分、港校和开放日的先后顺序。",
  caption: "图片右上角原注：按 2024 年小旭的规划作为例子。",
  axis: [
    { label: "6/7-9", position: 6 },
    { label: "6/10", position: 13 },
    { label: "6/15", position: 28 },
    { label: "6/20", position: 46 },
    { label: "6/23", position: 58 },
    { label: "6/28", position: 73 },
    { label: "7/1", position: 86 },
    { label: "7/5", position: 93 },
    { label: "7/8", position: 98 },
  ] satisfies AxisMarker[],
  topLabel: "学生准备",
  topDescription:
    "主轴上半区是学生要直接参与的动作：考试、面试、开放日、出分和填志愿，节奏远比“等分数再看”更早。",
  bottomLabel: "家长准备",
  bottomDescription:
    "下半区更偏执行动作：材料上传、港校沟通、线下踩点、打印综评面试单，适合照着办事清单推进。",
  topItems: [
    {
      title: "高考",
      timeLabel: "6/7-9",
      position: 6,
      stack: 2,
      tone: "alert",
    },
    {
      title: "小三门出分",
      timeLabel: "6/10",
      position: 13,
      stack: 0,
      tone: "warm",
    },
    {
      title: "上科大面试",
      timeLabel: "6/12",
      position: 20,
      stack: 1,
      tone: "cool",
    },
    {
      title: "南科大面试",
      timeLabel: "6/15",
      position: 28,
      stack: 0,
      tone: "cool",
    },
    {
      title: "交大开放日",
      timeLabel: "6/16",
      position: 34,
      stack: 1,
      tone: "soft",
    },
    {
      title: "浙大开放日",
      timeLabel: "6/16",
      position: 34,
      stack: 2,
      tone: "soft",
    },
    {
      title: "学校发放 2024 本科招生计划书",
      timeLabel: "6/20",
      position: 46,
      stack: 0,
      tone: "warm",
    },
    {
      title: "高考出分",
      timeLabel: "6/23",
      position: 58,
      stack: 1,
      tone: "alert",
    },
    {
      title: "复旦开放日",
      timeLabel: "6/24",
      position: 63,
      stack: 0,
      tone: "soft",
    },
    {
      title: "港科大线下面试",
      timeLabel: "6/28-29",
      position: 77,
      stack: 1,
      tone: "cool",
    },
    {
      title: "学校机房填志愿",
      timeLabel: "6/30-7/1",
      position: 86,
      stack: 2,
      tone: "alert",
    },
    {
      title: "孩子综评培训",
      timeLabel: "7/5",
      position: 92,
      stack: 0,
      tone: "warm",
    },
    {
      title: "综评面试",
      timeLabel: "7/6-7",
      position: 97,
      stack: 1,
      tone: "cool",
    },
  ] satisfies PositionedTimelineItem[],
  bottomItems: [
    {
      title: "提前赴港考察 / 办港澳通行证",
      timeLabel: "6/10 前后",
      position: 16,
      stack: 0,
      tone: "soft",
      note: "图中把港大、港科大实地考察和通行证办理放在很靠前的位置。",
    },
    {
      title: "港科大填写高考号、志愿",
      timeLabel: "6/12",
      position: 22,
      stack: 2,
      tone: "warm",
    },
    {
      title: "港大上传 3 个专业选择和 PS",
      timeLabel: "6/20",
      position: 46,
      stack: 0,
      tone: "warm",
    },
    {
      title: "七宝安排交复同宣讲会",
      timeLabel: "6/22",
      position: 54,
      stack: 2,
      tone: "soft",
    },
    {
      title: "高考分数上传到港大、港科大",
      timeLabel: "6/23",
      position: 60,
      stack: 0,
      tone: "cool",
    },
    {
      title: "带孩子港大实地参观",
      timeLabel: "6/24-28",
      position: 69,
      stack: 2,
      tone: "soft",
    },
    {
      title: "收到港大 offer",
      timeLabel: "6/29",
      position: 79,
      stack: 0,
      tone: "alert",
    },
    {
      title: "接受港大 offer",
      timeLabel: "6/30",
      position: 83,
      stack: 1,
      tone: "alert",
    },
    {
      title: "收到港科大 offer",
      timeLabel: "7/1",
      position: 88,
      stack: 2,
      tone: "alert",
    },
    {
      title: "打印综评面试单",
      timeLabel: "7/5",
      position: 93,
      stack: 0,
      tone: "warm",
    },
    {
      title: "综评结果",
      timeLabel: "7/8",
      position: 98,
      stack: 1,
      tone: "cool",
    },
  ] satisfies PositionedTimelineItem[],
  insights: [
    {
      title: "港校动作发生在综评之前",
      body: "从这张图看，港大和港科大的材料上传、offer、是否接受，几乎都发生在综评面试前后，决策窗口很窄。",
    },
    {
      title: "出分后不是只填志愿",
      body: "6/23 高考出分之后，后面还紧跟着开放日、港校面试、机房填志愿和综评培训，时间是并行压缩的。",
    },
    {
      title: "家长动作偏执行型",
      body: "图片下半区更像任务列表，不只是关注录取，而是具体到上传成绩、赴港踩点、打印面试单这类细动作。",
    },
  ] satisfies InsightCard[],
  warnings: [
    "图里部分 6 月底到 7 月初的港校动作没有写到具体钟点，页面只按图片中可读日期整理。",
    "学校开放日、综评面试等节点每年会移动，真正执行时仍要看当年通知。",
  ],
} satisfies SplitTimeline;

export const shanghaiJulyAugustTimeline = {
  id: "shanghai-7-8",
  kicker: "上海高三时间表",
  title: "7 月到 8 月：从校测、批次录取走到新生入学",
  summary:
    "这张图更像录取期跟踪板，把强基、综评、提前批、普通批和专科批放在一条线里，适合边录边查。",
  caption: "图片右上角原注：按 2024 年小旭的规划作为例子。",
  axis: [
    { label: "7/1-2", position: 8 },
    { label: "7/5前", position: 22 },
    { label: "7/8", position: 38 },
    { label: "7/8-15", position: 50 },
    { label: "7/16", position: 60 },
    { label: "7/16-28", position: 69 },
    { label: "7/29-31", position: 82 },
    { label: "7/31-8/4", position: 90 },
    { label: "8月", position: 98 },
  ] satisfies AxisMarker[],
  topLabel: "学生准备",
  topDescription:
    "上半区已经不再是备考，而是查录取、等通知书、拿档案和准备入学。图片明显把“收到大学录取通知书”当成这一阶段的中心节点。",
  bottomLabel: "录取与跟踪",
  bottomDescription:
    "下半区更适合当成批次进度表，边录边查，强基、综评、零志愿、提前批、普通批和专科批次一项项核对。",
  topItems: [
    {
      title: "强基校测",
      timeLabel: "7/1-2",
      position: 8,
      stack: 0,
      tone: "cool",
    },
    {
      title: "填志愿",
      timeLabel: "7/3-7/5 前",
      position: 20,
      stack: 1,
      tone: "warm",
    },
    {
      title: "综评面试",
      timeLabel: "7/6-7",
      position: 30,
      stack: 0,
      tone: "cool",
    },
    {
      title: "收到大学录取通知书",
      timeLabel: "7/16-28",
      position: 69,
      stack: 1,
      tone: "alert",
    },
    {
      title: "高中档案拿取",
      timeLabel: "7/29-31",
      position: 82,
      stack: 0,
      tone: "warm",
    },
    {
      title: "K12 结束，开启新的人生",
      timeLabel: "7/31-8/4",
      position: 90,
      stack: 1,
      tone: "soft",
    },
    {
      title: "新生入学、军训",
      timeLabel: "8月",
      position: 98,
      stack: 0,
      tone: "cool",
    },
  ] satisfies PositionedTimelineItem[],
  bottomItems: [
    {
      title: "综评批公布入围线",
      timeLabel: "7/3",
      position: 14,
      stack: 0,
      tone: "cool",
    },
    {
      title: "港澳大学录取 / 强基批录取",
      timeLabel: "7/5 前",
      position: 24,
      stack: 1,
      tone: "alert",
      note: "原图用一根向上箭头强调：港澳大学录取往往和强基批几乎同步出现。",
    },
    {
      title: "零志愿批录取",
      timeLabel: "7/8 前后",
      position: 35,
      stack: 0,
      tone: "alert",
    },
    {
      title: "综评批公布录取名单",
      timeLabel: "7/8",
      position: 41,
      stack: 1,
      tone: "alert",
    },
    {
      title: "提前批 / 本科艺体类录取",
      timeLabel: "7/8-15",
      position: 50,
      stack: 0,
      tone: "alert",
    },
    {
      title: "地方农村专项计划录取",
      timeLabel: "7/16",
      position: 60,
      stack: 1,
      tone: "cool",
    },
    {
      title: "普通批录取",
      timeLabel: "7/16-28",
      position: 69,
      stack: 0,
      tone: "alert",
    },
    {
      title: "专科艺体类 / 专科提前批录取",
      timeLabel: "7/29-31",
      position: 82,
      stack: 1,
      tone: "soft",
    },
    {
      title: "专科普通批录取",
      timeLabel: "7/31-8/4",
      position: 90,
      stack: 0,
      tone: "soft",
    },
  ] satisfies PositionedTimelineItem[],
  insights: [
    {
      title: "7 月上旬就是录取分水岭",
      body: "图里把 7/5 前后的港澳录取和强基批录取特别抬出来，意思很明确：真正的结果并不是从普通批才开始。",
    },
    {
      title: "录取期要按批次查，不要只等通知书",
      body: "从综评批、零志愿、提前批到普通批，图里下半区本质上是一张“家长核对表”，适合按日期逐项确认。",
    },
    {
      title: "录取结束后立刻进入入学准备",
      body: "原图把档案拿取、K12 结束和新生军训直接连在录取后面，意味着录取结束并不是这条线的终点。",
    },
  ] satisfies InsightCard[],
  warnings: [
    "7 月各批次公布顺序每年会有细微变动，这里只按图片中给出的时间块整理。",
    "港澳大学录取与内地批次衔接关系复杂，执行时仍要逐校核对是否需要先确认或放弃。",
  ],
} satisfies SplitTimeline;

export const shanghaiAdmissionFlow2025 = {
  id: "shanghai-flow-2025",
  kicker: "2025 年时间表",
  title: "上海高考录取基本流程",
  summary:
    "这张图不再盯个人行动，而是把上海录取批次本身摊开：哪个日期出哪个批次，以及大致覆盖哪些学校和方向。",
  caption: "图片标题：上海高考录取基本流程，右上角标注为 2025 年时间表。",
  examPrelude: [
    {
      title: "高考",
      timeLabel: "6/7-9 考试",
      tone: "alert",
    },
    {
      title: "查小三门分",
      timeLabel: "6/10",
      tone: "warm",
    },
    {
      title: "查大三门分",
      timeLabel: "6/23",
      tone: "cool",
    },
  ] satisfies Array<{ title: string; timeLabel: string; tone: TimelineTone }>,
  hongKongNote: "图里单独用向上箭头强调：港澳大学录取通常会卡在 7/5 左右，需要和强基、综评的确认节奏一起看。",
  stages: [
    {
      date: "7/5",
      title: "强基批",
      tone: "alert",
      groups: [
        {
          label: "代表学校",
          items: ["清华", "北大", "上海交大", "复旦", "同济", "华师大", "共 28 所 985 高校"],
        },
      ],
    },
    {
      date: "7/9",
      title: "综评批",
      tone: "cool",
      groups: [
        {
          label: "上海综评学校",
          items: ["上海交大", "复旦", "浙大", "同济", "华师大", "华东理工", "东华", "上财", "上外", "上大", "上中医药"],
        },
      ],
    },
    {
      date: "7/9",
      title: "零志愿批",
      tone: "warm",
      groups: [
        {
          label: "代表学校",
          items: ["清华", "北大"],
        },
      ],
    },
    {
      date: "7/12",
      title: "提前批",
      tone: "warm",
      groups: [
        {
          label: "语言类",
          items: ["复旦", "上外"],
        },
        {
          label: "军校 / 公安 / 民航",
          items: ["上海公安", "国防科技大"],
        },
        {
          label: "综合评价",
          items: ["上科大", "上纽大"],
        },
        {
          label: "特殊专业",
          items: ["上海海事大学", "华政"],
        },
        {
          label: "香港学校",
          items: ["港中文", "港城大"],
        },
      ],
    },
    {
      date: "7/12-16",
      title: "本科艺体类",
      tone: "soft",
      groups: [
        {
          label: "音乐 / 戏剧类",
          items: ["上音", "上戏", "…"],
        },
        {
          label: "美术类",
          items: ["中国传媒", "清华美院", "…"],
        },
      ],
    },
    {
      date: "7/23",
      title: "普通批",
      tone: "cool",
      groups: [
        {
          label: "覆盖范围",
          items: ["上海市 41 所", "外地很多所"],
        },
      ],
    },
  ] satisfies AdmissionFlowStage[],
  warnings: [
    "这张图展示的是录取批次的基本顺序，不等于你一定只会命中其中一个节点。",
    "具体学校是否放在哪个批次，要以当年上海考试院和学校招生章程为准。",
  ],
};
