"""City events: VisitCopenhagen, MyGuide, marathon page."""
from __future__ import annotations

import logging
import re
from datetime import datetime

from config import SOURCES, Week
from .base import Item, get

log = logging.getLogger("scrapers.events")


def _scrape_jsonld_events(url: str, source_name: str, week: Week) -> list[Item]:
    """Generic JSON-LD Event extractor."""
    import json
    soup = get(url)
    if soup is None:
        return []
    out: list[Item] = []
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string or "")
        except (ValueError, TypeError):
            continue
        for entry in data if isinstance(data, list) else [data]:
            if not isinstance(entry, dict):
                continue
            if entry.get("@type") not in ("Event", "Festival", "ExhibitionEvent"):
                continue
            try:
                when = datetime.fromisoformat(
                    str(entry.get("startDate", ""))[:10]
                ).date()
            except ValueError:
                continue
            if not week.contains(when):
                continue
            location = entry.get("location") or {}
            venue = location.get("name", "") if isinstance(location, dict) else ""
            out.append(Item(
                category="event",
                title=str(entry.get("name", "")).strip()[:200],
                when=when,
                date_label=when.strftime("%a %-d %b"),
                venue=venue,
                description=re.sub(r"\s+", " ", str(entry.get("description", "")))[:240],
                url=str(entry.get("url", "")),
                source=source_name,
            ))
    return out


def scrape(week: Week) -> list[Item]:
    items: list[Item] = []
    items.extend(_scrape_jsonld_events(
        SOURCES["visitcopenhagen_whats_on"], "visitcopenhagen", week
    ))
    items.extend(_scrape_jsonld_events(
        SOURCES["myguide_may_2026"], "myguidecopenhagen", week
    ))
    log.info("events: %d items", len(items))
    return items
