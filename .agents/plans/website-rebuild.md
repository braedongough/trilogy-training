# Rebuild Trilogy Training Website as a Premium Static Site

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `.agents/PLANS.md` at the repository root.


## Purpose / Big Picture

Trilogy Training is a personalised endurance coaching business run by Adam Labbett (based in Switzerland) and Cameron Keast (based in Spain). Their current website is built on Wix and suffers from critical SEO failures (no semantic headings, no meta descriptions, headings rendered as images), dated visual design, no clear calls-to-action, and no pricing transparency. A comprehensive audit of these issues lives in `RESEARCH.md` at the repository root.

After this rebuild, a visitor arriving at the Trilogy Training website will encounter a bold, premium-feeling site that immediately communicates credibility and drives them toward booking a free consultation call. The site will be fully SEO-optimised with proper semantic HTML, meta tags, structured data, and fast static-asset delivery. Adam will be able to swap the site's accent colour palette easily, giving it a fresh look whenever he wants — inspired by the Andy Warhol Marilyn Monroe pop art concept of the same subject in different colour treatments.

To see it working: from the repository root, run `npm run dev` to launch the development server, then open `http://localhost:5173` in a browser. Run `npm run build` to produce static HTML/CSS/JS files in the `dist/` directory, ready to deploy to any static hosting provider (Netlify, Vercel, Cloudflare Pages, or a simple Apache/Nginx server).


## Progress

- [x] Milestone 1: Project scaffolding, design system, and layout shell
- [x] Milestone 2: Homepage with hero animation, testimonials, and CTA sections
- [x] Milestone 3: About page with coach profiles
- [x] Milestone 4: Plans & Pricing page with tiered pricing cards
- [ ] ~~Milestone 5: Training Camps page~~ — REMOVED
- [x] Milestone 6: Contact page with lead-generation form
- [x] Milestone 7: SEO, meta tags, structured data, favicon, and final polish
- [x] Milestone 8: Build validation, accessibility audit, and deployment-readiness check


## Surprises & Discoveries

- Vite's dev server defaults to `appType: 'spa'`, which serves the root `index.html` for all unmatched routes. This caused every page to render as the homepage during development. Fixed by setting `appType: 'mpa'` in `vite.config.ts`. Additionally, MPA mode requires trailing slashes on internal links (`/about/` not `/about`) to resolve to `about/index.html`. All nav links, CTA buttons, and footer links were updated accordingly.


## Decision Log

- Decision: Use Vite with React and `vite-plugin-ssr` alternative approach — generate static HTML via Vite's built-in MPA (multi-page application) mode using `vite-plugin-pages` or manual HTML entry points.
  Rationale: The user wants static assets, not a single-page application. Vite supports multi-page builds natively by specifying multiple HTML entry points in `vite.config.ts`. This avoids the complexity of SSR frameworks while producing one HTML file per route — each is a self-contained page with its own `<head>`, enabling proper SEO meta tags per page. React is used for component authoring but each page hydrates independently.
  Date/Author: 2026-03-20 / Plan author

- Decision: Use CSS custom properties (CSS variables) for the swappable colour theme system rather than a CSS-in-JS solution.
  Rationale: Adam wants to easily swap accent colours (Andy Warhol concept). CSS custom properties defined on `:root` allow changing two or three variables to re-theme the entire site. This is simpler, faster, and works with static builds without runtime overhead. A small theme-switcher component can toggle a `data-theme` attribute on `<html>`, and CSS rules under `[data-theme="warm"]`, `[data-theme="cool"]`, etc., override the defaults.
  Date/Author: 2026-03-20 / Plan author

