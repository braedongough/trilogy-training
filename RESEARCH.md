# Trilogy Training - Full Website Audit

**Audit Date:** 2026-03-20
**URL:** https://www.trilogy-training.com/
**Platform:** Wix.com Website Builder
**Business:** Personalised performance coaching for endurance athletes (triathlon, swimming, cycling, running)
**Coaches:** Adam Labbett (Switzerland) & Cameron Keast (Spain)

---

## 1. Site Structure & Pages

| Page | URL | Title |
|------|-----|-------|
| Home | `/` | Home \| Trilogy Training |
| About | `/about` | About \| Simplicity Triathlon Coaching |
| Plans & Pricing | `/plans-pricing-1` | Plans & Pricing \| Trilogy Training |
| Training Camps | `/training-camps` | Training Camps \| Trilogy Training |
| Contact | `/contact` | Contact \| Simplicity Triathlon Coaching |
| Shop | External: owayo.ie | N/A |
| Training Plans | External: trainingpeaks.com | N/A |

### Issues Found:
- **Inconsistent branding in page titles**: About and Contact pages say "Simplicity Triathlon Coaching" instead of "Trilogy Training" - this is a critical branding/SEO issue
- **Slug `-1` on pricing page** (`/plans-pricing-1`) looks unprofessional and hurts SEO
- Only 5 internal pages - very thin site for SEO authority
- Two key revenue pages (Shop, Training Plans) link externally with no way to return

---

## 2. Lighthouse Scores

### Desktop
| Category | Score |
|----------|-------|
| Accessibility | 96/100 |
| Best Practices | 100/100 |
| SEO | 92/100 |

### Mobile
| Category | Score |
|----------|-------|
| Accessibility | 96/100 |
| Best Practices | 100/100 |
| SEO | 92/100 |

### Failed Audits (2):
- Missing meta description on some pages
- Image alt text issues

---

## 3. SEO Issues (Critical)

### Meta & Technical SEO
- **No meta descriptions** on any page - massive missed opportunity for click-through rates
- **No H1, H2, H3 tags on ANY page** - headings are rendered as images or styled paragraphs, completely invisible to search engines
- **Viewport meta is `width=320`** on homepage (should be `width=device-width`) - though the evaluate script returned a different value, the initial meta scrape showed `width=320, user-scalable=yes`
- **No hreflang tags** despite targeting international clients (Switzerland, Spain, Europe)
- **No sitemap** visible in page source
- **Generic favicon** - using Wix default `pfavico.ico` instead of brand favicon
- **Structured data is minimal** - only basic WebSite schema, missing LocalBusiness, SportsActivityLocation, Person schemas for the coaches
- **No Open Graph description or image** - social shares will look bare
- **No Twitter description or image**

### Content SEO
- Zero blog/content strategy - no articles targeting keywords like "triathlon coaching", "ironman training plan", "endurance coaching"
- Page titles are generic ("Home | Trilogy Training") - should be keyword-rich
- All body text is thin - homepage has ~200 words of actual content
- No location-based SEO despite operating in Switzerland, Spain, and serving expats
- No keyword targeting visible for any high-intent search terms

### Keyword Opportunities (Missing)
- "triathlon coach online"
- "ironman certified coach"
- "personalised triathlon training plan"
- "endurance coaching Switzerland"
- "triathlon training camp Spain"
- "age group triathlon coaching"
- "expat triathlon coach Europe"

---

## 4. Design & UX Issues (Critical)

### Visual Design
- **Looks like a 2015 template site** - dark grey/black backgrounds, basic layout, no modern design language
- **Header text ("TRILOGY TRAINING") is an image**, not actual text - terrible for SEO and accessibility
- **"PERSONALISED PERFORMANCE COACHING FOR ENDURANCE ATHLETES" is also an image**
- **Section headers ("TESTIMONIALS", "GET IN TOUCH", "PLANS & PRICING") are all images** not text
- **Grunge/paint-stroke borders** feel dated and unprofessional
- **No clear visual hierarchy** - everything blends together
- **Color palette is limited**: cyan/turquoise on dark grey with no accent colors or depth
- **Typography is inconsistent** - mix of image-based text and body text in different sizes
- **No whitespace/breathing room** - content feels cramped
- **No hero section with a clear CTA** - homepage opens with a wall of text next to a photo
- **Footer is barren** - just social icons, no useful links or info

