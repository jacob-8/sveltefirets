<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import type { IMessage } from '$lib/message.interface';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params, stuff: { firebaseApp } }) => {
    try {
      const message = await getDocument<IMessage>(`messages/${params.messageId}`, firebaseApp);
      console.log({ message });
      if (message) {
        return { props: { message } };
      } else {
        return { status: 301, redirect: '/' };
      }
    } catch (error) {
      return { status: 500, error };
    }
  };
</script>

<script lang="ts">
  export let message: IMessage;
</script>

<a href="/">Home</a>
<pre>{JSON.stringify(message, null, 1)}</pre>
