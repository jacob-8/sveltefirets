<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import type { Load } from '@sveltejs/kit';
  import type { IMessage } from './_demo-lib/message.interface';
  export const load: Load = async ({ page: { params } }) => {
    try {
      const message = await getDocument<IMessage>(`messages/${params.messageId}`);
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

<pre>{JSON.stringify(message, null, 1)}</pre>
