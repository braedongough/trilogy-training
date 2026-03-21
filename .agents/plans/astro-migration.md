# Migrate Trilogy Training Website from Vite MPA to Astro

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `.agents/PLANS.md` at the repository root.


## Purpose / Big Picture

The Trilogy Training website is currently a Vite multi-page application (MPA) using React. Every page loads the full React runtime and all component JavaScript — roughly 239KB of JS — even though most of the site is static content with no interactivity. Visitors experience full page reloads when navigating between pages.

After this migration, the site will be built with Astro, a static-site framework that renders components to plain HTML at build time and only ships JavaScript for interactive elements. The result will be: dramatically smaller page payloads (estimated ~30–40KB JS down from ~239KB), instant client-side navigation via Astro's View Transitions, and the same visual design and functionality the site has today.

This migration will be executed in a single feature branch and the site is not yet live. The plan therefore favours direct cutover speed over long-lived dual architecture support, while preserving strict lint/type/build validation gates.

To see it working: from the repository root, run `npm run dev` to launch the Astro development server, then open `http://localhost:4321` in a browser. Run `npm run build` to produce static HTML/CSS/JS files in the `dist/` directory.


## Progress

- [x] (2026-03-21 13:40Z) Audited and revised the migration plan to address Astro SSR safety, footer static conversion details, CSS deletion sequencing, and validation gates.
- [x] (2026-03-21 20:13Z) Milestone 1: Astro project scaffolding and configuration
- [x] (2026-03-21 20:19Z) Milestone 2: Layout, shared components, and design system
- [x] (2026-03-21 20:19Z) Milestone 3: Migrate all four pages
- [x] (2026-03-21 20:20Z) Milestone 4: Interactive islands (Header, FAQ, ContactForm, Stats, ThemeSwitcher, PricingSection)
- [x] (2026-03-21 20:20Z) Milestone 5: SEO, meta tags, View Transitions, and final polish
- [x] (2026-03-21 20:23Z) Milestone 6: Build validation and deployment-readiness check


## Surprises & Discoveries

- The Plans page pricing section uses `useState` for currency toggling (CHF/EUR/GBP), making it interactive. The original plan classified PricingCards as static. Solution: extracted the pricing section into a new `PricingSection.tsx` React island with `client:load`.
- FAQ and Stats components imported the React `Section` component, which was converted to Astro. Since Astro components cannot be used inside React, the Section wrapper was removed from these React components and the wrapping was moved to the Astro page files instead.
- Astro v6 uses `ClientRouter` (not `ViewTransitions`) as the import name from `astro:transitions`.
- ESLint's `react-hooks/set-state-in-effect` rule flagged SSR-safe `setState` calls in `useEffect` for Header and ThemeSwitcher. Resolved by using `useSyncExternalStore` with server fallbacks instead.
- The `.astro/` auto-generated directory needed to be added to ESLint's `globalIgnores` to avoid false errors on Astro's type declarations.
- React `FormEvent` is deprecated in React 19 types; used `React.FormEvent` namespace form instead.
- Astro v6 installed as `^6.0.8` and `@astrojs/react` as `^5.0.1` (plan estimated `^5.x` and `^4.x` respectively).


## Decision Log

- Decision: Extract pricing currency toggle into a new `PricingSection.tsx` React island.
  Rationale: The Plans page pricing section uses `useState` for currency toggling, which requires React state. Rather than making the entire Plans page a React island, the interactive pricing section was extracted into its own component (`PricingSection.tsx`) and rendered with `client:load`.
  Date/Author: 2026-03-21 / Implementation

- Decision: Use `useSyncExternalStore` instead of `useEffect` + `setState` for SSR-safe browser API access in Header and ThemeSwitcher.
  Rationale: ESLint's `react-hooks/set-state-in-effect` rule (React 19) flags synchronous `setState` in effects. `useSyncExternalStore` provides an SSR-safe way to read browser APIs (location, localStorage) with a server fallback value, avoiding the lint error and the flash of default state.
  Date/Author: 2026-03-21 / Implementation

