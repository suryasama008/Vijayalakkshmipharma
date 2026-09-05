# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 3c-1

Read the prior hand-offs first (`HANDOFF-PHASE-1.md` → `HANDOFF-PHASE-2-PART-1.md`
→ `-1B.md` → `-2A.md` → `-2B.md` → `-3A.md` → `-3B-1.md` → `-3B-2.md`) — this
file only covers what changed in this step.

## What this step did
Wrote full rich content for **24 of the 105 products in the `excipients`
category** — the binders / disintegrants / film-coating & suspending
polymers sub-group. Same infrastructure as before, no schema/UI changes.

### Breakdown
- **Cellulose ethers/esters (7)**: Calcium CMC, Sodium CMC, Ethyl Cellulose,
  HPMC, HPMC E5/E15/K100M, HPMC Phthalate, Hydroxy Propyl Cellulose.
- **Superdisintegrants (4)**: Croscarmellose Sodium (CCS), Crospovidone,
  Crospovidone XL-10 USP, Sodium Starch Glycolate.
- **Povidone binders (2)**: PVP K30, PVP K90.
- **Carbomers (2)**: Carbomer 940, Carbomer 980.
- **Natural gums/polysaccharides (3)**: Sodium Alginate, Xanthan Gum,
  Guar Gum.
- **Enteric coating (1)**: Eudragit L-100/S-100.
- **Starches & gelatin (3)**: Starch, Pregelatinised Starch, Gelatin.
- **Other (2)**: Calcium Silicate (anticaking/glidant), Microcrystalline
  Cellulose (MCC PH 101/102/112/200).

CAS numbers verified by web search against multiple independent sources for
every entry in this batch, not just the uncommon ones — polymer CAS numbers
in particular are easy to mix up (e.g. Crospovidone 25249-54-1 is **not**
the same as Povidone/PVP 9003-39-8, even though both are PVP-family
polymers), so I checked each one rather than relying on memory.

**Polymer molecular weight/formula handling:** true polymers (celluloses,
PVP, carbomer, gums, gelatin, starches, Eudragit) get a CAS number (the
generic substance-class CAS pharma suppliers commonly cite) but **no
Molecular Weight field**, since these are polymers with a distribution of
chain lengths, not a single molecular species — same "skip fields you can't
confidently assert" rule as Paraformaldehyde/Light Liquid Paraffin in Part
3 solvents batches. I did not invent a placeholder MW for any of them.

**No regulated-chemical FAQ needed this batch** — unlike the solvents parts
(Benzene, Chloroform, Potassium Permanganate, etc.), none of these 24
binders/disintegrants/polymers are controlled/precursor chemicals, so no
end-use-documentation FAQ was added.

### Duplicate check before writing (per standing instruction)
Checked this batch against all other categories. Found **two legitimate
cross-category grade/form splits** that weren't cross-linked yet, and fixed
them (added `relatedSlugs` both directions, same pattern as Titanium
Dioxide / Sodium Bicarbonate in earlier parts):
- `xanthan-gum` (excipients, pharma grade) ↔ `food-grade-xanthan-gum`
  (food-nutra) — same CAS (11138-66-2), different grade/category.
- `starch` (excipients, pharma grade) ↔ `starch-food-grade` (food-nutra)
  — same generic ingredient, different grade/category. (`potato-starch`,
  also in food-nutra, is a distinct single-source product and was left
  alone — not a duplicate.)

I only added the cross-links, without rewriting the existing FAQ copy on
`food-grade-xanthan-gum` / `starch-food-grade`, to avoid touching
previously-verified content outside this step's scope.

**Within this batch**, several products share a CAS number by design and
are *not* duplicates — they're legitimate same-polymer/grade splits, now
cross-linked with clarifying FAQs where confusion seemed likely:
- Carbomer 940 ↔ Carbomer 980 (both CAS 9003-01-4 — same polymer class,
  different viscosity/clarity grade).
- Crospovidone ↔ Crospovidone XL-10 USP (both CAS 25249-54-1 — same
  polymer, XL-10 is a finer/more uniform particle-size USP grade).
- HPMC ↔ HPMC E5/E15/K100M (both CAS 9004-65-3 — general HPMC vs. a
  curated viscosity-grade subset).
- PVP K30 ↔ PVP K90 (both CAS 9003-39-8 — same polymer, different
  K-value/viscosity grade).
- Starch ↔ Pregelatinised Starch (both CAS 9005-25-8 — same base
  compound, physically modified vs. native).

No other cross-category or within-batch duplicates found.

## ⚠️ Verification NOT run this session (same as all prior parts)
This sandbox still has **no network access for `npm`** — `npm install`
fails with a 403, so I could not run `npx tsc --noEmit` / `npm run build`
/ `npm run lint`. Validated by hand instead:
- `products.json` is valid JSON, 292 entries (unchanged count).
- Every product's keys are a subset of the `Product` type — no stray
  fields (checked across the **whole** file, all 292 products).
- Re-ran the dangling `relatedSlugs` check across the whole file — none
  found.
- Checked for duplicate CAS numbers across the **entire** catalogue —
  every match found is a legitimate grade-split pair, either newly
  documented above or already known from earlier hand-offs (Titanium
  Dioxide, Aerosil 200/R972 variants, Sodium Bicarbonate, caustic
  potash/soda flake↔pellet, soda ash↔sodium carbonate).

**Please run the real build/lint/typecheck yourself** before treating this
as fully verified — same caveat as every prior part.

## Current file state (for quick orientation)
- 292 products, 13 categories.
- **211 products now have full rich content.** **81 do not yet** — all in
  `excipients`.
- `excipients` (105): **24 done** (binders/disintegrants/coating &
  suspending polymers). **81 remaining**, split roughly as:
  - Preservatives/antioxidants: Methylparaben Sodium, Propylparaben
    Sodium, Bronopol, BHA, BHT, Benzyl Alcohol, Benzoic Acid, Sodium
    Benzoate, Disodium Edetate, EDTA Dipotassium.
  - Sweeteners/sugars: Aspartame, Fructose, Sucralose, Sucrose,
    Mannitol, Sorbitol, Maltodextrin, Dextrose, Liquid Glucose, Sodium
    Saccharin.
  - Salts/minerals (largest remaining sub-group, ~40): calcium/
    magnesium/potassium/zinc/sodium/ferrous salts (citrates, gluconates,
    lactates, sulphates, chlorides, acetates, oxides, carbonates), plus
    Dicalcium/Tricalcium Phosphate, Boric Acid, Lactic Acid, Malic Acid,
    Fumaric Acid.
  - Waxes/lubricants/surfactants: Cetostearyl/Cetyl Alcohol, Stearic
    Acid Powder, Calcium/Zinc Stearate, Sodium Stearyl Fumarate, SLS,
    SLES, Tween 20/80.
  - Specialty/misc: Fumed Silica, Colloidal Silicon Dioxide (Aerosil)
    IP *(⚠️ check this against the existing `fumed-silica` and
    `aerosil-*` products in `silicon-dioxide` — likely another
    cross-category duplicate to cross-link, not yet checked this
    session)*, Lycopene, Menthol Crystal, Caramel Colour, Yeast Extract
    Powder, Light Magnesium Oxide/Carbonate.

## What's next — Phase 2, Part 3c-2 / 3c-3
Suggest splitting the remaining 81 into two more sessions: one for
preservatives/antioxidants/sweeteners (~20), one for the salts/minerals/
waxes/misc block (~61, may itself need a further split given its size).
**Before writing salts/minerals content, do the `fumed-silica` /
`colloidal-silicon-dioxide-aerosil-ip` duplicate check flagged above.**

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
