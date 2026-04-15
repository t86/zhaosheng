# Qiangji Headline Schools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the strong-foundation section on `/selection` so it foregrounds 清北华五 headline schools, marks `2025 官方完整口径 / 2026 待更新`, and adds a HKU Shanghai-teaching-base reminder without mislabeling it as a mainland admissions campus.

**Architecture:** Extend the existing `selectionGuide.qiangji` data shape with small, focused collections for status panels, headline school cards, focused cases, and a Hong Kong reminder card. Keep the route structure unchanged and render the new data blocks in `app/selection/page.tsx`, with minimal CSS additions in the existing module so the page remains consistent with the current visual language.

**Tech Stack:** TypeScript, Next.js App Router, CSS Modules, Node test runner, `tsx`

---

### Task 1: Define the new qiangji data shape with failing tests

**Files:**
- Modify: `tests/selection-guides.test.ts`
- Modify: `data/selection-guides.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { selectionGuide } from "../data/selection-guides";

test("exposes headline strong-foundation school cards and status panels", () => {
  assert.equal(selectionGuide.qiangji.statusPanels.length, 2);
  assert.equal(selectionGuide.qiangji.headlineSchoolCards.length, 7);
  assert.equal(selectionGuide.qiangji.headlineSchoolCards[0]?.school, "清华大学");
});

test("keeps focused cases separate from summary notes", () => {
  assert.deepEqual(
    selectionGuide.qiangji.focusSchoolCases.map((item) => item.school),
    ["复旦大学强基批", "清华大学强基批", "上海交通大学强基批"],
  );
  assert.equal(selectionGuide.qiangji.headlineSchoolNotes.length, 4);
});

test("adds an HKU reminder with Shanghai teaching-base wording", () => {
  assert.match(selectionGuide.qiangji.hongKongReminder.title, /港大/);
  assert.match(selectionGuide.qiangji.hongKongReminder.bullets.join(" "), /上海教研基地/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: FAIL because `statusPanels`, `headlineSchoolCards`, `focusSchoolCases`, `headlineSchoolNotes`, and `hongKongReminder` do not exist.

- [ ] **Step 3: Write minimal implementation**

```ts
export type HeadlineSchoolCard = {
  school: string;
  status: string;
  majorRange: string;
  qualificationRule: string;
  assessment: string;
  exceptionRule: string;
  takeaway: string;
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/selection-guides.test.ts data/selection-guides.ts
git commit -m "test: define qiangji headline school data"
```

### Task 2: Populate 2025 official-or-stable headline school content

**Files:**
- Modify: `data/selection-guides.ts`
- Test: `tests/selection-guides.test.ts`

- [ ] **Step 1: Add a failing test for content boundaries**

```ts
test("marks 2025 official coverage separately from 2026 pending updates", () => {
  const statuses = selectionGuide.qiangji.statusPanels.map((item) => item.title);

  assert.deepEqual(statuses, ["2025 官方完整口径", "2026 待更新"]);
  assert.match(selectionGuide.qiangji.headlineSchoolCards[3]?.takeaway ?? "", /上海/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: FAIL if the copied content does not yet match the required wording.

- [ ] **Step 3: Implement the structured content**

```ts
statusPanels: [
  {
    title: "2025 官方完整口径",
    subtitle: "本轮按学校招生网、强基简章和官方通知整理",
    tone: "cool",
    bullets: ["适合拿来比较学校差异。"],
  },
  {
    title: "2026 待更新",
    subtitle: "若 2026 简章未公开，不硬写新规则",
    tone: "alert",
    bullets: ["页面会优先保留 2025 已公开规则。"],
  },
],
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add data/selection-guides.ts tests/selection-guides.test.ts
git commit -m "feat: add qiangji headline school content"
```

### Task 3: Render status panels and headline school matrix on `/selection`

**Files:**
- Modify: `app/selection/page.tsx`
- Modify: `app/selection/page.module.css`
- Test: `tests/selection-guides.test.ts`

- [ ] **Step 1: Add a failing test for UI-facing data assumptions**

```ts
test("keeps the headline school matrix and focused cases in display order", () => {
  assert.equal(selectionGuide.qiangji.headlineSchoolCards[0]?.school, "清华大学");
  assert.equal(selectionGuide.qiangji.focusSchoolCases[2]?.school, "上海交通大学强基批");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: FAIL if the new arrays are not stable yet.

- [ ] **Step 3: Implement the page blocks**

```tsx
<div className={styles.panelGridTwo}>
  {qiangji.statusPanels.map((panel) => (
    <BulletCard key={panel.title} panel={panel} />
  ))}
</div>

<div className={styles.headlineSchoolGrid}>
  {qiangji.headlineSchoolCards.map((item) => (
    <article className={styles.headlineSchoolCard} key={item.school}>
      <strong>{item.school}</strong>
      <span>{item.status}</span>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/selection/page.tsx app/selection/page.module.css tests/selection-guides.test.ts
git commit -m "feat: show qiangji headline school matrix"
```

### Task 4: Replace the old case emphasis with focused cases and summary notes

**Files:**
- Modify: `app/selection/page.tsx`
- Modify: `app/selection/page.module.css`
- Modify: `data/selection-guides.ts`
- Test: `tests/selection-guides.test.ts`

- [ ] **Step 1: Add a failing test for the school-note split**

```ts
test("keeps north china and east china headliners out of the summary-note bucket", () => {
  const summarySchools = selectionGuide.qiangji.headlineSchoolNotes.map((item) => item.school);

  assert.equal(summarySchools.includes("清华大学"), false);
  assert.equal(summarySchools.includes("北京大学"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: FAIL until the summary-note bucket is populated correctly.

- [ ] **Step 3: Implement the focused-case and summary-note UI**

```tsx
<div className={styles.caseList}>
  {qiangji.focusSchoolCases.map((item) => (
    <TimelineCase item={item} key={item.school} />
  ))}
</div>

<div className={styles.noteGrid}>
  {qiangji.headlineSchoolNotes.map((item) => (
    <article className={styles.noteCard} key={item.school}>
      <strong>{item.school}</strong>
      <ul className={styles.bulletList}>
        {item.notes.map((note) => (
          <li key={`${item.school}-${note}`}>{note}</li>
        ))}
      </ul>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/selection/page.tsx app/selection/page.module.css data/selection-guides.ts tests/selection-guides.test.ts
git commit -m "feat: split qiangji cases into focus and summary groups"
```

### Task 5: Add the HKU Shanghai reminder card with careful wording

**Files:**
- Modify: `app/selection/page.tsx`
- Modify: `data/selection-guides.ts`
- Test: `tests/selection-guides.test.ts`

- [ ] **Step 1: Add a failing test for wording boundaries**

```ts
test("describes HKU in Shanghai as a teaching base rather than a standalone mainland campus", () => {
  const reminderText = selectionGuide.qiangji.hongKongReminder.bullets.join(" ");

  assert.match(reminderText, /一院两校区/);
  assert.doesNotMatch(reminderText, /正式校区/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: FAIL until the reminder wording is added.

- [ ] **Step 3: Implement the reminder block**

```tsx
<div className={styles.panelGridOne}>
  <BulletCard panel={qiangji.hongKongReminder} />
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/selection/page.tsx data/selection-guides.ts tests/selection-guides.test.ts
git commit -m "feat: add hku shanghai reminder to selection guide"
```

### Task 6: Verify the full feature

**Files:**
- Modify: `docs/superpowers/plans/2026-04-08-qiangji-headline-schools.md`

- [ ] **Step 1: Run focused tests**

Run: `pnpm dlx tsx --test tests/selection-guides.test.ts`
Expected: PASS

- [ ] **Step 2: Run existing regression tests**

Run: `pnpm dlx tsx --test tests/hot-directions.test.ts tests/shanghai-high-value-imports.test.ts tests/shanghai-high-value-data.test.ts tests/shanghai-admissions-compare.test.ts tests/school-risk-card.test.ts`
Expected: PASS

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: exit 0

- [ ] **Step 4: Run build**

Run: `pnpm build`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/plans/2026-04-08-qiangji-headline-schools.md
git commit -m "docs: add qiangji headline schools implementation plan"
```
