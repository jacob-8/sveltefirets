<script lang="ts">
  import Auth from './_demo-lib/Auth.svelte';
  import Config from './_demo-lib/Config.svelte';
  import Create from './_demo-lib/Create.svelte';
  import ReadSingle from './_demo-lib/ReadSingle.svelte';
  import ReadUpdateDelete from './_demo-lib/ReadUpdateDelete.svelte';
</script>

<h1>SvelteFire TS</h1>

<p>
  <strong>Tip:</strong>
  Open the browser console for development logging.
</p>

<Config />

<Auth />

<Create />

<ReadUpdateDelete />

<ReadSingle />
