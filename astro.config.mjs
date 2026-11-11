import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://trilogy-training.com',
  // Old Wix URLs that may still be in search results and bookmarks
  redirects: {
    '/plans-pricing-1': '/plans/',
    '/plans-pricing': '/plans/',
    '/training-camps': '/plans/',
  },
});
