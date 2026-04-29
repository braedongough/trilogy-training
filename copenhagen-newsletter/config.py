"""Shared configuration: week math, source URLs, output paths."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).parent
OUTPUT_DIR = ROOT / "output"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
)
REQUEST_TIMEOUT = 15
REQUEST_RETRIES = 2
POLITE_DELAY_SECONDS = 1.0


@dataclass(frozen=True)
class Week:
    monday: date

    @property
    def sunday(self) -> date:
        return self.monday + timedelta(days=6)

    def contains(self, d: date) -> bool:
        return self.monday <= d <= self.sunday

    def label(self) -> str:
        m, s = self.monday, self.sunday
        if m.month == s.month:
            return f"{m.strftime('%a %-d')}–{s.strftime('%-d %B %Y')}"
        return f"{m.strftime('%a %-d %b')}–{s.strftime('%-d %b %Y')}"


def next_week(today: date | None = None) -> Week:
    today = today or date.today()
    days_until_monday = (7 - today.weekday()) % 7
    if days_until_monday == 0:
        days_until_monday = 7
    return Week(today + timedelta(days=days_until_monday))


def parse_week_arg(s: str) -> Week:
    """Accepts a YYYY-MM-DD that should be a Monday."""
    d = datetime.strptime(s, "%Y-%m-%d").date()
    if d.weekday() != 0:
        raise ValueError(f"--week must be a Monday; {d} is {d.strftime('%A')}")
    return Week(d)


# Sources tried by scrapers. Anti-bot blocks are common; scrapers degrade
# gracefully to the curated recurring registry when these fail.
SOURCES = {
    "songkick_metro": "https://www.songkick.com/metro-areas/28617-denmark-copenhagen",
    "bandsintown_cph": "https://www.bandsintown.com/c/copenhagen-denmark",
    "vega": "https://vega.dk/en",
    "pumpehuset": "https://pumpehuset.dk/en/program/",
    "royal_arena": "https://www.royalarena.dk/en/events",
    "dr_koncerthuset": "https://drkoncerthuset.dk/en/",
    "visitcopenhagen_whats_on": "https://www.visitcopenhagen.com/copenhagen/whats-on",
    "myguide_may_2026": "https://www.myguidecopenhagen.com/events/may-2026",
    "kultunaut_en": "https://www.kultunaut.dk/perl/arrlist/type-nynaut_dk?Lang=english",
    "thehub_cph": "https://thehub.io/jobs/location/denmark/copenhagen",
    "fck_calendar": "https://www.fck.dk/en/calendar",
    "copenhagen_marathon": "https://copenhagenmarathon.dk/en/",
    "kbh_loppetorv": "https://kbhloppetorv.dk/",
    "bella_flea": "https://loppemarkedibella.dk/en",
}
