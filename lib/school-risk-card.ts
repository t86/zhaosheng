import type { FeaturedTrackEntry, SchoolMajorProfile } from "../data/school-major-profiles";
import {
  shanghaiDecisionGuide,
  type ShanghaiDecisionCheck,
  type ShanghaiDecisionSource,
} from "../data/shanghai-decision-guide";
import { getTrackRouteType } from "./featured-tracks";
import {
  getShanghaiAdmissionsInsight,
  type ShanghaiAdmissionsInsightTag,
  type ShanghaiAdmissionsInsightTone,
} from "./shanghai-admissions-insights";
import type { ShanghaiAdmissionRecord } from "./shanghai-admissions";
import type { ShanghaiFocusSchool } from "./shanghai-focus";

export type SchoolRiskTone = ShanghaiAdmissionsInsightTone;

export type SchoolRiskSourceLink = {
  label: string;
  url: string;
  note: string;
};

export type SchoolRiskEvidence = {
  title: string;
  detail: string;
  tone: SchoolRiskTone;
  source: SchoolRiskSourceLink;
};

export type SchoolRiskCard = {
  statusLabel: string;
  statusTone: SchoolRiskTone;
  headline: string;
  summary: string;
  badges: ShanghaiAdmissionsInsightTag[];
  evidences: SchoolRiskEvidence[];
  checks: ShanghaiDecisionCheck[];
  officialLinks: SchoolRiskSourceLink[];
};

export type SchoolRiskCardInput = {
  slug: string;
  name: string;
  majorProfile?: Pick<SchoolMajorProfile, "featuredTracks">;
  shanghaiRecords: ShanghaiAdmissionRecord[];
  shanghaiFocus?: ShanghaiFocusSchool;
};

function containsKeyword(track: FeaturedTrackEntry, keywords: string[]) {
  const haystack = [
    track.name,
    track.category,
    track.route,
    track.note ?? "",
    ...track.tags,
    ...track.sources.map((source) => source.label),
    ...track.sources.map((source) => source.note),
  ].join(" ");

  return keywords.some((keyword) => haystack.includes(keyword));
}

function formatTrackNames(tracks: FeaturedTrackEntry[], limit = 2) {
  const names = Array.from(new Set(tracks.map((track) => track.name)));
  const visible = names.slice(0, limit).join("、");

  return names.length > limit ? `${visible} 等项目` : `${visible} 项目`;
}

function pushBadge(target: ShanghaiAdmissionsInsightTag[], badge: ShanghaiAdmissionsInsightTag) {
  if (!target.some((item) => item.label === badge.label)) {
    target.push(badge);
  }
}

function pushEvidence(target: SchoolRiskEvidence[], evidence: SchoolRiskEvidence) {
  if (!target.some((item) => item.title === evidence.title)) {
    target.push(evidence);
  }
}

function buildRecordSource(
  records: ShanghaiAdmissionRecord[],
  matcher: (record: ShanghaiAdmissionRecord) => boolean,
  fallbackNote: string,
): SchoolRiskSourceLink {
  const matched = records.find(matcher) ?? records[0];

  return {
    label: matched.sourceLabel,
    url: matched.sourceUrl,
    note: fallbackNote,
  };
}

function buildStatusLabel(
  hasExactRecords: boolean,
  hasThresholdRecords: boolean,
  hasSchoolSupplement: boolean,
) {
  if (hasExactRecords && !hasThresholdRecords) {
    return {
      statusLabel: "上海口径较完整",
      statusTone: "teal" as const,
    };
  }

  if (hasExactRecords || hasThresholdRecords || hasSchoolSupplement) {
    return {
      statusLabel: "上海口径需混合解读",
      statusTone: "rose" as const,
    };
  }

  return {
    statusLabel: "上海口径待补",
    statusTone: "amber" as const,
  };
}

function getOfficialLinks() {
  return [
    shanghaiDecisionGuide.sources[0],
    shanghaiDecisionGuide.sources[1],
    shanghaiDecisionGuide.sources[2],
  ] satisfies ShanghaiDecisionSource[];
}

