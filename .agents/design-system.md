# Trilogy Training — Design System

This document defines the visual language, principles, and implementation patterns for the Trilogy Training website. It is the single source of truth for all design decisions and should be consulted before creating or modifying any UI.

---

## Design Philosophy

**Bauhaus geometry meets punk energy.**

The site combines clean, geometric minimalism (sharp angles, bold typography, structured layouts) with controlled splatter/paint-stroke accents that add personality without chaos. The premium feel comes from restraint — what we leave out matters as much as what we include.

### Core Principles

1. **Lead with conversion.** Every page is a funnel, not a brochure. Every section should push the visitor toward booking a free consultation. CTAs are prominent, frequent, and unmissable.
2. **Dark-first, bold colour.** The dark background creates a premium canvas. Accent colours pop against it — they draw the eye to CTAs and key information.
3. **Angular, not rounded.** Prefer sharp edges, diagonal lines, and triangular motifs over rounded corners and soft shapes. The triangle is the brand's geometric foundation (three interlocking triangles from the logo representing swim, bike, run).
4. **Restrained motion.** Animation is purposeful — the hero marquee, scroll-triggered fade-ins, stat count-ups. Never decorative for its own sake. No parallax, no bouncing, no gratuitous transitions.
5. **Swappable identity.** The entire colour personality of the site can change by swapping two CSS variables. Inspired by Warhol's Marilyn Monroe prints — same subject, different palette. The structure stays constant; the accent colours are the variable.

---

## Colour System

All colours are defined as CSS custom properties in `src/styles/variables.css` and themed via `data-theme` attributes in `src/styles/themes.css`.

### Default Palette (derived from the logo)

| Token                    | Value     | Usage                                      |
|--------------------------|-----------|----------------------------------------------|
| `--color-bg`             | `#1A1A2E` | Primary background (near-black)              |
| `--color-bg-alt`         | `#16213E` | Alternate section background                 |
| `--color-surface`        | `#0F3460` | Card/elevated surface background             |
| `--color-accent-1`       | `#00E5CC` | Cyan/turquoise — stats, numbers, highlights  |
| `--color-accent-2`       | `#FF2D78` | Hot pink/magenta — CTAs, badges, emphasis     |
| `--color-text`           | `#FFFFFF` | Primary text                                 |
| `--color-text-muted`     | `#A0A0B0` | Secondary/supporting text                    |
| `--color-text-on-accent` | `#1A1A2E` | Text placed on accent-coloured backgrounds   |

### Alternate Themes

Themes swap only `--color-accent-1` and `--color-accent-2`. The dark foundation, text colours, and layout remain unchanged.

| Theme   | Accent 1 (highlight)        | Accent 2 (CTA)              |
|---------|------------------------------|-------------------------------|
| Default | `#00E5CC` Cyan               | `#FF2D78` Hot pink            |
| Warm    | `#FFB800` Gold/amber         | `#FF4500` Orange-red          |
| Cool    | `#7B68EE` Slate blue         | `#00CED1` Dark turquoise      |
| Earth   | `#2ECC71` Emerald green      | `#E67E22` Carrot orange       |

### Colour Usage Rules

- **Accent 1** is for informational emphasis: stats, step numbers, highlighted text, icon accents, selection colour.
- **Accent 2** is for action: CTA buttons, badges ("Most Popular"), full-width CTA bands, hover states on primary actions.
- Never place accent-1 text on an accent-2 background (or vice versa) without checking contrast.
- `--color-text-on-accent` (dark) is used for text placed directly on accent-coloured fills.
- The `::selection` highlight uses accent-1 background with text-on-accent foreground.

---

## Typography

Three typefaces, each with a distinct role. All are free Google Fonts loaded via `<link>` tags in each HTML entry file.

| Token            | Typeface       | Weights      | Role                                       |
|------------------|----------------|--------------|---------------------------------------------|
| `--font-heading` | Space Grotesk  | 400, 500, 700 | Headings, hero text, section titles         |
| `--font-body`    | Inter          | 400, 500, 600 | Body copy, form labels, navigation          |
| `--font-accent`  | Space Mono     | 400, 700      | Stats, labels, small accent text, monospace |

### Type Scale

Headings use `clamp()` for fluid responsive sizing — no breakpoint jumps.

| Element | Size                            | Weight | Letter-spacing | Line-height |
|---------|---------------------------------|--------|----------------|-------------|
| `h1`    | `clamp(2.5rem, 6vw, 5rem)`     | 700    | `-0.02em`      | `1.1`       |
| `h2`    | `clamp(1.75rem, 4vw, 3rem)`    | 700    | `-0.01em`      | `1.1`       |
| `h3`    | `clamp(1.25rem, 2.5vw, 1.75rem)` | 700  | normal         | `1.1`       |
| `p`     | `clamp(1rem, 1.2vw, 1.125rem)` | 400    | normal         | `1.6`       |

