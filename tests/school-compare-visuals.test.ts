import test from "node:test";
import assert from "node:assert/strict";
import {
  generateCompareVisualMetrics,
  getCompareVerdictSummary,
} from "../lib/school-compare-visuals";
import { buildCompareRow } from "../lib/build-compare-row";

test("generates comparative visual metrics for selected schools", () => {
  const row1 = buildCompareRow("fudan-university");
  const row2 = buildCompareRow("zhejiang-university");

  const metrics = generateCompareVisualMetrics([row1, row2]);
  assert.equal(metrics.schools.length, 2);
  assert.equal(metrics.advancementComparison.length, 2);
  assert.ok(metrics.advancementComparison[0]?.advanceRate != null || metrics.advancementComparison[1]?.tuimianRate != null);
  assert.ok(metrics.directionsOverlap.length >= 0);
});

test("generates concise decision verdict summary between 2-3 schools", () => {
  const row1 = buildCompareRow("fudan-university");
  const row2 = buildCompareRow("tongji-university");

  const summary = getCompareVerdictSummary([row1, row2]);
  assert.ok(summary.highlights.length >= 1);
  assert.ok(summary.takeaway.length > 0);
});
