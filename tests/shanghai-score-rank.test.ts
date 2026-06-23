import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { scoreToRankInRows } from "../lib/score-rank-core.ts";

type ScoreRankData = {
  meta: {
    desc: string;
    years: Record<
      string,
      {
        controlLine: number | null;
        anchors: number;
        sparse: boolean;
        range: [number, number];
        monotonic: boolean;
      }
    >;
  };
  table: Record<string, [number, number][]>;
};

const scoreRankData = JSON.parse(
  readFileSync(new URL("../data/shanghai/score-rank-table.json", import.meta.url), "utf8"),
) as ScoreRankData;
const rankConverterSource = readFileSync(new URL("../components/RankConverter.tsx", import.meta.url), "utf8");
const scoreRankSource = readFileSync(new URL("../lib/score-rank.ts", import.meta.url), "utf8");

test("includes the 2026 Shanghai score distribution as an official per-score table", () => {
  const meta2026 = scoreRankData.meta.years["2026"];
  const rows2026 = scoreRankData.table["2026"];

  assert.ok(meta2026);
  assert.ok(rows2026);
  assert.equal(meta2026.controlLine, 403);
  assert.equal(meta2026.anchors, 214);
  assert.equal(meta2026.sparse, false);
  assert.equal(meta2026.monotonic, true);
  assert.deepEqual(meta2026.range, [403, 616]);

  assert.equal(rows2026.length, 214);
  assert.deepEqual(rows2026[0], [616, 58]);
  assert.deepEqual(rows2026.find(([score]) => score === 572), [572, 4460]);
  assert.deepEqual(rows2026.find(([score]) => score === 500), [500, 24989]);
  assert.deepEqual(rows2026.at(-1), [403, 51853]);

  for (let index = 0; index < rows2026.length - 1; index += 1) {
    const [score, rank] = rows2026[index];
    const [nextScore, nextRank] = rows2026[index + 1];
    assert.equal(score - nextScore, 1);
    assert.ok(rank < nextRank, `${score} should have a smaller cumulative rank than ${nextScore}`);
  }
});

test("score to rank conversion returns the actual lowest anchor instead of the top bucket", () => {
  const rows2026 = scoreRankData.table["2026"];
  const rows2025 = scoreRankData.table["2025"];

  assert.equal(scoreToRankInRows(rows2026, 616), 58);
  assert.equal(scoreToRankInRows(rows2026, 403), 51853);
  assert.equal(scoreToRankInRows(rows2025, 500), 24251);
});

test("rank converter copy and comments reflect the 2021-2026 per-score source set", () => {
  assert.match(scoreRankData.meta.desc, /2021-2026/);
  assert.match(rankConverterSource, /2021-2026 成绩分布表/);
  assert.match(scoreRankSource, /2021-2026 均为逐分/);
});
