# Pre-Launch TODOs

Items that must be resolved before deploying to production.

## Critical

- [ ] **Formspree endpoint** — Replace placeholder form ID with a real one.
  `src/components/ContactForm.tsx:37` → `https://formspree.io/f/placeholder`
  Create a free form at https://formspree.io and swap in the real ID.

## High Priority

- [ ] **WhatsApp numbers** — Replace masked phone numbers with real ones.
  `src/pages/Contact.tsx:30` → `https://wa.me/41XXXXXXXXXX` (Adam, Switzerland)
  `src/pages/Contact.tsx:43` → `https://wa.me/34XXXXXXXXXX` (Cameron, Spain)

## Legal / Compliance

- [ ] **Privacy Policy page** — Currently links to `#`.
  `src/components/Footer.tsx:69`

- [ ] **Terms page** — Currently links to `#`.
  `src/components/Footer.tsx:70`

## Nice to Have

- [ ] **Newsletter signup** — Footer form currently does nothing (`e.preventDefault()`).
  `src/components/Footer.tsx:52` — Integrate with an email service (Mailchimp, ConvertKit, etc.) or remove.
