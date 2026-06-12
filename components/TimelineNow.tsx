"use client";

import { useMemo } from "react";
import styles from "../app/timeline/page.module.css";

type Phase = {
  key: string;
  label: string;
  window: string;
  focus: string[];
  href: string;
};

const PHASES: Phase[] = [
  {
    key: "spring",
    label: "春考 / 外语一考 / 小三门",
    window: "1 月 — 5 月",
    focus: [
      "外语一考与春考志愿、校测确认",
      "5 月小三门等级考赴考",
    ],
    href: "#spring-grade-focus",
  },
  {
    key: "june",
    label: "高考出分到综评面试前",
    window: "6 月 — 7 月上旬",
    focus: [
      "高考出分、对分数线和位次",
      "强基校测、综评校测和港校 offer 的确认顺序",
      "盯紧各校开放日与面试通知",
    ],
    href: "#shanghai-6-7",
  },
  {
    key: "july",
    label: "录取期跟踪",
    window: "7 月中旬 — 8 月",
    focus: [
      "强基、综评、提前批、普通批逐批跟踪",
      "录取结果确认与入学准备",
    ],
    href: "#shanghai-7-8",
  },
];

function resolvePhase(month: number): Phase {
  // month: 1-12
  if (month <= 5) return PHASES[0];
  if (month === 6 || month === 7) return PHASES[1];
  return PHASES[2];
}

export default function TimelineNow() {
  const { phase, dateLabel } = useMemo(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dateLabel = `${now.getFullYear()} 年 ${month} 月 ${day} 日`;
    // 7 月下旬之后进入录取跟踪阶段
    let phase = resolvePhase(month);
    if (month === 7 && day >= 20) {
      phase = PHASES[2];
    }
    return { phase, dateLabel };
  }, []);

  return (
    <div className={styles.nowBanner}>
      <div className={styles.nowHead}>
        <span className={styles.nowPill}>当前进度</span>
        <span className={styles.nowDate}>{dateLabel}</span>
      </div>
      <h2 className={styles.nowStage}>
        现在大致处于：<strong>{phase.label}</strong>
        <span className={styles.nowWindow}>（{phase.window}）</span>
      </h2>
      <p className={styles.nowLead}>这一阶段，家长本周/本月重点要盯的动作：</p>
      <ul className={styles.nowList}>
        {phase.focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className={styles.nowJump} href={phase.href}>
        跳到这一阶段的详细安排 →
      </a>
    </div>
  );
}
