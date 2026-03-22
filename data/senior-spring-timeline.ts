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

export const seniorSpringTimeline = {
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
  ],
};
