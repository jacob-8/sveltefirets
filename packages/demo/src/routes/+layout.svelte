<script>
  import { Layout } from 'kitbook';
  import { browser } from '$app/environment';
  import { user } from '$lib/user';
  $: if (browser) {
    console.log({ user: $user }); // smoke test
  }
</script>

<Layout
  expanded
  title="SvelteFireTS"
  githubURL="https://github.com/jacob-8/sveltefirets/tree/main/packages/demo">
  <slot />
</Layout>
