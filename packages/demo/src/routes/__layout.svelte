<script context="module" lang="ts">
  import { setConfig } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';

  import { Layout } from 'kitbook';
  const modules = import.meta.glob('./**/*.{md,svx}');

  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    setConfig(firebaseConfig);
    return { stuff: { kitbook: { modules } } };
  };
</script>

<Layout
  title="SvelteFireTS"
  githubURL="https://github.com/jacob-8/sveltefirets/tree/main/packages/demo">
  <slot />
</Layout>

<!-- 
  Default example without Kitbook:
  ////////////////////////////////
  <script context="module" lang="ts">
  import { setConfig } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    setConfig(firebaseConfig);
    return {};
  };
</script>

<slot /> -->
