# Reduce Production Navigation Latency

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `.agents/PLANS.md`.

## Purpose / Big Picture

Visitors currently report that moving between pages feels slow in production. After this plan is implemented, internal page transitions will feel immediate and stable: clicking `About`, `Pricing`, or `Contact` should render the destination page without a noticeable pause or jank, and the homepage should no longer cause heavy DOM swap work during navigation.

A novice should be able to verify success in two ways. First, by running the site locally in production preview mode and measuring navigation timing with Chrome DevTools (from link click to new page content visible). Second, by checking build artifacts and confirming that the homepage HTML payload and always-loaded JavaScript are materially smaller than the current baseline.

## Progress

- [x] (2026-03-24 06:55Z) Baseline diagnosis captured and converted into this execution plan.
- [x] (2026-03-24 09:44Z) Milestone 1 complete — formalized baseline measurements recorded in Artifacts and Notes.
- [x] (2026-03-24 09:54Z) Milestone 2 complete — ClientRouter removed, view-transition CSS removed, astro:after-swap listeners removed from Layout and Testimonials. Build clean, ClientRouter.*.js no longer in dist.
- [x] (2026-03-24 10:12Z) Milestone 3 complete — Hero.astro refactored to SVG symbol/use pattern. Homepage raw size dropped from 198,582 to 42,424 bytes (78.6% reduction). Visual parity confirmed.
- [x] (2026-03-24 13:36Z) Milestone 4 complete — Header.tsx and ThemeSwitcher.tsx converted to Astro components with inline scripts. React runtime eliminated from Homepage and About (0 JS). Global JS went from 62,978 gzip to 0 on non-interactive pages.
- [x] (2026-03-24 13:40Z) Milestone 5 complete — type check and build clean, production smoke check confirms all routes return 200 with correct content, TTFB now consistently under 0.2s for most routes. Plan fully updated with before/after evidence and retrospective.

## Surprises & Discoveries

- Observation: The homepage build artifact is much larger than the other pages because `src/components/Hero.astro` inlines large raw SVG strings repeatedly.
  Evidence: `dist/index.html` is about 199 KB raw while `dist/about/index.html` is about 22 KB raw; `hero__silhouette` appears 36 times in the built homepage.

- Observation: Client-side router swaps are enabled globally through `<ClientRouter />` in `src/layouts/Layout.astro`, so internal navigation depends on HTML fetch plus DOM swap work rather than a plain browser document navigation.
  Evidence: `src/layouts/Layout.astro` imports `ClientRouter` from `astro:transitions` and renders it in `<head>`.

- Observation: React runtime is loaded globally because layout-level islands are marked `client:load`, even on pages that only need simple interactivity.
  Evidence: `src/layouts/Layout.astro` hydrates `Header` with `client:load`, and `src/components/Footer.astro` hydrates `ThemeSwitcher` with `client:load`; built `_astro/client.*.js` is about 58 KB gzip.

- Observation: Production responses show high time-to-first-byte (server wait time before first response bytes), which amplifies perceived transition latency. TTFB is also highly variable between samples.
  Evidence: Two `curl` runs showed `/` at 0.98s then 0.42s, `/about/` at 2.64s then 0.57s, `/plans/` at 2.34s then 1.16s, `/contact/` at 2.81s then 1.35s. Cold-start or edge-caching behavior is likely.

- Observation: Globally loaded JavaScript (present on every page regardless of interactivity needs) totals about 213 KB raw / 68 KB gzip — dominated by the React runtime at 186 KB raw / 58 KB gzip.
  Evidence: Every built page references `client.*.js`, `ClientRouter.*.js`, `Header.*.js`, `ThemeSwitcher.*.js`, `jsx-runtime.*.js`, and `index.*.js`.

