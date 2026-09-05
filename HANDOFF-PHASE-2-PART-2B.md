# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 2b

Read the prior hand-offs first (`HANDOFF-PHASE-1.md` →
`HANDOFF-PHASE-2-PART-1.md` → `-1B.md` → `-2A.md`) — this file only covers
what changed in this step.

## What this step did
Wrote full rich content for **36 products** across two categories:
**Amino Acids (19) and Food & Nutraceutical Raw Materials (17)**. No
schema/UI changes — same infrastructure as before.

### Amino Acids (19)
BCAA 2:1:1, L-Arginine (Base + HCl), L-Cysteine HCl, L-Glutamic Acid,
L-Isoleucine, L-Leucine, L-Lysine Acetate, L-Phenylalanine, L-Proline,
L-Threonine, L-Tryptophan, L-Tyrosine, L-Valine, Whey Protein Concentrate
80% (WPC 80), Alpha Lipoic Acid, L-Serine, L-Carnitine, L-Alanine. CAS
numbers/formulas/weights are standard pharmacopoeial facts.
`bcaa-2-1-1`, `l-leucine`, `l-carnitine`, `whey-protein-80` marked
`bestseller: true` (the most commonly requested sports-nutrition items).

One labelling note added to `l-phenylalanine`'s FAQ: PKU (phenylketonuria)
warning-label requirements are a real regulatory consideration for
Phenylalanine-containing products — flagged generically without asserting
a specific jurisdiction's exact wording, since that varies by market.

### Food & Nutraceutical Raw Materials (17)
Food Grade Titanium Dioxide, Food Grade Xanthan Gum, Sodium Bicarbonate
Food Grade, Cocoa Powder, Potassium Sorbate, Potassium Metabisulphite,
Whey Protein Isolate, Soya Protein Isolate, Whey Protein Hydrolysed, Pea
Protein, Rice Protein, Milk Powder, Tara Gum, Sorbic Acid, Starch Food
Grade, Sodium Propionate, Potato Starch.

**Natural/mixture products (Cocoa Powder, the three plant/dairy protein
isolates+hydrolysate, Milk Powder, Starch Food Grade, Potato Starch)
deliberately have no CAS/molecular formula** — same "skip fields you're
not confident about" rule as the oils in Part 2a, since these aren't
single chemical compounds.

**One regulatory note flagged, not resolved:** Titanium Dioxide's FAQ
notes that its food-additive status (E171) varies by country and has
changed in some markets — the copy tells the customer to confirm current
rules for their target market rather than asserting a blanket "it's
approved" claim, since regulatory status isn't something to assert
confidently on a supplier site.

### Duplicate check before writing (per your standing instruction to flag
these before elaborating)
Checked `food-nutra` + `amino-acids` for overlaps before writing content —
found none requiring a merge. `sodium-bicarbonate-food-grade` (food-nutra)
and `sodium-bicarbonate` (carbonates, from Part 1) are the same compound
but a legitimate grade-split (food vs. pharma), already cross-referenced
as `relatedSlugs` in both directions — same pattern as other grade splits
already on the site (e.g. Aerosil variants). The three whey products
(WPC 80, Isolate, Hydrolysed) and three plant proteins (Soya/Pea/Rice) are
genuinely different products, not duplicates, and are cross-linked to each
other in `relatedSlugs` with FAQ entries explaining the differences.

## Verified
`npx tsc --noEmit`, `npm run build` (292 product pages + 13 category pages,
314 static routes), `npm run lint` — all clean. Also re-ran the dangling
`relatedSlugs` check across the whole file — none found.

## Current file state (for quick orientation)
- 292 products, 13 categories.
- **86 products now have full rich content** — all of Pellets, Carbonates,
  Phosphates, Silicon Dioxide, API, Vitamins, Oils, Flavours, Amino Acids,
  and Food & Nutra. **206 do not yet.**
- Remaining categories with zero rich content: `colours` (32), `solvents`
  (69), `excipients` (105).

## What's next — Phase 2, Part 3
As scoped in the Part 1 hand-off:
- **Part 3a** (~32 products): `colours`
- **Part 3b** (~69 products): `solvents` — likely split into two
  sub-sessions
- **Part 3c** (~105 products): `excipients` — largest category, split into
  2-3 sub-sessions by sub-type (binders/disintegrants,
  preservatives/antioxidants, salts/minerals, specialty polymers)

Once Part 3 is done, Phase 3 (UI/UX reshape) and Phase 4 (image
optimization) are the remaining phases from the original brief — both
already broken into small chunks in the Part 1 hand-off.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before finishing any part
npm run lint      # eslint
```
