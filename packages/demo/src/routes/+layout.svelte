<script>
  import { Layout } from 'kitbook';
  import { browser } from '$app/env';
  import { user } from '$lib/user';
  $: if (browser) {
    console.log({ user: $user }); // smoke test to ensure that importing (and thus creating a user store) before firebase config set will still work.
  }
</script>

<Layout
  title="SvelteFireTS"
  githubURL="https://github.com/jacob-8/sveltefirets/tree/main/packages/demo">
  <slot />
</Layout>
