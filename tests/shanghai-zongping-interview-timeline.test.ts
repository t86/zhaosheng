import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  getShanghaiZongpingInterviewTimelineSummary,
  shanghaiZongpingInterviewTimeline,
  shanghaiZongpingInterviewTimelineMeta,
} from "../data/shanghai-zongping-interview-timeline.ts";

test("keeps the 2026 Shanghai zongping interview timeline source-backed", () => {
  const summary = getShanghaiZongpingInterviewTimelineSummary();

  assert.equal(shanghaiZongpingInterviewTimelineMeta.year, 2026);
  assert.equal(summary.schoolCount, 11);
  assert.equal(summary.firstDate, "2026-07-06");
  assert.equal(summary.lastDate, "2026-07-07");
  assert.equal(summary.sourceCheckedCount, 11);
  assert.ok(summary.officialCount >= 7);
  assert.equal(summary.dateBuckets["7月6日-7日"], 2);
  assert.equal(summary.dateBuckets["7月6日"], 9);
  assert.ok(shanghaiZongpingInterviewTimeline.every((entry) => entry.sourceUrl.startsWith("https://")));
});

test("captures key school-specific interview arrangements", () => {
  const fudan = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "复旦大学");
  const sjtu = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "上海交通大学");
  const sisu = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "上海外国语大学");
  const zju = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "浙江大学");
  const shu = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "上海大学");
  const shutcm = shanghaiZongpingInterviewTimeline.find((entry) => entry.school === "上海中医药大学");

  assert.equal(fudan?.startDate, "2026-07-06");
  assert.equal(fudan?.endDate, "2026-07-07");
  assert.match(sjtu?.location ?? "", /闵行校区/);
  assert.match(sisu?.timeLabel ?? "", /14:00/);
  assert.match(sisu?.format ?? "", /英语面试/);
  assert.match(zju?.location ?? "", /海宁国际校区/);
  assert.match(zju?.reportLabel ?? "", /12:30-13:30/);
  assert.match(shu?.location ?? "", /宝山校区B楼3楼/);
  assert.match(shutcm?.location ?? "", /金科路3528号/);
});

test("renders the zongping interview timeline on the selection page", () => {
  const selectionPageSource = readFileSync(new URL("../app/selection/page.tsx", import.meta.url), "utf8");
  const selectionCssSource = readFileSync(new URL("../app/selection/page.module.css", import.meta.url), "utf8");

  assert.match(selectionPageSource, /shanghaiZongpingInterviewTimeline/);
  assert.match(selectionPageSource, /2026 校测时间线/);
  assert.match(selectionPageSource, /ZongpingInterviewTimelineTable/);
  assert.match(selectionCssSource, /zongpingTimelineTable/);
  assert.match(selectionCssSource, /timelineTrustBadge/);
});
