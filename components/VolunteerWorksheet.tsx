"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  createEmptyVolunteerWorksheet,
  diagnoseVolunteerWorksheet,
  exportWorksheetToCsv,
  exportWorksheetToText,
  sortWorksheetByScore,
  fillWorksheetFromRecommendations,
  type VolunteerSlot,
  type WorksheetDiagnosis,
  TOTAL_VOLUNTEER_SLOTS,
} from "@/lib/shanghai-volunteer-worksheet";
import {
  recommendShanghaiGroupsByScore,
  type ShanghaiScoreRecommendationCandidate,
} from "@/lib/shanghai-score-recommendations";
import { shanghaiAllAdmissionsRecords } from "@/lib/shanghai-all-admissions";
import { shanghaiMajorAdmissionsRecords } from "@/data/shanghai-major-admissions";
import { getSchoolGroupMajors } from "@/lib/major-adjustment-risk";
import styles from "./VolunteerWorksheet.module.css";

const STORAGE_KEY = "shanghai_volunteer_worksheet_v1";

const SUBJECT_OPTIONS = [
  { value: "all", label: "全部选科" },
  { value: "物和化", label: "物理 + 化学" },
  { value: "不限", label: "不限" },
  { value: "物", label: "物理" },
  { value: "化", label: "化学" },
] as const;

type VolunteerWorksheetProps = {
  initialRecommendations?: {
    reach: ShanghaiScoreRecommendationCandidate[];
    match: ShanghaiScoreRecommendationCandidate[];
    safe: ShanghaiScoreRecommendationCandidate[];
  } | null;
  onSelectSchoolGroupForRisk?: (schoolSlug: string, groupCode: string, schoolName: string, groupName: string) => void;
};

