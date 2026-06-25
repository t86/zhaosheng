"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import estimated2026Groups from "@/data/shanghai/estimated-2026-groups.json";
import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";
import scoreRankTable from "@/data/shanghai/score-rank-table.json";
import {
  findShanghaiEstimatedGroupsByScore,
  getShanghaiEstimatedGroupSummary,
  type ShanghaiEstimatedGroupMatch,
} from "@/lib/shanghai-estimated-groups";
import { shanghaiAllAdmissionsRecords, shanghaiAllAdmissionsMeta } from "@/lib/shanghai-all-admissions";
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
const ESTIMATED_CANDIDATE_LIMIT = 12;
const ESTIMATED_SCORE_WINDOW = 3;
const CURRENT_SCORE_YEAR = 2026;
const estimatedGroupSummary = getShanghaiEstimatedGroupSummary(estimated2026Groups);

function getDiffLabel(candidate: ShanghaiScoreRecommendationCandidate) {
  if (candidate.scoreType === "threshold") {
    return `${candidate.scoreLabel} 待核`;
  }
  if (candidate.diff > 0) {
    return `线高 ${candidate.diff} 分`;
  }
  if (candidate.diff < 0) {
    return `线低 ${Math.abs(candidate.diff)} 分`;
  }
  return "同分";
}

function getEstimatedDiffLabel(candidate: ShanghaiEstimatedGroupMatch) {
  if (candidate.diff > 0) {
    return `预估线高 ${candidate.diff} 分`;
  }
  if (candidate.diff < 0) {
    return `预估线低 ${Math.abs(candidate.diff)} 分`;
  }
  return "预估同分";
}

function getSourceTrustLabel(sourceTrust: string) {
  if (sourceTrust === "official") {
    return "官方投档线";
  }
  if (sourceTrust.includes("third-party")) {
    return "第三方参考";
  }
  return "来源待核";
}

function EstimatedGroupPanel({ groups }: { groups: ShanghaiEstimatedGroupMatch[] }) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <section className={styles.estimatePanel} aria-label="2026预估专业组匹配">
      <div className={styles.estimateHead}>
        <div>
          <span className={styles.estimateEyebrow}>新增 · 2026 预估</span>
          <h4>按你填的分数直接命中的院校专业组</h4>
        </div>
        <span className={styles.estimateCount}>{groups.length} 个附近专业组</span>
      </div>
      <p className={styles.estimateNote}>
        这组来自用户提供图片资料的第三方预估表，当前先录入上海本地院校专业组列。它适合快速定位同分/附近分组，
        正式填报仍以考试院 2026 投档结果和招生专业目录为准。
      </p>
      <ul className={styles.estimateList}>
        {groups.map((group) => {
          const schoolName = group.schoolSlug ? (
            <Link href={`/schools/${group.schoolSlug}`}>{group.schoolName}</Link>
          ) : (
            <strong>{group.schoolName}</strong>
          );

          return (
            <li className={styles.estimateCard} key={`${group.estimatedScore}-${group.groupName}`}>
              <div className={styles.estimateTopline}>
                <div>
                  {schoolName}
                  <span>
                    {group.groupName} · {group.groupCode}
                  </span>
                </div>
                <span className={styles.estimateBadge}>{getEstimatedDiffLabel(group)}</span>
              </div>
              <div className={styles.groupFacts}>
                <span>{CURRENT_SCORE_YEAR} 预估 {group.estimatedScore} 分</span>
                <span>{group.line2025 == null ? "2025线待核" : `2025线 ${group.line2025} 分`}</span>
                <span>{estimatedGroupSummary.sourceType === "third-party-estimate" ? "第三方预估" : "预估资料"}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
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
            <li className={styles.groupCard} key={`${g.schoolSlug}-${g.groupCode}-${g.year}-${g.scoreType}`}>
              <div className={styles.groupTopline}>
                <div>
                  {g.schoolSlug ? (
                    <Link href={`/schools/${g.schoolSlug}`}>{g.schoolName}</Link>
                  ) : (
                    <strong className={styles.schoolNameText}>{g.schoolName}</strong>
                  )}
                  <span className={styles.groupName}>
                    {g.groupName} · {g.groupCode}
                  </span>
                </div>
                <span className={styles.diffBadge}>{getDiffLabel(g)}</span>
              </div>
              <div className={styles.groupFacts}>
                <span>{g.year} 组线 {g.scoreType === "threshold" ? g.scoreLabel : `${g.lineScore} 分`}</span>
                <span>
                  {CURRENT_SCORE_YEAR} 位次折算到 {g.year} ≈ {g.comparisonScore} 分
                </span>
                <span>选科 {g.subjectRequirement ?? "待核"}</span>
                <span>{getSourceTrustLabel(g.sourceTrust)}</span>
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
              {g.schoolSlug ? (
                <Link className={styles.detailLink} href={`/schools/${g.schoolSlug}`}>
                  看学校详情 →
                </Link>
              ) : null}
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
            admissionRecords: shanghaiAllAdmissionsRecords,
            majorAdmissionRecords: shanghaiMajorAdmissionsRecords,
            options: {
              candidateLimitPerTier: CANDIDATE_LIMIT_PER_TIER,
              subjectRequirement: subjectRequirement === "all" ? undefined : subjectRequirement,
              scoreYear: CURRENT_SCORE_YEAR,
              scoreRankTable,
            },
          })
        : null,
    [subjectRequirement, target, valid],
  );
  const estimatedGroups = useMemo(
    () =>
      valid
        ? findShanghaiEstimatedGroupsByScore(estimated2026Groups, {
            score: target,
            window: ESTIMATED_SCORE_WINDOW,
            limit: ESTIMATED_CANDIDATE_LIMIT,
          })
        : [],
    [target, valid],
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
          <EstimatedGroupPanel groups={estimatedGroups} />
          <div className={styles.grid}>
            <TierColumn tier="reach" groups={result.reach} totalCount={result.totalCounts.reach} />
            <TierColumn tier="match" groups={result.match} totalCount={result.totalCounts.match} />
            <TierColumn tier="safe" groups={result.safe} totalCount={result.totalCounts.safe} />
          </div>
          <p className={styles.caveat}>
            口径：上方“2026 预估专业组”来自用户提供图片资料，当前覆盖 {estimatedGroupSummary.recordCount} 条上海本地院校专业组预估线，
            只作考后初筛。下方冲/稳/保仍按 {CURRENT_SCORE_YEAR} 成绩分布换算到往年同位次等效分，再和各院校专业组最近一年投档线比较。
            2021-2025 官方组线已扩展为上海考试院全量本科普通批数据，共 {shanghaiAllAdmissionsRecords.length} 条，覆盖
            {shanghaiAllAdmissionsMeta.scope}。
            精确线可分冲/稳/保；“580 分及以上”属于考试院隐藏高分段精确线，只放入冲刺待核，不当作稳保结论。
            专业样例来自 2025 年专业层录取考分，正式填报还要回到当年《招生专业目录》核对完整计划、限制条件和调剂范围。
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
