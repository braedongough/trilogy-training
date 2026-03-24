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
- [ ] Implement Milestone 4 (always-loaded hydration reduction) and verify interactivity parity.
- [ ] Implement Milestone 5 (validation in local preview and production smoke checks) and update retrospective.

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

## Outcomes & Retrospective

Implementation has not started yet. Expected outcome is a measurable reduction in navigation delay and reduced homepage parse/hydration cost without regressions in header navigation, theme switching, plans FAQ interaction, or contact form behavior.

## Context and Orientation

This repository is an Astro static website with React islands. Astro islands means most components render to static HTML at build time, while selected `.tsx` components ship JavaScript and become interactive in the browser.

The current navigation and payload path is concentrated in these files:

`src/layouts/Layout.astro` defines global head/body structure, loads global styles, includes `ClientRouter`, hydrates `Header` with `client:load`, and runs inline theme restoration logic.

`src/components/Hero.astro` imports silhouette SVGs with `?raw` and injects them into markup with `set:html`, creating a large repeated inline SVG payload.

`src/components/Header.tsx` implements nav rendering, scroll state, and mobile menu behavior as a React island.

`src/components/Footer.astro` hydrates `ThemeSwitcher` as a React island, which contributes to global runtime cost on all pages.

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

Add before/after updates below this block as implementation progresses; keep snippets concise and timestamped.

## Interfaces and Dependencies

No new dependency is required for this plan. Continue using Astro and React already present in `package.json`.

Expected interface-level outcomes after implementation:

`src/layouts/Layout.astro` no longer depends on `astro:transitions` for global navigation behavior.

`src/components/Hero.astro` no longer injects repeated raw SVG blobs for silhouette rendering.

Global layout interactivity (`Header`, `ThemeSwitcher`) preserves user behavior while loading less eager JavaScript.

Page-level islands in `src/pages/plans.astro` and `src/pages/contact.astro` remain intact and functional.

## Revision Note

2026-03-24: Created this ExecPlan to clarify the performance remediation path before implementation. The reason for this revision is to convert ad-hoc diagnosis into a novice-guiding, testable, and milestone-based plan that conforms to `.agents/PLANS.md`.
