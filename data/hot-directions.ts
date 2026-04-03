export type HotDirectionSlug =
  | "artificial-intelligence"
  | "embodied-robotics"
  | "integrated-circuits"
  | "new-energy-storage"
  | "cybersecurity"
  | "smart-manufacturing"
  | "biomedicine"
  | "clinical-medicine"
  | "low-altitude-aerospace"
  | "quantum-technology"
  | "stomatology"
  | "brain-computer-interface"
  | "new-materials"
  | "fintech"
  | "marine-intelligent-equipment";

export type HotDirectionCategorySlug = "academic-elite" | "stable-career" | "future-bet";

export type HotDirectionCandidateRecord = {
  schoolSlug: string;
  entryLabel: string;
  rationale: string;
  tags: string[];
};

export type HotDirectionRecord = {
  slug: HotDirectionSlug;
  rank?: number;
  name: string;
  oneLiner: string;
  whyHot: string;
  caution: string;
  parentLens: string;
  studentLens: string;
  entryPaths: string[];
  schoolSlugs: string[];
  candidatePrograms: HotDirectionCandidateRecord[];
};

export type HotDirectionCategoryDefinition = {
  slug: HotDirectionCategorySlug;
  name: string;
  description: string;
  directionSlugs: HotDirectionSlug[];
};

