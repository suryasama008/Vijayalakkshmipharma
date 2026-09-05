# Vijayalakkshmi Pharma — Hand-off after Phase 3, Part A (visual design system + homepage)

Read `HANDOFF-PHASE-1.md` and the final Phase 2 note
(`HANDOFF-PHASE-2-PART-3C-4.md`) first if you haven't — they cover the full
project history. **Phase 2 (all 291 products fully written) is complete.**
This is the first step of **Phase 3: "make it look professional / like an
MNC"**, which the owner asked for directly. This note covers only what
changed in this step.

## Owner's ask (verbatim intent)
"What else do you want to do to look as professional as possible. Good
looking. It should look like a quality website. It should look like an
MNC." — do it in phases, small chunks, with a hand-off note each time so
another AI session can pick it up without re-reading everything.

## Why this was the right first chunk
The site was functionally solid (291 products, clean data layer, working
SEO/schema, working nav/footer/cards) but visually generic:
- **No real typography** — `globals.css` referenced `--font-geist-sans` but
  `layout.tsx` never actually loaded a font via `next/font`, so the whole
  site was silently falling back to plain Arial/Helvetica. This alone made
  it look like an unfinished template.
- Flat, single-shade-of-blue UI everywhere (`bg-blue-700` hardcoded
  directly in every component) — no real brand palette, no visual
  hierarchy between sections.
- The `color` field already present on every entry in `CATEGORIES`
  (`src/lib/config.ts`) was **defined but never used anywhere in the UI** —
  category cards just showed a plain text label.
- Hero, "why choose us," and CTA sections were plain white blocks with no
  depth (no gradients, no texture, no real visual anchor) — reads as a
  brochure, not an MNC site.

Content (Phase 2) is done, so per the owner's original Phase 1 brief this
was exactly the moment to do the "UI/UX reshape" (Phase 3), and typography
+ a real design system is the highest-leverage, lowest-risk first move
before touching individual pages.

## What this step did

### 1. Real typography (`src/app/layout.tsx`, `src/app/globals.css`)
- Added `next/font/google`: **Inter** (body/UI text) and **Plus Jakarta
  Sans** (headings/display, weights 600/700/800), loaded as CSS variables
  `--font-inter` / `--font-jakarta` on the `<html>` element.
- **Important naming detail**: these variable names are deliberately
  *different* from Tailwind's theme tokens (`--font-sans` /
  `--font-display`). Tailwind v4's `@theme inline` block maps
  `--font-sans: var(--font-inter)` and `--font-display: var(--font-jakarta)`.
  If you ever rename these, do NOT make the next/font variable name and the
  Tailwind theme token name identical (e.g. both `--font-sans`) — that
  creates a self-referencing CSS custom property, which browsers silently
  drop, and you'll be back to the invisible-Arial-fallback bug this step
  fixed. Grep for `--font-inter` / `--font-jakarta` if it looks like fonts
  aren't loading.
- `h1`–`h4` and `.font-display` now use the Jakarta display font
  site-wide via a plain CSS rule in `globals.css` (no per-component class
  needed for that base case); components explicitly opt into
  `font-display` for `h2`/`h3`/`span` elements that aren't naturally
  covered by that rule.

### 2. Brand design tokens (`src/app/globals.css`)
Added CSS custom properties instead of scattering `blue-700` everywhere
going forward:
```
--brand-950 … --brand-50   (deep navy scale — trust/pharma)
--accent-500 / --accent-600 (teal — used for primary CTAs/highlights)
```
Used via Tailwind v4 arbitrary-value syntax, e.g. `bg-[var(--brand-800)]`.
**Existing untouched components/pages still use plain `blue-700` etc. —
this is intentional, not an oversight.** Phase 3B (see below) should
migrate those to the new tokens as it touches each page, rather than
doing a risky global find-replace in this step.
Also added two reusable utility classes: `.bg-dot-grid` /
`.bg-dot-grid-light` (subtle dot-grid texture, used behind the hero and
final CTA band) and `.card-hover` (consistent lift-on-hover for cards).

