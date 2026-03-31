import { getShanghaiAdmissionsInsight, type ShanghaiAdmissionsInsightTag } from "./shanghai-admissions-insights";
import type { ShanghaiAdmissionRecord } from "./shanghai-admissions";

type CompareSchool = {
  slug: string;
  name: string;
  city: string;
  schoolType: string;
};

export type ShanghaiCompareSummary = {
  school: CompareSchool;
  records: ShanghaiAdmissionRecord[];
};

export type ShanghaiCompareCard = {
  schoolSlug: string;
  schoolName: string;
  schoolMeta: string;
  detailHref: string;
  latestYear: string;
  exactLines: string;
  thresholdLines: string;
  qGroupLines: string;
  officialSupplement: string;
  latestSnapshot: string;
  readMethod: string;
  readMethodTag: string;
  tags: ShanghaiAdmissionsInsightTag[];
};

function sortLatestRecords(records: ShanghaiAdmissionRecord[]) {
  return [...records].sort(
    (left, right) =>
      right.year - left.year ||
      left.scoreType.localeCompare(right.scoreType) ||
      left.groupCode.localeCompare(right.groupCode),
  );
}

function buildLatestSnapshot(records: ShanghaiAdmissionRecord[], latestYear?: number) {
  if (!latestYear) {
    return "当前还没补到上海公开组线";
  }

  const latestRecords = sortLatestRecords(records)
    .filter((record) => record.year === latestYear)
    .slice(0, 2);

  if (latestRecords.length === 0) {
    return "当前还没补到上海公开组线";
  }

  return latestRecords.map((record) => `${record.groupName} ${record.score}`).join(" / ");
}

export function buildShanghaiCompareCard(summary: ShanghaiCompareSummary): ShanghaiCompareCard {
  const insight = getShanghaiAdmissionsInsight(summary.school.slug, summary.records);

  if (!insight) {
    return {
      schoolSlug: summary.school.slug,
      schoolName: summary.school.name,
      schoolMeta: `${summary.school.city} · ${summary.school.schoolType}`,
      detailHref: `/schools/${summary.school.slug}`,
      latestYear: "待补",
      exactLines: "0",
      thresholdLines: "0",
      qGroupLines: "0",
      officialSupplement: "待补",
      latestSnapshot: "当前还没补到上海公开组线",
      readMethod: "当前先回学校详情页、学校招生网和上海考试院公开目录继续核对。",
      readMethodTag: "待继续补上海口径",
      tags: [],
    };
  }

  return {
    schoolSlug: summary.school.slug,
    schoolName: summary.school.name,
    schoolMeta: `${summary.school.city} · ${summary.school.schoolType}`,
    detailHref: `/schools/${summary.school.slug}`,
    latestYear: insight.latestYear ? String(insight.latestYear) : "待补",
    exactLines: String(insight.exactRecordCount),
    thresholdLines: String(insight.thresholdRecordCount),
    qGroupLines: String(insight.qGroupCount),
    officialSupplement: insight.hasSchoolOfficialSupplement ? "已核到" : "无",
    latestSnapshot: buildLatestSnapshot(summary.records, insight.latestYear),
    readMethod: insight.note,
    readMethodTag: insight.tags[0]?.label ?? "当前已核到上海口径",
    tags: insight.tags,
  };
}
