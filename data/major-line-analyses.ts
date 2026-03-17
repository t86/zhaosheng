import type { MajorProfileEntry, MajorProfileSource } from "@/data/school-major-profiles";

export type MajorLineKey =
  | "computer"
  | "clinical-medicine"
  | "integrated-circuit"
  | "economics"
  | "aerospace";

type ComparisonSchool = {
  schoolSlug: string;
  reason: string;
  tier: 1 | 2 | 3;
};

type MajorLineSchoolAnalysis = {
  tier: 1 | 2 | 3;
  nationalPosition: string;
  strengthSummary: string;
  whyStrong: string[];
  graduateOutcomeSummary: string;
  graduateOutcomeHighlights: string[];
  note: string;
  sources: MajorProfileSource[];
};

type MajorLineDefinition = {
  label: string;
  intro: string;
  comparisonBasis: string;
  replacementRule: string;
  comparisonPool: ComparisonSchool[];
  schools: Partial<Record<string, MajorLineSchoolAnalysis>>;
};

export type ResolvedMajorLineAnalysis = {
  key: MajorLineKey;
  label: string;
  intro: string;
  comparisonBasis: string;
  replacementRule: string;
  matchedMajors: string[];
  analysis: MajorLineSchoolAnalysis;
  comparison: {
    higherTargets: ComparisonSchool[];
    peerSchools: ComparisonSchool[];
    alternativeSchools: ComparisonSchool[];
  };
};

const MAX_COMPARE_ITEMS = 3;

function source(
  label: string,
  url: string,
  note: string,
  sourceType: MajorProfileSource["sourceType"] = "official",
): MajorProfileSource {
  return {
    label,
    url,
    note,
    sourceType,
  };
}

const moeDoubleFirstClassSource = source(
  "教育部 · 第二轮“双一流”建设高校及建设学科名单",
  "https://www.moe.gov.cn/srcsite/a22/s7065/202202/w020220214318455516037.pdf",
  "用于校对学校层和学科层建设信号。这里的“全国位置”仍是站内解释，不是教育部官方专业排名。",
);

const tsinghuaMajorSource = source(
  "清华大学本科专业设置",
  "https://www.tsinghua.edu.cn/jyjx/bkspyjs1/bkzy.htm",
  "清华本科专业官方页面，可核对计科、临床等本科方向。",
);
const tsinghuaYaoClassSource = source(
  "清华大学交叉信息研究院：姚班培养",
  "https://iiis.tsinghua.edu.cn/ybbks/ybpy.htm",
  "官方页面披露截至 2025 年 12 月的累计培养规模、已毕业人数和整体毕业去向。",
);
const pkuQualitySource = source(
  "北京大学本科教学质量报告（2022-2023 学年）",
  "http://www.dean.pku.edu.cn/userfiles/upload/msgshow/202401101119374887.pdf",
  "北京大学学校层官方质量报告。",
);
const pkuTuringSource = source(
  "北京大学 2024 届图灵班毕业典礼顺利举行",
  "https://eecs.pku.edu.cn/info/1040/8182.htm",
  "北京大学信息科学技术学院官方新闻，明确提到图灵班本科毕业后的主要路径类型。",
  "official_story",
);
const fudanComputerSource = source(
  "复旦大学计算机科学拔尖人才试验班简介",
  "https://ao.fudan.edu.cn/19/6f/c15074a727407/page.htm",
  "官方本科招生页，直接把该班本科后的目标写到复旦或世界一流大学读博士。",
);
const fudanIcSource = source(
  "复旦大学：率先开展集成电路科学与工程一级学科试点",
  "https://www.fudan.edu.cn/2019/1129/c24a103252/page.htm",
  "复旦官方页面，用于校对学校在集成电路方向的建设深度。",
);
const fudanMedSource = source(
  "连续七年第一！复旦上医人才培养“顶配模式”大揭秘",
  "https://shmc.fudan.edu.cn/news/2025/0516/c1892a145493/page.htm",
  "复旦上医官方页面，补充临床医学的人才培养辨识度。",
);
const fudanEconSource = source(
  "复旦大学“经济学拔尖学生培养基地”成功入选教育部基础学科拔尖学生培养计划2.0基地",
  "https://econ.fudan.edu.cn/info/1024/18525.htm",
  "复旦经济学院官方页面，说明数理经济和研究型人才培养定位。",
);
const sjtuTeachingSource = source(
  "上海交通大学本科教学页面",
  "https://www.sjtu.edu.cn/jgfw/bkjx/",
  "上海交大官方本科教学页面。",
);
const sjtuAcmSource = source(
  "上海交通大学 ACM 班成立 20 周年纪念大会及学术论坛举办",
  "https://news.sjtu.edu.cn/jdyw/20230412/181121.html",
  "上海交大官方新闻，披露 ACM 班累计毕业人数、继续深造比例和直博比例。",
  "official_story",
);
const zjuMajorSource = source(
  "浙江大学本科专业设置",
  "https://www.zju.edu.cn/2024/1113/c32861a2981472/page.htm",
  "浙江大学本科专业官方页面。",
);
const zjuTuringSource = source(
  "浙江大学本科招生网：被人工智能浪潮拍在沙滩上，是每个人的宿命吗？",
  "https://zdzsc.zju.edu.cn/2024/0906/c28957a2961612/page.htm",
  "浙大本科招生官方问答，直接给出图灵班毕业出口画像。",
);
const njuHighlightsSource = source(
  "南京大学 2025 本科亮点",
  "https://xgc.nju.edu.cn/88/17/c930a755735/page.htm",
  "南京大学官方页面，点名智能化软件、集成电路实验班等本科亮点。",
);
const njuClinicalSource = source(
  "南京大学：面向全体本科新生搭建“人工智能通识核心课程体系”",
  "https://news.nju.edu.cn/mtbd/20250624/i326686.html",
  "南京大学官方转载媒体稿，直接点名临床医学本博贯通班并给出出口画像。",
  "official_story",
);
const njuZhichengSource = source(
  "南京大学：组建新工科“至诚班”",
  "https://news.nju.edu.cn/mtbd/20250609/i325835.html",
  "南京大学官方转载媒体稿，补充新工科至诚班和本研衔接路径。",
  "official_story",
);
const ustcCatalogSource = source(
  "中国科学技术大学本科专业目录",
  "https://catalog.ustc.edu.cn",
  "中科大官方本科专业目录。",
);
const ustcEliteSource = source(
  "关于 2024 级科技英才班选拔工作的通知",
  "https://www.teach.ustc.edu.cn/education/edu-elite/18163.html",
  "中科大教务处官方通知，明确华夏计算机科技英才班处于校内科技英才班体系。",
);
const hitDoubleFirstClassSource = source(
  "双一流建设学科",
  "https://www.hit.edu.cn/577/list.htm",
  "哈工大官方页面，用于校对学校在航天、计算机等方向的建设信号。",
);
const hitAiLeaderSource = source(
  "哈工大成立人工智能学院 发布“AI+先进技术领军班”",
  "https://today.hit.edu.cn/article/2025/05/20/126318",
  "哈工大官方新闻，说明 AI+ 先进技术领军班的本硕博贯通定位。",
);
const hitTalentSource = source(
  "非凡十年：走好新时代杰出人才自主培养之路",
  "https://today.hit.edu.cn/article/2022/05/31/102877",
  "哈工大官方专题，解释院士特色班与服务国家战略单位的出口。",
  "official_story",
);
const hitShanyiSource = source(
  "哈工大首届善义班本科毕业 院士班主任与学子面对面交流",
  "https://today.hit.edu.cn/article/2025/06/13/127207",
  "哈工大官方新闻，披露首届善义班本科毕业人数和航天单位实践场景。",
  "official_story",
);
const xjtuMajorSource = source(
  "西安交通大学 2025 年招生专业",
  "https://zs.xjtu.edu.cn/info/1218/8558.htm",
  "西交本科招生官方页面。",
);
const xjtuFirstClassSource = source(
  "西安交通大学国家级一流本科专业建设点",
  "https://news.xjtu.edu.cn/info/1219/194517.htm",
  "西交官方页面，用于校对计算机、微电子、临床等方向的一流本科专业建设信号。",
);
const xjtuEmploymentSource = source(
  "《西安交通大学 2023 年毕业生就业质量报告》发布",
  "https://news.xjtu.edu.cn/info/1219/205622.htm",
  "西交官方就业质量报告新闻，可补学校层总体去向快照。",
);