- Decision: Keep interactive components as React (.tsx) and use Astro's `client:` directives rather than rewriting them in vanilla JS.
  Rationale: The interactive components (Header, FAQ, ContactForm, Stats, ThemeSwitcher) use React state and effects. Rewriting them in vanilla JS would be a full rewrite with risk of subtle bugs. Astro's `@astrojs/react` integration lets us keep these components unchanged and ship React only for the islands that need it. The React runtime is only loaded on pages that use interactive islands, and tree-shaking keeps the bundle small.
  Date/Author: 2026-03-21 / Plan author

- Decision: Convert all static components (Hero, HowItWorks, Testimonials, WhyTrilogy, CTABand, PricingCards, CoachProfile, Section, Button, Footer) from React (.tsx) to Astro (.astro) components.
  Rationale: These components are static or mostly static. For `Footer`, replace the current newsletter `onSubmit` JavaScript prevention handler with static markup semantics so it can remain non-interactive except for the ThemeSwitcher island. As Astro components, they render to pure HTML at build time and ship zero JavaScript.
  Date/Author: 2026-03-21 / Plan author

- Decision: Use Astro's built-in View Transitions for client-side navigation.
  Rationale: One of the motivations for this migration is eliminating full page reloads. Astro's View Transitions API (`<ViewTransitions />` in the `<head>`) intercepts link clicks and performs a smooth, SPA-like transition by fetching the next page and swapping the DOM — no client-side router needed, no full React runtime, and each page still has its own static HTML for SEO.
  Date/Author: 2026-03-21 / Plan author

- Decision: Use Astro's file-based routing with `.astro` page files instead of the current `data-page` attribute routing system.
  Rationale: Astro uses a `src/pages/` directory where each `.astro` file becomes a route. `src/pages/index.astro` → `/`, `src/pages/about.astro` → `/about`, etc. This replaces the current system of multiple HTML entry points that all load the same `main.tsx` which reads a `data-page` attribute. File-based routing is simpler, more conventional, and each page can define its own `<head>` content directly.
  Date/Author: 2026-03-21 / Plan author

- Decision: Keep `Header.tsx` as a React island with `client:load`, but refactor it to be SSR-safe by removing render-time access to `window`.
  Rationale: In Astro, `client:load` components still server-render initially. Accessing `window` during render can crash with `window is not defined`. Refactoring pathname detection into `useEffect` preserves SSR HTML and avoids needing `client:only`.
  Date/Author: 2026-03-21 / Plan revision

- Decision: Add an explicit Astro type-checking gate (`npm run check` → `astro check`) and require it before build completion.
  Rationale: The current Vite setup includes explicit TypeScript checking in the build pipeline. The Astro migration should preserve a strict quality gate so type regressions are caught before deployment.
  Date/Author: 2026-03-21 / Plan revision


## Outcomes & Retrospective

- All 6 milestones completed in a single session.
- `npm run lint`, `npm run check`, and `npm run build` all pass with 0 errors.
- 4 pages built: `/`, `/about/`, `/plans/`, `/contact/` — each with unique title, description, canonical URL, OG tags, and exactly 1 `<h1>`.
- JSON-LD structured data present on homepage.
- View Transitions enabled via `ClientRouter` with theme persistence across navigations.
- Total JS: ~217KB (down from ~239KB). The React runtime (181KB) is the dominant cost, loaded for Header and ThemeSwitcher islands present on every page. Per-component island JS totals ~36KB. Static components (Hero, HowItWorks, Testimonials, WhyTrilogy, CTABand, CoachProfile, Section, Button, Footer) ship zero JS.
- The 60% JS reduction target was not met because the React runtime is still needed for islands on every page. To achieve that target, Header and ThemeSwitcher would need to be rewritten in vanilla JS — a future consideration.
- Build time: ~600ms for all 4 pages.
- `robots.txt` and `sitemap.xml` present in `dist/`.


## Context and Orientation

The repository at `/Users/braedongough/code/trilogy-training-wt/amp/` contains a fully functional Vite MPA website for Trilogy Training, an endurance coaching business. The site has four pages (Home, About, Plans & Pricing, Contact) and is built with React 19 and TypeScript.

The current architecture works as follows:

There are four HTML entry points at the repository root: `index.html`, `about/index.html`, `plans/index.html`, and `contact/index.html`. Each contains a `<div id="root" data-page="home">` (or "about", "plans", "contact"). A single shared entry point at `src/main.tsx` reads the `data-page` attribute and renders the corresponding React page component inside a `Layout` wrapper. Vite's config at `vite.config.ts` specifies all four HTML files as `build.rollupOptions.input` entries, and `appType` is set to `'mpa'` to disable SPA fallback routing.

