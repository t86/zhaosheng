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

function recommend(score: number, options: Parameters<typeof recommendShanghaiGroupsByScore>[0]["options"] = {}) {
  return recommendShanghaiGroupsByScore({
    score,
    admissionRecords: admissionsDataset.records,
    majorAdmissionRecords,
    options,
  });
}

test("recommends Shanghai groups by score and attaches 2025 major examples", () => {
  const result = recommend(572);

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
  const result = recommend(572, { subjectRequirement: "不限" });
  const allCandidates = [...result.reach, ...result.match, ...result.safe];

  assert.ok(allCandidates.length > 0);
  assert.ok(allCandidates.every((candidate) => candidate.subjectRequirement === "不限"));
  assert.ok(result.match.some((candidate) => candidate.schoolName === "华东师范大学" && candidate.groupCode === "10401"));
  assert.ok(!allCandidates.some((candidate) => candidate.schoolName === "东南大学" && candidate.groupCode === "42201"));
});
