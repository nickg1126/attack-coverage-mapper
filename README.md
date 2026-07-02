# ATT&CK Detection Coverage Mapper

A React/Vite app that maps a curated set of MITRE ATT&CK techniques against
detection coverage from two example EDR/SIEM tools (labeled "Falcon" and
"Rapid7" after CrowdStrike Falcon and Rapid7 InsightIDR).

Built to demonstrate detection-engineering judgment: identifying coverage
gaps across the ATT&CK matrix and communicating them with a tactic filter,
status filter, search, and per-technique coverage metrics.

## ⚠️ About the coverage data

The technique list (`src/data/techniques.json`) is pulled live from the
[official MITRE ATT&CK CTI dataset](https://github.com/mitre/cti) and is
real.

**The Falcon/Rapid7 "rule" names in `src/data/coverage.json` are
illustrative examples, not real vendor rule names.** They were written to
sound like plausible EDR/SIEM detection use cases (e.g. "LSASS memory
access from non-standard process") but are not sourced from CrowdStrike or
Rapid7 documentation, MITRE ATT&CK Evaluations results, or any vendor's
actual detection logic. Treat the coverage percentages and gap list as a
demonstration of the *methodology*, not a real assessment of either
product.

If you want to make the data real, two credible public sources are:
- [MITRE ATT&CK Evaluations](https://attackevals.mitre-engenuity.org/) —
  publishes real per-technique detection results for participating
  vendors (CrowdStrike and Rapid7 have both participated in different
  rounds).
- Vendor blog posts that describe specific technique detections.

## Editing coverage data

- **Static edits**: change `src/data/coverage.json` directly and redeploy.
- **In-browser edits**: click any Falcon/Rapid7 cell in the table to toggle
  coverage or edit the rule label. Edits are saved to `localStorage` in
  your browser only — they aren't shared across devices and aren't backed
  up. Use "Reset edits" in the footer to clear them.

## Refreshing the technique list

```bash
node scripts/fetch-attack-data.mjs
```

Pulls the current MITRE ATT&CK enterprise matrix and overwrites
`src/data/techniques.json`. Run this occasionally (MITRE updates ATT&CK a
few times a year).

## Development

```bash
npm install
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```
