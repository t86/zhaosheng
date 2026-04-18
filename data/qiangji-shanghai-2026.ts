export type QiangjiShanghaiMajor = {
  major: string;
  subjectOrCollege: string;
  choiceNote: string;
  shortlist2025: string;
  admission2025: string;
  shortlist2024: string;
  admission2024: string;
  rank: string;
  plan2026: string;
  plan2025: string;
  weightedRule: string;
  exceptionRule: string;
};

export type QiangjiShanghaiSchool = {
  school: string;
  rawName: string;
  timing: string;
  applicationChoice: string;
  shortlistRatio: string;
  breakthroughRule: string;
  confirmationTime: string;
  shortlistTime: string;
  scoreFormula: string;
  assessmentTime: string;
  admissionTime: string;
  assessmentFormat: string;
  majors: readonly QiangjiShanghaiMajor[];
};

export type QiangjiDisciplineRating = {
  school: string;
  ratings: readonly { subject: string; rating: string }[];
};

export const qiangjiShanghai2026 = {
  "sourceFile": "26年强基计划汇总（对沪招生）.xlsx",
  "sourceNote": "来自用户提供的 Excel《26年强基计划汇总（对沪招生）》；站内保留为资料整理口径，执行报名仍以高校 2026 官方简章和阳光高考平台为准。",
  "stats": {
    "schoolCount": 29,
    "majorRowCount": 253,
    "timingCounts": {
      "未标注": 2,
      "出分前校测": 12,
      "出分后校测": 15
    },
    "disciplineSchoolCount": 29
  },
  "schools": [
    {
      "school": "清华大学",
      "rawName": "清华大学",
      "timing": "未标注",
      "applicationChoice": "8个专业\n（学校类不允许兼报）",
      "shortlistRatio": "6倍",
      "breakthroughRule": "4.11-30\n4月11日至4月24日，在相关学科领域具有突出才能和表现的考生须在强基计划报名平台https://bm.chsi.com.cn/jcxkzs/sch/10003及强基计划综合素质材料提交平台https://admission.join-tsinghua.edu.cn，提交破格资格申请，报考专业原则上须与学科特长相一致（未在上述两个平台同时完成报名视为无效报名）。",
      "confirmationTime": "6.10-6.16",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "6.28-7.3",
      "admissionTime": "",
      "assessmentFormat": "笔试+面试+体测",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "致理书院",
          "choiceNote": "8个专业\n（学校类不允许兼报）",
          "shortlist2025": "680",
          "admission2025": "",
          "shortlist2024": "671",
          "admission2024": "",
          "rank": "",
          "plan2026": "18",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数理基础科学",
          "subjectOrCollege": "未央书院",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学生物学",
          "subjectOrCollege": "探微书院",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "理论与应用力学",
          "subjectOrCollege": "行健书院",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "中国语言文学类(古文字学方向)",
          "subjectOrCollege": "日新书院",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "北京大学",
      "rawName": "北京大学",
      "timing": "未标注",
      "applicationChoice": "1个专业组\n最多10个专业",
      "shortlistRatio": "6倍",
      "breakthroughRule": "4.11-30\n4月11日至4月24日，获得数学、物理、化学、生物、信息学全国中学生学科奥林匹克竞赛全国决赛二等奖（含）以上成绩的考生可登录北京大学强基计划报名平台（网址：https://bm.chsi.com.cn/jcxkzs/sch/10001）及北京大学强基计划综合素质材料提交平台（网址：https://www.ccuut.edu.cn/xxcj），按要求准确、完整地完成网上报名，并提交破格资格申请。",
      "confirmationTime": "6.10-6.17",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "6月28日至7月4日",
      "admissionTime": "",
      "assessmentFormat": "笔试+面试+体测",
      "majors": [
        {
          "major": "数学类",
          "subjectOrCollege": "",
          "choiceNote": "1个专业组\n最多10个专业",
          "shortlist2025": "677",
          "admission2025": "",
          "shortlist2024": "671\n（1类）",
          "admission2024": "",
          "rank": "291",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学类(新增材料方向)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "力学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学类(新增生物医学和基础心\n理方向)",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "考古学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "中国语言文学类(古文字学方向)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学(八年制)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "670\n(II组）",
          "admission2024": "",
          "rank": "40",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "考古学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学类",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "中国语言文学类(古文字学方向)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "复旦大学",
      "rawName": "复旦大学\n出分前",
      "timing": "出分前校测",
      "applicationChoice": "文科组内不限，可选是否调剂，理科组报一个，且不能调剂",
      "shortlistRatio": "3倍",
      "breakthroughRule": "24年:4.15-30",
      "confirmationTime": "",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "初试:6月15日前,笔试.",
      "admissionTime": "",
      "assessmentFormat": "笔试测试内容如下：1.中国语言文学类（古文字学）、历史学、哲学类专业测试文史哲综合知识；\n\n2.数学与应用数学专业测试数学，信息与计算科学专业测试计算与算法，物理学类专业测试物理，化学类专业测试化学，生物科学类、基础医学专业测试数理化综合。",
      "majors": [
        {
          "major": "中国语言文学类(古文字学)",
          "subjectOrCollege": "不限",
          "choiceNote": "文科组内不限，可选是否调剂，理科组报一个，且不能调剂",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学-智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学类-1物理学、电子科学；2核物理；3地球学；4智能科学（新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学类1化学；2高分子化学；3环境科学；4边个材料（新）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "上海交通大学",
      "rawName": "上海交通大学\n出分前",
      "timing": "出分前校测",
      "applicationChoice": "1个专业组别进行报考，组内可报考多个专业，各专业组别单列计划，单独排队入围及录取",
      "shortlistRatio": "4倍（根据笔试成绩）",
      "breakthroughRule": "26年：4月13日-4月30日24时",
      "confirmationTime": "志愿确认入围面试的考生（含笔试通过和破格入围）须在报名系统内进行上海交通大学强基计划志愿确认，签订并上传承诺书。未进行志愿确认的考生将视为放弃强基计划选拔。",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "26年：笔试（高考后一周内），笔试通过需确认，",
      "admissionTime": "",
      "assessmentFormat": "笔试：（高考后一周）Ⅰ组的测试科目为“数学、物理”报考Ⅱ组的测试科目为“数学、化学”。面试、体育测试",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "I组(校测笔试科目:数学、物理)",
          "choiceNote": "1个专业组别进行报考，组内可报考多个专业，各专业组别单列计划，单独排队入围及录取",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "I组",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物医学工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学607",
          "subjectOrCollege": "I组(校测笔试科目:数学、物理)",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "621.94",
          "rank": "",
          "plan2026": "8",
          "plan2025": "6",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "船舶与海洋工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "材料科学与工程26新增",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "I组(校测笔试科目:数学、化学)",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "II组",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物医学科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "同济大学",
      "rawName": "同济大学 出分前",
      "timing": "出分前校测",
      "applicationChoice": "可选择一个专业组进行报考，组内可报考多个专业，并选择是否服从组内专业调剂，各专业组单独排队入围及录取",
      "shortlistRatio": "4倍（依据初试成绩）",
      "breakthroughRule": "25年：4.11-30",
      "confirmationTime": "",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "25年：6月16日前，专业1笔试为数理综合，专业组2笔试化学，复试时间看通知",
      "admissionTime": "",
      "assessmentFormat": "初始：笔试复试：面试+体测",
      "majors": [
        {
          "major": "数学与应用数学（数学）",
          "subjectOrCollege": "",
          "choiceNote": "可选择一个专业组进行报考，组内可报考多个专业，并选择是否服从组内专业调剂，各专业组单独排队入围及录取",
          "shortlist2025": "",
          "admission2025": "811.96",
          "shortlist2024": "1组",
          "admission2024": "840.47",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学（智能科学）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "760.2",
          "shortlist2024": "",
          "admission2024": "813.78",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "785.1",
          "shortlist2024": "",
          "admission2024": "831.58",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "海洋科学与技术",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "752.44",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "1",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "710.53",
          "shortlist2024": "2组",
          "admission2024": "828.81",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物技术",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "718.8",
          "shortlist2024": "",
          "admission2024": "850.28",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "浙江大学",
      "rawName": "浙江大学\n出分前",
      "timing": "出分前校测",
      "applicationChoice": "一个招生组别，组别内最多可填报不超过4个专业。。 考生须在浙江大学强基计划报名系统“附加信息”中上传考生签字的《诚信考试承诺书》扫描件(见附件)。",
      "shortlistRatio": "根据笔试成绩5倍",
      "breakthroughRule": "26年：4月13日至4月30日17 考试确认\n\n审核通过的考生须在规定时间内（5月31日-6月11日中午12:00）登录浙江大学强基计划报名平台进行考试确认并签订、上传考生签字的《诚信考试承诺书》。",
      "confirmationTime": "",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "初试：\n高考后出分前，已完成考试确认的第一类考生参加我校组织的初试",
      "admissionTime": "",
      "assessmentFormat": "初试：笔试笔试科目：Ⅰ组和Ⅱ组为数学和物理，Ⅲ组、Ⅳ组和Ⅴ组为数学和化学，Ⅵ组为语文和历史。\n2\n复试：所有入围考生统一参加，包括面试和体育测试。",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "1组",
          "choiceNote": "一个招生组别，组别内最多可填报不超过4个专业。。 考生须在浙江大学强基计划报名系统“附加信息”中上传考生签字的《诚信考试承诺书》扫描件(见附件)。",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "2",
          "weightedRule": "26年：Ⅰ组、Ⅱ组：综合成绩（满分1000分）=（高考成绩+高考数学成绩*0.5）/（高考成绩满分+高考数学成绩满分*0.5）*850（四舍五入取2位小数）+ 学校考核成绩（折算为满分150，四舍五入取2位小数）\n\nⅢ组、Ⅳ组、Ⅴ组、Ⅵ组：综合成绩（满分1000分）=高考成绩/高...",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "Ⅱ组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学（量子科技）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学（电子科学）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "Ⅲ组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "Ⅳ组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生态学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物育种科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学",
          "subjectOrCollege": "Ⅴ组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "Ⅵ组不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "南京大学",
      "rawName": "南京大学\n出分前",
      "timing": "出分前校测",
      "applicationChoice": "1个专业志愿，不调剂",
      "shortlistRatio": "3倍",
      "breakthroughRule": "25年：4.15-4.30\n（考生须下载并填写《南京大学2024年强基计划报考基本信息表》)",
      "confirmationTime": "审核通过的第一类考生参加初试，须于6月10日22:00前，登录报名平台确认是否参加初试并缴费。\n初试：6月19日前，复试：6月21日左右组织复试。第一类考生和第二类考生统一参加学校测试。",
      "shortlistTime": "",
      "scoreFormula": "“高考成绩÷高考满分×850＋南大考核成绩（满分150分）”计算综合成绩，并根据综合成绩进行录取。\n\n其中，对第一类考生，南大考核成绩由初试（满分50分）和复试（满分100分）成绩组成，录取时依据各省各专业招生计划数按综合成绩由高到低确定拟录取名单。考生综合成绩相同时，依次按照高考成绩、高考数学成绩、高考语文成绩、高考外语成绩排序。",
      "assessmentTime": "初试：\n6月19日左右组织初试，理科类考核内容为数理探究，文科类考核内容为阅读表达",
      "admissionTime": "",
      "assessmentFormat": "笔试+面试初试（6月16日前，6月10日交费确认，6月18日复试",
      "majors": [
        {
          "major": "数学与应用数学（两套培养方案）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业志愿，不调剂",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学（智能科学25年新）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "1",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学（四套培养方案）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "电子科学1人，物理学1人",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学-天体物理",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "/",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "中国科学技术大学",
      "rawName": "中国科学技术大学\n出分前",
      "timing": "出分前校测",
      "applicationChoice": "6个专业",
      "shortlistRatio": "4倍",
      "breakthroughRule": "4.10-4.30",
      "confirmationTime": "高考后、出分前",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "高考后出分前",
      "admissionTime": "",
      "assessmentFormat": "26年：笔试和综合面试，校考成绩满分为270分，其中笔试满分200分，综合面试满分70分；",
      "majors": [
        {
          "major": "物理学类(含物理学、应用物理学)",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "6个专业",
          "shortlist2025": "85.557-82.413",
          "admission2025": "82.151",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学类(含数学与应用数学、信息与",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "85.133-87.296",
          "admission2025": "82.123",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "理论与应用力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "84.641",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "核工程类(含核工程与核技术、工程物理",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "70",
          "admission2025": "74.577",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "地球物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "82.379",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "83.131",
          "admission2025": "80.363",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "量子信息科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "70",
          "admission2025": "82.737",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "能源与动力工程（新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学类(含生物科学、生物技",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "83.132",
          "admission2025": "80.537",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "西安交通大学缴费及初试考点选择：5月10日～15日",
      "rawName": "西安交通大学\n（出分前）缴费及初试考点选择：5月10日～15日",
      "timing": "出分前校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "25年5倍",
      "breakthroughRule": "25年：月21日-5月10日",
      "confirmationTime": "缴费及初试考点选择：5月10日～15日26年：初试+复试 初试需缴费，\n复试。通过初试的考生完成缴费后参加复试\n流程：初试时间：6月12日左右\n复试名单公布及缴费：6月14日左右\n复试时间：6月18日左右",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "26年：初试。所有初审通过的第一类考生，完成缴费后在初试考试系统内选择初试考点，参加我校组织的初试，具体时间安排详见初试准考证。初试科目：哲学考语文、历史两门，其他专业（类）考数学、物理两门。我校将根据初试成绩划定全国统一合格分数线，初试成绩不计入总分，仅作为复试资格认定依据。第二类考生免初试，可直接进入复试环节，复试内容同第一类考生。",
      "admissionTime": "6.27",
      "assessmentFormat": "综合测试和体育测试，（综合测试：笔试+面试）",
      "majors": [
        {
          "major": "数学类：数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "5+3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学类：信息与计算科学两个专业",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "7",
          "plan2025": "7",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "核工程与核技术",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物技术",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "材料科学与工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "历史",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "储能科学与工程（新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "能源与动力工程",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "厦门大学",
      "rawName": "厦门大学\n（出分前）缴费报名",
      "timing": "出分前校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "25年6倍",
      "breakthroughRule": "25年：4月21日至5月10日",
      "confirmationTime": "初试： 高考后一周，复试（6月22日前）复试需确认",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "7.1-7.2",
      "admissionTime": "7月5日前",
      "assessmentFormat": "初试：笔试\n复试：笔试+\n面试均为150分",
      "majors": [
        {
          "major": "数学类（数学与应用数学、信息与计算科学）",
          "subjectOrCollege": "理科1组",
          "choiceNote": "1个专业",
          "shortlist2025": "",
          "admission2025": "763.5",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学- 智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "理科1组",
          "choiceNote": "",
          "shortlist2025": "809.43",
          "admission2025": "770.9",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学-电子科学（25新）",
          "subjectOrCollege": "理科1组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "784.53",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学类（化学、化学生物、能源化学、化学测量与技术）",
          "subjectOrCollege": "理科2组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "775.43",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学类（生物技术、生物科学）",
          "subjectOrCollege": "理科2组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "701.46",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学类-生态学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "药学",
          "subjectOrCollege": "理科2组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "731.36",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "海洋科学",
          "subjectOrCollege": "理科2组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "738.33",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "不限3组",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "785.7",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "不限3组",
          "choiceNote": "",
          "shortlist2025": "811.85",
          "admission2025": "777.33",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "北京航空航天大学有签字上传核缴费",
      "rawName": "北京航空航天大学（出分前）有签字上传核缴费",
      "timing": "出分前校测",
      "applicationChoice": "1个专业志愿",
      "shortlistRatio": "25年5倍",
      "breakthroughRule": "24年：4.15-30考生须下载并填写《北京航空航天大学2024年强基计划考生个人陈述材料》",
      "confirmationTime": "",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "26年：初试（2026年6月12日左右）-复试（2026年6月17日—6月18日左右",
      "admissionTime": "7月5日",
      "assessmentFormat": "笔试=面试=体测",
      "majors": [
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业志愿",
          "shortlist2025": "663.39",
          "admission2025": "653.9",
          "shortlist2024": "80",
          "admission2024": "649.09",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "649.5",
          "admission2025": "618.55",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用物理学（含应用物理）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "619.58",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用物理学（电子科学两套培养方案，）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "613.44",
          "admission2025": "613.44",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "4",
          "plan2025": "5",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "651.03",
          "shortlist2024": "90",
          "admission2024": "603.26",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "航空航天类-动力(飞行器动力工。",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "679.65",
          "admission2025": "620.04",
          "shortlist2024": "45",
          "admission2024": "635.99",
          "rank": "",
          "plan2026": "/",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "航空航天类-控制(飞行制造工程）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "615.26",
          "admission2025": "633.98",
          "shortlist2024": "69",
          "admission2024": "644.61",
          "rank": "",
          "plan2026": "2",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "航空航天类-飞行器适航26新增",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "航空航天类（空天材料）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "664.43",
          "admission2025": "638.58",
          "shortlist2024": "84",
          "admission2024": "649.18",
          "rank": "",
          "plan2026": "/",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "测控技术与仪器（量子信息）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "653.81",
          "admission2025": "642.65",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "材料科学与工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "东南大学",
      "rawName": "东南大学（出分前）",
      "timing": "出分前校测",
      "applicationChoice": "1个专业（类）志愿，不调剂",
      "shortlistRatio": "4倍",
      "breakthroughRule": "25年：4月21日至5月10日",
      "confirmationTime": "通过初试需确认缴费：6月1日0:00-6月4日24:00前，登录报名平台确认是否参加初试并交费。逾期未完成确认的或未完成交费的，均视为放弃后续选拔。对确认参加初试又无故放弃的，我校将如实记录并通报生源省份省级招生考试机构",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "初试：6月14日初试笔试 复试：6月18日左右 测试分为体育测试和综合面试",
      "admissionTime": "",
      "assessmentFormat": "笔试+面试+体测",
      "majors": [
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "812.7667",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "文科"
        },
        {
          "major": "数学类（数学与应用数学、信息与计算科学）",
          "subjectOrCollege": "25年第一年在河北省招生",
          "choiceNote": "1个专业（类）志愿，不调剂",
          "shortlist2025": "",
          "admission2025": "685.6333",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "理科"
        },
        {
          "major": "数学类-智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "智能科学809.4667",
          "admission2025": "799.2333",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "1.08472222222222",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学-电子科学（25新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "831.8667",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学类（物理学、应用物理学）限制色盲",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "824.0667",
          "admission2025": "774.6667",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "理科"
        },
        {
          "major": "化学（限制色弱色盲）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "793.2667",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "理科"
        }
      ]
    },
    {
      "school": "兰州大学",
      "rawName": "兰州大学\n(25年出分前，26年出分后校测）",
      "timing": "出分前校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "6倍",
      "breakthroughRule": "24年4.10-4.30",
      "confirmationTime": "25年出分前校测：初试确认：6月10日16：00进行校考初试确认并缴费",
      "shortlistTime": "26年6月26日至6月27日",
      "scoreFormula": "",
      "assessmentTime": "25年：初试：6月16日前，通过进入\n复试确认：入围校考复试的考生须在规定时间内复试：\n6月22日前",
      "admissionTime": "",
      "assessmentFormat": "25年：初试：6月16日前初试形式为笔试，主要考核学生学科素养。初试在各招生省份省会城市集中设置考点，复试：6月22日前（具体安排另行通知）举行复试，复试包括面试和体育素质测试。",
      "majors": [
        {
          "major": "化学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "其中，汉语言文学（古文字学方向）、历史学：高考加权成绩=各科目高考成绩之和。\n数学与应用数学、物理学：高考加权成绩=高考总成绩+数学单科成绩*0.3+物理单科成绩*0.2。\n化学、核化工与核燃料工程、生物科学、草业科学(草类植物生物育种)、生态学：高考加权成绩=高考总成绩+数学单...",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": "数学≥145分（高考数学满分值非150分的省份，数学成绩须达到满分值的97%及以上）或物理满分"
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": "数学≥145分（高考数学满分值非150分的省份，数学成绩须达到满分值的97%及以上）"
        },
        {
          "major": "草业科学(草类植物生物育种)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "数学≥145分（高考数学满分值非150分的省份，数学成绩须达到满分值的97%及以上）或化学满分"
        },
        {
          "major": "核化工与核燃料工程（26年新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生态学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "历史",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "哈尔滨工业大学",
      "rawName": "哈尔滨工业大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "选择1个或2个专业，按“平行志愿”规则排序）作为专业志愿",
      "shortlistRatio": "4倍",
      "breakthroughRule": "24年:4.12-30",
      "confirmationTime": "25年：6.11-6.18签承诺书",
      "shortlistTime": "6月26日前",
      "scoreFormula": "",
      "assessmentTime": "6月30日至7月3日期间",
      "admissionTime": "7月5日前",
      "assessmentFormat": "面试+体测\n综合面试、体质测试两部分\n\n综合面试主要考察考生在入围专业领域内的志向兴趣和学习科研能力等，采取考场、专家、考生“三随机”抽签的方式，面试全程录音录像。面试过程中我校将对综合素质档案进行考察。",
      "majors": [
        {
          "major": "智能装备与系统",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "选择1个或2个专业，按“平行志愿”规则排序）作为专业志愿",
          "shortlist2025": "722.6",
          "admission2025": "86.31",
          "shortlist2024": "664",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "1",
          "weightedRule": "入围成绩=重点科目高考成绩之和×1.2+其他科目高考成绩之和。\n\n对于材料审核合格的第二类考生，高考总成绩达到所在省（自治区、直辖市）本科第一批次录取控制分数线，即可破格入围，且入围专业为考生第一专业志愿。",
          "exceptionRule": ""
        },
        {
          "major": "智能科学与工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "701.4",
          "admission2025": "84.81",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "复合材料与工程（航天材料",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "695.2",
          "admission2025": "88.05",
          "shortlist2024": "687.8",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "飞行器制造工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "711.8",
          "admission2025": "85.1",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "材料科学与工程（航天材料",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "704.4",
          "admission2025": "83.42",
          "shortlist2024": "683.2",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "核工程与核技术",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "85.53",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学类-数学与应用数学、信息与计算科学）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "695.8，",
          "admission2025": "82.72",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "储能科学与工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学类-（数学与应用数学自动化方向）26年不招",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "71",
          "admission2025": "85.52",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学类-智能科学（含数学与应用数学、信息与计算科学）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "709.6",
          "admission2025": "86.16",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "702.6",
          "admission2025": "84.42",
          "shortlist2024": "693",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "南开大学",
      "rawName": "南开大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "一个专业志愿",
      "shortlistRatio": "25年：6倍",
      "breakthroughRule": "25年：4月20日10:00-5月10日18:00",
      "confirmationTime": "6月11日9:00-6月19日17:00",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "预计6月底至7月初",
      "admissionTime": "7月5日前",
      "assessmentFormat": "面试+体测",
      "majors": [
        {
          "major": "物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "一个专业志愿",
          "shortlist2025": "/",
          "admission2025": "761.27",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "入围成绩=重要权重科目高考成绩×1.5+其他科目高考成绩之和",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "755.5",
          "admission2025": "770.2",
          "shortlist2024": "736.5",
          "admission2024": "804.93",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "数学与应用数学：数学+物理",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "746.5",
          "admission2025": "762.6",
          "shortlist2024": "736.5",
          "admission2024": "804.93",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "信息与计算科学：数学+物理",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "777.27",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "物理学：数学+物理",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "699.5",
          "admission2025": "769.33",
          "shortlist2024": "702",
          "admission2024": "805",
          "rank": "",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "化学：数学+化学",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "787.33",
          "shortlist2024": "702",
          "admission2024": "805",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "生物科学：数学+生物",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "758",
          "admission2025": "811.8",
          "shortlist2024": "745",
          "admission2024": "819.6",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "数学+物理",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学（依托于数学学院和人工智能学院）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "754.5普通736.5",
          "admission2025": "789.53",
          "shortlist2024": "754.5",
          "admission2024": "",
          "rank": "",
          "plan2026": "3+2",
          "plan2025": "2+3",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "北京理工大学",
      "rawName": "北京理工大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "一个专业志愿，不调剂",
      "shortlistRatio": "4倍",
      "breakthroughRule": "25年：4月18日至5月10日",
      "confirmationTime": "6月12日至6月20日上传承诺书",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "7月4日前",
      "admissionTime": "",
      "assessmentFormat": "26：面试和体育测试",
      "majors": [
        {
          "major": "应用物理学和微电子",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "一个专业志愿，不调剂",
          "shortlist2025": "678.4",
          "admission2025": "644.8",
          "shortlist2024": "657.6",
          "admission2024": "646.8",
          "rank": "",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "入围成绩=高考成绩（不含政策性加分）+数学高考单科成绩*0.2。",
          "exceptionRule": "未入围的考生中，如有高考数学单科成绩取得满分的，可破格入围学校考核"
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "620.2",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "智能无人系统技术-车辆培养方案",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "609.37",
          "shortlist2024": "670.8",
          "admission2024": "655.65",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "智能无人系统技术-机电培养方案",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "695",
          "admission2025": "646.02",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "高分子材料与工程-特种能源方向",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "660",
          "admission2025": "630.37",
          "shortlist2024": "670.8",
          "admission2024": "655.65",
          "rank": "",
          "plan2026": "4",
          "plan2025": "6",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "高分子材料与工程-高分子材料方向",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "6",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "655",
          "admission2025": "575.42",
          "shortlist2024": "596.4",
          "admission2024": "629.38",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学和数学机器人",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "685.2",
          "admission2025": "657.4",
          "shortlist2024": "657.6",
          "admission2024": "648.6",
          "rank": "",
          "plan2026": "数学培养方向2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "大连理工大学",
      "rawName": "大连理工大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "24年：不超过5个专业志愿",
      "shortlistRatio": "25年：4倍",
      "breakthroughRule": "25年：4月19日-5月10日",
      "confirmationTime": "6.12-6.20",
      "shortlistTime": "6月26日后",
      "scoreFormula": "",
      "assessmentTime": "6月28日中午12时前，考生可登录报名系统在线打印准考证。7月1日入围考生请持本人二代身份证原件、准考证按时参加我校组织的考核（含面试和体育测试），",
      "admissionTime": "7.5日2.确定预录取名单\n（1）根据强基计划分省分专业计划，按照考生入围专业和综合成绩由高到低顺序确定预录取资格，考生校考入围专业即为预录取专业，不再进行调剂。如综合成绩相同，优先录取高考成绩高者，再相同，依次为“数学”“语文”“外语”成...",
      "assessmentFormat": "面试100分",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "814.77",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用物理学",
          "subjectOrCollege": "",
          "choiceNote": "24年：不超过5个专业志愿",
          "shortlist2025": "650.8",
          "admission2025": "835.87",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "",
          "weightedRule": "高考加权成绩=高考成绩+数学单科成绩*N（其中：数学与应用数学和信息与计算科学专业 N=0.5；\n应用物理学和工程力学专业 N=0.2；应用化学和生物工程专业N=0）",
          "exceptionRule": "破格：对于高考单科成绩特别优秀的考生，满足高考成绩不低于考生所在省份高考满分的75%条件时，如按上述规则未能入围，在其高考单科成绩符合所报专业破格入围条件和要求时，可破格入围，入围专业为各科目对应专业。各专业对高考单科成绩的破格入围条件和要求如下：数学与应用数学专业和信息与计算科..."
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "651.6",
          "admission2025": "830.47",
          "shortlist2024": "644.2",
          "admission2024": "837.87",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用化学",
          "subjectOrCollege": "",
          "choiceNote": "25年：6个专业",
          "shortlist2025": "628",
          "admission2025": "800.77",
          "shortlist2024": "624",
          "admission2024": "836.87",
          "rank": "",
          "plan2026": "3",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "621",
          "admission2025": "820.67",
          "shortlist2024": "610",
          "admission2024": "830.63",
          "rank": "11140",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "618",
          "admission2024": "837.2",
          "rank": "8071",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "天津大学",
      "rawName": "天津大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业志愿，且选择是否服从专业调剂",
      "shortlistRatio": "24年：5倍",
      "breakthroughRule": "24年：4.10-30",
      "confirmationTime": "6.10-6.20",
      "shortlistTime": "6月26日前",
      "scoreFormula": "",
      "assessmentTime": "7.4前",
      "admissionTime": "7.5日",
      "assessmentFormat": "面试+体测",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "85.6333",
          "admission2025": "80.4833",
          "shortlist2024": "",
          "admission2024": "84.4267",
          "rank": "",
          "plan2026": "",
          "plan2025": "4",
          "weightedRule": "1数学与应用数学专业：高考成绩+数学单科成绩*0.4；\n2应用物理学专业：高考成绩+物理单科成绩*0.6\n3应用化学专业：高考成绩+化学单科成绩*0.6；\n4生物科学专业：高考成绩+化学单科成绩*0.6；\n5工程力学专业：高考成绩+数学单科成绩*0.4；\n6合成生物学专业：高考成...",
          "exceptionRule": "1数学与应用数学专业、工程力学专业和船舶与海洋工程专业要求数学科目成绩不低于145分（海南省要求达到满分的97%及以上），且高考加权成绩排序处于6倍以内；\n\n2应用化学专业、生物科学专业和合成生物学专业要求化学科目成绩达到满分的97%及以上（上海市要求70分），且高考加权成绩排序..."
        },
        {
          "major": "应用物理学（色盲限制）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业志愿，且选择是否服从专业调剂",
          "shortlist2025": "86.09",
          "admission2025": "80.65",
          "shortlist2024": "",
          "admission2024": "86.25",
          "rank": "",
          "plan2026": "",
          "plan2025": "4",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "应用化学（色弱色盲限制）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "81.9267",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "4",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学（色弱色盲限制）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "84.7333",
          "admission2025": "82.7933",
          "shortlist2024": "",
          "admission2024": "83.5867",
          "rank": "",
          "plan2026": "4",
          "plan2025": "4",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "81.2133",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "合成生物学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "82.6167",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "能源与动力工程",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "76.4567",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "船舶与海洋工程",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "中南大学",
      "rawName": "中南大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "2个专业",
      "shortlistRatio": "5倍",
      "breakthroughRule": "4月19日至5月10日",
      "confirmationTime": "6.12-6.20",
      "shortlistTime": "45835",
      "scoreFormula": "",
      "assessmentTime": "7.1",
      "admissionTime": "7月5日前",
      "assessmentFormat": "面试+体测（面试考核满分100分，成绩合格标准不低于60分。）",
      "majors": [
        {
          "major": "应用物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "2个专业",
          "shortlist2025": "624",
          "admission2025": "",
          "shortlist2024": "620",
          "admission2024": "",
          "rank": "7388",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "第一专业志愿为数学与应用数学、且高考数学单科成绩达到145分的考生不受名额限制直接入围。",
          "exceptionRule": "高考数学单科原始成绩达到145分的考生不受名额限制且满足其第一志愿直接入围。"
        },
        {
          "major": "应用化学 限制色觉",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "614",
          "admission2025": "",
          "shortlist2024": "612",
          "admission2024": "",
          "rank": "10308",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学限制色觉",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "611",
          "admission2025": "",
          "shortlist2024": "603",
          "admission2024": "",
          "rank": "14334",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "26年：高考数学单科原始成绩达到145分的考生不受名额限制且满足其第一志愿直接入围。"
        },
        {
          "major": "材料科学与工程限制色觉",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "605",
          "admission2024": "",
          "rank": "13385",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "633",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "湖南大学",
      "rawName": "湖南大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "4倍",
      "breakthroughRule": "24年：4.11-28",
      "confirmationTime": "6.12-6.18",
      "shortlistTime": "6月26日前",
      "scoreFormula": "",
      "assessmentTime": "详见湖南大学强基计划准考证。7.5前 2023年6月26日",
      "admissionTime": "",
      "assessmentFormat": "26年面试+体测",
      "majors": [
        {
          "major": "化学生物学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业",
          "shortlist2025": "/",
          "admission2025": "79.82",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "高考成绩和化学科目高考成绩加权计算得到的入围成绩，化学成绩、高考数学成绩、高考语文成绩、高考外语成绩优先确定入围名单。",
          "exceptionRule": "化学单科成绩97分及以上（上海市为70分），且入围成绩进入强基计划分省招生计划数6倍以内的考生，可破格入围学校考核"
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "82.37",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "26年入围成绩=化学科目高考成绩×2+其他科目高考成绩之和。",
          "exceptionRule": "26年化学单科成绩97分及以上（上海市为70分），且入围成绩进入强基计划分省招生计划数6倍以内的考生，可破格入围学校考核，考生的第一专业志愿作为入围学校综合考核的唯一专业。"
        },
        {
          "major": "应用化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "综合成绩85.84",
          "admission2025": "83.2",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "中国海洋大学",
      "rawName": "中国海洋大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "24年：5倍",
      "breakthroughRule": "25年：4月21日至5月10日",
      "confirmationTime": "6月10日至20日（特控线上40分）",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "7.4前",
      "admissionTime": "7月5日前",
      "assessmentFormat": "面试+体测",
      "majors": [
        {
          "major": "生物科学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "627",
          "admission2025": "768.05",
          "shortlist2024": "595",
          "admission2024": "",
          "rank": "18663",
          "plan2026": "4",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "海洋技术（在信息科学与工程学院）",
          "subjectOrCollege": "",
          "choiceNote": "1个专业",
          "shortlist2025": "660.6",
          "admission2025": "797.68",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "海洋科学、海洋技术专业的考生：入围成绩=高考成绩（不含政策性加分）+数学单科成绩*0.5。",
          "exceptionRule": ""
        },
        {
          "major": "海洋科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "652.5",
          "admission2025": "813.15",
          "shortlist2024": "584",
          "admission2024": "",
          "rank": "25721",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "武汉大学",
      "rawName": "武汉大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "24年：3 个专业",
      "shortlistRatio": "5倍",
      "breakthroughRule": "24年：4.10-30",
      "confirmationTime": "6.10-6.20",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "24年：7.1前",
      "admissionTime": "",
      "assessmentFormat": "面试+笔试+体测体育测试、综合能力测试两个环节；综合能力测试包含笔试（部分专业含机试，下同）和面试两部分，综合能力测试成绩满分100分，笔试和面试各占50%。",
      "majors": [
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "历史",
          "choiceNote": "24年：3 个专业",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "",
          "choiceNote": "25年：1个",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学-1类依托数学与统计学院",
          "subjectOrCollege": "",
          "choiceNote": "26年1个专业志愿",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "649.74",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学-2类智能科学（25年新）人工智能学院培养。",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "/",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "/",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "627.39",
          "rank": "",
          "plan2026": "1",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学",
          "subjectOrCollege": "",
          "choiceNote": "/",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "地球物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "中山大学",
      "rawName": "中山大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业",
      "shortlistRatio": "5倍",
      "breakthroughRule": "24年：4.13-30",
      "confirmationTime": "6.10-6.20",
      "shortlistTime": "6月26日前",
      "scoreFormula": "",
      "assessmentTime": "25年：7月3日左右",
      "admissionTime": "7月5日前",
      "assessmentFormat": "面试+体测（不及格不录取） 。",
      "majors": [
        {
          "major": "历史学",
          "subjectOrCollege": "不限",
          "choiceNote": "1个专业",
          "shortlist2025": "/",
          "admission2025": "84.31",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "84.95",
          "shortlist2024": "639",
          "admission2024": "87.18",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学（两套培养方案，分别依托数学学院、计算机学院培养。",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "639",
          "admission2025": "82.9333",
          "shortlist2024": "",
          "admission2024": "639",
          "rank": "",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "数学与应用数学：数学≥140分"
        },
        {
          "major": "物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "83.04",
          "shortlist2024": "",
          "admission2024": "86.4667",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "物理学：数学≥140分或物理100分"
        },
        {
          "major": "化学（限制色弱）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "613",
          "admission2025": "81.83",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "4",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "化学：化学100分"
        },
        {
          "major": "生物科学（限制色弱）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "631",
          "admission2025": "77.95",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生态学（限制色弱）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "81.44",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "生态学：数学≥140分"
        },
        {
          "major": "基础医学（限制色弱）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "73.5167",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "理论与应用力学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "617",
          "admission2025": "84.75",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": "理论与应用力学：数学≥140分或物理100分"
        },
        {
          "major": "药学（生物医药）（限制色弱）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "85.39",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": "药学（生物医药）：化学100分"
        },
        {
          "major": "汉语言文学(古文字方向)",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "83",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "华东师范大学",
      "rawName": "华东师范大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "一个专业组，文科组可填报1-2个专业（方向），理科组可填报1-4个专业（方向），并选择是否服从专业调剂。",
      "shortlistRatio": "4倍",
      "breakthroughRule": "25年：4.18-5.7日12时",
      "confirmationTime": "6.10-6.20",
      "shortlistTime": "6月26日前",
      "scoreFormula": "",
      "assessmentTime": "7月1日至7月3日",
      "admissionTime": "24年6.29-6.30",
      "assessmentFormat": "笔试、面试及体育测试3项，校测地点为华东师范大学闵行校区",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "一个专业组，文科组可填报1-2个专业（方向），理科组可填报1-4个专业（方向），并选择是否服从专业调剂。",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "理科组：入围成绩=高考成绩+高考数学单科成绩*0.5",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学-智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "1",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "文科组：入围成绩=高考成绩+高考语文单科成绩*0.5",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学)",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "中国人民大学",
      "rawName": "中国人民大学 出分前",
      "timing": "出分前校测",
      "applicationChoice": "一个专业组",
      "shortlistRatio": "4倍",
      "breakthroughRule": "25年5.10前\n第二类考生可于即日起至5月8日",
      "confirmationTime": "6月中旬",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "26年6.13日左右初试，笔试，专业A组重点考查考生数理科技相关领域知识积累、学习兴趣、综合素质等，专业B组重点考查考生文史哲相关领域知识积累、学习兴趣、综合素质等。考查范围均不限于高中课程标准范围。",
      "admissionTime": "7.5前",
      "assessmentFormat": "笔试+面试+体测",
      "majors": [
        {
          "major": "数据计算及应用A组\n两套培养方案，一个是人工智能一个是计算机25年招生",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "一个专业组",
          "shortlist2025": "623.61",
          "admission2025": "611.58",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学B组",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "621.19",
          "admission2025": "611.66",
          "shortlist2024": "648",
          "admission2024": "",
          "rank": "332",
          "plan2026": "",
          "plan2025": "5",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向）B组",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "611.66",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学类B组",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "611.66",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "北京师范大学",
      "rawName": "北京师范大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "一个或多个专业，并填报是否服从专业调剂。",
      "shortlistRatio": "5倍\n入围校考办法5倍外还要且高考成绩须达到生源所在省份同科类本科第一批次录取控制分数线上70分",
      "breakthroughRule": "25年4.18-30，一本线上70分",
      "confirmationTime": "6月10日至20日",
      "shortlistTime": "45835",
      "scoreFormula": "",
      "assessmentTime": "7月1日至3日",
      "admissionTime": "25年7.5",
      "assessmentFormat": "笔试、面试和体育测试",
      "majors": [
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "不限",
          "choiceNote": "一个或多个专业，并填报是否服从专业调剂。",
          "shortlist2025": "644",
          "admission2025": "",
          "shortlist2024": "637",
          "admission2024": "",
          "rank": "723",
          "plan2026": "",
          "plan2025": "4",
          "weightedRule": "",
          "exceptionRule": "对于B类考生，数学单科成绩达145分及以上或物理、化学、生物其中之一单科成绩达100分或理科综合成绩达285分及以上，且在理科组计划数5倍至7倍（含）之间的考生，其高考成绩达到生源所在省份同科类本科第一批次录取控制分数线，即可破格入围学校考核"
        },
        {
          "major": "历史学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学-智能科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "山东大学",
      "rawName": "山东大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业志愿",
      "shortlistRatio": "5倍",
      "breakthroughRule": "24年4.12-30",
      "confirmationTime": "6.12-6.20通过强基计划报名平台确认是否参加学校考核（以下简称“校考”）",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "7月3日前组织校考",
      "admissionTime": "25年：7.5前",
      "assessmentFormat": "笔试+面试+体测满分100分。",
      "majors": [
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1个专业志愿",
          "shortlist2025": "636",
          "admission2025": "",
          "shortlist2024": "625",
          "admission2024": "",
          "rank": "5911",
          "plan2026": "2",
          "plan2025": "4",
          "weightedRule": "26年：数学与应用数学、密码科学与技术专业入围成绩=高考成绩+数学单科成绩×0.5；其他专业入围成绩=高考成绩",
          "exceptionRule": "25年：高考数学成绩为145分及以上的考生可直接入围且不占入围名额"
        },
        {
          "major": "数学与应用数学（智能科学25年新）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "82.53",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "密码科学与技术（新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "2",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": "26年取消破格入围"
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "623",
          "admission2025": "74.23",
          "shortlist2024": "619",
          "admission2024": "",
          "rank": "7713",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "618",
          "admission2025": "77.64",
          "shortlist2024": "596",
          "admission2024": "",
          "rank": "18111",
          "plan2026": "4",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "619",
          "admission2025": "69.26",
          "shortlist2024": "596",
          "admission2024": "",
          "rank": "18111",
          "plan2026": "4",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物医学科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "627",
          "admission2025": "77.78",
          "shortlist2024": "604",
          "admission2024": "",
          "rank": "13836",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "不限",
          "choiceNote": "",
          "shortlist2025": "628",
          "admission2025": "82.91",
          "shortlist2024": "624",
          "admission2024": "",
          "rank": "1543",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "历史学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "634",
          "admission2025": "81.46",
          "shortlist2024": "626",
          "admission2024": "",
          "rank": "1400",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "630",
          "admission2025": "80.39",
          "shortlist2024": "619",
          "admission2024": "",
          "rank": "1999",
          "plan2026": "",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "华中科技大学",
      "rawName": "华中科技大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1-5个可填专业",
      "shortlistRatio": "6倍",
      "breakthroughRule": "24年4.11-30：12",
      "confirmationTime": "6.12-6.20\n25年：6月12日中午12:00-20日中午12:00",
      "shortlistTime": "",
      "scoreFormula": "",
      "assessmentTime": "7.4前",
      "admissionTime": "7.5前",
      "assessmentFormat": "面试、体育测试",
      "majors": [
        {
          "major": "数学与应用数学（含数学与应用数学也、信息与计算科学）",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "1-5个可填专业",
          "shortlist2025": "636",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "5409",
          "plan2026": "2",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": "未入围的第一类考生中，对于高考单科成绩特别优秀的考生，满足高考成绩不低于考生所在省份高考满分的80%条件时，在其高考单科成绩符合所报专业破格入围条件和要求时，可破格入围，入围专业为各科目对应专业。各专业对高考单科成绩的破格入围条件和要求如下：数学与应用数学、生物科学专业要求高考数..."
        },
        {
          "major": "数学类-智能科学（信息与计算科学25年新增）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "638.1291191",
          "admission2025": "81.0462",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学-电子科学（应用物理学电子科学）",
          "subjectOrCollege": "",
          "choiceNote": "26年：考生按照专业志愿顺序可填报多个专业",
          "shortlist2025": "/",
          "admission2025": "85.4938",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学-基础及应用物理（含物理学、应用物理）",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "87.296",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "1",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "82.413",
          "admission2025": "83.9262",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "604.1201141",
          "admission2025": "83.5995",
          "shortlist2024": "624",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "628",
          "admission2025": "83.01",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "汉语言文学(古文字学方向)",
          "subjectOrCollege": "历史",
          "choiceNote": "",
          "shortlist2025": "604.1280981",
          "admission2025": "",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "597.1220941",
          "admission2025": "82.5362",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    },
    {
      "school": "四川大学",
      "rawName": "四川大学（出分后）",
      "timing": "出分后校测",
      "applicationChoice": "1个专业，不进行专业调剂",
      "shortlistRatio": "24年6倍\n25年4倍",
      "breakthroughRule": "25年4月21日至5月8日",
      "confirmationTime": "6.10-6.20",
      "shortlistTime": "46200",
      "scoreFormula": "高于生源省份2025年部分特殊类型相应录取控制分数线40分（含）。",
      "assessmentTime": "7月2日前",
      "admissionTime": "",
      "assessmentFormat": "笔试+面试+体测(不计成绩可申请医院证明）",
      "majors": [
        {
          "major": "汉语言文学(古文字方向)",
          "subjectOrCollege": "历史",
          "choiceNote": "1个专业，不进行专业调剂",
          "shortlist2025": "/",
          "admission2025": "536.535",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "26年：对于报考数学与应用数学、信息与计算科学、物理学、工程力学的考生：入围成绩=高考成绩（不含政策性加分）+数学高考单科成绩*0.4。\n对于报考其他专业的考生：入围成绩=高考成绩（不含政策性加分）",
          "exceptionRule": ""
        },
        {
          "major": "历史学类(包含历史学、考古学、文\n物与博物馆学专业)",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "536.535",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "哲学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "602.695",
          "shortlist2024": "617",
          "admission2024": "622.165",
          "rank": "2189",
          "plan2026": "",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "数学与应用数学",
          "subjectOrCollege": "物理+化学",
          "choiceNote": "",
          "shortlist2025": "632",
          "admission2025": "618.93",
          "shortlist2024": "609",
          "admission2024": "",
          "rank": "11565",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "信息与计算科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "624",
          "admission2025": "628.89",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "3",
          "plan2025": "3",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "物理学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "572.685",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "/",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "工程力学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "621",
          "admission2025": "614.03",
          "shortlist2024": "607",
          "admission2024": "",
          "rank": "12449",
          "plan2026": "2",
          "plan2025": "2",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "化学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "599.795",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "生物科学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "604.93",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        },
        {
          "major": "基础医学",
          "subjectOrCollege": "",
          "choiceNote": "",
          "shortlist2025": "/",
          "admission2025": "521.9",
          "shortlist2024": "",
          "admission2024": "",
          "rank": "",
          "plan2026": "/",
          "plan2025": "",
          "weightedRule": "",
          "exceptionRule": ""
        }
      ]
    }
  ],
  "disciplineRatings": [
    {
      "school": "北京大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A+"
        },
        {
          "subject": "物理",
          "rating": "A+"
        },
        {
          "subject": "化学",
          "rating": "A+"
        },
        {
          "subject": "生物",
          "rating": "A+"
        },
        {
          "subject": "中国语言文学",
          "rating": "A+"
        },
        {
          "subject": "历史类",
          "rating": "A+"
        },
        {
          "subject": "哲学",
          "rating": "A+"
        },
        {
          "subject": "基础医学",
          "rating": "A+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A+"
        }
      ]
    },
    {
      "school": "清华大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "A"
        },
        {
          "subject": "化学",
          "rating": "A+"
        },
        {
          "subject": "生物",
          "rating": "A+"
        },
        {
          "subject": "中国语言文学",
          "rating": "B+"
        },
        {
          "subject": "历史类",
          "rating": "B+"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A+"
        }
      ]
    },
    {
      "school": "中国人民大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B"
        },
        {
          "subject": "物理",
          "rating": "B"
        },
        {
          "subject": "化学",
          "rating": "C+"
        },
        {
          "subject": "生物",
          "rating": "未上榜"
        },
        {
          "subject": "中国语言文学",
          "rating": "A-"
        },
        {
          "subject": "历史类",
          "rating": "A-"
        },
        {
          "subject": "哲学",
          "rating": "A"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "北京师范大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "A+"
        },
        {
          "subject": "历史类",
          "rating": "A+"
        },
        {
          "subject": "哲学",
          "rating": "A-"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "北京航空航天大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "未上榜"
        },
        {
          "subject": "物理",
          "rating": "未上榜"
        },
        {
          "subject": "化学",
          "rating": "未上榜"
        },
        {
          "subject": "生物",
          "rating": "未上榜"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A-"
        }
      ]
    },
    {
      "school": "北京理工大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "未上榜"
        },
        {
          "subject": "物理",
          "rating": "未上榜"
        },
        {
          "subject": "化学",
          "rating": "未上榜"
        },
        {
          "subject": "生物",
          "rating": "未上榜"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "上海交通大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "A"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "A+"
        },
        {
          "subject": "中国语言文学",
          "rating": "B-"
        },
        {
          "subject": "历史类",
          "rating": "A"
        },
        {
          "subject": "哲学",
          "rating": "A"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "复旦大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A+"
        },
        {
          "subject": "物理",
          "rating": "A"
        },
        {
          "subject": "化学",
          "rating": "A"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "A+"
        },
        {
          "subject": "哲学",
          "rating": "A+"
        },
        {
          "subject": "基础医学",
          "rating": "A"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "C+"
        }
      ]
    },
    {
      "school": "同济大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "C-"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B"
        },
        {
          "subject": "基础医学",
          "rating": "B"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "华东师范大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "A+"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "南京大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "A"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "A"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "A+"
        },
        {
          "subject": "哲学",
          "rating": "A"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "东南大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "未上榜"
        },
        {
          "subject": "物理",
          "rating": "未上榜"
        },
        {
          "subject": "化学",
          "rating": "未上榜"
        },
        {
          "subject": "生物",
          "rating": "未上榜"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B-"
        }
      ]
    },
    {
      "school": "南开大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "A-"
        },
        {
          "subject": "化学",
          "rating": "A"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "A-"
        },
        {
          "subject": "历史类",
          "rating": "A-"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "B+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "天津大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "未上榜"
        },
        {
          "subject": "物理",
          "rating": "未上榜"
        },
        {
          "subject": "化学",
          "rating": "未上榜"
        },
        {
          "subject": "生物",
          "rating": "未上榜"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A-"
        }
      ]
    },
    {
      "school": "浙江大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "A-"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "B"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "A-"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "中国科学技术大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "A+"
        },
        {
          "subject": "化学",
          "rating": "A+"
        },
        {
          "subject": "生物",
          "rating": "A"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "厦门大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "A"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "B"
        },
        {
          "subject": "历史类",
          "rating": "B+"
        },
        {
          "subject": "哲学",
          "rating": "B"
        },
        {
          "subject": "基础医学",
          "rating": "C+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "C-"
        }
      ]
    },
    {
      "school": "山东大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A+"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "B+"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "B+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "C"
        }
      ]
    },
    {
      "school": "中国海洋大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "C+"
        },
        {
          "subject": "物理",
          "rating": "C-"
        },
        {
          "subject": "化学",
          "rating": "C"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "C"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "未上榜"
        }
      ]
    },
    {
      "school": "武汉大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "A-"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "A"
        },
        {
          "subject": "中国语言文学",
          "rating": "A-"
        },
        {
          "subject": "历史类",
          "rating": "B+"
        },
        {
          "subject": "哲学",
          "rating": "A-"
        },
        {
          "subject": "基础医学",
          "rating": "B"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "C+"
        }
      ]
    },
    {
      "school": "华中科技大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "A-"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "B-"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B+"
        },
        {
          "subject": "基础医学",
          "rating": "B+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B+"
        }
      ]
    },
    {
      "school": "中南大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "B"
        },
        {
          "subject": "化学",
          "rating": "B"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B-"
        },
        {
          "subject": "基础医学",
          "rating": "B+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "C"
        }
      ]
    },
    {
      "school": "湖南大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "B"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "C+"
        },
        {
          "subject": "中国语言文学",
          "rating": "C"
        },
        {
          "subject": "历史类",
          "rating": "B-"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B-"
        }
      ]
    },
    {
      "school": "中山大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "A-"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "A-"
        },
        {
          "subject": "中国语言文学",
          "rating": "A-"
        },
        {
          "subject": "历史类",
          "rating": "B"
        },
        {
          "subject": "哲学",
          "rating": "A-"
        },
        {
          "subject": "基础医学",
          "rating": "A-"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B-"
        }
      ]
    },
    {
      "school": "四川大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "B"
        },
        {
          "subject": "化学",
          "rating": "A-"
        },
        {
          "subject": "生物",
          "rating": "B-"
        },
        {
          "subject": "中国语言文学",
          "rating": "A"
        },
        {
          "subject": "历史类",
          "rating": "B+"
        },
        {
          "subject": "哲学",
          "rating": "B"
        },
        {
          "subject": "基础医学",
          "rating": "B+"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B-"
        }
      ]
    },
    {
      "school": "西安交通大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "C+"
        },
        {
          "subject": "生物",
          "rating": "B-"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B-"
        },
        {
          "subject": "基础医学",
          "rating": "B"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A"
        }
      ]
    },
    {
      "school": "大连理工大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "B"
        },
        {
          "subject": "化学",
          "rating": "B"
        },
        {
          "subject": "生物",
          "rating": "C+"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "B-"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A-"
        }
      ]
    },
    {
      "school": "哈尔滨工业大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "A-"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "C+"
        },
        {
          "subject": "生物",
          "rating": "C"
        },
        {
          "subject": "中国语言文学",
          "rating": "未上榜"
        },
        {
          "subject": "历史类",
          "rating": "未上榜"
        },
        {
          "subject": "哲学",
          "rating": "未上榜"
        },
        {
          "subject": "基础医学",
          "rating": "未上榜"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "A"
        }
      ]
    },
    {
      "school": "兰州大学",
      "ratings": [
        {
          "subject": "数学",
          "rating": "B+"
        },
        {
          "subject": "物理",
          "rating": "B+"
        },
        {
          "subject": "化学",
          "rating": "B+"
        },
        {
          "subject": "生物",
          "rating": "B+"
        },
        {
          "subject": "中国语言文学",
          "rating": "B-"
        },
        {
          "subject": "历史类",
          "rating": "B"
        },
        {
          "subject": "哲学",
          "rating": "C+"
        },
        {
          "subject": "基础医学",
          "rating": "B"
        },
        {
          "subject": "力学类(工程力学)",
          "rating": "B"
        }
      ]
    }
  ]
} as const satisfies {
  sourceFile: string;
  sourceNote: string;
  stats: {
    schoolCount: number;
    majorRowCount: number;
    timingCounts: Record<string, number>;
    disciplineSchoolCount: number;
  };
  schools: readonly QiangjiShanghaiSchool[];
  disciplineRatings: readonly QiangjiDisciplineRating[];
};
