import {
  shanghaiFocusAdmissions,
  type ShanghaiFocusRecord,
  type ShanghaiFocusSchool,
  type ShanghaiFocusSource,
} from "@/data/shanghai-focus-admissions";

const focusBySlug = new Map(
  shanghaiFocusAdmissions
    .filter((school): school is ShanghaiFocusSchool & { schoolSlug: string } => Boolean(school.schoolSlug))
    .map((school) => [school.schoolSlug, school]),
);

function sortRecords(records: ShanghaiFocusRecord[]) {
  return [...records].sort(
    (left, right) =>
      right.year - left.year ||
      left.sourceKind.localeCompare(right.sourceKind) ||
      left.label.localeCompare(right.label, "zh-CN"),
  );
}

export function getShanghaiFocusSchool(slug: string) {
  const school = focusBySlug.get(slug);
  if (!school) {
    return undefined;
  }

  return {
    ...school,
    records: sortRecords(school.records),
  };
}

export function getShanghaiFocusAdmissions() {
  return shanghaiFocusAdmissions.map((school) => ({
    ...school,
    records: sortRecords(school.records),
  }));
}

export type { ShanghaiFocusRecord, ShanghaiFocusSchool, ShanghaiFocusSource };
