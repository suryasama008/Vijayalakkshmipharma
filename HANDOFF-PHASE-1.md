# Vijayalakkshmi Pharma — Hand-off after Phase 1

Read this before touching the project. It tells you exactly what's done, what
decisions were made and why, and what's still queued up across the remaining
phases. The overall job (from the owner's original brief) is being done in
phases on purpose — it's too large for one pass. This file is Phase 1's
report card + Phase 2's briefing.

## Full project brief (all phases, for context)

1. ✅ Add ~250 new products across new + existing categories (Phase 1)
2. ✅ Category dropdown in navbar (Phase 1)
3. ✅ Remove "pack size" from product listings/schema (Phase 1)
4. ✅ Rename "Pharma Colours" category label to "Colours" (Phase 1)
5. ✅ SEO-friendly category structure (Phase 1)
6. ⬜ Elaborate per-product detail content (overview, specs, applications,
   FAQ, related products — like the sample the owner attached) + matching UI
   (Phase 2)
7. ⬜ Broader SEO pass — metaTitle/metaDescription/schema per product,
   internal linking, sitemap priorities (rolls into Phase 2)
8. ⬜ General UI/UX reshape "to make it perfect" (Phase 3 — do after content
   exists, not before; redesigning around empty content wastes work)
9. ⬜ Image optimization / file-size reduction (Phase 4 — independent of the
   others, can be done anytime, but do it after any hero/product imagery
   changes from Phase 3 so you don't optimize images twice)

## What Phase 1 actually did

### 1. `src/data/products.json`
- Went from 165 → **295 products**, across **13 categories** (up from 4).
- Every product had its `packing` field **deleted** (see "packing removal"
  below).
- New products use this minimal shape (matches the pre-existing convention
  in the file):
  ```json
  {
    "id": "slug-here",
    "name": "Display Name With Grade IP/BP/USP",
    "slug": "slug-here",
    "category": "category-slug",
    "featured": false,
    "created_at": "2026-09-04T00:00:00.000Z"
  }
  ```
- **`origin` was deliberately left unset on all 130 new products.** The
  existing 165 products all have real values like "Imported", "China",
  "Indian" — that's factual supply-chain information I have no way to know,
  and I didn't want to fabricate it on a live business site. **The owner
  needs to fill in real `origin` values for the new products** (or tell you
  what they are, so you can). Same logic applies to `grade` — where the
  owner's own list already specified a grade (e.g. "IP/BP/USP"), I baked it
  into the `name` field to match the existing dataset convention; I did not
  invent grades that weren't given.
- A handful of **existing** products were recategorized/renamed instead of
  duplicated, because the owner's new list overlapped with what was already
  in the catalogue:
  - `vitamin-b1`, `vitamin-b2`, `vitamin-b6`, `vitamin-b12`, `vitamin-c`,
    `vitamin-d2`, `vitamin-d3`, `ascorbic-acid`, `folic-acid`,
    `sodium-ascorbate` → moved from `excipients` to the new `vitamins`
    category. Several got clarifying suffixes, e.g. `Vitamin B1 (Thiamine
    HCl)`, `Vitamin B12 (Cyanocobalamin)`.
  - `iron-oxide-red/yellow/black` → grade suffix `IP/BP/USP` added to the
    name (owner's colours list specified this grade).
  - `magnesium-stearate`, `ethyl-cellulose`, `hpmc-phthalate`,
    `microcrystalline-cellulose-mcc`, `iso-propyl-alcohol-ipa`, `sorbitol`,
    `methylene-dichloride-mdc` → name enriched with the grade/variant info
    from the owner's list instead of creating a near-duplicate product.
  - **Known remaining near-duplicate**: `Ascorbic Acid` and `Vitamin C` are
    still two separate products (they were already separate before Phase 1,
    both now under `vitamins`). Likewise `Whey Protein 80%`
    (amino-acids) is effectively the same thing as "Whey Protein
    Concentrate (WPC 80)" from the owner's list, which was **not** added as
    a new item for that reason. Flag these to the owner in Phase 2 and ask
    whether to merge.
  - Items skipped entirely as true duplicates of existing products (do NOT
    re-add these): Isopropyl Alcohol, Sorbitol, Methylene Chloride/DCM,
    Oxalic Acid, Sodium Metabisulphite, EDTA Disodium, Aspartame, Xanthan
    Gum (generic), Guar Gum/Gum Guar, Maltodextrin, Yeast Extract Powder,
    BHA & BHT (added individually instead), Citric Acid Monohydrate.

### 2. Categories (`src/lib/config.ts`)
13 categories now (`slug` → label):
- `solvents` → Solvents & Chemicals
- `colours` → **Colours** (renamed from "Pharma Colours")
- `excipients` → Excipients
- `amino-acids` → Amino Acids & Proteins
- `pellets` → Caustic & Hydroxide Pellets
- `carbonates` → Carbonates & Bicarbonates
- `phosphates` → Phosphates
- `silicon-dioxide` → Silicon Dioxide (Aerosil Grades)
- `vitamins` → Vitamins
- `oils` → Oils & Lipids
- `flavours` → Flavours
- `api` → Active Pharmaceutical Ingredients (API)
- `food-nutra` → Food & Nutraceutical Raw Materials

Each has a unique, keyword-rich `description` used in category page
metadata/H1 support — already reasonably SEO-friendly, but Phase 2 should
still review/expand these once real product content exists.

### 3. Packing removal
- `packing` field removed from `Product` type (`src/lib/types.ts`), from
  every entry in `products.json`, and from all UI/copy that referenced it:
  `ProductCard.tsx`, product detail page (`[slug]/page.tsx` — including the
  JSON-LD schema), `products/page.tsx`, `products/category/[category]/page.tsx`,
  `contact/page.tsx`, homepage (`page.tsx` + `homepage.json`).
- Double-checked with `grep -rn "packing"` across `src/` — clean.

### 4. Navbar category dropdown (`src/components/Navbar.tsx`)
- Desktop: "Categories" button opens a 2-column dropdown panel listing all
  13 categories (click to open/close, closes on outside click).
- Mobile: "Categories" is now a collapsible accordion inside the mobile
  menu instead of 13 flat stacked links.
- Footer (`Footer.tsx`) also updated: category list is now a 2-column grid
  so it doesn't run too long vertically.

### 5. Copy/count updates
- Homepage trust badge and "View All" CTA updated from "150+" to "290+
  Products".
- `homepage.json` SEO description/keywords updated to mention the new
  category range (vitamins, phosphates, carbonates, etc.) and the "Colours"
  rename.

### 6. Verification done
- `npx tsc --noEmit` — clean, no type errors.
- `npm run build` — succeeds, generates all 295 product pages + 13 category
  pages statically.
- `npm run lint` — clean.
- Visually spot-checked homepage, category dropdown, a product detail page,
  and the footer via a local dev server + screenshots.

## What's next (Phase 2 — elaborate product content)

The owner attached a sample showing the target shape for a fully "elaborated"
product (see their message — a product like `empty-capsules` or
`citric-acid-anhydrous` with `metaTitle`, `metaDescription`, `h1`, `overview`,
`specs`, `applications`, `relatedSlugs`, `faq`, `bestseller`, etc.). That
schema is **richer** than the current `Product` type and is not yet applied
to any of the 295 products.

Suggested approach for Phase 2:
1. Extend `Product`/create a new type (e.g. `ProductDetail`) with the
   optional fields from the sample: `categoryLabel`, `grades[]`,
   `readyStock`, `cas`, `molecularFormula`, `molecularWeight`, `appearance`,
   `metaTitle`, `metaDescription`, `h1`, `overview`, `specs` (key/value),
   `applications[]`, `relatedSlugs[]`, `faq[]`, `bestseller`.
2. Don't try to hand-write unique 200+ word overviews and 4-5 FAQs for 295
   products in one shot — batch it (e.g. 20-30 products per session),
   starting with `bestseller`-worthy / most-searched items per category.
3. Wire the product detail page (`[slug]/page.tsx`) to render `overview`,
   `specs` table, `applications` list, `faq` (with FAQPage JSON-LD), and
   `relatedSlugs` (replacing the current same-category-only related logic)
   when present, falling back to the current minimal rendering when a
   product hasn't been "elaborated" yet. This lets you ship incrementally
   without breaking the 200+ products that don't have rich content yet.
4. Ask the owner for real `origin`/sourcing info for the 130 new products
   before writing detailed "supplier" copy that implies specific sourcing.
5. Resolve the known near-duplicates flagged above (Ascorbic Acid vs Vitamin
   C, Whey Protein 80% vs WPC 80) with the owner before writing separate
   detail pages for both.

## Phase 3 (UI/UX reshape) and Phase 4 (image optimization)
Not started. Notes for whoever picks these up:
- `public/pharma-global-banner.png` is **1.8MB** and `public/vl-pharma-logo.png`
  is 20KB — the banner is the obvious first target for compression/WebP
  conversion (it's used as a background/OG image on every single page).
  `public/hero-bg.jpg` (100KB) is unused in current code — check before
  deleting, may be legacy.
- Don't do the image pass until Phase 3 decides whether the banner image
  itself is being replaced/redesigned — otherwise you optimize an image
  that gets thrown away.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before committing changes
npm run lint      # eslint
```
