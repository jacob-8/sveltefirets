<script context="module" lang="ts">
  import { getCollection } from 'sveltefirets';
  import { limit, orderBy } from 'firebase/firestore';
  import type { IMessage } from '$lib/message.interface';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    try {
      const messages = await getCollection<IMessage>(`messages`, [
        limit(5),
        orderBy('updatedAt', 'desc'),
      ]);
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

<!-- prettier-ignore -->
# Load Collection in Load function

Works both server and client side. Try refreshing the page and navigating via sidebar to test both methods.

Place this code in your `context="module"` script block:

```ts
import { getCollection } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
export const load: Load = async () => {
  const messages = await getCollection<IMessage>(`messages`, [
    limit(5),
    orderBy('updatedAt', 'desc'),
  ]);
  return { props: { messages } };
}
```

To return this:

<pre>{JSON.stringify(messages, null, 1)}</pre>

Did you see the flash of objects rearranging as the client side Firestore fetched and updated the content (and also cached)?