# This Week in Copenhagen — newsletter generator

Scrapes Copenhagen event sources and emits a Substack-ready Markdown
newsletter for the upcoming Mon–Sun week.

## What it covers

- Concerts and festivals (VEGA, Pumpehuset, Royal Arena, DR Koncerthuset, Loppen, Beta, Falkonersalen…)
- Big city events (marathons, parades, sports fixtures, exhibition openings)
- Weekend markets (Israels Plads loppetorv, Frederiksberg, Gentofte, Bella Center one-offs)
- Street-food highlights (Reffen, Broens Gadekøkken)
- Interesting jobs (The Hub, filtered for "interesting" — startups, design, weird-good roles)

## Running it

```bash
pip install -r requirements.txt
python main.py                          # next Mon–Sun
python main.py --week 2026-05-04        # specific week (give the Monday)
python main.py --out output/draft.md    # custom output path
```

Output is plain Markdown, ready to paste into Substack.

## How it works

Each scraper in `scrapers/` returns a list of `Item` dataclasses. The
orchestrator (`main.py`) calls them all, filters to the target week,
deduplicates, and hands the result to `formatter.py`, which produces the
final Markdown.

Every scraper attempts a real HTTP fetch. When a source is unreachable
(anti-bot, rate-limit, network), the scraper logs the failure and falls
back to a small **curated registry** of recurring fixtures (weekly
markets, regular street-food openings, etc.) maintained in
`data/recurring.py`. The registry is the floor — real scrapes layer on
top of it.

## Files

```
copenhagen-newsletter/
├── main.py              # orchestrator + CLI
├── formatter.py         # Markdown rendering
├── config.py            # week math, sources, output dir
├── scrapers/
│   ├── base.py          # HTTP session, polite headers, retries
│   ├── concerts.py      # Songkick/Bandsintown/venue pages
│   ├── events.py        # VisitCopenhagen, MyGuide, marathon
│   ├── markets.py       # flea markets + Bella Center
│   ├── jobs.py          # The Hub Copenhagen
│   └── sports.py        # FCK fixtures
├── data/
│   └── recurring.py     # weekly markets + recurring street-food
└── output/              # generated newsletters
```
