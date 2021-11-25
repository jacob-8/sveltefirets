<script context="module" lang="ts">
  import { getCollection } from 'sveltefirets';
  import { limit, orderBy } from 'firebase/firestore';

  import type { Load } from '@sveltejs/kit';
  import type { IMessage } from './_demo-lib/message.interface';
  export const load: Load = async ({ stuff: { firebaseApp } }) => {
    try {
      const messages = await getCollection<IMessage>(
        `messages`,
        [limit(5), orderBy('updatedAt', 'desc')],
        firebaseApp
      );
      console.log('loaded: ', { messages });
      if (messages) {
        return { props: { messages } };
      } else {
        return { status: 301, redirect: '/' };
      }
    } catch (error) {
      return { status: 500, error };
    }
  };
</script>

<script lang="ts">
  export let messages: IMessage[];
</script>

<a href="/">Home</a>
<pre>{JSON.stringify(messages, null, 1)}</pre>
