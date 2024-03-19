import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		kitbook(),
		sveltekit(),
	],
	resolve: {
		alias: {
			'sveltefirets': path.resolve('./src/lib'),
		}
	},
};

export default config;
