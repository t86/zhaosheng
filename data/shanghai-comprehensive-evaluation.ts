export const shanghaiComprehensiveEvaluationUniversities = [
  { key: "fudan", label: "复旦" },
  { key: "sjtu", label: "交大" },
  { key: "tongji", label: "同济" },
  { key: "ecnu", label: "华师大" },
  { key: "sufe", label: "上财" },
  { key: "sisu", label: "上外" },
  { key: "ecust", label: "华理" },
  { key: "shu", label: "上大" },
  { key: "dhu", label: "东华" },
  { key: "shutcm", label: "上中医" },
  { key: "zju", label: "浙大" },
] as const;

export type ShanghaiComprehensiveEvaluationUniversityKey =
  (typeof shanghaiComprehensiveEvaluationUniversities)[number]["key"];

export type ShanghaiComprehensiveEvaluationRow = {
  district: string;
  highSchool: string;
  counts: Record<ShanghaiComprehensiveEvaluationUniversityKey, number>;
  total: number;
};

export const shanghaiComprehensiveEvaluationSource = {
  year: 2026,
  region: "上海",
  title: "2026 高考综评录取统计",
  sourceType: "third-party-image",
  sourceLabel: "申校洞察公众号图片（用户提供）",
  capturedAt: "2026-07-10",
  note:
    "按用户提供图片转录，当前先录入闵行区；第三方统计适合做高中综评出口参考，正式结果仍需回到上海市教育考试院和高校录取名单核验。",
};

export const shanghaiComprehensiveEvaluationRows: ShanghaiComprehensiveEvaluationRow[] = [
  {
    district: "闵行区",
    highSchool: "七宝中学",
    counts: { fudan: 25, sjtu: 54, tongji: 19, ecnu: 6, sufe: 3, sisu: 1, ecust: 8, shu: 4, dhu: 3, shutcm: 0, zju: 0 },
    total: 123,
  },
  {
    district: "闵行区",
    highSchool: "交附闵行",
    counts: { fudan: 15, sjtu: 47, tongji: 10, ecnu: 3, sufe: 3, sisu: 2, ecust: 5, shu: 2, dhu: 0, shutcm: 0, zju: 0 },
    total: 87,
  },
  {
    district: "闵行区",
    highSchool: "华二紫竹",
    counts: { fudan: 6, sjtu: 14, tongji: 3, ecnu: 2, sufe: 0, sisu: 1, ecust: 1, shu: 1, dhu: 2, shutcm: 0, zju: 0 },
    total: 30,
  },
  {
    district: "闵行区",
    highSchool: "上师闵行",
    counts: { fudan: 2, sjtu: 3, tongji: 1, ecnu: 2, sufe: 2, sisu: 0, ecust: 1, shu: 0, dhu: 0, shutcm: 0, zju: 0 },
    total: 11,
  },
  {
    district: "闵行区",
    highSchool: "闵行中学",
    counts: { fudan: 0, sjtu: 1, tongji: 2, ecnu: 1, sufe: 0, sisu: 1, ecust: 3, shu: 0, dhu: 3, shutcm: 1, zju: 0 },
    total: 12,
  },
  {
    district: "闵行区",
    highSchool: "上闵外",
    counts: { fudan: 1, sjtu: 0, tongji: 0, ecnu: 0, sufe: 0, sisu: 0, ecust: 0, shu: 0, dhu: 0, shutcm: 0, zju: 0 },
    total: 1,
  },
  {
    district: "闵行区",
    highSchool: "莘庄中学",
    counts: { fudan: 0, sjtu: 0, tongji: 0, ecnu: 1, sufe: 0, sisu: 0, ecust: 0, shu: 0, dhu: 0, shutcm: 0, zju: 0 },
    total: 1,
  },
  {
    district: "闵行区",
    highSchool: "民办文绮",
    counts: { fudan: 0, sjtu: 0, tongji: 0, ecnu: 0, sufe: 0, sisu: 0, ecust: 1, shu: 0, dhu: 0, shutcm: 0, zju: 0 },
    total: 1,
  },
  {
    district: "闵行区",
    highSchool: "七宝浦江",
    counts: { fudan: 0, sjtu: 0, tongji: 0, ecnu: 0, sufe: 0, sisu: 0, ecust: 1, shu: 0, dhu: 0, shutcm: 0, zju: 0 },
    total: 1,
  },
  {
    district: "闵行区",
    highSchool: "七宝鑫都",
    counts: { fudan: 0, sjtu: 0, tongji: 0, ecnu: 0, sufe: 0, sisu: 0, ecust: 0, shu: 1, dhu: 0, shutcm: 0, zju: 0 },
    total: 1,
  },
];

export function getShanghaiComprehensiveEvaluationSummary() {
  const districts = new Set(shanghaiComprehensiveEvaluationRows.map((row) => row.district));
  const universityTotals = shanghaiComprehensiveEvaluationUniversities.map((university) => ({
    ...university,
    total: shanghaiComprehensiveEvaluationRows.reduce((sum, row) => sum + row.counts[university.key], 0),
  }));

  return {
    year: shanghaiComprehensiveEvaluationSource.year,
    sourceLabel: shanghaiComprehensiveEvaluationSource.sourceLabel,
    districtCount: districts.size,
    highSchoolCount: shanghaiComprehensiveEvaluationRows.length,
    totalAdmissions: shanghaiComprehensiveEvaluationRows.reduce((sum, row) => sum + row.total, 0),
    universityTotals,
    topSchools: [...shanghaiComprehensiveEvaluationRows]
      .sort((a, b) => b.total - a.total)
      .slice(0, 3)
      .map((row) => ({ highSchool: row.highSchool, district: row.district, total: row.total })),
  };
}
