import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codePreview } from 'kitbook/plugins/code-preview-remark';

const config = defineConfig({
  extensions: ['.md', '.svx'],
  remarkPlugins: [codePreview],
  rehypePlugins: [],
});

export default config;
