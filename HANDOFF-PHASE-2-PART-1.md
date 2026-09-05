# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 1

Read `HANDOFF-PHASE-1.md` first if you haven't — this file assumes that
context and only covers what changed since. This response also actioned
two things the owner asked for directly: **removed the `origin` field
entirely**, and **split the remaining work into small, resumable chunks**.

## 1. `origin` field — removed, not just left blank

Per the owner's instruction, `origin` is gone completely:
- Removed from the `Product` type (`src/lib/types.ts`).
- Stripped from every entry in `products.json`.
- Removed from `ProductCard.tsx` display.
- Removed from `homepage.json` copy ("price, grade, MOQ..." — no more
  "origin").
- The product detail page's specs table and JSON-LD no longer reference it
  (this was already partly true from Phase 1's `origin`-blank approach, but
  the field itself is now gone from the schema, not just unset).

If the owner wants sourcing/origin info on the site later, that's a
conscious future decision, not a leftover blank field.

## 2. Phase 2 infrastructure (schema + UI) — done, all in this response

`Product` type (`src/lib/types.ts`) gained a block of **optional** fields
for elaborated content, and two legacy unused fields (`description`,
`cas_number` — both 0% populated) were dropped in favour of the new,
better-named equivalents:

```ts
metaTitle?: string
metaDescription?: string
h1?: string
overview?: string
specs?: Record<string, string>
applications?: string[]
relatedSlugs?: string[]
faq?: { q: string; a: string }[]
bestseller?: boolean
readyStock?: boolean
cas?: string
molecularFormula?: string
molecularWeight?: string
appearance?: string
```

**Deliberately excluded from this schema: `packaging`.** The sample the
owner attached (a different, similarly-structured site) includes a
`packaging` field (e.g. "25 kg HDPE bags") — that's pack-size information,
which is exactly what Phase 1 was asked to remove from this site. Don't
re-add it when following the sample's shape for future batches.

**`src/app/products/[slug]/page.tsx`** now renders conditionally:
- If `product.overview` is set → full rich layout: overview paragraph,
  `specs` table, `applications` checklist, FAQ accordion (with `FAQPage`
  JSON-LD), bestseller badge, and `relatedSlugs`-driven related products
  (resolved via the new `getProductsBySlugs` helper in `src/lib/products.ts`,
  falling back to same-category products if `relatedSlugs` is empty).
- If not → the original minimal layout (grade/CAS/availability table +
  generic supplier blurb + same-category related products). **272 products
  currently render this way and that's fine** — nothing breaks for
  not-yet-elaborated products.
- `generateMetadata` now prefers `product.metaTitle`/`metaDescription` when
  present, falling back to the generated title/description otherwise.

`ProductCard.tsx` gained a small amber "★ Bestseller" badge shown when
`product.bestseller` is true.

Verified: `tsc --noEmit`, `next build` (293 product pages + 13 category
pages), `eslint`, and visual screenshots of an elaborated page
(`aerosil-200`), a merged page (see below), and a still-minimal page
(`acetic-acid`) — all render correctly.

## 3. Phase 2, Part 1 content — done (21 products, 5 categories)

Wrote full rich content (metaTitle, metaDescription, h1, overview, specs,
applications, relatedSlugs, FAQ, bestseller where earned) for every product
in: **Pellets, Carbonates, Phosphates, Silicon Dioxide (Aerosil), and API**.

### Important correction made while writing this content
Two pairs of Phase-1 products turned out to be **the same chemical
compound under two different trade names** — writing separate "unique"
detail pages for both would have been duplicate/thin content and
confusing for customers. Both pairs were merged into one product each
(the redundant slug was deleted — nothing was live/indexed yet, so this is
safe to do now but would need a redirect if done after launch):

- `disodium-hydrogen-orthophosphate-anhydrous-dihydrate-dshp` absorbed
  `dibasic-sodium-phosphate-anhydrous-dihydrate` → renamed to
  **"Disodium Hydrogen Phosphate / Dibasic Sodium Phosphate (DSHP) —
  Anhydrous & Dihydrate"** (both search terms now point to one strong page).
- `dipotassium-hydrogen-orthophosphate-anhydrous-dihydrate-dphp` absorbed
  `dibasic-potassium-phosphate-anhydrous-dihydrate` → renamed to
  **"Dipotassium Hydrogen Phosphate / Dibasic Potassium Phosphate (DPHP)"**.

Product count is now **293** (was 295 after Phase 1, −2 from this merge).
Updated everywhere it's mentioned: `homepage.json`, `page.tsx` CTA,
`about/page.tsx` stat.

### Known remaining duplicate-ish pairs — still flagged, not yet resolved
Carried over from the Phase 1 hand-off, still unresolved, ask the owner
before Part 2/3 content touches these:
- `ascorbic-acid` vs `vitamin-c` (both under `vitamins` now)
- `Whey Protein 80%` (amino-acids) vs the owner's requested "Whey Protein
  Concentrate (WPC 80)" (never added, to avoid the dup)

