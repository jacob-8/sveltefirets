<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  $: ({messages} = data);
</script>

<!-- prettier-ignore -->
# Load Collection in Load function

Works both server and client side. Try refreshing the page and navigating via sidebar to test both methods.

Place this code in your corresponding `+page.ts` file:

```ts
import { getCollection } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  const messages = await getCollection<IMessage>(`messages`, [
    limit(5),
    orderBy('updatedAt', 'desc'),
  ]);
  return { messages };
}
```

Then in your `+page.svelte` file:

```svelte
<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  $: ({messages} = data);
</script>
```

To return this:

<pre>{JSON.stringify(messages, null, 1)}</pre>

Did you see the flash of objects rearranging as the client side Firestore fetched, updated the content (and also cached)?