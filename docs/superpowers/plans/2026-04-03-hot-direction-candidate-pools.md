# Hot Direction Candidate Pools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the `/directions` topic so each main direction includes a ranked pool of 5-10 school + undergraduate-entry candidates.

**Architecture:** Extend the existing hot-direction data model with structured candidate records, then teach the helper layer to attach school metadata for those records. Update the topic page to render a compact ranked candidate list inside each main card while preserving the existing trend-analysis content and category anchors.

**Tech Stack:** TypeScript, Next.js App Router, CSS Modules, Node test runner, `tsx`

---

### Task 1: Define candidate-pool behavior with failing tests

**Files:**
- Modify: `tests/hot-directions.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
test("exposes ranked candidate pools for each main direction", () => {
  const topic = getHotDirectionTopic();
  const aiDirection = topic.mainDirections.find((item) => item.slug === "artificial-intelligence");

  assert.ok(topic.mainDirections.every((item) => item.candidatePrograms.length >= 5));
  assert.equal(aiDirection?.candidatePrograms[0]?.school.slug, "tsinghua-university");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL because `candidatePrograms` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export type HotDirectionCandidateRecord = {
  schoolSlug: string;
  entryLabel: string;
  rationale: string;
  tags: string[];
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/hot-directions.test.ts data/hot-directions.ts lib/hot-directions.ts
git commit -m "test: define hot direction candidate pools"
```

### Task 2: Populate candidate-pool data and helper mapping

**Files:**
- Modify: `data/hot-directions.ts`
- Modify: `lib/hot-directions.ts`
- Test: `tests/hot-directions.test.ts`

- [ ] **Step 1: Add a failing assertion for candidate metadata**

```ts
test("keeps candidate recommendations attached to known in-site schools", () => {
  const topic = getHotDirectionTopic();

  assert.ok(
    topic.mainDirections.every((item) =>
      item.candidatePrograms.every((candidate) => candidate.school.name.length > 0),
    ),
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL because candidates are not mapped to school metadata yet.

- [ ] **Step 3: Implement the data + helper mapping**

```ts
function attachCandidatePrograms(record: HotDirectionRecord): HotDirectionCandidateView[] {
  return record.candidatePrograms
    .map((candidate) => schoolsBySlug.get(candidate.schoolSlug))
    .filter(Boolean)
    .map((school) => ({ school, entryLabel: "...", rationale: "...", tags: ["..."] }));
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add data/hot-directions.ts lib/hot-directions.ts tests/hot-directions.test.ts
git commit -m "feat: add hot direction candidate pool data"
```

### Task 3: Render the candidate pools on the topic page

**Files:**
- Modify: `app/directions/page.tsx`
- Modify: `app/directions/page.module.css`
- Test: `tests/hot-directions.test.ts`

- [ ] **Step 1: Add a failing test for display assumptions**

```ts
test("keeps clinical medicine in the main list while exposing five candidate programs", () => {
  const topic = getHotDirectionTopic();
  const clinical = topic.mainDirections.find((item) => item.slug === "clinical-medicine");

  assert.equal(clinical?.candidatePrograms.length, 5);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: FAIL if clinical medicine candidates are missing.

- [ ] **Step 3: Implement the page UI**

```tsx
<div className={styles.candidateBlock}>
  <strong>方向候选池</strong>
  <ol className={styles.candidateList}>
    {direction.candidatePrograms.map((candidate) => (
      <li key={`${direction.slug}-${candidate.school.slug}-${candidate.entryLabel}`}>
        <Link href={`/schools/${candidate.school.slug}`}>{candidate.school.name}</Link>
      </li>
    ))}
  </ol>
</div>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/directions/page.tsx app/directions/page.module.css tests/hot-directions.test.ts
git commit -m "feat: show candidate pools on hot directions page"
```

### Task 4: Verify the feature and regressions

**Files:**
- Modify: `docs/superpowers/plans/2026-04-03-hot-direction-candidate-pools.md`

- [ ] **Step 1: Run focused tests**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts`
Expected: PASS

- [ ] **Step 2: Run regression tests**

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
git add docs/superpowers/plans/2026-04-03-hot-direction-candidate-pools.md
git commit -m "docs: add hot direction candidate pool plan"
```
