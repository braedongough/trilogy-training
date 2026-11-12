/** The design directions under /concepts/, in the order they are presented. */
export const directions = [
  {
    slug: 'podium',
    name: 'Podium',
    summary: 'Dark, results-led, condensed type. The current brand grown up.',
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    summary: 'Warm paper, serif headlines, athlete stories told like a magazine.',
  },
  {
    slug: 'swiss',
    name: 'Swiss',
    summary: 'White, black, one red. A strict typographic grid with nothing to hide behind.',
  },
  {
    slug: 'race-data',
    name: 'Race Data',
    summary: 'Graphite and monospace. Coaching presented with the precision of a training log.',
  },
  {
    slug: 'tricolour',
    name: 'Tricolour',
    summary: 'Three sports, three colour fields. Bold, friendly, poster-like.',
  },
] as const;

export type DirectionSlug = (typeof directions)[number]['slug'];

export const conceptPages = [
  { key: 'home', label: 'Home', path: '' },
  { key: 'about', label: 'About', path: 'about/' },
  { key: 'plans', label: 'Plans', path: 'plans/' },
  { key: 'contact', label: 'Contact', path: 'contact/' },
] as const;

export type ConceptPage = (typeof conceptPages)[number]['key'];

/** URL of a page within a direction, e.g. conceptUrl('swiss', 'plans') → /concepts/swiss/plans/ */
export function conceptUrl(slug: DirectionSlug, page: ConceptPage = 'home') {
  const { path } = conceptPages.find((p) => p.key === page)!;
  return `/concepts/${slug}/${path}`;
}