### Chemistry facts used
All CAS numbers, molecular formulas/weights, and appearance descriptions
used in this batch are well-established, high-confidence facts (common
pharmacopoeial raw materials). Numeric assay/purity thresholds (e.g. exact
"NLT 99.0%" limits) were **deliberately left out** of `specs` — those vary
by exact pharmacopoeial monograph and I didn't want to assert a specific
number without a monograph in hand. If the owner wants exact assay ranges
per grade, that's a good add for a later pass, sourced from the actual
monograph or the supplier's COA.

No manufacturing/facility credentials (e.g. "USFDA-approved plant",
"centralised AC warehouse") were added anywhere — the owner's own
`about/page.tsx` doesn't claim these, and I have no way to verify them for
this business, so FAQ/overview copy stays generic about sourcing.

`readyStock` was left unset on all 21 products for the same reason
`origin` was left unset in Phase 1 — it's a real inventory fact only the
owner knows. Unset renders as "Please enquire," which is honest and
consistent with the rest of the site.

## 4. The rest of Phase 2 — Parts 2 & 3 (not started)

Same infrastructure, no more schema/UI work needed — just content. Split by
category so each part is independently reviewable:

- **Part 2** (~60 products): `vitamins` (15), `oils` (6), `flavours` (9),
  `food-nutra` (17), `amino-acids` (19, minus the WPC duplicate flagged
  above — resolve with owner first)
- **Part 3a** (~32 products): `colours` (32)
- **Part 3b** (~69 products): `solvents` (69) — largest category, consider
  splitting into two sub-sessions (e.g. common solvents vs. specialty/less
  common ones) if a single session runs long
- **Part 3c** (~105 products): `excipients` (105) — largest category by
  far; split into 2-3 sub-sessions by sub-type (binders/disintegrants,
  preservatives/antioxidants, salts/minerals, specialty polymers) rather
  than doing all 105 in one sitting

For each part: follow the exact pattern established in Part 1 (see the
`ENRICH` dict shape in whatever script you use, or just edit
`products.json` directly product-by-product) — metaTitle, metaDescription,
h1, overview (~80-120 words), specs (CAS/formula/MW/appearance/grades —
skip fields you're not confident about), applications (4-6 bullets),
relatedSlugs (3-4, cross-category is fine and often better for SEO
internal linking), faq (3-4 Q&As), bestseller (use sparingly — 1-2 per
category, not everything). Always run `npx tsc --noEmit && npm run build`
before finishing a part.

## 5. Phase 3 (UI/UX reshape) — broken into small chunks

Don't do this until enough categories have rich content (Part 1 done is a
reasonable point to start prototyping the pattern, but the bulk of Phase 3
polish is more valuable once most products are elaborated). Suggested
chunks, each independently shippable:

- **3a — Homepage hero & trust section**: revisit the hero copy/layout now
  that there are 13 categories instead of 4; the category grid below the
  fold could use icons (currently just text labels) or a more visual
  treatment now that there's real content to link to.
- **3b — Category grid & product listing page**: category tiles could show
  product counts; product listing/category pages could get a category
  filter sidebar or search-within-results now that some categories have
  100+ products (currently a flat grid for all).
- **3c — Product detail page visual pass**: the rich layout added in this
  phase is functional but plain (plain table, plain `<details>` FAQ) — a
  proper design pass (icons per spec row, styled FAQ accordion, a
  "Download COA" call-to-action placeholder, breadcrumobard styling) belongs
  here once most products have content worth dressing up.
- **3d — Footer & global nav polish**: footer is functional but generic;
  navbar dropdown works but could get category icons/descriptions in the
  panel now that it's proven with 13 items.

## 6. Phase 4 (image optimization) — broken into small chunks

- **4a — Audit**: confirm which images in `public/` are actually referenced
  in code before touching anything (`grep -rn "public/" src/` or similar).
  Last checked: `pharma-global-banner.png` (1.8MB, used as OG image on
  every page) is the clear priority; `hero-bg.jpg` (100KB) appeared unused
  — verify before deleting.
- **4b — Compress/convert the banner**: convert `pharma-global-banner.png`
  to WebP (or a well-compressed PNG/JPEG) and update the 5+ places it's
  referenced (`page.tsx`, `about/page.tsx`, `contact/page.tsx`,
  `[slug]/page.tsx`, `category/[category]/page.tsx` — check via grep, this
  list may not be exhaustive).
- **4c — Logo & favicon**: `vl-pharma-logo.png` is small (20KB) already;
  low priority, but check favicon/apple-touch-icon files while in there.
- **4d — Any imagery added during Phase 3**: if Phase 3 introduces new
  product/category imagery, optimize those as part of that same phase
  rather than waiting for a separate pass — don't compress something twice.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before finishing any part
npm run lint      # eslint
```

## Current file state (for quick orientation)
- 293 products in `src/data/products.json`, 13 categories.
- 21 products (Pellets, Carbonates, Phosphates, Silicon Dioxide, API) have
  full rich content. 272 do not yet.
- No `origin`, no `packing`/`packaging` field anywhere in the schema.
