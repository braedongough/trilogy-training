import { defineConfig, fontProviders } from 'astro/config';

const fontsource = fontProviders.fontsource();

/** A self-hosted font family: Astro downloads, subsets, and fingerprints it at build time. */
function font(name, cssVariable, weights, styles = ['normal']) {
  return { provider: fontsource, name, cssVariable, weights, styles, subsets: ['latin'] };
}

export default defineConfig({
  site: 'https://trilogy-training.com',
  // Start fetching a page when its link is hovered or touched, so the click feels instant
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  fonts: [
    font('Space Grotesk', '--font-space-grotesk', ['400 700']),
    font('Inter', '--font-inter', ['400 700']),
    font('Space Mono', '--font-space-mono', [400, 700]),
    // Design directions under /concepts/
    font('Barlow Condensed', '--font-barlow-condensed', [500, 600, 700], ['normal', 'italic']),
    font('Fraunces', '--font-fraunces', ['300 700'], ['normal', 'italic']),
    font('Instrument Sans', '--font-instrument-sans', ['400 700']),
    font('Inter Tight', '--font-inter-tight', ['400 800']),
    font('JetBrains Mono', '--font-jetbrains-mono', ['400 700']),
    font('Bricolage Grotesque', '--font-bricolage', ['400 800']),
    font('DM Sans', '--font-dm-sans', ['400 700']),
  ],
  // Old Wix URLs that may still be in search results and bookmarks
  redirects: {
    '/plans-pricing-1': '/plans/',
    '/plans-pricing': '/plans/',
    '/training-camps': '/plans/',
  },
});
