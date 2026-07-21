import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { selectionGuide } from "../data/selection-guides.ts";
import { qiangjiShanghai2026 } from "../data/qiangji-shanghai-2026.ts";

test("exposes headline strong-foundation school cards and status panels", () => {
  assert.equal(selectionGuide.qiangji.statusPanels.length, 1);
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
  const pkuCard = selectionGuide.qiangji.headlineSchoolCards.find(
    (item) => item.school === "北京大学",
  );
  const njuCard = selectionGuide.qiangji.headlineSchoolCards.find(
    (item) => item.school === "南京大学",
  );
  const tsinghuaCard = selectionGuide.qiangji.headlineSchoolCards.find(
    (item) => item.school === "清华大学",
  );
  const ustcCard = selectionGuide.qiangji.headlineSchoolCards.find(
    (item) => item.school === "中国科学技术大学",
  );

  assert.deepEqual(statuses, ["截至 2026-04-15 已发布 2026 简章"]);
  assert.match(selectionGuide.qiangji.disclaimer, /2026-04-15/);
  assert.match(selectionGuide.qiangji.disclaimer, /清华/);
  assert.match(selectionGuide.qiangji.disclaimer, /复旦/);
  assert.match(selectionGuide.qiangji.disclaimer, /浙大/);
  assert.match(selectionGuide.qiangji.disclaimer, /北大/);
  assert.match(selectionGuide.qiangji.disclaimer, /上交/);
  assert.match(selectionGuide.qiangji.disclaimer, /南大/);
  assert.match(selectionGuide.qiangji.disclaimer, /中科大/);
  assert.equal(sjtuCard?.coverageLevel, "official-2026");
  assert.equal(sjtuCard?.updateStatus, "official-2026");
  assert.match(sjtuCard?.status ?? "", /2026/);
  assert.equal(pkuCard?.coverageLevel, "official-2026");
  assert.equal(njuCard?.coverageLevel, "official-2026");
  assert.equal(tsinghuaCard?.coverageLevel, "official-2026");
  assert.equal(tsinghuaCard?.updateStatus, "official-2026");
  assert.match(tsinghuaCard?.status ?? "", /2026/);
  assert.equal(ustcCard?.coverageLevel, "official-2026");
  assert.equal(ustcCard?.updateStatus, "official-2026");
  assert.match(ustcCard?.qualificationRule ?? "", /2026|4 倍|综合面试/);
});

