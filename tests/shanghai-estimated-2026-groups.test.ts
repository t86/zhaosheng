import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  findShanghaiEstimatedGroupsByScore,
  getShanghaiEstimatedGroupSummary,
} from "../lib/shanghai-estimated-groups.ts";

const estimatedDataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/estimated-2026-groups.json", import.meta.url), "utf8"),
) as Record<string, unknown>;

test("records the provided 2026 Shanghai estimated group lines separately from official lines", () => {
  const summary = getShanghaiEstimatedGroupSummary(estimatedDataset);

  assert.equal(summary.year, 2026);
  assert.equal(summary.sourceType, "third-party-estimate");
  assert.ok(summary.recordCount >= 140);
  assert.ok(summary.localShanghaiCount >= 120);
});

test("matches a typed score to nearby 2026 estimated Shanghai professional groups", () => {
  const result = findShanghaiEstimatedGroupsByScore(estimatedDataset, {
    score: 588,
    limit: 20,
    window: 3,
  });

  assert.ok(result.some((item) => item.schoolName === "同济大学" && item.groupCode === "01"));
  assert.ok(result.some((item) => item.schoolName === "上海交通大学" && item.groupName === "上海交大(Q3)"));
  assert.ok(result.every((item) => Math.abs(item.diff) <= 3));
});

test("keeps high-score Fudan and SJTU estimates visible for direct score lookup", () => {
  const result = findShanghaiEstimatedGroupsByScore(estimatedDataset, {
    score: 598,
    limit: 20,
    window: 1,
  });

  assert.ok(result.some((item) => item.groupName === "复旦大学(02)" && item.estimatedScore === 598));
  assert.ok(result.some((item) => item.groupName === "复旦医学(01)" && item.estimatedScore === 598));
  assert.ok(result.some((item) => item.schoolSlug === "fudan-university"));
});