The `src/` directory contains:

- `src/main.tsx` — the routing entry point described above
- `src/components/` — 16 React component files, each with a matching CSS file. Components fall into two categories:
  - **Static or mostly static**: `Hero.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `WhyTrilogy.tsx`, `CTABand.tsx`, `PricingCard.tsx`, `CoachProfile.tsx`, `Section.tsx`, `Button.tsx`, `Footer.tsx`, `Layout.tsx` (note: `Footer.tsx` currently includes one `onSubmit` handler for a placeholder newsletter form)
  - **Interactive** (use useState, useEffect, or event handlers): `Header.tsx` (scroll detection, mobile menu toggle), `ThemeSwitcher.tsx` (theme selection, localStorage), `ContactForm.tsx` (form state, Formspree submission), `FAQ.tsx` (accordion open/close state), `Stats.tsx` (animated number counters using requestAnimationFrame and IntersectionObserver)
- `src/pages/` — four page components (`Home.tsx`, `About.tsx`, `Plans.tsx`, `Contact.tsx`), each with a matching CSS file. These compose the shared components into full pages.
- `src/hooks/useInView.ts` — a custom React hook wrapping IntersectionObserver, used only by `Stats.tsx` after the recent animation cleanup.
- `src/styles/` — five global CSS files: `variables.css` (design tokens), `themes.css` (colour theme overrides), `reset.css` (CSS reset), `global.css` (base typography), `animations.css` (keyframe definitions for marquee, fadeInUp, countUp, pulse)
- `src/assets/silhouettes/` — three SVG files (swimmer, cyclist, runner) imported as raw strings by `Hero.tsx` for the marquee animation

The `public/` directory contains: `favicon.svg`, `og-image.png`, `og-image.svg`, `robots.txt`, `sitemap.xml`, and `images/coaches/adam.jpg` and `images/coaches/cameron.jpg`.

Key design system details: The site uses CSS custom properties defined in `variables.css` for colours (`--color-bg: #1A1A2E`, `--color-accent-1: #00E5CC`, `--color-accent-2: #FF2D78`), fonts (Space Grotesk for headings, Inter for body, Space Mono for accents — loaded via Google Fonts CDN), and spacing (8px base scale). Alternate colour themes are defined in `themes.css` using `[data-theme]` attribute selectors. A script in each HTML file's `<body>` reads `localStorage` and applies the saved theme before the page renders.

The current build produces a ~239KB JS bundle and ~33KB CSS bundle. After migration, static components will ship zero JS, and only the interactive islands will include their React code.

Key terms used in this plan:

- **Astro component (.astro file):** A component format specific to the Astro framework. It has a frontmatter section (between `---` fences) for imports and logic, and a template section below for HTML markup. Astro components execute at build time only — they produce static HTML and ship no JavaScript to the browser. They cannot use React hooks or browser APIs.
- **Island (Astro island):** An interactive UI component on an otherwise static page. In Astro, you make a React/Preact/Svelte component into an island by adding a `client:` directive when you use it: `<MyComponent client:load />`. Only islands ship JavaScript to the browser. The rest of the page is pure HTML.
- **client:load directive:** Tells Astro to hydrate (make interactive) a component immediately when the page loads. Used for components that must be interactive right away (e.g. navigation menus, forms).
- **client:visible directive:** Tells Astro to hydrate a component only when it scrolls into the viewport. Used to defer loading JavaScript for below-fold interactive elements (e.g. Stats counters).
- **View Transitions:** A browser API that Astro wraps to provide smooth, SPA-like page transitions. When enabled, clicking a link fetches the next page in the background and animates the DOM swap, avoiding a full page reload. Each page is still a separate static HTML file with its own `<head>` — search engines see individual pages, but users experience fluid navigation.
- **File-based routing:** A convention where the file structure in `src/pages/` determines the URL routes. `src/pages/index.astro` → `/`, `src/pages/about.astro` → `/about/`, `src/pages/plans.astro` → `/plans/`, `src/pages/contact.astro` → `/contact/`.


## Plan of Work

The migration is structured in six milestones. Each milestone produces a verifiable result and builds on the previous one. The approach is to scaffold Astro alongside the existing code, then systematically convert components and pages, verifying the build at each step.


