"use client";

import { useMemo } from "react";
import type { CompareRow } from "@/lib/build-compare-row";
import {
  generateCompareVisualMetrics,
  getCompareVerdictSummary,
  type CompareVisualMetrics,
  type CompareVerdictSummary,
} from "@/lib/school-compare-visuals";
import styles from "./SchoolCompareVisuals.module.css";

type SchoolCompareVisualsProps = {
  rows: CompareRow[];
};

export function SchoolCompareVisuals({ rows }: SchoolCompareVisualsProps) {
  const metrics: CompareVisualMetrics = useMemo(
    () => generateCompareVisualMetrics(rows),
    [rows],
  );

  const verdict: CompareVerdictSummary = useMemo(
    () => getCompareVerdictSummary(rows),
    [rows],
  );

  if (rows.length < 2) {
    return null;
  }

  const schoolColorPalette = ["#cb5235", "#16324f", "#27ae60"];

  return (
    <section className={styles.visualsContainer} aria-label="多校多维可视化对比">
      <div className={styles.visualsHead}>
        <div>
          <span className={styles.visualsBadge}>可视化横向对比</span>
          <h3 className={styles.visualsTitle}>
            {rows.map((r) => r.name).join(" vs ")} 多维对比图表
          </h3>
          <p className={styles.visualsSubtitle}>
            直观对比所选高校的保研推免率、升学率、在沪最低组线及王牌学科分布。
          </p>
        </div>
      </div>

      {/* 智能对比裁决与决策建议卡 */}
      <div className={styles.verdictCard}>
        <div className={styles.verdictHead}>
          <strong>📊 横向对比结论与关键差异</strong>
        </div>
        <ul className={styles.verdictList}>
          {verdict.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <div className={styles.takeawayBox}>
          <strong>💡 决策权衡建议：</strong>
          <p>{verdict.takeaway}</p>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        {/* 1. 保研推免率与总深造率对比条形图 */}
        <div className={styles.chartCard}>
          <div className={styles.chartCardHead}>
            <h4>保研率 / 深造率对比</h4>
            <span>官方报告口径</span>
          </div>
          <p className={styles.chartNote}>
            深色条代表本科推免保研率（部分按公示反算），浅色条代表本科总深造率（含考研/出国）。
          </p>

          <div className={styles.barStackList}>
            {metrics.advancementComparison.map((school, idx) => {
              const tuimian = school.tuimianRate ?? 0;
              const advance = school.advanceRate ?? 0;
              const color = schoolColorPalette[idx % schoolColorPalette.length];

              return (
                <div className={styles.schoolBarRow} key={school.slug}>
                  <div className={styles.barSchoolLabel}>
                    <strong>{school.name}</strong>
                    <span>{school.cohort || "—"}</span>
                  </div>

                  <div className={styles.barTrackArea}>
                    {/* 总深造率条 */}
                    <div
                      className={styles.barAdvance}
                      style={{
                        width: `${Math.min(100, (advance / metrics.maxAdvanceRate) * 100)}%`,
                        backgroundColor: color,
                        opacity: 0.25,
                      }}
                    />
                    {/* 保研推免率条 */}
                    <div
                      className={styles.barTuimian}
                      style={{
                        width: `${Math.min(100, (tuimian / metrics.maxAdvanceRate) * 100)}%`,
                        backgroundColor: color,
                      }}
                    >
                      {tuimian > 0 ? <span className={styles.barInnerVal}>{tuimian}%</span> : null}
                    </div>
                  </div>

                  <div className={styles.barValueText}>
                    {tuimian > 0 ? (
                      <strong>保研 {tuimian}%</strong>
                    ) : (
                      <span className={styles.missingVal}>保研未单列</span>
                    )}
                    {advance > 0 ? (
                      <span>总深造 {advance}%</span>
                    ) : (
                      <span className={styles.missingVal}>深造—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. 在沪最低组线门槛对比 */}
        <div className={styles.chartCard}>
          <div className={styles.chartCardHead}>
            <h4>在沪最低录取组线对比</h4>
            <span>上海最近一年</span>
          </div>
          <p className={styles.chartNote}>
            取该校在上海录取门槛最低的院校专业组投档分，用于直观感知进校底线。
          </p>

          <div className={styles.scoreCompareList}>
            {metrics.scoreComparison.map((scoreItem, idx) => {
              const color = schoolColorPalette[idx % schoolColorPalette.length];

              return (
                <div className={styles.scoreRow} key={scoreItem.slug}>
                  <div className={styles.scoreSchoolTitle}>
                    <strong style={{ color }}>{scoreItem.name}</strong>
                    <span>{scoreItem.groupName || "专业组"}</span>
                  </div>

                  <div className={styles.scoreNumberBox}>
                    {scoreItem.minScore ? (
                      <>
                        <span className={styles.bigScore}>{scoreItem.minScore}</span>
                        <span className={styles.scoreUnit}>分</span>
                        {scoreItem.scoreType === "threshold" ? (
                          <small>(控制线)</small>
                        ) : null}
                      </>
                    ) : (
                      <span className={styles.missingVal}>无公开线</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. 学科优势方向与特色矩阵 */}
      <div className={styles.disciplinesCard}>
        <div className={styles.chartCardHead}>
          <h4>王牌专业与优势方向重合度</h4>
          <span>学科评估与特色培养</span>
        </div>

        {metrics.directionsOverlap.length > 0 ? (
          <div className={styles.overlapSection}>
            <span className={styles.matrixLabel}>🤝 共同强势方向：</span>
            <div className={styles.tagsRow}>
              {metrics.directionsOverlap.map((d) => (
                <span className={styles.sharedTag} key={d}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.uniqueGrid}>
          {metrics.schools.map((s, idx) => {
            const uniqueList = metrics.uniqueDirections[s.slug] || [];
            const color = schoolColorPalette[idx % schoolColorPalette.length];

            return (
              <div className={styles.uniqueCard} key={s.slug}>
                <strong style={{ color }}>{s.name} 特色优势：</strong>
                {uniqueList.length > 0 ? (
                  <div className={styles.tagsRow}>
                    {uniqueList.map((d) => (
                      <span className={styles.uniqueTag} key={d}>
                        {d}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyNote}>全部王牌方向与对比高校有重合。</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
