import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getShanghai2026BatchLineStatusSummary,
  shanghai2026BatchLineStatuses,
} from "../data/shanghai-2026-batch-line-status.ts";

const shanghaiAdmissionsPageSource = readFileSync(
  new URL("../app/admissions/shanghai/page.tsx", import.meta.url),
  "utf8",
);

test("tracks 2026 Shanghai batch line status without mixing source trust", () => {
  const summary = getShanghai2026BatchLineStatusSummary();

  assert.equal(summary.batchCount, 3);
  assert.equal(summary.officialLineBatchCount, 1);
  assert.equal(summary.officialStatusBatchCount, 1);
  assert.equal(summary.thirdPartyReferenceBatchCount, 1);

  const ordinary = shanghai2026BatchLineStatuses.find((item) => item.batch === "本科普通批次");
  const comprehensive = shanghai2026BatchLineStatuses.find((item) => item.batch === "综合评价批次");
  const zero = shanghai2026BatchLineStatuses.find((item) => item.batch === "零志愿批次");

  assert.ok(ordinary);
  assert.equal(ordinary.tone, "official-lines");
  assert.ok(ordinary.sources.every((source) => source.trust === "official"));

  assert.ok(comprehensive);
  assert.equal(comprehensive.tone, "official-status");
  assert.match(comprehensive.lineLabel, /不是统一投档线/);
  assert.match(comprehensive.summary, /最低入围线 583/);

  assert.ok(zero);
  assert.equal(zero.tone, "third-party-reference");
  assert.ok(zero.sources.some((source) => source.trust === "third-party"));
  assert.match(zero.summary, /611 分及以上/);
});

test("Shanghai admissions page renders the 2026 batch status panel", () => {
  assert.match(shanghaiAdmissionsPageSource, /2026 各批次公开状态/);
  assert.match(shanghaiAdmissionsPageSource, /普通批已经能按官方院校专业组线直接匹配/);
  assert.match(shanghaiAdmissionsPageSource, /shanghai2026BatchLineStatuses/);
});
