"""Curated registry of regular Copenhagen fixtures.

When a scraper can't reach its source (anti-bot, network), this is the
floor: things that happen reliably the same time every week. The
formatter labels these clearly so readers know they're recurring.
"""
from __future__ import annotations

from datetime import date

# Day-of-week: 0 = Monday, 6 = Sunday
RECURRING_MARKETS = [
    {
        "title": "Københavns Loppetorv (Israels Plads)",
        "weekday": 5,  # Saturday
        "time": "11:00–16:00",
        "season": (3, 10),  # March–October
        "address": "Israels Plads, Indre By",
        "description": "Open-air flea market right by Nørreport. Books, bric-a-brac, vintage clothing, the occasional weird lamp.",
        "url": "https://kbhloppetorv.dk/",
    },
    {
        "title": "Frederiksberg Town Hall flea market",
        "weekday": 5,  # Saturday
        "time": "09:00–15:00",
        "season": (4, 10),
        "address": "Smallegade, Frederiksberg",
        "description": "Long-running Saturday market on the strip beside the town hall. Easy to combine with a walk in Frederiksberg Have.",
        "url": "https://www.visitcopenhagen.com/copenhagen/activities/shopping/flea-markets-copenhagen",
    },
    {
        "title": "Gentofte loppemarked",
        "weekday": 6,  # Sunday
        "time": "08:00–14:00",
        "season": (4, 10),
        "address": "Behind Charlottenlund Station",
        "description": "Quiet, suburban Sunday-morning flea market — best in the first hour for finds.",
        "url": "https://www.visitcopenhagen.com/copenhagen/activities/shopping/flea-markets-copenhagen",
    },
]

RECURRING_FOOD = [
    {
        "title": "Reffen street food",
        "address": "Refshalevej 167, Refshaleøen",
        "season": (4, 10),
        "description": "Northern Europe's largest street-food market reopens for the season — 35+ stalls, a brewery, harbour view.",
        "url": "https://reffen.dk/en/",
    },
    {
        "title": "Broens Gadekøkken",
        "address": "Strandgade 95, by Inderhavnsbroen",
        "season": (4, 10),
        "description": "The harbour-bridge food market opposite Nyhavn — light evenings, drink-by-the-water energy.",
        "url": "https://broensstreetfood.dk/en/",
    },
]


def in_season(season: tuple[int, int], d: date) -> bool:
    start, end = season
    return start <= d.month <= end
