import test from "node:test";
import assert from "node:assert/strict";
import { selectionGuide } from "../data/selection-guides";

test("exposes headline strong-foundation school cards and status panels", () => {
  assert.equal(selectionGuide.qiangji.statusPanels.length, 2);
  assert.ok(selectionGuide.qiangji.statusPanels.every((item) => Array.isArray(item.bullets)));
  assert.equal(selectionGuide.qiangji.headlineSchoolCards.length, 7);
  assert.equal(selectionGuide.qiangji.headlineSchoolCards[0]?.school, "清华大学");
  assert.ok(selectionGuide.qiangji.headlineSchoolCards.every((item) => typeof item.status === "string"));
});

test("keeps focused cases separate from summary notes", () => {
  assert.deepEqual(
    selectionGuide.qiangji.focusSchoolCases.map((item) => item.school),
    ["复旦大学强基批", "清华大学强基批", "上海交通大学强基批"],
  );
  assert.ok(selectionGuide.qiangji.focusSchoolCases.every((item) => Array.isArray(item.steps)));
  assert.deepEqual(
    selectionGuide.qiangji.headlineSchoolNotes.map((item) => item.school),
    ["北京大学", "浙江大学", "南京大学", "中国科学技术大学"],
  );
  assert.ok(selectionGuide.qiangji.headlineSchoolNotes.every((item) => Array.isArray(item.notes)));
});

test("adds an HKU reminder with Shanghai teaching-base wording", () => {
  assert.match(selectionGuide.qiangji.hongKongReminder.title, /港大/);
  assert.match(selectionGuide.qiangji.hongKongReminder.bullets.join(" "), /上海教研基地/);
});
