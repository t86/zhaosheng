import test from "node:test";
import assert from "node:assert/strict";
import { buildSchoolRiskCard } from "../lib/school-risk-card";

test("falls back to pending Shanghai coverage when no school-specific signals exist", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [],
  });

  assert.equal(card.statusLabel, "上海口径待补");
  assert.equal(card.evidences[0]?.title, "当前还没补到稳定的上海公开线");
});

test("surfaces exact lines, threshold records, school supplement and Shanghai special-track files", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [
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
    shanghaiFocus: {
      schoolSlug: "demo-school",
      schoolName: "示例大学",
      is985: true,
      badge: "985主池",
      note: "学校官网还公开了学校线，可补充理解高分段口径。",
      records: [
        {
          year: 2025,
          label: "上海",
          score: "615",
          grain: "school-line",
          sourceKind: "school-official",
          sourceLabel: "示例大学本科招生网 · 录取分数线",
          sourceUrl: "https://example.com/focus",
        },
      ],
      sources: [
        {
          label: "示例大学本科招生网 · 录取分数线",
          url: "https://example.com/focus",
          note: "学校官网公开到学校线。",
        },
      ],
    },
    majorProfile: {
      featuredTracks: [
        {
          name: "电子信息类（IEEE试点班）",
          category: "试点班",
          route: "上海 2025 综合评价批次直招",
          tags: ["电子信息", "上海招生口径"],
          note: "当前站点只依据学校在沪官方 PDF 挂接此直招口径。",
          sources: [
            {
              label: "示例大学 2025 年在上海市综合评价批次专业组及科目要求",
              url: "https://example.com/shanghai-track",
              note: "官方 PDF 中直接列出专业组和科目要求。",
              sourceType: "official",
            },
          ],
        },
      ],
    },
  });

  assert.ok(card.evidences.some((item) => item.title === "上海考试院已公开院校专业组线"));
  assert.ok(card.evidences.some((item) => item.title === "高分段仍有阈值口径"));
  assert.ok(card.evidences.some((item) => item.title === "学校官网还有补充分数口径"));
  assert.ok(card.evidences.some((item) => item.title === "特色项目已核到上海批次要求文件"));
});

test("surfaces cooperation, internal-selection and long-cycle training signals from featured tracks", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [],
    majorProfile: {
      featuredTracks: [
        {
          name: "工科试验班类（中外合作办学，中法未来科技试验班）",
          category: "试验班",
          route: "高考直招",
          tags: ["中外合作办学", "杭州校区", "本硕贯通"],
          note: "招生阶段就已绑定合作培养模式与后续深造路径。",
          sources: [
            {
              label: "示例大学 2025 年本科招生专业",
              url: "https://example.com/cooperation",
              note: "官方招生 PDF，明确联合培养与学制安排。",
              sourceType: "official",
            },
          ],
        },
        {
          name: "致远学院计算机科学方向（ACM班）",
          category: "荣誉方向",
          route: "校内荣誉方向/二次选拔",
          tags: ["计算机", "校内选拔"],
          note: "不应被误读成普通高考直接专业。",
          sources: [
            {
              label: "示例大学 ACM 班成立周年大会",
              url: "https://example.com/internal",
              note: "官方新闻，说明校内培养定位。",
              sourceType: "official_story",
            },
          ],
        },
      ],
    },
  });

  assert.ok(card.evidences.some((item) => item.title === "中外合作或异地培养项目要单独核"));
  assert.ok(card.evidences.some((item) => item.title === "不是所有强班都能在普通批直接锁定"));
  assert.ok(card.evidences.some((item) => item.title === "部分项目天然偏长周期深造"));
});
