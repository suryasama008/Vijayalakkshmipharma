# Vijayalakkshmi Pharma — Hand-off after Phase 3, Part B (product listing + detail pages)

Read `HANDOFF-PHASE-3A.md` first (design system: fonts, brand tokens,
category color/icon system, homepage) — this step builds directly on it
and assumes those tokens/components already exist. Read
`HANDOFF-PHASE-2-PART-3C-4.md` too if you haven't, for the content-layer
history (all 291 products fully written).

## What this step did
Applied the Phase 3A design system (Inter/Jakarta fonts, `--brand-*` /
`--accent-*` tokens, `CategoryIcon`, `category-colors.ts`) to the four
files that actually show product data — this is where the 291 products'
worth of Phase 2 content (`overview`, `specs`, `applications`, `faq`,
`relatedSlugs`) finally gets a UI worthy of it, per the original Phase 1
brief's Phase 3 scope.

### 1. `src/app/products/[slug]/page.tsx` (product detail — highest value change)
- Header card: added a colored category icon badge (via `CategoryIcon` +
  `getCategoryColorClasses`, same system as the homepage category grid),
  plus a new green "Ready Stock" badge when `product.readyStock` is true
  (previously only shown inside the specs table, not up top).
- Specs table: now zebra-striped, in a rounded bordered container, with
  padded cells (`px-4`) — was a bare unstyled `<table>` before.
- Applications list: each item is now a small padded chip
  (`bg-gray-50 rounded-lg`) instead of a bare bullet line.
- FAQ section: added a `HelpCircle` icon next to the heading; accordion
  behavior (`<details>`/`<summary>`) unchanged.
- **Related Products now renders the real `ProductCard` component**
  instead of plain text links in a box. This is the biggest single visual
  upgrade on this page — related items now show grade badges, CAS number,
  and the overview snippet, exactly like every other product grid on the
  site, instead of being a bare name. `getRelatedProducts` /
  `getProductsBySlugs` already return full `Product` objects, so this was
  a drop-in swap (`ProductCard key={item.id} product={item}` instead of
  a hand-rolled `<Link>`).
- All `blue-*` classes replaced with `--brand-*` / `--accent-*` tokens.
- Removed the unused `Package` icon import (replaced by the category icon
  badge) — double-checked with `grep -n "Package\b"` that nothing else in
  the file referenced it.

### 2. `src/app/products/page.tsx` (all-products listing)
- Added a dark navy hero band above the browser (matches the homepage
  hero/CTA styling) with an eyebrow label, `font-display` H1, and the
  existing product-count copy — was a plain white page with a bare H1
  before.

### 3. `src/app/products/category/[category]/page.tsx` (per-category listing)
- Same dark hero band treatment as the all-products page, but now also
  shows the category's colored icon badge next to the heading (reusing
  the Phase 3A `category-colors.ts` mapping) so each of the 13 category
  pages has a distinct visual identity instead of being an identical
  template with different text.
- Breadcrumb and "no products" empty-state CTA migrated to brand tokens.

### 4. `src/components/ProductsBrowser.tsx` (shared search/filter component)
Used by both listing pages above:
- Category tabs: active state now uses `--brand-800`, hover state uses
  `--brand-50`/`--brand-700` (was plain `blue-700`/`blue-50`).
- Search input focus ring/border migrated to brand tokens.
- "Send Enquiry" empty-state button migrated to brand tokens.
- **`ProductCard.tsx` itself was intentionally left untouched again** — it
  already looked clean in Phase 3A and only needed the inherited font
  change, which it already got automatically. If you want to fully retire
  literal `blue-*` there too for consistency, that's a small, safe
  follow-up (it currently uses `blue-50`/`blue-700`/`blue-300` — cosmetically
  fine as-is, just not using the new CSS variables).

## What was deliberately NOT touched in this step
- **`src/components/ProductCard.tsx`** — see note above, working fine,
  left as-is.
- **`src/components/EnquiryForm.tsx`** — the sidebar form on the product
  page still uses whatever styling it had before; not reviewed this
  session. Likely fine since it sits inside the restyled sidebar card, but
  worth a quick look in Phase 3C.
- **About / Contact pages** — still plain, still on the original brief
  as Phase 3C.
- **Images** — still Phase 4, untouched, same as noted in
  `HANDOFF-PHASE-3A.md`.

## ⚠️ Verification NOT run this session (no network, same standing caveat)
Same sandbox limitation as every previous hand-off — no `npm install`, so
no real `npm run build`/`lint`/dev-server screenshot. What was done instead:
- Re-ran the same scoped stand-alone `tsc` pass introduced in Phase 3A
  (stubbed external modules for `react`/`next`/`lucide-react`) across the
  **entire** `src/` tree after these edits. Filtered out the known stub
  artifacts (lucide-react named-export errors, which also appear on
  untouched files) and confirmed **zero new errors** in any file touched
  this session. The only remaining errors after filtering are pre-existing,
  unrelated to this change, and were already present before this session
  (CSS side-effect import typing, `React` namespace usage in
  `layout.tsx`/`EnquiryForm.tsx`, and `process.env` typing in
  `config.ts` — all stub/tsconfig artifacts, not real bugs).
- Manually traced `getRelatedProducts` / `getProductsBySlugs` return types
  in `src/lib/products.ts` to confirm they return full `Product[]` objects
  (not a narrower shape) before swapping the related-products block over
  to `ProductCard` — confirmed safe.
- Grepped for leftover literal `blue-*` classes in all four touched files
  and confirmed every remaining instance is intentional (light-blue text
  on a dark navy background, matching the same pattern already used in
  the Phase 3A homepage hero — not a missed migration).

**Please run `npm install && npm run build && npm run dev` and click
through a product detail page, the all-products page, and a category page
before treating this as fully verified.**

## What's next

### Phase 3C (suggested next chunk) — About / Contact / EnquiryForm
- `src/app/about/page.tsx`, `src/app/contact/page.tsx`,
  `src/components/EnquiryForm.tsx` — apply the same font/brand-token
  treatment. Not reviewed in depth in either Phase 3A or 3B, so start with
  a fresh read of these three files.
- Quick pass on `ProductCard.tsx` to swap its literal `blue-*` classes for
  the brand tokens too, purely for consistency (low risk, low priority).

### Phase 4 (unchanged) — Image optimization
- `public/pharma-global-banner.png` (1.8MB) still needs WebP
  conversion/compression — still safe to do now since the hero visual
  design has been stable across both 3A and 3B.
- Re-verify `public/hero-bg.jpg` (100KB) is actually unused
  (`grep -rn "hero-bg"`) before deleting it.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before treating any part as done
npm run lint      # eslint
```
