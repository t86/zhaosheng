// 荣誉班型 / 拔尖班的「进入方式」数据。
// 说明清楚每个特色班到底怎么进：高考直接填报、提前/单独选拔、综合评价、强基计划、
// 少年班，还是入学后的校内二次选拔。数据以各校本科招生网与班型官方页面为准；
// 招生方式逐年可能微调，最终以目标年份各校官方简章为准。

export type HonorsEntrySource = {
  label: string;
  url: string;
};

export type HonorsEntry = {
  schoolSlug: string;
  track: string; // 与 school profile 中 featuredTracks 的 name 完全一致
  channels: string[]; // 进入通道标签，如「高考直接填报」「入学后二次选拔」「提前选拔」「强基计划」「少年班」「综合评价」
  summary: string; // 1-2 句通俗解释怎么进
  timing?: string; // 选拔发生的时间点，如「高考填志愿时」「大一新生入学后」
  sources: HonorsEntrySource[];
};

// 这部分由调研数据填充
import { honorsEntries } from "@/data/honors-admission-data";

export const honorsAdmission: Record<string, HonorsEntry> = Object.fromEntries(
  honorsEntries.map((entry) => [`${entry.schoolSlug}::${entry.track}`, entry]),
);

export function getHonorsEntry(slug: string, track: string): HonorsEntry | undefined {
  return honorsAdmission[`${slug}::${track}`];
}
