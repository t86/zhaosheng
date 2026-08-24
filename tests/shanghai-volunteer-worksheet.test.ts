import test from "node:test";
import assert from "node:assert/strict";
import {
  createEmptyVolunteerWorksheet,
  diagnoseVolunteerWorksheet,
  exportWorksheetToCsv,
  exportWorksheetToText,
  sortWorksheetByScore,
} from "../lib/shanghai-volunteer-worksheet";

test("creates a 24-slot empty volunteer worksheet", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  assert.equal(worksheet.length, 24);
  assert.equal(worksheet[0]?.index, 1);
  assert.equal(worksheet[23]?.index, 24);
  assert.equal(worksheet[0]?.schoolName, "");
  assert.equal(worksheet[0]?.obeyAdjustment, true);
});

test("diagnoses empty and incomplete worksheets", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  const diagnosis = diagnoseVolunteerWorksheet(worksheet);

  assert.equal(diagnosis.filledCount, 0);
  assert.equal(diagnosis.isComplete, false);
  assert.ok(diagnosis.suggestions.some((s) => s.includes("尚未填满 24 个志愿")));
});

test("detects score inversion between slots", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  worksheet[0] = {
    index: 1,
    schoolName: "同济大学",
    schoolSlug: "tongji-university",
    groupCode: "1024701",
    groupName: "专业组(01)",
    lineScore: 565,
    year: 2025,
    tier: "match",
    subjectRequirement: "物和化",
    majors: ["土木工程", "软件工程"],
    obeyAdjustment: true,
  };
  // Slot 2 has HIGHER lineScore than Slot 1 (Inversion!)
  worksheet[1] = {
    index: 2,
    schoolName: "上海交通大学",
    schoolSlug: "shanghai-jiao-tong-university",
    groupCode: "1024801",
    groupName: "专业组(01)",
    lineScore: 590,
    year: 2025,
    tier: "reach",
    subjectRequirement: "物和化",
    majors: ["人工智能"],
    obeyAdjustment: true,
  };

  const diagnosis = diagnoseVolunteerWorksheet(worksheet);
  assert.equal(diagnosis.filledCount, 2);
  assert.equal(diagnosis.inversions.length, 1);
  assert.match(diagnosis.inversions[0]?.message ?? "", /倒挂/);
});

test("flags unaccepted adjustment risk (obeyAdjustment: false)", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  worksheet[0] = {
    index: 1,
    schoolName: "复旦大学",
    schoolSlug: "fudan-university",
    groupCode: "1024601",
    groupName: "专业组(01)",
    lineScore: 595,
    year: 2025,
    tier: "reach",
    subjectRequirement: "物和化",
    majors: ["微电子科学与工程"],
    obeyAdjustment: false,
  };

  const diagnosis = diagnoseVolunteerWorksheet(worksheet);
  assert.equal(diagnosis.noAdjustmentSlots.length, 1);
  assert.equal(diagnosis.noAdjustmentSlots[0], 1);
  assert.ok(diagnosis.suggestions.some((s) => s.includes("服从调剂") || s.includes("退档")));
});

test("sorts worksheet slots by score descending to fix inversions", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  worksheet[0] = {
    index: 1,
    schoolName: "低分学校",
    groupCode: "01",
    groupName: "01组",
    lineScore: 550,
    majors: [],
    obeyAdjustment: true,
  };
  worksheet[1] = {
    index: 2,
    schoolName: "高分学校",
    groupCode: "02",
    groupName: "02组",
    lineScore: 580,
    majors: [],
    obeyAdjustment: true,
  };

  const sorted = sortWorksheetByScore(worksheet);
  assert.equal(sorted[0]?.schoolName, "高分学校");
  assert.equal(sorted[0]?.index, 1);
  assert.equal(sorted[1]?.schoolName, "低分学校");
  assert.equal(sorted[1]?.index, 2);
});

test("exports worksheet to CSV with UTF-8 BOM and headers", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  worksheet[0] = {
    index: 1,
    schoolName: "浙江大学",
    schoolSlug: "zhejiang-university",
    groupCode: "1033501",
    groupName: "专业组(01)",
    lineScore: 585,
    year: 2025,
    tier: "reach",
    subjectRequirement: "物和化",
    majors: ["工科试验班(竺可桢学院)", "计算机科学与技术"],
    obeyAdjustment: true,
    notes: "首选冲刺",
  };

  const csv = exportWorksheetToCsv(worksheet);
  assert.ok(csv.startsWith("\uFEFF")); // UTF-8 BOM for Excel
  assert.match(csv, /志愿序号,院校名称,院校专业组代码,院校专业组名称/);
  assert.match(csv, /1,"浙江大学","1033501"/);
  assert.match(csv, /是/); // 服从调剂
});

test("exports worksheet to clean structured text for copying", () => {
  const worksheet = createEmptyVolunteerWorksheet();
  worksheet[0] = {
    index: 1,
    schoolName: "南京大学",
    groupCode: "1028401",
    groupName: "专业组(01)",
    lineScore: 580,
    tier: "match",
    subjectRequirement: "物和化",
    majors: ["人工智能", "软件工程"],
    obeyAdjustment: true,
  };

  const text = exportWorksheetToText(worksheet);
  assert.match(text, /上海高考 24 个院校专业组模拟志愿意向表/);
  assert.match(text, /第 01 志愿：南京大学/);
  assert.match(text, /人工智能/);
  assert.match(text, /服从调剂: 是/);
});
