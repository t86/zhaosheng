import test from "node:test";
import assert from "node:assert/strict";
import {
  getShanghaiComprehensiveEvaluationSummary,
  shanghaiComprehensiveEvaluationRows,
  shanghaiComprehensiveEvaluationSource,
  shanghaiComprehensiveEvaluationUniversities,
} from "../data/shanghai-comprehensive-evaluation.ts";

test("stores the 2026 Shanghai comprehensive-evaluation high-school sample with source labels", () => {
  assert.equal(shanghaiComprehensiveEvaluationSource.year, 2026);
  assert.equal(shanghaiComprehensiveEvaluationSource.region, "上海");
  assert.equal(shanghaiComprehensiveEvaluationSource.sourceType, "third-party-image");
  assert.ok(shanghaiComprehensiveEvaluationSource.note.includes("第三方统计"));

  const summary = getShanghaiComprehensiveEvaluationSummary();
  assert.equal(summary.districtCount, 1);
  assert.equal(summary.highSchoolCount, 10);
  assert.equal(summary.totalAdmissions, 268);
  assert.deepEqual(summary.topSchools[0], { highSchool: "七宝中学", district: "闵行区", total: 123 });
});

test("keeps each comprehensive-evaluation row total aligned with university columns", () => {
  for (const row of shanghaiComprehensiveEvaluationRows) {
    const columnTotal = shanghaiComprehensiveEvaluationUniversities.reduce(
      (sum, university) => sum + row.counts[university.key],
      0,
    );
    assert.equal(columnTotal, row.total, `${row.highSchool} total should match university columns`);
  }

  const qibao = shanghaiComprehensiveEvaluationRows.find((row) => row.highSchool === "七宝中学");
  assert.ok(qibao);
  assert.equal(qibao.counts.fudan, 25);
  assert.equal(qibao.counts.sjtu, 54);
  assert.equal(qibao.total, 123);

  const jiaofuMinhang = shanghaiComprehensiveEvaluationRows.find((row) => row.highSchool === "交附闵行");
  assert.ok(jiaofuMinhang);
  assert.equal(jiaofuMinhang.counts.sjtu, 47);
  assert.equal(jiaofuMinhang.total, 87);
});
