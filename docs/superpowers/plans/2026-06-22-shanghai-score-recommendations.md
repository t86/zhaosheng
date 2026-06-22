# Shanghai Score Recommendations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a score-driven recommendation panel for the Shanghai admissions page that turns an entered score into reach/match/safe school-group candidates and shows related 2025 major examples.

**Architecture:** Add a pure recommendation module that joins latest exact Shanghai professional-group lines with imported 2025 major-admission records by `schoolSlug + groupCode`. Keep `ScoreLocator` as the client UI owner and render richer cards from the recommendation result. The first version remains deterministic and source-backed; GPT is not used for ranking.

**Tech Stack:** Next.js 16, React client component, TypeScript, JSON data imports, Node test runner.

---

### Task 1: Recommendation Engine

**Files:**
- Create: `lib/shanghai-score-recommendations.ts`
- Test: `tests/shanghai-score-recommendations.test.ts`

- [ ] **Step 1: Write the failing test**

Create tests that call `recommendShanghaiGroupsByScore(572)` and assert:
- `match` includes 东南大学 `42201` with `lineScore` 572 and `diff` 0.
- That candidate includes major examples such as `工科试验班(吴健雄班)` and `电子信息类`.
- `reach` includes at least one 573-line candidate.
- Each candidate caps major examples to a small display-friendly list.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --experimental-strip-types --test tests/shanghai-score-recommendations.test.ts`

Expected: failure because the module does not exist yet.

- [ ] **Step 3: Implement the engine**

Create `recommendShanghaiGroupsByScore(score, options?)` that:
- Uses latest exact professional-group lines only.
- Applies existing windows: reach `+1..+15`, match `0..-10`, safe `-11..-30`.
- Joins 2025 major records by `schoolSlug + groupCode`.
- Sorts major examples by best `averageRank`, then higher `averageScore`.
- Returns tier arrays, counts, and threshold-school count for high-score caveats.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --experimental-strip-types --test tests/shanghai-score-recommendations.test.ts`

Expected: all tests pass.

### Task 2: ScoreLocator UI

**Files:**
- Modify: `components/ScoreLocator.tsx`
- Modify: `components/ScoreLocator.module.css`

- [ ] **Step 1: Update the component**

Replace the simple list rows with recommendation cards showing:
- school, group name/code, line score, year, diff label
- top 3 related 2025 majors with average score/rank and admitted count
- detail link to the school page
- note when a candidate has no imported major examples

- [ ] **Step 2: Update responsive styles**

Keep three tier columns on desktop and one column on mobile. Ensure cards have stable spacing and no text overlap.

### Task 3: Verification and Release

**Files:**
- Existing test files and app pages

- [ ] **Step 1: Run focused tests**

Run: `node --experimental-strip-types --test tests/shanghai-score-recommendations.test.ts tests/shanghai-major-admissions.test.ts tests/shanghai-high-value-data.test.ts`

- [ ] **Step 2: Run project checks**

Run: `pnpm lint` and `pnpm build`.

- [ ] **Step 3: Browser-check the Shanghai page**

Open `/admissions/shanghai`, enter `572`, and verify the panel shows tiered recommendation cards and major examples.

- [ ] **Step 4: Commit, push, deploy**

Commit the feature, push `main`, deploy with `DEPLOY_HOST=srv-47-103-137-233 PNPM_CMD=pnpm pnpm deploy:ecs`, then curl-check the live page.
