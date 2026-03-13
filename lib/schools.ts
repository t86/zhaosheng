import {
  type MajorProfileEntry,
  type MajorProfileSource,
  schoolMajorProfiles,
  type SchoolMajorProfile,
} from "@/data/school-major-profiles";
import schoolMetrics from "@/data/school-metrics.json";
import schoolSeed from "@/data/school-seed.json";
import { topicDefinitionMap, topicDefinitions } from "@/data/topics";

type TopicSlug = (typeof topicDefinitions)[number]["slug"];

type SchoolSeedRecord = {
  slug: string;
  name: string;
  city: string;
  province: string;
  region: string;
  schoolType: string;
  affiliation: string;
  founded: number;
  officialDomain: string;
  officialWebsite: string;
  summary: string;
  topicSlugs: TopicSlug[];
  strengthTags: string[];
  majorHighlights: string[];
};

type ReportSnapshot = {
  title?: string;
  url?: string;
  yearLabel?: string | null;
  undergraduateMajorCount?: string | null;
  overallDestinationRate?: string | null;
  undergraduateDestinationRate?: string | null;
  undergraduateFurtherStudyRate?: string | null;
  monthlySalary?: string | null;
};

type SchoolMetricRecord = {
  updatedAt?: string;
  qualityReport?: ReportSnapshot;
  employmentReport?: ReportSnapshot;
  error?: string;
};

export type MajorRankingConfidence = "high" | "medium" | "baseline";

export type SchoolMajorRankingSource = MajorProfileSource & {
  kind: "official" | "public" | "community";
  weight: "high" | "medium" | "low";
};

export type SchoolMajorRankingEntry = {
  rank: number;
  name: string;
  cluster: string;
  tags: string[];
  tier: "S" | "A" | "B";
  confidence: MajorRankingConfidence;
  rationale: string;
  note?: string;
};

export type SchoolMajorRanking = {
  available: boolean;
  label: string;
  methodology: string;
  sourcePolicy: string;
  confidence: MajorRankingConfidence;
  sources: SchoolMajorRankingSource[];
  majors: SchoolMajorRankingEntry[];
  missingReason?: string;
};

export type School = SchoolSeedRecord & {
  topicDetails: {
    slug: TopicSlug;
    title: string;
    shortTitle: string;
  }[];
  majorProfile?: SchoolMajorProfile;
  majorRanking: SchoolMajorRanking;
  qualityReport?: ReportSnapshot;
  employmentReport?: ReportSnapshot;
  dataAvailability: {
    majorProfile: boolean;
    majorCount: boolean;
    employmentRate: boolean;
    salary: boolean;
  };
  collectionError?: string;
};

const metricsBySlug = schoolMetrics as Record<string, SchoolMetricRecord>;
const seedRecords = schoolSeed as SchoolSeedRecord[];

function getTier(rank: number): SchoolMajorRankingEntry["tier"] {
  if (rank === 1) {
    return "S";
  }

  if (rank <= 3) {
    return "A";
  }

  return "B";
}

function createProfileRankingEntry(
  major: MajorProfileEntry,
  rank: number,
  confidence: MajorRankingConfidence,
): SchoolMajorRankingEntry {
  const reasonLead =
    rank === 1
      ? "当前站点把它放在该校最强专业序列的最前位。"
      : "当前站点把它放在该校最强专业序列内。";

  return {
    rank,
    name: major.name,
    cluster: major.cluster,
    tags: major.tags,
    tier: getTier(rank),
    confidence,
    rationale: `${reasonLead} 依据学校官网、本科招生页或本科教学公开信息整理，当前不是教育部官方专业排名。`,
    note: major.note,
  };
}

function buildMajorRanking(
  school: SchoolSeedRecord,
  majorProfile?: SchoolMajorProfile,
): SchoolMajorRanking {
  if (majorProfile) {
    const confidence: MajorRankingConfidence =
      majorProfile.sources.length >= 2 ? "high" : "medium";

    return {
      available: true,
      label: `最强专业 Top ${Math.min(5, majorProfile.majors.length)}`,
      methodology:
        "优先使用学校官网、本科招生页、本科教学质量报告等公开信息整理。顺序表示站内当前强势序列，不等于教育部官方专业排名。",
      sourcePolicy:
        "官方信息优先；社区或论坛信息只适合做低权重补充，当前这份榜单默认不让论坛信号压过官方证据。",
      confidence,
      sources: majorProfile.sources.map((source) => ({
        ...source,
        kind: "official",
        weight: confidence === "high" ? "high" : "medium",
      })),
      majors: majorProfile.majors.slice(0, 5).map((major, index) =>
        createProfileRankingEntry(major, index + 1, confidence),
      ),
    };
  }

  return {
    available: false,
    label: "最强专业排行待补",
    methodology:
      "当前还没有补到足以支撑专业排行的公开材料，所以这所学校暂不生成“最强专业榜”。",
    sourcePolicy:
      "没有可核验来源时，宁可留空不排。后续会继续补学校官网、阳光高考和学科建设公开信息；论坛或社区只做低权重校验。",
    confidence: "baseline",
    sources: [
      {
        label: "学校官网",
        url: school.officialWebsite,
        note: "当前只定位到学校官网，尚未补到足以支撑专业排行的公开专业证据。",
        kind: "official",
        weight: "low",
      },
    ],
    majors: [],
    missingReason:
      "当前只保留学校层方向信息，不把它们直接当成最强专业排行，避免把站内整理误写成事实。",
  };
}

export const schools: School[] = seedRecords.map((school) => {
  const metric = metricsBySlug[school.slug] ?? {};
  const majorProfile = schoolMajorProfiles[school.slug];

  return {
    ...school,
    majorProfile,
    majorRanking: buildMajorRanking(school, majorProfile),
    qualityReport: metric.qualityReport,
    employmentReport: metric.employmentReport,
    collectionError: metric.error,
    topicDetails: school.topicSlugs
      .map((topicSlug) => topicDefinitionMap.get(topicSlug))
      .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic))
      .map((topic) => ({
        slug: topic.slug,
        title: topic.title,
        shortTitle: topic.shortTitle,
      })),
    dataAvailability: {
      majorProfile: Boolean(majorProfile),
      majorCount: Boolean(metric.qualityReport?.undergraduateMajorCount),
      employmentRate: Boolean(
        metric.employmentReport?.undergraduateDestinationRate ||
          metric.employmentReport?.overallDestinationRate,
      ),
      salary: Boolean(metric.employmentReport?.monthlySalary),
    },
  };
});

export const schoolsBySlug = new Map(schools.map((school) => [school.slug, school]));

export function getSchool(slug: string) {
  return schoolsBySlug.get(slug);
}

export function getTopicSchools(topicSlug: TopicSlug) {
  return schools.filter((school) => school.topicSlugs.includes(topicSlug));
}

export function getTopic(topicSlug: string) {
  return topicDefinitionMap.get(topicSlug as TopicSlug);
}

export function getCoverageStats() {
  return {
    schoolCount: schools.length,
    topicCount: topicDefinitions.length,
    majorProfileCovered: schools.filter((school) => school.dataAvailability.majorProfile)
      .length,
    majorCountCovered: schools.filter((school) => school.dataAvailability.majorCount)
      .length,
    employmentCovered: schools.filter((school) => school.dataAvailability.employmentRate)
      .length,
    salaryCovered: schools.filter((school) => school.dataAvailability.salary).length,
  };
}

export function getRegions() {
  return Array.from(new Set(schools.map((school) => school.region)));
}

export function getSchoolTypes() {
  return Array.from(new Set(schools.map((school) => school.schoolType)));
}
