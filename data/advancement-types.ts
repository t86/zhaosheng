// 深造与保研数据类型。口径：以各校官方《毕业生就业质量报告》/官方公布为准，优先本科口径；
// 不同学校统计口径与年份不完全一致，横向对比仅供建立量级直觉，不作精确排名。

export type AdvancementSource = {
  label: string;
  url: string;
};

export type AdvancementStat = {
  slug: string;
  schoolName: string;
  cohort: string; // 数据届次，如「2024届」；none 表示未查到
  tuimianRate: number | null; // 保研率/推免率 %
  tuimianComputed?: boolean; // true=按官方推免公示人数÷本科毕业人数反算（非报告直给）
  tuimianBasis?: string; // 反算依据，如「推免 1651 / 本科 3971」
  advanceRate: number | null; // 深造率/升学率 %（推免+考研+出国）
  abroadRate: number | null; // 出国(境)率 %
  note?: string;
  sources: AdvancementSource[];
};
