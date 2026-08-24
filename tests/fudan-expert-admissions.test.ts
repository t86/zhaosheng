import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type Row = {
  school: string;
  batch: string;
  plan2026: number;
  isNew2026: boolean;
  history: { year: number }[];
};

test("imports the provided Fudan 2026 plan and historical mapping", () => {
  const data = JSON.parse(
    readFileSync(new URL("../data/fudan-shanghai-expert.json", import.meta.url), "utf8"),
  ) as { rows: Row[] };
  const byBatch = Object.fromEntries(
    Array.from(new Set(data.rows.map((row) => row.batch))).map((batch) => [
      batch,
      data.rows.filter((row) => row.batch === batch).reduce((sum, row) => sum + row.plan2026, 0),
    ]),
  );

  assert.equal(data.rows.length, 106);
  assert.equal(data.rows.reduce((sum, row) => sum + row.plan2026, 0), 805);
  assert.equal(data.rows.filter((row) => row.school === "复旦大学医学院").reduce((sum, row) => sum + row.plan2026, 0), 110);
  assert.equal(data.rows.filter((row) => row.isNew2026).length, 14);
  assert.deepEqual(byBatch, {
    本科提前批: 7,
    本科普通批: 198,
    综合评价: 600,
  });
  assert.ok(data.rows.some((row) => row.history.some((item) => item.year === 2023)));
});
