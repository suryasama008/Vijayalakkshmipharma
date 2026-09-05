# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 1b (duplicate cleanup)

Read `HANDOFF-PHASE-1.md` and `HANDOFF-PHASE-2-PART-1.md` first — this is a
small, focused step in between Part 1 and Part 2, just to close out the two
duplicates that were flagged and left unresolved in both prior hand-offs.

## What triggered this step
The owner confirmed directly: **Ascorbic Acid = Vitamin C**, and
**Whey Protein 80% = WPC 80** — same products, not separate items.

## What was done

### 1. Ascorbic Acid + Vitamin C → merged into one product
- Deleted the `ascorbic-acid` entry entirely (it had no rich content yet,
  nothing to lose).
- Kept `vitamin-c` (it was already `featured: true`) and renamed it to
  **"Vitamin C (Ascorbic Acid)"** so both search terms are covered by one
  page instead of splitting traffic/content across two thin pages.
- Fixed one dangling reference: `paracetamol-ip`'s `relatedSlugs` pointed to
  `ascorbic-acid` — repointed to `vitamin-c`.
- Same pattern as the DSHP/DPHP merge in Part 1 — safe to delete outright
  since neither page is live/indexed yet.

### 2. Whey Protein 80% → renamed to include WPC 80
- No merge needed here (WPC 80 was never added as a separate entry — Part 1
  skipped it on purpose to avoid the duplicate).
- Renamed `whey-protein-80` from **"Whey Protein 80%"** to **"Whey Protein
  Concentrate 80% (WPC 80)"** so the page ranks for both names. Slug
  unchanged.

### 3. Product count updated everywhere
293 → **292** products (−1 from the merge). Updated in:
- `src/app/page.tsx` (homepage CTA)
- `src/app/about/page.tsx` (stat block)
- `src/data/homepage.json` (SEO copy)

### 4. Verified
`npx tsc --noEmit`, `npm run build` (292 product pages + 13 category pages,
314 static routes total), `npm run lint` — all clean.

## What's next — Phase 2, Part 2
Both duplicate flags from Part 1 are now closed, so Part 2 can proceed
exactly as scoped in `HANDOFF-PHASE-2-PART-1.md` §4, with the amino-acids
count adjusted (no more "minus the WPC duplicate" caveat — it's resolved,
just a rename):

- **Part 2** (~60 products): `vitamins` (14, was 15 — one fewer after the
  merge), `oils` (6), `flavours` (9), `food-nutra` (17), `amino-acids` (19)
- Still likely worth one more split given the size — e.g. Part 2a
  (`vitamins` + `oils` + `flavours`, ~29 products) and Part 2b
  (`food-nutra` + `amino-acids`, ~36 products) — but that's a judgment call
  for whoever runs Part 2; either way follow the exact content pattern from
  Part 1 (metaTitle, metaDescription, h1, overview ~80-120 words, specs,
  applications, relatedSlugs, faq, bestseller sparingly).
- Part 3a/3b/3c (colours, solvents, excipients) and Phase 3/4 are unchanged
  from `HANDOFF-PHASE-2-PART-1.md`.

## Current file state (for quick orientation)
- **292 products** in `src/data/products.json`, 13 categories.
- 21 products (Pellets, Carbonates, Phosphates, Silicon Dioxide, API) have
  full rich content. 271 do not yet.
- No `origin`, no `packing`/`packaging` field anywhere in the schema.
- No open duplicate flags remaining.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before finishing any part
npm run lint      # eslint
```
