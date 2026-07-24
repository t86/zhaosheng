import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type CatalogMajor = {
  majorCode: string;
  majorName: string;
  duration: string;
  plan2026: number | null;
  tuition: number | null;
  languageRequirement: string;
  remarks: string;
};

type CatalogGroup = {
  schoolName: string;
  groupCode: string;
  groupName: string;
  subjectRequirement: string;
  groupPlan2026: number | null;
  groupRemarks: string;
  majors: CatalogMajor[];
};

const dataset = JSON.parse(
  readFileSync(new URL("../data/shanghai/official-2026-major-catalog.json", import.meta.url), "utf8"),
) as {
  meta: Record<string, unknown>;
  groups: CatalogGroup[];
};

function groupByCode(groupCode: string) {
  const group = dataset.groups.find((item) => item.groupCode === groupCode);
  assert.ok(group, `missing group ${groupCode}`);
  return group;
}

test("loads the official 2026 Shanghai regular-batch major catalog", () => {
  assert.equal(dataset.meta.region, "上海");
  assert.equal(dataset.meta.year, 2026);
  assert.equal(dataset.meta.batch, "本科普通批次");
  assert.equal(dataset.meta.sourceTrust, "official");
  assert.equal(dataset.meta.sourceFile, "2026年上海市普通高等学校招生专业目录.pdf");
  assert.equal(dataset.meta.startPdfPage, 142);
  assert.equal(dataset.meta.endPdfPage, 404);
  assert.ok(Number(dataset.meta.recordCount) >= 5400);
  assert.ok(Number(dataset.meta.groupCount) >= 1840);
});

test("extracts Fudan group 10101 with official plans, fees, duration, and remarks", () => {
  const fudanGroup01 = groupByCode("10101");
  const archeology = fudanGroup01.majors.find((major) => major.majorCode === "05");
  const firstMajor = fudanGroup01.majors.find((major) => major.majorCode === "01");

  assert.equal(fudanGroup01.schoolName, "复旦大学");
  assert.equal(fudanGroup01.groupName, "复旦大学(01)");
  assert.equal(fudanGroup01.subjectRequirement, "不限");
  assert.equal(fudanGroup01.groupPlan2026, 45);
  assert.match(fudanGroup01.groupRemarks, /办学点：校本部/);
  assert.equal(fudanGroup01.majors.length, 12);

  assert.ok(firstMajor);
  assert.equal(firstMajor.majorName, "社会科学试验班(相辉学堂长水计划)");
  assert.equal(firstMajor.duration, "4");
  assert.equal(firstMajor.plan2026, 2);
  assert.equal(firstMajor.tuition, 7150);
  assert.match(firstMajor.remarks, /PPE/);

  assert.ok(archeology);
  assert.equal(archeology.majorName, "考古学");
  assert.equal(archeology.duration, "4");
  assert.equal(archeology.plan2026, 2);
  assert.equal(archeology.tuition, 6500);
  assert.equal(archeology.languageRequirement, "不限");
  assert.match(archeology.remarks, /考古学博雅班/);
});

test("extracts Shanghai Jiao Tong group 10201 across page breaks", () => {
  const sjtuGroup01 = groupByCode("10201");
  const robot = sjtuGroup01.majors.find((major) => major.majorCode === "06");
  const ieee = sjtuGroup01.majors.find((major) => major.majorCode === "03");

  assert.equal(sjtuGroup01.schoolName, "上海交通大学");
  assert.equal(sjtuGroup01.groupName, "上海交大(01)");
  assert.equal(sjtuGroup01.subjectRequirement, "物和化");
  assert.equal(sjtuGroup01.groupPlan2026, 10);
  assert.equal(sjtuGroup01.majors.length, 9);

  assert.ok(ieee);
  assert.equal(ieee.majorName, "电子信息类(IEEE试点班)");
  assert.equal(ieee.duration, "4");
  assert.equal(ieee.plan2026, 1);
  assert.match(ieee.remarks, /计算机科学与技术/);

  assert.ok(robot);
  assert.equal(robot.majorName, "机器人工程(自主智能领军班)");
  assert.equal(robot.plan2026, 1);
  assert.equal(robot.tuition, 7700);
});