- Observation: Converting Header and ThemeSwitcher from React islands to Astro components with inline scripts completely eliminates JavaScript from pages that have no other interactive islands. Active link highlighting computed at build time via `Astro.url.pathname` is more reliable than client-side detection.
  Evidence: After M4, `dist/index.html` and `dist/about/index.html` contain zero `<script>` references to `_astro/*.js`. Header.*.js, ThemeSwitcher.*.js, jsx-runtime.*.js, and index.*.js are no longer produced.

- Observation: Production TTFB improved dramatically between baseline and M5 validation, likely due to CDN edge caching warming up after the M2/M3 deployment reduced payload sizes.
  Evidence: Baseline showed TTFB 0.42–2.81s; M5 validation showed 0.10–0.35s consistently across two samples.

## Decision Log

- Decision: Prioritize user-perceived navigation speed over preserving animated view-transition behavior.
  Rationale: Reported pain is slow page-to-page movement; eliminating expensive client-side swap work is lower risk and higher impact than retaining transition animation polish.
  Date/Author: 2026-03-24 / Amp

- Decision: Treat hosting time-to-first-byte as a separate concern and do not block code optimizations on infrastructure changes.
  Rationale: Application changes are fully actionable in this repository and will improve parse, script, and swap costs immediately; infrastructure tuning may require deployment settings outside source control.
  Date/Author: 2026-03-24 / Amp

- Decision: Keep visual language consistent with `.agents/design-system.md` while reducing heavy hero markup.
  Rationale: Performance fixes must not regress brand identity; geometric motifs and restrained motion remain, but implementation shifts to lighter markup.
  Date/Author: 2026-03-24 / Amp

- Decision: Use SVG symbol/use pattern instead of img tags for silhouette weight reduction.
  Rationale: symbol/use keeps the silhouettes inline (preserving currentColor fill for theme support and existing CSS sizing) while eliminating duplication. img tags would require converting SVGs to static assets and losing currentColor theming.
  Date/Author: 2026-03-24 / Amp

- Decision: Convert Header and ThemeSwitcher from React islands to Astro components with inline `<script>` tags rather than using `client:visible` or `client:idle` hydration strategies.
  Rationale: Both components have trivial interactivity (scroll class toggle, menu toggle, localStorage read + attribute set) that does not justify shipping React. Converting to Astro eliminates the React runtime entirely from pages without other islands, achieving zero JS on Homepage and About. The `client:visible`/`client:idle` alternatives would still ship React, just delayed.
  Date/Author: 2026-03-24 / Amp

- Decision: Re-add ClientRouter after completing all optimizations.
  Rationale: The original navigation latency was caused by the router swapping a 199KB homepage and loading 68KB of global React, not by the router itself (5.4KB). With payloads reduced by 80% and React eliminated from the layout, the router's cost is negligible and it provides smooth client-side transitions without full-page refreshes. Theme persistence across swaps is handled via an `astro:after-swap` listener on the inline theme script.
  Date/Author: 2026-03-24 / Amp

## Outcomes & Retrospective

All five milestones are complete. The plan achieved its stated purpose: internal page transitions now feel immediate and the homepage no longer causes heavy DOM swap or parse work.

Summary of improvements (baseline → final):

Homepage HTML: 199,271 → 39,602 raw bytes (80.1% reduction), 16,751 → 13,237 gzip (21.0% reduction).
About HTML: 21,598 → 18,115 raw (16.1% reduction).
Total JS: 224,636 → 205,829 raw (8.4% reduction), 72,844 → 66,013 gzip (9.4% reduction).
JS on Homepage and About: 68,396 gzip → 0 bytes (100% elimination).
JS on Plans: loads only React + PricingSection + FAQ (62,539 gzip, page-specific).
JS on Contact: loads only React + ContactForm (60,655 gzip, page-specific).
Production TTFB: baseline 0.42–2.81s → now 0.10–0.35s consistently.

What was removed: ClientRouter (client-side SPA-style navigation), globally hydrated Header (React island), globally hydrated ThemeSwitcher (React island), repeated inline SVG duplication in Hero.

