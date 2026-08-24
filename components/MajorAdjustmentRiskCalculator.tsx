"use client";

import { useMemo, useState } from "react";
import {
  analyzeAdjustmentRisk,
  getSchoolGroupMajors,
  type AdjustmentRiskAnalysis,
} from "@/lib/major-adjustment-risk";
import { schools } from "@/lib/schools";
import styles from "./MajorAdjustmentRiskCalculator.module.css";

const POPULAR_SCHOOL_SLUGS = [
  "tongji-university",
  "shanghai-jiao-tong-university",
  "fudan-university",
  "east-china-normal-university",
  "zhejiang-university",
  "nanjing-university",
  "peking-university",
  "tsinghua-university",
  "beihang-university",
  "beijing-institute-of-technology",
  "harbin-institute-of-technology",
  "xian-jiaotong-university",
  "university-of-science-and-technology-of-china",
  "wuhan-university",
  "huazhong-university-of-science-and-technology",
  "sun-yat-sen-university",
];

type MajorAdjustmentRiskCalculatorProps = {
  initialSchoolSlug?: string;
  initialGroupCode?: string;
  initialSchoolName?: string;
  initialGroupName?: string;
};

export function MajorAdjustmentRiskCalculator({
  initialSchoolSlug,
  initialGroupCode,
  initialSchoolName,
  initialGroupName,
}: MajorAdjustmentRiskCalculatorProps) {
  const [selectedSchoolSlug, setSelectedSchoolSlug] = useState<string>(
    initialSchoolSlug || "tongji-university",
  );
  const [selectedGroupCode, setSelectedGroupCode] = useState<string>(
    initialGroupCode || "10201",
  );
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [unacceptableMajors, setUnacceptableMajors] = useState<string[]>([]);
  const [obeyAdjustment, setObeyAdjustment] = useState<boolean>(true);

  const currentSchool = useMemo(
    () => schools.find((s) => s.slug === selectedSchoolSlug) || { name: initialSchoolName || selectedSchoolSlug, slug: selectedSchoolSlug },
    [selectedSchoolSlug, initialSchoolName],
  );

  const availableMajors = useMemo(
    () => getSchoolGroupMajors(selectedSchoolSlug, selectedGroupCode),
    [selectedSchoolSlug, selectedGroupCode],
  );

  const activeSelected = useMemo(() => {
    if (selectedMajors.length > 0) return selectedMajors;
    if (availableMajors.length > 0) return availableMajors.slice(0, 2).map((m) => m.majorName);
    return [];
  }, [selectedMajors, availableMajors]);

  const analysis: AdjustmentRiskAnalysis = useMemo(
    () =>
      analyzeAdjustmentRisk({
        schoolSlug: selectedSchoolSlug,
        schoolName: currentSchool.name,
        groupCode: selectedGroupCode,
        groupName: initialGroupName || `专业组(${selectedGroupCode})`,
        selectedMajors: activeSelected,
        unacceptableMajors,
        obeyAdjustment,
      }),
    [selectedSchoolSlug, currentSchool.name, selectedGroupCode, initialGroupName, activeSelected, unacceptableMajors, obeyAdjustment],
  );

  const toggleDesiredMajor = (majorName: string) => {
    setSelectedMajors((prev) => {
      const current = prev.length > 0 ? prev : activeSelected;
      if (current.includes(majorName)) {
        return current.filter((m) => m !== majorName);
      }
      if (current.length >= 4) {
        alert("上海高考院校专业组内最多可填 4 个专业志愿。");
        return current;
      }
      setUnacceptableMajors((u) => u.filter((m) => m !== majorName));
      return [...current, majorName];
    });
  };

  const toggleUnacceptableMajor = (majorName: string) => {
    setUnacceptableMajors((prev) => {
      if (prev.includes(majorName)) {
        return prev.filter((m) => m !== majorName);
      }
      setSelectedMajors((s) => s.filter((m) => m !== majorName));
      return [...prev, majorName];
    });
  };

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case "critical":
        return styles.riskCritical;
      case "high":
        return styles.riskHigh;
      case "medium":
        return styles.riskMedium;
      default:
        return styles.riskLow;
    }
  };

  return (
    <section className={styles.container} id="adjustment-risk-calculator">
      <div className={styles.head}>
        <div>
          <span className={styles.badge}>避坑自检工具</span>
          <h2 className={styles.title}>院校专业组内“调剂风险”计算器</h2>
          <p className={styles.subtitle}>
            平行志愿进档后只在组内调剂。勾选你想选的 1~4 个专业和“最不愿去的专业”，自动测算滑入调剂池的概率与潜在兜底专业。
          </p>
        </div>
      </div>

      <div className={styles.selectorBar}>
        <div className={styles.selectGroup}>
          <label>选择高校</label>
          <select
            className={styles.select}
            value={selectedSchoolSlug}
            onChange={(e) => {
              setSelectedSchoolSlug(e.target.value);
              setSelectedMajors([]);
              setUnacceptableMajors([]);
            }}
          >
            {POPULAR_SCHOOL_SLUGS.map((slug) => {
              const s = schools.find((item) => item.slug === slug);
              return (
                <option key={slug} value={slug}>
                  {s?.name || slug}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label>专业组</label>
          <select
            className={styles.select}
            value={selectedGroupCode}
            onChange={(e) => {
              setSelectedGroupCode(e.target.value);
              setSelectedMajors([]);
              setUnacceptableMajors([]);
            }}
          >
            <option value="01">专业组(01)</option>
            <option value="02">专业组(02)</option>
            <option value="03">专业组(03)</option>
          </select>
        </div>

        <div className={styles.quickSchoolButtons}>
          {["tongji-university", "shanghai-jiao-tong-university", "fudan-university", "east-china-normal-university", "zhejiang-university"].map((slug) => {
            const s = schools.find((item) => item.slug === slug);
            return (
              <button
                className={`${styles.quickBtn} ${selectedSchoolSlug === slug ? styles.quickBtnActive : ""}`}
                key={slug}
                onClick={() => {
                  setSelectedSchoolSlug(slug);
                  setSelectedMajors([]);
                  setUnacceptableMajors([]);
                }}
                type="button"
              >
                {s?.name || slug}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.calculatorLayout}>
        <div className={styles.majorsSelectionPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>{currentSchool.name} 组内专业池</h3>
              <p>点击绿色“+想去”选定 1~4 个专业志愿；点击红色“🚫排斥”标记绝对不接受的专业。</p>
            </div>
            <span className={styles.majorsCount}>共 {availableMajors.length} 个专业</span>
          </div>

          {availableMajors.length > 0 ? (
            <div className={styles.majorsList}>
              {availableMajors.map((m, idx) => {
                const isDesired = activeSelected.includes(m.majorName);
                const isUnacceptable = unacceptableMajors.includes(m.majorName);
                const isTopTier = idx < Math.max(1, Math.ceil(availableMajors.length * 0.35));

                return (
                  <div
                    className={`${styles.majorCard} ${isDesired ? styles.cardDesired : ""} ${isUnacceptable ? styles.cardUnacceptable : ""}`}
                    key={m.majorName}
                  >
                    <div className={styles.majorMainInfo}>
                      <div className={styles.majorTitleRow}>
                        <strong className={styles.majorTitle}>{m.majorName}</strong>
                        {isTopTier ? <span className={styles.hotTag}>热门高分</span> : null}
                      </div>
                      <div className={styles.majorDataRow}>
                        <span>录取 {m.admittedCount} 人</span>
                        {m.averageScore ? <span>均分 {m.averageScore}</span> : null}
                        {m.averageRank ? <span>位次约 {m.averageRank}</span> : null}
                        <span className={styles.reqTag}>选科 {m.subjectRequirement}</span>
                      </div>
                    </div>

                    <div className={styles.majorActionBtns}>
                      <button
                        className={`${styles.btnDesired} ${isDesired ? styles.btnDesiredActive : ""}`}
                        onClick={() => toggleDesiredMajor(m.majorName)}
                        type="button"
                      >
                        {isDesired ? "✓ 已选专业" : "+ 想去"}
                      </button>
                      <button
                        className={`${styles.btnUnacceptable} ${isUnacceptable ? styles.btnUnacceptableActive : ""}`}
                        onClick={() => toggleUnacceptableMajor(m.majorName)}
                        type="button"
                      >
                        {isUnacceptable ? "🚫 已排斥" : "🚫 排斥"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyMajors}>
              <p>暂未录入该校 2025 专业分层明细数据，请参考当年正式《招生专业目录》。</p>
            </div>
          )}

          <div className={styles.adjustmentToggleWrap}>
            <label className={styles.toggleLabel}>
              <input
                checked={obeyAdjustment}
                onChange={(e) => setObeyAdjustment(e.target.checked)}
                type="checkbox"
              />
              <span className={obeyAdjustment ? styles.textSafe : styles.textDanger}>
                服从组内专业调剂：{obeyAdjustment ? "是（进档后防退档）" : "否（未录上前4专业将直接被退档！）"}
              </span>
            </label>
          </div>
        </div>

        <div className={styles.diagnosisPanel}>
          <div className={`${styles.riskHeader} ${getRiskBadgeClass(analysis.riskLevel)}`}>
            <div className={styles.riskTop}>
              <span className={styles.riskPill}>
                {analysis.riskLevel === "critical"
                  ? "极高风险"
                  : analysis.riskLevel === "high"
                    ? "高调剂风险"
                    : analysis.riskLevel === "medium"
                      ? "中度调剂风险"
                      : "低调剂风险"}
              </span>
              <span className={styles.riskScoreVal}>风险指数: {analysis.riskScore}/100</span>
            </div>
            <h4>{analysis.title}</h4>
            <p>{analysis.summary}</p>
          </div>

          <div className={styles.diagSection}>
            <strong>🎯 已选专业志愿 ({analysis.selectedCount}/4)：</strong>
            <ul className={styles.selectedBullets}>
              {analysis.selectedMajors.map((m, i) => (
                <li key={m}>
                  志愿 {i + 1}：{m}
                </li>
              ))}
            </ul>
          </div>

          {analysis.unacceptableHitsInFallback.length > 0 ? (
            <div className={styles.unacceptableAlert}>
              <strong>⚠️ 危险：调剂兜底池命中你排斥的专业！</strong>
              <p>
                一旦前 {analysis.selectedCount} 个专业未录取，你极大概率会被调剂到：
              </p>
              <div className={styles.hitTags}>
                {analysis.unacceptableHitsInFallback.map((m) => (
                  <span className={styles.hitTag} key={m.majorName}>
                    {m.majorName} (均分 {m.averageScore || "—"})
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.diagSection}>
            <strong>📦 组内调剂兜底池（前 4 志愿之外的专业）：</strong>
            {analysis.fallbackMajors.length > 0 ? (
              <div className={styles.fallbackPool}>
                <p className={styles.poolNote}>
                  若触发调剂，你将被分入以下专业之一（共 {analysis.fallbackMajors.length} 个备选）：
                </p>
                <div className={styles.poolTags}>
                  {analysis.fallbackMajors.map((m) => (
                    <span className={styles.fallbackTag} key={m.majorName}>
                      {m.majorName}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className={styles.poolEmpty}>已将组内全部专业填入前 4 志愿，无多余调剂空间。</p>
            )}
          </div>

          <div className={styles.adviceSection}>
            <strong>💡 填报自检建议：</strong>
            <ul className={styles.adviceList}>
              {analysis.advice.map((adv, idx) => (
                <li key={idx}>{adv}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
