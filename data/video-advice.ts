export type VideoAdviceSection = {
  title: string;
  bullets: string[];
};

export type PublishedVideoAdviceNote = {
  slug: string;
  title: string;
  summary: string;
  usage: string;
  sourceLabel: string;
  sourceUrl: string;
  extraction: string;
  sections: VideoAdviceSection[];
  caveats: string[];
};

export type PendingVideoAdviceSource = {
  title: string;
  sourceUrl: string;
  status: string;
  nextStep: string;
};

export type VideoAdviceLibrary = {
  title: string;
  description: string;
  note: string;
  publishedNotes: PublishedVideoAdviceNote[];
  pendingSources: PendingVideoAdviceSource[];
};

export const videoAdviceLibrary: VideoAdviceLibrary = {
  title: "视频来源专业建议笔记库",
  description:
    "先把视频里值得保留的专业判断提取成结构化笔记，再决定哪些内容值得进入站内长期页面。",
  note:
    "这组内容更适合做“专业体感判断”和方向提醒，不替代学校培养方案、录取规则和官方就业数据。",
  publishedNotes: [
    {
      slug: "electronic-information-video-note",
      title: "电子信息大类专业建议笔记",
      summary:
        "把电子信息大类常见专业拆成芯片半导体、通信信号、理论电子和智能感知四类，适合家长先建立专业体感。",
      usage: "适合放入专业建议板块，作为电子信息方向的第一层职业感知提醒。",
      sourceLabel: "小红书视频：一句话点评电子信息所有专业",
      sourceUrl:
        "https://www.xiaohongshu.com/discovery/item/69e5fb46000000002102e0c3?app_platform=ios&app_version=9.26.1&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBNJwDpnB-V97uu6SyQKe0-6QAoKIAC0RjV0TrSnqVIyk=&author_share=1&xhsshare=WeixinSession&shareRedId=Nz5DNTVHPDw-OUpFPEEzPzk4PjlHPjxA&apptime=1776769403&share_id=f10273eee9e445eb92a8fd6ddeef6806",
      extraction: "yt-dlp 下载音频 + faster-whisper small 转写，人工按上下文校正。",
      sections: [
        {
          title: "先怎么理解这条视频",
          bullets: [
            "它更像一层专业体感判断，适合先帮家长分清电子信息大类内部差异。",
            "真正做选择时，还要回到学校平台、课程结构、读研比例和就业去向。",
          ],
        },
        {
          title: "芯片半导体方向",
          bullets: [
            "电子科学与技术、微电子科学与工程、集成电路设计与集成系统更偏芯片和半导体链条。",
            "这类方向通常更依赖实验平台和后续深造，本科阶段很难只靠名字判断值不值。",
          ],
        },
        {
          title: "通信与信号方向",
          bullets: [
            "通信工程、电波传播与天线、水声工程、海洋信息工程更偏通信链路和特定行业场景。",
            "这类专业的岗位稳定性和对口性通常较强，但职业体验会更看单位和细分赛道。",
          ],
        },
        {
          title: "理论电子与平台型专业",
          bullets: [
            "电子信息工程、信息工程偏平台型，本科课程面宽，但容易出现“都学一点”的感受。",
            "电子信息科学与技术、电磁场与无线技术、光电信息科学与工程更需要看学校培养平台，不能只看名字热度。",
          ],
        },
        {
          title: "智能感知与交叉方向",
          bullets: [
            "人工智能、智能测控工程、智能视觉工程、智能视听工程更偏智能硬件、感知和代码能力。",
            "前沿名称不等于岗位成熟度高，越新越要核真实就业场景。",
          ],
        },
      ],
      caveats: [
        "这条视频的表达带明显短视频风格，适合做提醒，不适合直接变成站内定论。",
        "页面里应保留“视频来源判断”属性，避免被误读成官方专业评价。",
      ],
    },
    {
      slug: "engineering-income-video-note",
      title: "最赚钱工科专业的短跑与长跑建议笔记",
      summary:
        "把工科方向拆成短期暴力型、长期翻盘型、闷声发财型和潜力黑马型，提醒家长别把高起薪直接等同于长期最优。",
      usage: "适合放入专业建议板块，作为工科方向的职业节奏和收益兑现周期提醒。",
      sourceLabel: "小红书视频：最赚钱的工科专业不是计算机",
      sourceUrl:
        "https://www.xiaohongshu.com/discovery/item/69d74ad7000000001a023ff9?app_platform=ios&app_version=9.26.1&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBv2hrrCt6XJPinjqOLOZGrJpi2B1ifGpriOLdtjDWZNw=&author_share=1&xhsshare=WeixinSession&shareRedId=Nz5DNTVHPDw-OUpFPEEzPzk4PjlHPjxA&apptime=1776769067&share_id=384a86237ad046e6ac32a8f56a4c3e3f",
      extraction: "本地视频音频转写，人工按上下文校正。",
      sections: [
        {
          title: "短期暴力型",
          bullets: [
            "计算机、软件工程、人工智能更偏早期高起薪和互联网岗位。",
            "代价通常是加班强度、技术迭代和职业生命周期焦虑更明显。",
          ],
        },
        {
          title: "长期翻盘型",
          bullets: [
            "电气工程、自动化、仪器科学与技术更偏稳定组织平台和长期职业回报。",
            "如果家庭更重视长期稳定和可持续路径，这类方向往往值得重点比较。",
          ],
        },
        {
          title: "闷声发财型与潜力黑马型",
          bullets: [
            "集成电路、微电子、光电信息更偏战略硬科技方向，门槛高但长期价值可能更强。",
            "新能源科学与工程、储能科学与工程更像未来产业风口，适合押长期趋势而不是短期兑现。",
          ],
        },
      ],
      caveats: [
        "这条内容不适合直接写成“专业收入排行榜”，更适合当职业节奏判断。",
        "真正落到志愿时，还要补学校平台、深造比例和行业周期信息。",
      ],
    },
    {
      slug: "engineering-ranking-video-note",
      title: "工科专业收益兑现节奏与方向比较笔记",
      summary:
        "把机械电子、自动化、电气、光电、车辆、新能源、软件、人工智能、电子科学、微电子、信息安全放进同一套比较框架里看。",
      usage: "适合放入专业建议板块，作为工科方向的横向比较提醒，而不是绝对收入排名。",
      sourceLabel: "小红书视频：最赚钱的工科专业大盘点",
      sourceUrl:
        "https://www.xiaohongshu.com/explore/69e0ab4e00000000220015cb?app_platform=ios&app_version=9.26.1&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBmsrqgD3rRDADbWtvNWg4Ktazsybi9UHj4nPIXZnwznw=&author_share=1&xhsshare=WeixinSession&shareRedId=Nz5DNTVHPDw-OUpFPEEzPzk4PjlHPjxA&apptime=1776768478&share_id=51844af26cae4dfa900d350f6f6909ec",
      extraction: "本地视频音频转写，人工按上下文校正。",
      sections: [
        {
          title: "智能制造与产业侧方向",
          bullets: [
            "机械电子工程、自动化更适合从智能制造、机器人和自动化生产线角度理解。",
            "这类方向更看复合能力和产业场景，不只是传统机械或传统控制。",
          ],
        },
        {
          title: "强组织平台与新能源扩张方向",
          bullets: [
            "电气工程及其自动化同时连着电网体系和新能源产业链，是典型的可高薪可稳定方向。",
            "车辆工程则要重点看是否真正切到新能源，而不是只看专业名字。",
          ],
        },
        {
          title: "硬科技与数字化方向",
          bullets: [
            "光电、电子科学、微电子更偏平台和深造导向，真正价值要结合学校实验条件与产业方向一起看。",
            "软件、人工智能、信息安全则分别对应个人技术成长、高门槛热点和实战能力导向三条路线。",
          ],
        },
      ],
      caveats: [
        "这条内容不适合被写成绝对意义上的工科专业排名榜。",
        "真正有价值的是不同工科方向的收益兑现逻辑和适合的人群差异。",
      ],
    },
  ],
  pendingSources: [],
};
