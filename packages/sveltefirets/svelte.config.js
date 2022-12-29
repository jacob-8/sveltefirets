import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	},

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true,
			}
		}
	},
};

import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config);;
