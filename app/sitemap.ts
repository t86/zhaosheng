import type { MetadataRoute } from "next";
import { topicDefinitions } from "@/data/topics";
import { schools } from "@/lib/schools";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const staticPaths = [
  "/",
  "/start",
  "/careers",
  "/advancement",
  "/admissions/shanghai",
  "/selection",
  "/timeline",
  "/schools",
  "/directions",
  "/salary",
  "/sources",
  "/advice",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));

  const schoolEntries: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${siteUrl}/schools/${school.slug}`,
    lastModified,
  }));

  const topicEntries: MetadataRoute.Sitemap = topicDefinitions.map((topic) => ({
    url: `${siteUrl}/topics/${topic.slug}`,
    lastModified,
  }));

  return [...staticEntries, ...schoolEntries, ...topicEntries];
}
