<script lang="ts">
  import { getDocument, platform } from 'sveltefirets';
  import Auth from './_demo-lib/Auth.svelte';
  import Config from './_demo-lib/Config.svelte';
  import Create from './_demo-lib/Create.svelte';
  import ReadSingle from './_demo-lib/ReadSingle.svelte';
  import ReadUpdateDelete from './_demo-lib/ReadUpdateDelete.svelte';

  // getDocument('messages/7CFRkX2oVTSr6SgwkT9D').then((message) => {
  //   console.log({ message }); // will be null on server
  // });
</script>

<h1>SvelteFire TS</h1>

{#if platform === 'client'}
  <p>
    <strong>Tip:</strong>
    Open the browser console for development logging.
  </p>
{:else}
  <p>Came from server</p>
{/if}

<Config />

<Auth />

<Create />

<ReadUpdateDelete />

<ReadSingle />
