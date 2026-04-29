"""Per-week curated seed items.

The scrapers cover broad recurring fixtures, but anti-bot blocks make
some sources unreliable. This file lets you pin verified items for a
specific week — e.g. results from a manual five-minute search, or
events you saw on a poster. They're keyed by the Monday of the week.

Each entry is a plain dict matching the Item fields. Unknown keys are
ignored; missing optional keys default to "".

Add new weeks by appending another `"YYYY-MM-DD": [ ... ]` block.
"""
from __future__ import annotations

# Verified via Songkick / Bandsintown / venue announcements / official sites.
SEED_BY_WEEK: dict[str, list[dict]] = {
    "2026-05-04": [
        # ---------------- Concerts ----------------
        {
            "category": "concert",
            "title": "Minami Deutsch",
            "when_iso": "2026-05-05",
            "venue": "VEGA",
            "description": "Tokyo's krautrock-leaning psych quartet, doing the long-form trance thing live",
            "url": "https://vega.dk/en",
        },
        {
            "category": "concert",
            "title": "L.A. Witch",
            "when_iso": "2026-05-05",
            "venue": "Loppen, Christiania",
            "description": "Smoky garage rock from the trio out of Los Angeles",
            "url": "https://www.loppen.dk/",
        },
        {
            "category": "concert",
            "title": "Charlie Parr",
            "when_iso": "2026-05-05",
            "venue": "Beta, Amager",
            "description": "Minnesota fingerpicker — old-time blues and folk, just him and a guitar",
            "url": "https://beta2300.dk/",
        },
        {
            "category": "concert",
            "title": "A Colossal Weekend 2026 (10-year anniversary)",
            "when_iso": "2026-05-07",
            "date_label_override": "Thu–Sat 7–9 May",
            "venue": "VEGA + Basement, Vesterbro",
            "description": "Three days of post-rock, doom, sludge and heavy experimental. Cult of Luna, Pelican, Russian Circles, King Buffalo, Slift, A.A. Williams, Slow Crush and ~30 more",
            "url": "https://www.acolossalweekend.dk/",
        },
        # ---------------- City events / culture ----------------
        {
            "category": "event",
            "title": "Marina Abramović — \"Seven Deaths\"",
            "when_iso": "2026-05-05",
            "date_label_override": "Tue 5 & Wed 6 May",
            "venue": "Cisternerne, Frederiksberg",
            "description": "Cinematic opera installation in the underground reservoir — a rare staging in Copenhagen",
            "url": "https://frederiksbergmuseerne.dk/en/cisternerne/",
        },
        # ---------------- Sport ----------------
        {
            "category": "sport",
            "title": "Copenhagen Marathon 2026",
            "when_iso": "2026-05-10",
            "date_label_override": "Sun 10 May, gun 09:30",
            "venue": "Start at Østre Allé, by Fælledparken",
            "description": "42.2 km loop through Indre By, Østerbro, Christianshavn, Vesterbro, Nørrebro and Frederiksberg. Best cheering: Dronning Louises Bro turns into a street party with DJs",
            "url": "https://copenhagenmarathon.dk/en/",
        },
        # ---------------- Jobs (interesting picks from The Hub / wider Nordic startup scene) ----------------
        {
            "category": "job",
            "title": "Founding Designer",
            "venue": "early-stage Copenhagen climate startup",
            "date_label_override": "open now",
            "description": "Brand + product, full latitude. The kind of role where the first 12 months define the company's visual identity",
            "url": "https://thehub.io/jobs/location/denmark/copenhagen",
        },
        {
            "category": "job",
            "title": "AI Product Manager",
            "venue": "Nordic SaaS scale-up",
            "date_label_override": "open now",
            "description": "Owning an LLM-powered feature line. Strong PM craft, comfortable getting close to evals and prompts",
            "url": "https://thehub.io/jobs/location/denmark/copenhagen",
        },
        {
            "category": "job",
            "title": "Mechanical Engineer — two-stroke marine engines",
            "venue": "Everllence, Copenhagen R&D",
            "date_label_override": "open now",
            "description": "50% of world trade is moved by engines like these. Genuinely weird, large-scale, low-emissions work",
            "url": "https://thehub.io/jobs/location/denmark/copenhagen",
        },
        {
            "category": "job",
            "title": "Junior Lead Game Developer",
            "venue": "Copenhagen indie studio",
            "date_label_override": "open now",
            "description": "Small team, real ownership over a shipping title. Unity / Unreal background welcome",
            "url": "https://thehub.io/jobs/location/denmark/copenhagen",
        },
    ],
}
