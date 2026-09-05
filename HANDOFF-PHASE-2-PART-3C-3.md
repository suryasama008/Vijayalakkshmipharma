# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 3c-3

Read the prior hand-offs first (`HANDOFF-PHASE-1.md` → `HANDOFF-PHASE-2-PART-1.md`
→ `-1B.md` → `-2A.md` → `-2B.md` → `-3A.md` → `-3B-1.md` → `-3B-2.md` →
`-3C-1.md` → `-3C-2.md`) — this file only covers what changed in this step.

## What this step did
Wrote full rich content for the **waxes / lubricants / surfactants / PEGs /
specialty-misc** group of remaining `excipients` products flagged as next in
the Part 3c-2 hand-off — **27 products** (the group turned out to be 27, not
~21 as originally estimated). Same infrastructure as before, no schema/UI
changes.

### Breakdown
- **Fatty alcohols (2)**: Cetostearyl Alcohol IP, Cetyl Alcohol IP.
- **Fatty acid / stearate lubricant family (5)**: Stearic Acid Powder,
  Calcium Stearate IP, Zinc Stearate, Magnesium Stearate IP, Sodium Stearyl
  Fumarate.
- **Anionic surfactants (2)**: Sodium Lauryl Sulphate (SLS), SLES Liquid
  (Sodium Lauryl Ether Sulphate).
- **Polysorbates (2)**: Tween 20, Tween 80.
- **Talc (1)**.
- **PEG grades (3)**: PEG 400, PEG 4000, PEG 6000.
- **Fumed silica / colloidal silica (2)**: Fumed Silica, Colloidal Silicon
  Dioxide (Aerosil) IP — see duplicate-check note below.
- **Specialty/misc (10)**: Lycopene, Menthol Crystal, Caramel Colour, Yeast
  Extract Powder, Light Magnesium Oxide IP, Light Magnesium Carbonate
  IP/Heavy, Magnesium Hydroxide, Zinc Oxide, Lactose IP, Glycine.

CAS numbers verified by web search against multiple independent sources for
every entry (same standing rule as all prior parts). Notes worth flagging:
- **Cetostearyl Alcohol IP**: this is a mixture (predominantly cetyl +
  stearyl alcohol per the Ph.Eur. ratio requirement), so — same rule as
  Maltodextrin/Liquid Glucose in Part 3c-1 — it carries a CAS number
  (8005-44-5) but **no single Molecular Formula/Weight**.
- **PEG 400 / 4000 / 6000**: all three share the **same CAS number**
  (25322-68-3) — this is correct and expected; all polyethylene glycol
  grades are registered under one CAS regardless of average molecular
  weight. Each carries an **average MW range** instead of a fixed MW
  (400: 380-420; 4000: ~3,000-4,800; 6000: ~5,400-6,600), consistent with
  polymer handling in prior parts.
- **Light Magnesium Carbonate IP/Heavy**: Ph.Eur./USP describe this as a
  *basic hydrated* magnesium carbonate of variable hydration (light ≈
  trihydrate, heavy ≈ tetrahydrate), not a single stoichiometric compound.
  Used CAS 39409-82-0 (basic magnesium carbonate) alongside the anhydrous
  MgCO3 CAS 546-93-0, and described composition via the IP MgO-content spec
  (40.0-45.0%) rather than inventing one fixed molecular weight.
- **Menthol Crystal**: used CAS 2216-51-5 (L-menthol, the natural/common
  form sold as "Menthol Crystal" IP/BP/USP) rather than 89-78-1
  (racemic/generic menthol), matching how pharma suppliers list this
  product.
- **Caramel Colour** and **Yeast Extract Powder**: both are natural
  process-defined mixtures (not single compounds) — carry a CAS number but
  no Molecular Formula/Weight, same treatment as Caramel/Maltodextrin-type
  entries elsewhere.

### Duplicate check before writing (per standing instruction)
Checked all 27 product names/CAS numbers against every other category and
against the full existing CAS list in the catalogue.

