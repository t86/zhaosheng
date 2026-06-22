"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";
import { shanghaiAdmissionsRecords } from "@/lib/shanghai-admissions";
import {
  recommendShanghaiGroupsByScore,
  type ShanghaiScoreRecommendationCandidate,
} from "@/lib/shanghai-score-recommendations";
import styles from "./ScoreLocator.module.css";

const TIER_META = {
  reach: { label: "冲", hint: "投档线略高于你的分，可以冲一冲" },
  match: { label: "稳", hint: "投档线和你的分接近，比较稳妥" },
  safe: { label: "保", hint: "投档线明显低于你的分，作为保底" },
} as const;

const SUBJECT_OPTIONS = [
  { value: "all", label: "全部选科" },
  { value: "不限", label: "不限" },
  { value: "物和化", label: "物理 + 化学" },
  { value: "物", label: "物理" },
  { value: "化", label: "化学" },
  { value: "生", label: "生物" },
  { value: "史", label: "历史" },
  { value: "政", label: "政治" },
] as const;

const CANDIDATE_LIMIT_PER_TIER = 8;

function getDiffLabel(diff: number) {
  if (diff > 0) {
    return `线高 ${diff} 分`;
  }
  if (diff < 0) {
    return `线低 ${Math.abs(diff)} 分`;
  }
  return "同分";
}

function TierColumn({
  tier,
  groups,
  totalCount,
}: {
  tier: keyof typeof TIER_META;
  groups: ShanghaiScoreRecommendationCandidate[];
  totalCount: number;
}) {
  const meta = TIER_META[tier];
  const rest = totalCount - groups.length;
  return (
    <div className={`${styles.col} ${styles[tier]}`}>
      <div className={styles.colHead}>
        <span className={styles.tierBadge}>{meta.label}</span>
        <span className={styles.colCount}>{totalCount} 个专业组</span>
      </div>
      <p className={styles.colHint}>{meta.hint}</p>
      {groups.length > 0 ? (
        <ul className={styles.groupList}>
          {groups.map((g) => (
            <li className={styles.groupCard} key={`${g.schoolSlug}-${g.groupCode}`}>
              <div className={styles.groupTopline}>
                <div>
                  <Link href={`/schools/${g.schoolSlug}`}>{g.schoolName}</Link>
                  <span className={styles.groupName}>
                    {g.groupName} · {g.groupCode}
                  </span>
                </div>
                <span className={styles.diffBadge}>{getDiffLabel(g.diff)}</span>
              </div>
              <div className={styles.groupFacts}>
                <span>{g.year} 组线 {g.lineScore} 分</span>
                <span>选科 {g.subjectRequirement ?? "待核"}</span>
              </div>
              {g.majorExamples.length > 0 ? (
                <div className={styles.majorExamples}>
                  {g.majorExamples.map((major) => (
                    <div className={styles.majorExample} key={`${g.groupCode}-${major.majorName}`}>
                      <strong>{major.majorName}</strong>
                      <span>
                        录取 {major.admittedCount} 人
                        {major.averageScore != null && major.averageRank != null
                          ? ` · 均分 ${major.averageScore} / 位次 ${major.averageRank}`
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.majorEmpty}>暂未接入该组 2025 专业层样例，需回到当年专业目录核对。</p>
              )}
              <Link className={styles.detailLink} href={`/schools/${g.schoolSlug}`}>
                看学校详情 →
              </Link>
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
  const [subjectRequirement, setSubjectRequirement] = useState<(typeof SUBJECT_OPTIONS)[number]["value"]>("all");
  const target = Number(input);
  const valid = input.trim() !== "" && Number.isFinite(target) && target >= 400 && target <= 660;
  const result = useMemo(
    () =>
      valid
        ? recommendShanghaiGroupsByScore({
            score: target,
            admissionRecords: shanghaiAdmissionsRecords,
            majorAdmissionRecords: shanghaiMajorAdmissionsRecords,
            options: {
              candidateLimitPerTier: CANDIDATE_LIMIT_PER_TIER,
              subjectRequirement: subjectRequirement === "all" ? undefined : subjectRequirement,
            },
          })
        : null,
    [subjectRequirement, target, valid],
  );

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
        <label className={styles.inputWrap}>
          <span>选科</span>
          <select
            className={styles.select}
            value={subjectRequirement}
            onChange={(event) => setSubjectRequirement(event.target.value as (typeof SUBJECT_OPTIONS)[number]["value"])}
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result ? (
        <>
          <div className={styles.grid}>
            <TierColumn tier="reach" groups={result.reach} totalCount={result.totalCounts.reach} />
            <TierColumn tier="match" groups={result.match} totalCount={result.totalCounts.match} />
            <TierColumn tier="safe" groups={result.safe} totalCount={result.totalCounts.safe} />
          </div>
          <p className={styles.caveat}>
            口径：以上按各院校专业组最近一年的<strong>精确投档线</strong>分层，专业样例来自 2025 年专业层录取考分。
            它能帮你快速知道“这个组大概有哪些专业”，但正式填报还要回到当年《招生专业目录》核对完整计划、限制条件和调剂范围。
            当前另有 {result.thresholdSchoolCount} 所学校存在“580 分及以上”等阈值记录，无法纳入精确冲稳保计算。
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
