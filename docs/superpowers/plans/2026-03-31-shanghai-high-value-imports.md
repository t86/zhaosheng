# Shanghai High-Value Imports Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add import-ready scaffolding for Shanghai major admissions and plan datasets without publishing unverified data.

**Architecture:** Keep the public site driven by explicit status cards while moving future import inputs into dedicated JSON slots. Centralize field definitions and validation in a small library so future manual entry or OCR pipelines both converge on the same schema.

**Tech Stack:** TypeScript, Next.js, Node test runner, `tsx`

---

### Task 1: Define expected import behavior

**Files:**
- Create: `tests/shanghai-high-value-imports.test.ts`

- [x] **Step 1: Write the failing test**

```ts
import {
  getShanghaiHighValueImportManifest,
  validateShanghaiHighValueImports,
} from "../lib/shanghai-high-value-imports";
```

- [x] **Step 2: Run test to verify it fails**

Run: `pnpm dlx tsx --test tests/shanghai-high-value-imports.test.ts`
Expected: FAIL with `Cannot find module '../lib/shanghai-high-value-imports'`

### Task 2: Add import manifest and empty data slots

**Files:**
- Create: `lib/shanghai-high-value-imports.ts`
- Create: `data/shanghai/high-value/major-admissions.json`
- Create: `data/shanghai/high-value/major-plans.json`
- Modify: `data/shanghai-major-admissions.ts`
- Modify: `data/shanghai-major-plans.ts`

- [ ] **Step 1: Export the manifest and validation helpers**
- [ ] **Step 2: Point the existing data wrappers at the empty JSON files**
- [ ] **Step 3: Run `pnpm dlx tsx --test tests/shanghai-high-value-imports.test.ts` and confirm PASS**

### Task 3: Add a reusable validation command

**Files:**
- Create: `scripts/validate-shanghai-high-value-imports.ts`

- [ ] **Step 1: Add a small CLI that prints per-dataset status**
- [ ] **Step 2: Exit with code 1 when imported records miss required fields**
- [ ] **Step 3: Re-run the tests and make sure they stay green**

### Task 4: Keep the page honest about data readiness

**Files:**
- Modify: `app/admissions/shanghai/page.tsx`
- Modify: `app/admissions/shanghai/page.module.css`
- Modify: `lib/shanghai-high-value-data.ts`

- [ ] **Step 1: Reuse the new import manifest to show that data slots are prepared**
- [ ] **Step 2: Keep the public copy explicit that real values are still pending import**
- [ ] **Step 3: Run `pnpm lint` and `pnpm build`**
