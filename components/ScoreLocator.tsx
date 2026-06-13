"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { locateByScore, type LocatedGroup } from "@/lib/score-locator";
import styles from "./ScoreLocator.module.css";

const TIER_META = {
  reach: { label: "冲", hint: "投档线略高于你的分，可以冲一冲" },
  match: { label: "稳", hint: "投档线和你的分接近，比较稳妥" },
  safe: { label: "保", hint: "投档线明显低于你的分，作为保底" },
} as const;

const MAX_PER_TIER = 14;

function TierColumn({ tier, groups }: { tier: keyof typeof TIER_META; groups: LocatedGroup[] }) {
  const meta = TIER_META[tier];
  const shown = groups.slice(0, MAX_PER_TIER);
  const rest = groups.length - shown.length;
  return (
    <div className={`${styles.col} ${styles[tier]}`}>
      <div className={styles.colHead}>
        <span className={styles.tierBadge}>{meta.label}</span>
        <span className={styles.colCount}>{groups.length} 个专业组</span>
      </div>
      <p className={styles.colHint}>{meta.hint}</p>
      {shown.length > 0 ? (
        <ul className={styles.groupList}>
          {shown.map((g) => (
            <li key={`${g.schoolSlug}-${g.groupCode}`}>
              <Link href={`/schools/${g.schoolSlug}`}>{g.schoolName}</Link>
              <span className={styles.groupName}>{g.groupName}</span>
              <span className={styles.groupScore}>
                {g.minScore} 分 · {g.year}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>这一档暂无匹配（在已公布精确线的范围内）。</p>
      )}
      {rest > 0 ? <p className={styles.more}>还有 {rest} 个，下方筛选器可继续看</p> : null}
    </div>
  );
}

export function ScoreLocator() {
  const [input, setInput] = useState("");
  const target = Number(input);
  const valid = input.trim() !== "" && Number.isFinite(target) && target >= 400 && target <= 660;
  const result = useMemo(() => (valid ? locateByScore(target) : null), [valid, target]);

  return (
    <div className={styles.locator}>
      <div className={styles.head}>
        <div>
          <h3 className={styles.title}>先按分数看现实区间</h3>
          <p className={styles.lead}>
            还不知道这个分能上哪？输入高考分（或预估分），先把全部选择收敛成冲/稳/保三档，再往下用筛选器细看。
          </p>
        </div>
        <label className={styles.inputWrap}>
          <span>高考分</span>
          <input
            className={styles.input}
            inputMode="numeric"
            placeholder="如 580"
            value={input}
            onChange={(event) => setInput(event.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
          />
        </label>
      </div>

      {result ? (
        <>
          <div className={styles.grid}>
            <TierColumn tier="reach" groups={result.reach} />
            <TierColumn tier="match" groups={result.match} />
            <TierColumn tier="safe" groups={result.safe} />
          </div>
          <p className={styles.caveat}>
            口径：以上是各院校专业组最近一年的<strong>精确投档线</strong>，不是单个专业最低分；分层只是量级参考，志愿仍要结合位次、招生计划和当年波动。
            复旦、交大等头部校大量专业组只公布“580 分及以上”阈值、无法精确定位，
            高分段请直接看下方筛选器与各校页的精确分表。
          </p>
        </>
      ) : (
        <p className={styles.placeholder}>
          输入一个 400–660 之间的分数试试。{input.trim() !== "" && !valid ? "（请输入有效分数）" : ""}
        </p>
      )}
    </div>
  );
}
