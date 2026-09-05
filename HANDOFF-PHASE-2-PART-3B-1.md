# Vijayalakkshmi Pharma — Hand-off after Phase 2, Part 3b-1

Read the prior hand-offs first (`HANDOFF-PHASE-1.md` → `HANDOFF-PHASE-2-PART-1.md`
→ `-1B.md` → `-2A.md` → `-2B.md` → `-3A.md`) — this file only covers what
changed in this step.

## What this step did
Wrote full rich content for the first **25 of 69 products in the
`solvents` category** — the acids/inorganics and alcohols/glycols
sub-groups. No schema/UI changes — same infrastructure as before.

### Breakdown
- **15 acids & inorganics**: Acetic Acid, Citric Acid, Oxalic Acid,
  Phosphoric Acid 85%, Caustic Potash Flakes, Caustic Soda Flakes, Caustic
  Soda Lye, Soda Ash, Sodium Bi Sulphite, Sodium Meta Bisulphite, Sodium
  Nitrite, Sodium Sulphate, Potassium Permanganate, Iodine, Hydrogen
  Peroxide 50%, Hydrazine Hydrate 80%. CAS / molecular formula / weight
  included for all — these are well-documented commodity inorganics/acids
  and I was confident in every figure.
- **9 alcohols & glycols**: Methanol, Isopropyl Alcohol (IPA) IP/BP/USP,
  N-Butanol, N-Propanol, Tertiary Butanol, Monoethylene Glycol (MEG),
  Propylene Glycol IP/BP/USP, Glycerine IP.
- **1 mineral-oil excipient**: Light Liquid Paraffin/Heavy — **no
  CAS/molecular formula**, same "skip fields you're not confident about"
  rule as earlier phases: it's a refined hydrocarbon blend, not a single
  compound, same pattern as the natural/mixture products in Parts 2b/3a.

**Data-quality flag needing your confirmation:** the catalogue entry
`hydrogen-hydrate-80` ("Hydrogen Hydrate 80%") does not correspond to any
real compound by that name. Based on the CAS numbers and grade
(80% aqueous solution) commonly traded under very similar names, this is
almost certainly **Hydrazine Hydrate 80%** (CAS 7803-57-8), a common
industrial reducing agent/boiler-water treatment chemical — and I've
written the content on that assumption, with a note in the FAQ flagging
it. **I did not rename the product's `name` field** (still "Hydrogen
Hydrate 80%" in the JSON) since that's your catalogue data, not mine to
change — please confirm this is correct or tell me the actual intended
product and I'll fix it in the next part.

**Regulated-chemical handling:** Potassium Permanganate and Iodine are
both watch-listed/regulated precursor-type chemicals in several
jurisdictions. Per the same caution the project has already applied to
sensitive items, their copy is factual/commercial only (no synthesis or
handling shortcuts) and each carries an FAQ note that end-use
documentation is required before dispatch — consistent with how a
legitimate distributor's own site would present them.

### Duplicate check before writing (per standing instruction)
Checked this batch against all other categories — no duplicates found.
Sodium Bi Sulphite vs. Sodium Meta Bisulphite are legitimate distinct
compounds (NaHSO3 vs Na2S2O5), not duplicates, and are cross-linked to
each other with a clarifying FAQ on each. Caustic Potash vs. Caustic Soda
(different alkali metal bases) are likewise distinct and cross-linked.

## ⚠️ Verification NOT run this session
This sandbox has **no network access**, so `npm install` failed (403 on
the registry) and I could not run `npx tsc --noEmit` / `npm run build` /
`npm run lint` as the prior hand-offs did. Instead I validated by hand:
- `products.json` is valid JSON, 292 entries (unchanged count).
- Every product's keys are a subset of the `Product` type in
  `src/lib/types.ts` — no stray fields.
- `specs` is a flat string→string map and `faq` entries only contain
  `q`/`a` on every product (matches the TS types).
- Re-ran the dangling `relatedSlugs` check across the **whole** file —
  none found (all slugs referenced by any product exist).

**Please run `npm install && npx tsc --noEmit && npm run build && npm run
lint` yourself (or in an environment with registry access) before
treating this as fully verified** — I'm confident in the data but want to
be upfront that the usual automated build/lint gate didn't run here.

## Current file state (for quick orientation)
- 292 products, 13 categories.
- **143 products now have full rich content** — everything from Part 3a,
  plus these 25 solvents. **149 do not yet.**
- Remaining in `solvents`: 44 of 69 (halogenated/chlorinated solvents,
  amines, esters/ketones/ethers, ready-stock industrial chemicals like
  formaldehyde/paraformaldehyde, aromatics, and a few remaining
  intermediates).
- `excipients` (105): untouched, zero rich content.

## What's next — Phase 2, Part 3b-2 / 3b-3 / 3c
- **Part 3b-2** (~44 products): remainder of `solvents` — chlorinated/
  halogenated solvents (chloroform, EDC, MDC, 1,4-dioxane, etc.), amines
  (morpholine, piperazine, piperidine, triethylamine, N-methyl
  piperazine), esters/ketones/ethers (ethyl acetate, MEK, MIBK, THF,
  MTBE, etc.), aromatics (benzene, toluene, xylenes), and remaining
  specialty intermediates. Note: Methylamine Solution 40% ("MMA 40%" in
  the catalogue) is a DEA-list/watch-listed precursor chemical in some
  jurisdictions — flag it the same way as Potassium Permanganate/Iodine
  above when it's written up.
- **Part 3c** (~105 products): `excipients` — largest remaining category,
  split into 2-3 sub-sessions by sub-type as previously scoped.

Once Part 3 is done, Phase 3 (UI/UX reshape) and Phase 4 (image
optimization) remain, per the original Part 1 hand-off.

## How to run this project
```
npm install
npm run dev       # local dev server
npm run build     # production build — run this before finishing any part
npm run lint      # eslint
```
