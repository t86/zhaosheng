export type ZongpingInterviewSourceTrust =
  | "official"
  | "official-dynamic"
  | "official-reposted";

export type ZongpingInterviewTimelineEntry = {
  school: string;
  includes?: string;
  dateLabel: string;
  startDate: string;
  endDate?: string;
  timeLabel: string;
  reportLabel: string;
  location: string;
  format: string;
  admitTicket: string;
  keyReminder: string;
  sourceTrust: ZongpingInterviewSourceTrust;
  sourceLabel: string;
  sourceUrl: string;
  secondarySourceLabel?: string;
  secondarySourceUrl?: string;
};

export const shanghaiZongpingInterviewTimelineMeta = {
  year: 2026,
  region: "上海",
  title: "2026 上海综评校测/面试时间线",
  updatedAt: "2026-07-14",
  summary:
    "按上海市教育考试院公布的 2026 综合评价批次院校范围，以及各校官网、官网动态页或第三方转引高校招生网信息整理。最终报到时间、考场和携带材料仍以准考证为准。",
  shmeeaSourceUrl: "https://www.shmeea.edu.cn/page/02200/20260623/20374.html",
  commonReminder:
    "上海综评批次可填 4 个平行院校专业组；入围后不参加校测/面试的，多数学校按校测成绩 0 分计入综合成绩。",
} as const;