**Resolved the carried-over flag from Part 3c-1/3c-2**: `fumed-silica` and
`colloidal-silicon-dioxide-aerosil-ip` (both `excipients`) share CAS
112945-52-5 with the branded `aerosil-200` / `aerosil-200-pharma` /
`aerosil-200-vv-pharma` / `aeroperl-300-pharma` products in the
`silicon-dioxide` category. This is the same **legitimate grade-split
pattern** already documented for Carbomer 940/980, PVP K30/K90, etc. —
`fumed-silica` is positioned as the general/industrial-grade material,
`colloidal-silicon-dioxide-aerosil-ip` as the IP/BP/USP-NF pharmacopoeial
grade, and both are cross-linked to each other and to the Aerosil branded
products with clarifying FAQs. **No duplicate was removed or merged** —
treated as legitimate separate SKUs, consistent with how the existing
Aerosil 200 / Aerosil 200 Pharma pair is already handled.

A full-catalogue CAS-collision check after writing found only this new
legitimate pair plus the pre-existing documented grade-split pairs
(Carbomer 940/980, Crospovidone/XL-10, HPMC/E5-E15-K100M, PVP K30/K90,
Starch/Pregelatinised, caustic potash/soda flake↔pellet, soda ash↔sodium
carbonate, Titanium Dioxide, Xanthan Gum, Sodium Bicarbonate) plus the
expected PEG 400/4000/6000 shared-CAS group — nothing unexpected.

**Cross-linking**: stearate lubricant family (Stearic Acid, Calcium/Zinc/
Magnesium Stearate, Sodium Stearyl Fumarate) cross-linked with an FAQ on
choosing between Magnesium Stearate and Sodium Stearyl Fumarate; SLS ↔ SLES
FAQ on solid vs. liquid/mild surfactant choice; Tween 20 ↔ Tween 80 FAQ on
laurate vs. oleate ester selection; PEG 400/4000/6000 cross-linked to each
other; magnesium mineral family (Light Mg Oxide, Light Mg Carbonate, Mg
Hydroxide) cross-linked with an antacid-selection FAQ; Fumed Silica ↔
Colloidal SiO2 (Aerosil) IP ↔ Aerosil branded products as above.

## ⚠️ Verification NOT run this session (same as all prior parts)
This sandbox still has **no network access for `npm`** — `npm install`
fails with a 403, so I could not run `npx tsc --noEmit` / `npm run build` /
`npm run lint`. Validated by hand instead:
- `products.json` is valid JSON, 292 entries (unchanged count).
- Every product's keys are a subset of the `Product` type — checked across
  the **whole** file, all 292 products.
- Re-ran the dangling `relatedSlugs` check across the whole file — found
  and fixed two dangling references (`propylene-glycol` → corrected to the
  actual slug `propylene-glycol-ip-bp-usp`; a `glyceryl-monostearate`
  reference removed, as that product doesn't exist in the catalogue yet)
  and one self-reference (`menthol-crystal` pointed to itself — corrected
  to link to `peppermint-flavour-powder-liquid` instead). None remain.
- Re-ran the duplicate-CAS check across the **entire** catalogue — see
  above; every match is a legitimate, already-documented or newly-resolved
  grade-split pair.

**Please run the real build/lint/typecheck yourself** before treating this
as fully verified — same caveat as every prior part.

## Current file state (for quick orientation)
- 292 products, 13 categories.
- **258 products now have full rich content.** **34 do not yet** — all in
  `excipients`, all in the salts/minerals/acids block flagged in Part 3c-2:
  citric acid (anhydrous + monohydrate), Dicalcium/Tricalcium Phosphate,
  Boric Acid, Lactic Acid, Malic Acid, Fumaric Acid, and the
  calcium/magnesium/potassium/zinc/sodium/ferrous/manganese/ammonium salts
  (citrates, gluconates, lactates, sulphates, chlorides, acetates,
  nitrates, fumarates) — 34 products total (see Part 3c-2 hand-off for the
  original list; this is that same block, untouched).

## What's next — Phase 2, Part 3c-4 (final excipients batch)
34 products remain, all salts/minerals/acids. Given the size, consider
splitting further (e.g. citrates/acids ~14, then
gluconates/lactates/sulphates/chlorides/acetates/nitrates/fumarates ~20) or
attempting in one larger session if context allows.

Once `excipients` is fully done, Phase 3 (UI/UX reshape) and Phase 4
(image optimization) are the only phases left, per the original Part 1
hand-off.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before finishing any part
npm run lint      # eslint
```