### 3. Category color/icon system (new files)
- `src/lib/category-colors.ts` — maps each category's existing `color`
  field (already in `CATEGORIES`, was unused) to full literal Tailwind
  class strings (`bg-blue-100`/`text-blue-700`/etc.) and maps each
  category `slug` to a lucide-react icon name.
  **Read the comment at the top of that file before adding a new
  category color** — Tailwind's compiler needs literal class strings, not
  template-interpolated ones (`bg-${color}-100` will NOT work), so any new
  color used in `config.ts` needs a matching entry added here by hand.
- `src/components/CategoryIcon.tsx` — resolves an icon by name from that
  map with a safe fallback (`FlaskConical`) if a name is ever wrong/missing,
  so a typo can never crash rendering — just shows the wrong icon, not a
  broken page.
- **Not independently verified against the installed lucide-react
  version** — see verification caveat below.

### 4. Homepage rebuild (`src/app/page.tsx`)
Kept every existing data source (`homepage.json`, `CATEGORIES`,
`getFeaturedProducts`, `getAllProducts`) — **zero content/copy changes**,
this was a pure presentation pass:
- **Hero**: dark navy gradient + banner image + dot-grid texture (was
  a washed-out white-to-transparent overlay on the same banner), bigger
  display-font headline, pill-style location eyebrow, teal primary CTA +
  glass-effect secondary CTA, and the four `trustPoints` now render as a
  proper stat/trust bar (`<dl>`) instead of floating pill badges.
- **3-up info strip** ("Supplier Location" / "Core Supply Range" /
  "Enquiry Support"): added icon badges, consistent card shadow/hover.
- **Category grid**: now uses `CategoryIcon` + the per-category color from
  `category-colors.ts` for a colored icon badge per card (previously a
  plain uppercase text label), plus a hover-lift and animated arrow.
- **Featured products**: section now sits on a tinted `--brand-50`
  background band instead of plain white, to visually separate it; CTA
  button restyled to match the new palette.
- **Why choose us**: converted from a plain checklist to icon-badge cards
  (matches the 3-up strip style) — one icon per item via a fixed
  `WHY_CHOOSE_ICONS` array indexed by position. If you reorder or add/remove
  items in `homepageData.whyChooseUs.items` (in `homepage.json`), check
  whether the icon-to-item pairing still makes sense.
- **Final CTA band**: dark gradient + dot-grid texture to match the hero
  (bookends the page visually), same phone/WhatsApp/enquiry actions as
  before.

### 5. Navbar / Footer polish (`src/components/Navbar.tsx`, `Footer.tsx`)
Same structure and behavior (desktop dropdown, mobile accordion, sticky
header) — no logic changes, only visual: brand-token colors instead of
hardcoded blue, `font-display` on brand name/footer headings, slightly
refined spacing, footer gets a 4px teal top accent border.

## What was deliberately NOT touched in this step
- **Product listing page, category pages, product detail page
  (`[slug]/page.tsx`)** — still using the old plain-blue styling. This is
  the natural **Phase 3B** and is where the rich Phase-2 content (specs
  tables, FAQs, related products) can finally get real UI treatment, per
  the original Phase 1 brief.
- **About / Contact pages, `EnquiryForm.tsx`, `ProductsBrowser.tsx`,
  `ProductCard.tsx`** — untouched. `ProductCard` already looked reasonably
  clean; it now inherits the new fonts automatically but wasn't otherwise
  changed.
- **Images** — `pharma-global-banner.png` (1.8MB) and other `public/`
  assets are untouched. This is still **Phase 4** per the original plan,
  and per that plan's own note, image work should happen *after* any
  hero/visual redesign settles (this step reused the existing banner, so
  Phase 4 can proceed whenever).
