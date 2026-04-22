import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("homepage exposes the advice library in feature cards", () => {
  const pageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(pageSource, /专业建议笔记库/);
  assert.match(pageSource, /href: "\/advice"/);
  assert.match(pageSource, /打开专业建议/);
});