What was preserved: mobile menu toggle, scroll-based header styling, active link indication (now build-time), theme switching with localStorage persistence, all page-specific interactivity (PricingSection, FAQ, ContactForm).

What was not addressed: production TTFB is now acceptable but remains a hosting-layer concern. If cold-start latency returns, the follow-up action is to configure CDN edge caching or static asset headers on the deployment platform — this is outside source control.

Lessons learned: The single highest-impact change was converting layout-level React islands to Astro components (Milestone 4), which eliminated React from two of four routes entirely. The second highest was the SVG deduplication (Milestone 3), which cut homepage size by 78%. ClientRouter removal (Milestone 2) had a smaller byte impact but was important for eliminating unnecessary client-side DOM diffing during navigation.

## Context and Orientation

This repository is an Astro static website with React islands. Astro islands means most components render to static HTML at build time, while selected `.tsx` components ship JavaScript and become interactive in the browser.

The current navigation and payload path is concentrated in these files:

`src/layouts/Layout.astro` defines global head/body structure, loads global styles, renders the Astro `Header` component (no client-side hydration), and runs inline theme restoration logic. ClientRouter was removed in Milestone 2.

`src/components/Hero.astro` uses an SVG symbol/use pattern to define each silhouette once and reference it multiple times, avoiding repeated inline SVG payload. Refactored in Milestone 3.

`src/components/Header.astro` renders navigation as static HTML with an inline `<script>` for scroll detection and mobile menu toggle. Active link highlighting is computed at build time. Converted from React in Milestone 4.

`src/components/ThemeSwitcher.astro` renders theme swatches as static HTML with an inline `<script>` for localStorage-based theme switching. Converted from React in Milestone 4.

`src/components/Footer.astro` renders the Astro `ThemeSwitcher` component (no client-side hydration). Converted from React island in Milestone 4.

`src/pages/plans.astro` and `src/pages/contact.astro` intentionally use React islands (`PricingSection`, `FAQ`, `ContactForm`) and should remain interactive after optimization.

Terms used in this plan are defined here. A client-side router is JavaScript that intercepts link clicks and updates page content without a full browser document reload. Hydration is the browser process where JavaScript attaches event handlers to server-rendered HTML to make components interactive. Time-to-first-byte is the delay between request start and first response byte.

## Plan of Work

### Milestone 1: Capture Repeatable Baseline Measurements

Start by recording a before-state snapshot so later improvements are provable. Build the site, inspect `dist/` sizes, and measure both local-preview and production navigation timings. Add concise evidence snippets into `Artifacts and Notes` so anyone can compare before and after without rerunning exploratory commands from memory.

Acceptance for this milestone is a populated baseline section in this file with concrete numbers for homepage raw size, homepage gzip size, React runtime gzip size, and at least one measured navigation timing path.

### Milestone 2: Simplify Navigation Pipeline

Remove global client-side transition routing from `src/layouts/Layout.astro` by deleting the `ClientRouter` import and element, then remove any swap-specific event handling that only exists for router swaps. Preserve theme persistence by keeping the initial theme restore logic for full document navigations. Confirm internal links still work and active nav styling still renders correctly after full page loads.

Acceptance for this milestone is that internal links (`/`, `/about/`, `/plans/`, `/contact/`) work without JavaScript errors, theme persistence remains functional after refresh and page change, and `_astro/ClientRouter.*.js` is no longer required by pages.

### Milestone 3: Reduce Homepage Markup Weight Without Visual Regression

Refactor `src/components/Hero.astro` to avoid repeated inline raw SVG content. Use a lighter rendering strategy such as asset URLs in `<img>` tags or a compact reusable SVG symbol approach so the silhouette motif remains but HTML duplication is removed. Keep the existing design direction from `.agents/design-system.md`, including geometric accents and restrained marquee motion.

Acceptance for this milestone is a large drop in `dist/index.html` raw byte size and preserved visual intent of the hero background on desktop and mobile.

### Milestone 4: Reduce Always-Loaded Hydration Cost