### Typography Rules

- Headings always use `--font-heading` with `font-weight: 700`.
- Body text uses `--font-body`. Max width `65ch` to maintain comfortable reading lines.
- Use `--font-accent` (Space Mono) sparingly for stats, counters, labels, and small UI elements that benefit from a technical/punk edge.
- Anti-aliasing is enabled globally (`-webkit-font-smoothing: antialiased`).

---

## Spacing

An 8px base spacing scale defined as CSS custom properties.

| Token        | Value     | Use case                                       |
|--------------|-----------|------------------------------------------------|
| `--space-xs` | `0.5rem`  | Tight gaps (icon-to-text, inline elements)      |
| `--space-sm` | `1rem`    | Standard element spacing, padding               |
| `--space-md` | `2rem`    | Section internal padding, card padding           |
| `--space-lg` | `4rem`    | Between major sections                           |
| `--space-xl` | `8rem`    | Page-level vertical breathing room               |

Always use spacing tokens rather than arbitrary values. This keeps vertical rhythm consistent across pages.

---

## Layout

| Token             | Value      | Purpose                                    |
|-------------------|------------|---------------------------------------------|
| `--max-width`     | `1200px`   | Content container max width                  |
| `--header-height` | `80px`     | Sticky header height (content offset)        |

### Layout Patterns

- **Full-width sections, constrained content.** Sections span the viewport width for background colour/divider effects. Inner content is constrained to `--max-width` and centered with auto margins.
- **Section component** (`Section.tsx`) is the standard layout primitive. Use it for every content block. It accepts `background` (colour variant) and `divider` (angular transition between sections) props.
- **Diagonal dividers** between sections use CSS `clip-path` to create angular transitions — this gives the page its geometric, non-flat flow. Options: `angle-top`, `angle-bottom`, `angle-both`, `none`.
- **Responsive behaviour** targets three breakpoints conceptually: mobile (375px), tablet (768px), desktop (1440px). Use `clamp()` for fluid values where possible rather than hard breakpoints.

---

## Components

### Button (`Button.tsx`)

The primary interactive element. Three variants, three sizes.

**Variants:**
- `primary` — Filled with `--color-accent-2`. The default CTA style. Bold, unmissable.
- `secondary` — Filled with `--color-accent-1`. For secondary actions.
- `outline` — Transparent with a border. For tertiary actions or when a filled button would be too heavy.

**Sizes:** `sm`, `md` (default), `lg`

**Renders as** `<a>` when `href` is provided, `<button>` otherwise.

### Section (`Section.tsx`)

Full-width section wrapper with optional background variant and angular dividers.

**Props:**
- `background`: `'default'` | `'alt'` | `'surface'` | `'accent-1'` | `'accent-2'`
- `divider`: `'angle-top'` | `'angle-bottom'` | `'angle-both'` | `'none'`
- `id`: optional anchor ID
- `className`: optional additional classes

### CTABand (`CTABand.tsx`)

Full-width call-to-action strip in `--color-accent-2` with white text. Used at the bottom of every page to drive toward `/contact/`. Includes a geometric triangle pattern background at low opacity.

### PricingCard (`PricingCard.tsx`)

Tiered pricing display card. The `highlighted` prop adds accent-2 border and a "Most Popular" badge. Cards stack vertically on mobile, sit side-by-side on desktop.

### FAQ (`FAQ.tsx`)

Click-to-expand accordion. Angular styling — no rounded corners on the expand/collapse regions.

### CoachProfile (`CoachProfile.tsx`)

Coach bio card with circular photo frame (accent-coloured ring border), name, location, credentials, and bio text.

### ContactForm (`ContactForm.tsx`)

Lead-generation form with qualifying fields: Name, Email, Phone, training interest dropdown, goals textarea, referral source dropdown. Submits to a Formspree endpoint.

---

## Animation

All shared keyframes are defined in `src/styles/animations.css`.

| Animation   | Purpose                                    | Implementation                              |
|-------------|--------------------------------------------|---------------------------------------------|
| `marquee`   | Hero silhouette horizontal scroll           | `translateX(0)` to `translateX(-50%)`, infinite loop. Content is duplicated for seamless wrap. |
| `fadeInUp`   | Scroll-triggered section entrance          | `opacity: 0; translateY(40px)` to `opacity: 1; translateY(0)`. Triggered by `useInView` hook (IntersectionObserver). |
| `countUp`   | Stats number entrance                       | `opacity: 0; scale(0.8)` to `opacity: 1; scale(1)`. |
| `pulse`     | Subtle attention pulse                      | Opacity oscillates between `1` and `0.7`.   |

### Animation Rules

