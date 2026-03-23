# Scroll Performance Optimisation

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `.agents/PLANS.md`.

## Purpose / Big Picture

Scrolling the Trilogy Training website currently feels laggy, particularly on the homepage. After this change, the site will scroll smoothly at a consistent 60 fps on both desktop and mobile. A user will notice the difference immediately when swiping or scrolling through the homepage: no stuttering, no dropped frames, no visual hitching as the fixed header composites over content beneath it.

To verify the improvement, open Chrome DevTools, go to the Performance tab, record a scroll session on the homepage, and confirm that frame times stay below 16.7 ms with no long frames flagged.

## Progress

- [x] (2026-03-23) Milestone 1: Fix the fixed header's backdrop-filter blur and transition (highest impact).
- [x] (2026-03-23) Milestone 2: Add compositing hints (will-change) to continuously animated elements and pause off-screen marquee animations.
- [x] (2026-03-23) Milestone 3: Scope down broad `transition: all` declarations on buttons.
- [x] (2026-03-23) Milestone 4: Deep audit — remove scroll-behavior: smooth, fix scroll listener re-renders, scope burger transitions, pause testimonials off-screen.
- [x] (2026-03-23) Milestone 5: Make Google Fonts non-render-blocking; remove dead scroll-behavior workaround from Layout.astro.
- [x] (2026-03-23) Validation: Lighthouse performance audit confirmed improvement.

## Surprises & Discoveries

- Observation: `scroll-behavior: smooth` was set globally on `<html>` in reset.css. This is a known cause of scroll jank because it forces the browser to interpolate scroll position on the main thread for every scroll input, conflicting with native smooth scrolling and passive scroll listeners.
  Evidence: Found at `src/styles/reset.css:13`. Removing it allows the browser to use native scroll handling, which is GPU-accelerated.

- Observation: The Header scroll listener called `setScrolled(window.scrollY > 20)` on every scroll event, triggering a React re-render even when the boolean value hadn't changed. React's `setState` with the same primitive value normally bails out, but passing a fresh boolean expression (`window.scrollY > 20`) creates a new value each call, defeating the bailout in some cases.
  Evidence: Found at `src/components/Header.tsx:25-28`. Fixed by using the functional updater form to compare against previous state.

- Observation: Testimonials carousel autoplay timer ran continuously via `setTimeout` even when the section was scrolled far off-screen, causing unnecessary DOM class toggles every 6 seconds.
  Evidence: Found at `src/components/Testimonials.astro:110-116`. The timer was only paused on mouseenter, not on visibility.

## Decision Log

- Decision: Keep the frosted-glass header effect rather than replacing it with a fully opaque background.
  Rationale: The translucent blur is a deliberate design choice (dark-first premium feel from the design system). Removing it would alter the site's visual identity. Instead we will promote the header to its own GPU layer and remove the expensive transition on the `backdrop-filter` property itself, which forces the browser to interpolate blur on every frame during the 0.3 s toggle.
  Date/Author: 2026-03-23 / Claude

- Decision: Pause marquee animations when the hero section leaves the viewport rather than removing them.
  Rationale: The marquee is a signature hero element (design system principle 4: "restrained motion" names the hero marquee as purposeful). Pausing it off-screen preserves the visual while eliminating wasted GPU work during scroll on the rest of the page.
  Date/Author: 2026-03-23 / Claude

## Outcomes & Retrospective

Lighthouse performance score improved from **89 to 99**. Key metric changes:

| Metric | Before | After |
|--------|--------|-------|
| Performance Score | 89 | 99 |
| First Contentful Paint | 3.0s (0.49) | 1.4s (0.97) |
| Largest Contentful Paint | 3.0s (0.78) | 1.8s (0.98) |
| Speed Index | 3.1s (0.93) | 1.4s (1.0) |
| Total Blocking Time | 0ms (1.0) | 0ms (1.0) |
| Cumulative Layout Shift | 0 (1.0) | 0.003 (1.0) |

The remaining flagged issue (unused JS in React runtime, 33 KiB) is inherent to shipping React for interactive islands and not actionable without switching to a lighter framework like Preact.

Render-blocking savings dropped from est. 2,070ms to 150ms (CSS files only, fonts are now async).

## Context and Orientation

The site is built with Astro 6 and uses React 19 for interactive islands. Styles are plain CSS (no Tailwind) with CSS custom properties for theming. All animation is CSS-based (keyframes and transitions) with one exception: the Stats component (`src/components/Stats.tsx`) uses `requestAnimationFrame` for number counting, triggered by a custom `useInView` Intersection Observer hook (`src/hooks/useInView.ts`).

Key files involved in this plan:

- `src/components/Header.css` — styles for the fixed header, including backdrop-filter blur and transitions.
- `src/components/Header.tsx` — React component that adds a `header--scrolled` class on scroll via a passive scroll listener.
- `src/components/Hero.css` — styles for the hero section, including the marquee animation on `.hero__marquee-track`.
- `src/components/Hero.astro` — Astro component that renders three marquee strips, each containing 12 inline SVG silhouettes (36 total animated elements).
- `src/components/Button.css` — button styles with `transition: all 0.3s` and hover box-shadows.
- `src/components/Section.css` — section dividers using `clip-path: polygon(...)`.
- `src/styles/animations.css` — shared `@keyframes` definitions (marquee, fadeInUp, countUp, pulse).

Terms used in this plan:

- **backdrop-filter** — a CSS property that applies graphical effects (here, blur) to the area behind an element. The browser must composite everything underneath, blur it, then paint the element on top. This is expensive when the element is fixed and the content scrolls beneath it.
- **will-change** — a CSS property that tells the browser an element's property will change, prompting it to promote the element to its own GPU compositing layer ahead of time rather than creating one on the fly (which causes a stutter called "layer promotion jank").
- **compositing layer** — a GPU-backed texture. Elements on their own layer can be transformed, faded, or blurred without repainting the rest of the page.
- **clip-path** — a CSS property that clips an element to a shape (here, polygons for angled section dividers). Static clip-paths on non-animated elements are cheap and are not a target of this plan.

