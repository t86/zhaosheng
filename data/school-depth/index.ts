import type { SchoolDepth, TrackCurriculum } from "@/data/school-depth/types";
import { schoolDepthList, trackCurriculumList } from "@/data/school-depth/data";

export const schoolDepthBySlug: Record<string, SchoolDepth> = Object.fromEntries(
  schoolDepthList.map((item) => [item.slug, item]),
);

const curriculumByKey: Record<string, TrackCurriculum> = Object.fromEntries(
  trackCurriculumList.map((item) => [`${item.schoolSlug}::${item.track}`, item]),
);

export function getSchoolDepth(slug: string): SchoolDepth | undefined {
  return schoolDepthBySlug[slug];
}

export function getTrackCurriculum(slug: string, track: string): TrackCurriculum | undefined {
  return curriculumByKey[`${slug}::${track}`];
}