test("adds explicit who-should-apply and preparation guidance for strong foundation readers", () => {
  const audienceTitles = selectionGuide.qiangji.audiencePanels.map((item) => item.title);
  const prepTitles = selectionGuide.qiangji.preparationPanels.map((item) => item.title);
  const allAudienceText = selectionGuide.qiangji.audiencePanels
    .flatMap((item) => [item.title, item.subtitle ?? "", ...item.bullets, item.note ?? ""])
    .join(" ");
  const allPrepText = selectionGuide.qiangji.preparationPanels
    .flatMap((item) => [item.title, item.subtitle ?? "", ...item.bullets, item.note ?? ""])
    .join(" ");

  assert.deepEqual(audienceTitles, ["什么样的孩子更适合强基", "什么样的孩子不太适合强基", "报名前先问孩子的 3 个问题"]);
  assert.deepEqual(prepTitles, ["先定学校与专业方向", "按校测模式准备", "把材料、体测和时间线排实", "高考后只做确认，不临时起意"]);
  assert.match(allAudienceText, /单校重仓/);
  assert.match(allAudienceText, /长期深造/);
  assert.match(allPrepText, /体育测试/);
  assert.match(allPrepText, /报名材料/);
  assert.match(allPrepText, /校测/);
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

test("updates homepage and timeline copy to foreground Shanghai top-score strong foundation judgment", () => {
  const homeSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const timelineSource = readFileSync(new URL("../app/timeline/page.tsx", import.meta.url), "utf8");

  assert.match(homeSource, /上海高分家庭/);
  assert.match(homeSource, /单校判断/);
  assert.match(homeSource, /适合什么样的孩子/);
  assert.match(timelineSource, /强基准备不是 6 月才开始/);
  assert.match(timelineSource, /高二下/);
});

test("imports 2026 Shanghai strong foundation spreadsheet data into selection page", () => {
  const selectionPageSource = readFileSync(new URL("../app/selection/page.tsx", import.meta.url), "utf8");
  const tsinghua = qiangjiShanghai2026.schools.find((item) => item.school === "清华大学");
  const fudan = qiangjiShanghai2026.schools.find((item) => item.school === "复旦大学");
  const disciplineSchools = qiangjiShanghai2026.disciplineRatings.map((item) => item.school);

  assert.equal(qiangjiShanghai2026.stats.schoolCount, 29);
  assert.equal(qiangjiShanghai2026.stats.majorRowCount, 253);
  assert.equal(qiangjiShanghai2026.stats.disciplineSchoolCount, 29);
  assert.equal(qiangjiShanghai2026.stats.timingCounts["出分前校测"], 12);
  assert.equal(qiangjiShanghai2026.stats.timingCounts["出分后校测"], 15);
  assert.ok(tsinghua?.majors.some((item) => item.major === "数学与应用数学"));
  assert.ok(fudan?.majors.some((item) => item.major.includes("信息与计算科学")));
  assert.ok(disciplineSchools.includes("北京大学"));
  assert.match(selectionPageSource, /qiangjiShanghai2026/);
  assert.match(selectionPageSource, /2026 对沪招生汇总/);
});

test("uses 2026 Shanghai comprehensive evaluation cutoff lines", () => {
  const { cutoffTable } = selectionGuide.zongping;
  const byGroup = new Map(cutoffTable.rows.map((row) => [row.group, row]));
  const selectionPageSource = readFileSync(new URL("../app/selection/page.tsx", import.meta.url), "utf8");
  const dialogComponentSource = readFileSync(
    new URL("../app/selection/ZongpingCutoffTable.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(cutoffTable.year, 2026);
  assert.equal(byGroup.get("复旦大学(01)")?.cutoff, "583");
  assert.equal(byGroup.get("上海交大(01)")?.cutoff, "612");
  assert.ok(byGroup.get("上海交大(01)")?.majors.includes("人工智能(拔尖英才试点班)"));
  assert.ok(byGroup.get("上海交大(02)")?.majors.some((item) => item.includes("工科试验班类")));
  assert.ok(byGroup.get("交大医学(01)")?.majors.some((item) => item.includes("临床医学")));
  assert.equal(byGroup.get("上海财大(01)")?.cutoff, "569");
  assert.equal(byGroup.get("上海财大(02)")?.cutoff, "570");
  assert.equal(byGroup.get("上海财大(03)")?.cutoff, "573");
  assert.ok(byGroup.get("上海财大(03)")?.majors.includes("统计学类"));
  assert.equal(byGroup.get("上海外大(01)")?.cutoff, "560");
  assert.equal(byGroup.get("上海外大(02)")?.cutoff, "560");
  assert.equal(byGroup.get("上海外大(03)")?.cutoff, "561");
  assert.equal(byGroup.get("浙江大学(01)")?.cutoff, "未公布");
  assert.ok(cutoffTable.rows.every((row) => row.majors.length > 0));
  assert.ok(cutoffTable.rows.every((row) => row.detailNote.length > 0));
  assert.match(cutoffTable.notes.join(" "), /上海考试院/);
  assert.match(cutoffTable.notes.join(" "), /第三方汇总/);
  assert.match(selectionPageSource, /ZongpingCutoffTable/);
  assert.match(dialogComponentSource, /role="dialog"/);
  assert.match(dialogComponentSource, /看专业/);
});

test("records 2026 Fudan and SJTU comprehensive evaluation admission structure", () => {
  const stats = selectionGuide.zongping.majorAdmissionStats;
  const selectionPageSource = readFileSync(new URL("../app/selection/page.tsx", import.meta.url), "utf8");
  const bySchool = new Map(stats.schools.map((school) => [school.school, school]));
  const fudan = bySchool.get("复旦大学");
  const sjtu = bySchool.get("上海交通大学");

  assert.equal(stats.year, 2026);
  assert.match(stats.sourceLabel, /InfCoding/);
  assert.equal(fudan?.total, 600);
  assert.equal(fudan?.items.reduce((sum, item) => sum + item.count, 0), 600);
  assert.equal(fudan?.items[0]?.major, "工科试验班");
  assert.equal(fudan?.items[0]?.count, 172);
  assert.equal(sjtu?.total, 710);
  assert.equal(sjtu?.items.reduce((sum, item) => sum + item.count, 0), 710);
  assert.equal(sjtu?.items[0]?.major, "工科试验班类（机电类）");
  assert.equal(sjtu?.items[0]?.count, 169);
  assert.ok(sjtu?.items.some((item) => item.major.includes("计算机永强试验班") && item.count === 2));
  assert.match(selectionPageSource, /zongping-admission-structure/);
  assert.match(selectionPageSource, /MajorAdmissionStructureSection/);
});
