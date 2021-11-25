<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import type { Load } from '@sveltejs/kit';
  import type { IMessage } from './_demo-lib/message.interface';
  export const load: Load = async ({ page: { params }, stuff: { firebaseApp } }) => {
    try {
      const message = await getDocument<IMessage>(`messages/${params.messageId}`, firebaseApp);
      console.log('loaded: ', { message });
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
