import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { shanghaiDecisionGuide } from "../data/shanghai-decision-guide.ts";

test("uses the published 2026 Shanghai admission and volunteer-filing rules", () => {
  const statusText = [
    shanghaiDecisionGuide.status.title,
    shanghaiDecisionGuide.status.summary,
    ...shanghaiDecisionGuide.status.bullets,
    ...shanghaiDecisionGuide.quickRules.map((item) => item.detail),
    ...shanghaiDecisionGuide.verifiedRules.map((item) => item.detail),
  ].join(" ");

  assert.match(shanghaiDecisionGuide.status.title, /2026/);
  assert.match(statusText, /2026.*志愿填报与投档录取实施办法/);
  assert.match(statusText, /零志愿批次设置 3 个平行志愿/);
  assert.match(statusText, /本科普通批次设置 24 个平行志愿/);
  assert.match(statusText, /每个院校专业组志愿内设 4 个专业志愿/);
  assert.doesNotMatch(statusText, /仍先按 2025 年上海市教育考试院正式实施办法展示/);
  assert.doesNotMatch(statusText, /2025 官方办法明确/);
});

test("links the first official source to the 2026 implementation notice", () => {
  const firstSource = shanghaiDecisionGuide.sources[0];

  assert.match(firstSource?.label ?? "", /2026/);
  assert.equal(firstSource?.url, "https://www.shmeea.edu.cn/page/06300/20260402/20156.html");
  assert.match(firstSource?.note ?? "", /同分/);
  assert.match(firstSource?.note ?? "", /调剂/);
});

test("surfaces parent-facing 2026 tie-break, withdrawal, and solicitation risks", () => {
  const rulesText = shanghaiDecisionGuide.verifiedRules
    .map((item) => `${item.value} ${item.label} ${item.detail}`)
    .join(" ");
  const checksText = shanghaiDecisionGuide.checks
    .map((item) => `${item.title} ${item.description}`)
    .join(" ");

  assert.match(rulesText, /2次/);
  assert.match(rulesText, /本科普通批次录取完毕后开展两次征求志愿/);
  assert.match(checksText, /同分排序/);
  assert.match(checksText, /语文加数学/);
  assert.match(checksText, /专业调剂只能在被投档的院校专业组内进行/);
  assert.match(checksText, /不服从专业志愿调剂|不符合专业录取条件/);
  assert.match(checksText, /不得以自愿放弃为理由申请退档/);
});

test("surfaces official 2026 sample forms and catalog attachments", () => {
  const resourcesByTitle = new Map(
    shanghaiDecisionGuide.resources.map((resource) => [resource.title, resource]),
  );

  const expectedResources = [
    [
      "2026 本科普通批次院校专业组目录（样表）",
      "https://www.shmeea.edu.cn/download/20260402/1.pdf",
    ],
    [
      "2026 本科普通批次志愿表（样表）",
      "https://www.shmeea.edu.cn/download/20260402/8.pdf",
    ],
    [
      "2026 综合评价批次志愿表（样表）",
      "https://www.shmeea.edu.cn/download/20260402/5.pdf",
    ],
    [
      "2026 特殊类型招生志愿表（样表）",
      "https://www.shmeea.edu.cn/download/20260402/9.pdf",
    ],
  ] as const;

  for (const [title, url] of expectedResources) {
    const resource = resourcesByTitle.get(title);

    assert.ok(resource, `${title} should be exposed as an official reference`);
    assert.equal(resource.url, url);
    assert.match(resource.note, /官方附件|官方样表/);
    assert.match(resource.note, /样表/);
  }

  const resourcesText = shanghaiDecisionGuide.resources
    .map((item) => `${item.title} ${item.description} ${item.note}`)
    .join(" ");

  assert.match(resourcesText, /不等于.*正式.*专业目录|正式.*系统/);
});

test("does not hard-code the check-card section as four items", () => {
  const homepageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const shanghaiPageSource = readFileSync(
    new URL("../app/admissions/shanghai/page.tsx", import.meta.url),
    "utf8",
  );

  assert.ok(shanghaiDecisionGuide.checks.length > 4);
  assert.doesNotMatch(homepageSource, /填报前先核对这 4 件事/);
  assert.doesNotMatch(shanghaiPageSource, /填报前先核对的 4 件事/);
});
