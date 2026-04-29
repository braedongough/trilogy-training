"""Markets: weekend flea markets and one-off markets like Bella Center.

Layered: curated recurring fixtures (always emitted) + best-effort
scrape of Bella Center one-offs.
"""
from __future__ import annotations

import logging
from datetime import date, timedelta

from config import SOURCES, Week
from data.recurring import RECURRING_MARKETS, in_season

from .base import Item, get

log = logging.getLogger("scrapers.markets")


def _recurring_for_week(week: Week) -> list[Item]:
    out: list[Item] = []
    for m in RECURRING_MARKETS:
        # Find the actual date of this weekday inside the week.
        offset = (m["weekday"] - week.monday.weekday()) % 7
        d = week.monday + timedelta(days=offset)
        if not week.contains(d):
            continue
        if not in_season(m["season"], d):
            continue
        out.append(Item(
            category="market",
            title=m["title"],
            when=d,
            date_label=f"{d.strftime('%a %-d %b')}, {m['time']}",
            venue=m["address"],
            description=m["description"],
            url=m["url"],
            source="curated:recurring",
            tags=("recurring",),
        ))
    return out


def _scrape_bella(week: Week) -> list[Item]:
    soup = get(SOURCES["bella_flea"])
    if soup is None:
        return []
    out: list[Item] = []
    # Bella's site lists upcoming dates as <time datetime="YYYY-MM-DD">.
    for t in soup.find_all("time"):
        when_str = t.get("datetime", "")[:10]
        try:
            when = date.fromisoformat(when_str)
        except ValueError:
            continue
        if not week.contains(when):
            continue
        out.append(Item(
            category="market",
            title="Loppemarked i Bella Center",
            when=when,
            date_label=when.strftime("%a %-d %b") + ", 09:00–16:00",
            venue="Bella Center, Center Boulevard 5",
            description="Northern Europe's largest indoor flea market — hundreds of stalls under one roof.",
            url=SOURCES["bella_flea"],
            source="bella",
        ))
    return out


def scrape(week: Week) -> list[Item]:
    items = _recurring_for_week(week) + _scrape_bella(week)
    log.info("markets: %d items", len(items))
    return items
