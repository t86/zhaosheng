import {
  hotDirectionCategoryDefinitions,
  hotDirectionControversyRecords,
  hotDirectionMainRecords,
  hotDirectionTopicMeta,
  type HotDirectionCandidateRecord,
  type HotDirectionCategoryDefinition,
  type HotDirectionRecord,
} from "@/data/hot-directions";
import { schoolsBySlug } from "@/lib/schools";

export type HotDirectionSchoolLink = {
  slug: string;
  name: string;
};

export type HotDirectionCandidateView = Omit<HotDirectionCandidateRecord, "schoolSlug"> & {
  school: HotDirectionSchoolLink;
};

export type HotDirectionView = Omit<HotDirectionRecord, "candidatePrograms"> & {
  schoolLinks: HotDirectionSchoolLink[];
  candidatePrograms: HotDirectionCandidateView[];
};

export type HotDirectionCategoryView = HotDirectionCategoryDefinition & {
  directions: HotDirectionView[];
};

function attachSchoolLinks(record: HotDirectionRecord): HotDirectionView {
  const schoolLinks = record.schoolSlugs
    .map((slug) => schoolsBySlug.get(slug))
    .filter((school): school is NonNullable<typeof school> => Boolean(school))
    .map((school) => ({
      slug: school.slug,
      name: school.name,
    }));

  const candidatePrograms = record.candidatePrograms
    .map((candidate) => {
      const school = schoolsBySlug.get(candidate.schoolSlug);
      if (!school) {
        return null;
      }

      return {
        entryLabel: candidate.entryLabel,
        rationale: candidate.rationale,
        tags: candidate.tags,
        school: {
          slug: school.slug,
          name: school.name,
        },
      };
    })
    .filter((candidate): candidate is HotDirectionCandidateView => Boolean(candidate));

  return {
    ...record,
    schoolLinks,
    candidatePrograms,
  };
}

export function getFeaturedHotDirections() {
  return hotDirectionMainRecords
    .filter((item) => (item.rank ?? Number.MAX_SAFE_INTEGER) <= 6)
    .sort((left, right) => (left.rank ?? 0) - (right.rank ?? 0))
    .map(attachSchoolLinks);
}

export function getHotDirectionCategories(): HotDirectionCategoryView[] {
  const directionMap = new Map(hotDirectionMainRecords.map((item) => [item.slug, item]));

  return hotDirectionCategoryDefinitions.map((category) => ({
    ...category,
    directions: category.directionSlugs
      .map((slug) => directionMap.get(slug))
      .filter((item): item is HotDirectionRecord => Boolean(item))
      .map(attachSchoolLinks),
  }));
}

export function getHotDirectionTopic() {
  return {
    ...hotDirectionTopicMeta,
    mainDirections: hotDirectionMainRecords
      .slice()
      .sort((left, right) => (left.rank ?? 0) - (right.rank ?? 0))
      .map(attachSchoolLinks),
    controversyDirections: hotDirectionControversyRecords.map(attachSchoolLinks),
    categories: getHotDirectionCategories(),
  };
}
