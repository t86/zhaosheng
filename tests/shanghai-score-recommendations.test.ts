import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { recommendShanghaiGroupsByScore } from "../lib/shanghai-score-recommendations.ts";

const admissionsDataset = JSON.parse(
  readFileSync(new URL("../data/shanghai-admissions.json", import.meta.url), "utf8"),
) as { records: Record<string, unknown>[] };
const majorAdmissionRecords = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-admissions.json", import.meta.url), "utf8"),
) as Record<string, unknown>[];
const regularPlanReferenceDataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/regular-2026-plan-reference.json", import.meta.url), "utf8"),
) as { meta: Record<string, unknown>; groups: (Record<string, unknown> & { majors: Record<string, unknown>[] })[] };
const officialCatalogDataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/official-2026-major-catalog.json", import.meta.url), "utf8"),
) as { meta: Record<string, unknown>; groups: (Record<string, unknown> & { majors: Record<string, unknown>[] })[] };
const scoreRankTable = JSON.parse(
  readFileSync(new URL("../data/shanghai/score-rank-table.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

const regularPlanMajorRecords = regularPlanReferenceDataset.groups.flatMap((group) =>
  group.majors.map((major) => ({
    year: regularPlanReferenceDataset.meta.year,
    referenceAdmissionYear: regularPlanReferenceDataset.meta.referenceAdmissionYear,
    sourceTrust: regularPlanReferenceDataset.meta.sourceTrust,
    sourceLabel: regularPlanReferenceDataset.meta.sourceLabel,
    sourceUrl: "",
    schoolSlug: group.schoolSlug,
    schoolName: group.schoolName,
    groupCode: group.groupCode,
    groupName: group.groupName,
    subjectRequirement: group.subjectRequirement,
    majorName: major.majorName,
    plan2026: major.plan2026,
    tuition: major.tuition,
    admittedCount: major.admittedCount2025,
    minScoreLabel: major.minScoreLabel,
    minRankLabel: major.minRankLabel,
    averageScore: major.averageScore2025,
    averageRank: major.averageRank2025,
  })),
);

const officialCatalogMajorRecords = officialCatalogDataset.groups.flatMap((group) =>
  group.majors.map((major) => ({
    year: officialCatalogDataset.meta.year,
    referenceAdmissionYear: 2025,
    sourceTrust: officialCatalogDataset.meta.sourceTrust,
    sourceLabel: officialCatalogDataset.meta.sourceLabel,
    sourceUrl: group.officialSourceUrl,
    schoolSlug: group.schoolSlug,
    schoolName: group.schoolName,
    groupCode: group.groupCode,
    groupName: group.groupName,
    subjectRequirement: group.subjectRequirement,
    majorName: major.majorName,
    duration: major.duration,
    plan2026: major.plan2026,
    tuition: major.tuition,
    languageRequirement: major.languageRequirement,
    remarks: major.remarks,
  })),
);

function recommend(score: number, options: Parameters<typeof recommendShanghaiGroupsByScore>[0]["options"] = {}) {
  return recommendShanghaiGroupsByScore({
    score,
    admissionRecords: admissionsDataset.records,
    majorAdmissionRecords,
    options,
  });
}

function recommendFor2026(score: number, options: Parameters<typeof recommendShanghaiGroupsByScore>[0]["options"] = {}) {
  return recommend(score, {
    ...options,
    scoreRankTable,
    scoreYear: 2026,
  });
}

test("recommends Shanghai groups by score and attaches 2025 major examples", () => {
  const result = recommend(572, { candidateLimitPerTier: 200 });

  assert.equal(result.targetScore, 572);
  assert.ok(result.reach.some((candidate) => candidate.lineScore === 573 && candidate.diff === 1));

  const southeast = result.match.find(
    (candidate) => candidate.schoolName === "东南大学" && candidate.groupCode === "42201",
  );

  assert.ok(southeast);
  assert.equal(southeast.lineScore, 572);
  assert.equal(southeast.diff, 0);
  assert.equal(southeast.tier, "match");
  assert.equal(southeast.majorExamples.length, 3);
  assert.deepEqual(
    southeast.majorExamples.map((major) => major.majorName),
    ["工科试验班(吴健雄班)", "未来机器人(未来技术班)", "工科试验班(智慧能源与电气工程)"],
  );
});

test("caps major examples and keeps candidates display-friendly", () => {
  const result = recommend(572, { majorExampleLimit: 2, candidateLimitPerTier: 5 });

  assert.ok(result.reach.length <= 5);
  assert.ok(result.match.length <= 5);
  assert.ok(result.safe.length <= 5);
  assert.ok([...result.reach, ...result.match, ...result.safe].every((candidate) => candidate.majorExamples.length <= 2));
  assert.ok(result.totalCounts.reach > result.reach.length);
  assert.ok(result.thresholdSchoolCount > 0);
});

test("filters candidates by subject requirement when requested", () => {
  const result = recommend(572, { subjectRequirement: "不限", candidateLimitPerTier: 200 });
  const allCandidates = [...result.reach, ...result.match, ...result.safe];

  assert.ok(allCandidates.length > 0);
  assert.ok(allCandidates.every((candidate) => candidate.subjectRequirement === "不限"));
  assert.ok(result.match.some((candidate) => candidate.schoolName === "华东师范大学" && candidate.groupCode === "10401"));
  assert.ok(!allCandidates.some((candidate) => candidate.schoolName === "东南大学" && candidate.groupCode === "42201"));
});

test("uses 2026 official lines directly while still exposing historical equivalent scores", () => {
  const result = recommendFor2026(588, { candidateLimitPerTier: 200 });
  const allCandidates = [...result.reach, ...result.match, ...result.safe];
  const beihang = allCandidates.find(
    (candidate) =>
      candidate.schoolName === "北京航空航天大学" &&
      candidate.groupCode === "22102" &&
      candidate.scoreType === "exact",
  );

  assert.equal(result.scoreYear, 2026);
  assert.equal(result.targetRank, 1786);
  assert.deepEqual(result.equivalentScores.find((item) => item.year === 2025), { year: 2025, score: 595 });
  assert.ok(beihang);
  assert.equal(beihang.year, 2026);
  assert.equal(beihang.comparisonScore, 588);
  assert.equal(beihang.diff, -16);
  assert.equal(beihang.tier, "safe");
});

test("surfaces 580-plus elite Shanghai groups as high-score reach candidates that need manual verification", () => {
  const result = recommendFor2026(588, { candidateLimitPerTier: 8 });
  const fudan = result.reach.find((candidate) => candidate.schoolName === "复旦大学");
  const sjtu = result.reach.find((candidate) => candidate.schoolName === "上海交通大学");

  assert.ok(fudan);
  assert.ok(sjtu);
  assert.equal(fudan.scoreType, "threshold");
  assert.equal(sjtu.scoreType, "threshold");
  assert.equal(fudan.scoreLabel, "580分及以上");
  assert.equal(sjtu.scoreLabel, "580分及以上");
  assert.equal(fudan.comparisonScore, 588);
  assert.equal(sjtu.comparisonScore, 588);
});

test("attaches 2026 regular plan details to score recommendation major examples", () => {
  const result = recommendShanghaiGroupsByScore({
    score: 588,
    admissionRecords: admissionsDataset.records,
    majorAdmissionRecords: regularPlanMajorRecords,
    options: {
      candidateLimitPerTier: 8,
      scoreRankTable,
      scoreYear: 2026,
    },
  });
  const sjtu = result.reach.find(
    (candidate) => candidate.schoolName === "上海交通大学" && candidate.groupCode === "10201",
  );
  const ai = sjtu?.majorExamples.find((major) => major.majorName === "人工智能(拔尖英才试点班)");

  assert.ok(sjtu);
  assert.ok(ai);
  assert.equal(ai.plan2026, 2);
  assert.equal(ai.tuition, 7700);
  assert.equal(ai.referenceAdmissionYear, 2025);
  assert.equal(ai.admittedCount, 3);
  assert.equal(ai.averageScore, 620);
  assert.equal(ai.sourceTrust, "third-party-reference");
});

test("attaches official catalog duration and remarks to score recommendation major examples", () => {
  const result = recommendShanghaiGroupsByScore({
    score: 588,
    admissionRecords: admissionsDataset.records,
    majorAdmissionRecords: officialCatalogMajorRecords,
    options: {
      candidateLimitPerTier: 8,
      scoreRankTable,
      scoreYear: 2026,
    },
  });
  const sjtu = result.reach.find(
    (candidate) => candidate.schoolName === "上海交通大学" && candidate.groupCode === "10201",
  );
  const ieee = sjtu?.majorExamples.find((major) => major.majorName === "电子信息类(IEEE试点班)");

  assert.ok(sjtu);
  assert.ok(ieee);
  assert.equal(ieee.plan2026, 1);
  assert.equal(ieee.duration, "4");
  assert.equal(ieee.languageRequirement, "不限");
  assert.match(ieee.remarks, /计算机科学与技术/);
  assert.equal(ieee.sourceTrust, "official");
});

test("does not show hidden 580-plus elite groups below the public threshold", () => {
  const result = recommendFor2026(572, { candidateLimitPerTier: 200 });
  const allCandidates = [...result.reach, ...result.match, ...result.safe];

  assert.ok(!allCandidates.some((candidate) => candidate.schoolName === "复旦大学" && candidate.scoreType === "threshold"));
  assert.ok(
    !allCandidates.some(
      (candidate) => candidate.schoolName === "上海交通大学" && candidate.scoreType === "threshold",
    ),
  );
});
