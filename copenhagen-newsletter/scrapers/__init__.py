"""Per-source scrapers. Each module exposes scrape(week) -> list[Item]."""
from .base import Item

__all__ = ["Item"]
