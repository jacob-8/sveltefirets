<script lang="ts">
  import { firebaseConfig } from 'sveltefirets';
</script>

<!-- prettier-ignore -->
# Config 

To use part of the config in your project, `projectId` to toggle dev tools for example, simply import like this:

```svelte
<script lang="ts">
  import { firebaseConfig } from 'sveltefirets';
</script>
<pre>{JSON.stringify(firebaseConfig, null, 1)}</pre>
```

{#if firebaseConfig.projectId}
  <pre>{JSON.stringify(firebaseConfig, null, 1)}</pre>
{:else}
  You need to create a
  <a href="https://firebase.google.com/">Firebase Project</a>
  and add it to your .env variables as described in "Getting Started".
{/if}
