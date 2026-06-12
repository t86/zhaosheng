import type { SchoolMajorProfile } from "@/data/school-major-profiles";

export const shanghaiProfiles: Partial<Record<string, SchoolMajorProfile>> = {
  "tongji-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "同济以土木、建筑、城乡规划、环境、测绘等大土建与人居环境学科为主干，并向车辆、海洋、设计和医学方向延展，依据第二轮“双一流”建设学科名单和学校本科招生网专业介绍整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "同济大学本科招生网",
        url: "https://bkzs.tongji.edu.cn/",
        note: "学校本科招生官网，可核对各专业组与专业介绍，是本档案专业信息的主要来源。",
      },
      {
        label: "同济大学8个学科入选第二轮“双一流”建设学科",
        url: "https://www.tongji.edu.cn/jdybzn/info/1045/2572.htm",
        note: "学校官方页面，披露生物学、建筑学、土木工程等8个第二轮“双一流”建设学科。",
      },
    ],
    majors: [
      {
        name: "土木工程",
        cluster: "土木与建筑",
        tags: ["土木", "双一流", "同济招牌"],
        note: "同济最具代表性的传统强势学科，第二轮“双一流”建设学科。",
      },
      {
        name: "建筑学",
        cluster: "土木与建筑",
        tags: ["建筑", "双一流", "设计导向"],
      },
      {
        name: "城乡规划",
        cluster: "人居与规划",
        tags: ["城乡规划", "双一流", "人居环境"],
      },
      {
        name: "风景园林",
        cluster: "人居与规划",
        tags: ["风景园林", "双一流", "景观设计"],
      },
      {
        name: "环境科学与工程",
        cluster: "环境与生态",
        tags: ["环境", "双一流", "工程平台"],
      },
      {
        name: "测绘工程",
        cluster: "测绘与地理信息",
        tags: ["测绘", "双一流", "空间信息"],
      },
      {
        name: "车辆工程",
        cluster: "机械与汽车",
        tags: ["车辆", "汽车", "同济传统优势"],
        note: "同济汽车方向口碑突出，是国家级一流本科专业建设点。",
      },
      {
        name: "设计学类",
        cluster: "艺术与设计",
        tags: ["设计学", "双一流", "交叉培养"],
      },
      {
        name: "临床医学",
        cluster: "医学与生命",
        tags: ["医学", "综合平台", "长学制"],
      },
      {
        name: "海洋科学",
        cluster: "海洋与地学",
        tags: ["海洋", "理科平台", "科研导向"],
      },
    ],
    featuredTracks: [
      {
        name: "国豪书院",
        category: "书院",
        route: "新生进校选拔",
        tags: ["拔尖创新", "本研贯通", "交叉培养", "同济荣誉书院"],
        note:
          "国豪书院是同济面向拔尖创新人才的荣誉培养平台，通常面向新生进校后选拔，不宜简单按普通高考专业线理解，请以当年招生方案为准。",
        sources: [
          {
            label: "同济大学本科招生网",
            url: "https://bkzs.tongji.edu.cn/",
            note: "学校本科招生官网，可核对国豪书院等特色培养项目的当年招生口径。",
          },
        ],
      },
      {
        name: "工科试验班（土木与环境类）",
        category: "试验班",
        route: "高考大类招生",
        tags: ["大类培养", "土木环境", "国家级一流专业", "宽口径"],
        note:
          "土木与环境类工科试验班按大类招生、入校后分流，覆盖多个国家级一流本科专业，适合对大土建与环境方向感兴趣的考生。",
        sources: [
          {
            label: "欢迎报考同济大学工科试验班（土木与环境类）",
            url: "https://bkzs.tongji.edu.cn/examination/personnelDetail?id=62b29ef7c0943d14a35a7336",
            note: "学校本科招生网官方介绍页，说明该试验班覆盖的专业与培养方向。",
          },
        ],
      },
    ],
  },
  "east-china-normal-university": {
    scopeLabel: "第二批：985 全量补齐",
    description:
      "华东师大以教育学、生态学、统计学等第二轮“双一流”建设学科为主干，文理基础学科扎实，并向地理、心理、软件工程和金融等方向延展，依据“双一流”建设学科名单与学校本科招生网专业介绍整理。",
    updatedAt: "2026-06-13",
    sources: [
      {
        label: "华东师范大学本科招生网",
        url: "https://zsb.ecnu.edu.cn/",
        note: "学校本科招生官网，可核对各专业组与专业介绍，是本档案专业信息的主要来源。",
      },
      {
        label: "华东师范大学“双一流”建设专栏",
        url: "https://fzghb.ecnu.edu.cn/37071/list.htm",
        note: "学校发展规划部官方专栏，可核对教育学、生态学、统计学等“双一流”建设学科信息。",
      },
    ],
    majors: [
      {
        name: "教育学类",
        cluster: "教育与师范",
        tags: ["教育学", "双一流", "华东师大招牌"],
        note: "华东师大最具代表性的传统强势学科，第二轮“双一流”建设学科。",
      },
      {
        name: "统计学",
        cluster: "数理基础",
        tags: ["统计学", "双一流", "理科平台"],
      },
      {
        name: "生态学",
        cluster: "环境与生态",
        tags: ["生态学", "双一流", "科研导向"],
      },
      {
        name: "地理科学类",
        cluster: "地理与环境",
        tags: ["地理", "国家重点学科", "理科平台"],
        note: "地理学是学校长期建设的国家重点学科方向。",
      },
      {
        name: "心理学",
        cluster: "心理与脑科学",
        tags: ["心理学", "交叉培养", "特色学科"],
      },
      {
        name: "软件工程",
        cluster: "信息与计算",
        tags: ["软件工程", "国家级一流专业", "新工科"],
      },
      {
        name: "汉语言文学",
        cluster: "人文学科",
        tags: ["中文", "人文底蕴", "师范传统"],
      },
      {
        name: "数学与应用数学",
        cluster: "数理基础",
        tags: ["数学", "基础学科", "科研导向"],
      },
      {
        name: "金融学",
        cluster: "经济与管理",
        tags: ["金融", "经管方向", "应用导向"],
      },
    ],
    featuredTracks: [
      {
        name: "孟宪承书院",
        category: "书院",
        route: "公费师范生培养",
        tags: ["公费师范", "教师教育", "育人平台", "华东师大特色书院"],
        note:
          "孟宪承书院以公费（国家优师等）师范生培养为特色，培养与就业有专门约定，报考前请仔细阅读当年师范生招生与履约政策。",
        sources: [
          {
            label: "华东师范大学本科招生网",
            url: "https://zsb.ecnu.edu.cn/",
            note: "学校本科招生官网，可核对孟宪承书院与公费师范生培养的当年招生口径。",
          },
        ],
      },
    ],
  },
};
