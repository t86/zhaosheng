import type { SchoolMajorProfile } from "@/data/school-major-profiles";

export const huazhong_huananProfiles: Partial<Record<string, SchoolMajorProfile>> = {
  "central-south-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "中南大学专业盘子以材料、矿冶、轨道交通和医学为主干，依据教育部“双一流”建设学科名单和学校招生公开的国家级一流本科专业建设点整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "中南大学招生在线",
        url: "https://zhaosheng.csu.edu.cn/",
        note: "学校本科招生官网，可核对招生专业、章程与分省计划。",
      },
      {
        label: "中南大学2026年全日制普通本科招生章程",
        url: "https://zhaosheng.csu.edu.cn/info/1218/2622.htm",
        note: "官方招生章程，说明专业设置与录取规则口径。",
      },
    ],
    majors: [
      {
        name: "材料科学与工程",
        cluster: "材料与冶金",
        tags: ["材料", "双一流学科", "传统强项"],
      },
      {
        name: "冶金工程",
        cluster: "材料与冶金",
        tags: ["冶金", "矿冶传统", "工程平台"],
      },
      {
        name: "矿物加工工程",
        cluster: "地矿与资源",
        tags: ["矿业", "资源加工", "行业特色"],
      },
      {
        name: "交通运输",
        cluster: "轨道交通",
        tags: ["轨道交通", "行业强项", "工程方向"],
      },
      {
        name: "车辆工程",
        cluster: "轨道交通",
        tags: ["轨道装备", "机车车辆", "工程平台"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "湘雅传统", "长学制"],
        note: "依托湘雅医学院培养，是学校辨识度很高的医学方向。",
      },
      {
        name: "护理学",
        cluster: "医学与生命",
        tags: ["护理", "湘雅传统", "医学相关"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "热门方向"],
      },
      {
        name: "土木工程",
        cluster: "工程建造",
        tags: ["土木", "工程平台", "传统强项"],
      },
    ],
    featuredTracks: [
      {
        name: "湘雅医学院（医学长学制方向）",
        category: "医学拔尖培养",
        route: "高考直招相关培养方向",
        tags: ["湘雅", "长学制", "医学拔尖", "学校招牌"],
        note:
          "湘雅医学是中南大学最具标识度的培养方向之一，包含临床医学等长学制项目，建议结合学校当年招生专业目录核对具体班型与选科口径。",
        sources: [
          {
            label: "中南大学招生在线",
            url: "https://zhaosheng.csu.edu.cn/",
            note: "本科招生官网，可核对湘雅相关专业的招生方向。",
          },
        ],
      },
    ],
  },
  "hunan-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "湖南大学以机械、车辆、化工和土木为主干，兼具岳麓书院人文底蕴，依据教育部“双一流”建设学科名单与学校招生公开的一流本科专业建设点整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "湖南大学本科招生网",
        url: "https://admi.hnu.edu.cn/",
        note: "学校本科招生官网，可核对招生专业与分省计划。",
      },
      {
        label: "湖南大学招生计划与历年分数查询",
        url: "https://admi2.hnu.edu.cn/lnzsjh",
        note: "官方分省分专业招生计划查询入口。",
      },
    ],
    majors: [
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "传统强项", "工程平台"],
      },
      {
        name: "车辆工程",
        cluster: "工程制造",
        tags: ["车辆", "汽车方向", "工程平台"],
      },
      {
        name: "化学工程与工艺",
        cluster: "化学与化工",
        tags: ["化工", "双一流相关", "工程方向"],
      },
      {
        name: "土木工程",
        cluster: "工程建造",
        tags: ["土木", "传统强项", "工程平台"],
      },
      {
        name: "电气工程及其自动化",
        cluster: "电气与控制",
        tags: ["电气", "工程平台", "热门方向"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "热门方向"],
      },
      {
        name: "工商管理",
        cluster: "管理与经贸",
        tags: ["管理", "双一流相关", "经管方向"],
      },
      {
        name: "新闻传播学类",
        cluster: "人文与传播",
        tags: ["新闻传播", "文科特色", "学校优势"],
      },
    ],
    featuredTracks: [
      {
        name: "岳麓书院（历史学等人文方向）",
        category: "书院制人文培养",
        route: "高考直招相关培养方向",
        tags: ["岳麓书院", "人文底蕴", "书院制", "学校招牌"],
        note:
          "岳麓书院是湖南大学最具历史辨识度的培养单位，承担历史学等人文学科培养，具体招生专业与是否单列以学校当年招生目录为准。",
        sources: [
          {
            label: "湖南大学本科招生网",
            url: "https://admi.hnu.edu.cn/",
            note: "本科招生官网，可核对岳麓书院相关专业招生方向。",
          },
        ],
      },
    ],
  },
  "national-university-of-defense-technology": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "国防科技大学是军队序列重点高校，以信息、计算机、系统科学和航空宇航为主干，依据教育部“双一流”建设学科名单与公开学科信息整理；招生主要走军校提前批，须符合政治考核、军检等要求。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "国防科技大学官网",
        url: "https://www.nudt.edu.cn/",
        note: "学校官网，可核对学科与培养方向；招生以军队当年统一政策为准。",
      },
    ],
    majors: [
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "双一流学科", "A+学科"],
      },
      {
        name: "软件工程",
        cluster: "信息与计算",
        tags: ["软件", "双一流学科", "A+学科"],
      },
      {
        name: "信息与通信工程类",
        cluster: "信息与电子",
        tags: ["通信", "双一流学科", "传统强项"],
      },
      {
        name: "电子科学与技术",
        cluster: "信息与电子",
        tags: ["电子", "工程平台", "军工方向"],
      },
      {
        name: "系统科学相关方向",
        cluster: "系统与管理",
        tags: ["系统科学", "A+学科", "学校招牌"],
      },
      {
        name: "管理科学与工程相关方向",
        cluster: "系统与管理",
        tags: ["管理科学", "双一流学科", "A+学科"],
      },
      {
        name: "航空宇航科学与技术相关方向",
        cluster: "航空航天",
        tags: ["航空宇航", "双一流学科", "军工方向"],
      },
      {
        name: "光电信息科学与工程",
        cluster: "信息与电子",
        tags: ["光电", "工程平台", "军工方向"],
      },
    ],
  },
  "sun-yat-sen-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "中山大学是综合性研究型大学，文理医工管多线并强，依据教育部“双一流”建设学科名单（含临床医学、基础医学、化学、生态学、工商管理等11个学科）与学校招生公开信息整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "中山大学本科招生网",
        url: "https://admission.sysu.edu.cn/",
        note: "学校本科招生官网，可核对招生专业、章程与分省计划。",
      },
    ],
    majors: [
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "双一流学科", "长学制"],
        note: "依托中山医学院培养，是学校最具标识度的方向之一。",
      },
      {
        name: "基础医学",
        cluster: "医学与生命",
        tags: ["基础医学", "双一流学科", "科研导向"],
      },
      {
        name: "化学",
        cluster: "理学基础",
        tags: ["化学", "双一流学科", "基础学科"],
      },
      {
        name: "生态学",
        cluster: "理学基础",
        tags: ["生态学", "双一流学科", "学校优势"],
      },
      {
        name: "数学与应用数学",
        cluster: "理学基础",
        tags: ["数学", "双一流学科", "基础学科"],
      },
      {
        name: "工商管理",
        cluster: "管理与经贸",
        tags: ["管理", "双一流学科", "岭南底蕴"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "热门方向"],
      },
      {
        name: "电子科学与技术",
        cluster: "信息与电子",
        tags: ["电子", "双一流学科", "工程方向"],
      },
      {
        name: "材料科学与工程",
        cluster: "材料与化工",
        tags: ["材料", "双一流学科", "工程方向"],
      },
    ],
  },
  "south-china-university-of-technology": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "华南理工大学是以工见长、理工管结合的研究型大学，主干在轻工、材料、化工、建筑和新工科方向，依据教育部“双一流”建设学科名单与学校招生公开信息整理；在沪设有“631”综合评价招生入口。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "华南理工大学本科招生网",
        url: "https://admission.scut.edu.cn/",
        note: "学校本科招生官网，可核对招生专业、章程与分省计划。",
      },
      {
        label: "华南理工大学2026年上海市综合评价招生简章",
        url: "https://xxgk.scut.edu.cn/2026/0403/c132a48728/page.htm",
        note: "官方简章，说明在沪综合评价招生专业与计划口径。",
      },
    ],
    majors: [
      {
        name: "轻化工程",
        cluster: "轻工与化工",
        tags: ["轻工", "双一流相关", "行业招牌"],
      },
      {
        name: "材料科学与工程",
        cluster: "材料与化工",
        tags: ["材料", "双一流学科", "传统强项"],
      },
      {
        name: "化学工程与工艺",
        cluster: "轻工与化工",
        tags: ["化工", "工程平台", "传统强项"],
      },
      {
        name: "建筑学",
        cluster: "建筑与土木",
        tags: ["建筑", "学校优势", "老八校之一"],
      },
      {
        name: "食品科学与工程",
        cluster: "轻工与食品",
        tags: ["食品", "学校优势", "工程方向"],
      },
      {
        name: "电子信息工程",
        cluster: "信息与电子",
        tags: ["电子信息", "工程平台", "热门方向"],
      },
      {
        name: "计算机科学与技术",
        cluster: "信息与计算",
        tags: ["计算机", "工程平台", "热门方向"],
      },
      {
        name: "人工智能",
        cluster: "信息与计算",
        tags: ["人工智能", "新工科", "国际校区方向"],
      },
      {
        name: "机械工程",
        cluster: "工程制造",
        tags: ["机械", "工程平台", "传统强项"],
      },
    ],
    featuredTracks: [
      {
        name: "广州国际校区（前沿新工科方向）",
        category: "新工科试点",
        route: "高考直招 + 综合评价",
        tags: ["国际校区", "新工科", "在地国际化", "在沪综评入口"],
        note:
          "广州国际校区聚焦机器人工程、智能制造、微电子、人工智能等前沿新工科方向，也是华工在上海开展“631”综合评价招生的主要专业承载校区；具体专业与计划以学校当年简章为准。",
        sources: [
          {
            label: "华南理工大学2026年上海市综合评价招生简章",
            url: "https://xxgk.scut.edu.cn/2026/0403/c132a48728/page.htm",
            note: "官方简章，列明国际校区前沿新工科专业与在沪综评招生口径。",
          },
        ],
      },
    ],
  },
};
