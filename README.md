# Trilogy Training

The website for [Trilogy Training](https://www.trilogy-training.com/) — personalised endurance coaching for triathletes, runners, swimmers, and cyclists, run by coaches Adam Labbett and Cameron Keast (Spain).

## Tech Stack

- [Astro](https://astro.build/) v6 — static site generator with file-based routing and View Transitions
- [React](https://react.dev/) 19 — used for interactive island components only
- TypeScript
- CSS custom properties for theming (no CSS framework)

### Architecture

The site uses Astro's [islands architecture](https://docs.astro.build/en/concepts/islands/). Most components are `.astro` files that render to static HTML at build time with zero JavaScript. Interactive components remain as React `.tsx` files and are hydrated on the client using Astro's `client:` directives:

| Component | Type | Directive | Purpose |
|---|---|---|---|
| Header | React island | `client:load` | Scroll detection, mobile menu toggle |
| ThemeSwitcher | React island | `client:load` | Theme selection with localStorage |
| PricingSection | React island | `client:load` | Currency toggle (CHF/EUR/GBP) |
| FAQ | React island | `client:load` | Accordion open/close |
| ContactForm | React island | `client:load` | Form state and Formspree submission |
| Stats | React island | `client:visible` | Animated number counters on scroll |

All other components (Hero, HowItWorks, Testimonials, WhyTrilogy, CTABand, CoachProfile, Section, Button, Footer) are static Astro components that ship no JavaScript.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Astro dev server |
| `npm run build` | Type-check and build for production |
| `npm run check` | Run Astro/TypeScript type checking |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── assets/silhouettes/    # SVG silhouettes for hero marquee
├── components/            # Astro (.astro) and React (.tsx) components
├── hooks/                 # React hooks (useInView)
├── layouts/Layout.astro   # Shared page layout with head, header, footer
├── pages/                 # File-based routes (/, /about/, /plans/, /contact/)
└── styles/                # Global CSS (variables, themes, reset, animations)
public/                    # Static assets (favicon, images, robots.txt, sitemap.xml)
```

## Design System

The site uses CSS custom properties defined in `src/styles/variables.css` for colours, spacing, and typography. Four colour themes (Original, Warm, Cool, Earth) are defined in `src/styles/themes.css` and switchable via the footer's theme picker.

Fonts (loaded via Google Fonts): Space Grotesk (headings), Inter (body), Space Mono (accents).

The full design system is documented in `.agents/design-system.md`.

## Pages

- **Home** (`/`) — Hero with CSS marquee animation, how it works, stats counters, testimonials, why Trilogy, CTA
- **About** (`/about/`) — Coach profiles (Adam & Cameron), coaching philosophy
- **Plans & Pricing** (`/plans/`) — Pricing with currency toggle, pre-made plans link, FAQ accordion
- **Contact** (`/contact/`) — Contact form (Formspree), direct contact info (WhatsApp, email, social)