### Milestone 1: Astro Project Scaffolding and Configuration

This milestone replaces the Vite MPA configuration with Astro. At the end, running `npm run dev` starts an Astro dev server and shows a blank page at `http://localhost:4321/` with no errors.

First, install Astro and the React integration. From the repository root `/Users/braedongough/code/trilogy-training-wt/amp/`:

    npm install astro @astrojs/react

Then remove Vite-specific dependencies that Astro replaces (Astro uses Vite internally but manages it):

    npm uninstall vite @vitejs/plugin-react

Create `astro.config.mjs` at the repository root:

    import { defineConfig } from 'astro/config';
    import react from '@astrojs/react';

    export default defineConfig({
      integrations: [react()],
      site: 'https://www.trilogy-training.com',
    });

Update `tsconfig.json` to use Astro's TypeScript configuration. Replace the current contents with:

    {
      "extends": "astro/tsconfigs/strict",
      "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "react"
      }
    }

Delete `tsconfig.app.json` and `tsconfig.node.json` — Astro's base config handles everything these covered.

Update the `scripts` section in `package.json`:

    "scripts": {
      "dev": "astro dev",
      "check": "astro check",
      "build": "npm run check && astro build",
      "preview": "astro preview",
      "lint": "eslint ."
    }

Create `src/env.d.ts` with Astro's client type reference:

    /// <reference types="astro/client" />

Delete the following files that are no longer needed:
- `vite.config.ts` (replaced by `astro.config.mjs`)
- `src/vite-env.d.ts` (Astro generates its own type declarations)

Keep the legacy HTML entry files and `src/main.tsx` until all four Astro routes are in place (Milestone 3), then delete them as part of the cutover.

Create a minimal `src/pages/index.astro` to verify the dev server starts:

    ---
    ---
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Trilogy Training</title>
      </head>
      <body>
        <h1>Astro is working</h1>
      </body>
    </html>

Run `npm run dev`. The Astro dev server should start on `http://localhost:4321/` and display "Astro is working". Then run `npm run check` and confirm there are no type errors. If both pass, this milestone is complete.


### Milestone 2: Layout, Shared Components, and Design System

This milestone converts the layout shell and all static components from React to Astro. At the end, visiting `http://localhost:4321/` shows the full layout (header, footer, design system colours and typography) with a placeholder page content area.

**Design System (no changes needed):** The CSS files in `src/styles/` (`variables.css`, `themes.css`, `reset.css`, `global.css`, `animations.css`) work identically in Astro. They will be imported in the layout.

**Layout conversion:** Create `src/layouts/Layout.astro`. This replaces both `src/components/Layout.tsx` and the shared HTML boilerplate that was duplicated across the four HTML entry points. The layout file handles:
- The `<!DOCTYPE html>`, `<html lang="en">`, and `<head>` with font preconnects
- Importing all global CSS files
- The theme initialisation script (reading localStorage and setting `data-theme`)
- Rendering the Header, a `<main>` slot for page content, and the Footer

The layout accepts props for page-specific `<head>` content: `title`, `description`, `canonicalPath`, `ogTitle`, `ogDescription`. This replaces the per-page HTML files.

    ---
    import Header from '../components/Header';
    import Footer from '../components/Footer.astro';
    import '../styles/reset.css';
    import '../styles/variables.css';
    import '../styles/themes.css';
    import '../styles/global.css';
    import '../styles/animations.css';

    interface Props {
      title: string;
      description: string;
      canonicalPath: string;
      ogTitle?: string;
      ogDescription?: string;
    }

    const { title, description, canonicalPath, ogTitle, ogDescription } = Astro.props;
    const siteUrl = 'https://www.trilogy-training.com';
    ---

This layout imports the Header as a React component (it stays as React because it has interactivity — see Milestone 4) and the Footer as an Astro component.

**Static component conversions:** Convert each static React component to an `.astro` file. The conversion pattern is straightforward — the JSX template moves to the Astro template section, props become typed via the `Props` interface in frontmatter, and CSS is imported the same way. Key conversions:

