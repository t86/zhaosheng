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

test("marks 2025 official coverage separately from 2026 pending updates", () => {
  const statuses = selectionGuide.qiangji.statusPanels.map((item) => item.title);
  const sjtuCard = selectionGuide.qiangji.headlineSchoolCards.find(
    (item) => item.school === "上海交通大学",
  );

  assert.deepEqual(statuses, ["2025 官方完整口径", "2026 待更新"]);
  assert.match(selectionGuide.qiangji.disclaimer, /2025/);
  assert.match(selectionGuide.qiangji.disclaimer, /官方/);
  assert.match(selectionGuide.qiangji.disclaimer, /图片整理/);
  assert.equal(sjtuCard?.coverageLevel, "stable-2025");
  assert.equal(sjtuCard?.updateStatus, "pending-2026");
  assert.match(sjtuCard?.takeaway ?? "", /上海/);
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
  const reminderText = [
    selectionGuide.qiangji.hongKongReminder.title,
    selectionGuide.qiangji.hongKongReminder.subtitle ?? "",
    ...selectionGuide.qiangji.hongKongReminder.bullets,
    selectionGuide.qiangji.hongKongReminder.note ?? "",
  ].join(" ");

  assert.match(selectionGuide.qiangji.hongKongReminder.title, /港大/);
  assert.match(reminderText, /上海教研基地/);
  assert.doesNotMatch(reminderText, /正式校区/);
  assert.doesNotMatch(reminderText, /独立招生校区/);
});
