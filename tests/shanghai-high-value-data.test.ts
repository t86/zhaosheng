import test from "node:test";
import assert from "node:assert/strict";
import { getShanghaiHighValueDataStatus } from "../lib/shanghai-high-value-data";

test("reports pending import status when manual datasets are empty", () => {
  const status = getShanghaiHighValueDataStatus();

  assert.equal(status.length, 3);
  assert.equal(status[0]?.metricLabel, "平均分位次");
  assert.equal(status[0]?.statusLabel, "待导入");
  assert.equal(status[0]?.importedCount, "0 条");
  assert.equal(status[1]?.metricLabel, "各专业录取人数");
  assert.equal(status[2]?.metricLabel, "在沪计划数");
  assert.match(status[2]?.summary ?? "", /专业目录/);
});
