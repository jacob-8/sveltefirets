import { defineMDSveXConfig as defineConfig } from 'mdsvex';
// import {codePreview} from 'kitbook';

const config = defineConfig({
  extensions: ['.md', '.svx'],

  remarkPlugins: [],
  rehypePlugins: [],
});

export default config;
