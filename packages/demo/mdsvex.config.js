import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
  extensions: ['.md', '.svx'],

  remarkPlugins: [],
  rehypePlugins: [],
});

export default config;
