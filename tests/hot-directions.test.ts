import test from "node:test";
import assert from "node:assert/strict";
import {
  getFeaturedHotDirections,
  getHotDirectionCategories,
  getHotDirectionTopic,
} from "../lib/hot-directions";

test("returns six homepage preview directions and keeps clinical medicine in main list", () => {
  const featured = getFeaturedHotDirections();
  const topic = getHotDirectionTopic();

  assert.equal(featured.length, 6);
  assert.equal(featured[0]?.slug, "artificial-intelligence");
  assert.ok(topic.mainDirections.some((item) => item.slug === "clinical-medicine"));
});

test("builds category sections with repeated direction support", () => {
  const categories = getHotDirectionCategories();

  assert.equal(categories.length, 3);
  assert.equal(categories[0]?.slug, "academic-elite");
  assert.ok(categories[2]?.directions.some((item) => item.slug === "artificial-intelligence"));
});

test("exposes a dedicated topic payload with controversy directions and school links", () => {
  const topic = getHotDirectionTopic();
  const aiDirection = topic.mainDirections.find((item) => item.slug === "artificial-intelligence");

  assert.equal(topic.mainDirections.length, 10);
  assert.equal(topic.mainDirections.some((item) => item.slug === "stomatology"), false);
  assert.equal(topic.controversyDirections.some((item) => item.slug === "stomatology"), true);
  assert.ok((aiDirection?.schoolLinks.length ?? 0) > 0);
});

test("keeps homepage preview limited to six directions in rank order", () => {
  const featured = getFeaturedHotDirections();

  assert.deepEqual(
    featured.map((item) => item.rank),
    [1, 2, 3, 4, 5, 6],
  );
});

test("exposes ranked candidate pools for each main direction", () => {
  const topic = getHotDirectionTopic();
  const aiDirection = topic.mainDirections.find((item) => item.slug === "artificial-intelligence");
  const clinicalDirection = topic.mainDirections.find((item) => item.slug === "clinical-medicine");

  assert.ok(topic.mainDirections.every((item) => item.candidatePrograms.length >= 5));
  assert.equal(aiDirection?.candidatePrograms[0]?.school.slug, "tsinghua-university");
  assert.equal(clinicalDirection?.candidatePrograms.length, 5);
});

test("keeps candidate recommendations attached to known in-site schools", () => {
  const topic = getHotDirectionTopic();

  assert.ok(
    topic.mainDirections.every((item) =>
      item.candidatePrograms.every((candidate) => candidate.school.name.length > 0),
    ),
  );
});
