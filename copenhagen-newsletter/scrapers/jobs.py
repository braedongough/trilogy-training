"""Jobs scraper: The Hub Copenhagen, filtered for 'interesting'.

Heuristic: prefer roles that read as design / engineering / product /
research at small-to-mid Nordic startups. Exclude generic recruiter
agencies and obvious enterprise spam.
"""
from __future__ import annotations

import logging
import re
from datetime import date

from config import SOURCES, Week
from .base import Item, get

log = logging.getLogger("scrapers.jobs")

INTERESTING_KEYWORDS = (
    "design", "designer", "ux", "ui", "product",
    "engineer", "developer", "research", "scientist",
    "founding", "head of", "lead", "principal",
    "ml", "ai", "machine learning", "data",
    "writer", "editor", "journalist", "creative",
    "climate", "energy", "robotics", "biotech",
)
BORING_KEYWORDS = (
    "consultant", "consultancy", "agency", "recruiter",
    "sales development representative", "sdr",
    "account executive", "account manager",
)


def _looks_interesting(title: str, company: str) -> bool:
    t = (title + " " + company).lower()
    if any(b in t for b in BORING_KEYWORDS):
        return False
    return any(k in t for k in INTERESTING_KEYWORDS)


def _parse_thehub(soup) -> list[Item]:
    """The Hub renders job cards as <a href="/jobs/..."> with role + company."""
    out: list[Item] = []
    for a in soup.select('a[href^="/jobs/"]'):
        href = a.get("href", "")
        if href in ("/jobs/", "/jobs"):
            continue
        text = a.get_text(" ", strip=True)
        text = re.sub(r"\s+", " ", text)
        if len(text) < 8 or len(text) > 200:
            continue
        # Heuristic split: most cards are "<Role> <Company> Copenhagen ..."
        title = text.split(" · ")[0] if " · " in text else text.split("  ")[0]
        company_match = re.search(r"\bat\s+([A-Z][\w&\- ]+)", text)
        company = company_match.group(1) if company_match else ""
        if not _looks_interesting(title, company):
            continue
        out.append(Item(
            category="job",
            title=title.strip()[:120],
            when=None,
            date_label="open now",
            venue=company.strip()[:80] or "Copenhagen startup",
            description="",
            url="https://thehub.io" + href,
            source="thehub",
        ))
    return out[:8]


def scrape(week: Week) -> list[Item]:
    soup = get(SOURCES["thehub_cph"])
    if soup is None:
        log.info("The Hub unreachable; emitting no jobs this run")
        return []
    items = _parse_thehub(soup)
    log.info("jobs: %d items", len(items))
    return items
