export type MajorProfileSource = {
  label: string;
  url: string;
  note: string;
};

export type MajorProfileEntry = {
  name: string;
  cluster: string;
  tags: string[];
  note?: string;
};

export type FeaturedTrackEntry = {
  name: string;
  category: string;
  route: string;
  tags: string[];
  note?: string;
  sources: MajorProfileSource[];
};

export type SchoolMajorProfile = {
  scopeLabel: string;
  description: string;
  updatedAt: string;
  sources: MajorProfileSource[];
  majors: MajorProfileEntry[];
  featuredTracks?: FeaturedTrackEntry[];
};

export const schoolMajorProfiles: Partial<Record<string, SchoolMajorProfile>> = {
  "tsinghua-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "优先补工科、信息、能动、建筑和医工交叉方向，依据清华本科专业设置页与本科教学质量报告整理。",
    updatedAt: "2026-03-12",
    sources: [
      {
        label: "清华大学本科专业设置",
        url: "https://www.tsinghua.edu.cn/jyjx/bkspyjs1/bkzy.htm",
        note: "官方本科专业页面，当前档案的主要底稿来自这里。",
      },
      {
        label: "清华大学 2023-2024 学年本科教学质量报告",
        url: "https://www.tsinghua.edu.cn/__local/C/9B/FD/BA078DEA9FD003289CCF5BADF97_A846EFE9_88225.pdf",
        note: "补充学校本科专业总量与本科教育建设快照。",
      },
    ],
    majors: [
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工科核心", "科研导向"],
      },
      {
        name: "电子信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "通信", "芯片基础"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["控制", "机器人", "智能系统"],
      },
      {
        name: "能源与动力工程",
        cluster: "工程制造",
        tags: ["能动", "工程平台", "双碳相关"],
      },
      {
        name: "建筑学",
        cluster: "建筑与设计",
        tags: ["建筑", "设计", "工科+艺术"],
      },
      {
        name: "工业工程",
        cluster: "工程系统",
        tags: ["运筹", "制造系统", "工程管理"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "医工交叉", "综合平台"],
      },
      {
        name: "数学与应用数学",
        cluster: "基础学科",
        tags: ["基础理科", "理工底座", "深造导向"],
      },
    ],
    featuredTracks: [
      {
        name: "计算机科学实验班（姚班）",
        category: "荣誉班",
        route: "综合选拔",
        tags: ["计算机", "人工智能", "量子信息", "全英文核心课"],
        note:
          "2025 年官方选拔方案下，姚班统一覆盖计算机科学、人工智能和量子信息三大方向。站内不再把“智班”“量信班”误写成当前完全独立的普通本科专业。",
        sources: [
          {
            label: "清华大学 2025 年计算机科学实验班（姚班）选拔方案",
            url: "https://www.admissions.tsinghua.edu.cn/info/1033/2070.htm",
            note: "官方最新选拔方案，明确姚班继续开展综合选拔，并覆盖三大专业方向。",
          },
          {
            label: "清华学堂人才培养计划",
            url: "https://www.tsinghua.edu.cn/info/2836/92918.htm",
            note: "官方培养体系介绍，说明 2019、2021 年新增人工智能和量子信息方向。",
          },
        ],
      },
      {
        name: "丘成桐数学英才班",
        category: "英才班",
        route: "单独招生",
        tags: ["数学", "竞赛潜质", "求真书院", "强基前置"],
        note:
          "2025 招生简章明确录取至数学与应用数学专业，本科阶段原则上不得转入其他专业。",
        sources: [
          {
            label: "清华大学 2025 年“丘成桐数学英才班”招生简章",
            url: "https://www.admissions.tsinghua.edu.cn/info/1179/1971.htm",
            note: "官方招生简章，明确招生对象、录取专业和选拔流程。",
          },
        ],
      },
      {
        name: "钱学森力学班",
        category: "学堂计划实验班",
        route: "综合选拔",
        tags: ["力学", "工程科学", "基础拔尖", "交叉培养"],
        note: "属于清华学堂人才培养计划内的拔尖培养实验班，不应被误写成普通专业名称。",
        sources: [
          {
            label: "清华大学 2025 年钱学森力学班选拔方案",
            url: "https://www.admissions.tsinghua.edu.cn/info/1033/2072.htm",
            note: "官方选拔方案，说明该班面向可被清华录取学生继续开展综合选拔。",
          },
        ],
      },
    ],
  },
  "peking-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "突出基础学科、人文社科和医学平台，同时补入计算机方向，当前以学校本科教学质量报告和学校公开信息为主。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "北京大学本科教学质量报告（2022-2023 学年）",
        url: "http://www.dean.pku.edu.cn/userfiles/upload/msgshow/202401101119374887.pdf",
        note: "公开披露本科专业总量和本科教育基本面，是当前学校级官方底稿。",
      },
      {
        label: "北京大学官网",
        url: "https://www.pku.edu.cn/",
        note: "用于交叉核对学校公开的人才培养与院系平台信息。",
      },
    ],
    majors: [
      {
        name: "数学与应用数学",
        cluster: "基础学科",
        tags: ["数学", "强基", "深造导向"],
      },
      {
        name: "物理学",
        cluster: "基础学科",
        tags: ["物理", "科研导向", "理科顶尖"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "理论基础", "系统方向"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "综合平台", "附属医院资源"],
      },
      {
        name: "经济学",
        cluster: "人文社科",
        tags: ["经管", "政策与研究", "综合平台"],
      },
      {
        name: "法学",
        cluster: "人文社科",
        tags: ["法学", "公共政策", "人文社科"],
      },
      {
        name: "中国语言文学类",
        cluster: "人文社科",
        tags: ["中文", "文史", "通识底色"],
      },
      {
        name: "哲学类",
        cluster: "人文社科",
        tags: ["哲学", "理论训练", "交叉思辨"],
        note: "更偏理论和通识训练，不是典型职业导向专业。",
      },
    ],
    featuredTracks: [
      {
        name: "元培学院",
        category: "荣誉学院",
        route: "本科培养平台",
        tags: ["通识培养", "跨学科", "自主选专业", "北大特色"],
        note:
          "元培学院更接近荣誉学院式培养平台，不是单一学科班。报考时要把它和普通院系、普通专业分开看。",
        sources: [
          {
            label: "北京大学元培学院",
            url: "https://yuanpei.pku.edu.cn/",
            note: "官方学院主页，可核对元培学院的培养定位与学院背景。",
          },
        ],
      },
      {
        name: "数学英才班",
        category: "英才班",
        route: "专项选拔",
        tags: ["数学", "基础研究", "竞赛潜质", "北大数学"],
        note:
          "2026 年官方通知强调该项目面向对数学基础研究和交叉应用创新有强烈兴趣、且学有余力的高中生，不应简单等同于普通数学专业录取。",
        sources: [
          {
            label: "北京大学 2026 年数学英才班选拔通知",
            url: "https://www.gotopku.cn/tzgg/c113bfd040034d8e9c6af1030c01ab4b.htm",
            note: "官方通知，明确数学英才班的选拔定位与面向对象。",
          },
          {
            label: "北京大学招生网：数学英才班",
            url: "https://www.gotopku.cn/xkzy/xy/lxb/sxkxxy/sxkxxyrcpy/c6657d45bf2044bdb13ddf4cd3016b82.htm",
            note: "官方专业培养页，可交叉核对数学英才班的培养口径。",
          },
        ],
      },
      {
        name: "物理学科卓越人才培养计划",
        category: "卓越计划",
        route: "专项选拔",
        tags: ["物理", "基础科学", "国家需求", "交叉创新"],
        note:
          "官方通知将其定位为面向未来科学技术源头问题和国家重大战略需求的拔尖培养项目，重点不在“班名”，而在培养强度和研究导向。",
        sources: [
          {
            label: "北京大学 2026 年物理学科卓越人才培养计划招生办法",
            url: "https://www.gotopku.cn/tzgg/d0321bd523f440bdb15bdf9bca6eb3e3.htm",
            note: "官方招生办法，说明项目定位、选拔方式和培养方向。",
          },
        ],
      },
      {
        name: "图灵班",
        category: "荣誉班",
        route: "校内选拔",
        tags: ["计算机", "人工智能", "本研贯通", "北大信科"],
        note:
          "北京大学官方口径显示，图灵班自 2017 年创办，当前仍通过信息科学技术学院面向在校本科生开展实验班选拔，并已形成稳定的培养方案与本研贯通体系。",
        sources: [
          {
            label: "信息科学技术学院 2022 级图灵班招生通知",
            url: "https://eecs.pku.edu.cn/info/1010/5559.htm",
            note: "官方通知，明确图灵班面向 2022 级本科生招生，属于实验班选拔体系。",
          },
          {
            label: "2025-本科生各专业培养方案",
            url: "https://eecs.pku.edu.cn/info/1083/7183.htm",
            note: "官方培养方案页，明确列出“计算机科学与技术专业（图灵班）”和“信息与计算科学专业（图灵班）”培养方案。",
          },
          {
            label: "北京大学 2025 级图灵班开班仪式",
            url: "https://eecs.pku.edu.cn/info/1040/8453.htm",
            note: "官方新闻，说明图灵班延续至 2025 级，并介绍其培养体系与背景。",
          },
        ],
      },
    ],
  },
  "fudan-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "把基础学科、医学、人文社科和集成电路相关方向一起展示，避免只看到文理医而漏掉复旦的新工科布局。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "复旦大学 2024 本科招生专业页面",
        url: "https://ao.fudan.edu.cn/19/85/c15074a727429/page.htm",
        note: "学校本科招生页，用于核对当前招生口径下的专业方向。",
      },
      {
        label: "复旦大学：本科专业 +2，双学士学位 +24",
        url: "https://news.fudan.edu.cn/2025/0430/c31a145179/page.htm",
        note: "学校 2025 年公开新增集成电路科学与工程本科专业。",
      },
      {
        label: "复旦大学：率先开展集成电路科学与工程一级学科试点",
        url: "https://www.fudan.edu.cn/2019/1129/c24a103252/page.htm",
        note: "补充学校在集成电路和微电子方向的公开建设信息。",
      },
    ],
    majors: [
      {
        name: "微电子科学与工程",
        cluster: "信息与电子",
        tags: ["微电子", "芯片", "新工科"],
      },
      {
        name: "集成电路科学与工程",
        cluster: "信息与电子",
        tags: ["集成电路", "交叉学科", "2025 新增"],
        note: "学校 2025 年公开新增的本科专业。",
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "交叉", "综合平台"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "附属医院", "综合平台"],
      },
      {
        name: "预防医学",
        cluster: "医学与生命",
        tags: ["公共卫生", "医学", "社会治理"],
      },
      {
        name: "新闻学",
        cluster: "人文社科",
        tags: ["新闻传播", "人文社科", "复旦辨识度"],
      },
      {
        name: "经济学",
        cluster: "人文社科",
        tags: ["经管", "上海资源", "综合平台"],
      },
      {
        name: "数学与应用数学",
        cluster: "基础学科",
        tags: ["数学", "理科底座", "交叉"],
      },
    ],
    featuredTracks: [
      {
        name: "相辉计划",
        category: "卓越创新计划",
        route: "高考招生",
        tags: ["新工科", "本博融通", "交叉培养", "复旦新项目"],
        note:
          "复旦 2026 年公开将其列为四大卓越创新人才培养计划之一，强调大一打通、大二起个性化培养与本博融通。",
        sources: [
          {
            label: "复旦大学：相辉计划等四大卓越创新人才培养计划开始招生",
            url: "https://news.fudan.edu.cn/2026/0313/c4a145525/page.htm",
            note: "官方新闻，明确相辉计划等项目通过高考招生启动。",
          },
        ],
      },
      {
        name: "香农计划",
        category: "卓越创新计划",
        route: "高考招生",
        tags: ["集成电路", "芯片", "本博融通", "新工科"],
        note:
          "官方介绍把香农计划放在拔尖芯片人才培养路径中，强调课程体系和创新实践平台，不宜只按“微电子专业”理解。",
        sources: [
          {
            label: "复旦大学：今年首次通过高考招生的香农计划看什么、怎么学",
            url: "https://news.fudan.edu.cn/2026/0227/c4a145286/page.htm",
            note: "官方新闻，明确香农计划首次通过高考招生，并解释培养路径。",
          },
        ],
      },
      {
        name: "数学英才班",
        category: "英才班",
        route: "专项选拔",
        tags: ["数学", "春令营", "基础学科", "拔尖培养"],
        note:
          "当前采用的是 2026 年官方春令营招生简章口径。这类项目选拔逻辑和普通本科专业不同，不能直接按专业线理解。",
        sources: [
          {
            label: "复旦大学 2026 年数学英才班春令营招生简章",
            url: "https://ao.fudan.edu.cn/89/51/c15074a756049/page.htm",
            note: "官方招生简章，明确数学英才班的选拔活动与培养导向。",
          },
        ],
      },
      {
        name: "本科荣誉项目",
        category: "荣誉项目",
        route: "校内选拔",
        tags: ["学术拔尖", "荣誉课程", "科研训练", "复旦特色"],
        note:
          "本科荣誉项目是复旦校级荣誉培养体系，不应被误读成单一专业或单一年级招生项目。",
        sources: [
          {
            label: "复旦大学本科荣誉项目实施总则（试行）",
            url: "https://jwc.fudan.edu.cn/80/32/c24578a688178/page.htm",
            note: "官方教务文件，说明荣誉项目的总体培养规则与适用范围。",
          },
        ],
      },
    ],
  },
  "shanghai-jiao-tong-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "以上海交大的传统强工科为主线，补齐船海、电气、计算机和医学方向，强调平台完整度而不是只看单一热门专业。",
    updatedAt: "2026-03-12",
    sources: [
      {
        label: "上海交通大学本科教学页面",
        url: "https://www.sjtu.edu.cn/jgfw/bkjx/",
        note: "官方页面公开本科专业总量和多个代表专业方向。",
      },
      {
        label: "上海交通大学信息公开网",
        url: "https://gk.sjtu.edu.cn/",
        note: "用于后续继续补本科教学质量报告和就业质量报告入口。",
      },
    ],
    majors: [
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "制造", "传统强项"],
      },
      {
        name: "电子信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "通信", "信息类"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "科研平台", "产业连接"],
      },
      {
        name: "软件工程",
        cluster: "信息与计算",
        tags: ["软件", "工程实践", "信息类"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["控制", "智能系统", "工程"],
      },
      {
        name: "电气工程及其自动化",
        cluster: "电气与控制",
        tags: ["电气", "工程", "能源系统"],
      },
      {
        name: "船舶与海洋工程",
        cluster: "工程制造",
        tags: ["船海", "工程", "交大特色"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "综合平台", "附属医院资源"],
      },
      {
        name: "口腔医学",
        cluster: "医学与生命",
        tags: ["医学", "口腔", "专业平台"],
      },
      {
        name: "生物医学工程",
        cluster: "医学与工程交叉",
        tags: ["生物医学", "医工交叉", "交叉研究"],
      },
    ],
    featuredTracks: [
      {
        name: "致远学院计算机科学方向（ACM班）",
        category: "荣誉方向",
        route: "校内荣誉方向/二次选拔",
        tags: ["计算机", "算法竞赛", "科研导向", "致远学院"],
        note:
          "这不是普通本科专业名，更接近致远学院计算机科学方向中的拔尖培养项目。报考时不能把它直接等同于全国统一招生专业。",
        sources: [
          {
            label: "上海交通大学 ACM 班成立 20 周年纪念大会",
            url: "https://news.sjtu.edu.cn/jdyw/20230412/181121.html",
            note: "官方新闻明确 ACM 班创办于 2002 年，并披露了培养成果和继续深造数据。",
          },
          {
            label: "上海交通大学“ACM&APEX 校友联合会系列活动”",
            url: "https://news.sjtu.edu.cn/zhxw/20240412/196032.html",
            note: "官方新闻将 ACM 班明确表述为“致远学院计算机科学方向（ACM 班）”。",
          },
        ],
      },
      {
        name: "电子信息类（IEEE试点班）",
        category: "试点班",
        route: "上海 2025 综合评价批次直招",
        tags: ["电子信息", "国际化培养", "试点班", "上海招生口径"],
        note: "当前站点只依据上海交大 2025 年在沪官方 PDF 挂接此直招口径，不外推到其他省份。",
        sources: [
          {
            label: "上海交通大学 2025 年在上海市综合评价批次专业组及科目要求",
            url: "https://admissions.sjtu.edu.cn/uploadFile/17470564514121104/%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A62025%E5%B9%B4%E5%9C%A8%E4%B8%8A%E6%B5%B7%E5%B8%82%E7%BB%BC%E5%90%88%E8%AF%84%E4%BB%B7%E6%89%B9%E6%AC%A1%E4%B8%93%E4%B8%9A%E7%BB%84%E5%8F%8A%E7%A7%91%E7%9B%AE%E8%A6%81%E6%B1%82.pdf",
            note: "官方 PDF 中直接列出 IEEE 试点班，且给出上海批次口径下的专业组和科目要求。",
          },
        ],
      },
      {
        name: "电子信息类（计算机永强试验班）",
        category: "试验班",
        route: "上海 2025 综合评价批次直招",
        tags: ["计算机", "试验班", "电子信息类", "上海招生口径"],
        note: "当前站点只依据上海交大 2025 年在沪官方 PDF 挂接此直招口径，不外推到其他省份。",
        sources: [
          {
            label: "上海交通大学 2025 年在上海市综合评价批次专业组及科目要求",
            url: "https://admissions.sjtu.edu.cn/uploadFile/17470564514121104/%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A62025%E5%B9%B4%E5%9C%A8%E4%B8%8A%E6%B5%B7%E5%B8%82%E7%BB%BC%E5%90%88%E8%AF%84%E4%BB%B7%E6%89%B9%E6%AC%A1%E4%B8%93%E4%B8%9A%E7%BB%84%E5%8F%8A%E7%A7%91%E7%9B%AE%E8%A6%81%E6%B1%82.pdf",
            note: "官方 PDF 中直接列出计算机永强试验班，且给出上海批次口径下的专业组和科目要求。",
          },
        ],
      },
      {
        name: "人工智能（拔尖英才试点班）",
        category: "试点班",
        route: "上海 2025 综合评价批次直招",
        tags: ["人工智能", "拔尖英才", "试点班", "上海招生口径"],
        note: "当前站点只依据上海交大 2025 年在沪官方 PDF 挂接此直招口径，不外推到其他省份。",
        sources: [
          {
            label: "上海交通大学 2025 年在上海市综合评价批次专业组及科目要求",
            url: "https://admissions.sjtu.edu.cn/uploadFile/17470564514121104/%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A62025%E5%B9%B4%E5%9C%A8%E4%B8%8A%E6%B5%B7%E5%B8%82%E7%BB%BC%E5%90%88%E8%AF%84%E4%BB%B7%E6%89%B9%E6%AC%A1%E4%B8%93%E4%B8%9A%E7%BB%84%E5%8F%8A%E7%A7%91%E7%9B%AE%E8%A6%81%E6%B1%82.pdf",
            note: "官方 PDF 中直接列出人工智能拔尖英才试点班，且给出上海批次口径下的专业组和科目要求。",
          },
        ],
      },
    ],
  },
  "nanjing-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "突出基础理科、人文传统和学校 2025 本科亮点中明确点名的智能化软件、集成电路实验班方向。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "南京大学本科专业设置公开信息",
        url: "https://xxgk.nju.edu.cn/_upload/article/files/78/4c/3cd7be8545be8ce85aead12d7682/5f489537-3389-4756-acde-b0515f95f8f4.htm",
        note: "学校信息公开页面，给出本科专业总量和专业设置口径。",
      },
      {
        label: "南京大学 2025 本科亮点",
        url: "https://xgc.nju.edu.cn/88/17/c930a755735/page.htm",
        note: "官方页面重点展示了智能化软件、计算机金融和集成电路实验班等方向。",
      },
    ],
    majors: [
      {
        name: "物理学",
        cluster: "基础学科",
        tags: ["物理", "科研导向", "深造环境"],
      },
      {
        name: "化学",
        cluster: "基础学科",
        tags: ["化学", "科研导向", "基础理科"],
      },
      {
        name: "天文学",
        cluster: "基础学科",
        tags: ["天文", "理科特色", "科研导向"],
      },
      {
        name: "地质学",
        cluster: "基础学科",
        tags: ["地球科学", "基础理科", "科研"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "理工交叉", "科研平台"],
      },
      {
        name: "软件工程（智能化软件）",
        cluster: "信息与计算",
        tags: ["软件工程", "人工智能", "2025 亮点"],
        note: "学校 2025 本科亮点页明确点名的方向。",
      },
      {
        name: "电子科学与技术（集成电路实验班）",
        cluster: "信息与电子",
        tags: ["集成电路", "实验班", "新工科"],
        note: "学校 2025 本科亮点页明确点名的方向。",
      },
      {
        name: "数学与应用数学",
        cluster: "基础学科",
        tags: ["数学", "理科底座", "深造导向"],
      },
      {
        name: "汉语言文学",
        cluster: "人文社科",
        tags: ["中文", "人文传统", "文史"],
      },
    ],
    featuredTracks: [
      {
        name: "计算机金融实验班",
        category: "实验班",
        route: "高考直招",
        tags: ["计算机", "金融", "交叉培养", "本科亮点"],
        note:
          "南京大学 2025 本科亮点页明确点名的交叉实验班。它反映的是培养路径，而不只是传统意义上的单一专业。",
        sources: [
          {
            label: "南京大学 2025 本科亮点",
            url: "https://xgc.nju.edu.cn/88/17/c930a755735/page.htm",
            note: "官方页面明确展示计算机金融实验班等特色方向。",
          },
        ],
      },
      {
        name: "智能科学与技术（机器智能实验班）",
        category: "实验班",
        route: "高考直招",
        tags: ["人工智能", "机器智能", "交叉培养", "本科亮点"],
        note:
          "当前站点按南京大学 2025 本科亮点页口径列入，强调这是学校公开点名的特色实验班，而不是站内自行推断。",
        sources: [
          {
            label: "南京大学 2025 本科亮点",
            url: "https://xgc.nju.edu.cn/88/17/c930a755735/page.htm",
            note: "官方页面明确展示机器智能实验班等方向。",
          },
        ],
      },
      {
        name: "智能工程学院至诚班",
        category: "荣誉班",
        route: "学院拔尖培养",
        tags: ["人工智能", "智能工程", "新工科", "拔尖培养"],
        note:
          "官方报道将其定位为新工科拔尖创新人才培养项目。当前站点将其作为学院层特色班型展示，不把它混写成全国统一招生专业。",
        sources: [
          {
            label: "南京大学智能工程学院至诚班亮相世界人工智能大会",
            url: "https://news.nju.edu.cn/mtbd/20250628/i326906.html",
            note: "官方报道，说明至诚班的人才培养定位与亮相背景。",
          },
        ],
      },
      {
        name: "电子科学与技术（集成电路实验班）",
        category: "实验班",
        route: "高考直招",
        tags: ["集成电路", "芯片", "新工科", "本科亮点"],
        note:
          "它既有专业属性，也有实验班属性。站内保留在专业榜之外单列，是为了提醒家长不要把它看成普通版电子科学与技术。",
        sources: [
          {
            label: "南京大学 2025 本科亮点",
            url: "https://xgc.nju.edu.cn/88/17/c930a755735/page.htm",
            note: "官方页面明确点名集成电路实验班。",
          },
        ],
      },
    ],
  },
  "zhejiang-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "围绕工科、医学、农学和新工科方向整理，体现浙大“大平台 + 多学科交叉”的培养特征。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "浙江大学本科专业设置",
        url: "https://www.zju.edu.cn/2024/1113/c32861a2981472/page.htm",
        note: "官方页面公开本科专业设置和国家级一流本科专业建设点情况。",
      },
    ],
    majors: [
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "交叉培养"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["控制", "智能系统", "工程方向"],
      },
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "制造", "工科平台"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "附属医院资源", "综合平台"],
      },
      {
        name: "农学",
        cluster: "农业与生命",
        tags: ["农学", "生命科学", "浙大特色"],
      },
      {
        name: "微电子科学与工程",
        cluster: "信息与电子",
        tags: ["微电子", "芯片", "新工科"],
      },
      {
        name: "光电信息科学与工程",
        cluster: "信息与电子",
        tags: ["光电", "电子信息", "工程"],
      },
      {
        name: "建筑学",
        cluster: "建筑与设计",
        tags: ["建筑", "设计", "综合平台"],
      },
      {
        name: "能源与环境系统工程",
        cluster: "工程制造",
        tags: ["能源", "环境", "工程系统"],
      },
    ],
    featuredTracks: [
      {
        name: "工科试验班（竺可桢学院图灵班）",
        category: "试验班",
        route: "高考直招",
        tags: ["计算机", "竺可桢学院", "拔尖培养", "工科试验班"],
        note:
          "浙江大学本科招生网把图灵班直接列在招生专业页中，属于可在高考志愿阶段明确感知到的特色班型。",
        sources: [
          {
            label: "浙江大学本科招生网：工科试验班（竺可桢学院图灵班）",
            url: "https://zdzsc.zju.edu.cn/2025/0618/c27447a3048626/page.htm",
            note: "官方招生页，明确图灵班的招生口径与培养简介。",
          },
        ],
      },
      {
        name: "求是科学班",
        category: "荣誉班",
        route: "竺可桢学院特色培养",
        tags: ["基础科学", "竺可桢学院", "科研导向", "浙大特色"],
        note:
          "当前依据浙江大学本科招生答疑口径列入。它代表的是竺可桢学院体系下的强培养路径，不应被简化成普通专业名。",
        sources: [
          {
            label: "浙江大学本科招生政策在线答疑：求是科学班",
            url: "https://zdzsc.zju.edu.cn/2025/0704/c27449a3058000/page.htm",
            note: "官方招生答疑页面，明确回应求是科学班的培养与招生相关问题。",
          },
        ],
      },
    ],
  },
  "beihang-university": {
    scopeLabel: "第二批：军工 985 / 强工科学校",
    description:
      "围绕航空航天、计算机、仪器、材料和量子前沿方向整理，同时单列北航 2025 招生体系中辨识度很高的领军计划与试验班。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "北京航空航天大学 2025 年本科招生专业",
        url: "https://zs.buaa.edu.cn/__local/B/F5/F4/ECC5B3663E2569BD209A0C62F02_A71B52BE_44038.pdf",
        note: "官方招生 PDF，当前专业档案与班型档案的主要底稿。",
      },
      {
        label: "北航发布 2025 招生新政",
        url: "https://news.buaa.edu.cn/info/1006/66220.htm",
        note: "官方新闻，用于交叉核对 2025 年新增培养项目与大类培养机制。",
      },
    ],
    majors: [
      {
        name: "航空航天工程",
        cluster: "航空航天",
        tags: ["航空航天", "北航核心", "工程强校"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "系统能力", "工程导向"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["自动化", "智能控制", "工程平台"],
      },
      {
        name: "测控技术与仪器",
        cluster: "仪器与感知",
        tags: ["仪器", "测控", "量子传感相关"],
      },
      {
        name: "材料科学与工程",
        cluster: "工程制造",
        tags: ["材料", "空天材料", "工科底座"],
      },
      {
        name: "电子信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "通信", "工程平台"],
      },
      {
        name: "人工智能",
        cluster: "信息与计算",
        tags: ["人工智能", "交叉培养", "新工科"],
      },
      {
        name: "网络空间安全",
        cluster: "信息与计算",
        tags: ["网络安全", "国家需求", "信息类"],
      },
    ],
    featuredTracks: [
      {
        name: "量子科技先锋计划",
        category: "先锋计划",
        route: "高考直招（本博贯通）",
        tags: ["量子科技", "本博贯通", "多学科交叉", "北航新增"],
        note:
          "北航 2025 年新增培养项目，依托量子科技学院与大科学装置平台，面向量子传感、量子物理、量子计算与通信等方向。",
        sources: [
          {
            label: "北京航空航天大学 2025 年本科招生专业",
            url: "https://zs.buaa.edu.cn/__local/B/F5/F4/ECC5B3663E2569BD209A0C62F02_A71B52BE_44038.pdf",
            note: "官方招生 PDF，明确列出量子科技先锋计划及其培养方式。",
          },
          {
            label: "北航 2025 级量子先锋新生见面会",
            url: "https://piqs.buaa.edu.cn/info/1039/2561.htm",
            note: "官方页面，进一步说明量子先锋计划已形成独立本科培养序列。",
          },
        ],
      },
      {
        name: "工科试验班类（未来空天领军计划）",
        category: "领军计划",
        route: "高考直招",
        tags: ["空天", "未来技术学院", "超常规培养", "本博衔接"],
        note:
          "依托北航未来技术学院，强调真问题牵引和空天信融合培养，不应只按单一本科专业理解。",
        sources: [
          {
            label: "北京航空航天大学 2025 年本科招生专业",
            url: "https://zs.buaa.edu.cn/__local/B/F5/F4/ECC5B3663E2569BD209A0C62F02_A71B52BE_44038.pdf",
            note: "官方招生 PDF，明确未来空天领军计划的招生口径与培养方式。",
          },
        ],
      },
      {
        name: "工科试验班类（中外合作办学，中法航空试验班）",
        category: "试验班",
        route: "高考直招",
        tags: ["中外合作办学", "本硕贯通", "航空", "杭州校区"],
        note:
          "执行合作办学培养模式，本科阶段满足要求即可进入后续贯通培养。站内将它明确列为高考阶段可见的特色班型。",
        sources: [
          {
            label: "北京航空航天大学 2025 年本科招生专业",
            url: "https://zs.buaa.edu.cn/__local/B/F5/F4/ECC5B3663E2569BD209A0C62F02_A71B52BE_44038.pdf",
            note: "官方招生 PDF，明确中法航空试验班的联合培养与学制安排。",
          },
        ],
      },
      {
        name: "工科试验班类（中外合作办学，中法未来科技试验班）",
        category: "试验班",
        route: "高考直招",
        tags: ["中外合作办学", "未来科技", "本硕贯通", "杭州校区"],
        note:
          "和普通大类专业不同，这类项目在招生阶段就已绑定合作培养模式与后续深造路径。",
        sources: [
          {
            label: "北京航空航天大学 2025 年本科招生专业",
            url: "https://zs.buaa.edu.cn/__local/B/F5/F4/ECC5B3663E2569BD209A0C62F02_A71B52BE_44038.pdf",
            note: "官方招生 PDF，明确中法未来科技试验班的联合培养与学制安排。",
          },
        ],
      },
    ],
  },
  "university-of-science-and-technology-of-china": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "优先覆盖基础理科和信息安全、核工等科研导向专业，当前底稿主要来自中科大官方专业目录和一流本科专业建设信息。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "中国科学技术大学本科专业目录",
        url: "https://catalog.ustc.edu.cn",
        note: "学校官方本科专业目录，是当前专业清单的直接来源。",
      },
      {
        label: "中国科学技术大学首批国家级一流本科专业建设点",
        url: "https://www.ustc.edu.cn/info/1048/25424.htm",
        note: "补充学校公开列出的国家级一流本科专业建设点。",
      },
    ],
    majors: [
      {
        name: "数学与应用数学",
        cluster: "基础学科",
        tags: ["数学", "基础理科", "科研导向"],
      },
      {
        name: "物理学",
        cluster: "基础学科",
        tags: ["物理", "科研导向", "中科大特色"],
      },
      {
        name: "化学",
        cluster: "基础学科",
        tags: ["化学", "基础理科", "科研平台"],
      },
      {
        name: "天文学",
        cluster: "基础学科",
        tags: ["天文", "基础理科", "科研导向"],
      },
      {
        name: "地球物理学",
        cluster: "基础学科",
        tags: ["地球科学", "科研导向", "理科特色"],
      },
      {
        name: "统计学",
        cluster: "基础学科",
        tags: ["统计", "数理基础", "交叉应用"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "科研导向", "系统能力"],
      },
      {
        name: "信息安全",
        cluster: "信息与计算",
        tags: ["网络安全", "国家级一流本科专业", "信息类"],
      },
      {
        name: "软件工程",
        cluster: "信息与计算",
        tags: ["软件工程", "工程实践", "信息类"],
      },
      {
        name: "电子信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "信息类", "工程基础"],
      },
      {
        name: "核工程与核技术",
        cluster: "工程制造",
        tags: ["核工程", "国家级一流本科专业", "科研导向"],
      },
    ],
    featuredTracks: [
      {
        name: "少年班及创新试点班",
        category: "少年班",
        route: "专项选拔",
        tags: ["少年人才", "创新科学营", "一生一方案", "本硕博衔接"],
        note:
          "这是中科大最具辨识度的特殊招生通道之一，选拔逻辑与普通高考本科批次完全不同。",
        sources: [
          {
            label: "中国科学技术大学 2025 年少年班及创新试点班招生简章",
            url: "https://zsb.ustc.edu.cn/2024/1223/c35546a667613/page.htm",
            note: "官方招生简章，明确报名、考核与培养特色。",
          },
        ],
      },
      {
        name: "华夏计算机科技英才班",
        category: "科技英才班",
        route: "校内选拔（科技英才班）",
        tags: ["计算机", "科研导向", "科技英才班", "科教融合"],
        note:
          "当前站点按中科大教务处科技英才班选拔通知与招生活动页列入，强调其属于科教融合型拔尖培养路径。",
        sources: [
          {
            label: "关于 2024 级科技英才班选拔工作的通知",
            url: "https://www.teach.ustc.edu.cn/education/edu-elite/18163.html",
            note: "官方教务通知，明确华夏计算机科技英才班属于校内科技英才班选拔体系。",
          },
          {
            label: "中国科学技术大学华夏计算机科技英才班鲲鹏昇腾特训营成功举办",
            url: "https://zsb.ustc.edu.cn/2024/0807/c35498a651036/page.htm",
            note: "官方招生页面，补充华夏班的培养活动与实践导向。",
          },
        ],
      },
      {
        name: "严济慈物理科技英才班",
        category: "科技英才班",
        route: "校内选拔（科技英才班）",
        tags: ["物理", "中科院物理所", "科研导向", "科技英才班"],
        note:
          "这类项目更接近科研院所协同培养的物理拔尖班，不应简单等同于普通物理学专业。",
        sources: [
          {
            label: "严济慈物理科技英才班",
            url: "https://physics.ustc.edu.cn/2023/0527/c36331a603773/page.htm",
            note: "官方学院页面，介绍严济慈物理科技英才班的依托单位与培养背景。",
          },
          {
            label: "关于 2024 级科技英才班选拔工作的通知",
            url: "https://www.teach.ustc.edu.cn/education/edu-elite/18163.html",
            note: "官方教务通知，说明其处于校内科技英才班选拔体系内。",
          },
        ],
      },
      {
        name: "中法数学英才班",
        category: "科技英才班",
        route: "校内选拔（联合培养）",
        tags: ["数学", "中法联合培养", "国际化", "赴法深造"],
        note:
          "中法数学英才班的价值不只在班名，而在其明确的国际联合培养和深造出口。",
        sources: [
          {
            label: "连续四年！我校中法数学英才班学子被巴黎高师数学系录取",
            url: "https://zsb.ustc.edu.cn/_t4927/2025/0327/c35498a678384/page.htm",
            note: "官方招生页面，明确中法数学英才班的合作背景与培养成果。",
          },
          {
            label: "关于 2024 级科技英才班选拔工作的通知",
            url: "https://www.teach.ustc.edu.cn/education/edu-elite/18163.html",
            note: "官方教务通知，可交叉核对科技英才班选拔体系。",
          },
        ],
      },
    ],
  },
  "harbin-institute-of-technology": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "聚焦航天、控制、计算机、通信、材料等硬核工科方向，当前结合哈工大本科招生专业页和本科教育质量快照整理。",
    updatedAt: "2026-03-13",
    sources: [
      {
        label: "哈尔滨工业大学 2025 年本科招生专业",
        url: "https://zsb.hit.edu.cn/2024/0621/c6398a346677/page.htm",
        note: "学校本科招生专业页，给出当前招生口径下的代表专业方向。",
      },
      {
        label: "哈尔滨工业大学 2022-2023 本科教育质量报告快照",
        url: "https://today.hit.edu.cn/article/2024/01/08/110604",
        note: "补充本科专业总量和国家级一流本科专业建设点快照。",
      },
    ],
    majors: [
      {
        name: "飞行器设计与工程",
        cluster: "航空航天",
        tags: ["航天", "飞行器", "哈工大特色"],
      },
      {
        name: "飞行器制造工程",
        cluster: "航空航天",
        tags: ["航天", "制造", "工程"],
      },
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "制造", "传统强项"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["控制", "机器人", "工程方向"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工科核心", "工程训练"],
      },
      {
        name: "软件工程",
        cluster: "信息与计算",
        tags: ["软件", "工程实践", "信息类"],
      },
      {
        name: "通信工程",
        cluster: "信息与电子",
        tags: ["通信", "电子信息", "工程"],
      },
      {
        name: "人工智能",
        cluster: "信息与计算",
        tags: ["人工智能", "智能系统", "新工科"],
      },
      {
        name: "集成电路设计与集成系统",
        cluster: "信息与电子",
        tags: ["集成电路", "芯片", "电子信息"],
      },
      {
        name: "材料科学与工程",
        cluster: "工程制造",
        tags: ["材料", "工科底座", "工程平台"],
      },
    ],
    featuredTracks: [
      {
        name: "工科试验班（港大优学班）",
        category: "优学班",
        route: "高考直招",
        tags: ["人工智能", "港大联合", "高端导师", "交叉培养"],
        note:
          "官方招生页明确列出该班，并说明由哈工大与港大相关学术负责人共同参与培养，属于高考阶段可识别的特色班型。",
        sources: [
          {
            label: "哈尔滨工业大学 2025 年本科招生专业",
            url: "https://zsb.hit.edu.cn/article/read/d1204b286bff12cb83f433f67a32c8c6",
            note: "官方招生页，明确列出港大优学班的联合导师与培养背景。",
          },
        ],
      },
      {
        name: "工科试验班（未来技术拔尖班）",
        category: "拔尖班",
        route: "高考直招",
        tags: ["未来技术学院", "多专业任选", "院士领衔", "本研衔接"],
        note:
          "这类班型打通自动化、人工智能、计算机、通信、航天等多个方向，和普通单一专业招生的理解方式不同。",
        sources: [
          {
            label: "哈尔滨工业大学 2025 年本科招生专业",
            url: "https://zsb.hit.edu.cn/article/read/d1204b286bff12cb83f433f67a32c8c6",
            note: "官方招生页，明确列出未来技术拔尖班可覆盖的专业范围与培养主体。",
          },
        ],
      },
      {
        name: "工科试验班（院士特色班）",
        category: "特色班",
        route: "高考直招",
        tags: ["永坦班", "善义班", "小卫星班", "智能机器人班"],
        note:
          "哈工大官方本科招生页把永坦班、善义班、小卫星班、智能机器人班、人工智能班等归入院士特色班序列，辨识度很高。",
        sources: [
          {
            label: "哈尔滨工业大学 2024 年本科招生专业",
            url: "https://zsb.hit.edu.cn/article/read/5861124ef60015083057a4ccfa420d98",
            note: "官方招生页，明确列出院士特色班包含的代表班型。",
          },
        ],
      },
    ],
  },
  "xian-jiaotong-university": {
    scopeLabel: "第一批：C9 + 华五并集",
    description:
      "以电气、能动、机械为主干，补齐微电子、人工智能和医学方向，当前依据西交本科招生专业页和一流本科专业建设信息整理。",
    updatedAt: "2026-03-06",
    sources: [
      {
        label: "西安交通大学 2025 年招生专业",
        url: "https://zs.xjtu.edu.cn/info/1218/8558.htm",
        note: "学校本科招生页，当前专业档案的主要来源。",
      },
      {
        label: "西安交通大学国家级一流本科专业建设点",
        url: "https://news.xjtu.edu.cn/info/1219/194517.htm",
        note: "补充学校公开披露的一流本科专业建设点信息。",
      },
    ],
    majors: [
      {
        name: "电气工程及其自动化",
        cluster: "电气与控制",
        tags: ["电气", "传统强项", "工程平台"],
      },
      {
        name: "自动化",
        cluster: "控制与智能系统",
        tags: ["控制", "智能系统", "工程方向"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "科研导向"],
      },
      {
        name: "人工智能",
        cluster: "信息与计算",
        tags: ["人工智能", "新工科", "智能系统"],
      },
      {
        name: "信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "通信", "信息类"],
      },
      {
        name: "微电子科学与工程",
        cluster: "信息与电子",
        tags: ["微电子", "芯片", "新工科"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "侯宗濂班", "综合平台"],
        note: "学校招生页公开列有临床医学相关培养班型。",
      },
      {
        name: "能源与动力工程",
        cluster: "工程制造",
        tags: ["能动", "传统强项", "工程系统"],
      },
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "制造", "工程平台"],
      },
      {
        name: "工商管理",
        cluster: "管理与经贸",
        tags: ["管理", "经管", "交大传统优势"],
      },
    ],
  },
};
