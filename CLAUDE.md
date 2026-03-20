# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is for the **Trilogy Training** website rebuild (https://www.trilogy-training.com/) — replacing the existing Wix site with a modern, custom-built application. It currently contains audit artifacts from the original site; application source code will be added as the rebuild progresses.

**Business context:** Personalised performance coaching for endurance athletes (triathlon, swimming, cycling, running), run by Adam Labbett (Switzerland) and Cameron Keast (Spain).

## Repository Structure

### Audit artifacts (from the existing Wix site)
- `RESEARCH.md` — Comprehensive website audit covering SEO, design/UX, accessibility, performance, content, and conversion issues
- `lighthouse/` — Desktop Lighthouse report (HTML + JSON)
- `lighthouse-mobile/` — Mobile Lighthouse report (HTML + JSON)
- `screenshots/` — Full-page screenshots of all site pages (homepage, about, contact, plans-pricing, training-camps)
- `snapshots/` — Accessibility tree snapshots (homepage)
- `.agents/PLANS.md` — ExecPlan specification document for structured execution plans

## ExecPlan Convention

This project uses a structured "ExecPlan" format defined in `.agents/PLANS.md`. When creating implementation plans:
- Plans must be fully self-contained, novice-guiding, and outcome-focused
- Required living-document sections: Progress, Surprises & Discoveries, Decision Log, Outcomes & Retrospective
- Follow the skeleton and formatting rules in PLANS.md exactly
- Plans are living documents — update them as work proceeds

## Key Audit Findings (from RESEARCH.md)

The audit recommends rebuilding the site from scratch using a modern framework (Next.js or Astro). Critical issues include: no semantic headings (all rendered as images), no meta descriptions, inconsistent branding ("Simplicity Triathlon Coaching" vs "Trilogy Training"), no pricing shown, no clear CTAs, and dated visual design.
