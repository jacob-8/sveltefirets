<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import type { IMessage } from '$lib/message.interface';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params: { messageId } }) => {
    try {
      const message = await getDocument<IMessage>(`messages/${messageId}`);
      if (message) {
        return { props: { message, messageId } };
      } else {
        return { status: 301, redirect: '/' };
      }
    } catch (error) {
      return { status: 500, error };
    }
  };
</script>

<script lang="ts">
  import { Doc } from 'sveltefirets';

  export let message: IMessage;
  export let messageId: string;

  const preloadedMessage: IMessage = { text: 'preloadedMessage from the server' };

  let log = false;
</script>

<h2>Message retrieved via load function:</h2>
<pre>{JSON.stringify(message, null, 1)}</pre>

<hr />
<h2>Message retrieved via Doc component</h2>
<p>(just a pass through server-side b/c can't do async operations outside of load function)</p>

<Doc path={`messages/${messageId}`} let:data={message2} startWith={preloadedMessage} {log}>
  <pre>{JSON.stringify(message2, null, 2)}</pre>
  <div slot="fallback">No document found with this id.</div>
</Doc>

<label for="">
  <input type="checkbox" bind:checked={log} /> Log
</label>
