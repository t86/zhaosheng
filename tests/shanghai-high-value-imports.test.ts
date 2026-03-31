import test from "node:test";
import assert from "node:assert/strict";
import {
  getShanghaiHighValueImportManifest,
  validateShanghaiHighValueImports,
} from "../lib/shanghai-high-value-imports";

test("describes the two official Shanghai high-value import datasets", () => {
  const manifest = getShanghaiHighValueImportManifest();

  assert.equal(manifest.length, 2);
  assert.equal(manifest[0]?.id, "major-admissions");
  assert.equal(manifest[0]?.targetFile, "data/shanghai/high-value/major-admissions.json");
  assert.deepEqual(manifest[0]?.requiredFields, [
    "year",
    "schoolSlug",
    "schoolName",
    "majorName",
    "admittedCount",
    "minScore",
    "averageScore",
    "averageRank",
    "sourceLabel",
    "sourceUrl",
  ]);
  assert.match(manifest[0]?.sourceTitle ?? "", /录取人数及考分/);
  assert.equal(manifest[1]?.id, "major-plans");
  assert.equal(manifest[1]?.targetFile, "data/shanghai/high-value/major-plans.json");
  assert.deepEqual(manifest[1]?.requiredFields, [
    "year",
    "schoolSlug",
    "schoolName",
    "plannedCount",
    "sourceLabel",
    "sourceUrl",
  ]);
  assert.match(manifest[1]?.sourceTitle ?? "", /专业目录/);
});

test("reports the current high-value datasets as pending import", () => {
  const report = validateShanghaiHighValueImports();

  assert.equal(report.datasets.length, 2);
  assert.equal(report.datasets[0]?.status, "待导入");
  assert.equal(report.datasets[0]?.recordCount, 0);
  assert.equal(report.datasets[0]?.missingRequiredFieldCount, 0);
  assert.equal(report.datasets[1]?.status, "待导入");
  assert.equal(report.datasets[1]?.recordCount, 0);
  assert.equal(report.datasets[1]?.missingRequiredFieldCount, 0);
  assert.match(report.command, /pnpm dlx tsx scripts\/validate-shanghai-high-value-imports\.ts/);
});
