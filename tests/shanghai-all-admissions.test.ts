import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { recommendShanghaiGroupsByScore } from "../lib/shanghai-score-recommendations.ts";

const allAdmissionsDataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/all-admissions.json", import.meta.url), "utf8"),
) as { meta: Record<string, unknown>; records: Record<string, unknown>[] };
const majorAdmissionRecords = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-admissions.json", import.meta.url), "utf8"),
) as Record<string, unknown>[];
const scoreRankTable = JSON.parse(
  readFileSync(new URL("../data/shanghai/score-rank-table.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

test("stores official 2021-2026 Shanghai full professional-group lines", () => {
  assert.equal(allAdmissionsDataset.meta.region, "上海");
  assert.deepEqual(allAdmissionsDataset.meta.years, [2021, 2022, 2023, 2024, 2025, 2026]);
  assert.equal(allAdmissionsDataset.meta.sourceTrust, "official");
  assert.ok(allAdmissionsDataset.records.length > 8000);

  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2025 && record.groupName === "上海财大(04)" && record.minScore === 578,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2025 && record.groupName === "上海外大(05)" && record.minScore === 570,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2025 && record.groupName === "上海大学(02)" && record.minScore === 555,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2026 && record.groupName === "上海财大(04)" && record.minScore === 571,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2026 && record.groupName === "上海外大(04)" && record.minScore === 564,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2026 && record.groupName === "上海大学(01)" && record.minScore === 561,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) => record.year === 2026 && record.groupName === "复旦医学(Q3)" && record.minScore === 574,
    ),
  );
  assert.ok(
    allAdmissionsDataset.records.some(
      (record) =>
        record.year === 2026 &&
        record.groupName === "上海交大(02)" &&
        record.score === "580分及以上" &&
        record.sourceType === "supplemental-group",
    ),
  );
});

test("uses the official full group-line dataset for broader score recommendations", () => {
  const result = recommendShanghaiGroupsByScore({
    score: 572,
    admissionRecords: allAdmissionsDataset.records,
    majorAdmissionRecords,
    options: {
      candidateLimitPerTier: 200,
      scoreRankTable,
      scoreYear: 2026,
    },
  });
  const allCandidates = [...result.reach, ...result.match, ...result.safe];

  assert.ok(allCandidates.some((candidate) => candidate.schoolName === "上海财经大学"));
  assert.ok(allCandidates.some((candidate) => candidate.schoolName === "上海外国语大学"));
  assert.ok(allCandidates.some((candidate) => candidate.schoolName === "上海大学"));
  assert.ok(allCandidates.every((candidate) => candidate.sourceTrust === "official"));
  assert.ok(!allCandidates.some((candidate) => candidate.schoolName === "复旦大学" && candidate.scoreType === "threshold"));
});

test("keeps Fudan and SJTU visible for high Shanghai scores when using the full official dataset", () => {
  const result = recommendShanghaiGroupsByScore({
    score: 588,
    admissionRecords: allAdmissionsDataset.records,
    majorAdmissionRecords,
    options: {
      candidateLimitPerTier: 8,
      scoreRankTable,
      scoreYear: 2026,
    },
  });

  assert.ok(result.reach.some((candidate) => candidate.schoolName === "复旦大学" && candidate.scoreType === "threshold"));
  assert.ok(
    result.reach.some((candidate) => candidate.schoolName === "上海交通大学" && candidate.scoreType === "threshold"),
  );
});