- **No global blue-700 → brand-token find-replace.** Only files actually
  touched in this step use the new tokens. Do this migration page-by-page
  in Phase 3B/3C so each page stays independently reviewable.

## ⚠️ Verification NOT run this session (no network, same as every Phase 2 part)
This sandbox still cannot `npm install` (403), so `npm run dev` /
`npm run build` / `npm run lint` / a real screenshot were **not possible**.
What was done instead:
- Manually reviewed every edited file for consistency (imports used vs.
  declared, JSX structure, data fields referenced actually exist in
  `homepage.json`/`config.ts`).
- Ran a scoped standalone `tsc` pass over the whole `src/` tree with
  stubbed-out external module types (react/next/lucide-react) to catch
  syntax/structural errors. All resulting errors were false positives
  caused by the necessarily-crude stubs (e.g. "lucide-react has no
  exported member 'Phone'") — the **same false positives appear on
  pre-existing, unedited files** (`ProductsBrowser.tsx`,
  `products/[slug]/page.tsx`, etc.), confirming they're stub artifacts, not
  real regressions introduced here.
- **Not verified**: that every lucide-react icon name used
  (`FlaskConical`, `Palette`, `Pill`, `Dna`, `Beaker`, `TestTube`, `Atom`,
  `CircleDot`, `Citrus`, `Droplet`, `Candy`, `ShieldCheck`, `Wheat`,
  `Layers`, `BadgeCheck`, `Boxes`, `Truck`, `Zap`, `ArrowRight`,
  `ChevronDown`) actually exists in the installed `lucide-react@^1.21.0`.
  These are all long-standing, common icon names, but **please run
  `npm run build` first thing** — if any name is wrong, `CategoryIcon.tsx`'s
  fallback means category badges degrade gracefully to a generic flask
  icon rather than crashing, but the `WHY_CHOOSE_ICONS` array in
  `page.tsx` imports icons directly (not through the safe wrapper) and
  **will fail the build** if one of those names doesn't exist — check
  `ShieldCheck`, `Layers`, `BadgeCheck`, `Boxes`, `Truck`, `Zap` and
  `ArrowRight` first if the build fails.
- Tailwind v4 arbitrary-value syntax (`bg-[var(--brand-800)]`) is
  standard and should compile fine, but wasn't run through the actual
  Tailwind compiler in this sandbox — spot check the homepage visually
  once `npm run build && npm run dev` works.

**Please run `npm install && npm run build && npm run dev` and eyeball the
homepage before treating this as fully verified — same standing caveat as
every prior hand-off in this project.**

## What's next

### Phase 3B (suggested next chunk) — Product listing + detail pages
- Redesign `src/app/products/page.tsx`, `products/category/[category]/page.tsx`,
  and especially `products/[slug]/page.tsx` to visually surface the rich
  Phase-2 fields (`overview`, `specs` table, `applications`, `faq`,
  `relatedSlugs`) with the same brand tokens/typography introduced here.
  This is the highest-value remaining chunk since 291 products' worth of
  content currently has minimal UI treatment.
- Migrate these pages' hardcoded `blue-*` classes to the `--brand-*` /
  `--accent-*` tokens while you're in there.
- Consider adding breadcrumbs styling consistency and a sticky "Enquire"
  CTA on the product detail page.

### Phase 3C (suggested after 3B) — About / Contact / Footer detail pass
- `src/app/about/page.tsx`, `src/app/contact/page.tsx`,
  `src/components/EnquiryForm.tsx` — same token/typography migration, plus
  general layout polish (these weren't reviewed in depth this session).

### Phase 4 (unchanged from original plan) — Image optimization
- `public/pharma-global-banner.png` is still 1.8MB and still the
  hero/OG/every-page background image — convert to WebP + compress once
  3B/3C settle whether it's being replaced. `public/hero-bg.jpg` (100KB)
  still looks unused — verify with `grep -rn "hero-bg"` before deleting.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before treating any part as done
npm run lint      # eslint
```
