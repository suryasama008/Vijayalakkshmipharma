# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 3c-2

Read the prior hand-offs first (`HANDOFF-PHASE-1.md` → `HANDOFF-PHASE-2-PART-1.md`
→ `-1B.md` → `-2A.md` → `-2B.md` → `-3A.md` → `-3B-1.md` → `-3B-2.md` →
`-3C-1.md`) — this file only covers what changed in this step.

## What this step did
Wrote full rich content for **20 of the remaining 81 products in the
`excipients` category** — the preservatives/antioxidants and sweeteners/sugars
sub-groups flagged as next in the Part 3c-1 hand-off. Same infrastructure as
before, no schema/UI changes.

### Breakdown
- **Parabens (2)**: Methylparaben Sodium IP, Propylparaben Sodium IP.
- **Other antimicrobial preservatives (4)**: Bronopol IP, Benzyl Alcohol,
  Benzoic Acid, Sodium Benzoate.
- **Lipophilic antioxidants (2)**: BHA, BHT.
- **Chelating agents (2)**: Disodium Edetate, EDTA Dipotassium.
- **High-intensity sweeteners (3)**: Aspartame, Sucralose, Sodium Saccharin.
- **Sugars/sugar alcohols (5)**: Fructose, Sucrose, Mannitol, Sorbitol,
  Dextrose Anhydrous/Monohydrate.
- **Starch-derived carbohydrates (2)**: Maltodextrin, Liquid Glucose.

CAS numbers verified by web search against multiple independent sources for
every entry in this batch (same standing rule as all prior parts). Two
worth flagging:
- **EDTA Dipotassium**: CAS 25102-12-9 is technically the *dihydrate* (the
  form actually sold commercially); I noted the dihydrate explicitly in the
  formula (`C10H14K2N2O8 · 2H2O`) rather than presenting it as the anhydrous
  salt, since that's what suppliers ship under this CAS.
- **Disodium Edetate**: used CAS 139-33-3 (the commonly-cited "disodium EDTA"
  number) rather than the dihydrate CAS 6381-92-6, matching how the product
  is named (no "dihydrate" in the product name) and consistent with how
  industry listings for plain "Disodium EDTA" cite it.

**Mixture/polymer MW handling (same rule as Part 3c-1):** Maltodextrin (a
starch hydrolysate of variable dextrose-equivalent, no single molecular
species) and Liquid Glucose (an aqueous mixture of dextrose, maltose,
oligosaccharides and dextrins per the BP/USP monograph definition) were both
given a CAS number but **no Molecular Formula/Molecular Weight field**, for
the same reason polymers in Part 3c-1 skipped it — these aren't single
compounds, so I didn't invent a placeholder value.

**Dextrose Anhydrous/Monohydrate** carries both CAS numbers (50-99-7
anhydrous, 5996-10-1 monohydrate) in one spec line since the product name
itself covers both forms — same pattern used for other dual-form products
elsewhere in the catalogue.

### Duplicate check before writing (per standing instruction)
Checked this batch's 20 product names/CAS numbers against every other
category and against the full existing CAS list in the catalogue. **No
cross-category or within-batch duplicates found** — every name search
(paraben, bronopol, BHA/BHT, benzyl alcohol/benzoic/benzoate, EDTA/edetate,
aspartame, fructose, sucralose, sucrose, mannitol, sorbitol, maltodextrin,
dextrose, glucose, saccharin) returned exactly one matching product, and a
full-catalogue CAS-collision check after writing turned up only the
pre-existing legitimate grade-split pairs already documented in earlier
hand-offs (Carbomer 940/980, Crospovidone/XL-10, HPMC/E5-E15-K100M, PVP
K30/K90, Starch/Pregelatinised, caustic potash/soda flake↔pellet, soda
ash↔sodium carbonate, Titanium Dioxide, Xanthan Gum, Sodium Bicarbonate,
Aerosil 200/R972 variants) — nothing new.

**Within this batch**, cross-linked several genuinely related (but
chemically distinct — not duplicate) products with `relatedSlugs` and
clarifying FAQs where confusion seemed likely:
- Methylparaben Sodium ↔ Propylparaben Sodium (commonly used together as a
  synergistic preservative pair).