- `src/components/Section.tsx` → `src/components/Section.astro` — accepts `background`, `divider`, and `id` props. Uses `<slot />` instead of `{children}`.
- `src/components/Button.tsx` → `src/components/Button.astro` — renders as `<a>` when `href` is provided, `<button>` otherwise. Uses `<slot />` for children.
- `src/components/Footer.tsx` → `src/components/Footer.astro` — convert to static footer markup, replacing the placeholder newsletter `<form onSubmit={...}>` with non-submitting static markup semantics. The ThemeSwitcher inside it stays as a React island (Milestone 4).
- `src/components/Hero.tsx` → `src/components/Hero.astro` — the marquee animation is pure CSS, and the SVG silhouettes are imported as raw strings and rendered with `set:html`. No JavaScript needed.
- `src/components/HowItWorks.tsx` → `src/components/HowItWorks.astro`
- `src/components/Testimonials.tsx` → `src/components/Testimonials.astro`
- `src/components/WhyTrilogy.tsx` → `src/components/WhyTrilogy.astro`
- `src/components/CTABand.tsx` → `src/components/CTABand.astro`
- `src/components/PricingCard.tsx` → `src/components/PricingCards.astro` (renamed to match the exported function name)
- `src/components/CoachProfile.tsx` → `src/components/CoachProfile.astro`

For each conversion: move the component's data (arrays of steps, testimonials, reasons, tiers, etc.) into the frontmatter section. Move the JSX template into the Astro template section, replacing `className` with `class`, `{children}` with `<slot />`, and React fragments (`<>...</>`) with plain HTML. Import the existing CSS file unchanged.

The `Layout.tsx` React component file can be deleted after `Layout.astro` is created. The original `.tsx` files for converted static components can also be deleted once their `.astro` equivalents are verified.

Keep the interactive React components unchanged for now except `Header.tsx`, which receives a small SSR-safety refactor in Milestone 4. `ThemeSwitcher.tsx`, `FAQ.tsx`, `ContactForm.tsx`, `Stats.tsx`, and `useInView.ts` are wired up as islands in Milestone 4.

At the end of this milestone, update `src/pages/index.astro` to use the layout and render several static components to verify they display correctly with the design system.


### Milestone 3: Migrate All Four Pages

This milestone converts the four React page components into Astro page files. At the end, all four routes (`/`, `/about/`, `/plans/`, `/contact/`) render their full content with correct styling.

Create four Astro page files in `src/pages/`:

**`src/pages/index.astro`** (Home page) — imports `Layout.astro` and composes: `Hero.astro`, `HowItWorks.astro`, `Stats` (React island — Milestone 4, use a placeholder for now), `Testimonials.astro`, `WhyTrilogy.astro`, `CTABand.astro`. Passes home page metadata to the layout.

