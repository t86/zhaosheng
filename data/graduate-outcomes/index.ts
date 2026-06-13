import type { SchoolGraduateOutcome } from "@/data/graduate-outcomes/types";
import tsinghua from "@/data/graduate-outcomes/tsinghua-university";
import peking from "@/data/graduate-outcomes/peking-university";
import fudan from "@/data/graduate-outcomes/fudan-university";
import sjtu from "@/data/graduate-outcomes/shanghai-jiao-tong-university";
import nju from "@/data/graduate-outcomes/nanjing-university";
import zju from "@/data/graduate-outcomes/zhejiang-university";
import beihang from "@/data/graduate-outcomes/beihang-university";
import ustc from "@/data/graduate-outcomes/university-of-science-and-technology-of-china";
import hit from "@/data/graduate-outcomes/harbin-institute-of-technology";
import xjtu from "@/data/graduate-outcomes/xian-jiaotong-university";

const entries: SchoolGraduateOutcome[] = [
  tsinghua,
  peking,
  fudan,
  sjtu,
  nju,
  zju,
  beihang,
  ustc,
  hit,
  xjtu,
];

export const graduateOutcomesBySlug: Partial<Record<string, SchoolGraduateOutcome>> =
  Object.fromEntries(entries.map((entry) => [entry.slug, entry]));
