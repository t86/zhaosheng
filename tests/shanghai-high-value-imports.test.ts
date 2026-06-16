import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const manifestSource = readFileSync(
  new URL("../lib/shanghai-high-value-imports.ts", import.meta.url),
  "utf8",
);
const majorAdmissions = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-admissions.json", import.meta.url), "utf8"),
) as Record<string, unknown>[];
const majorPlans = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-plans.json", import.meta.url), "utf8"),
) as Record<string, unknown>[];

const requiredMajorAdmissionFields = [
  "year",
  "batch",
  "schoolSlug",
  "schoolName",
  "groupCode",
  "groupName",
  "majorName",
  "admittedCount",
  "minScoreLabel",
  "minRankLabel",
  "averageScore",
  "averageRank",
  "sourceLabel",
  "sourceUrl",
  "sourcePage",
];

test("describes the two official Shanghai high-value import datasets", () => {
  assert.match(manifestSource, /id: "major-admissions"/);
  assert.match(manifestSource, /data\/shanghai\/high-value\/major-admissions\.json/);
  assert.match(manifestSource, /2025.*录取人数及考分/);
  assert.match(manifestSource, /id: "major-plans"/);
  assert.match(manifestSource, /data\/shanghai\/high-value\/major-plans\.json/);
  assert.match(manifestSource, /专业目录/);

  for (const field of requiredMajorAdmissionFields) {
    assert.match(manifestSource, new RegExp(`"${field}"`));
  }
});

test("ships the 2025 major-admissions dataset with required fields populated", () => {
  assert.ok(majorAdmissions.length >= 500);
  assert.ok(Array.isArray(majorPlans));

  for (const record of majorAdmissions) {
    for (const field of requiredMajorAdmissionFields) {
      const value = record[field];
      assert.notEqual(value, null, `${field} should be present`);
      assert.notEqual(value, "", `${field} should not be blank`);
    }
  }
});
