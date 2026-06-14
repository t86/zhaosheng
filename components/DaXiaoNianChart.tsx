import admissions from "@/data/shanghai-admissions.json";
import styles from "./DaXiaoNianChart.module.css";

type AdmissionRecord = {
  schoolName: string;
  groupName: string;
  year: number;
  minScore: number;
  scoreType: string;
};

type Series = {
  schoolName: string;
  groupName: string;
  color: string;
  points: { year: number; score: number }[];
};

// 三个代表性院校专业组：均为 2021-2025 全部 exact 投档线，且呈现典型“大小年”——
// 升到 2023、2024 回落、2025 再反弹。数据从 data/shanghai-admissions.json 实际取，不编造。
const TARGETS: { schoolName: string; groupName: string; color: string }[] = [
  { schoolName: "山东大学", groupName: "山东大学(02)", color: "var(--accent-deep)" },
  { schoolName: "天津大学", groupName: "天津大学(02)", color: "var(--accent)" },
  { schoolName: "湖南大学", groupName: "湖南大学(03)", color: "#1f7a44" },
];

const YEARS = [2021, 2022, 2023, 2024, 2025];

function buildSeries(): Series[] {
  const records = (admissions as { records: AdmissionRecord[] }).records;

  return TARGETS.map((target) => {
    const points = YEARS.map((year) => {
      const match = records.find(
        (record) =>
          record.schoolName === target.schoolName &&
          record.groupName === target.groupName &&
          record.year === year &&
          record.scoreType === "exact",
      );

      return match ? { year, score: match.minScore } : null;
    }).filter((point): point is { year: number; score: number } => point !== null);

    return {
      schoolName: target.schoolName,
      groupName: target.groupName,
      color: target.color,
      points,
    };
  }).filter((series) => series.points.length === YEARS.length);
}

export function DaXiaoNianChart() {
  const series = buildSeries();

  if (series.length === 0) {
    return null;
  }

  const allScores = series.flatMap((item) => item.points.map((point) => point.score));
  const rawMin = Math.min(...allScores);
  const rawMax = Math.max(...allScores);
  // 留一点上下余量，让折线不贴边
  const minScore = rawMin - 6;
  const maxScore = rawMax + 6;

  // viewBox 坐标系，移动端通过 CSS 让 SVG 宽度自适应
  const width = 720;
  const height = 360;
  const padLeft = 56;
  const padRight = 132;
  const padTop = 28;
  const padBottom = 44;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  const xFor = (year: number) =>
    padLeft + ((year - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * plotWidth;
  const yFor = (score: number) =>
    padTop + (1 - (score - minScore) / (maxScore - minScore)) * plotHeight;

  // y 轴刻度（4 条网格线）
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount + 1 }, (_, index) => {
    const score = Math.round(minScore + ((maxScore - minScore) / tickCount) * index);
    return score;
  });

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="三个代表性院校专业组 2021 至 2025 年上海投档线逐年波动折线图"
      >
        {/* 网格线与 y 轴刻度 */}
        {ticks.map((score) => {
          const y = yFor(score);
          return (
            <g key={`tick-${score}`}>
              <line
                className={styles.grid}
                x1={padLeft}
                x2={padLeft + plotWidth}
                y1={y}
                y2={y}
              />
              <text className={styles.axisLabel} x={padLeft - 10} y={y + 4} textAnchor="end">
                {score}
              </text>
            </g>
          );
        })}

        {/* x 轴年份 */}
        {YEARS.map((year) => (
          <text
            key={`year-${year}`}
            className={styles.axisLabel}
            x={xFor(year)}
            y={padTop + plotHeight + 26}
            textAnchor="middle"
          >
            {year}
          </text>
        ))}

        {/* 各组折线与数据点 */}
        {series.map((item) => {
          const path = item.points
            .map((point, index) => {
              const command = index === 0 ? "M" : "L";
              return `${command}${xFor(point.year)},${yFor(point.score)}`;
            })
            .join(" ");
          const last = item.points[item.points.length - 1];

          return (
            <g key={`${item.schoolName}-${item.groupName}`}>
              <path className={styles.line} d={path} style={{ stroke: item.color }} />
              {item.points.map((point) => (
                <g key={`${item.groupName}-${point.year}`}>
                  <circle
                    className={styles.dot}
                    cx={xFor(point.year)}
                    cy={yFor(point.score)}
                    r={4}
                    style={{ stroke: item.color }}
                  />
                  <text
                    className={styles.pointLabel}
                    x={xFor(point.year)}
                    y={yFor(point.score) - 10}
                    textAnchor="middle"
                  >
                    {point.score}
                  </text>
                </g>
              ))}
              <text
                className={styles.seriesLabel}
                x={last ? xFor(last.year) + 12 : 0}
                y={last ? yFor(last.score) + 4 : 0}
                style={{ fill: item.color }}
              >
                {item.schoolName}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className={styles.caption}>
        三个组都是 2023 年冲到近年高点、2024 年回落、2025 年再反弹的“大小年”——
        所以要看近 3 年位次，别只盯去年最低分。数据取自上海市教育考试院公开的本科普通批院校专业组投档线（2021–2025）。
      </figcaption>
    </figure>
  );
}
