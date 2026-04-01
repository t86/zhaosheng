# Hot Directions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage module and a dedicated trend page for “未来 10 年热门方向猜想”, using direction tags instead of strict major names.

**Architecture:** Keep the trend content in a dedicated data file and a small helper layer so the homepage and the dedicated page read from the same source of truth. Implement one new route for the full experience, then add a compact preview block on the homepage that links into the route and its category anchors.

**Tech Stack:** TypeScript, Next.js App Router, CSS Modules, Node test runner, `tsx`

---

### Task 1: Add shared direction data and helper tests

**Files:**
- Create: `tests/hot-directions.test.ts`
- Create: `data/hot-directions.ts`
- Create: `lib/hot-directions.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  getFeaturedHotDirections,
  getHotDirectionCategories,
  getHotDirectionTopic,
} from "../lib/hot-directions";

test("returns six homepage preview directions and keeps clinical medicine in main list", () => {
  const featured = getFeaturedHotDirections();

  assert.equal(featured.length, 6);
  assert.equal(featured[0]?.slug, "artificial-intelligence");
  assert.ok(featured.some((item) => item.slug === "clinical-medicine"));
});

test("builds category sections with repeated direction support", () => {
  const categories = getHotDirectionCategories();

  assert.equal(categories.length, 3);
  assert.equal(categories[0]?.slug, "academic-elite");
  assert.ok(categories[2]?.directions.some((item) => item.slug === "artificial-intelligence"));
});

test("exposes a dedicated topic page with controversy directions", () => {
  const topic = getHotDirectionTopic();

  assert.equal(topic.mainDirections.length, 10);
  assert.ok(topic.controversyDirections.some((item) => item.slug === "stomatology"));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL with `Cannot find module '../lib/hot-directions'`

- [ ] **Step 3: Write minimal implementation**

```ts
export function getFeaturedHotDirections() {
  return hotDirections.filter((item) => item.rank <= 6);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/hot-directions.test.ts data/hot-directions.ts lib/hot-directions.ts
git commit -m "feat: add hot direction data model"
```

### Task 2: Build the dedicated directions page

**Files:**
- Create: `app/directions/page.tsx`
- Create: `app/directions/page.module.css`
- Modify: `lib/hot-directions.ts`
- Test: `tests/hot-directions.test.ts`

- [ ] **Step 1: Write the failing test for page-facing helper behavior**

```ts
test("maps representative schools only when the school exists in the current site pool", () => {
  const topic = getHotDirectionTopic();
  assert.ok(topic.mainDirections[0]?.schoolLinks.length > 0);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL because `schoolLinks` is missing

- [ ] **Step 3: Implement the minimal helper + page**

```tsx
export default function HotDirectionsPage() {
  const topic = getHotDirectionTopic();
  return <main>{topic.mainDirections.map((direction) => <article key={direction.slug}>{direction.name}</article>)}</main>;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/directions/page.tsx app/directions/page.module.css lib/hot-directions.ts tests/hot-directions.test.ts
git commit -m "feat: add hot directions topic page"
```

### Task 3: Add the homepage preview module

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `lib/hot-directions.ts`
- Test: `tests/hot-directions.test.ts`

- [ ] **Step 1: Write the failing test for homepage preview helper ordering**

```ts
test("keeps homepage preview limited to six directions in rank order", () => {
  const featured = getFeaturedHotDirections();
  assert.deepEqual(featured.map((item) => item.rank), [1, 2, 3, 4, 5, 6]);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL if ordering or rank metadata is missing

- [ ] **Step 3: Implement the homepage section**

```tsx
<section className={styles.section}>
  <div className={styles.sectionHeader}>
    <div>
      <h2>未来 10 年热门方向猜想</h2>
    </div>
    <p>不是官方结论，而是把政策、产业和家长讨论热度压缩成一个更适合开始讨论的入口。</p>
  </div>
</section>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.module.css lib/hot-directions.ts tests/hot-directions.test.ts
git commit -m "feat: preview hot directions on homepage"
```

### Task 4: Add final copy constraints and route linking

**Files:**
- Modify: `app/directions/page.tsx`
- Modify: `app/page.tsx`
- Modify: `data/hot-directions.ts`
- Test: `tests/hot-directions.test.ts`

- [ ] **Step 1: Write the failing test for content boundaries**

```ts
test("keeps stomatology in controversy list instead of the main top ten", () => {
  const topic = getHotDirectionTopic();
  assert.equal(topic.mainDirections.some((item) => item.slug === "stomatology"), false);
  assert.equal(topic.controversyDirections.some((item) => item.slug === "stomatology"), true);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL if the lists are not yet split correctly

- [ ] **Step 3: Implement the final copy + links**

```tsx
<p className={styles.disclaimer}>
  这不是官方排名，而是基于政策、产业与讨论热度整理的趋势猜想。
</p>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/directions/page.tsx app/page.tsx data/hot-directions.ts tests/hot-directions.test.ts
git commit -m "feat: finalize hot directions topic structure"
```

### Task 5: Verify the full feature

**Files:**
- Modify: `docs/superpowers/plans/2026-04-01-hot-directions.md`

- [ ] **Step 1: Run focused tests**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 2: Run the existing regression tests**

Run: `pnpm dlx tsx --test tests/shanghai-high-value-imports.test.ts tests/shanghai-high-value-data.test.ts tests/shanghai-admissions-compare.test.ts tests/school-risk-card.test.ts`
Expected: PASS

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: exit 0

- [ ] **Step 4: Run build**

Run: `pnpm build`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/plans/2026-04-01-hot-directions.md
git commit -m "docs: record hot directions implementation plan"
```