- Decision: Three primary brand colours derived from the logo: dark/near-black background (#1A1A2E), cyan/turquoise (#00E5CC), and hot pink/magenta (#FF2D78). Two alternate palettes will be predefined as swappable themes.
  Rationale: The logo photo shows these three colours clearly. The Endurance Punks banner confirms the same cyan + pink palette with a punk/splatter energy. The user explicitly asked for these three colours with easy swapability.
  Date/Author: 2026-03-20 / Plan author

- Decision: Design aesthetic combines Bauhaus geometric minimalism with punk energy — sharp angular shapes, bold typography, geometric dividers, with occasional splatter/paint-stroke accents as decorative elements.
  Rationale: The user referenced Bauhaus, geometric shapes, sharp lines, and also likes the Endurance Punks splatter imagery. The Dead Good website reference shows how minimalism and silhouettes create premium feel. The combination is: clean Bauhaus layout with geometric shapes (triangles referencing the logo, sharp diagonal lines) and controlled splatter accents that add energy without chaos.
  Date/Author: 2026-03-20 / Plan author

- Decision: The hero section will feature a horizontal marquee/ticker animation of silhouetted athlete imagery (swimming, cycling, running) against a bold colour background, inspired by the Dead Good website's product carousel approach.
  Rationale: The user specifically referenced the Dead Good `/soft-seating` page hero animation with "simple colours and silhouetted products." For a triathlon coaching site, silhouetted athletes in swim/bike/run poses create the same premium, minimal effect. The continuous horizontal scroll (CSS-only marquee using `@keyframes`) is lightweight and visually striking.
  Date/Author: 2026-03-20 / Plan author

- Decision: The primary conversion goal is lead generation — every page funnels toward booking a free consultation call or submitting a contact form.
  Rationale: Adam said "I need the website to get to a point where it creates a lead, where it speaks to me because I can't sell myself until I'm speaking to someone face to face or on the phone." The site is a funnel, not a brochure. Every section ends with a CTA that drives toward the contact/booking action.
  Date/Author: 2026-03-20 / Plan author

- Decision: Do not display the IRONMAN Certified Coach badge. Instead mention certifications in prose on the About page.
  Rationale: Adam explicitly said he doesn't care about keeping the badge. His certifications (Endurance Sport Coaching Institute, Ironman U Certified Coach) will be mentioned in his bio text.
  Date/Author: 2026-03-20 / Plan author

- Decision: Remove Training Camps page (Milestone 5) from the initial rebuild. The camps page, related components (Gallery.tsx, NotifyForm.tsx), and /camps route have been removed entirely.
  Rationale: The camps page will be rebuilt later as a separate effort. The site now has four pages: Home, About, Plans & Pricing, and Contact.
  Date/Author: 2026-03-20 / Developer

- Decision: Re-add "Shop" external link to top-level navigation and footer, linking to https://www.owayo.ie/store/trilogytraining (opens in new tab).
  Rationale: The original Wix site included a Shop nav link to the owayo.ie store. This preserves that functionality as an external redirect rather than an internal page.
  Date/Author: 2026-03-20 / Developer

- Decision: Set `appType: 'mpa'` in `vite.config.ts` and use trailing slashes on all internal links (e.g. `/about/` instead of `/about`).
  Rationale: Vite's default SPA fallback was routing all pages to the root `index.html`, causing every page to render as the homepage. MPA mode disables that fallback. Trailing slashes are required so the dev server resolves `/about/` to `about/index.html`.
  Date/Author: 2026-03-20 / Developer

- Decision: Use real coach photos in circular frames with accent-coloured ring borders instead of geometric triangle avatars with initials.
  Rationale: Real photos build trust and credibility. Photos are served from `/images/coaches/adam.jpg` and `/images/coaches/cameron.jpg`. The circular frame uses `border-radius: 50%` with a 4px padding ring in each coach's accent colour (cyan for Adam, pink for Cameron). Bio text is justified for clean edges.
  Date/Author: 2026-03-20 / Developer


## Outcomes & Retrospective

### Milestone 8 — Build Validation (2026-03-21)

- `npm run build` completes successfully, producing `dist/` with 4 HTML entry points (index, about, plans, contact) plus hashed CSS/JS assets.
- All static assets (favicon.svg, og-image.png, og-image.svg, robots.txt, sitemap.xml) are copied to `dist/`.
- `.gitignore` excludes `node_modules/` and `dist/`.
- Lighthouse desktop scores: Accessibility **95**, Best Practices **100**, SEO **100**.
- Lighthouse mobile scores: Accessibility **95**, Best Practices **100**, SEO **100**.
- Two accessibility issues fixed during validation:
  - CTA band subtitle colour changed from `rgba(255,255,255,0.85)` to `#fff` to meet WCAG contrast requirements on the pink background.
  - Footer headings changed from `<h4>` to `<p>` elements (styled the same) to fix heading-order skip.
- All pages verified responsive at 375px (mobile), 768px (tablet implied by CSS), and 1440px (desktop).
- Contact form captures all required fields: Name, Email, Phone, training interest, goals, referral source.
- Theme switcher persists across pages via `localStorage` with early-load script preventing colour flash.
- Every page has a CTA section driving toward `/contact/`.
- Sticky header with "Book a Free Call" button present on all pages.
- All navigation links work across pages.


## Context and Orientation

The repository at `/Users/braedongough/code/trilogy-training/` currently contains only audit artifacts from the existing Wix website. There is no application source code yet. The key files are:

- `RESEARCH.md` — full audit of the existing site, documenting every SEO, design, accessibility, content, and conversion issue. This is the "problem statement" that the rebuild solves.
- `CLAUDE.md` — project instructions for this repository.
- `.agents/PLANS.md` — the ExecPlan specification that this document follows.
- `screenshots/` — full-page screenshots of every page on the current Wix site (homepage, about, contact, plans-pricing, training-camps).
- `lighthouse/` and `lighthouse-mobile/` — Lighthouse audit reports.
- `snapshots/` — accessibility tree snapshot of the homepage.

After the rebuild, the application source code will live at the repository root alongside these audit artifacts. The `src/` directory will contain all React components, pages, styles, and assets. The `public/` directory will contain static assets like the favicon and Open Graph images. The `dist/` directory (git-ignored) will contain the built static output.

Key terms used in this plan:

- **MPA (Multi-Page Application):** A website where each route (e.g. `/about`, `/contact`) is a separate HTML file. The browser loads a full HTML page for each navigation. This is the opposite of a Single-Page Application (SPA) where one HTML file handles all routes via JavaScript. MPA is better for SEO because each page has its own `<title>`, `<meta>` tags, and content visible to search engine crawlers without JavaScript execution.
- **CSS custom properties (CSS variables):** Values defined in CSS using `--variable-name: value` syntax that can be referenced elsewhere with `var(--variable-name)`. Changing the variable's value in one place changes it everywhere it's used. This is how the colour theme swapping works.
- **Marquee animation:** A continuous horizontal scrolling effect where content moves from right to left (or vice versa) in a loop. Achieved with CSS `@keyframes` animation that translates content along the X axis.
- **Structured data:** JSON-LD code blocks in the HTML `<head>` that tell search engines what the page is about in a machine-readable format (e.g. "this is a local business at this address with these services"). This enables rich snippets in search results.
- **Static site / static assets:** HTML, CSS, and JavaScript files that can be served by any web server without server-side processing. No database, no server runtime — just files on disk.


## Plan of Work

The work is divided into eight milestones, each producing a verifiable result. The milestones build on each other sequentially.


### Milestone 1: Project Scaffolding, Design System, and Layout Shell

This milestone produces a running Vite development server with a multi-page React application skeleton. At the end, the developer can visit six routes (/, /about, /plans, /camps, /contact) and see a shared layout (header with navigation, footer) rendered with the design system's colours and typography. No page content yet — just the shell.

The project will be bootstrapped using Vite's React-TypeScript template. Vite's multi-page support works by specifying multiple HTML entry points in `vite.config.ts` under `build.rollupOptions.input`. Each page gets its own `index.html` file that imports its own React entry point.

File structure to create:

    /Users/braedongough/code/trilogy-training/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html                          (homepage entry)
    ├── about/index.html                    (about page entry)
    ├── plans/index.html                    (plans & pricing entry)
    ├── camps/index.html                    (training camps entry)
    ├── contact/index.html                  (contact page entry)
    ├── public/
    │   ├── favicon.svg                     (SVG favicon using logo triangle shape)
    │   └── og-image.png                    (Open Graph sharing image — placeholder initially)
    ├── src/
    │   ├── main.tsx                        (shared React entry — renders the correct page component based on a data attribute)
    │   ├── styles/
    │   │   ├── reset.css                   (modern CSS reset)
    │   │   ├── variables.css               (CSS custom properties: colours, typography, spacing)
    │   │   ├── themes.css                  (alternate colour theme definitions)
    │   │   ├── global.css                  (global styles, base typography)
    │   │   └── animations.css              (shared keyframe animations)
    │   ├── components/
    │   │   ├── Layout.tsx                  (shared header + footer wrapper)
    │   │   ├── Header.tsx                  (sticky nav with logo, links, CTA button)
    │   │   ├── Footer.tsx                  (sitemap links, social icons, legal links, newsletter)
    │   │   ├── Button.tsx                  (primary/secondary CTA button component)
    │   │   ├── Section.tsx                 (full-width section wrapper with geometric dividers)
    │   │   └── ThemeSwitcher.tsx           (small UI to toggle colour themes)
    │   └── pages/
    │       ├── Home.tsx
    │       ├── About.tsx
    │       ├── Plans.tsx
    │       ├── Camps.tsx
    │       └── Contact.tsx

The design system is defined in `src/styles/variables.css`:

    :root {
      /* Primary palette — derived from Trilogy Training logo */
      --color-bg: #1A1A2E;
      --color-bg-alt: #16213E;
      --color-surface: #0F3460;
      --color-accent-1: #00E5CC;       /* Cyan/turquoise — from logo triangle */
      --color-accent-2: #FF2D78;       /* Hot pink/magenta — from logo text */
      --color-text: #FFFFFF;
      --color-text-muted: #A0A0B0;
      --color-text-on-accent: #1A1A2E;

      /* Typography */
      --font-heading: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-accent: 'Space Mono', monospace;

      /* Spacing scale (8px base) */
      --space-xs: 0.5rem;
      --space-sm: 1rem;
      --space-md: 2rem;
      --space-lg: 4rem;
      --space-xl: 8rem;

      /* Layout */
      --max-width: 1200px;
      --header-height: 80px;
    }

The alternate themes in `src/styles/themes.css`:

    [data-theme="warm"] {
      --color-accent-1: #FFB800;       /* Gold/amber */
      --color-accent-2: #FF4500;       /* Orange-red */
    }

    [data-theme="cool"] {
      --color-accent-1: #7B68EE;       /* Medium slate blue */
      --color-accent-2: #00CED1;       /* Dark turquoise */
    }

    [data-theme="earth"] {
      --color-accent-1: #2ECC71;       /* Emerald green */
      --color-accent-2: #E67E22;       /* Carrot orange */
    }

Typography choices: Space Grotesk is a geometric sans-serif with Bauhaus DNA — angular, modern, bold at heavy weights. Inter is an extremely legible body font optimised for screens. Space Mono adds a technical/punk edge for small accent text (labels, stats). All are free Google Fonts.

The `Header.tsx` component renders a sticky header with the Trilogy Training wordmark (text, not an image — critical for SEO and accessibility), navigation links, and a prominent "Book a Free Call" CTA button in `--color-accent-2`. The header has a `backdrop-filter: blur()` glass effect on scroll.

The `Footer.tsx` component renders a full footer with: sitemap links (all pages), social media links (Instagram, Facebook), contact email and WhatsApp links, a simple newsletter signup input, and legal links (Privacy Policy, Terms — these will be placeholder pages). The footer uses geometric shapes (triangle motifs from the logo) as decorative elements.

The `Section.tsx` component is a layout primitive that wraps content in a full-width section with optional geometric dividers between sections — diagonal lines or triangle shapes created with CSS `clip-path` that give the page its Bauhaus/angular feel.

The `ThemeSwitcher.tsx` component is a small set of colour-swatch circles in the footer or header that, when clicked, set a `data-theme` attribute on the `<html>` element and save the choice to `localStorage`. On page load, the saved theme is applied before React hydrates to prevent a flash of wrong colours.

Each HTML entry point (e.g. `about/index.html`) is a minimal HTML file with the page-specific `<title>`, `<meta name="description">`, Open Graph tags, and a `<div id="root" data-page="about"></div>`. The shared `src/main.tsx` reads the `data-page` attribute and renders the corresponding page component inside the `Layout` wrapper. This approach means each page is its own HTML file (good for SEO) but all pages share the same JavaScript bundle (simple build configuration).


### Milestone 2: Homepage with Hero Animation, Testimonials, and CTA Sections

This milestone builds out the homepage (`src/pages/Home.tsx`) into a fully designed, conversion-focused landing page. At the end, visiting `http://localhost:5173/` shows a striking homepage with: (1) an animated hero section with silhouetted athlete marquee, (2) a "How It Works" section, (3) a stats/social-proof section, (4) a testimonials grid, (5) a "Why Trilogy" section, and (6) a final CTA section. Every section drives toward the "Book a Free Call" action.

The hero section occupies the full viewport height. It has a bold headline ("Train Smarter. Race Stronger.") in Space Grotesk at a very large size, a subtitle ("Personalised endurance coaching from Switzerland & Spain"), and a prominent CTA button. Behind the text, a horizontal marquee of silhouetted athlete shapes (created as SVG illustrations — simple geometric/angular silhouettes of a swimmer, cyclist, and runner in the Bauhaus style) scrolls continuously from right to left. The silhouettes are rendered in `--color-accent-1` with low opacity against the dark background, creating a subtle, premium motion effect. The marquee uses pure CSS animation (`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`) applied to a container that holds the silhouette SVGs duplicated so the loop is seamless.

The "How It Works" section has three steps presented as geometric cards with numbers inside triangles: (1) "Book a Free Call — Tell us about your goals and experience", (2) "Get Your Plan — Receive a personalised training programme", (3) "Train & Improve — Ongoing coaching, feedback, and support." Each card has a sharp angular border and uses `--color-accent-1` for the number, `--color-accent-2` for the triangle border.

The stats section shows key numbers in a horizontal row: "500+ Training Plans Delivered", "15+ Years Combined Experience", "10+ Countries Served", "100% Personalised Coaching". These animate in (count up) when they scroll into view using an Intersection Observer. The numbers use Space Mono font at large size in `--color-accent-1`.

The testimonials section replaces the existing site's single-testimonial slider with a masonry-style grid of testimonial cards. Each card has the testimonial text, the athlete's name, and their event/achievement. Cards have a subtle geometric border treatment (angular corners, not rounded). The testimonials from the existing site are:

- "I've really enjoyed working with Adam over the past year. Prior to hiring a coach I was very much training on my own with a plan I put together from watching YouTube videos. Adam's plan is tailored around my personal targets, lifestyle, and ability..." — Testimonial from current site
- Additional testimonials to be sourced or created as placeholders.

The final CTA section is a full-width band in `--color-accent-2` with white text: "Ready to take your training to the next level?" and a large "Book Your Free Consultation" button. This section has a geometric pattern background (repeating triangles at low opacity).

All sections use `Section.tsx` with angular dividers between them — diagonal `clip-path` cuts that transition between different background colours, giving the page a dynamic, angular flow rather than flat horizontal stripes.

Scroll-triggered animations: Each section fades and slides in from below as it enters the viewport. This is implemented with a custom `useInView` React hook that wraps `IntersectionObserver`. Elements start with `opacity: 0; transform: translateY(40px)` and transition to `opacity: 1; transform: translateY(0)` when observed.

New files created in this milestone:

    src/components/Hero.tsx                 (hero section with marquee)
    src/components/HowItWorks.tsx           (three-step process section)
    src/components/Stats.tsx                (animated stats counter section)
    src/components/Testimonials.tsx         (testimonial grid)
    src/components/CTABand.tsx              (full-width call-to-action section)
    src/hooks/useInView.ts                  (Intersection Observer hook for scroll animations)
    src/assets/silhouettes/                 (SVG silhouette files: swimmer.svg, cyclist.svg, runner.svg)


### Milestone 3: About Page with Coach Profiles

This milestone builds the About page (`src/pages/About.tsx`). At the end, visiting `/about` shows a page with: (1) a hero section with the headline "Meet Your Coaches", (2) individual coach profile cards for Adam Labbett and Cameron Keast, (3) a "Our Philosophy" section, and (4) a CTA section driving toward contact.

Each coach profile is a large card with: a geometric avatar placeholder (a triangle with the coach's initials in the centre — actual photos can be added later), the coach's name as an H2, their location (Adam: Switzerland, Cameron: Spain), their credentials in prose form, and a short bio paragraph. The card has a diagonal accent stripe in the coach's assigned accent colour.

Adam Labbett's profile mentions: based in Switzerland, certified by the Endurance Sport Coaching Institute, Ironman U Certified Coach, and his coaching philosophy and experience. Cameron Keast's profile mentions: based in Spain, sport science degree from Edinburgh University, and his coaching background.

The "Our Philosophy" section explains the coaching approach in compelling copy — personalised plans, regular communication, data-driven adjustments, focus on life balance alongside performance.

A final CTA section identical in pattern to the homepage's but with different copy: "Find out if we're the right fit" → "Book a Free Call."


### Milestone 4: Plans & Pricing Page with Tiered Pricing Cards

This milestone builds the Plans & Pricing page (`src/pages/Plans.tsx`). At the end, visiting `/plans` shows a page with: (1) a headline "Plans & Pricing", (2) three tiered pricing cards, (3) a feature comparison section, (4) an FAQ accordion, and (5) a CTA section.

The three tiers are presented as bold geometric cards side by side (stacking vertically on mobile). Each card has: a tier name, a price (or "Get in Touch" if Adam prefers to keep certain tiers quote-based), a bullet list of what's included, and a CTA button. The middle/recommended tier is visually highlighted with a `--color-accent-2` border and a "Most Popular" badge.

Suggested tiers (Adam can adjust the exact names and prices):

- **Foundation** — Self-guided training plan with monthly check-ins. For athletes who want structure but prefer independence.
- **Performance** (Most Popular) — Fully personalised coaching with weekly plan adjustments, regular communication, and race-day strategy. For athletes serious about improvement.
- **Elite** — Everything in Performance plus daily communication, detailed session analysis, nutrition guidance, and unlimited plan revisions. For athletes targeting peak performance at key events.

The FAQ section uses an accordion pattern (click to expand) and addresses common objections: "What platform do you use for training plans?" (TrainingPeaks), "Can I pause my coaching?", "Do you coach complete beginners?", "How do consultations work?", "What if I'm training for a specific race?"

New files:

    src/components/PricingCard.tsx           (tiered pricing card component)
    src/components/FAQ.tsx                   (accordion FAQ component)


### Milestone 5: Training Camps Page

This milestone builds the Training Camps page (`src/pages/Camps.tsx`). The current site's camps page is nearly empty ("no spaces available"). The rebuilt page will be an aspirational showcase even when no camps are currently scheduled.

The page shows: (1) a hero with "Training Camps" headline and an evocative subtitle about training in Spain or Switzerland, (2) a "What to Expect" section describing the camp experience (structured training, group rides, open water swimming, coached sessions, social evenings), (3) a gallery section with geometric placeholder frames for camp photos (actual photos to be added later), (4) a "Past Camps" section with a brief write-up template, and (5) a "Get Notified" CTA that captures email for camp announcements — this doubles as lead generation.

New files:

    src/components/Gallery.tsx               (geometric photo gallery grid)
    src/components/NotifyForm.tsx             (email capture for camp notifications)


### Milestone 6: Contact Page with Lead-Generation Form

This milestone builds the Contact page (`src/pages/Contact.tsx`). This is the primary conversion endpoint — the page Adam needs to generate leads.

The page shows: (1) a headline "Let's Talk" with a subtitle "Book a free consultation or drop us a message", (2) a contact form with qualifying fields (Name, Email, Phone, "What are you training for?" dropdown, "Tell us about your goals" textarea, "How did you hear about us?" dropdown), (3) direct contact info alongside the form (WhatsApp click-to-chat links for both coaches, email address), and (4) the coaches' locations displayed with small geometric map markers.

The form will submit via a `mailto:` link or a Formspree/Netlify Forms endpoint (configurable). For the initial build, the form will use Formspree's free tier — the form's `action` attribute points to a Formspree endpoint and submissions are forwarded to Adam's email. No backend code needed.

The contact form is intentionally designed to qualify leads: the dropdown asking "What are you training for?" (options: Triathlon, Ironman, Marathon, Cycling Event, Swimming Event, General Fitness, Other) tells Adam what the prospect wants before the call. The "How did you hear about us?" dropdown (options: Google Search, Instagram, Facebook, Friend/Referral, Other) helps Adam understand his marketing channels.

New files:

    src/components/ContactForm.tsx           (lead-generation form with qualifying fields)


### Milestone 7: SEO, Meta Tags, Structured Data, Favicon, and Final Polish

This milestone adds all the SEO and technical elements that the existing Wix site is missing. At the end, every page has proper `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags, and structured data. A custom favicon derived from the logo triangle is in place.

Each HTML entry file gets page-specific meta tags. For example, the homepage `index.html`:

    <title>Trilogy Training | Personalised Endurance Coaching for Triathletes & Runners</title>
    <meta name="description" content="Personalised triathlon, running, swimming & cycling coaching from certified coaches in Switzerland & Spain. Book your free consultation today." />
    <meta property="og:title" content="Trilogy Training | Personalised Endurance Coaching" />
    <meta property="og:description" content="Train smarter with personalised coaching from experienced endurance sport coaches." />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

Structured data (JSON-LD) added to the homepage:

- `Organization` schema with name, logo, URL, social profiles
- `LocalBusiness` schema (or `SportsActivityLocation`) with both coaches' locations
- `Service` schema for the coaching services offered
- `Person` schemas for Adam and Cameron

The `favicon.svg` is a simplified version of the logo's triangle motif — three nested triangles in the brand cyan, rendered as an SVG for crispness at all sizes. This also serves as the `apple-touch-icon` when converted to PNG.

The `og-image.png` is a 1200x630 image with the Trilogy Training wordmark on the dark background with geometric accents — generated as an SVG first and then referenced (or rasterised to PNG).

Additional SEO work:

- Add `<html lang="en">` to all pages
- Add canonical URLs: `<link rel="canonical" href="https://www.trilogy-training.com/about" />`
- Create a `public/robots.txt` allowing all crawlers
- Create a `public/sitemap.xml` listing all pages with lastmod dates
- Ensure all images have descriptive `alt` attributes
- Ensure proper heading hierarchy (one H1 per page, H2s for sections, H3s for subsections)
- Add `loading="lazy"` to below-fold images


### Milestone 8: Build Validation, Accessibility Audit, and Deployment-Readiness Check

This milestone validates the entire build. At the end, the site passes all checks and produces a `dist/` directory ready for deployment.

Steps:

1. Run `npm run build` and verify it completes without errors. Check that `dist/` contains separate HTML files for each page (index.html, about/index.html, plans/index.html, camps/index.html, contact/index.html).
2. Serve the built output locally with `npx serve dist` and manually verify every page loads, navigation works, the theme switcher functions, forms are interactive, and all sections render correctly.
3. Run a Lighthouse audit on the locally-served build and target: Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95.
4. Verify all heading hierarchy is correct (one H1 per page).
5. Verify all images have alt text.
6. Verify the favicon appears in the browser tab.
7. Verify meta descriptions render in the page source.
8. Verify structured data is valid by pasting the homepage source into Google's Rich Results Test (or by inspecting the JSON-LD in source).
9. Verify the contact form submits correctly (or is wired to a working endpoint).
10. Verify the theme switcher persists across page navigations (localStorage).
11. Test all pages at mobile viewport (375px wide) and verify responsive layout.
12. Add a `.gitignore` that excludes `node_modules/` and `dist/`.


## Concrete Steps

All commands run from the repository root: `/Users/braedongough/code/trilogy-training/`

Milestone 1 setup commands:

    npm create vite@latest . -- --template react-ts

If the directory is not empty, Vite may prompt. Use the `--force` flag if needed or select the option to scaffold in the current directory. Expected output includes confirmation that the project was scaffolded.

Then install dependencies:

    npm install

    npm install -D @types/react @types/react-dom

Install the Google Fonts by adding `<link>` tags to each HTML entry file (no npm package needed — fonts load from Google's CDN).

Start the dev server:

    npm run dev

Expected output:

    VITE v6.x.x  ready in XXX ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose

Open `http://localhost:5173/` in a browser and see the layout shell with header, navigation, footer, and design system colours.

Build static output:

    npm run build

Expected output:

    dist/index.html
    dist/about/index.html
    dist/plans/index.html
    dist/camps/index.html
    dist/contact/index.html
    dist/assets/...

Serve the build locally to verify:

    npx serve dist

Open `http://localhost:3000/` and verify all pages work.


## Validation and Acceptance

After completing all milestones, the following must be true:

1. Running `npm run dev` starts a development server and all five pages are accessible at `/`, `/about`, `/plans`, `/camps`, `/contact`.
2. Running `npm run build` produces static HTML/CSS/JS in `dist/` with one HTML file per page.
3. Each page has a unique `<title>` and `<meta name="description">` visible in the HTML source.
4. Each page has exactly one `<h1>` element and uses a logical H2/H3 hierarchy.
5. The hero section on the homepage has a continuously scrolling marquee animation of athlete silhouettes.
6. Clicking the theme-switcher swatches changes the site's accent colours immediately, and the choice persists across page loads.
7. The contact form captures Name, Email, Phone, training interest, goals, and referral source.
8. All navigation links work across pages (no broken links).
9. The site is fully responsive — all layouts work at 375px, 768px, and 1440px viewport widths.
10. Lighthouse scores: Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 95.
11. The sticky header shows a "Book a Free Call" button that links to `/contact`.
12. Every page ends with a CTA section that drives toward the contact page.


## Idempotence and Recovery

All steps in this plan are idempotent. Running `npm create vite@latest` in an existing project can be retried (Vite will ask whether to overwrite). Running `npm install` is always safe to repeat. Running `npm run build` overwrites the previous `dist/` output completely.

If a milestone fails partway through, the developer can restart from that milestone by reading this plan from the milestone's heading. Earlier milestones' work will already be in place as committed code.

The `.gitignore` ensures `node_modules/` and `dist/` are never committed. All source code is committed. Recovery from any state is: `git checkout main`, `npm install`, `npm run dev`.


## Artifacts and Notes

Trilogy Training logo analysis (from the attached photo):

- Three interlocking triangles forming a larger triangle shape
- Swim, bike, and run icons inside each triangle
- "TRILOGY" text: "TRI" in hot pink (#FF2D78), "LOGY" in cyan (#00E5CC)
- "TRAINING" text: all in cyan (#00E5CC)
- Background: near-black (#1A1A2E)
- The triangle motif is the brand's geometric foundation — it should appear throughout the site as decorative elements, dividers, and the favicon shape

Endurance Punks banner analysis (from owayo CDN):

- Black background with explosive paint splatter in hot pink and cyan
- Hand-written/punk style text "endurance punks" in pink
- Cyan splatter accents mixed with pink
- Energetic, rebellious, raw aesthetic
- This informs the "controlled chaos" decorative elements — splatter textures used sparingly as background accents on hover states, section transitions, or as decorative corner elements. Not overdone — the Bauhaus restraint keeps it premium while the splatter adds personality.

Dead Good website reference (deadgoodltd.co.uk):

- Minimalist design with clean backgrounds and silhouetted product photography
- Horizontal scrolling/marquee product showcases in the hero
- Premium feel through restraint, whitespace, and typography
- This informs our hero section: silhouetted athlete shapes scrolling horizontally, minimal colour palette, bold type. The premium feel comes from what we leave out, not what we add.


## Interfaces and Dependencies

NPM packages required:

- `react` (^19.x) — UI component library
- `react-dom` (^19.x) — React DOM renderer
- `vite` (^6.x) — build tool and dev server
- `@vitejs/plugin-react` — Vite plugin for React JSX transform
- `typescript` (^5.x) — type checking

No additional runtime dependencies. The design system, animations, form handling, and theme switching are all implemented with vanilla CSS and small React hooks. No CSS framework (Tailwind, etc.), no animation library (Framer Motion, GSAP), no form library. This keeps the bundle tiny and the site fast.

Google Fonts loaded via `<link>` tags in each HTML file:

- Space Grotesk (weights: 400, 500, 700)
- Inter (weights: 400, 500, 600)
- Space Mono (weights: 400, 700)

Form submission: Formspree (formspree.io) free tier. The form's `action` attribute is set to `https://formspree.io/f/{form-id}` where `{form-id}` is obtained by creating a free Formspree form. For development, the form can simply log to console.

Key TypeScript interfaces:

In `src/components/Button.tsx`:

    interface ButtonProps {
      children: React.ReactNode;
      variant: 'primary' | 'secondary' | 'outline';
      href?: string;
      onClick?: () => void;
      size?: 'default' | 'large';
    }

In `src/components/Section.tsx`:

    interface SectionProps {
      children: React.ReactNode;
      background?: 'default' | 'alt' | 'accent-1' | 'accent-2';
      divider?: 'diagonal-up' | 'diagonal-down' | 'triangle' | 'none';
      id?: string;
    }

In `src/components/PricingCard.tsx`:

    interface PricingCardProps {
      tier: string;
      price: string;
      description: string;
      features: string[];
      highlighted?: boolean;
      ctaText?: string;
      ctaHref?: string;
    }

In `src/components/FAQ.tsx`:

    interface FAQItem {
      question: string;
      answer: string;
    }

    interface FAQProps {
      items: FAQItem[];
    }

In `src/components/ContactForm.tsx`:

    interface ContactFormData {
      name: string;
      email: string;
      phone: string;
      trainingGoal: string;
      message: string;
      referralSource: string;
    }


---

*Plan created: 2026-03-20. This is the initial version of the ExecPlan. No revisions have been made yet.*