export const hotDirectionMainRecords: HotDirectionRecord[] = [
  {
    slug: "artificial-intelligence",
    rank: 1,
    name: "人工智能",
    oneLiner: "讨论度最高，但真正吃香的是算法、工程和行业结合能力，不是专业名字本身。",
    whyHot: "政策持续点名，产业和招聘都在放大 AI 的存在感，家长和学生都很容易把它当成未来主线。",
    caution: "本科阶段容易学得宽而浅，真正拉开差距往往还要看数学、编程和继续深造能力。",
    parentLens: "家长会在意它是不是长期主线、能不能去大厂、会不会几年后就过热内卷。",
    studentLens: "学生要想清楚自己能不能接受高强度数理和编程训练，以及是否愿意长期迭代。",
    entryPaths: ["人工智能", "计算机科学与技术", "自动化", "电子信息工程"],
    schoolSlugs: ["tsinghua-university", "shanghai-jiao-tong-university", "zhejiang-university"],
    candidatePrograms: [
      {
        schoolSlug: "tsinghua-university",
        entryLabel: "自动化类",
        rationale: "清华本科招生口径更适合写成自动化类，通用人工智能和数智实验班属于类内培养亮点。",
        tags: ["大类分流", "平台强", "学霸向"],
      },
      {
        schoolSlug: "peking-university",
        entryLabel: "人工智能（元培学院、人工智能研究院）",
        rationale: "这是北大本科招生官网当前公开写法，比“图灵班”更适合作为高考入口口径。",
        tags: ["高考直报", "平台顶级", "学霸向"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "人工智能（拔尖英才试点班）",
        rationale: "本科入口直接、校内交叉资源重，适合把 AI 当主线深挖的人。",
        tags: ["高考直报", "平台强", "上海关注高"],
      },
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "人工智能",
        rationale: "AI 本科培养辨识度高，算法和工程两端都比较强。",
        tags: ["高考直报", "算法强", "读研友好"],
      },
      {
        schoolSlug: "beihang-university",
        entryLabel: "工科试验班类（计算与智能科学类）",
        rationale: "更适合想把 AI 和工程应用一起学的人，本科入口也不算窄。",
        tags: ["大类分流", "工程强", "航空航天场景"],
      },
    ],
  },
  {
    slug: "embodied-robotics",
    rank: 2,
    name: "机器人与具身智能",
    oneLiner: "它比单纯 AI 更像硬科技综合体，热度高，但本科入口往往是机械、电气、自动化和计算机的组合。",
    whyHot: "具身智能、工业机器人和服务机器人这两年被政策和资本反复提到，讨论热度明显上升。",
    caution: "赛道很热，但真正能做出成果的门槛高，落到本科志愿时不应被“机器人”三个字迷惑。",
    parentLens: "家长会在意这是不是下一个芯片级方向，以及是不是能对应稳定产业岗位。",
    studentLens: "学生要想清楚自己更喜欢算法、控制、机械设计还是系统集成，因为这决定后续路线。",
    entryPaths: ["机器人工程", "自动化", "机械设计制造及其自动化", "控制科学与工程相关入口"],
    schoolSlugs: ["harbin-institute-of-technology", "beihang-university", "zhejiang-university"],
    candidatePrograms: [
      {
        schoolSlug: "harbin-institute-of-technology",
        entryLabel: "自动化",
        rationale: "把哈工大的机器人能力落回自动化入口更稳，避免把校内培养班误写成高考直报入口。",
        tags: ["高考直报", "硬科技", "系统能力强"],
      },
      {
        schoolSlug: "beihang-university",
        entryLabel: "工科试验班类（计算与智能科学类）",
        rationale: "兼顾智能、控制和工程场景，是具身智能比较稳的本科入口。",
        tags: ["大类分流", "工程强", "场景多"],
      },
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "机械工程（机器人控制模块）",
        rationale: "不是只靠专业名字，而是靠成熟的机械+控制+算法组合。",
        tags: ["高考直报", "制造强", "交叉培养"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "自动化",
        rationale: "控制和机器人链条完整，后续衔接智能系统和工业场景都顺。",
        tags: ["高考直报", "控制强", "产业结合"],
      },
      {
        schoolSlug: "wuhan-university",
        entryLabel: "机器人工程",
        rationale: "本科入口名字直观，适合希望尽早锁定方向的家庭。",
        tags: ["高考直报", "新增热度", "方向辨识度高"],
      },
    ],
  },
  {
    slug: "integrated-circuits",
    rank: 3,
    name: "集成电路与芯片",
    oneLiner: "强政策、强产业、强门槛，是典型的高壁垒热门方向。",
    whyHot: "国家长期强调自主可控，芯片相关学科和产业链持续受重视，985 家长圈关注度一直高。",
    caution: "它不是“名字高级就值钱”，真正吃力的是数理基础、器件工艺和长期科研训练。",
    parentLens: "家长更看重战略地位、行业壁垒和中长期确定性。",
    studentLens: "学生要想清楚自己能不能接受偏硬件、偏物理、偏实验室的训练节奏。",
    entryPaths: ["微电子科学与工程", "集成电路设计与集成系统", "电子科学与技术"],
    schoolSlugs: ["fudan-university", "tsinghua-university", "university-of-science-and-technology-of-china"],
    candidatePrograms: [
      {
        schoolSlug: "fudan-university",
        entryLabel: "集成电路科学与工程",
        rationale: "本科入口新而明确，方向贴合度和产业关注度都很强。",
        tags: ["高考直报", "上海热度高", "产业链强"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "微电子科学与工程",
        rationale: "平台大、工科底盘厚，芯片方向的培养辨识度很高。",
        tags: ["高考直报", "工科强", "读研友好"],
      },
      {
        schoolSlug: "tsinghua-university",
        entryLabel: "电子信息类",
        rationale: "清华更适合按电子信息类来写，本科入口真实，集成电路属于类内的重要培养方向。",
        tags: ["大类分流", "平台顶级", "学霸向"],
      },
      {
        schoolSlug: "peking-university",
        entryLabel: "电子信息类（集成电路相关培养）",
        rationale: "北大在芯片方向上更适合按电子信息相关培养来理解，不宜把学院名直接写成高考入口。",
        tags: ["方向映射", "平台顶级", "科研强"],
      },
      {
        schoolSlug: "university-of-electronic-science-and-technology-of-china",
        entryLabel: "微电子科学与工程",
        rationale: "电子信息底盘硬，芯片链条足够完整，性价比也高。",
        tags: ["高考直报", "行业强", "工程导向"],
      },
    ],
  },
  {
    slug: "new-energy-storage",
    rank: 4,
    name: "新能源与储能",
    oneLiner: "不像 AI 那样有流量，但产业面广、岗位多，属于家长能理解的长期赛道。",
    whyHot: "双碳、储能、电池、电力系统改造长期存在，新能源链条对应的本科入口也相对清晰。",
    caution: "赛道虽大，但岗位差异极大，学校层次和专业方向会直接影响毕业后的去向质量。",
    parentLens: "家长会在意它的产业稳定性、就业面和是否容易进央国企或龙头制造企业。",
    studentLens: "学生要想清楚自己更偏材料、电气、能动还是工程应用，不同分支体验差异很大。",
    entryPaths: ["能源与动力工程", "新能源科学与工程", "电气工程及其自动化", "储能科学与工程"],
    schoolSlugs: ["xian-jiaotong-university", "zhejiang-university", "huazhong-university-of-science-and-technology"],
    candidatePrograms: [
      {
        schoolSlug: "xian-jiaotong-university",
        entryLabel: "新能源科学与工程",
        rationale: "方向贴合度高，能源和电气底盘强，适合把新能源当硬工程路线。",
        tags: ["高考直报", "平台强", "工程导向"],
      },
      {
        schoolSlug: "tsinghua-university",
        entryLabel: "能源与动力工程",
        rationale: "平台上限极高，适合想往大能源系统和高端研发走的人。",
        tags: ["高考直报", "平台顶级", "学霸向"],
      },
      {
        schoolSlug: "huazhong-university-of-science-and-technology",
        entryLabel: "能源与动力工程",
        rationale: "工科训练扎实，新能源与装备场景衔接自然。",
        tags: ["高考直报", "工科强", "就业面广"],
      },
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "能源与环境系统工程",
        rationale: "适合想把能源、系统优化和工程应用一起做的人。",
        tags: ["高考直报", "平台强", "读研友好"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "能源与动力工程",
        rationale: "在大城市语境里讨论度高，家长和学生都更容易理解这条路径。",
        tags: ["高考直报", "平台强", "城市优势"],
      },
    ],
  },
  {
    slug: "cybersecurity",
    rank: 5,
    name: "网络安全与数据安全",
    oneLiner: "这是一个不容易过时的方向，但真正值钱的不是概念，而是技术硬度和实战能力。",
    whyHot: "数字化深入后，网络与数据安全几乎成为所有行业的底层要求，关注度长期稳定。",
    caution: "不少学生会把它想象得过于轻松或神秘，实际训练强度很高，也很看个人技术积累。",
    parentLens: "家长会在意它是不是稳定职业路径，以及能否兼顾技术门槛和就业安全感。",
    studentLens: "学生要想清楚自己是否真的喜欢底层系统、攻防和长期更新知识体系。",
    entryPaths: ["网络空间安全", "信息安全", "计算机科学与技术", "密码科学与技术相关方向"],
    schoolSlugs: ["university-of-electronic-science-and-technology-of-china", "huazhong-university-of-science-and-technology", "xidian-university"],
    candidatePrograms: [
      {
        schoolSlug: "wuhan-university",
        entryLabel: "网络空间安全",
        rationale: "按本科专业名来写更稳，避免把院内试验班或特殊培养口径写成统一高考直报入口。",
        tags: ["高考直报", "方向辨识度高", "平台强"],
      },
      {
        schoolSlug: "university-of-electronic-science-and-technology-of-china",
        entryLabel: "计算机类",
        rationale: "电子信息底盘强，网络安全放在整体计算机体系里更稳。",
        tags: ["大类分流", "行业强", "工程强"],
      },
      {
        schoolSlug: "beihang-university",
        entryLabel: "工科试验班类（信息科学与技术类）",
        rationale: "更适合把安全放到更大的信息系统和工程场景里理解。",
        tags: ["大类分流", "平台强", "工程导向"],
      },
      {
        schoolSlug: "harbin-institute-of-technology",
        entryLabel: "信息安全",
        rationale: "工科硬度高，适合想走更偏底层和系统能力路线的人。",
        tags: ["高考直报", "工科强", "底层能力"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "信息类（含信息安全分流）",
        rationale: "大类入口更适合高分段家庭，后续向安全和计算链条延展性强。",
        tags: ["大类分流", "平台强", "城市优势"],
      },
    ],
  },
  {
    slug: "smart-manufacturing",
    rank: 6,
    name: "智能制造与自动化",
    oneLiner: "不是最会炒作的名字，但是真正能连到大工业和稳就业的一条主线。",
    whyHot: "制造升级和 AI+制造并行推进，自动化、控制和智能制造的实际产业承接能力很强。",
    caution: "如果只追“智能”标签，很容易忽略它本质上仍然是工程训练密集型方向。",
    parentLens: "家长更容易把它视为稳妥路线，兼顾技术含量和就业面。",
    studentLens: "学生要想清楚自己是否接受偏工程、偏控制、偏制造现场的问题类型。",
    entryPaths: ["自动化", "智能制造工程", "机械工程", "测控技术与仪器"],
    schoolSlugs: ["zhejiang-university", "beihang-university", "huazhong-university-of-science-and-technology"],
    candidatePrograms: [
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "自动化",
        rationale: "自动化传统强，往智能制造和工业控制延展都很顺。",
        tags: ["高考直报", "控制强", "就业稳"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "自动化",
        rationale: "学校平台和产业连接强，适合偏大工业和系统集成路线。",
        tags: ["高考直报", "产业结合", "城市优势"],
      },
      {
        schoolSlug: "harbin-institute-of-technology",
        entryLabel: "自动化",
        rationale: "工科底盘硬，更适合接受强工程训练的人。",
        tags: ["高考直报", "工科强", "系统能力强"],
      },
      {
        schoolSlug: "xian-jiaotong-university",
        entryLabel: "自动化",
        rationale: "大工业语境下的自动化能力强，属于典型稳路线。",
        tags: ["高考直报", "工程导向", "就业稳"],
      },
      {
        schoolSlug: "huazhong-university-of-science-and-technology",
        entryLabel: "机械设计制造及其自动化",
        rationale: "制造底子厚，和智能制造场景结合得比较自然。",
        tags: ["高考直报", "制造强", "稳就业"],
      },
    ],
  },
  {
    slug: "biomedicine",
    rank: 7,
    name: "生物医药与创新药",
    oneLiner: "热度在升，但它更适合能接受高淘汰率和长培养周期的人。",
    whyHot: "创新药、合成生物、生物制造持续被看好，高校和产业端都在加码。",
    caution: "这是一个容易被想象得过于光鲜的赛道，真正成才往往更依赖读研读博和科研平台。",
    parentLens: "家长会在意它是不是未来产业，以及孩子会不会被长周期投入拖住。",
    studentLens: "学生要想清楚自己对生物、化学和实验是否有真实兴趣，不能只看行业故事。",
    entryPaths: ["生物科学", "生物技术", "药学", "生物医学工程", "基础医学相关方向"],
    schoolSlugs: ["peking-university", "zhejiang-university", "fudan-university"],
    candidatePrograms: [
      {
        schoolSlug: "peking-university",
        entryLabel: "药学（六年制）",
        rationale: "顶尖平台叠加长学制，更适合把创新药当长期路线的人。",
        tags: ["高考直报", "平台顶级", "长周期"],
      },
      {
        schoolSlug: "fudan-university",
        entryLabel: "药学",
        rationale: "上海生物医药语境里辨识度高，家长和学生都更容易理解它的价值。",
        tags: ["高考直报", "上海热度高", "平台强"],
      },
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "药学",
        rationale: "理工医交叉氛围强，更适合后续往生物医药深水区走。",
        tags: ["高考直报", "平台强", "读研友好"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "生物医学工程",
        rationale: "更偏医工交叉，不是传统药学路线，但适合做创新医疗设备和交叉研发。",
        tags: ["方向映射", "医工交叉", "方向差异化"],
      },
      {
        schoolSlug: "sun-yat-sen-university",
        entryLabel: "药学",
        rationale: "华南医药产业链结合更强，是区域竞争力很高的一类选择。",
        tags: ["高考直报", "区域强", "平台强"],
      },
    ],
  },
  {
    slug: "clinical-medicine",
    rank: 8,
    name: "临床医学",
    oneLiner: "它不是风口，但一直是高分段里最稳定、最具职业确定性的热门方向之一。",
    whyHot: "社会需求长期存在，职业路径清晰，高分家长圈对临床的关注度一直很高。",
    caution: "培养周期长、压力大、进入行业后的训练也很长，不适合把它想成“高分就该报”的默认选项。",
    parentLens: "家长会在意稳定性、社会认可度和长期回报，但也要接受很长的培养周期。",
    studentLens: "学生要想清楚自己是否真的接受高强度学习、临床训练和职业压力。",
    entryPaths: ["临床医学", "八年制本博连读", "5+3 一体化", "基础医学交叉平台"],
    schoolSlugs: ["peking-university", "fudan-university", "shanghai-jiao-tong-university"],
    candidatePrograms: [
      {
        schoolSlug: "peking-university",
        entryLabel: "临床医学（八年制）",
        rationale: "顶级医学平台和临床资源，属于高分段最稳定的长线选项之一。",
        tags: ["高考直报", "平台顶级", "职业确定性"],
      },
      {
        schoolSlug: "fudan-university",
        entryLabel: "临床医学（八年制）",
        rationale: "上海医学院体系强，适合看重大平台和医学资源密度的家庭。",
        tags: ["高考直报", "上海热度高", "临床资源强"],
      },
      {
        schoolSlug: "shanghai-jiao-tong-university",
        entryLabel: "临床医学（八年制）",
        rationale: "交医辨识度高，长期职业确定性和资源平台都很强。",
        tags: ["高考直报", "职业确定性", "上海关注高"],
      },
      {
        schoolSlug: "zhejiang-university",
        entryLabel: "临床医学（八年制）",
        rationale: "综合校平台大，适合既看医学又看学校整体资源的人。",
        tags: ["高考直报", "综合平台", "长学制"],
      },
      {
        schoolSlug: "sichuan-university",
        entryLabel: "临床医学（八年制）",
        rationale: "华西体系在医学圈辨识度高，是全国范围内很稳的一档。",
        tags: ["高考直报", "医学强校", "临床资源强"],
      },
    ],
  },
  {
    slug: "low-altitude-aerospace",
    rank: 9,
    name: "低空经济与空天智能装备",
    oneLiner: "政策热度非常高，但它更像未来赛道集合，不是一个已经完全成熟的本科出口。",
    whyHot: "低空经济这两年频繁被点名，和无人机、飞控、空天装备、智能系统一起形成新想象空间。",
    caution: "概念很热，但真正对应到本科时，入口是航空、控制、电子、机械等多个传统方向的组合。",
    parentLens: "家长会在意它是不是下一个新基建赛道，以及孩子能不能踩中政策窗口。",
    studentLens: "学生要想清楚自己更偏飞行器、控制、软件还是系统工程，别只追概念。",
    entryPaths: ["飞行器设计与工程", "无人驾驶航空器系统工程", "自动化", "电子信息工程"],
    schoolSlugs: ["beihang-university", "northwestern-polytechnical-university", "harbin-institute-of-technology"],
    candidatePrograms: [
      {
        schoolSlug: "beihang-university",
        entryLabel: "工科试验班类（航空航天类）",
        rationale: "空天底盘和低空相关场景结合最自然，是这个方向最稳的本科入口之一。",
        tags: ["大类分流", "平台强", "场景贴合"],
      },
      {
        schoolSlug: "northwestern-polytechnical-university",
        entryLabel: "航空航天类",
        rationale: "传统航空航天强校，适合把低空放回飞行器和系统工程主线里理解。",
        tags: ["大类分流", "航空强", "工程导向"],
      },
      {
        schoolSlug: "harbin-institute-of-technology",
        entryLabel: "航空航天类",
        rationale: "硬核工科底色明显，更适合愿意走装备和系统路线的人。",
        tags: ["大类分流", "工科强", "装备强"],
      },
      {
        schoolSlug: "tsinghua-university",
        entryLabel: "航空航天类",
        rationale: "平台资源上限极高，适合把空天和智能系统作为长线方向。",
        tags: ["方向映射", "平台顶级", "学霸向"],
      },
      {
        schoolSlug: "beijing-institute-of-technology",
        entryLabel: "宇航与机电类",
        rationale: "入口更偏装备和系统，适合看重应用场景和工程能力的家庭。",
        tags: ["大类分流", "工程强", "系统能力强"],
      },
    ],
  },
  {
    slug: "quantum-technology",
    rank: 10,
    name: "量子科技",
    oneLiner: "典型高门槛黑马，提及度在升，但更适合顶尖学霸和愿意走长科研路线的人。",
    whyHot: "量子科技已经进入未来产业叙事，本科专业和科研平台也在持续建设。",
    caution: "讨论热度升了，不等于本科出口已经广泛成熟；它更像科研型、平台型方向。",
    parentLens: "家长会在意它是不是下一个国家级战略方向，以及是不是足够稀缺。",
    studentLens: "学生要想清楚自己是不是能接受极强的数理门槛和更长的科研路径。",
    entryPaths: ["量子信息科学", "物理学", "电子信息科学与技术", "数学与应用数学"],
    schoolSlugs: ["university-of-science-and-technology-of-china", "tsinghua-university", "zhejiang-university"],
    candidatePrograms: [
      {
        schoolSlug: "university-of-science-and-technology-of-china",
        entryLabel: "量子信息科学",
        rationale: "量子科技最典型也最直接的本科入口，平台辨识度非常高。",
        tags: ["高考直报", "平台顶级", "学霸向"],
      },
      {
        schoolSlug: "beihang-university",
        entryLabel: "量子科技先锋计划",
        rationale: "把量子当未来方向做前置培养，适合想追新赛道但仍看重学校平台的人。",
        tags: ["培养项目", "平台强", "未来赛道"],
      },
      {
        schoolSlug: "tsinghua-university",
        entryLabel: "物理学类",
        rationale: "清华更适合写成物理学类，再说明量子信息属于校内重点培养方向，而不是单列的高考直报专业。",
        tags: ["方向映射", "平台顶级", "科研导向"],
      },
      {
        schoolSlug: "fudan-university",
        entryLabel: "物理学类/量子与智能英才班",
        rationale: "量子和智能的交叉叙事很强，适合想走前沿交叉路线的人。",
        tags: ["培养项目", "上海热度高", "读研友好"],
      },
      {
        schoolSlug: "nanjing-university",
        entryLabel: "物理学类",
        rationale: "南京大学更适合按物理学类理解，量子属于强方向，不宜直接写成已经独立公开招生的窄入口。",
        tags: ["方向映射", "基础强", "科研导向"],
      },
    ],
  },
];

export const hotDirectionControversyRecords: HotDirectionRecord[] = [
  {
    slug: "stomatology",
    name: "口腔医学",
    oneLiner: "它很热，但更像高分家长圈层里的热门方向，不必强行放进全民主榜。",
    whyHot: "职业形象好、收入想象空间大、路径相对清晰，所以在高分报考讨论里一直非常有存在感。",
    caution: "它的热度更偏特定圈层，不像 AI、芯片、机器人那样和宏观产业叙事强绑定。",
    parentLens: "家长更看重确定性、社会认可度和职业回报。",
    studentLens: "学生要想清楚自己是否接受医疗训练体系和细致高强度的操作要求。",
    entryPaths: ["口腔医学", "长学制医学培养项目"],
    schoolSlugs: ["sichuan-university", "peking-university", "wuhan-university"],
    candidatePrograms: [],
  },
  {
    slug: "brain-computer-interface",
    name: "脑机接口",
    oneLiner: "很容易激发想象，但当前更适合作为交叉前沿话题，而不是本科阶段主榜方向。",
    whyHot: "它兼具科技感、前沿感和资本故事，天然容易引发关注。",
    caution: "本科入口极分散，真正成熟路径仍然高度依赖科研平台和跨学科训练。",
    parentLens: "家长会在意它是不是下一个爆发口，但也容易担心兑现周期过长。",
    studentLens: "学生要想清楚自己是否适合神经科学、电子、算法和医学交叉。",
    entryPaths: ["生物医学工程", "电子信息工程", "人工智能", "基础医学"],
    schoolSlugs: ["zhejiang-university", "tsinghua-university", "shanghai-jiao-tong-university"],
    candidatePrograms: [],
  },
  {
    slug: "new-materials",
    name: "新材料",
    oneLiner: "基础性很强，但传播热度通常不如 AI 和芯片，所以更适合做争议补位。",
    whyHot: "很多未来产业最后都要落在材料突破上，科研和产业两端都很重要。",
    caution: "它很重要，但志愿讨论里不够显眼，学生也常常低估其基础学科和实验强度。",
    parentLens: "家长会问它值不值、稳不稳、是不是容易吃亏在“名字不热”。",
    studentLens: "学生要想清楚自己是否喜欢偏实验、偏基础、偏制造端的问题。",
    entryPaths: ["材料科学与工程", "高分子材料与工程", "新能源材料与器件"],
    schoolSlugs: ["tsinghua-university", "beijing-institute-of-technology", "central-south-university"],
    candidatePrograms: [],
  },
  {
    slug: "fintech",
    name: "金融科技",
    oneLiner: "话题性强，但它更像应用场景标签，不是一定值得单列进主榜的未来主线。",
    whyHot: "金融、数据、AI 交叉之后，很容易成为家长和学生理解未来行业变化的抓手。",
    caution: "它往往不是一个独立稳定的本科入口，更常见的是经济、金融、统计、计算机交叉。",
    parentLens: "家长会在意它是否兼顾高薪和体面，但也担心行业波动。",
    studentLens: "学生要想清楚自己更偏金融逻辑还是技术能力，不然容易两头不到岸。",
    entryPaths: ["金融学", "数据科学与大数据技术", "统计学", "计算机科学与技术"],
    schoolSlugs: ["renmin-university-of-china", "fudan-university", "xiamen-university"],
    candidatePrograms: [],
  },
  {
    slug: "marine-intelligent-equipment",
    name: "航运与海洋智能装备",
    oneLiner: "它不是全网热词，但在部分学校和产业场景里价值很高，适合作为补位方向。",
    whyHot: "海洋强国、智能航运和高端装备升级会持续带来一些稳定需求。",
    caution: "热度更区域化、行业化，不适合泛化成所有高分学生都该关注的方向。",
    parentLens: "家长会关心它的行业壁垒和区域机会，但可能担心选择面偏窄。",
    studentLens: "学生要想清楚自己是否接受偏行业、偏装备、偏工程的长期路线。",
    entryPaths: ["船舶与海洋工程", "交通运输", "自动化", "机械工程"],
    schoolSlugs: ["shanghai-jiao-tong-university", "tongji-university", "ocean-university-of-china"],
    candidatePrograms: [],
  },
];

export const hotDirectionCategoryDefinitions: HotDirectionCategoryDefinition[] = [
  {
    slug: "academic-elite",
    name: "学霸向",
    description: "更强调学科门槛、科研训练和顶尖平台资源，不适合只想蹭热度的人。",
    directionSlugs: [
      "artificial-intelligence",
      "integrated-circuits",
      "quantum-technology",
      "embodied-robotics",
      "biomedicine",
    ],
  },
  {
    slug: "stable-career",
    name: "稳就业",
    description: "更看重职业路径清晰、长期需求稳定和家长可理解的回报结构。",
    directionSlugs: [
      "clinical-medicine",
      "cybersecurity",
      "smart-manufacturing",
      "new-energy-storage",
    ],
  },
  {
    slug: "future-bet",
    name: "风口赌未来",
    description: "更适合愿意承担赛道波动和兑现不确定性的人，不是低风险路线。",
    directionSlugs: [
      "embodied-robotics",
      "low-altitude-aerospace",
      "quantum-technology",
      "artificial-intelligence",
      "biomedicine",
    ],
  },
];

export const hotDirectionTopicMeta = {
  title: "未来 10 年热门方向猜想",
  shortTitle: "热门方向",
  description:
    "不是官方排名，而是把政策点名、产业热度和家长讨论压缩成一个更适合志愿讨论的方向判断页。",
  disclaimer:
    "这页不是官方结论，也不是薪资承诺，更适合拿来判断“值得深挖哪些方向”，而不是直接替代最终志愿决策。",
};

export const hotDirectionReferenceLinks = [
  {
    label: "政府工作报告中的具身智能、量子科技与 6G",
    url: "https://www.gov.cn/yaowen/liebiao/202503/content_7011747.htm",
  },
  {
    label: "教育部：人工智能、低空经济等方向微专业",
    url: "https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/2025/2025_zt21/mtjj/202507/t20250729_1199800.html",
  },
  {
    label: "教育部：普通高等学校本科专业目录（2025年）",
    url: "https://www.moe.gov.cn/srcsite/A08/moe_1034/s4930/202504/W020250422312780837078.pdf",
  },
  {
    label: "工信部：“人工智能+制造”专项行动实施意见",
    url: "https://www.miit.gov.cn/jgsj/kjs/wjfb/art/2026/art_5ea5b1663f264fcea69df0ab00d1f6f3.html",
  },
  {
    label: "36氪：机器人融资热度显著抬升",
    url: "https://www.36kr.com/p/3641970036445063",
  },
];
