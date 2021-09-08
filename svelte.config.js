import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		target: '#svelte',
		package: {
			dir: './package',
		},
		vite: {
			optimizeDeps: {
				exclude: ['sveltefirets']
			},
			ssr: {
				noExternal: ['sveltefirets']
			}
		}
	},
};

export default config;
