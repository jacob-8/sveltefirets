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
				external: ['firebase'], // from https://github.com/firebase/firebase-js-sdk/issues/5140#issuecomment-877631462, see https://vitejs.dev/guide/ssr.html#ssr-externals
				noExternal: ['sveltefirets']
			}
		}
	},
};

export default config;