const majorLineDefinitions: Record<MajorLineKey, MajorLineDefinition> = {
  computer: {
    label: "计算机",
    intro:
      "站内把计算机科学、软件工程和信息安全这类出口高度重叠的方向放进同一条专业线里比较，重点看课程强度、荣誉班、科研平台和城市产业连接。",
    comparisonBasis:
      "先看有没有姚班、图灵班、ACM 班、科技英才班这类高强度培养，再看本科出口是直博/读研优先，还是更偏头部科技企业研发。",
    replacementRule:
      "“分数不够替代”默认只在站内 985 池里做静态推荐。真正报志愿时，还要叠加你所在省份的位次、选科和城市偏好。",
    comparisonPool: [
      { schoolSlug: "tsinghua-university", tier: 1, reason: "更看顶级学术训练、姚班和 AI/量子交叉平台。" },
      { schoolSlug: "peking-university", tier: 1, reason: "更看理论计算、图灵班和基础学科底子。" },
      { schoolSlug: "shanghai-jiao-tong-university", tier: 1, reason: "更看工程平台、ACM 班和上海产业密度。" },
      { schoolSlug: "zhejiang-university", tier: 1, reason: "更看大平台、图灵班和杭州 AI 产业场景。" },
      { schoolSlug: "fudan-university", tier: 2, reason: "更适合想要上海资源，同时保留计算机与 AI 交叉训练。" },
      { schoolSlug: "nanjing-university", tier: 2, reason: "更看智能化软件、至诚班和研究型软件路线。" },
      { schoolSlug: "university-of-science-and-technology-of-china", tier: 2, reason: "更偏科研导向、深造氛围和科教融合。" },
      { schoolSlug: "harbin-institute-of-technology", tier: 2, reason: "更看航天国防场景、AI+ 工程方向和硬核工科底座。" },
      { schoolSlug: "xian-jiaotong-university", tier: 3, reason: "如果位次略低但还想保留 985 工科平台，这是更稳的计算机/AI 路线。" },
      { schoolSlug: "huazhong-university-of-science-and-technology", tier: 3, reason: "更适合想要强工科平台和更强的城市产业承接。" },
      { schoolSlug: "southeast-university", tier: 3, reason: "更适合把软件、计算机和电子信息一起打包比较。" },
    ],
    schools: {
      "tsinghua-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "清华的计算机线不是单一专业强，而是计科本体、姚班、人工智能和量子信息一起构成了顶级训练环境。",
        whyStrong: [
          "本科专业本身就在校内工科核心序列里，交叉信息研究院又把最强的一批学生导入更高强度培养。",
          "姚班官方页面已经明确形成计算机、人工智能、量子信息三方向的连续培养，学术训练密度很高。",
          "北京的科研平台、头部实验室和科技企业资源，让清华计算机本科出口天然兼顾学界和产业界。",
        ],
        graduateOutcomeSummary:
          "本科出口以继续深造为主，同时稳步流向高校科研岗位、高新技术企业和创业方向。",
        graduateOutcomeHighlights: [
          "姚班官方口径显示，已毕业学生近 750 名，绝大多数继续学术深造。",
          "公开统计还写到，校友职业分布横跨学术界与高新企业，且超过半数在国内发展。",
          "如果你报的是清华普通计科，也不能忽略姚班这条更强的校内上升通道。",
        ],
        note:
          "这条卡片把清华计科和姚班放在同一专业线里看，目的是解释清楚“学校专业”和“更强培养通道”的叠加关系。",
        sources: [tsinghuaMajorSource, tsinghuaYaoClassSource, moeDoubleFirstClassSource],
      },
      "peking-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "北大的计算机线更适合把“理论基础 + 图灵班 + 学界/工业界双出口”放在一起判断。",
        whyStrong: [
          "北京大学计科本身就立在强理论基础上，学校层又有数学、物理等基础学科支撑。",
          "图灵班已经形成稳定的培养方案和本研贯通路径，属于典型的校内再升级通道。",
          "北京城市资源和北大的综合平台，让计算机方向的学术深造、出国和头部就业都很强。",
        ],
        graduateOutcomeSummary:
          "图灵班官方公开的本科出口主要分为保研深造、出国深造和就业创业三类，整体并不单押一条路。",
        graduateOutcomeHighlights: [
          "2024 届图灵班毕业典礼官方稿件明确把毕业选择概括为“保研、出国、就业创业”。",
          "同一官方材料里，班级寄语直接把学生未来概括为走向学术界或工业界。",
          "如果你更偏理论计算、算法和深造链路，北大是清华之外最值得并列比较的头部目标。",
        ],
        note:
          "当前公开的是图灵班的定性画像，不是逐届升学率。页面只把它当作北大计算机线的强培养证据。",
        sources: [pkuQualitySource, pkuTuringSource, moeDoubleFirstClassSource],
      },
      "fudan-university": {
        tier: 2,
        nationalPosition: "C9 强项",
        strengthSummary:
          "复旦的计算机线胜在“上海场景 + 计算机拔尖班 + AI 交叉”，适合既看研究训练又看产业资源的人。",
        whyStrong: [
          "学校已经把计算机科学拔尖人才试验班单列为本科强培养通道，而不是普通计科的轻微升级版。",
          "官方培养目标直接写到面向计算机科学和人工智能等交叉领域的突破性创新，研究味道很重。",
          "上海的互联网、AI 和芯片产业资源，让复旦计算机的实习和就业场景非常完整。",
        ],
        graduateOutcomeSummary:
          "官方更强的是博士深造导向证据，本科后的典型路径是继续在复旦或世界一流大学攻读计算机及交叉领域博士。",
        graduateOutcomeHighlights: [
          "复旦官方简介直接把本科后的目标写成“在复旦大学或世界一流大学攻读计算机科学及交叉领域博士学位”。",
          "当前公开的是培养目标和课程模块，不是历届统计，所以页面把它写成参考画像。",
          "如果你想要上海资源、又不想只按“互联网就业校”理解计算机，复旦是必须比较的一档。",
        ],
        note:
          "复旦这条线当前更像“研究型计算机 + 上海产业”的组合，不宜只拿普通就业想象去看。",
        sources: [fudanComputerSource, source("走进复旦大学四个“拔尖人才班”", "https://news.fudan.edu.cn/2024/0625/c3004a141421/page.htm", "复旦官方专题，补充计算机科学拔尖人才试验班的培养叙事。", "official_story"), moeDoubleFirstClassSource],
      },
      "shanghai-jiao-tong-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "上交的计算机线是典型的工程平台型顶配路线，普通计科之外还有 ACM 班和约翰班这种更高强度的校内荣誉方向。",
        whyStrong: [
          "学校本科专业本体强，致远学院又把最强学生进一步分流到 ACM 班、约翰班等高强度路径。",
          "ACM 班的公开统计极少见地给出大样本整体出口，直接说明这条线的深造强度。",
          "上海的产业、科研和创业资源，决定了上交计算机不会只局限在学术出口。",
        ],
        graduateOutcomeSummary:
          "ACM 班官方统计显示，本科后绝大多数继续深造，而且直博比例很高；同时学术教职和创业成果也已成规模出现。",
        graduateOutcomeHighlights: [
          "截至 2023 年 4 月，ACM 班已培养 640 名毕业生，其中 94% 继续深造、92% 直接攻读博士。",
          "官方同时披露，已有 33 人获得海内外一流高校教职。",
          "如果你更看工程密度、算法系统训练和上海场景，上交是清北浙之外最硬的一条计算机线。",
        ],
        note:
          "ACM 班不是普通计科全体学生的代表，但它足以说明上交计算机线的上限和培养强度。",
        sources: [sjtuTeachingSource, sjtuAcmSource, moeDoubleFirstClassSource],
      },
      "zhejiang-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "浙大计算机线强在“大平台 + 图灵班 + 杭州产业”，适合既看深造又看 AI/互联网研发的人。",
        whyStrong: [
          "学校本科专业面很宽，计算机、自动化、微电子等方向本来就容易形成交叉训练。",
          "图灵班直接在高考阶段可见，属于能提前锁定的高强度计算机培养通道。",
          "杭州对算法、云计算、平台型企业和创业机会都很强，这会直接影响本科后的去向结构。",
        ],
        graduateOutcomeSummary:
          "图灵班官方问答已经给出较清晰的出口画像：大部分学生去世界 Top 20 高校继续深造，部分进入 Google、微软等知名 IT 企业。",
        graduateOutcomeHighlights: [
          "官方材料直接写明“据最新数据，大部分学生将前往世界 Top 20 大学继续深造”。",
          "同一材料也写到，部分学生会前往 Google、微软等著名 IT 企业工作。",
          "如果你想在强工科平台、AI 产业和高强度班型之间找平衡，浙大是非常硬的一档。",
        ],
        note:
          "浙大公开的是图灵班画像，不是全体计科本科生的精确统计。页面把它当作计算机线的上限证据。",
        sources: [zjuMajorSource, zjuTuringSource, moeDoubleFirstClassSource],
      },
      "nanjing-university": {
        tier: 2,
        nationalPosition: "C9 强项",
        strengthSummary:
          "南大的计算机线更适合按“研究型软件/智能化软件 + 新工科至诚班 + 本研衔接”来理解。",
        whyStrong: [
          "南京大学 2025 本科亮点里直接点名了智能化软件、计算机金融和集成电路实验班。",
          "学校又把至诚班升级为新工科拔尖路径，明确强调人工智能、计算机、软件工程的本研衔接。",
          "南大的氛围更偏研究和深造，如果你喜欢更稳、更学术一点的软件路线，它会比想象中更强。",
        ],
        graduateOutcomeSummary:
          "官方目前更明确的是培养结构而不是逐届统计，本科后的主流路径仍是深造、研究型软件岗位和头部产业研发。",
        graduateOutcomeHighlights: [
          "南京大学官方公开材料强调智能化软件和新工科至诚班的本研衔接，而不是单纯本科就业导向。",
          "至诚班由央企和学校共同参与，说明产业研发出口是现实路径之一。",
          "如果你更看重软件、系统和智能化方向的研究型训练，南大是非常值得横向比较的一档。",
        ],
        note:
          "南大当前没有公开到计算机线的逐届升学率，所以页面只写出口结构，不虚构比例。",
        sources: [njuHighlightsSource, njuZhichengSource, moeDoubleFirstClassSource],
      },
      "university-of-science-and-technology-of-china": {
        tier: 2,
        nationalPosition: "C9 强项",
        strengthSummary:
          "中科大的计算机线更像“科研导向的计科平台 + 华夏计算机科技英才班”，适合明确偏深造和科研的人。",
        whyStrong: [
          "学校本科专业目录里同时覆盖计科、信息安全、软件工程，信息类底座完整。",
          "华夏计算机科技英才班挂在学校教务处科技英才班体系里，说明最强学生会继续向更高训练强度流动。",
          "中科大的整体学风和科研导向会显著影响本科出口，深造氛围非常浓。",
        ],
        graduateOutcomeSummary:
          "当前官方材料更强调科研训练和科技英才班体系，本科后的典型出口应理解为深造优先、兼顾科研院所和高技术研发岗位。",
        graduateOutcomeHighlights: [
          "教务处通知直接说明华夏计算机科技英才班属于校内科技英才班选拔体系。",
          "学校在信息类方向的公开口径整体偏科研导向，这一点和普通工程型计算机院校有明显差异。",
          "如果你本来就打算保研、直博或走科研院所路线，中科大非常值得和南大、复旦并列比较。",
        ],
        note:
          "这条卡片对中科大计算机出口的判断，部分来自学校公开培养体系的推断，而不是单一班级的年度统计。",
        sources: [ustcCatalogSource, ustcEliteSource, moeDoubleFirstClassSource],
      },
      "harbin-institute-of-technology": {
        tier: 2,
        nationalPosition: "强工科头部",
        strengthSummary:
          "哈工大的计算机线要和航天国防、AI+ 先进技术领军班、院士特色班一起看，它不是轻互联网风格，而是明显偏硬科技和国家战略场景。",
        whyStrong: [
          "计算机科学与技术本身就是哈工大的“双一流”建设学科之一。",
          "学校又把 AI+ 先进技术领军班、院士特色班等更强培养路径挂在本科招生和官方新闻里。",
          "航天国防和智能制造场景会把哈工大的计算机本科出口推向更硬核的研究和工程岗位。",
        ],
        graduateOutcomeSummary:
          "公开材料显示，这条线的主路径仍是深造和国家战略场景下的技术岗位；院士特色班已经能看到航天单位实习和深造并行的典型出口。",
        graduateOutcomeHighlights: [
          "AI+ 先进技术领军班明确是本硕博贯通培养。",
          "首届善义班共有 22 名本科毕业生，培养中全员参与航天科技创新挑战研究，并在大四深入航天单位实习实践。",
          "学校官方专题还披露，航天国防单位就业人数较 2019 年增长 78.6%。",
        ],
        note:
          "哈工大的计算机线更适合那些愿意把“硬科技、航天国防、深造”当作核心目标的人。",
        sources: [hitDoubleFirstClassSource, hitAiLeaderSource, hitShanyiSource, hitTalentSource],
      },
      "xian-jiaotong-university": {
        tier: 3,
        nationalPosition: "985 强项",
        strengthSummary:
          "西交的计算机线适合按“稳健的 985 工科平台 + 计算机/人工智能并行 + 西部制造与信息产业承接”来理解。",
        whyStrong: [
          "学校招生页同时把计算机科学与技术和人工智能列为重点方向，平台完整。",
          "国家级一流本科专业建设点为这条线提供了比较稳的本科建设信号。",
          "如果你希望保留 985 工科平台，但位次不够冲清北上浙复中哈，这条线很现实。",
        ],
        graduateOutcomeSummary:
          "当前学校公开的更强证据是学校层就业质量快照，专业线层没有细分统计；典型出口应理解为深造、信息产业研发和工程技术岗位并行。",
        graduateOutcomeHighlights: [
          "西安交通大学 2023 年毕业生就业质量报告公布的学校层总体去向落实率为 98.5%。",
          "学校在计算机、人工智能、微电子等方向同时布局，说明本科后的行业出口不只盯互联网。",
          "如果你愿意接受城市不是北上杭、但平台仍是 985 的取舍，西交是比较稳的替代项。",
        ],
        note:
          "西交这条线更适合做“分数不够时的稳妥替代”，而不是用来替代头部学校的计算机荣誉班。",
        sources: [xjtuMajorSource, xjtuFirstClassSource, xjtuEmploymentSource],
      },
    },
  },
  "clinical-medicine": {
    label: "临床医学",
    intro:
      "临床医学这条线不能只看学校牌子，至少要同时比较附属医院体系、本博贯通或长学制、科研平台和未来进医院还是走医学科研。",
    comparisonBasis:
      "先看学校有没有成熟医学院和附属医院网络，再看是不是八年制/本博贯通/强科研导向，最后看本科后是继续深造、规培还是走临床科研复合路线。",
    replacementRule:
      "如果你分数不够头部医学院，替代学校往往不只是“同名临床医学”，还要看医院资源、城市和是否接受更长培养周期。",
    comparisonPool: [
      { schoolSlug: "peking-university", tier: 1, reason: "更看全国顶级医学院平台、北京头部医院和科研资源。" },
      { schoolSlug: "fudan-university", tier: 1, reason: "更看复旦上医和上海顶级医院体系。" },
      { schoolSlug: "shanghai-jiao-tong-university", tier: 1, reason: "更看上交医学院的附属医院密度和上海场景。" },
      { schoolSlug: "zhejiang-university", tier: 1, reason: "更看综合型医学平台和浙大附属医院体系。" },
      { schoolSlug: "tsinghua-university", tier: 2, reason: "更适合把医工交叉、北京资源和综合平台一起考虑。" },
      { schoolSlug: "nanjing-university", tier: 2, reason: "更适合冲本博贯通、直博导向和小而强的临床科研路径。" },
      { schoolSlug: "xian-jiaotong-university", tier: 2, reason: "更看西部头部医学平台和较稳的 985 医学路线。" },
      { schoolSlug: "sun-yat-sen-university", tier: 3, reason: "如果你更看医院资源和南方医学场景，这是常见替代项。" },
      { schoolSlug: "huazhong-university-of-science-and-technology", tier: 3, reason: "如果你更看大临床平台和中部医学资源，这是非常常见的替代项。" },
      { schoolSlug: "wuhan-university", tier: 3, reason: "更适合把综合大学平台和医学方向一起打包判断。" },
    ],
    schools: {
      "tsinghua-university": {
        tier: 2,
        nationalPosition: "医工交叉强项",
        strengthSummary:
          "清华的临床医学更适合按“医工交叉 + 北京资源 + 综合大学平台”理解，而不是按传统老牌医学院的规模去看。",
        whyStrong: [
          "学校本科专业设置里把临床医学放进了核心专业档案，说明这不是边缘补点方向。",
          "清华医学院的辨识度更偏医工交叉、临床科研和综合大学协同。",
          "北京的科研平台和医院资源会显著抬高这条线的上限。",
        ],
        graduateOutcomeSummary:
          "本科后主流仍是继续深造和进入高水平医院或医学科研平台，医工交叉背景会让部分学生转向医学科研和交叉创新路线。",
        graduateOutcomeHighlights: [
          "清华这条线更少见的是“纯临床规模优势”，更常见的是与工程、信息、生命科学打通。",
          "如果你未来想走医学影像、医学 AI、转化医学等交叉方向，清华的风格会比传统医学院更对路。",
          "如果你只想做标准化临床培养，头部传统医学院通常更值得优先比较。",
        ],
        note:
          "清华临床更像“高位交叉型医学路线”，和复旦上医、北医那种大医院体系并不是同一种打法。",
        sources: [tsinghuaMajorSource, moeDoubleFirstClassSource],
      },
      "peking-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "北大的临床医学要和北医体系、北京头部医院资源、科研平台和综合大学基础学科底座一起看。",
        whyStrong: [
          "北京大学医学平台的核心优势在于强医院体系、强科研和北京资源叠加。",
          "学校层本科教学质量报告和公开信息能够稳定支撑北大临床的高位判断。",
          "如果你未来目标是顶级医院、医学科研或继续在北京深造，北大天然处在优先比较池。",
        ],
        graduateOutcomeSummary:
          "本科出口通常不是简单直接就业，而是继续深造、进入顶级医院培养体系或走医学科研路线。",
        graduateOutcomeHighlights: [
          "北大临床更适合那些愿意接受更长培养周期、把医院平台和科研资源放在第一位的人。",
          "如果你未来看重北京医疗体系和综合大学交叉平台，这条线很难被完全替代。",
          "真正需要比较的不是“北大 vs 普通临床”，而是北大和复旦、上交、浙大之间的风格差异。",
        ],
        note:
          "北大这里的“全国顶级”属于站内解释，依据的是医学院平台、医院资源和综合信号，不是官方专业排名。",
        sources: [pkuQualitySource, moeDoubleFirstClassSource],
      },
      "fudan-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "复旦临床医学的核心判断点非常清楚，就是复旦上医和上海头部医院体系。",
        whyStrong: [
          "复旦上医官方长期把医学人才培养放在“顶配模式”去强调，临床辨识度非常强。",
          "学校同时有强公共卫生、基础医学和临床平台，学科协同完整。",
          "如果你未来想在上海的医院体系、科研平台和国际化医学环境里发展，复旦几乎一定要比较。",
        ],
        graduateOutcomeSummary:
          "本科后的主流仍是长周期医学培养链路，包括继续深造、进入高水平医院体系和医学科研平台。",
        graduateOutcomeHighlights: [
          "复旦上医的公开口径更强调高水平医学人才培养，而不是短平快就业。",
          "临床医学和公共卫生的联动，会让部分学生走向临床科研和公共卫生交叉方向。",
          "如果你更看重上海医院体系和医学品牌，复旦常常会排在非常靠前的位置。",
        ],
        note:
          "复旦临床更适合那些愿意把“医院资源”和“上海场景”放在第一位的人。",
        sources: [fudanMedSource, moeDoubleFirstClassSource],
      },
      "shanghai-jiao-tong-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "上交临床医学的判断逻辑和复旦类似，也要重点看上海医学院与附属医院资源，只是风格更偏上交的综合工程平台。",
        whyStrong: [
          "上海交大本科专业页把临床医学放在学校重点专业序列里。",
          "综合型大学平台会让医学和工程、信息、生医方向形成更多交叉。",
          "如果你既看医学平台，也看医工交叉和上海资源，上交非常值得和复旦并列比较。",
        ],
        graduateOutcomeSummary:
          "本科出口的核心仍是继续深造、进入高水平医院培养体系，以及走向医学科研和医工交叉方向。",
        graduateOutcomeHighlights: [
          "上交的医学线不只是医院训练，还会更多接触生物医学工程、医学信息等交叉场景。",
          "如果你未来更可能走医工、影像、器械或生医转化，上交会比单看临床名义更有优势。",
          "和复旦相比，更应该比较的是学校风格、医院体系和个人未来方向。",
        ],
        note:
          "上交这里没有额外挂专业级去向比例，页面只写稳定成立的出口结构。",
        sources: [sjtuTeachingSource, moeDoubleFirstClassSource],
      },
      "zhejiang-university": {
        tier: 1,
        nationalPosition: "第一梯队",
        strengthSummary:
          "浙大的临床医学强在综合平台、附属医院体系和“大而全”的学科协同。",
        whyStrong: [
          "浙大本科专业设置里直接把临床医学放在学校核心专业之一。",
          "综合型平台和浙大医学院附属医院体系，让本科之后的深造和医院路径都很稳。",
          "如果你更看重综合大学平台、华东资源和较完整的医学学科群，浙大非常有竞争力。",
        ],
        graduateOutcomeSummary:
          "本科后主流仍是继续深造、进入高水平医院体系和医学科研路径，综合平台让交叉转化方向的空间更大。",
        graduateOutcomeHighlights: [
          "浙大临床适合想保留医学主线，同时又不排斥未来做科研或交叉创新的人。",
          "如果你对城市偏好在杭州或长三角，浙大的性价比会明显提高。",
          "真正需要比较的更多是医院体系和城市，而不是学校名次本身。",
        ],
        note:
          "浙大当前没有在站内补到临床专业级统计，所以页面保持定性，不乱写升学率。",
        sources: [zjuMajorSource, moeDoubleFirstClassSource],
      },
      "nanjing-university": {
        tier: 2,
        nationalPosition: "特色强通道",
        strengthSummary:
          "南大临床医学最有辨识度的不是规模，而是本博贯通班已经公开给出了非常强的直博导向。",
        whyStrong: [
          "南京大学 2025 官方介绍把临床医学本博贯通班单独点了出来。",
          "官方公开材料直接给出“80%以上毕业生直接攻读博士学位”的培养出口画像。",
          "如果你就是冲着医学科研和直博路线去，这条线的辨识度非常高。",
        ],
        graduateOutcomeSummary:
          "本科出口显著偏继续深造和直接攻读博士，不是以本科后马上就业为主要目标。",
        graduateOutcomeHighlights: [
          "官方转载媒体稿明确写到，临床医学本博贯通班 80% 以上毕业生直接攻读博士学位。",
          "这说明南大临床更像高强度的医学科研人才培养通道。",
          "如果你更看长周期培养和直博出口，南大的吸引力会高于它在大众印象里的医学存在感。",
        ],
        note:
          "南大临床适合对本博贯通、医学科研特别明确的人；如果只想找大体量医院体系，优先级通常不如头部传统医学院。",
        sources: [njuClinicalSource, moeDoubleFirstClassSource],
      },
      "xian-jiaotong-university": {
        tier: 2,
        nationalPosition: "西部头部 985",
        strengthSummary:
          "西交临床医学更适合按“西部头部医学平台 + 985 综合工科资源 + 较稳的本地和区域医院体系”理解。",
        whyStrong: [
          "学校招生页公开列有临床医学相关培养班型，说明这不是弱存在感方向。",
          "西交的综合工科背景，也会把医学和工程、信息方向拉出更多交叉空间。",
          "如果你接受城市在西安，同时想保留 985 医学平台，西交是很实际的一档。",
        ],
        graduateOutcomeSummary:
          "本科后的主流路径仍是深造、进入医院培养体系和区域医疗平台，不适合用短期就业视角去理解。",
        graduateOutcomeHighlights: [
          "西交当前没有公开到临床专业级的细分去向比例，页面只展示稳定出口结构。",
          "学校层总体去向落实率保持在高位，但这不能简单等同于临床线。",
          "如果你想要相对更稳的 985 医学路线，而不是极限冲刺头部医学院，西交值得比较。",
        ],
        note:
          "西交更适合做“综合平台稳妥选项”，而不是和北医、复旦上医比医院规模。",
        sources: [xjtuMajorSource, xjtuEmploymentSource, moeDoubleFirstClassSource],
      },
    },
  },
  "integrated-circuit": {
    label: "集成电路",
    intro:
      "这条专业线把微电子、集成电路科学与工程、集成电路实验班放在一起判断，重点看学科建制、国家急需平台、科研条件和芯片产业链连接。",
    comparisonBasis:
      "先看学校是不是把芯片方向当成一级学科或新工科主轴，再看有没有拔尖班、本博融通和面向设计/制造/设备的真实培养路径。",
    replacementRule:
      "芯片方向的替代学校不一定都叫“集成电路”，也可能藏在微电子、电子科学与技术或电子信息类里。页面只给相近路线，不给录取承诺。",
    comparisonPool: [
      { schoolSlug: "fudan-university", tier: 1, reason: "更看一级学科试点、微电子底盘和上海芯片场景。" },
      { schoolSlug: "zhejiang-university", tier: 2, reason: "更看大工科平台、微电子和长三角产业承接。" },
      { schoolSlug: "nanjing-university", tier: 2, reason: "更看集成电路实验班和研究型新工科路径。" },
      { schoolSlug: "harbin-institute-of-technology", tier: 2, reason: "更适合把芯片放进硬科技、国防和电子系统场景里看。" },
      { schoolSlug: "xian-jiaotong-university", tier: 3, reason: "如果位次略低，但还想保留微电子方向和 985 平台，这是稳妥替代。" },
    ],
    schools: {
      "fudan-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "复旦的芯片线已经不是“电子信息里的一个方向”，而是学校公开定义的新工科主轴之一。",
        whyStrong: [
          "学校早就率先开展集成电路科学与工程一级学科试点。",
          "本科层面同时摆出了微电子科学与工程、集成电路科学与工程，以及星陈计划、香农计划这类更强培养路径。",
          "上海的设计、制造、设备和资本场景，让复旦芯片线的实习和就业承接非常完整。",
        ],
        graduateOutcomeSummary:
          "本科后的主流出口是继续深造和进入芯片研发链路，尤其适合想走设计、器件、EDA 或继续读博的人。",
        graduateOutcomeHighlights: [
          "复旦官方已经把星陈计划直接放进“培养集成电路领军人才”的项目序列。",
          "学校 2025 年又新增集成电路科学与工程本科专业，说明这条线仍在加码。",
          "如果你想把芯片当成长期主线，复旦通常属于第一轮就要重点比较的学校。",
        ],
        note:
          "复旦芯片线的强项不只在本科专业名，而在学校把这条线整体抬到了国家急需和领军人才培养的位置。",
        sources: [fudanIcSource, source("2025，与复旦一起奔赴未来！", "https://news.fudan.edu.cn/2025/0625/c4a145718/page.htm", "复旦官方新闻，直接点名星陈计划面向集成电路领军人才培养。", "official_story"), moeDoubleFirstClassSource],
      },
      "nanjing-university": {
        tier: 2,
        nationalPosition: "新工科强项",
        strengthSummary:
          "南大的芯片线更适合按“集成电路实验班 + 研究型新工科 + 强基础学科支撑”来理解。",
        whyStrong: [
          "南京大学 2025 本科亮点直接点名了集成电路实验班。",
          "南大的风格不是简单追求规模，而是把芯片方向嵌进研究型新工科培养里。",
          "如果你喜欢基础理科底子更强、节奏更学术的芯片培养路线，南大是有辨识度的。",
        ],
        graduateOutcomeSummary:
          "本科后的主流出口仍是继续深造，以及进入芯片设计、电子器件和科研研发方向。",
        graduateOutcomeHighlights: [
          "学校官方当前更强调集成电路实验班的培养定位，而不是大规模就业统计。",
          "南大的芯片线适合愿意走读研、读博或研究型研发岗的人。",
          "如果你更在意培养风格和学术环境，而不是单看产业规模，南大值得和浙大、哈工大对比。",
        ],
        note:
          "南大这里的芯片线更偏“研究型新工科”，和复旦那种产业链密度特别高的打法不同。",
        sources: [njuHighlightsSource, moeDoubleFirstClassSource],
      },
      "zhejiang-university": {
        tier: 2,
        nationalPosition: "华五强项",
        strengthSummary:
          "浙大的芯片线强在大平台和长三角产业承接，适合把微电子放进完整工科生态里看。",
        whyStrong: [
          "本科专业设置里直接列有微电子科学与工程。",
          "浙大的大工科平台让芯片方向和计算机、自动化、光电等方向天然形成联动。",
          "杭州及长三角的产业环境，会让芯片方向的实习和研发岗位承接更顺。",
        ],
        graduateOutcomeSummary:
          "本科后的主流出口是继续深造和进入芯片、电子信息、智能硬件相关研发岗位。",
        graduateOutcomeHighlights: [
          "浙大适合那些不想把自己锁死在单一芯片子方向，而是希望保留更大工科弹性的人。",
          "如果你未来也可能转向 AI 芯片、光电、自动化等交叉场景，浙大的平台优势会更明显。",
          "和复旦相比，浙大的强项更多体现在综合工科平台，而不只是微电子本体。",
        ],
        note:
          "浙大当前没有公开到芯片专业级的细分升学率，所以页面只写稳定出口类型。",
        sources: [zjuMajorSource, moeDoubleFirstClassSource],
      },
      "harbin-institute-of-technology": {
        tier: 2,
        nationalPosition: "硬科技强项",
        strengthSummary:
          "哈工大的芯片线更适合放进“电子系统 + 国防场景 + 硬科技工程”一起看。",
        whyStrong: [
          "学校本科专业里明确列有集成电路设计与集成系统。",
          "哈工大的整体工科底座会把芯片训练更多拉向系统、器件和国防应用。",
          "如果你未来想走更硬核的电子系统、装备和研发岗位，这条线很有辨识度。",
        ],
        graduateOutcomeSummary:
          "本科后主流仍是深造，以及进入电子信息、硬科技和国家战略相关研发岗位。",
        graduateOutcomeHighlights: [
          "哈工大的芯片线不只面向消费电子和互联网，而是更容易接上装备、航天和复杂系统场景。",
          "如果你愿意把“芯片 + 硬科技行业”作为组合目标，哈工大比很多学校更对路。",
          "和复旦、浙大比，哈工大的路线会明显更工程、更硬核。",
        ],
        note:
          "哈工大当前没有芯片线的单独统计，页面更强调培养场景和出口结构。",
        sources: [hitDoubleFirstClassSource, hitAiLeaderSource, moeDoubleFirstClassSource],
      },
      "xian-jiaotong-university": {
        tier: 3,
        nationalPosition: "985 稳健选项",
        strengthSummary:
          "西交的芯片线是很典型的“稳健 985 微电子路线”，适合位次不够冲更高档学校、但又不想放弃芯片方向的人。",
        whyStrong: [
          "学校招生页和国家级一流本科专业建设点都明确挂出了微电子科学与工程。",
          "西交工科底盘厚，微电子不会孤立存在，而是和信息、自动化、能动制造等平台一起工作。",
          "如果你未来接受在西部或制造业更强的场景里发展，这条线很稳。",
        ],
        graduateOutcomeSummary:
          "本科后的主路径仍是深造和半导体、电子信息产业研发岗位，兼顾区域制造业和工程场景。",
        graduateOutcomeHighlights: [
          "西交适合那些更看平台稳定性、而不是极致产业热度的人。",
          "如果你位次差复旦、浙大、南大一点，又想保留 985 芯片方向，西交值得单独留池。",
          "这条线的真实比较对象，往往是其他 985 的微电子或电子科学与技术。",
        ],
        note:
          "西交芯片线更像“稳平台、稳路线”的选择，不适合和顶级芯片平台直接比产业密度。",
        sources: [xjtuMajorSource, xjtuFirstClassSource, moeDoubleFirstClassSource],
      },
    },
  },
  economics: {
    label: "经济学",
    intro:
      "经济学这条线不能只看就业去金融，要同时看理论训练、拔尖计划、政策研究环境和未来是走学术深造、宏观政策、还是金融与咨询。",
    comparisonBasis:
      "先看学校有没有研究型经济学培养和拔尖计划，再看城市资源、政策和金融场景，最后区分你到底更想读博、进政策部门，还是去金融与咨询。",
    replacementRule:
      "经济学的替代学校常常受城市影响很大。页面里的替代项只表示“培养路线相近”，不等于任何省份的分数一定更低。",
    comparisonPool: [
      { schoolSlug: "peking-university", tier: 1, reason: "更看理论训练、政策研究平台和北京资源。" },
      { schoolSlug: "renmin-university-of-china", tier: 1, reason: "更看经济、财政、金融和公共政策的强研究平台。" },
      { schoolSlug: "fudan-university", tier: 1, reason: "更看上海资源、数理经济和研究型拔尖培养。" },
      { schoolSlug: "nankai-university", tier: 2, reason: "如果你更看传统强经管和更稳的研究训练，这是常见替代项。" },
      { schoolSlug: "xiamen-university", tier: 2, reason: "如果你更看财经、会计、应用经济相关场景，这是高频替代项。" },
      { schoolSlug: "wuhan-university", tier: 2, reason: "如果你更看综合大学平台和经管结合，这是常见比较对象。" },
    ],
    schools: {
      "peking-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "北大的经济学强项不在“好就业”三个字，而在理论训练、政策研究和北京资源的叠加。",
        whyStrong: [
          "学校层本身就在综合大学顶层，经济学又天然能调用法学、数学、公共政策等资源。",
          "如果你未来想走学术经济学、政策研究、央国企总部或顶级金融机构，北京平台会明显加分。",
          "北大的经济学更适合那些愿意接受高理论门槛、把长期路径放在首位的人。",
        ],
        graduateOutcomeSummary:
          "本科后的主流出口通常分成继续深造、政策研究/公共部门、以及金融和咨询三条线，学术深造比例会比一般经管专业更高。",
        graduateOutcomeHighlights: [
          "如果你冲的是研究型经济学，北大常常和人大、复旦构成第一轮核心比较池。",
          "北京的政策部门、研究机构和顶级金融总部，会直接改变这条线的机会集。",
          "如果你只是想要“泛商科就业”，北大经济学未必是成本最低的选择。",
        ],
        note:
          "北大经济学更适合目标明确的人。它的强项是研究和高平台，而不是“学起来轻松”。",
        sources: [pkuQualitySource, moeDoubleFirstClassSource],
      },
      "fudan-university": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "复旦经济学的最大辨识度，是“上海资源 + 数理经济拔尖班 + 研究型博士导向”。",
        whyStrong: [
          "学校已经把数理经济拔尖班单列出来，并明确放进拔尖计划 2.0 体系。",
          "复旦经济学院的培养目标明显偏研究型经济学人才，而不是泛管理类路径。",
          "上海的金融、咨询、研究机构和国际化环境，会让复旦经济学的就业场景非常完整。",
        ],
        graduateOutcomeSummary:
          "官方公开口径显示，经济学拔尖计划本科出口高度偏向继续深造和博士培养链路。",
        graduateOutcomeHighlights: [
          "复旦经院数理经济拔尖班公开材料显示，多届本科毕业生继续深造比例保持在很高水平。",
          "学校对这条线的定位更接近研究型经济学，而不是普通商科。",
          "如果你既想保留学术深造上限，又想利用上海的金融与研究资源，复旦非常强。",
        ],
        note:
          "复旦经济学更适合那些接受高数理门槛、同时想要上海平台的人。",
        sources: [fudanEconSource, source("复旦大学经济学院数理经济拔尖班去向数据", "https://econ.fudan.edu.cn/info/1024/31917.htm", "复旦经济学院官方页面，补充数理经济拔尖班毕业深造口径。", "official"), moeDoubleFirstClassSource],
      },
    },
  },
  aerospace: {
    label: "航空航天",
    intro:
      "航空航天这条线要重点看空天学科密度、国防科研平台、院所/军工连接，以及你能不能接受更强的工程和保密场景。",
    comparisonBasis:
      "先看学校是不是把空天方向放在核心主轴，再看本科后主流出口是读研、进院所军工，还是更偏民航和制造业。",
    replacementRule:
      "在 985 池里，纯空天本科的可替代学校本来就不多。很多时候所谓“替代”，其实是接受机械、自动化、材料等相近工程路线。",
    comparisonPool: [
      { schoolSlug: "beihang-university", tier: 1, reason: "更看空天学科密度、北京资源和学校整体围绕航空航天展开。" },
      { schoolSlug: "harbin-institute-of-technology", tier: 1, reason: "更看航天传统、国防场景和飞行器设计/制造一体化。" },
      { schoolSlug: "northwestern-polytechnical-university", tier: 1, reason: "更看国防军工、航空航海航天三航特色。" },
    ],
    schools: {
      "harbin-institute-of-technology": {
        tier: 1,
        nationalPosition: "全国顶级",
        strengthSummary:
          "哈工大的航空航天线是学校品牌最强的核心方向之一，飞行器设计与工程和飞行器制造工程都直接贴着学校主轴走。",
        whyStrong: [
          "学校本科专业里同时列出飞行器设计与工程、飞行器制造工程，空天不是点缀，是主干。",
          "哈工大的官方人才培养专题和院士特色班体系，都高度服务国家战略和航天国防场景。",
          "如果你未来想走航天院所、国防军工、飞行器总体设计或制造，哈工大天然在第一梯队。",
        ],
        graduateOutcomeSummary:
          "本科后的典型出口是继续深造，以及进入航天国防单位、航空航天制造和国家战略项目相关岗位。",
        graduateOutcomeHighlights: [
          "院士特色班和善义班的公开口径已经表明，学生会在大四深入航天单位实习实践。",
          "学校官方专题披露，航天国防单位就业人数较 2019 年增长 78.6%。",
          "如果你更想做纯空天工程，而不是泛机械或泛自动化，哈工大比很多学校更直接。",
        ],
        note:
          "哈工大空天线的替代项很少。真正需要比较的往往不是“有没有替代”，而是你更想要北京、哈尔滨还是西安的空天生态。",
        sources: [hitDoubleFirstClassSource, hitShanyiSource, hitTalentSource, moeDoubleFirstClassSource],
      },
    },
  },
};

