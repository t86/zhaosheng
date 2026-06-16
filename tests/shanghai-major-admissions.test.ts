import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type ShanghaiMajorAdmissionRecord = {
  year: number;
  batch: string;
  schoolSlug: string;
  schoolName: string;
  groupCode: string;
  majorName: string;
  admittedCount: number;
  minScoreLabel: string;
  minRankLabel: string;
  minScore: number | null;
  averageScore: number;
  averageRank: number;
  sourceLabel: string;
  sourcePage: number;
};

const records = JSON.parse(
  readFileSync(new URL("../data/shanghai/high-value/major-admissions.json", import.meta.url), "utf8"),
) as ShanghaiMajorAdmissionRecord[];

test("loads the 2025 Shanghai professional admission records for priority schools", () => {
  assert.ok(records.length >= 500);
  assert.ok(new Set(records.map((record) => record.schoolSlug)).size >= 35);
  assert.deepEqual(
    Array.from(new Set(records.map((record) => record.batch))).sort(),
    ["本科提前批次", "本科普通批次", "综合评价批次", "零志愿批次"],
  );
  assert.ok(records.every((record) => record.year === 2025));
  assert.ok(records.every((record) => /上海市教育考试院/.test(record.sourceLabel)));
});

test("keeps threshold score labels instead of inventing hidden exact minimum scores", () => {
  const shannon = records.find((record) =>
    record.schoolSlug === "fudan-university" &&
    record.batch === "本科普通批次" &&
    record.groupCode === "10102" &&
    record.majorName === "工科试验班(相辉学堂香农计划)"
  );

  assert.ok(shannon);
  assert.equal(shannon.admittedCount, 8);
  assert.equal(shannon.minScoreLabel, "≥580");
  assert.equal(shannon.minRankLabel, "≤4096");
  assert.equal(shannon.minScore, null);
  assert.equal(shannon.averageScore, 619);
  assert.equal(shannon.averageRank, 119);
  assert.equal(shannon.sourcePage, 91);
});

test("contains top Shanghai major-admission examples for page previews", () => {
  const preview = records
    .filter((record) => record.averageRank != null)
    .sort((left, right) => left.averageRank - right.averageRank)
    .slice(0, 8);

  assert.equal(preview.length, 8);
  assert.ok(records.some((record) =>
    record.schoolName === "上海交通大学" &&
    record.majorName === "人工智能(拔尖英才试点班)" &&
    record.averageScore === 620 &&
    record.averageRank === 95
  ));
  assert.ok(preview[0].averageRank <= preview.at(-1)!.averageRank);
});
