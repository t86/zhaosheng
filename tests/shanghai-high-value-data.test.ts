import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(new URL("../app/admissions/shanghai/page.tsx", import.meta.url), "utf8");
const statusSource = readFileSync(new URL("../lib/shanghai-high-value-data.ts", import.meta.url), "utf8");
const majorAdmissions = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-admissions.json", import.meta.url), "utf8"),
) as { schoolSlug: string; averageRank?: number | null }[];
const majorPlans = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-plans.json", import.meta.url), "utf8"),
) as unknown[];

test("reports imported major-admission status while plan data remains pending", () => {
  assert.ok(majorAdmissions.length >= 500);
  assert.ok(majorAdmissions.filter((record) => record.averageRank != null).length >= 500);
  assert.ok(new Set(majorAdmissions.map((record) => record.schoolSlug)).size >= 35);
  assert.ok(Array.isArray(majorPlans));
  assert.match(statusSource, /2025.*各专业录取人数及考分/);
  assert.match(statusSource, /平均分位次/);
  assert.match(statusSource, /在沪计划数/);
  assert.match(pageSource, /2025 专业录取考分/);
});