### Layout Issues
- Homepage is essentially 3 sections stacked: text block, testimonial slider, contact section
- No visual breaks, cards, grids, or modern layout patterns
- About page is a massive wall of center-aligned text - no visual relief
- Plans & Pricing page has NO pricing - just a bullet list of features with "contact us for pricing"
- Training Camps page is nearly empty - just 3 sentences
- Contact page has text cut off on the left side (visible in screenshot)

### Mobile Experience
- No visible mobile-optimized navigation (hamburger menu not evaluated but Wix usually provides one)
- Images are not optimized for mobile viewports
- Long text blocks will be painful on mobile

---

## 5. Accessibility Issues

### Good:
- Skip to main content button exists
- Social media images have alt text
- Lighthouse score of 96 is respectable

### Problems:
- **4 images missing alt text** including the header logo text image, and other decorative/brand images
- **Instagram link labeled as "LinkedIn"** in the accessibility tree - wrong label, confusing for screen readers
- **Headings are images** - screen readers can't parse the page structure
- **No ARIA landmarks** beyond what Wix auto-generates
- **Low contrast** on some dark-on-dark text areas

---

## 6. Performance & Technical

### Page Weight
- **Total transfer size: ~258 KB** (relatively light, thanks to Wix CDN)
- **96 script tags loaded** - extremely heavy JavaScript payload from Wix runtime
- **20 stylesheets** loaded via CSS Object Model
- **12 images** on homepage

### Performance Metrics
- TTFB: 63ms (good)
- DOM Interactive: 153ms (good - but this is cached/CDN)
- DOM Content Loaded: 157ms
- Load Complete: 180ms

### Technical Concerns
- **Built on Wix** - severely limits customization, page speed optimization, and SEO control
- **No control over JavaScript bundle** - Wix loads massive React runtime + editor-elements-library regardless of page complexity
- **Images served via Wix CDN** with AVIF format (good) but with non-descriptive filenames (bad for SEO)
- **No lazy loading control** on images
- **No service worker or PWA capabilities**
- **core-js-bundle@3.2.1 polyfill** loaded (outdated, from 2019)
- **Sentry error tracking** loaded (7.120.3) - adds bundle weight
- **Visitor analytics script** loaded - additional third-party weight

---

## 7. Content & Copy Issues

### Homepage
- Opens with "WE PROVIDE OUR ATHLETES WITH THE TOOLS TO ACHIEVE THEIR GOALS" - generic, not compelling
- Body copy is decent but reads like a brochure, not a conversion-optimized landing page
- No clear call-to-action (CTA) - no "Book a Free Consultation" button
- Testimonials are in a slider (low engagement pattern) and only show one at a time
- No results/stats/achievements highlighted prominently
- No social proof beyond testimonials (no athlete count, race results, etc.)

### About Page
- Massive wall of text with no visual breaks
- Great content about coaches' credentials buried in paragraphs
- No individual coach profile cards
- No certifications/badges displayed prominently (IRONMAN Certified Coach badge is tiny, at bottom)
- References "Simplicity Triathlon Coaching" in the page title - is this an old brand name?

### Plans & Pricing Page
- **No actual prices shown** - huge conversion killer
- Just a bullet list of features
- No tiered pricing comparison (Bronze/Silver/Gold or similar)
- No CTA buttons
- URL has `-1` suffix suggesting it was duplicated in Wix

### Training Camps Page
- Essentially an empty page with "no spaces available"
- Wastes a page that could be used for SEO (past camp galleries, testimonials, location info)

### Contact Page
- Text is clipped/cut off on the left side
- Uses a generic Wix form
- Gmail address (labbett.coaching@gmail.com) looks unprofessional - should use @trilogy-training.com
- WhatsApp numbers listed but no click-to-chat links

---

## 8. Brand & Trust Issues

- **Gmail email address** instead of branded domain email
- **Wix default favicon** instead of Trilogy Training logo
- **No SSL certificate badge** or trust signals
- **No privacy policy or terms of service** pages
- **"Simplicity Triathlon Coaching"** appears in 2 page titles - brand confusion
- **Twitter link goes to twitter.com** (now X) - may be outdated/inactive
- **No Google My Business integration**
- **No reviews from Google, Trustpilot, or similar**
- **IRONMAN Certified Coach badge** is buried at the very bottom
- **No photos of actual coaching sessions** - just one photo of what appears to be race day

