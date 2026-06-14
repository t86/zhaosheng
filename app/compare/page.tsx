import type { Metadata } from "next";
import Link from "next/link";
import { schools } from "@/lib/schools";
import { buildCompareRow, type CompareRow } from "@/lib/build-compare-row";
import SchoolCompare, { type SchoolOption } from "@/components/SchoolCompare";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "学校并排对比 · 把 2-3 个候选放一起做选择",
  description:
    "面向上海高三家长的学校对比工具：选 2-3 所候选学校，把城市、最近一年最低组线、保研/深造/出国、转专业自由度、优势短板与王牌专业薪资量级并排列出。深造数据仅部分学校公布、薪资为全国同名专业口径，缺的显示 —，不编造。",
};

// 推荐组合：用站内已有的上海/头部高校 slug，给家长一个起点。
const RECOMMENDED = [
  {
    label: "复旦 vs 上交 vs 同济",
    slugs: ["fudan-university", "shanghai-jiao-tong-university", "tongji-university"],
  },
  {
    label: "上交 vs 浙大 vs 南大",
    slugs: [
      "shanghai-jiao-tong-university",
      "zhejiang-university",
      "nanjing-university",
    ],
  },
  {
    label: "同济 vs 华东师大",
    slugs: ["tongji-university", "east-china-normal-university"],
  },
];

export default function ComparePage() {
  const options: SchoolOption[] = schools.map((school) => ({
    slug: school.slug,
    name: school.name,
    city: school.city,
    schoolType: school.schoolType,
  }));

  const rows: Record<string, CompareRow> = {};
  for (const school of schools) {
    rows[school.slug] = buildCompareRow(school.slug);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/">
          ← 返回首页
        </Link>
        <span className={styles.eyebrow}>选校工具 · 多维并排对比</span>
        <h1>把 2-3 个候选并排比，临门一脚做选择</h1>
        <p className={styles.lead}>
          到了报志愿最后一步，纠结往往不是“哪所更好”，而是“这两三所之间，差别到底在哪”。
          这一页把你正在权衡的候选放在一张表里：城市、最近一年最低组线、保研与深造、转专业自由度、
          一句优势一句短板，还有王牌专业的全国薪资量级，一眼横向看完。
        </p>
        <p className={styles.note}>
          数据只复用站内已整理的公开来源，缺的地方显示“—”，不猜不补。
        </p>
      </section>

      <section className={styles.section}>
        <SchoolCompare options={options} rows={rows} recommended={RECOMMENDED} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>读这张表前，先理解口径</h2>
          </div>
          <p>每个维度的来源和边界不一样，看之前先知道它能说明什么、不能说明什么。</p>
        </div>
        <div className={styles.methodologyCard}>
          <ul>
            <li>
              <strong>最低组线</strong>：取该校在上海最近一年、最低投档的那个专业组，
              用来感知“最容易进的口径大概在哪”。标“控制线口径”的不是精确投档线。
              不同专业组分差可能很大，进了学校不等于进了该方向。
            </li>
            <li>
              <strong>保研 / 深造 / 出国</strong>：以各校官方就业质量报告 / 教学质量报告为准，
              <strong>仅部分学校单独公布</strong>，届次与统计口径不完全一致；标“按推免公示反算”的，
              是用官方推免名单人数除以本科毕业人数得到，不是报告直给。缺的一律显示“—”。
            </li>
            <li>
              <strong>转专业自由度</strong>：基于各校公开培养方案 / 教务规定的整体判断，
              逐年可能调整，强基、定向、中外合作等特殊类型通常受限，最终以目标年份官方为准。
            </li>
            <li>
              <strong>一句优势 / 短板</strong>：基于学科评估、双一流学科、地域与行业地位等公开事实，
              短板以“要权衡 / 要注意”的中性措辞呈现，不是负面评价。
            </li>
            <li>
              <strong>王牌专业薪资量级</strong>：是<strong>全国同名专业</strong>的第三方参考量级
              （麦可思口径），<strong>不是这所学校该专业的实测收入</strong>，只能用来看方向间的高低差异。
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>下一步</h2>
          </div>
          <p>对比出方向后，再回到单校详情和上海数据页把它落实。</p>
        </div>
        <div className={styles.nextStepLinks}>
          <Link href="/schools">去学校库按方向筛选 →</Link>
          <Link href="/advancement">看深造与保研横向对比 →</Link>
          <Link href="/salary">看专业薪资量级参考 →</Link>
          <Link href="/admissions/shanghai#explorer">回上海数据页按校查分 →</Link>
        </div>
      </section>
    </main>
  );
}
