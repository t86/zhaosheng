import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { shanghaiEarlyExamFocus } from "../data/senior-spring-timeline.ts";

test("surfaces Shanghai spring exam and January foreign-language milestones", () => {
  const milestoneText = shanghaiEarlyExamFocus.milestones
    .map((item) => `${item.date} ${item.title} ${item.detail}`)
    .join(" ");
  const strategyText = shanghaiEarlyExamFocus.strategyCards
    .map((item) => `${item.title} ${item.body}`)
    .join(" ");

  assert.match(shanghaiEarlyExamFocus.title, /春考/);
  assert.match(shanghaiEarlyExamFocus.title, /小三门|等级考/);
  assert.match(milestoneText, /1月3日.*语文.*数学/);
  assert.match(milestoneText, /1月4日.*外语笔试/);
  assert.match(milestoneText, /1月5日.*外语听说测试/);
  assert.match(milestoneText, /1月21日.*成绩.*最低控制线/);
  assert.match(milestoneText, /1月30日-31日.*填报志愿/);
  assert.match(milestoneText, /2月5日.*自主测试资格线/);
  assert.match(milestoneText, /2月6日-7日.*选择.*时间.*地点/);
  assert.match(milestoneText, /2月28日-3月1日.*自主测试/);
  assert.match(milestoneText, /3月6日-7日.*录取专业信息登记/);
  assert.match(strategyText, /1月外语.*外语一考/);
  assert.match(strategyText, /高分.*6月外语/);
  assert.match(strategyText, /两次外语.*语种必须一致/);
});

test("surfaces spring-admission decision facts beyond the raw timeline", () => {
  const decisionText = shanghaiEarlyExamFocus.springDecisionCards
    .map((item) => `${item.title} ${item.body}`)
    .join(" ");

  assert.match(decisionText, /251分/);
  assert.match(decisionText, /只是具备.*填报志愿.*资格/);
  assert.match(decisionText, /不等于.*自主测试资格/);
  assert.match(decisionText, /26所.*本科/);
  assert.match(decisionText, /116个.*专业/);
  assert.match(decisionText, /3639个.*计划/);
  assert.match(decisionText, /最多.*2个专业志愿/);
  assert.match(decisionText, /同一所院校的2个专业/);
  assert.match(decisionText, /不同院校的各1个专业/);
  assert.match(decisionText, /不填报春招志愿.*秋季统一高考/);
  assert.match(decisionText, /男女比例|身体条件|招生章程/);
});

test("surfaces spring pre-admission and waitlist confirmation rules", () => {
  const confirmationText = shanghaiEarlyExamFocus.confirmationCards
    .map((item) => `${item.title} ${item.body}`)
    .join(" ");

  assert.match(confirmationText, /两个专业预录取资格/);
  assert.match(confirmationText, /3月6日9:00-15:00/);
  assert.match(confirmationText, /一个专业预录取.*一个专业候补/);
  assert.match(confirmationText, /两个专业候补/);
  assert.match(confirmationText, /3月7日9:00-12:00/);
  assert.match(confirmationText, /一个专业预录取资格.*默认被预录取/);
  assert.match(confirmationText, /一个专业候补.*不一定会被录取/);
  assert.match(confirmationText, /红色按钮提交选择/);
  assert.match(confirmationText, /截止时间后.*不得修改/);
});

test("surfaces Shanghai grade-exam subject schedule and cautions", () => {
  const gradeExamText = shanghaiEarlyExamFocus.gradeExamCards
    .map((item) => `${item.title} ${item.body}`)
    .join(" ");
  const warningText = shanghaiEarlyExamFocus.warnings.join(" ");

  assert.match(gradeExamText, /5月5日.*化学.*思想政治.*物理/);
  assert.match(gradeExamText, /5月6日.*历史.*地理.*生物学/);
  assert.match(gradeExamText, /3月26日10:00.*3月28日16:00/);
  assert.match(gradeExamText, /自主选择3门/);
  assert.match(gradeExamText, /报考后不可更换考试科目/);
  assert.match(warningText, /合格性考试成绩不合格.*不得报考/);
  assert.match(warningText, /提前45分钟到达考点/);
  assert.match(warningText, /开考15分钟后禁止进入考点/);
});

test("links early-exam focus to official Shanghai sources and renders page entry points", () => {
  const timelineSource = readFileSync(new URL("../app/timeline/page.tsx", import.meta.url), "utf8");
  const homeSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const sourceUrls = shanghaiEarlyExamFocus.sources.map((item) => item.url);

  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/08000/20251118/19863.html"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/download/20251118/03.pdf"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/02100/20260316/20107.html"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/02100/20260427/20195.html"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/08000/20260127/20055.html"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/02300/20260121/20029.html"));
  assert.ok(sourceUrls.includes("https://www.shmeea.edu.cn/page/09000/20260304/20084.html"));
  assert.match(timelineSource, /shanghaiEarlyExamFocus/);
  assert.match(timelineSource, /春考\/小三门/);
  assert.match(timelineSource, /春考决策卡/);
  assert.match(timelineSource, /预录取\/候补确认/);
  assert.match(homeSource, /春考/);
  assert.match(homeSource, /外语一考/);
  assert.match(homeSource, /小三门/);
});
