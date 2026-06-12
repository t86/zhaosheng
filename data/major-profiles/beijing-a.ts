import type { SchoolMajorProfile } from "@/data/school-major-profiles";

export const beijing_aProfiles: Partial<Record<string, SchoolMajorProfile>> = {
  "renmin-university-of-china": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "以人文社科为绝对主干，法学、理论经济学、应用经济学、新闻传播、马克思主义理论、社会学、统计学等长期处于全国第一梯队，依据教育部双一流建设学科名单和学校本科招生专业介绍整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "中国人民大学本科招生网（阳光招生信息平台）",
        url: "https://rdzs.ruc.edu.cn/",
        note: "学校官方本科招生网，用于核对专业设置与培养项目，已确认可访问。",
      },
      {
        label: "中国人民大学双一流建设学科（教育部公布名单）",
        url: "https://www.ruc.edu.cn/",
        note: "学校官网首页，可查双一流建设学科与学科评估口径，作为王牌专业判断依据。",
      },
    ],
    majors: [
      {
        name: "法学",
        cluster: "法学与政治",
        tags: ["法学", "双一流", "人大招牌"],
      },
      {
        name: "经济学",
        cluster: "经济与金融",
        tags: ["理论经济学", "双一流", "传统强项"],
      },
      {
        name: "金融学",
        cluster: "经济与金融",
        tags: ["应用经济学", "金融", "热门方向"],
      },
      {
        name: "工商管理",
        cluster: "管理与商科",
        tags: ["管理", "商学院", "就业导向"],
      },
      {
        name: "新闻学",
        cluster: "新闻与传播",
        tags: ["新闻传播", "双一流", "人大优势"],
      },
      {
        name: "统计学",
        cluster: "数理与统计",
        tags: ["统计学", "双一流", "量化方向"],
      },
      {
        name: "社会学",
        cluster: "人文社科",
        tags: ["社会学", "双一流", "学科评估靠前"],
      },
      {
        name: "马克思主义理论",
        cluster: "马理论与思政",
        tags: ["马理论", "双一流", "人大传统"],
      },
      {
        name: "财政学",
        cluster: "经济与金融",
        tags: ["应用经济学", "财税", "传统强项"],
      },
      {
        name: "中国共产党历史",
        cluster: "人文社科",
        tags: ["党史", "特色专业", "人大特色"],
      },
    ],
    featuredTracks: [
      {
        name: "拔尖人才培养实验班（人文与社会科学）",
        category: "实验班",
        route: "高考直招 / 校内选拔",
        tags: ["拔尖计划", "人文社科", "本博衔接", "人大特色"],
        note:
          "人大在人文社科多个方向设有国家基础学科拔尖人才培养相关实验班，培养路径与普通专业不同，建议以当年招生简章口径为准。",
        sources: [
          {
            label: "中国人民大学本科招生网",
            url: "https://rdzs.ruc.edu.cn/",
            note: "官方招生网，可核对当年拔尖实验班的具体名称、报考与培养方式。",
          },
        ],
      },
    ],
  },
  "beijing-normal-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "以教育学、心理学为标志性招牌，文、理、艺多学科均衡，地理学、中国语言文学、数学等长期处于第一梯队，依据教育部双一流建设学科名单和学校本科招生专业介绍整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "北京师范大学本科生招生网",
        url: "https://admission.bnu.edu.cn/",
        note: "学校官方本科招生网，用于核对专业设置与公费师范、特色班型，已确认可访问。",
      },
      {
        label: "北京师范大学官网（双一流建设学科）",
        url: "https://www.bnu.edu.cn/",
        note: "学校官网首页，可查双一流建设学科口径，作为王牌专业判断依据。",
      },
    ],
    majors: [
      {
        name: "教育学",
        cluster: "教育与心理",
        tags: ["教育学", "双一流", "北师大招牌"],
      },
      {
        name: "心理学",
        cluster: "教育与心理",
        tags: ["心理学", "双一流", "全国领先"],
      },
      {
        name: "汉语言文学",
        cluster: "人文学科",
        tags: ["中国语言文学", "双一流", "传统强项"],
      },
      {
        name: "地理科学",
        cluster: "地理与环境",
        tags: ["地理学", "双一流", "理科优势"],
      },
      {
        name: "数学与应用数学",
        cluster: "数理基础",
        tags: ["数学", "双一流", "基础学科"],
      },
      {
        name: "历史学",
        cluster: "人文学科",
        tags: ["历史学", "双一流", "传统强项"],
      },
      {
        name: "环境科学与工程",
        cluster: "地理与环境",
        tags: ["环境", "双一流", "理工方向"],
      },
      {
        name: "物理学",
        cluster: "数理基础",
        tags: ["物理学", "基础学科", "理科平台"],
      },
      {
        name: "生物科学",
        cluster: "生命科学",
        tags: ["生物", "基础学科", "理科方向"],
      },
    ],
    featuredTracks: [
      {
        name: "公费师范生（国家优师专项 / 公费师范）",
        category: "师范专项",
        route: "高考提前批 / 专项计划",
        tags: ["公费师范", "定向就业", "教师职业", "北师大特色"],
        note:
          "公费师范生有服务期与定向就业约定，录取批次和协议条款与普通专业差别较大，务必看清当年招生简章再填报。",
        sources: [
          {
            label: "北京师范大学本科生招生网",
            url: "https://admission.bnu.edu.cn/",
            note: "官方招生网，可核对公费师范、优师专项的当年招生范围与协议要求。",
          },
        ],
      },
      {
        name: "励耘实验班（基础学科拔尖培养）",
        category: "实验班",
        route: "高考直招 / 校内选拔",
        tags: ["励耘", "基础学科拔尖", "本研衔接", "北师大特色"],
        note:
          "励耘实验班面向数学、物理、化学、生物、地理等基础学科开展拔尖培养，培养路径独立于普通专业，建议以当年招生口径为准。",
        sources: [
          {
            label: "北京师范大学本科生招生网",
            url: "https://admission.bnu.edu.cn/",
            note: "官方招生网，可核对励耘实验班所覆盖的学科方向与选拔方式。",
          },
        ],
      },
    ],
  },
};
