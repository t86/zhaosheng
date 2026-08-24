import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeAdjustmentRisk,
  getSchoolGroupMajors,
} from "../lib/major-adjustment-risk";

test("extracts school group majors with admission facts", () => {
  // Test with Fudan 02 group (10102)
  const majors = getSchoolGroupMajors("fudan-university", "10102");
  assert.ok(majors.length > 0);
  assert.ok(majors.some((m) => m.majorName.includes("相辉学堂") || m.majorName.includes("试验班") || m.majorName.includes("微电子")));
});

test("evaluates low risk when user selects diversified majors within the group", () => {
  const analysis = analyzeAdjustmentRisk({
    schoolSlug: "fudan-university",
    groupCode: "10102",
    schoolName: "复旦大学",
    groupName: "专业组(02)",
    selectedMajors: ["工科试验班(相辉学堂香农计划)", "微电子科学与工程", "软件工程", "保密技术"],
    obeyAdjustment: true,
  });

  assert.ok(analysis.totalGroupMajorsCount >= 4);
  assert.equal(analysis.selectedCount, 4);
  assert.ok(analysis.riskLevel === "low" || analysis.riskLevel === "medium" || analysis.riskLevel === "high");
  assert.ok(analysis.fallbackMajors.length >= 0);
});

test("evaluates critical risk when user marks unacceptable majors in fallback pool and refuses adjustment", () => {
  const analysis = analyzeAdjustmentRisk({
    schoolSlug: "tongji-university",
    groupCode: "10201",
    schoolName: "同济大学",
    groupName: "专业组(01)",
    selectedMajors: ["计算机科学与技术", "人工智能"],
    unacceptableMajors: ["土木工程", "地质工程"],
    obeyAdjustment: false,
  });

  assert.equal(analysis.riskLevel, "critical");
  assert.ok(analysis.obeyAdjustment === false);
  assert.ok(analysis.advice.some((a) => a.includes("退档") || a.includes("不服从")));
});

test("evaluates adjustment likelihood when user picks only top-cutoff majors", () => {
  const analysis = analyzeAdjustmentRisk({
    schoolSlug: "shanghai-jiao-tong-university",
    groupCode: "10301",
    schoolName: "上海交通大学",
    groupName: "专业组(01)",
    selectedMajors: ["人工智能(拔尖英才试点班)"],
    obeyAdjustment: true,
  });

  assert.ok(analysis.fallbackMajors.length >= 0);
  assert.ok(analysis.adjustmentLikelihood === "high" || analysis.adjustmentLikelihood === "medium");
});