- Benzyl Alcohol ↔ Benzoic Acid ↔ Sodium Benzoate (the benzoate preservative
  family — all three cross-linked).
- BHA ↔ BHT (commonly combined for synergistic antioxidant protection).
- Disodium Edetate ↔ EDTA Dipotassium (same chelator, different
  counter-ion — FAQ explains when to pick which).
- Mannitol ↔ Sorbitol (isomeric sugar alcohols, same formula/MW, easily
  confused — FAQ explains the practical difference: non-hygroscopic
  crystalline Mannitol for chewables vs. more hygroscopic Sorbitol for
  liquids).
- Aspartame ↔ Sucralose ↔ Sodium Saccharin (loosely cross-linked as
  alternative high-intensity sweeteners; FAQ on Aspartame notes its
  heat/shelf-life limitation vs. Sucralose).
- Fructose ↔ Sucrose ↔ Dextrose Anhydrous/Monohydrate ↔ Liquid Glucose ↔
  Maltodextrin (loosely cross-linked as the sugar/carbohydrate family).

## ⚠️ Verification NOT run this session (same as all prior parts)
This sandbox still has **no network access for `npm`** — `npm install`
fails with a 403, so I could not run `npx tsc --noEmit` / `npm run build` /
`npm run lint`. Validated by hand instead:
- `products.json` is valid JSON, 292 entries (unchanged count).
- Every product's keys are a subset of the `Product` type — checked across
  the **whole** file, all 292 products.
- Re-ran the dangling `relatedSlugs` check across the whole file — none
  found.
- Re-ran the duplicate-CAS check across the **entire** catalogue — every
  match is a legitimate, already-documented grade-split pair (listed above).

**Please run the real build/lint/typecheck yourself** before treating this
as fully verified — same caveat as every prior part.

## Current file state (for quick orientation)
- 292 products, 13 categories.
- **231 products now have full rich content.** **61 do not yet** — all in
  `excipients`.
- `excipients` (105): **44 done**, **61 remaining**:
  - Salts/minerals (largest remaining sub-group, ~40): calcium/magnesium/
    potassium/zinc/sodium/ferrous/manganese/ammonium salts (citrates,
    gluconates, lactates, sulphates, chlorides, acetates, nitrates,
    fumarates), plus Dicalcium/Tricalcium Phosphate, Boric Acid, Lactic
    Acid, Malic Acid, Fumaric Acid, Citric Acid (anhydrous + monohydrate).
  - Waxes/lubricants/surfactants: Cetostearyl/Cetyl Alcohol, Stearic Acid
    Powder, Calcium/Zinc Stearate, Sodium Stearyl Fumarate, SLS, SLES,
    Tween 20/80, Magnesium Stearate, Talc.
  - PEGs: PEG-400, PEG-4000, PEG-6000.
  - Specialty/misc: Fumed Silica, Colloidal Silicon Dioxide (Aerosil) IP
    *(⚠️ still not yet checked against the existing `fumed-silica` and
    `aerosil-*` products in `silicon-dioxide` category — do this duplicate
    check before writing either one)*, Lycopene, Menthol Crystal, Caramel
    Colour, Yeast Extract Powder, Light Magnesium Oxide/Carbonate,
    Magnesium Hydroxide, Zinc Oxide, Lactose IP, Glycine.

## What's next — Phase 2, Part 3c-3 / 3c-4
Suggest splitting the remaining 61 into two more sessions given the size:
one for the ~40 salts/minerals/acids block (may itself need a further
split), one for waxes/lubricants/surfactants/PEGs/specialty-misc (~21).

**Before writing anything in the specialty/misc group, resolve the
`fumed-silica` / `colloidal-silicon-dioxide-aerosil-ip` duplicate-check flag
carried over from Part 3c-1** — check both against the existing
`silicon-dioxide` category products (Aerosil 200/R972/Aeroperl variants)
before writing rich content, since they may need cross-linking rather than
being treated as fully independent products.

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