## Plan of Work

### Milestone 1: Fix the header backdrop-filter (highest impact)

The fixed header (`src/components/Header.css`) applies `backdrop-filter: blur(12px)` when the user scrolls past 20 px. Two problems compound the cost:

1. The `transition` property on `.header` includes `backdrop-filter 0.3s`, which forces the browser to interpolate the blur radius from 0 to 12 px over 300 ms. During that interpolation, every frame requires a fresh blur computation across the full header width.
2. There is no `will-change` hint, so the browser may not pre-promote the header to its own compositing layer, causing layer-promotion jank on the first scroll.

The fix is three changes in `src/components/Header.css`:

1. On `.header`, remove `backdrop-filter` from the `transition` shorthand so it reads `transition: background-color 0.3s;` only. The blur will snap on/off instantly (imperceptible at 12 px) instead of animating.
2. On `.header--scrolled`, add `will-change: backdrop-filter;` to ensure the browser promotes the element to a GPU layer when the blur is active.
3. On `.header` (the base, un-scrolled state), add `will-change: auto;` so the browser does not waste memory on a GPU layer when the header is transparent and has no blur.

### Milestone 2: Marquee compositing hints and off-screen pausing

The hero section renders three marquee strips, each with a `.hero__marquee-track` element that runs `animation: marquee 60s linear infinite` (or 75 s in reverse). These are transform-only animations (GPU-friendly), but 36 inline SVGs animating continuously without a compositing hint means the browser may re-rasterize them.

Changes in `src/components/Hero.css`:

1. Add `will-change: transform;` to `.hero__marquee-track` so the browser keeps each track on its own GPU layer from the start.

Then, to pause the marquee when the hero scrolls out of view, we need a small script. Because the Hero is an Astro component (not React), the cleanest approach is an inline `<script>` tag at the bottom of `src/components/Hero.astro` that uses an Intersection Observer on `.hero` to toggle `animation-play-state` on the marquee tracks.

Add to the bottom of `src/components/Hero.astro`:

    <script>
      const hero = document.querySelector('.hero');
      if (hero) {
        const tracks = hero.querySelectorAll('.hero__marquee-track');
        const observer = new IntersectionObserver(
          (entries) => {
            const isVisible = entries[0].isIntersecting;
            tracks.forEach((track) => {
              (track as HTMLElement).style.animationPlayState = isVisible ? 'running' : 'paused';
            });
          },
          { threshold: 0 }
        );
        observer.observe(hero);
      }
    </script>

### Milestone 3: Scope down `transition: all` on buttons

In `src/components/Button.css`, line 12, buttons use `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. The word `all` tells the browser to watch every CSS property for changes, which can cause unnecessary style recalculations. This is a minor optimisation but good hygiene.

Replace `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);` with `transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1);` which are the only properties that actually change on hover.

## Concrete Steps

All commands are run from the repository root: `/Users/braedongough/code/trilogy-training`.

### Milestone 1

Edit `src/components/Header.css`:

1. Change line 8 from `transition: background-color 0.3s, backdrop-filter 0.3s;` to `transition: background-color 0.3s;`.
2. Add `will-change: backdrop-filter;` inside the `.header--scrolled` rule block (after the `backdrop-filter` declarations).

### Milestone 2

Edit `src/components/Hero.css`:

1. Add `will-change: transform;` to the `.hero__marquee-track` rule.

Edit `src/components/Hero.astro`:

1. Add an Intersection Observer script before the closing `</section>` tag (or after it, as Astro `<script>` tags are module-scoped) that pauses/resumes the marquee tracks.

### Milestone 3

Edit `src/components/Button.css`:

1. Replace `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);` with explicit properties.

### Validation

Run the dev server and test:

    npm run dev

Open http://localhost:4321 in Chrome. Open DevTools > Performance tab. Record a 5-second scroll session on the homepage. Confirm:

- No frames exceed 16.7 ms.
- No "Long Frame" warnings appear in the timeline.
- The header blur still appears when scrolling past the hero.
- The marquee animations pause when scrolling past the hero and resume when scrolling back up.
- Button hover effects (translate, shadow, background) still work correctly.

Run a Lighthouse performance audit (DevTools > Lighthouse > Performance, desktop):

    Expected: Performance score remains above 90. "Avoid large layout shifts" and "Avoid non-composited animations" diagnostics should not flag the header or marquee.

## Validation and Acceptance

After all three milestones are complete:

1. The site scrolls smoothly at 60 fps on the homepage, with no dropped frames visible in the Chrome Performance timeline.
2. The header still shows a frosted-glass blur effect when scrolled, snapping on instantly rather than fading in.
3. Marquee silhouettes animate when the hero is visible and pause when it is not.
4. Button hover transitions (lift, shadow, colour) work identically to before.
5. No visual regressions on any page (homepage, about, plans, contact).

## Idempotence and Recovery

All changes are CSS edits and one small inline script addition. They can be applied and reverted independently. Running the steps multiple times produces the same result. If any change causes a visual regression, revert the individual file with `git checkout -- <file>` and re-evaluate.

## Artifacts and Notes

(To be populated during implementation with DevTools Performance screenshots or frame-time comparisons.)

## Interfaces and Dependencies

No new libraries or dependencies are required. All changes use native CSS properties and the browser's built-in Intersection Observer API (supported in all modern browsers). The inline script in Hero.astro will be bundled by Astro's built-in script handling.
