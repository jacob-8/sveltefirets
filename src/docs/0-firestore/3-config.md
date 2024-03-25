# Config 

To use part of the config in your project, `projectId` to toggle dev tools for example, simply import like this:

```svelte
<script lang="ts">
  import { firebaseConfig } from 'sveltefirets';
</script>
<pre>{JSON.stringify(firebaseConfig, null, 1)}</pre>
```


