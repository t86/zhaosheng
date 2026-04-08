import test from "node:test";
import assert from "node:assert/strict";
import { selectionGuide } from "../data/selection-guides";

test("exposes headline strong-foundation school cards and status panels", () => {
  assert.equal(selectionGuide.qiangji.statusPanels.length, 2);
  assert.deepEqual(
    selectionGuide.qiangji.statusPanels.map((item) => item.title),
    ["2025 官方完整口径", "2026 待更新"],
  );
  assert.equal(selectionGuide.qiangji.statusPanels[0]?.tone, "cool");
  assert.ok(selectionGuide.qiangji.statusPanels[0]?.bullets.length);
  assert.equal(selectionGuide.qiangji.headlineSchoolCards.length, 7);
  assert.equal(selectionGuide.qiangji.headlineSchoolCards[0]?.school, "清华大学");
  assert.equal(selectionGuide.qiangji.headlineSchoolCards[0]?.status, "出分后校测");
  assert.match(selectionGuide.qiangji.headlineSchoolCards[3]?.takeaway ?? "", /综评/);
});

test("keeps focused cases separate from summary notes", () => {
  assert.deepEqual(
    selectionGuide.qiangji.focusSchoolCases.map((item) => item.school),
    ["复旦大学强基批", "清华大学强基批", "上海交通大学强基批"],
  );
  assert.equal(selectionGuide.qiangji.focusSchoolCases[0]?.steps.length, 6);
  assert.equal(selectionGuide.qiangji.focusSchoolCases[0]?.infoPanels.length, 1);
  assert.deepEqual(
    selectionGuide.qiangji.headlineSchoolNotes.map((item) => item.school),
    ["北京大学", "浙江大学", "南京大学", "中国科学技术大学"],
  );
  assert.ok(selectionGuide.qiangji.headlineSchoolNotes.every((item) => item.notes.length > 0));
});

test("adds an HKU reminder with Shanghai teaching-base wording", () => {
  assert.match(selectionGuide.qiangji.hongKongReminder.title, /港大/);
  assert.equal(selectionGuide.qiangji.hongKongReminder.tone, "soft");
  assert.equal(selectionGuide.qiangji.hongKongReminder.note, "只做节奏提醒，不把港大写成内地统招正式校区。");
  assert.match(selectionGuide.qiangji.hongKongReminder.bullets.join(" "), /上海教研基地/);
});
