# Rebuild Plans & Pricing Page

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. This document must be maintained in accordance with `.agents/PLANS.md`.

## Purpose / Big Picture

The current Plans & Pricing page presents three tiered coaching plans (Foundation €99, Performance €199, Elite €349) with a feature comparison table. This does not reflect how the business actually works. Adam does not sell tiered packages — coaching is tailored to each client based on their needs and level of engagement. The page needs to be rebuilt to reflect two simple pricing points (single-discipline and multi-discipline coaching), funnel visitors toward the contact page for a consultation, and offer a link to TrainingPeaks for athletes who want pre-made off-the-shelf plans instead.

After this change, a visitor landing on the Plans page will immediately understand the two coaching options and their prices, be able to toggle between CHF and EUR display, find a link to browse pre-made TrainingPeaks plans, and be guided toward booking a free consultation via the contact page.

## Progress

- [ ] Rewrite `src/pages/Plans.tsx` with new page structure
- [ ] Rewrite `src/pages/Plans.css` with styles for new layout
- [ ] Update FAQ content in `src/components/FAQ.tsx` to remove tier-specific questions
- [ ] Remove or repurpose `src/components/PricingCard.tsx` and `src/components/PricingCard.css`
- [ ] Verify build passes and visually inspect

## Surprises & Discoveries

(None yet.)

## Decision Log

- Decision: Use 75 EUR and 105 EUR as the euro equivalents of 70 CHF and 100 CHF.
  Rationale: Current rate is approximately 1 CHF = 1.06 EUR. 70 × 1.06 ≈ 74 → 75 EUR (round to nearest 5). 100 × 1.06 ≈ 106 → 105 EUR (round to nearest 5). These are clean numbers that feel deliberate rather than calculated.
  Date: 2026-03-21

- Decision: Keep the FAQ component but update its content to remove references to tiered plans and switching between tiers.
  Rationale: The FAQ is a well-built accordion component with good UX. The questions about pausing coaching, beginners, consultations, and race-specific training are still relevant. Only the tier-specific ones need updating.
  Date: 2026-03-21

- Decision: Replace the PricingCards component inline in Plans.tsx rather than rewriting the PricingCard component, since the new layout (two simple cards side by side) is structurally different from three tiered cards with feature lists.
  Rationale: The old component is built around a `Tier` type with feature arrays, badges, and featured flags. The new design is simpler — two cards with a price, short description, and a CTA. Writing this directly in Plans.tsx with plans-specific CSS is cleaner than bending the old component.
  Date: 2026-03-21

## Outcomes & Retrospective

(To be completed after implementation.)

## Context and Orientation

The Plans page is at `src/pages/Plans.tsx` with styles in `src/pages/Plans.css`. It currently renders four sections: a compact page header (recently updated), a `PricingCards` component showing three tier cards, a feature comparison table, and an FAQ accordion followed by a CTA band.

The `PricingCards` component (`src/components/PricingCard.tsx`) renders three cards in a grid using the `Section` and `Button` components. The `FAQ` component (`src/components/FAQ.tsx`) is a standalone accordion with six questions. The `CTABand` component (`src/components/CTABand.tsx`) renders a full-width accent-2 banner with a headline, subtitle, and button.

The `Button` component (`src/components/Button.tsx`) supports `primary`, `secondary`, and `outline` variants and `sm`, `md`, `lg` sizes. It renders as an `<a>` tag when given an `href` prop.

The `Section` component (`src/components/Section.tsx`) wraps content with consistent padding and supports background colours and angled dividers via CSS classes.

The design system (`.agents/design-system.md`) specifies a dark-first aesthetic with angular/triangular motifs, accent-1 (cyan) for informational emphasis, and accent-2 (pink) for CTAs. The font system uses Space Grotesk for headings, Inter for body, and Space Mono for accent/label text.

## Plan of Work

The page will be restructured into these sections, top to bottom:

**1. Page header** (keep as-is, already compact). Update the subtitle to reflect the new messaging — coaching is tailored, not tiered.

**2. Coaching pricing section.** Two cards side by side: "Single Discipline" (swim, bike, or run) at 70 CHF / 75 EUR per month, and "Multi-Discipline" (triathlon / multiple sports) at 100 CHF / 105 EUR per month. Above the cards, a small CHF/EUR toggle. Each card gets a short description, the price, and a "Get in Touch" button linking to `/contact/`. Cards use the existing angular clip-path pattern and accent-1 border on hover to match the site's design language. No feature comparison lists — this is simple and clean.

The currency toggle is a small pill-shaped control with two segments (CHF | EUR). It uses React `useState` to track the selected currency and conditionally renders the appropriate price. The toggle itself uses accent-1 for the active segment.

**3. Pre-made plans section.** A single section with surface background and angle-top divider. Brief copy explaining that for athletes who prefer ready-made training plans, Adam has a library on TrainingPeaks. A button links out to `https://www.trainingpeaks.com/my-training-plans/trilogytraining` (opens in new tab). This uses an outline button variant.

**4. FAQ section.** Keep the existing FAQ component but update two questions: remove the "Can I switch plans?" question (no longer relevant), and update "Can I pause my coaching?" to not reference "subscription". Keep the remaining questions as they are relevant.

**5. CTA band.** Keep the existing CTABand component, update the headline and subtitle to focus on getting in touch to discuss tailored coaching.

**What gets removed:** The entire feature comparison table (the `compare` section and its CSS), the `PricingCards` component import. The `PricingCard.tsx` and `PricingCard.css` files can be deleted since they are no longer used anywhere.

## Concrete Steps

All commands run from the repository root `/Users/braedongough/code/trilogy-training`.

1. Rewrite `src/pages/Plans.tsx` with the new page structure described above.
2. Rewrite `src/pages/Plans.css` removing all comparison table styles and adding styles for the new pricing cards, currency toggle, and pre-made plans section.
3. Edit `src/components/FAQ.tsx` to update question content.
4. Delete `src/components/PricingCard.tsx` and `src/components/PricingCard.css`.
5. Run `npm run build` to verify TypeScript compilation and production build.
6. Run `npm run dev` and visually inspect in browser.

## Validation and Acceptance

After running `npm run build`, the build should complete with zero errors. The Plans page at `/plans/` should show: a compact header, two pricing cards with a working CHF/EUR toggle, a TrainingPeaks pre-made plans section, the FAQ accordion, and a CTA band. Clicking the currency toggle should swap all displayed prices. All buttons should link to `/contact/` except the TrainingPeaks button which opens in a new tab.

## Idempotence and Recovery

All changes are file edits and deletions within the source tree. Running the steps multiple times produces the same result. If something goes wrong, `git checkout -- src/pages/Plans.tsx src/pages/Plans.css src/components/FAQ.tsx src/components/PricingCard.tsx src/components/PricingCard.css` restores the originals.

## Interfaces and Dependencies

No new dependencies. The page uses existing components:

- `Section` from `src/components/Section.tsx` — for layout sections
- `Button` from `src/components/Button.tsx` — for CTA buttons (primary variant for main CTAs, outline for TrainingPeaks link)
- `FAQ` from `src/components/FAQ.tsx` — accordion component (content updated)
- `CTABand` from `src/components/CTABand.tsx` — bottom CTA band
- React `useState` for currency toggle state

New types/interfaces in Plans.tsx:

    type Currency = 'CHF' | 'EUR'

    const prices = {
      single: { CHF: 70, EUR: 75 },
      multi: { CHF: 100, EUR: 105 },
    }
