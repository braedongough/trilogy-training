"""Render scraped items as Substack-ready Markdown.

Output structure (subject to skipping empty sections):

    # This Week in Copenhagen — <date range>

    <one-paragraph intro>

    ## 🎵 Concerts & live music
    - **<title>** — <venue>, <date>. <description?> [Tickets](url)

    ## 🎉 City events & culture
    ## 🛍️ Markets this weekend
    ## 🍔 Street-food season
    ## ⚽ Sport
    ## 💼 Interesting jobs
    ## 👋 Sign-off
"""
from __future__ import annotations

from datetime import date
from typing import Iterable

from config import Week
from scrapers.base import Item

SECTION = {
    "concert": ("🎵 Concerts & live music", "When the calendar is good in Copenhagen, it's _good_."),
    "event":   ("🎉 City events & culture", "Bigger things happening in town."),
    "market":  ("🛍️ Markets this weekend", "Saturday and Sunday rummage spots."),
    "food":    ("🍔 Street-food season", "Reasons to eat outdoors this week."),
    "sport":   ("⚽ Sport", "Match days and finish lines."),
    "job":     ("💼 Interesting jobs", "Hand-picked from The Hub — the kind of thing that makes you say _huh, that sounds fun_."),
}
SECTION_ORDER = ["concert", "event", "market", "food", "sport", "job"]


def _fmt_item(item: Item) -> str:
    head_bits = [f"**{item.title}**"]
    meta_bits: list[str] = []
    if item.venue:
        meta_bits.append(item.venue)
    if item.date_label:
        meta_bits.append(item.date_label)
    head = head_bits[0]
    if meta_bits:
        head += " — " + ", ".join(meta_bits)
    line = "- " + head
    if item.description:
        line += ". " + item.description.rstrip(".") + "."
    if item.url:
        link_text = "Tickets" if item.category == "concert" else (
            "Apply" if item.category == "job" else "Details"
        )
        line += f" [{link_text}]({item.url})"
    return line


def _intro(week: Week, totals: dict[str, int]) -> str:
    def plural(n: int, single: str, many: str) -> str:
        return f"{n} {single if n == 1 else many}"

    bits = []
    if totals.get("concert"):
        bits.append(plural(totals["concert"], "concert on the books", "concerts on the books"))
    if totals.get("event"):
        bits.append(plural(totals["event"], "bigger happening", "bigger happenings"))
    if totals.get("market"):
        bits.append(plural(totals["market"], "weekend market", "weekend markets"))
    if totals.get("sport"):
        bits.append("a marathon-and-match weekend" if totals["sport"] >= 2 else "sport")
    summary = ", ".join(bits) if bits else "a quieter one"
    return (
        f"Welcome to **This Week in Copenhagen** — your Monday-morning rundown of "
        f"what's worth showing up to between **{week.label()}**. "
        f"This week: {summary}. Sun's up, the city is back outside. Let's go."
    )


def _section(items: list[Item]) -> str:
    items = sorted(items, key=lambda i: (i.when or date.max, i.title))
    return "\n".join(_fmt_item(i) for i in items)


def render(week: Week, items: Iterable[Item]) -> str:
    by_cat: dict[str, list[Item]] = {k: [] for k in SECTION_ORDER}
    for it in items:
        if it.category in by_cat:
            by_cat[it.category].append(it)

    totals = {k: len(v) for k, v in by_cat.items()}

    out: list[str] = []
    out.append(f"# This Week in Copenhagen — {week.label()}")
    out.append("")
    out.append(_intro(week, totals))
    out.append("")

    for cat in SECTION_ORDER:
        items_cat = by_cat.get(cat, [])
        if not items_cat:
            continue
        title, blurb = SECTION[cat]
        out.append(f"## {title}")
        out.append("")
        out.append(f"*{blurb}*")
        out.append("")
        out.append(_section(items_cat))
        out.append("")

    out.append("## 👋 Until next Monday")
    out.append("")
    out.append(
        "That's the week. If you find a gig, market, or job I missed, "
        "hit reply — I read everything. *Vi ses derude.*"
    )
    out.append("")
    return "\n".join(out)
