import { salaryReference } from "@/data/salary-reference";

// 把一所学校的王牌专业，匹配到「全国本科」第三方薪资 / 就业景气参考（麦可思口径）。
// 重要：这是全国同名专业的参考量级，不是这所学校该专业的实际薪资。
// 为避免误判，统一用「归一化后完全相等」匹配，不做模糊包含（否则「电气工程及其自动化」
// 会错误命中「自动化」的薪资）。

export type MajorSalaryMatch = {
  major: string;
  national?: {
    monthly: number;
    rank: number;
    cohort: string;
  };
  signal?: {
    signal: "green" | "red";
    note?: string;
  };
};

function normalize(value: string): string {
  return value.replace(/[\s（）()·・]/g, "");
}

export function matchMajorSalaries(majorNames: string[]): MajorSalaryMatch[] {
  const seen = new Set<string>();
  const matches: MajorSalaryMatch[] = [];

  for (const major of majorNames) {
    const key = normalize(major);
    if (seen.has(key)) {
      continue;
    }

    const national = salaryReference.highPayingMajors.find(
      (item) => normalize(item.major) === key,
    );
    const signal = salaryReference.signalMajors.find(
      (item) => normalize(item.name) === key,
    );

    if (!national && !signal) {
      continue;
    }

    seen.add(key);
    matches.push({
      major,
      national: national
        ? { monthly: national.monthly, rank: national.rank, cohort: national.cohort }
        : undefined,
      signal: signal ? { signal: signal.signal, note: signal.note } : undefined,
    });
  }

  return matches;
}
