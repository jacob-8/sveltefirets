import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: vercel(),
		target: '#svelte',
		package: {
			dir: './package',
		},
		vite: {
			server: {
				fs: {
					allow: ['..'] // Allow serving files from one level up to the project root
				}
			},
			// optimizeDeps: {
			// 	exclude: ['sveltefirets']
			// },
			ssr: {
				noExternal: ['sveltefirets']
			}
		}
	},
};

export default config;