- All animations are CSS-only — no animation libraries.
- Scroll-triggered animations use the `useInView` custom hook wrapping `IntersectionObserver`.
- The hero marquee is pure CSS (`@keyframes` + `animation`), not JavaScript-driven.
- Prefer `transform` and `opacity` for animations (GPU-composited, no layout thrashing).
- Keep durations subtle: entrance animations ~0.6s, marquee continuous, pulse ~2s.

---

## Theming

The theme system uses a `data-theme` attribute on the `<html>` element.

### How It Works

1. `ThemeSwitcher.tsx` renders colour-swatch circles (one per theme).
2. Clicking a swatch sets `document.documentElement.dataset.theme` and saves the choice to `localStorage`.
3. An inline `<script>` in each HTML entry file reads `localStorage` and applies the theme **before React hydrates**, preventing a flash of the default palette.
4. CSS rules in `themes.css` (e.g., `[data-theme="warm"]`) override only `--color-accent-1` and `--color-accent-2`.

### Adding a New Theme

1. Add a new rule block in `src/styles/themes.css` with a unique `data-theme` value.
2. Define `--color-accent-1` and `--color-accent-2` — these are the only two variables that change.
3. Add the new swatch to `ThemeSwitcher.tsx`.
4. Verify contrast: text on accent backgrounds must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

---

## Iconography and Decorative Elements

- **Triangle motifs** are the primary decorative element — derived from the three interlocking triangles in the logo (swim, bike, run). Used as geometric dividers, step-number containers, favicon shape, and background patterns.
- **Athlete silhouettes** in the hero marquee are simple, angular SVG illustrations (swimmer, cyclist, runner) in Bauhaus style. Located in `src/assets/silhouettes/`.
- **Splatter/paint-stroke accents** (inspired by the Endurance Punks aesthetic) are used very sparingly — as subtle background textures on hover states or decorative corner elements. The Bauhaus restraint keeps them from dominating.

---

## Accessibility

- Lighthouse Accessibility target: **95+** (currently scoring 95).
- One `<h1>` per page, logical `<h2>`/`<h3>` hierarchy — no heading level skips.
- All images require descriptive `alt` attributes.
- Below-fold images use `loading="lazy"`.
- Colour contrast must meet WCAG AA on all text. When placing text on accent-coloured backgrounds, use `--color-text-on-accent` or `#fff` and verify contrast ratios.
- Form inputs must have associated `<label>` elements.
- Interactive elements must be keyboard-accessible.

---

## File Structure Reference

```
src/
├── styles/
│   ├── reset.css          Modern CSS reset
│   ├── variables.css      CSS custom properties (colours, type, spacing, layout)
│   ├── themes.css         Alternate colour theme definitions
│   ├── global.css         Base typography, imports all other stylesheets
│   └── animations.css     Shared @keyframes
├── components/
│   ├── Layout.tsx         Shared header + footer wrapper
│   ├── Header.tsx         Sticky nav, logo, CTA button
│   ├── Footer.tsx         Sitemap, social links, legal
│   ├── Button.tsx         Primary/secondary/outline CTA
│   ├── Section.tsx        Full-width section with angular dividers
│   ├── ThemeSwitcher.tsx  Colour palette toggle
│   ├── Hero.tsx           Hero with silhouette marquee
│   ├── HowItWorks.tsx     Three-step process cards
│   ├── Stats.tsx          Animated stat counters
│   ├── Testimonials.tsx   Testimonial card grid
│   ├── CTABand.tsx        Full-width CTA strip
│   ├── WhyTrilogy.tsx     Value proposition section
│   ├── CoachProfile.tsx   Coach bio card
│   ├── PricingCard.tsx    Tiered pricing display
│   ├── FAQ.tsx            Accordion FAQ
│   └── ContactForm.tsx    Lead-generation form
├── hooks/
│   └── useInView.ts       IntersectionObserver hook for scroll animations
├── assets/
│   └── silhouettes/       SVG athlete silhouettes (swimmer, cyclist, runner)
└── pages/
    ├── Home.tsx
    ├── About.tsx
    ├── Plans.tsx
    └── Contact.tsx
```

---

## Quick Reference: Do / Don't

| Do | Don't |
|----|-------|
| Use CSS custom properties for all colours | Hardcode hex values in component styles |
| Use the spacing scale tokens | Use arbitrary margin/padding values |
| Use `Section.tsx` for page sections | Create raw `<section>` elements with custom wrappers |
| Use `Button.tsx` for all CTAs | Style `<a>` or `<button>` elements ad-hoc |
| Use `clamp()` for fluid responsive sizing | Write media query breakpoints for font sizes |
| Use `transform`/`opacity` for animation | Animate `width`, `height`, `top`, `left` |
| End every page with a CTA driving to `/contact/` | Leave a page without a clear next action |
| Use angular/geometric shapes | Use rounded corners or soft, organic shapes |
| Keep splatter accents minimal and controlled | Overuse punk/splatter elements |
| Check contrast when placing text on accent fills | Assume accent colours are readable as backgrounds |
