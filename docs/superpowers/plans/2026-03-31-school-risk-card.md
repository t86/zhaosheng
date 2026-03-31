# School Risk Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a source-backed Shanghai risk card to school detail pages so families can see what is already verified, what needs original-source confirmation, and which project-level risks exist.

**Architecture:** Build a pure data-mapping layer that converts existing school, Shanghai admissions, and featured-track signals into a single `SchoolRiskCard` view model. Render that model in the school detail page with a compact, source-linked UI and reuse the official Shanghai checklist for the final confirmation layer.

**Tech Stack:** Next.js App Router, TypeScript, CSS Modules, Node `node:test`

---

### Task 1: Write the failing tests for the risk-card view model

**Files:**
- Create: `tests/school-risk-card.test.ts`
- Create: `lib/school-risk-card.ts`

- [ ] **Step 1: Write the failing test cases**

```ts
test("falls back to pending Shanghai coverage when no school-specific signals exist", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [],
  });

  assert.equal(card.statusLabel, "上海口径待补");
  assert.equal(card.evidences[0]?.title, "当前还没补到稳定的上海公开线");
});
```

```ts
test("surfaces exact lines, threshold records, school supplement and Shanghai special-track files", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [...],
    shanghaiFocus: {...},
    majorProfile: { featuredTracks: [...] },
  });

  assert.ok(card.evidences.some((item) => item.title === "上海考试院已公开院校专业组线"));
  assert.ok(card.evidences.some((item) => item.title === "高分段仍有阈值口径"));
  assert.ok(card.evidences.some((item) => item.title === "学校官网还有补充分数口径"));
  assert.ok(card.evidences.some((item) => item.title === "特色项目已核到上海批次要求文件"));
});
```

```ts
test("surfaces cooperation, internal-selection and long-cycle training signals from featured tracks", () => {
  const card = buildSchoolRiskCard({
    slug: "demo-school",
    name: "示例大学",
    shanghaiRecords: [],
    majorProfile: { featuredTracks: [...] },
  });

  assert.ok(card.evidences.some((item) => item.title === "中外合作或异地培养项目要单独核"));
  assert.ok(card.evidences.some((item) => item.title === "不是所有强班都能在普通批直接锁定"));
  assert.ok(card.evidences.some((item) => item.title === "部分项目天然偏长周期深造"));
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `pnpm dlx tsx --test tests/school-risk-card.test.ts`

Expected: FAIL because `lib/school-risk-card.ts` is not implemented yet.

### Task 2: Implement the risk-card data builder

**Files:**
- Create: `lib/school-risk-card.ts`
- Modify: `tests/school-risk-card.test.ts`

- [ ] **Step 1: Implement the minimal `SchoolRiskCard` builder**

```ts
export function buildSchoolRiskCard(input: SchoolRiskCardInput): SchoolRiskCard {
  const insight = getShanghaiAdmissionsInsight(input.slug, input.shanghaiRecords);
  const tracks = input.majorProfile?.featuredTracks ?? [];

  return {
    statusLabel: "...",
    statusTone: "...",
    headline: "...",
    summary: "...",
    badges: [...],
    evidences: [...],
    checks: shanghaiDecisionGuide.checks,
    officialLinks: [...],
  };
}
```

- [ ] **Step 2: Keep evidence generation source-backed**

Implementation rules:
- derive admissions evidence only from `shanghaiRecords`
- derive school supplement evidence only from `shanghaiFocus`
- derive project evidence only from `featuredTracks` tags, route labels, notes and official source notes
- use “已核到/需回原文确认” phrasing for incomplete fields

- [ ] **Step 3: Re-run the tests**

Run: `pnpm dlx tsx --test tests/school-risk-card.test.ts`

Expected: PASS

### Task 3: Render the school-page section

**Files:**
- Modify: `app/schools/[slug]/page.tsx`
- Modify: `app/schools/[slug]/page.module.css`

- [ ] **Step 1: Wire the builder into the page**

```ts
const schoolRiskCard = buildSchoolRiskCard({
  slug,
  name: school.name,
  majorProfile: school.majorProfile,
  shanghaiRecords,
  shanghaiFocus,
});
```

- [ ] **Step 2: Add a new section before the major-ranking block**

Render:
- section title and summary
- status badge and tags
- evidence cards with source links
- official checklist cards

- [ ] **Step 3: Add responsive styles**

Need:
- tag row wrapping
- 2-column evidence grid on desktop
- 1-column layout on mobile
- color variants for `teal / amber / ink / rose`

### Task 4: Verify integration

**Files:**
- Modify: `app/schools/[slug]/page.tsx`
- Modify: `app/schools/[slug]/page.module.css`
- Modify: `lib/school-risk-card.ts`
- Modify: `tests/school-risk-card.test.ts`

- [ ] **Step 1: Run the risk-card test**

Run: `pnpm dlx tsx --test tests/school-risk-card.test.ts`

Expected: PASS

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS

- [ ] **Step 3: Run production build**

Run: `pnpm build`

Expected: PASS

- [ ] **Step 4: Manually inspect one school page**

Run: `pnpm dev`

Check:
- section appears near the top
- evidence cards do not overflow
- schools with no Shanghai records still show an honest fallback
