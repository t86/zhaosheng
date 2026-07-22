import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type RegularPlanMajor = {
  majorName: string;
  plan2026: number | null;
  tuition: number | null;
  admittedCount2025: number | null;
  averageScore2025: number | null;
};

type RegularPlanGroup = {
  schoolName: string;
  groupCode: string;
  groupName: string;
  subjectRequirement: string;
  groupPlan2026: number | null;
  groupLine2026Label: string;
  majors: RegularPlanMajor[];
};

const dataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/regular-2026-plan-reference.json", import.meta.url), "utf8"),
) as {
  meta: Record<string, unknown>;
  groups: RegularPlanGroup[];
};

test("loads 2026 Shanghai regular batch plan reference from the user workbook", () => {
  assert.equal(dataset.meta.region, "上海");
  assert.equal(dataset.meta.year, 2026);
  assert.equal(dataset.meta.referenceAdmissionYear, 2025);
  assert.equal(dataset.meta.sourceTrust, "third-party-reference");
  assert.equal(dataset.meta.recordCount, 5419);
  assert.equal(dataset.meta.groupCount, 1862);
  assert.equal(dataset.meta.schoolCount, 638);
  assert.equal(dataset.meta.matchedOfficialGroupCount, 1841);
  assert.equal(dataset.meta.groupPlan2026Total, dataset.meta.majorPlan2026Total);
});

test("keeps group-level plan and major-level examples for elite Shanghai candidates", () => {
  const fudanGroup01 = dataset.groups.find((group) => group.groupName === "复旦大学(01)");
  const sjtuGroup01 = dataset.groups.find((group) => group.groupName === "上海交大(01)");

  assert.ok(fudanGroup01);
  assert.equal(fudanGroup01.groupCode, "10101");
  assert.equal(fudanGroup01.subjectRequirement, "不限");
  assert.equal(fudanGroup01.groupPlan2026, 45);
  assert.equal(fudanGroup01.groupLine2026Label, "580分及以上");
  assert.equal(fudanGroup01.majors.length, 12);
  assert.ok(fudanGroup01.majors.some((major) => major.majorName === "中国语言文学类" && major.plan2026 === 3));

  assert.ok(sjtuGroup01);
  assert.equal(sjtuGroup01.groupCode, "10201");
  assert.equal(sjtuGroup01.groupPlan2026, 10);
  assert.ok(
    sjtuGroup01.majors.some(
      (major) =>
        major.majorName === "人工智能(拔尖英才试点班)" &&
        major.plan2026 === 2 &&
        major.tuition === 7700 &&
        major.admittedCount2025 === 3 &&
        major.averageScore2025 === 620,
    ),
  );
});