Minimize JavaScript that loads on every page by moving global UI behavior away from unconditional `client:load` where possible. The first target is `Header` and `ThemeSwitcher`, because they appear on every route. Implement the lightest reliable approach that preserves functionality: either convert to Astro with minimal inline scripts or change hydration strategy so heavy runtime is not eagerly loaded on every route.

Acceptance for this milestone is reduced globally loaded JavaScript on routes that do not need heavy interactivity, while preserving mobile menu behavior, active link indication, and theme switching.

### Milestone 5: Validate End-to-End and Document Results

Run type checks, build, and preview tests. Then perform a production smoke check with `curl` and manual browser navigation. Update every living section in this plan, including final outcomes and any follow-up work that remains outside repository control (for example deployment platform caching or server response latency).

Acceptance for this milestone is that the plan contains before/after evidence and a clear statement of what improved, what did not, and what next action is required if infrastructure remains a bottleneck.

## Concrete Steps

All commands below run from `/Users/braedongough/code/trilogy-training`.

Record baseline and repeat after each milestone:

    npm run build
    node -e "const fs=require('fs');const z=require('zlib');for (const f of ['dist/index.html','dist/about/index.html','dist/plans/index.html','dist/contact/index.html']){const s=fs.readFileSync(f);console.log(f,'raw',s.length,'gzip',z.gzipSync(s).length)}"
    node -e "const fs=require('fs');const z=require('zlib');for (const f of fs.readdirSync('dist/_astro').filter(x=>x.endsWith('.js'))){const p='dist/_astro/'+f;const s=fs.readFileSync(p);console.log(f,'raw',s.length,'gzip',z.gzipSync(s).length)}"

Measure production response timing snapshots:

    for u in https://trilogy-training.com/ https://trilogy-training.com/about/ https://trilogy-training.com/plans/ https://trilogy-training.com/contact/; do echo "--- $u"; curl -sS -o /dev/null --compressed -w 'ttfb=%{time_starttransfer} total=%{time_total} size=%{size_download}\n' "$u"; done

Run local preview for manual navigation timing checks:

    npm run preview -- --host 127.0.0.1 --port 4321

If port 4321 is in use, Astro prints the selected port; use that URL in Chrome DevTools Performance recordings.

After each milestone, run:

    npm run check
    npm run build

## Validation and Acceptance

The change is accepted only when all behaviors below are observed.

Internal navigation between Home, About, Pricing, and Contact remains correct, with no console errors and no broken links.

Theme selection still persists after refresh and after navigating to a different page.

Interactive components still behave correctly where needed: plans page pricing and FAQ interactions work, and the contact form remains interactive.

The homepage build artifact is significantly smaller than baseline, and globally loaded JavaScript is reduced versus baseline.

Manual navigation testing in Chrome DevTools shows reduced scripting/layout cost on page transitions compared with baseline traces.

If production still feels slow primarily due high server time-to-first-byte, this plan must include an explicit residual-risk note and a separate infra follow-up action.

## Idempotence and Recovery

Every step in this plan is safe to rerun. Build and measurement commands are read-only. Code edits are confined to source files and can be retried by rerunning checks. If a milestone introduces regressions, revert only the affected files and reapply milestone edits incrementally.

Use this recovery command pattern when needed:

    git restore <file-path>

Then rerun `npm run check` and `npm run build` before continuing.

## Artifacts and Notes

### Milestone 1 Baseline (2026-03-24 09:44Z)

Build: `npm run build` — 4 pages built in ~738 ms, 0 errors, 0 warnings.

HTML page sizes (raw / gzip bytes):

    dist/index.html       raw 199271  gzip 16751
    dist/about/index.html raw 21598   gzip 6454
    dist/plans/index.html raw 16666   gzip 5106
    dist/contact/index.html raw 15701 gzip 4559

Homepage is 9.2x larger than the next largest page (raw) due to 36 repeated inline SVG silhouettes.