**`src/pages/about.astro`** (About page) — imports layout and composes: about hero section (inline in the page file — it's a small section), two `CoachProfile.astro` instances with the coaches' data passed as props, the philosophy section (inline), and `CTABand.astro`.

**`src/pages/plans.astro`** (Plans & Pricing page) — imports layout and composes: plans hero (inline), `PricingCards.astro`, comparison table (inline — it's page-specific markup), `FAQ` (React island — Milestone 4, use placeholder), and `CTABand.astro`.

**`src/pages/contact.astro`** (Contact page) — imports layout and composes: contact hero (inline), `ContactForm` (React island — Milestone 4, use placeholder), contact info sidebar, and coach locations section.

The page-specific CSS files (`About.css`, `Plans.css`, `Contact.css`) are imported in their respective page files. `Home.tsx` had no page-specific CSS (all styling was in the child components).

Each page passes its specific `title`, `description`, `canonicalPath`, `ogTitle`, and `ogDescription` to the layout. The structured data JSON-LD from the current `index.html` is added to the home page's `<head>` section via a named slot or directly in the layout conditional.

Delete the React page files (`src/pages/Home.tsx`, `About.tsx`, `Plans.tsx`, `Contact.tsx`) after the Astro pages are verified. Keep `src/pages/About.css`, `src/pages/Plans.css`, and `src/pages/Contact.css` as long as the new Astro pages import them. Delete `src/main.tsx`, `index.html`, `about/index.html`, `plans/index.html`, and `contact/index.html` during this cutover, then remove now-empty root directories `about/`, `plans/`, and `contact/`.

Run `npm run dev` and verify all four routes render correctly with proper styling, header, footer, and all static content visible.


### Milestone 4: Interactive Islands (Header, FAQ, ContactForm, Stats, ThemeSwitcher)

This milestone wires up the five interactive React components as Astro islands. At the end, all interactivity works: the mobile menu toggles, the theme switcher changes colours, the FAQ accordion expands/collapses, the contact form submits, and the stats counters animate.

The React component files (`Header.tsx`, `ThemeSwitcher.tsx`, `FAQ.tsx`, `ContactForm.tsx`, `Stats.tsx`) and the `useInView.ts` hook remain as `.tsx` files. They continue to use React hooks and state. The primary change is how they are imported — from `.astro` files with `client:` directives. `Header.tsx` also needs one SSR-safety refactor before wiring.

**Header** — Refactor `src/components/Header.tsx` so it does not read `window` during render. Move pathname resolution into state set in `useEffect`, and compute active nav from that state. Then in `Layout.astro`, render `<Header client:load />`. The header must be interactive immediately (navigation, mobile menu), and this change avoids server-render crashes (`window is not defined`).

**ThemeSwitcher** — In `Footer.astro`, import and render: `<ThemeSwitcher client:load />`. It must load immediately so users can interact with it. The theme initialisation script (reading localStorage before React hydrates) moves to `Layout.astro` as an inline `<script is:inline>` tag in the `<body>`, which runs before any component hydration.

**FAQ** — In `src/pages/plans.astro`, import and render: `<FAQ client:load />`. The accordion needs click handlers immediately when visible.

**ContactForm** — In `src/pages/contact.astro`, import and render: `<ContactForm client:load />`. The form needs interactivity immediately.

**Stats** — In `src/pages/index.astro`, import and render: `<Stats client:visible />`. The `client:visible` directive means React and the Stats component JS are only loaded when the stats section scrolls into view. This is ideal because the stats section is below the fold, and the animated counter effect only triggers on scroll anyway via the `useInView` hook.

After wiring up all islands, verify each:
1. Navigate to `/` — the hero marquee animates (CSS only, no island needed), scroll down and the stats counters animate when visible.
2. Click the mobile hamburger menu on a narrow viewport — the nav slides open.
3. Click theme swatches in the footer — colours change site-wide and persist after reload.
4. Navigate to `/plans/` — click FAQ questions, they expand and collapse.
5. Navigate to `/contact/` — fill in the form, verify the form state changes on submit (it will show an error since the Formspree endpoint is a placeholder, but the state management should work).


### Milestone 5: SEO, Meta Tags, View Transitions, and Final Polish

This milestone adds Astro View Transitions for SPA-like navigation and verifies all SEO elements are in place.

**View Transitions:** In `Layout.astro`, add `import { ViewTransitions } from 'astro:transitions';` in the frontmatter and render `<ViewTransitions />` inside `<head>`. This single addition enables client-side navigation across all pages. When a user clicks any internal link, Astro fetches the target page, swaps the DOM, and animates the transition — no full page reload.

Important: View Transitions interact with the theme initialisation script. Since the script in `<body>` reads localStorage and sets `data-theme`, and View Transitions swap the `<body>` content, the theme script must use `transition:persist` or be placed as an inline script that re-runs on each transition. Astro provides an `astro:after-swap` event for this. Add an event listener:

    document.addEventListener('astro:after-swap', () => {
      const theme = localStorage.getItem('trilogy-theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
    });

This ensures the theme is re-applied after every View Transition navigation.

**SEO verification:** Confirm each page has:
- Unique `<title>` and `<meta name="description">`
- Canonical URL (`<link rel="canonical">`)
- Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:site_name)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- `<html lang="en">`
- Favicon link
- Proper heading hierarchy (one `<h1>` per page)

The homepage should include the structured data JSON-LD (Organization, SportsActivityLocation, Service, Person schemas) — transferred from the current `index.html`.

`public/robots.txt` and `public/sitemap.xml` carry over unchanged from the `public/` directory.

**Cleanup:** Remove any remaining Vite-specific files, unused React component files that were converted to Astro, and the `about/`, `plans/`, `contact/` directories at the root (if they still exist). Verify `.gitignore` includes `dist/` and `node_modules/`.


### Milestone 6: Build Validation and Deployment-Readiness Check

This milestone validates the complete Astro build. At the end, the site passes all checks and produces a `dist/` directory ready for deployment.

Steps:

1. Run `npm run lint` and verify ESLint passes.

2. Run `npm run check` and verify Astro/TypeScript checks pass.

3. Run `npm run build` and verify it completes without errors. Check that `dist/` contains separate HTML files for each page: `index.html`, `about/index.html`, `plans/index.html`, `contact/index.html`.

4. Run `npm run preview` to serve the built output locally. Verify every page loads, navigation works (with View Transitions — no full reload), the theme switcher functions, forms are interactive, and all sections render correctly.

5. Verify the JS bundle size has decreased significantly compared to the pre-migration ~239KB. Require at least a 60% reduction from baseline; stretch target remains ~30–40KB total JS if achievable with the current island set.

6. Verify all heading hierarchy is correct (one `<h1>` per page).

7. Verify all images have `alt` text.

8. Verify the favicon appears in the browser tab.

9. Verify meta descriptions render in the page source of each page.

10. Verify structured data JSON-LD is present in the homepage source.

11. Verify the contact form state management works (idle → submitting → success/error).

12. Verify the theme switcher persists across page navigations (localStorage + View Transitions).

13. Test at mobile viewport (375px wide), tablet (768px), and desktop (1440px).

14. Verify `robots.txt` and `sitemap.xml` are present in `dist/`.


## Concrete Steps

All commands run from the repository root: `/Users/braedongough/code/trilogy-training-wt/amp/`

Milestone 1 commands:

    npm install astro @astrojs/react
    npm uninstall vite @vitejs/plugin-react

After creating `astro.config.mjs` and updating config files:

    npm run dev
    npm run check

Expected output:

    astro  v5.x.x  ready in XXX ms

    ┃ Local    http://localhost:4321/
    ┃ Network  use --host to expose

Open `http://localhost:4321/` and see the placeholder page.

Build command (Milestone 6):

    npm run lint
    npm run check
    npm run build

Expected output includes:

    dist/index.html
    dist/about/index.html
    dist/plans/index.html
    dist/contact/index.html
    dist/_astro/...

Preview the build:

    npm run preview

Open `http://localhost:4321/` and verify all pages work with View Transitions.


## Validation and Acceptance

After completing all milestones, the following must be true:

1. Running `npm run dev` starts an Astro development server and all four pages are accessible at `/`, `/about/`, `/plans/`, `/contact/`.
2. Running `npm run lint` and `npm run check` completes with no errors.
3. Running `npm run build` produces static HTML/CSS/JS in `dist/` with one HTML file per page.
4. Clicking internal links performs a smooth View Transition (no full page reload, no flash of white).
5. The total JS shipped to the browser is reduced by at least 60% versus the pre-migration baseline (~239KB), because static components render as HTML only.
6. Each page has a unique `<title>` and `<meta name="description">` visible in the HTML source.
7. Each page has exactly one `<h1>` element.
8. The hero section on the homepage has a continuously scrolling marquee animation (CSS only — no JS shipped for this).
9. The stats counters animate when scrolled into view (React island with `client:visible`).
10. Clicking theme-switcher swatches changes accent colours immediately, the choice persists across page loads and View Transition navigations.
11. The FAQ accordion on the Plans page expands and collapses items.
12. The contact form captures all fields and manages submission state.
13. The mobile hamburger menu toggles the navigation panel without server-render errors.
14. All navigation links work across pages with no broken links.
15. The site is fully responsive at 375px, 768px, and 1440px viewport widths.


## Idempotence and Recovery

All steps in this plan are idempotent. Running `npm install` is always safe to repeat. Running `npm run build` overwrites the previous `dist/` output completely.

If a milestone fails partway through, the developer can restart from that milestone. Because the migration is additive (new `.astro` files alongside existing `.tsx` files until the old ones are deleted), rolling back is straightforward — delete the new `.astro` files and restore the old config files from git.

The `.gitignore` ensures `node_modules/` and `dist/` are never committed. In this single-branch workflow, prefer small checkpoint commits throughout migration. If recovery is needed, restore only migration-scoped paths instead of resetting the entire tree, for example:

    git restore --source=HEAD --worktree --staged package.json package-lock.json tsconfig.json astro.config.mjs src/env.d.ts src/main.tsx src/pages src/components src/layouts
    npm install
    npm run dev


## Artifacts and Notes

Current vs target architecture comparison:

    CURRENT (Vite MPA)                    TARGET (Astro)
    ─────────────────                     ──────────────
    4 HTML entry points at root           src/pages/*.astro (file-based routing)
    src/main.tsx (data-page router)       Deleted (Astro handles routing)
    vite.config.ts                        astro.config.mjs
    All components are React (.tsx)       Static → .astro, Interactive → .tsx with client:
    ~239KB JS bundle (all pages)          ~30-40KB JS (only interactive islands)
    Full page reload on navigation        View Transitions (SPA-like)
    Manual <head> per HTML file           Layout.astro with props

Component migration map:

    COMPONENT              FROM           TO              ISLAND?
    ─────────────────────  ────           ──              ───────
    Layout                 .tsx           .astro          No
    Header                 .tsx           .tsx            client:load (SSR-safe pathname handling)
    Footer                 .tsx           .astro          No (contains ThemeSwitcher island; newsletter submit handler removed)
    ThemeSwitcher          .tsx           .tsx            client:load
    Section                .tsx           .astro          No
    Button                 .tsx           .astro          No
    Hero                   .tsx           .astro          No (CSS-only animation)
    HowItWorks             .tsx           .astro          No
    Stats                  .tsx           .tsx            client:visible
    Testimonials           .tsx           .astro          No
    WhyTrilogy             .tsx           .astro          No
    CTABand                .tsx           .astro          No
    PricingCards           .tsx           .astro          No
    FAQ                    .tsx           .tsx            client:load
    CoachProfile           .tsx           .astro          No
    ContactForm            .tsx           .tsx            client:load

Files to delete after migration:
- `vite.config.ts`
- `tsconfig.app.json`, `tsconfig.node.json`
- `index.html`, `about/index.html`, `plans/index.html`, `contact/index.html`
- Root directories `about/`, `plans/`, `contact/` (after HTML deletion)
- `src/main.tsx`
- `src/vite-env.d.ts`
- `src/components/Layout.tsx`, `Layout.css`
- All `.tsx` files for components converted to `.astro` (Hero, HowItWorks, Testimonials, WhyTrilogy, CTABand, PricingCards, CoachProfile, Section, Button, Footer)
- `src/pages/Home.tsx`, `About.tsx`, `Plans.tsx`, `Contact.tsx` (keep page CSS files while imported by Astro pages)


## Interfaces and Dependencies

NPM packages to add:
- `astro` (^5.x) — the Astro framework, includes Vite internally
- `@astrojs/react` (^4.x) — Astro integration for React component islands

NPM packages to remove:
- `vite` — managed internally by Astro
- `@vitejs/plugin-react` — replaced by `@astrojs/react`

NPM packages that remain unchanged:
- `react` (^19.x) — used by interactive island components
- `react-dom` (^19.x) — used by Astro's React hydration
- `typescript` (~5.9.x) — type checking
- All ESLint packages — linting

Key Astro interfaces and patterns:

In `.astro` component files, props are typed via a `Props` interface:

    ---
    interface Props {
      title: string;
      variant?: 'primary' | 'secondary';
    }

    const { title, variant = 'primary' } = Astro.props;
    ---
    <div class={`component component--${variant}`}>{title}</div>

Children are rendered with `<slot />`:

    ---
    ---
    <section class="section">
      <slot />
    </section>

React islands are imported and rendered with a `client:` directive:

    ---
    import FAQ from '../components/FAQ';
    ---
    <FAQ client:load />

For Astro TypeScript support, include:

    /// <reference types="astro/client" />

in `src/env.d.ts`.

CSS imported in frontmatter is bundled globally; Astro's automatic CSS scoping applies to `<style>` blocks written inside a component file.

Google Fonts continue to load via `<link>` tags in the layout's `<head>`.

The Formspree form endpoint remains `https://formspree.io/f/placeholder` — to be replaced with a real form ID before deployment.


---

*Plan created: 2026-03-21. This is the initial version of the migration ExecPlan.*

*Revision note (2026-03-21): Updated this plan after technical audit to address Astro SSR safety for Header pathname logic, clarify Footer static conversion details, fix page CSS deletion sequencing, add `src/env.d.ts` and `astro check` validation gates, and replace destructive recovery guidance with path-scoped restore commands suitable for single-branch execution.*
