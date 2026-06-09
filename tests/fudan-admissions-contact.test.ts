import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { schoolMajorProfiles } from "../data/school-major-profiles.ts";

test("records Fudan admissions consultation channels from official and provided sources", () => {
  const fudanProfile = schoolMajorProfiles["fudan-university"];
  const contactText = fudanProfile?.admissionsContact?.items
    .map((item) => `${item.label} ${item.value} ${item.note ?? ""}`)
    .join(" ");
  const sourceUrls = fudanProfile?.admissionsContact?.sources.map((source) => source.url) ?? [];

  assert.match(contactText ?? "", /021-5566 6668|021-55666668/);
  assert.match(contactText ?? "", /admission@fudan\.edu\.cn/);
  assert.match(contactText ?? "", /复旦招生.*公众号/);
  assert.match(contactText ?? "", /小红书/);
  assert.match(contactText ?? "", /www\.fudan\.edu\.cn/);
  assert.match(contactText ?? "", /shmc\.fudan\.edu\.cn/);
  assert.match(contactText ?? "", /www\.ao\.fudan\.edu\.cn/);
  assert.ok(sourceUrls.includes("https://ao.fudan.edu.cn/36340/list.htm"));
  assert.ok(sourceUrls.includes("https://ao.fudan.edu.cn/36341/main.psp"));
  assert.ok(sourceUrls.includes("https://ao.fudan.edu.cn/"));
});

test("renders admissions consultation entry points on the school page", () => {
  const pageSource = readFileSync(new URL("../app/schools/[slug]/page.tsx", import.meta.url), "utf8");

  assert.match(pageSource, /admissionsContact/);
  assert.match(pageSource, /招生咨询入口/);
});
