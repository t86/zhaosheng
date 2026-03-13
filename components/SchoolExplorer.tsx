"use client";

import { useMemo, useState } from "react";
import type { TopicDefinition } from "@/data/topics";
import type { School } from "@/lib/schools";
import { SchoolCard } from "./SchoolCard";
import styles from "./SchoolExplorer.module.css";

type Props = {
  schools: School[];
  regions: string[];
  schoolTypes: string[];
  topics: TopicDefinition[];
};

type FeaturedTrack = NonNullable<NonNullable<School["majorProfile"]>["featuredTracks"]>[number];

function getTrackRouteType(track: FeaturedTrack) {
  if (track.category.includes("荣誉学院") || track.route.includes("培养平台")) {
    return "培养平台";
  }

  if (track.route.includes("专项选拔") || track.route.includes("单独招生")) {
    return "专项选拔";
  }

  if (track.route.includes("综合选拔")) {
    return "综合选拔";
  }

  if (track.route.includes("校内") || track.route.includes("二次选拔") || track.route.includes("学院拔尖")) {
    return "校内选拔";
  }

  if (track.route.includes("高考") || track.route.includes("直招") || track.route.includes("综合评价批次")) {
    return "高考直招";
  }

  return "其他口径";
}

const trackRouteOrder = [
  "高考直招",
  "综合选拔",
  "专项选拔",
  "校内选拔",
  "培养平台",
  "其他口径",
];

export function SchoolExplorer({
  schools,
  regions,
  schoolTypes,
  topics,
}: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("全部区域");
  const [schoolType, setSchoolType] = useState("全部类型");
  const [topic, setTopic] = useState("全部专题");
  const [trackRoute, setTrackRoute] = useState("全部班型口径");
  const trackRouteOptions = useMemo(() => {
    const values = new Set<string>();

    schools.forEach((school) => {
      school.majorProfile?.featuredTracks?.forEach((track) => {
        values.add(getTrackRouteType(track));
      });
    });

    return trackRouteOrder.filter((item) => values.has(item));
  }, [schools]);

  const filtered = schools.filter((school) => {
    const majorProfileTerms =
      school.majorProfile?.majors.flatMap((item) => [
        item.name,
        item.cluster,
        item.note ?? "",
        ...item.tags,
      ]) ?? [];
    const featuredTrackTerms =
      school.majorProfile?.featuredTracks?.flatMap((item) => [
        item.name,
        item.category,
        item.route,
        item.note ?? "",
        ...item.tags,
      ]) ?? [];

    const matchesQuery =
      !query ||
      school.name.includes(query) ||
      school.city.includes(query) ||
      school.majorHighlights.some((item) => item.includes(query)) ||
      majorProfileTerms.some((item) => item.includes(query)) ||
      featuredTrackTerms.some((item) => item.includes(query)) ||
      school.majorProfile?.description.includes(query) ||
      school.strengthTags.some((item) => item.includes(query));
    const matchesRegion = region === "全部区域" || school.region === region;
    const matchesType = schoolType === "全部类型" || school.schoolType === schoolType;
    const matchesTopic =
      topic === "全部专题" || school.topicSlugs.includes(topic as School["topicSlugs"][number]);
    const matchesTrackRoute =
      trackRoute === "全部班型口径" ||
      school.majorProfile?.featuredTracks?.some(
        (track) => getTrackRouteType(track) === trackRoute,
      );

    return matchesQuery && matchesRegion && matchesType && matchesTopic && matchesTrackRoute;
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <input
          className={styles.input}
          placeholder="搜学校、城市、专业方向或班型，比如“上海”“微电子”“姚班”"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className={styles.select}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option>全部区域</option>
          {regions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          className={styles.select}
          value={schoolType}
          onChange={(event) => setSchoolType(event.target.value)}
        >
          <option>全部类型</option>
          {schoolTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          className={styles.select}
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        >
          <option>全部专题</option>
          {topics.map((item) => (
            <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
        <select
          className={styles.select}
          value={trackRoute}
          onChange={(event) => setTrackRoute(event.target.value)}
        >
          <option>全部班型口径</option>
          {trackRouteOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className={styles.topicRow}>
        <button
          className={`${styles.topicButton} ${
            topic === "全部专题" ? styles.topicButtonActive : ""
          }`}
          onClick={() => setTopic("全部专题")}
          type="button"
        >
          全部专题
        </button>
        {topics.map((item) => (
          <button
            className={`${styles.topicButton} ${
              topic === item.slug ? styles.topicButtonActive : ""
            }`}
            key={item.slug}
            onClick={() => setTopic(item.slug)}
            type="button"
          >
            {item.shortTitle}
          </button>
        ))}
      </div>

      <p className={styles.count}>当前命中 {filtered.length} 所学校</p>

      <div className={styles.grid}>
        {filtered.map((school) => (
          <SchoolCard key={school.slug} school={school} />
        ))}
      </div>
    </div>
  );
}