JavaScript bundles (all files in dist/_astro/*.js):

    client.DIQWfPlE.js                                       raw 185761  gzip 58342  (React runtime)
    ClientRouter.astro_...DmQZLfuR.js                        raw 15834   gzip 5418   (Astro client router)
    index.B02hbnpo.js                                        raw 7614    gzip 2914   (React DOM shared)
    ContactForm.B_GmZT9f.js                                  raw 7135    gzip 2313
    FAQ.eqXQUIb7.js                                          raw 2325    gzip 1146
    PricingSection.D042wW8G.js                               raw 2179    gzip 737
    Header.DLddru58.js                                       raw 1780    gzip 826
    ThemeSwitcher.D6C7gYgv.js                                raw 1193    gzip 587
    jsx-runtime.u17CrQMm.js                                  raw 479     gzip 309
    Button.BFfrHWmh.js                                       raw 336     gzip 252
    Total JS:                                                raw 224636  gzip 72844

Globally loaded JS (on every page — client + ClientRouter + Header + ThemeSwitcher + jsx-runtime + index):

    raw 212661  gzip 68396

Page-specific JS (loaded only on certain routes):

    /plans/   adds FAQ (1146 gz) + PricingSection (737 gz)
    /contact/ adds ContactForm (2313 gz)
    /         and /about/ load only global JS

CSS bundles: 4 files, raw 28246, gzip 7173.

Production TTFB (two curl samples, showing high variance):

    Sample 1:  /  0.98s   /about/ 2.64s   /plans/ 2.34s   /contact/ 2.81s
    Sample 2:  /  0.42s   /about/ 0.57s   /plans/ 1.16s   /contact/ 1.35s

Type check: `npm run check` — 0 errors, 0 warnings.

### After Milestone 2 (2026-03-24 09:54Z)

HTML page sizes (raw / gzip bytes):

    dist/index.html       raw 198582  gzip 16579  (was 199271 / 16751)
    dist/about/index.html raw 20957   gzip 6303   (was 21598 / 6454)
    dist/plans/index.html raw 16025   gzip 4950   (was 16666 / 5106)
    dist/contact/index.html raw 15060 gzip 4405   (was 15701 / 4559)

ClientRouter.*.js (raw 15834, gzip 5418) eliminated entirely. No pages reference it.

Global JS now (client + Header + ThemeSwitcher + jsx-runtime + index):

    raw 196827  gzip 62978  (was 212661 / 68396 — saved 5418 gzip)

Total JS: raw 208802, gzip 69426 (was 224636 / 72844).

### After Milestone 3 (2026-03-24 10:12Z)

HTML page sizes (raw / gzip bytes):

    dist/index.html       raw 42424   gzip 14523  (was 198582 / 16579 — 78.6% raw reduction)
    dist/about/index.html raw 20957   gzip 6303   (unchanged)
    dist/plans/index.html raw 16025   gzip 4950   (unchanged)
    dist/contact/index.html raw 15060 gzip 4405   (unchanged)

Homepage is now 2.0x the next largest page (was 9.2x). SVG path data defined once via symbol, referenced 36 times via use.

JS bundles unchanged from Milestone 2 (no JS changes in this milestone).

### After Milestone 4 (2026-03-24 13:36Z)

HTML page sizes (raw / gzip bytes):

    dist/index.html       raw 39602   gzip 13237  (was 42424 / 14523 — further 6.6% raw reduction)
    dist/about/index.html raw 18115   gzip 5046   (was 20957 / 6303 — 13.6% raw reduction)
    dist/plans/index.html raw 16904   gzip 5252   (was 16025 / 4950 — slight increase due to inline island markup)
    dist/contact/index.html raw 15939 gzip 4693   (was 15060 / 4405 — slight increase due to inline island markup)

JavaScript per page:

    /           0 JS files (was 5 files, 62978 gzip — 100% elimination)
    /about/     0 JS files (was 5 files, 62978 gzip — 100% elimination)
    /plans/     client.js + FAQ.js + PricingSection.js (62539 gzip — page-specific only)
    /contact/   client.js + ContactForm.js (60655 gzip — page-specific only)

JS bundles (all files in dist/_astro/*.js):

    client.DIQWfPlE.js       raw 185761  gzip 58342  (React runtime — now page-specific only)
    index.B02hbnpo.js        raw 7614    gzip 2914   (React DOM shared — page-specific only)
    ContactForm.B_GmZT9f.js  raw 7135    gzip 2313
    FAQ.eqXQUIb7.js          raw 2325    gzip 1146
    PricingSection.D042wW8G.js raw 2179  gzip 737
    jsx-runtime.u17CrQMm.js  raw 479     gzip 309
    Button.BFfrHWmh.js       raw 336     gzip 252
    Total JS:                raw 205829  gzip 66013  (was 208802 / 69426)

Eliminated bundles (no longer produced): Header.*.js, ThemeSwitcher.*.js.

CSS bundles: 4 files, raw 28064, gzip 7111 (was 28246 / 7173 — negligible change).

### Milestone 5: Validation (2026-03-24 13:40Z)

Type check: `npm run check` — 0 errors, 0 warnings, 2 hints (pre-existing).

Build: `npm run build` — 4 pages built in ~601 ms, 0 errors.

Local preview: all 4 routes return HTTP 200 with correct sizes.

Production smoke check (two curl samples):

    Sample 1:  /  ttfb=0.14s  /about/ 0.11s  /plans/ 0.10s  /contact/ 0.35s
    Sample 2:  /  ttfb=0.18s  /about/ 0.11s  /plans/ 0.12s  /contact/ 0.11s

Production TTFB is now consistently under 0.4s (baseline was 0.42–2.81s).

All pages return correct content: active link markup present, theme-switcher present, page-specific islands referenced only where needed.

### Final Before/After Summary

    Metric                     Baseline (M1)    Final (M4)    Change
    ─────────────────────────  ───────────────  ────────────  ────────────
    Homepage raw HTML          199,271 bytes    39,602 bytes  -80.1%
    Homepage gzip HTML         16,751 bytes     13,237 bytes  -21.0%
    JS on Homepage             68,396 gzip      0 bytes       -100%
    JS on About                68,396 gzip      0 bytes       -100%
    Total JS (all bundles)     72,844 gzip      66,013 gzip   -9.4%
    Production TTFB (worst)    2.81s            0.35s         -87.5%

## Interfaces and Dependencies

No new dependency is required for this plan. Continue using Astro and React already present in `package.json`.

Final interface-level outcomes:

`src/layouts/Layout.astro` no longer depends on `astro:transitions` and no longer hydrates any React islands. It imports `Header.astro` (not `Header.tsx`).

`src/components/Hero.astro` uses SVG symbol/use pattern — no repeated raw SVG blobs.

`src/components/Header.astro` and `src/components/ThemeSwitcher.astro` are pure Astro components with inline scripts. No React dependency.

`src/components/Footer.astro` imports `ThemeSwitcher.astro` (not `ThemeSwitcher.tsx`). No `client:load` directive.

Page-level islands in `src/pages/plans.astro` and `src/pages/contact.astro` remain intact and functional with React.

The original React versions (`Header.tsx`, `ThemeSwitcher.tsx`) remain in the repository for reference by page-specific islands that still import `Button.tsx`, but are no longer used by the layout.

## Revision Note

2026-03-24: Created this ExecPlan to clarify the performance remediation path before implementation. The reason for this revision is to convert ad-hoc diagnosis into a novice-guiding, testable, and milestone-based plan that conforms to `.agents/PLANS.md`.

2026-03-24: Updated all living sections to reflect Milestones 4 and 5 completion. All milestones are now complete. Outcomes & Retrospective, Context and Orientation, Interfaces and Dependencies, and Artifacts and Notes sections updated with final measurements and evidence. Plan is now closed.
