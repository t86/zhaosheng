import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { videoAdviceLibrary } from "../data/video-advice.ts";

test("exposes one published advice note and two pending source records", () => {
  assert.equal(videoAdviceLibrary.publishedNotes.length, 3);
  assert.equal(videoAdviceLibrary.pendingSources.length, 0);
  assert.equal(videoAdviceLibrary.publishedNotes[0]?.slug, "electronic-information-video-note");
  assert.match(videoAdviceLibrary.publishedNotes[0]?.title ?? "", /电子信息/);
  assert.equal(videoAdviceLibrary.publishedNotes[1]?.slug, "engineering-income-video-note");
  assert.match(videoAdviceLibrary.publishedNotes[1]?.title ?? "", /工科专业/);
  assert.equal(videoAdviceLibrary.publishedNotes[2]?.slug, "engineering-ranking-video-note");
  assert.match(videoAdviceLibrary.publishedNotes[2]?.title ?? "", /工科专业收益/);
});

test("keeps the published note tied to the xiaohongshu source and professional advice positioning", () => {
  const note = videoAdviceLibrary.publishedNotes[0];

  assert.match(note?.sourceUrl ?? "", /xiaohongshu/);
  assert.match(note?.usage ?? "", /专业建议/);
  assert.ok((note?.sections.length ?? 0) >= 3);
});

test("renders a dedicated advice route with library framing", () => {
  const pageSource = readFileSync(new URL("../app/advice/page.tsx", import.meta.url), "utf8");

  assert.match(pageSource, /视频来源专业建议笔记库/);
  assert.match(pageSource, /已整理/);
  assert.match(pageSource, /3 条/);
  assert.doesNotMatch(pageSource, /待补录 1 条/);
});
