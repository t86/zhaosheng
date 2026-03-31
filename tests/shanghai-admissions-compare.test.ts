import test from "node:test";
import assert from "node:assert/strict";
import { buildShanghaiCompareCard } from "../lib/shanghai-admissions-compare";

test("builds a compare card from exact lines and school supplement", () => {
  const card = buildShanghaiCompareCard({
    school: {
      slug: "demo-school",
      name: "示例大学",
      city: "上海",
      schoolType: "综合",
    },
    records: [
      {
        schoolSlug: "demo-school",
        schoolName: "示例大学",
        year: 2025,
        groupCode: "01",
        groupName: "工科试验班",
        score: "601",
        minScore: 601,
        scoreType: "exact",
        sourceType: "regular",
        sourceLabel: "上海考试院 2025 普通批专业组线",
        sourceUrl: "https://example.com/exact",
      },
      {
        schoolSlug: "demo-school",
        schoolName: "示例大学",
        year: 2025,
        groupCode: "Q1",
        groupName: "Q组",
        score: "580+",
        minScore: 580,
        scoreType: "threshold",
        sourceType: "q-group",
        sourceLabel: "上海考试院 2025 Q 组",
        sourceUrl: "https://example.com/q",
      },
    ],
  });

  assert.equal(card.schoolName, "示例大学");
  assert.equal(card.latestYear, "2025");
  assert.equal(card.exactLines, "1");
  assert.equal(card.thresholdLines, "1");
  assert.equal(card.qGroupLines, "1");
  assert.equal(card.readMethodTag, "含精确组线");
  assert.match(card.latestSnapshot, /工科试验班 601/);
});

test("falls back cleanly when a school has no public Shanghai records", () => {
  const card = buildShanghaiCompareCard({
    school: {
      slug: "demo-school",
      name: "示例大学",
      city: "南京",
      schoolType: "理工",
    },
    records: [],
  });

  assert.equal(card.latestYear, "待补");
  assert.equal(card.exactLines, "0");
  assert.equal(card.thresholdLines, "0");
  assert.equal(card.qGroupLines, "0");
  assert.equal(card.officialSupplement, "待补");
  assert.equal(card.latestSnapshot, "当前还没补到上海公开组线");
});
