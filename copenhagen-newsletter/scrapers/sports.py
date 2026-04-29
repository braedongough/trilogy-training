"""Sports: FC Copenhagen home fixtures + Copenhagen Marathon."""
from __future__ import annotations

import logging
import re
from datetime import datetime

from config import SOURCES, Week
from .base import Item, get

log = logging.getLogger("scrapers.sports")


def _scrape_fck(week: Week) -> list[Item]:
    soup = get(SOURCES["fck_calendar"])
    if soup is None:
        return []
    out: list[Item] = []
    for row in soup.select(".calendar-row, .match-row, li.match"):
        time_tag = row.find("time")
        if not time_tag or not time_tag.get("datetime"):
            continue
        try:
            when = datetime.fromisoformat(time_tag["datetime"][:10]).date()
        except ValueError:
            continue
        if not week.contains(when):
            continue
        text = re.sub(r"\s+", " ", row.get_text(" ", strip=True))
        is_home = "parken" in text.lower() or "(h)" in text.lower()
        if not is_home:
            continue
        out.append(Item(
            category="sport",
            title=text[:160],
            when=when,
            date_label=when.strftime("%a %-d %b"),
            venue="Parken",
            url=SOURCES["fck_calendar"],
            source="fck",
        ))
    return out


def _scrape_marathon(week: Week) -> list[Item]:
    soup = get(SOURCES["copenhagen_marathon"])
    if soup is None:
        return []
    text = soup.get_text(" ", strip=True).lower()
    # The marathon page advertises the race date prominently.
    m = re.search(r"(\d{1,2})\s+may\s+(\d{4})", text)
    if not m:
        return []
    try:
        when = datetime(int(m.group(2)), 5, int(m.group(1))).date()
    except ValueError:
        return []
    if not week.contains(when):
        return []
    return [Item(
        category="sport",
        title="Copenhagen Marathon",
        when=when,
        date_label=when.strftime("%a %-d %b") + ", start 09:30",
        venue="Start at Østre Allé / Fælledparken",
        description="42.2 km loop through Indre By, Østerbro, Christianshavn, Vesterbro, Nørrebro and Frederiksberg.",
        url=SOURCES["copenhagen_marathon"],
        source="copenhagen-marathon",
    )]


def scrape(week: Week) -> list[Item]:
    items = _scrape_fck(week) + _scrape_marathon(week)
    log.info("sports: %d items", len(items))
    return items
