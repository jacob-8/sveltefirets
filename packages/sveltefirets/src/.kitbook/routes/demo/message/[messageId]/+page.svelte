<script lang="ts">
  import { Doc } from 'sveltefirets';
  import type { IMessage } from '$lib/message.interface';
  import type { PageData } from './$types';
  export let data: PageData;
  $: ({ message, messageId } = data);

  const preloadedMessage: IMessage = { text: 'preloadedMessage from the server' };

  let log = false;
</script>

<h2>Message retrieved via load function:</h2>
<pre>{JSON.stringify(message, null, 1)}</pre>

<hr />
<h2>Message retrieved via Doc component</h2>
<p>
  (it's just a noop pass-through server-side b/c can't do async operations outside of load function)
</p>

<Doc path={`messages/${messageId}`} let:data={message2} startWith={preloadedMessage} {log}>
  <pre>{JSON.stringify(message2, null, 2)}</pre>
  <div slot="fallback">No document found with this id.</div>
</Doc>

<label for="">
  <input type="checkbox" bind:checked={log} /> Log
</label>