function getMajorLineKey(major: MajorProfileEntry): MajorLineKey | null {
  const name = major.name;

  if (/计算机|软件工程|信息安全/.test(name)) {
    return "computer";
  }

  if (/^临床医学/.test(name)) {
    return "clinical-medicine";
  }

  if (/微电子|集成电路/.test(name)) {
    return "integrated-circuit";
  }

  if (/^经济学/.test(name)) {
    return "economics";
  }

  if (/航空航天|飞行器/.test(name)) {
    return "aerospace";
  }

  return null;
}

export function getMajorLineAnalysesForSchool({
  schoolSlug,
  majors,
}: {
  schoolSlug: string;
  majors: MajorProfileEntry[];
}): ResolvedMajorLineAnalysis[] {
  const matchedLines = new Map<MajorLineKey, { matchedMajors: string[]; order: number }>();

  majors.forEach((major, index) => {
    const key = getMajorLineKey(major);

    if (!key) {
      return;
    }

    const current = matchedLines.get(key);

    if (current) {
      current.matchedMajors.push(major.name);
      return;
    }

    matchedLines.set(key, {
      matchedMajors: [major.name],
      order: index,
    });
  });

  return Array.from(matchedLines.entries())
    .map(([key, match]) => {
      const definition = majorLineDefinitions[key];
      const analysis = definition.schools[schoolSlug];

      if (!analysis) {
        return null;
      }

      return {
        key,
        label: definition.label,
        intro: definition.intro,
        comparisonBasis: definition.comparisonBasis,
        replacementRule: definition.replacementRule,
        matchedMajors: match.matchedMajors,
        analysis,
        comparison: {
          higherTargets: definition.comparisonPool
            .filter((item) => item.tier < analysis.tier)
            .slice(0, MAX_COMPARE_ITEMS),
          peerSchools: definition.comparisonPool
            .filter((item) => item.tier === analysis.tier && item.schoolSlug !== schoolSlug)
            .slice(0, MAX_COMPARE_ITEMS),
          alternativeSchools: definition.comparisonPool
            .filter((item) => item.tier > analysis.tier)
            .slice(0, MAX_COMPARE_ITEMS),
        },
        order: match.order,
      };
    })
    .filter((item): item is ResolvedMajorLineAnalysis & { order: number } => Boolean(item))
    .sort((left, right) => left.order - right.order)
    .map((item) => ({
      key: item.key,
      label: item.label,
      intro: item.intro,
      comparisonBasis: item.comparisonBasis,
      replacementRule: item.replacementRule,
      matchedMajors: item.matchedMajors,
      analysis: item.analysis,
      comparison: item.comparison,
    }));
}
