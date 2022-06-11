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

<script>
  import { user } from '$lib/user';
  $: console.log({ user: $user }); // smoke test to ensure that importing (and thus creating a user store) before firebase config set will still work.
</script>

<Layout
  title="SvelteFireTS"
  githubURL="https://github.com/jacob-8/sveltefirets/tree/main/packages/demo">
  <slot />
</Layout>

