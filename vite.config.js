import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig} from 'vite';
import { kitbook } from 'kitbook/plugins/vite';
import kitbookConfig from './kitbook.config';

export default defineConfig({
	plugins: [
		kitbook(kitbookConfig),
		sveltekit(),
	],
});

