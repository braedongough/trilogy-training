"""Orchestrator: scrape all sources, format, write.

Usage:
    python main.py                          # next Mon–Sun
    python main.py --week 2026-05-04        # specific week (Monday)
    python main.py --out output/draft.md    # custom output path
"""
from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path

from config import OUTPUT_DIR, Week, next_week, parse_week_arg
from formatter import render
from scrapers import Item
from scrapers.base import dedupe
from scrapers import concerts, events, food, jobs, markets, seed, sports

log = logging.getLogger("main")


def collect(week: Week) -> list[Item]:
    items: list[Item] = []
    for module in (concerts, events, markets, food, sports, jobs, seed):
        try:
            items.extend(module.scrape(week))
        except Exception as e:
            log.warning("%s.scrape failed: %s", module.__name__, e)
    return dedupe(items)


def default_out_path(week: Week) -> Path:
    return OUTPUT_DIR / f"this-week-in-copenhagen-{week.monday.isoformat()}.md"


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="Generate a This Week in Copenhagen newsletter.")
    p.add_argument("--week", type=parse_week_arg,
                   help="Monday of the target week (YYYY-MM-DD). Defaults to next Monday.")
    p.add_argument("--out", type=Path, help="Output path. Defaults to output/this-week-in-copenhagen-<date>.md.")
    p.add_argument("-v", "--verbose", action="store_true")
    args = p.parse_args(argv)

    logging.basicConfig(
        level=logging.INFO if args.verbose else logging.WARNING,
        format="%(name)s: %(message)s",
    )

    week = args.week or next_week()
    log.info("Generating newsletter for %s", week.label())

    items = collect(week)
    md = render(week, items)

    out = args.out or default_out_path(week)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(md, encoding="utf-8")
    print(f"Wrote {out} ({len(items)} items)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
