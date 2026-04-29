"""Emit verified per-week curated items from data/weekly_seed.py.

These are layered on top of live scrapes — they're not a substitute,
they're a backstop for the weeks where you've also done five minutes
of manual research.
"""
from __future__ import annotations

import logging
from datetime import date

from config import Week
from data.weekly_seed import SEED_BY_WEEK
from .base import Item

log = logging.getLogger("scrapers.seed")


def scrape(week: Week) -> list[Item]:
    raw = SEED_BY_WEEK.get(week.monday.isoformat(), [])
    out: list[Item] = []
    for entry in raw:
        when_iso = entry.get("when_iso", "")
        try:
            when = date.fromisoformat(when_iso) if when_iso else None
        except ValueError:
            when = None
        date_label = entry.get("date_label_override") or (
            when.strftime("%a %-d %b") if when else ""
        )
        out.append(Item(
            category=entry["category"],
            title=entry["title"],
            when=when,
            date_label=date_label,
            venue=entry.get("venue", ""),
            description=entry.get("description", ""),
            url=entry.get("url", ""),
            source="seed",
            tags=("seed",),
        ))
    log.info("seed: %d items", len(out))
    return out
