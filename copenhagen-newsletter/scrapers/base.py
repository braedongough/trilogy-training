"""Shared HTTP plumbing and the Item dataclass every scraper returns."""
from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from datetime import date
from typing import Iterable

import requests
from bs4 import BeautifulSoup

from config import POLITE_DELAY_SECONDS, REQUEST_RETRIES, REQUEST_TIMEOUT, USER_AGENT

log = logging.getLogger("scrapers")


@dataclass
class Item:
    category: str           # "concert" | "event" | "market" | "job" | "sport" | "food"
    title: str
    when: date | None       # primary date; None for recurring/multi-day items handled by `date_label`
    date_label: str         # human-friendly date string ("Sat 9 May", "Thu–Sat 7–9 May")
    venue: str = ""
    description: str = ""
    url: str = ""
    source: str = ""        # which scraper produced it
    tags: tuple[str, ...] = field(default_factory=tuple)

    def key(self) -> tuple:
        """Used for deduplication across overlapping sources."""
        return (self.category, self.title.strip().lower(), self.date_label.strip().lower())


_session: requests.Session | None = None


def session() -> requests.Session:
    global _session
    if _session is None:
        s = requests.Session()
        s.headers.update({
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-GB,en;q=0.9,da;q=0.8",
        })
        _session = s
    return _session


def get(url: str) -> BeautifulSoup | None:
    """Polite GET with retries. Returns parsed soup, or None on failure."""
    last_exc: Exception | None = None
    for attempt in range(REQUEST_RETRIES + 1):
        try:
            r = session().get(url, timeout=REQUEST_TIMEOUT)
            time.sleep(POLITE_DELAY_SECONDS)
            if r.status_code == 200:
                return BeautifulSoup(r.text, "lxml")
            log.info("GET %s -> %s", url, r.status_code)
            if r.status_code in (403, 429, 503):
                # Anti-bot or rate limit; no point retrying immediately.
                return None
        except requests.RequestException as e:
            last_exc = e
            log.info("GET %s failed: %s", url, e)
            time.sleep(POLITE_DELAY_SECONDS * (attempt + 1))
    if last_exc:
        log.info("Giving up on %s", url)
    return None


def dedupe(items: Iterable[Item]) -> list[Item]:
    seen: dict[tuple, Item] = {}
    for it in items:
        seen.setdefault(it.key(), it)
    return list(seen.values())
