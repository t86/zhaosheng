import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schoolDepthSource = readFileSync(
  new URL("../data/school-depth/data.ts", import.meta.url),
  "utf8",
);

function extractSchoolDepthBlock(slug: string) {
  const start = schoolDepthSource.indexOf(`slug: "${slug}"`);
  assert.notEqual(start, -1, `missing school depth block for ${slug}`);

  const next = schoolDepthSource.indexOf("\n  {\n    slug:", start + 1);
  return schoolDepthSource.slice(start, next === -1 ? undefined : next);
}

test("records Fudan transfer policy boundaries for medical and non-medical paths", () => {
  const text = extractSchoolDepthBlock("fudan-university");

  assert.match(text, /一年级和二年级春季学期/);
  assert.match(text, /一个转专业志愿/);
  assert.match(text, /20%/);
  assert.match(text, /5%/);
  assert.match(text, /非上海医学院专业/);
  assert.match(text, /2026年招生章程/);
});

test("records SJTU transfer policy and medical-to-non-medical risk boundary", () => {
  const text = extractSchoolDepthBlock("shanghai-jiao-tong-university");

  assert.match(text, /大一、大二、大三学年春季学期/);
  assert.match(text, /两个专业志愿/);
  assert.match(text, /第一志愿和第二志愿按顺序录取/);
  assert.match(text, /班级排名前10%/);
  assert.match(text, /转入校内其他非医学专业/);
  assert.match(text, /2026年本科生转专业/);
});
