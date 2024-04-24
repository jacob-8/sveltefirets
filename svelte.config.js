// @ts-check
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.composition'],
  preprocess: [
    vitePreprocess(),
  ],

	kit: {
		adapter: adapter(),
		alias: {
      'sveltefirets': 'src/lib',
    },
	},

	onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return;
    }
    handler(warning);
  },
};

export default config;