---

## 9. Conversion Optimization Issues

- **No clear primary CTA anywhere** ("Book Free Consultation" should be prominent)
- **No lead magnet** (free training plan, guide, etc.)
- **No pricing transparency** - forces users to email for prices (massive drop-off point)
- **No urgency or scarcity** elements
- **No athlete transformation stories** or before/after results
- **No FAQ section** addressing common objections
- **No "How It Works" section** explaining the coaching process
- **No video content** - video converts significantly better for coaching businesses
- **Contact form is basic** - no qualifying questions, no phone field, no dropdown for "How did you hear about us?"

---

## 10. Competitor Benchmark

For a triathlon coaching business to look like a $1M design agency built it, it needs:

### Must-Have Design Elements
- [ ] Full-width hero with dynamic imagery and bold headline
- [ ] Smooth scroll animations and micro-interactions
- [ ] Coach profile cards with credentials, certifications, race photos
- [ ] Tiered pricing cards with clear CTAs
- [ ] Results/stats section (athletes coached, races completed, PBs smashed)
- [ ] Testimonial grid or masonry layout (not a slider)
- [ ] Training camp gallery with location imagery
- [ ] Blog/resources section for SEO authority
- [ ] Mobile-first responsive design
- [ ] Custom branded email and favicon
- [ ] Video embed (coach intro or athlete testimonials)
- [ ] Sticky header with prominent CTA button
- [ ] Footer with sitemap, legal links, newsletter signup

### Must-Have Technical Elements
- [ ] Custom domain email (@trilogy-training.com)
- [ ] Proper semantic HTML (H1-H6 hierarchy)
- [ ] Meta descriptions on every page
- [ ] Open Graph images for social sharing
- [ ] Structured data (LocalBusiness, Person, Service schemas)
- [ ] XML sitemap
- [ ] Blog for content marketing/SEO
- [ ] Page speed optimization (< 2s load)
- [ ] Privacy policy & terms pages
- [ ] Cookie consent banner (required for EU - Switzerland & Spain)
- [ ] Google Analytics 4 properly configured
- [ ] Custom 404 page

---

## 11. Summary of Critical Issues

| Priority | Issue | Impact |
|----------|-------|--------|
| P0 | Built on Wix - limits everything | Blocks advanced SEO, performance, customization |
| P0 | No H1-H6 tags anywhere (headings are images) | Search engines can't understand page structure |
| P0 | Inconsistent branding ("Simplicity Triathlon Coaching" vs "Trilogy Training") | Confuses search engines and users |
| P0 | No meta descriptions | Hurts click-through rates from search results |
| P0 | No pricing shown | Kills conversions - users leave to find transparent competitors |
| P0 | No clear CTA | No conversion funnel exists |
| P1 | Dated visual design (2015-era) | Low trust, high bounce rate |
| P1 | Gmail email address | Unprofessional, low trust |
| P1 | No blog/content strategy | No organic search traffic growth |
| P1 | Training Camps page is empty | Wasted SEO opportunity |
| P1 | No cookie consent (EU requirement) | Legal liability in Switzerland & Spain |
| P1 | Social link mislabeled (Instagram as LinkedIn) | Accessibility violation, confusing |
| P2 | No structured data beyond basic WebSite | Missing rich snippets in search |
| P2 | No hreflang for international targeting | Missing international SEO |
| P2 | Wix default favicon | Looks unprofessional |
| P2 | No video content | Missing engagement opportunity |
| P2 | No FAQ section | Missing long-tail keyword opportunities |

---

## 12. Recommendation

**Rebuild from scratch** using a modern framework (Next.js or Astro) with:
- Custom design system with premium feel
- Server-side rendering for SEO
- Proper semantic HTML and heading hierarchy
- Blog/CMS for content marketing
- Tiered pricing page with actual prices
- Coach profile pages with credentials
- Training camp archive with photo galleries
- Integrated booking/consultation scheduling
- Proper analytics, structured data, and meta tags
- EU-compliant cookie consent
- Branded email integration
- Mobile-first responsive design with animations
