"""Concert scraper.

Tries Songkick + Bandsintown + venue program pages. All four are
behind anti-bot protection in many networks; when blocked we still
return whatever we managed to parse, plus an empty list (the formatter
copes with no concerts).
"""
from __future__ import annotations

import logging
import re
from datetime import date, datetime
from typing import Iterable

from config import SOURCES, Week
from .base import Item, get

log = logging.getLogger("scrapers.concerts")

VENUE_PAGES = [
    ("VEGA", SOURCES["vega"]),
    ("Pumpehuset", SOURCES["pumpehuset"]),
    ("Royal Arena", SOURCES["royal_arena"]),
    ("DR Koncerthuset", SOURCES["dr_koncerthuset"]),
]


def _parse_event_jsonld(soup, venue_name: str) -> Iterable[Item]:
    """Most modern venue sites embed schema.org Event JSON-LD. Use it if present."""
    import json
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string or "")
        except (ValueError, TypeError):
            continue
        for entry in data if isinstance(data, list) else [data]:
            if not isinstance(entry, dict):
                continue
            if entry.get("@type") not in ("Event", "MusicEvent", "Concert"):
                continue
            name = entry.get("name") or ""
            start = entry.get("startDate") or ""
            try:
                when = datetime.fromisoformat(start.replace("Z", "+00:00")).date()
            except ValueError:
                continue
            yield Item(
                category="concert",
                title=name,
                when=when,
                date_label=when.strftime("%a %-d %b"),
                venue=venue_name,
                url=entry.get("url", ""),
                source=f"venue:{venue_name}",
            )


def _scrape_venue(venue_name: str, url: str, week: Week) -> list[Item]:
    soup = get(url)
    if soup is None:
        log.info("Skipping %s (unreachable)", venue_name)
        return []
    items = list(_parse_event_jsonld(soup, venue_name))
    return [i for i in items if i.when and week.contains(i.when)]


def _scrape_songkick(week: Week) -> list[Item]:
    soup = get(SOURCES["songkick_metro"])
    if soup is None:
        return []
    out: list[Item] = []
    # Songkick structures events as <li class="event-listings-element">
    for li in soup.select("li.event-listings-element"):
        time_tag = li.find("time")
        if not time_tag or not time_tag.get("datetime"):
            continue
        try:
            when = datetime.fromisoformat(time_tag["datetime"][:10]).date()
        except ValueError:
            continue
        if not week.contains(when):
            continue
        title = (li.select_one(".event-listing-title") or li).get_text(" ", strip=True)
        venue_el = li.select_one(".event-listing-venue")
        venue = venue_el.get_text(" ", strip=True) if venue_el else ""
        link = li.find("a", href=True)
        out.append(Item(
            category="concert",
            title=re.sub(r"\s+", " ", title)[:200],
            when=when,
            date_label=when.strftime("%a %-d %b"),
            venue=venue,
            url=("https://www.songkick.com" + link["href"]) if link else "",
            source="songkick",
        ))
    return out


def scrape(week: Week) -> list[Item]:
    items: list[Item] = []
    items.extend(_scrape_songkick(week))
    for name, url in VENUE_PAGES:
        items.extend(_scrape_venue(name, url, week))
    log.info("concerts: %d items", len(items))
    return items