export function VolunteerWorksheet({
  initialRecommendations,
  onSelectSchoolGroupForRisk,
}: VolunteerWorksheetProps) {
  const [inputScore, setInputScore] = useState<number>(580);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string>("");

  const [slots, setSlots] = useState<VolunteerSlot[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === TOTAL_VOLUNTEER_SLOTS) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }
    return createEmptyVolunteerWorksheet();
  });
  const [copySuccess, setCopySuccess] = useState(false);

  // 变更自动同步到 LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } catch {
      // ignore
    }
  }, [slots]);

  // 初始化或当 initialRecommendations 变化时支持快速应用
  useEffect(() => {
    if (initialRecommendations) {
      const filled = fillWorksheetFromRecommendations(slots, initialRecommendations);
      setSlots(filled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRecommendations]);

  // 监听来自页面其他卡片的“加入志愿表”事件
  useEffect(() => {
    const handleAppend = (event: Event) => {
      const customEvent = event as CustomEvent<ShanghaiScoreRecommendationCandidate>;
      const candidate = customEvent.detail;
      if (!candidate) return;

      setSlots((prev) => {
        // 查找第一个空槽位
        const firstEmptyIdx = prev.findIndex((s) => !s.schoolName.trim());
        const targetIdx = firstEmptyIdx >= 0 ? firstEmptyIdx : 0;
        const next = [...prev];
        next[targetIdx] = {
          index: targetIdx + 1,
          schoolName: candidate.schoolName,
          schoolSlug: candidate.schoolSlug,
          groupCode: candidate.groupCode,
          groupName: candidate.groupName,
          lineScore: candidate.lineScore,
          year: candidate.year,
          tier: candidate.tier,
          subjectRequirement: candidate.subjectRequirement,
          majors: candidate.majorExamples.map((m) => m.majorName).slice(0, 4),
          obeyAdjustment: true,
        };
        return next;
      });

      setToastMessage(`✓ 已将 ${candidate.schoolName} ${candidate.groupName} 加入志愿表！`);
      setTimeout(() => setToastMessage(""), 3000);
    };

    window.addEventListener("append-candidate-to-worksheet", handleAppend);
    return () => {
      window.removeEventListener("append-candidate-to-worksheet", handleAppend);
    };
  }, []);

  const diagnosis: WorksheetDiagnosis = useMemo(() => diagnoseVolunteerWorksheet(slots), [slots]);

  const updateSlot = (index: number, updates: Partial<VolunteerSlot>) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.index === index ? { ...slot, ...updates } : slot)),
    );
  };

  const clearSlot = (index: number) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.index === index
          ? {
              index,
              schoolName: "",
              groupCode: "",
              groupName: "",
              majors: [],
              obeyAdjustment: true,
            }
          : slot,
      ),
    );
  };

  const moveSlot = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= TOTAL_VOLUNTEER_SLOTS) return;
    setSlots((prev) => {
      const next = [...prev];
      const temp = next[fromIdx];
      next[fromIdx] = next[toIdx];
      next[toIdx] = temp;
      return next.map((slot, idx) => ({ ...slot, index: idx + 1 }));
    });
  };

  const handleAutoSort = () => {
    setSlots((prev) => sortWorksheetByScore(prev));
  };

  const handleClearAll = () => {
    if (window.confirm("确定要清空全部 24 个志愿吗？")) {
      setSlots(createEmptyVolunteerWorksheet());
    }
  };

  // 根据当前输入的考分自动计算推荐并填入 24 志愿
  const handleGenerateAndFill = (scoreToUse: number) => {
    const recs = recommendShanghaiGroupsByScore({
      score: scoreToUse,
      admissionRecords: shanghaiAllAdmissionsRecords,
      majorAdmissionRecords: shanghaiMajorAdmissionsRecords,
      options: {
        candidateLimitPerTier: 10,
        subjectRequirement: selectedSubject === "all" ? undefined : selectedSubject,
      },
    });

    const filled = fillWorksheetFromRecommendations(slots, recs);
    setSlots(filled);
    setToastMessage(`✓ 已根据 ${scoreToUse} 分智能生成 24 志愿梯度填报表！`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleExportCsv = () => {
    const csvContent = exportWorksheetToCsv(slots);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `上海高考24院校专业组志愿意向表_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = async () => {
    const text = exportWorksheetToText(slots);
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      alert("复制失败，请手动选择复制。");
    }
  };

  return (
    <section className={styles.container} id="volunteer-worksheet">
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>实战填报工具</span>
          <h2 className={styles.title}>上海高考 24 院校专业组模拟志愿表</h2>
          <p className={styles.subtitle}>
            上海普通批可填 24 个院校专业组、每组 4 个专业 + 是否服从调剂。支持自动诊断倒挂、一键排序与导出 Excel/文本。
          </p>
        </div>

        <div className={styles.actionRow}>
          <button
            className={styles.sortBtn}
            onClick={handleAutoSort}
            title="按往年参考分从高到低排列，理顺志愿梯度"
            type="button"
          >
            ↕ 按分数自动理顺梯度
          </button>
          <button className={styles.exportBtn} onClick={handleExportCsv} type="button">
            📥 导出 CSV 表格
          </button>
          <button className={styles.copyBtn} onClick={handleCopyText} type="button">
            {copySuccess ? "✓ 已复制到剪贴板" : "📋 复制纯文本"}
          </button>
          {diagnosis.filledCount > 0 ? (
            <button className={styles.clearAllBtn} onClick={handleClearAll} type="button">
              清空全部
            </button>
          ) : null}
        </div>
      </div>

      {/* 快捷查分与一键填报条 */}
      <div className={styles.quickFillBar}>
        <div className={styles.quickFillInputs}>
          <label className={styles.quickFillLabel}>
            <span>输入高考预估分</span>
            <input
              className={styles.scoreInput}
              max={660}
              min={350}
              onChange={(e) => setInputScore(Number(e.target.value) || 0)}
              type="number"
              value={inputScore || ""}
            />
            <span className={styles.scoreUnit}>分</span>
          </label>

          <label className={styles.quickFillLabel}>
            <span>选科要求</span>
            <select
              className={styles.subjectSelect}
              onChange={(e) => setSelectedSubject(e.target.value)}
              value={selectedSubject}
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <button
            className={styles.fillBtn}
            onClick={() => handleGenerateAndFill(inputScore)}
            type="button"
          >
            ⚡ 按此考分一键生成 24 志愿
          </button>
        </div>

        {toastMessage ? <div className={styles.toastBanner}>{toastMessage}</div> : null}
      </div>

      {/* 智能诊断面板 */}
      <div className={styles.diagnosisBar}>
        <div className={styles.diagStats}>
          <div className={styles.statPill}>
            <span>已填志愿</span>
            <strong>
              {diagnosis.filledCount} / {TOTAL_VOLUNTEER_SLOTS}
            </strong>
          </div>
          <div className={styles.tierPills}>
            <span className={styles.reachPill}>冲: {diagnosis.reachCount}</span>
            <span className={styles.matchPill}>稳: {diagnosis.matchCount}</span>
            <span className={styles.safePill}>保: {diagnosis.safeCount}</span>
          </div>
        </div>

        {diagnosis.inversions.length > 0 ? (
          <div className={styles.warningAlert}>
            <strong>⚠️ 存在 {diagnosis.inversions.length} 处志愿倒挂风险：</strong>
            <span>{diagnosis.inversions[0].message}</span>
            <button className={styles.inlineFixBtn} onClick={handleAutoSort} type="button">
              一键理顺
            </button>
          </div>
        ) : null}

        {diagnosis.noAdjustmentSlots.length > 0 ? (
          <div className={styles.dangerAlert}>
            <strong>🚨 退档高危预警：</strong>
            <span>
              第 {diagnosis.noAdjustmentSlots.join("、")} 志愿未勾选“服从调剂”，若组内专业未满将面临直接退档！
            </span>
          </div>
        ) : null}

        {diagnosis.suggestions.length > 0 && diagnosis.inversions.length === 0 && diagnosis.noAdjustmentSlots.length === 0 ? (
          <div className={styles.infoAlert}>
            <span>💡 {diagnosis.suggestions[0]}</span>
          </div>
        ) : null}
      </div>

      {/* 24 志愿槽位列表 */}
      <div className={styles.slotsList}>
        {slots.map((slot, idx) => {
          const isFilled = Boolean(slot.schoolName.trim());
          const tierClass = slot.tier ? styles[slot.tier] : "";
          const groupMajors = slot.schoolSlug
            ? getSchoolGroupMajors(slot.schoolSlug, slot.groupCode)
            : [];

          return (
            <article
              className={`${styles.slotCard} ${isFilled ? styles.slotFilled : styles.slotEmpty} ${tierClass}`}
              key={slot.index}
            >
              <div className={styles.slotSidebar}>
                <span className={styles.slotIndex}>{String(slot.index).padStart(2, "0")}</span>
                <div className={styles.moveBtnGroup}>
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSlot(idx, idx - 1)}
                    title="上移"
                    type="button"
                  >
                    ▲
                  </button>
                  <button
                    disabled={idx === TOTAL_VOLUNTEER_SLOTS - 1}
                    onClick={() => moveSlot(idx, idx + 1)}
                    title="下移"
                    type="button"
                  >
                    ▼
                  </button>
                </div>
              </div>

              <div className={styles.slotMain}>
                {isFilled ? (
                  <>
                    <div className={styles.slotHeader}>
                      <div className={styles.schoolInfo}>
                        <strong className={styles.schoolName}>
                          {slot.schoolSlug ? (
                            <Link href={`/schools/${slot.schoolSlug}`}>{slot.schoolName}</Link>
                          ) : (
                            slot.schoolName
                          )}
                        </strong>
                        <span className={styles.groupBadge}>
                          {slot.groupName} ({slot.groupCode})
                        </span>
                        {slot.tier ? (
                          <span className={`${styles.tierBadge} ${styles[`tier_${slot.tier}`]}`}>
                            {slot.tier === "reach" ? "冲" : slot.tier === "match" ? "稳" : "保"}
                          </span>
                        ) : null}
                        <span className={styles.subjectText}>选科：{slot.subjectRequirement || "不限"}</span>
                        {slot.lineScore ? (
                          <span className={styles.scoreText}>往年参考分：{slot.lineScore}分</span>
                        ) : null}
                      </div>

                      <div className={styles.slotActions}>
                        {slot.schoolSlug && onSelectSchoolGroupForRisk ? (
                          <button
                            className={styles.riskCheckBtn}
                            onClick={() =>
                              onSelectSchoolGroupForRisk(
                                slot.schoolSlug!,
                                slot.groupCode,
                                slot.schoolName,
                                slot.groupName,
                              )
                            }
                            type="button"
                          >
                            🔍 调剂风险自检
                          </button>
                        ) : null}
                        <button
                          className={styles.deleteSlotBtn}
                          onClick={() => clearSlot(slot.index)}
                          title="删除此志愿"
                          type="button"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* 4 个专业志愿配置区 */}
                    <div className={styles.majorsGrid}>
                      {[0, 1, 2, 3].map((majorIdx) => {
                        const currentMajor = slot.majors[majorIdx] || "";
                        return (
                          <div className={styles.majorField} key={majorIdx}>
                            <label>专业 {majorIdx + 1}</label>
                            {groupMajors.length > 0 ? (
                              <select
                                className={styles.majorSelect}
                                value={currentMajor}
                                onChange={(e) => {
                                  const nextMajors = [...slot.majors];
                                  nextMajors[majorIdx] = e.target.value;
                                  updateSlot(slot.index, { majors: nextMajors });
                                }}
                              >
                                <option value="">-- 选择该组 2025 录取专业 --</option>
                                {groupMajors.map((m) => (
                                  <option key={m.majorName} value={m.majorName}>
                                    {m.majorName} {m.averageScore ? `(均分 ${m.averageScore})` : ""}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                className={styles.majorInput}
                                placeholder={`输入第 ${majorIdx + 1} 专业`}
                                value={currentMajor}
                                onChange={(e) => {
                                  const nextMajors = [...slot.majors];
                                  nextMajors[majorIdx] = e.target.value;
                                  updateSlot(slot.index, { majors: nextMajors });
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* 调剂与备注行 */}
                    <div className={styles.adjustmentRow}>
                      <label className={styles.checkboxLabel}>
                        <input
                          checked={slot.obeyAdjustment}
                          onChange={(e) => updateSlot(slot.index, { obeyAdjustment: e.target.checked })}
                          type="checkbox"
                        />
                        <span className={slot.obeyAdjustment ? styles.obeyTrue : styles.obeyFalse}>
                          服从组内专业调剂 {slot.obeyAdjustment ? "✓ (防退档)" : "⚠️ 不服从 (有退档风险)"}
                        </span>
                      </label>

                      <input
                        className={styles.notesInput}
                        placeholder="填报心得或备忘（选填）"
                        value={slot.notes || ""}
                        onChange={(e) => updateSlot(slot.index, { notes: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles.emptySlotPlaceholder}>
                    <span>第 {slot.index} 志愿（空）</span>
                    <p>可在上方推荐池中点击“+ 加入24志愿表”，或在快捷栏输入分数一键生成。</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