export function buildSchoolRiskCard(input: SchoolRiskCardInput): SchoolRiskCard {
  const tracks = input.majorProfile?.featuredTracks ?? [];
  const insight = getShanghaiAdmissionsInsight(input.slug, input.shanghaiRecords);

  const hasSchoolSupplement = Boolean(
    input.shanghaiFocus?.records.some((record) => record.sourceKind === "school-official"),
  );
  const { statusLabel, statusTone } = buildStatusLabel(
    Boolean(insight?.exactRecordCount),
    Boolean(insight?.thresholdRecordCount),
    hasSchoolSupplement,
  );

  const shanghaiSpecialTracks = tracks.filter(
    (track) =>
      containsKeyword(track, ["上海招生口径", "上海 2025", "综合评价批次", "专业组及科目要求"]) ||
      track.sources.some(
        (source) =>
          source.note.includes("专业组和科目要求") ||
          source.label.includes("专业组及科目要求") ||
          source.label.includes("上海市综合评价批次"),
      ),
  );
  const cooperationOrCampusTracks = tracks.filter((track) =>
    containsKeyword(track, ["中外合作", "联合培养", "杭州校区", "海宁校区", "培养地点", "校区"]),
  );
  const nonDirectTracks = tracks.filter((track) => getTrackRouteType(track) !== "高考直招");
  const longCycleTracks = tracks.filter((track) =>
    containsKeyword(track, ["本博贯通", "本研贯通", "本硕贯通", "本博融通", "本研衔接"]),
  );

  const badges: ShanghaiAdmissionsInsightTag[] = [];
  insight?.tags.forEach((tag) => pushBadge(badges, tag));

  if (shanghaiSpecialTracks.length > 0) {
    pushBadge(badges, { label: "含上海专项口径", tone: "ink" });
  }

  if (cooperationOrCampusTracks.length > 0) {
    pushBadge(badges, { label: "含联合培养/异地校区", tone: "rose" });
  }

  if (nonDirectTracks.length > 0) {
    pushBadge(badges, { label: "含校内/专项选拔", tone: "amber" });
  }

  if (longCycleTracks.length > 0) {
    pushBadge(badges, { label: "含长周期培养", tone: "ink" });
  }

  const evidences: SchoolRiskEvidence[] = [];

  if ((insight?.exactRecordCount ?? 0) > 0) {
    pushEvidence(evidences, {
      title: "上海考试院已公开院校专业组线",
      detail: `近 5 年已经能直接看到上海考试院公开的院校专业组线，适合先做学校池筛选和年份对照，但仍不能把它直接当成单个本科专业最低分。`,
      tone: "teal",
      source: buildRecordSource(
        input.shanghaiRecords,
        (record) => record.scoreType === "exact",
        "站内已接入上海考试院公开专业组线，适合先看年份波动和组别差异。",
      ),
    });
  }

  if ((insight?.thresholdRecordCount ?? 0) > 0) {
    pushEvidence(evidences, {
      title: "高分段仍有阈值口径",
      detail: `当前公开记录里仍包含 ${insight?.thresholdRecordCount ?? 0} 条高分阈值口径，不能把 580+ 这类展示直接当成真实最低分或真实组内差距。`,
      tone: "amber",
      source: buildRecordSource(
        input.shanghaiRecords,
        (record) => record.scoreType === "threshold",
        "这类记录更适合拿来判断高分段门槛，最终仍要叠加学校官网口径、位次和计划数。",
      ),
    });
  }

  if ((insight?.qGroupCount ?? 0) > 0) {
    pushEvidence(evidences, {
      title: "存在 Q 组或单独公布组别",
      detail: `这所学校当前还包含 ${insight?.qGroupCount ?? 0} 条 Q 组或单独公布组别记录，正式判断时不能只看普通批主表。`,
      tone: "ink",
      source: buildRecordSource(
        input.shanghaiRecords,
        (record) => record.sourceType === "q-group",
        "Q 组和单独公布组别已经并入站内数据，但仍要回原表核对培养方向是否一致。",
      ),
    });
  }

  if (input.shanghaiFocus && hasSchoolSupplement) {
    pushEvidence(evidences, {
      title: "学校官网还有补充分数口径",
      detail: input.shanghaiFocus.note,
      tone: "rose",
      source: input.shanghaiFocus.sources[0] ?? {
        label: input.shanghaiFocus.records[0]?.sourceLabel ?? "学校官网公开线",
        url: input.shanghaiFocus.records[0]?.sourceUrl ?? input.shanghaiFocus.schoolSlug ?? "",
        note: "学校官网公开线可以补充理解年份差异，但不能直接替代考试院专业组线。",
      },
    });
  }

  if (shanghaiSpecialTracks.length > 0) {
    const track = shanghaiSpecialTracks[0];

    pushEvidence(evidences, {
      title: "特色项目已核到上海批次要求文件",
      detail: `${formatTrackNames(shanghaiSpecialTracks)} 已在学校官方上海材料里单列。当前站内确认的是“学校有公开文件且文件涉及专业组/科目要求”，具体组合值仍需回原 PDF 逐项核对。`,
      tone: "ink",
      source: {
        label: track.sources[0].label,
        url: track.sources[0].url,
        note: track.sources[0].note,
      },
    });
  }

  if (cooperationOrCampusTracks.length > 0) {
    const track = cooperationOrCampusTracks[0];

    pushEvidence(evidences, {
      title: "中外合作或异地培养项目要单独核",
      detail: `${formatTrackNames(cooperationOrCampusTracks)} 已经出现中外合作、联合培养或异地校区信号。学费、语言要求、培养地点和后续贯通条件必须回学校最新招生材料确认。`,
      tone: "rose",
      source: {
        label: track.sources[0].label,
        url: track.sources[0].url,
        note: track.sources[0].note,
      },
    });
  }

  if (nonDirectTracks.length > 0) {
    const track = nonDirectTracks[0];
    const routeTypes = Array.from(
      new Set(nonDirectTracks.map((item) => getTrackRouteType(item))),
    ).join(" / ");

    pushEvidence(evidences, {
      title: "不是所有强班都能在普通批直接锁定",
      detail: `${formatTrackNames(nonDirectTracks)} 当前属于 ${routeTypes} 路径。高考能进学校，不等于直接进到对应强班或平台。`,
      tone: "amber",
      source: {
        label: track.sources[0].label,
        url: track.sources[0].url,
        note: track.sources[0].note,
      },
    });
  }

  if (longCycleTracks.length > 0) {
    const track = longCycleTracks[0];

    pushEvidence(evidences, {
      title: "部分项目天然偏长周期深造",
      detail: `${formatTrackNames(longCycleTracks)} 已明确带有本研/本博贯通或本研衔接信号，更适合一开始就能接受更长培养周期的家庭。`,
      tone: "ink",
      source: {
        label: track.sources[0].label,
        url: track.sources[0].url,
        note: track.sources[0].note,
      },
    });
  }

  if (evidences.length === 0) {
    pushEvidence(evidences, {
      title: "当前还没补到稳定的上海公开线",
      detail: `${input.name} 这页当前更多是学校层和项目层材料，正式填报前仍要回上海考试院专业目录、志愿辅助系统和学校招生章程核对。`,
      tone: "amber",
      source: {
        label: shanghaiDecisionGuide.tools[0].title,
        url: shanghaiDecisionGuide.tools[0].url,
        note: shanghaiDecisionGuide.tools[0].note,
      },
    });
  }

  let headline =
    insight?.headline ??
    `${input.name} 当前更适合先看学校项目和官方入口，再继续补上海正式填报口径。`;
  let summary =
    insight?.note ??
    "这块只汇总站内已核到的上海公开口径和项目层风险点，不把未核实字段冒充成招生章程结论。";

  if (!insight && input.shanghaiFocus) {
    headline = "这所学校当前已核到学校官网公开线，但还没补齐上海考试院专业组线。";
    summary = `${input.shanghaiFocus.note} 正式填报前还要回上海考试院专业目录、学校招生章程和志愿辅助系统继续核对。`;
  }

  if (shanghaiSpecialTracks.length > 0 && !summary.includes("特色项目")) {
    summary = `${summary} 另外，${formatTrackNames(shanghaiSpecialTracks)} 已经核到上海专项材料，具体组别和科目组合要回原 PDF 看。`;
  }

  return {
    statusLabel,
    statusTone,
    headline,
    summary,
    badges: badges.slice(0, 6),
    evidences: evidences.slice(0, 5),
    checks: shanghaiDecisionGuide.checks,
    officialLinks: getOfficialLinks().map((source) => ({
      label: source.label,
      url: source.url,
      note: source.note,
    })),
  };
}
