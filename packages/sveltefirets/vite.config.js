import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		kitbook({ routes: 'src/routes' }),
		sveltekit(),
	],
};

export default config;
