<script>
  import { pagesStore } from 'kitbook';
  import { setContext } from 'svelte';
  setContext('pages-store', pagesStore);
  
  /** @type {import('kitbook').KitbookSettings} */
  const kitbookSettings = {
    title: 'SvelteFireTS',
    description: 'Use Firebase in a declarative manner in Svelte',
    githubURL: 'https://github.com/jacob-8/sveltefirets/tree/main/packages/sveltefirets',
    expandTree: true,
  };

  setContext('kitbook-settings', kitbookSettings);
</script>

<slot />
