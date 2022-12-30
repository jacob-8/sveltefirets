<!-- prettier-ignore -->
# Load Data in Load function

Works both server and client side.

## Load Collection

Place this code in your corresponding `+page.ts` file:

```ts
import { getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';
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

<!-- <pre>{JSON.stringify(messages, null, 1)}</pre> -->

<iframe src="/demo/messages" style="width: 100%; height: 50vh; border: 1px solid black;"></iframe>

<!-- Refresh to see the flash of objects rearranging as the client side Firestore fetched, updated the content (and also cached). (needs refresh button placed on iframe) -->

## Load Document

Works the same way except you import `getDocument` in your `+page.ts` file:

```ts
import { getDocument } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  const message = await getDocument<IMessage>(`messages/fooId`);
  return { message };
}
```

The `IMessage` type is optional in both instances but highly recommended as it will give you proper types for your returned data.