"""Recurring street-food highlights (Reffen, Broens Gadekøkken).

These don't change week-to-week during the season, but they're worth
a one-line mention in the newsletter from spring opening through October.
"""
from __future__ import annotations

import logging

from config import Week
from data.recurring import RECURRING_FOOD, in_season

from .base import Item

log = logging.getLogger("scrapers.food")


def scrape(week: Week) -> list[Item]:
    out: list[Item] = []
    for f in RECURRING_FOOD:
        if not in_season(f["season"], week.monday):
            continue
        out.append(Item(
            category="food",
            title=f["title"],
            when=None,
            date_label="open daily this week",
            venue=f["address"],
            description=f["description"],
            url=f["url"],
            source="curated:recurring",
            tags=("recurring",),
        ))
    log.info("food: %d items", len(out))
    return out
