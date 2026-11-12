/** Sentence case for the site's Title Case headings: "Sub-4 Hour Marathon" → "Sub-4 hour marathon". */
export function sentence(text: string) {
  return text.replace(/\b[A-Z][a-z]+\b/g, (word, index: number) => (index === 0 ? word : word.toLowerCase()));
}
