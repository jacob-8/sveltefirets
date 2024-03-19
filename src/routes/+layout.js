// @ts-ignore - virtual import
import { settings } from 'virtual:kitbook';
import { groupColocatedModulesIntoPages, layoutLoad, pagesStore } from 'kitbook';
/**
 * Vite glob patterns used for building your Kitbook. See https://vitejs.dev/guide/features.html#multiple-patterns.
 * Restrict these paths to be able to incrementally adopt Kitbook into your project.
 * Alternate extensions are not yet supported.
 * Kitbook changes in the future will cause this file to be regenerated. Your glob patterns will be preserved as long as you only edit the patterns inside the array brackets and nothing else.
 */
const components = import.meta.glob(['/src/**/*.svelte']);
const componentsRaw = import.meta.glob(['/src/**/*.svelte'], { query: '?raw', import: 'default' });
const variants = import.meta.glob(['/src/**/*.variants.ts']);
const variantsRaw = import.meta.glob(['/src/**/*.variants.ts'], { query: '?raw', import: 'default' });
const compositions = import.meta.glob(['/src/**/*.composition']);
const compositionsRaw = import.meta.glob(['/src/**/*.composition'], { query: '?raw', import: 'default' });
const markdown = import.meta.glob(['/src/**/*.md', '/README.md']);
const markdownRaw = import.meta.glob(['/src/**/*.md', '/README.md'], { query: '?raw', import: 'default' });
export const _pages = groupColocatedModulesIntoPages({ components, componentsRaw, variants, variantsRaw, compositions, compositionsRaw, markdown, markdownRaw });
let firstLoad = true;
if (firstLoad) {
    pagesStore.set(_pages);
    firstLoad = false;
}
if (import.meta.hot) {
    import.meta.hot.accept((module) => {
        if (module?._pages)
            pagesStore.set(module._pages);
    });
}
export const load = layoutLoad({ pages: _pages, settings });
