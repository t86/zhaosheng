import { getShanghaiFocusSchool } from "@/lib/shanghai-focus";
import type { ShanghaiAdmissionRecord } from "@/lib/shanghai-admissions";

export type ShanghaiAdmissionsInsightTone = "ink" | "teal" | "amber" | "rose";

export type ShanghaiAdmissionsInsightTag = {
  label: string;
  tone: ShanghaiAdmissionsInsightTone;
};

export type ShanghaiAdmissionsSchoolInsight = {
  yearsCovered: number[];
  latestYear?: number;
  exactRecordCount: number;
  thresholdRecordCount: number;
  qGroupCount: number;
  regularCount: number;
  hasSchoolOfficialSupplement: boolean;
  headline: string;
  note: string;
  tags: ShanghaiAdmissionsInsightTag[];
};

function uniqueYears(records: ShanghaiAdmissionRecord[]) {
  return Array.from(new Set(records.map((record) => record.year))).sort((left, right) => right - left);
}

function buildTags(
  records: ShanghaiAdmissionRecord[],
  hasSchoolOfficialSupplement: boolean,
): ShanghaiAdmissionsInsightTag[] {
  const tags: ShanghaiAdmissionsInsightTag[] = [];
  const thresholdCount = records.filter((record) => record.scoreType === "threshold").length;
  const exactCount = records.length - thresholdCount;
  const qGroupCount = records.filter((record) => record.sourceType === "q-group").length;

  if (exactCount > 0) {
    tags.push({ label: "含精确组线", tone: "teal" });
  }

  if (thresholdCount > 0) {
    tags.push({ label: "含 580+ 阈值", tone: "amber" });
  }

  if (qGroupCount > 0) {
    tags.push({ label: "含 Q 组", tone: "ink" });
  }

  if (hasSchoolOfficialSupplement) {
    tags.push({ label: "学校官网补口径", tone: "rose" });
  }

  return tags;
}

export function getShanghaiAdmissionsInsight(
  schoolSlug: string,
  records: ShanghaiAdmissionRecord[],
): ShanghaiAdmissionsSchoolInsight | undefined {
  if (records.length === 0) {
    return undefined;
  }

  const yearsCovered = uniqueYears(records);
  const thresholdRecordCount = records.filter((record) => record.scoreType === "threshold").length;
  const exactRecordCount = records.length - thresholdRecordCount;
  const qGroupCount = records.filter((record) => record.sourceType === "q-group").length;
  const regularCount = records.filter((record) => record.sourceType === "regular").length;
  const focusSchool = getShanghaiFocusSchool(schoolSlug);
  const hasSchoolOfficialSupplement = Boolean(
    focusSchool?.records.some((record) => record.sourceKind === "school-official"),
  );

  let headline =
    "这所学校近 5 年可以直接用上海考试院公开组线做横向比较，先看普通批，再看是否有单独公布组别。";
  let note =
    "如果你已经在候选池里，下一步就该去学校页和招生章程核对专业组要求、培养地点和调剂规则。";

  if (thresholdRecordCount === records.length) {
    headline =
      "这所学校在考试院公开表里主要以高分阈值展示，当前不能仅凭本站公开分数判断真实组内差距。";
    note =
      "遇到 580 分及以上这类阈值时，必须结合学校官网公开线、往年位次资料和在沪计划数一起看。";
  } else if (thresholdRecordCount > 0) {
    headline =
      "这所学校既有精确组线，也有高分阈值，真正比较时不能只盯一列最低分。";
    note =
      "如果你目标是高分段组别，必须把考试院表、Q 组表和学校官网分类线一起交叉看。";
  } else if (qGroupCount > 0) {
    headline =
      "这所学校的上海公开线里含 Q 组或单独公布组别，不能只看普通批主表。";
    note =
      "站内已经把 Q 组并入筛选，但家长仍要留意它和普通批组别是否属于同一培养方向。";
  }

  if (hasSchoolOfficialSupplement && thresholdRecordCount > 0) {
    note =
      "这所学校还存在学校官网公开口径，可用来补充理解考试院阈值，但学校线、分类线和院校专业组线不能直接互相替代。";
  } else if (hasSchoolOfficialSupplement && qGroupCount === 0 && thresholdRecordCount === 0) {
    note =
      "这所学校既能看考试院组线，也能回学校官网补学校线或分类线，适合做更细的年份对照。";
  }

  return {
    yearsCovered,
    latestYear: yearsCovered[0],
    exactRecordCount,
    thresholdRecordCount,
    qGroupCount,
    regularCount,
    hasSchoolOfficialSupplement,
    headline,
    note,
    tags: buildTags(records, hasSchoolOfficialSupplement),
  };
}