export const shanghaiZongpingInterviewTimeline: ZongpingInterviewTimelineEntry[] = [
  {
    school: "复旦大学",
    includes: "含复旦大学上海医学院",
    dateLabel: "7月6日-7日",
    startDate: "2026-07-06",
    endDate: "2026-07-07",
    timeLabel: "以准考证为准",
    reportLabel: "以准考证为准",
    location: "复旦大学",
    format: "校测面试",
    admitTicket: "7月4日起陆续随准考证发布，阳光高考平台查看",
    keyReminder: "已被强基计划或香港高校录取的考生不参加校测。",
    sourceTrust: "official",
    sourceLabel: "复旦大学招生网",
    sourceUrl: "https://ao.fudan.edu.cn/fb/23/c36331a785187/page.htm",
    secondarySourceLabel: "复旦准考证通知",
    secondarySourceUrl: "https://ao.fudan.edu.cn/fb/70/c36331a785264/page.htm",
  },
  {
    school: "上海交通大学",
    includes: "含上海交通大学医学院",
    dateLabel: "7月6日-7日",
    startDate: "2026-07-06",
    endDate: "2026-07-07",
    timeLabel: "以准考证为准",
    reportLabel: "以准考证为准",
    location: "上海交通大学闵行校区",
    format: "面试",
    admitTicket: "面试准考证已开放打印，阳光高考平台下载",
    keyReminder: "已被交大强基计划录取的考生无需参加上海综评面试。",
    sourceTrust: "official-dynamic",
    sourceLabel: "上海交通大学招生办动态页",
    sourceUrl: "https://admissions.sjtu.edu.cn/newDetails?contentsID=3810000004289",
    secondarySourceLabel: "招生简章",
    secondarySourceUrl: "https://admissions.sjtu.edu.cn/newDetails?contentsID=3810000004256",
  },
  {
    school: "同济大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "上午",
    reportLabel: "准考证打印 7月4日16:00-7月6日7:00",
    location: "同济大学四平路校区",
    format: "校测",
    admitTicket: "阳光高考特殊类型招生信息服务平台打印准考证",
    keyReminder: "缺考按校测成绩 0 分计入综合成绩；已被强基计划、港校录取者不参加。",
    sourceTrust: "official-reposted",
    sourceLabel: "上观新闻转引高校招生网",
    sourceUrl: "https://www.jfdaily.com/sgh/detail?id=4015303",
    secondarySourceLabel: "同济本科招生动态页",
    secondarySourceUrl: "https://bkzs-h5.tongji.edu.cn/notice/detail?id=6a47b219b723b800015be24d",
  },
  {
    school: "华东师范大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "以准考证为准",
    reportLabel: "准考证 7月4日16时后开放下载",
    location: "闵行校区第一教学楼106教室（东川路500号）",
    format: "AI 面试参考 + 现场面试",
    admitTicket: "阳光高考平台下载准考证；AI 面试 7月4日12时-7月5日12时完成",
    keyReminder: "AI 面试结果作为校测考核参考，现场校测需携带准考证和身份证原件。",
    sourceTrust: "official",
    sourceLabel: "华东师范大学本科招生网",
    sourceUrl: "https://zsb.ecnu.edu.cn/bc/01/c37603a769025/page.htm",
  },
  {
    school: "华东理工大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "以准考证为准",
    reportLabel: "准考证 7月4日16:00 后开放下载",
    location: "以准考证为准",
    format: "综合评价录取面试",
    admitTicket: "综合评价录取报名系统下载准考证",
    keyReminder: "需按准考证规定时间地点报到参加面试。",
    sourceTrust: "official",
    sourceLabel: "华东理工大学本科招生网",
    sourceUrl: "https://zsb.ecust.edu.cn/2026/0703/c2310a191890/page.htm",
    secondarySourceLabel: "上观新闻汇总",
    secondarySourceUrl: "https://www.jfdaily.com/sgh/detail?id=4015303",
  },
  {
    school: "东华大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "以准考证为准",
    reportLabel: "准考证 7月4日12:00 后打印",
    location: "东华大学延安路校区",
    format: "综合评价面试",
    admitTicket: "阳光高考综合评价报名系统-志愿管理-学校详情打印准考证",
    keyReminder: "最终测试通知确认为 7月6日，覆盖简章阶段的初定安排。",
    sourceTrust: "official",
    sourceLabel: "东华大学本科招生网",
    sourceUrl: "https://zs.dhu.edu.cn/2026/0703/c9575a378175/page.htm",
  },
  {
    school: "上海财经大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "上午8:00起分批报到",
    reportLabel: "准考证打印 7月4日15:00-7月6日12:00",
    location: "上海财经大学国定路校区第二教学楼一楼",
    format: "校测",
    admitTicket: "阳光高考特殊类型报名平台打印准考证",
    keyReminder: "名单中按考生给出具体报到时间，页面展示 8:00、9:30 等批次。",
    sourceTrust: "official",
    sourceLabel: "上海财经大学招生网",
    sourceUrl: "https://zs.sufe.edu.cn/13/ce/c3341a267214/page.htm",
  },
  {
    school: "上海外国语大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "14:00开始",
    reportLabel: "13:00-13:30进场；13:30 后不得参加",
    location: "松江校区第五教学楼（文翔路1550号）",
    format: "英语面试",
    admitTicket: "准考证打印 7月4日15:00-7月6日12:30",
    keyReminder: "松江校区无社会车辆停车位，建议绿色出行。",
    sourceTrust: "official",
    sourceLabel: "上海外国语大学招生网",
    sourceUrl: "https://admissions.shisu.edu.cn/33/bd/c631a209853/page.htm",
  },
  {
    school: "上海大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "具体见准考证",
    reportLabel: "网上确认 7月3日22:00-7月4日14:00；准考证 7月5日打印",
    location: "上海大学宝山校区B楼3楼（上大路99号）",
    format: "面试",
    admitTicket: "7月5日00:00-24:00打印准考证",
    keyReminder: "现场随机抽取面试顺序号；面试过程中不得向考官报本人姓名等个人信息。",
    sourceTrust: "official-reposted",
    sourceLabel: "上海大学本科招生网",
    sourceUrl: "https://bkzsw.shu.edu.cn/info/1798/38900.htm",
    secondarySourceLabel: "高考直通车转录",
    secondarySourceUrl: "https://app.gaokaozhitongche.com/newsguide/h/YNo3a60N",
  },
  {
    school: "上海中医药大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "以准考证为准",
    reportLabel: "准考证 7月4日12:00 后开放下载",
    location: "以准考证为准；行人从金科路3528号东门入校",
    format: "综合评价面试",
    admitTicket: "特殊类型招生报名平台下载打印面试准考证",
    keyReminder: "自驾车辆须 7月6日前报备；缺考按学校考核成绩 0 分排序。",
    sourceTrust: "official-reposted",
    sourceLabel: "上海中医药大学本科招生网",
    sourceUrl: "https://ygzs.shutcm.edu.cn/#/detail?type=1&id=371",
    secondarySourceLabel: "自主选拔在线转录",
    secondarySourceUrl: "https://www.zizzs.com/gk/baokao/224523.html",
  },
  {
    school: "浙江大学",
    dateLabel: "7月6日",
    startDate: "2026-07-06",
    timeLabel: "14:00开始",
    reportLabel: "12:30-13:30现场报到",
    location: "浙江大学国际联合学院（海宁国际校区）北教学楼B楼",
    format: "综合面试",
    admitTicket: "报名系统打印面试准考证",
    keyReminder: "只允许每人携带一本书进入候考室，通讯和智能设备不得带入。",
    sourceTrust: "official",
    sourceLabel: "浙江大学本科招生网",
    sourceUrl: "https://zdzsc.zju.edu.cn/2026/0703/c87333a3185095/page.htm",
  },
];

export function getShanghaiZongpingInterviewTimelineSummary() {
  const startDates = shanghaiZongpingInterviewTimeline.map((entry) => entry.startDate).sort();
  const endDates = shanghaiZongpingInterviewTimeline.map((entry) => entry.endDate ?? entry.startDate).sort();
  const dateBuckets = shanghaiZongpingInterviewTimeline.reduce<Record<string, number>>((buckets, entry) => {
    buckets[entry.dateLabel] = (buckets[entry.dateLabel] ?? 0) + 1;
    return buckets;
  }, {});

  return {
    year: shanghaiZongpingInterviewTimelineMeta.year,
    schoolCount: shanghaiZongpingInterviewTimeline.length,
    firstDate: startDates[0],
    lastDate: endDates[endDates.length - 1],
    officialCount: shanghaiZongpingInterviewTimeline.filter((entry) => entry.sourceTrust === "official").length,
    sourceCheckedCount: shanghaiZongpingInterviewTimeline.length,
    dateBuckets,
  };
}
