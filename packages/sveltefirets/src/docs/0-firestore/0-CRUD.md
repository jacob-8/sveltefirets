<script lang="ts">
  import { Story } from 'kitbook';
  import { Button, Store } from 'svelte-pieces';
  
  // Add
  import { add } from 'sveltefirets';
  import type { IMessage } from '$lib/message.interface';
  function sayHello(name: string) {
    add<IMessage>('messages', { text: 'Hello from ' + name });
  }
  
  // List, Update, Delete
  import { limit, orderBy } from 'firebase/firestore';
  import { Collection, deleteDocument, update } from 'sveltefirets';
  const preloadedMessages: IMessage[] = [{ text: 'preloadedMessage from the server' }];
  function changeGreeting(messageId: string) {
    const newName = prompt('Enter updated name:');
    if (newName) {
      update<IMessage>(`messages/${messageId}`, { text: `Actually the name is ${newName}` });
    }
  }

  function deleteGreeting(messageId: string, messages: IMessage[]) {
    if (messages.length > 2) {
      deleteDocument(`messages/${messageId}`)
    } else {
      alert(
        'Keep at least two messages around for demonstration. Try adding a few more and then you will be able to delete.'
      );
    }
  }

  // Read
  import { Doc } from 'sveltefirets';
</script>

<!-- prettier-ignore -->
# Create, Read, Update, Delete

## Create using `add` helper method

`add` has the same behavior as Firestore's `addDoc` method but simplifies the setup by automatically creating a collection reference from a path string. It also adds 4 metadata fields: `createdAt`, `createdBy`, `updatedAt`, `updatedBy`.

```ts
import { add } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
function sayHello(name: string) {
  add<IMessage>('messages', { text: 'Hello from ' + name });
}
```

Say hello to add your greeting to the list of greetings (seen in the next section):

<Store startWith={'John'} let:set let:store={text}>
  <input
    style="border: 1px solid gray; border-radius: 4px; padding: 2px"
    type="text"
    value={text}
    maxlength="10"
    placeholder="Enter name"
    on:keyup={(e) => e.key === 'Enter' && sayHello(text)}
    on:input={(e) => {
      //@ts-ignore
      set(e.target.value);
    }} />
  <Button size="sm" onclick={() => sayHello(text)}>Add</Button>
</Store>

## List (Collection), Update, Delete

The easiest way to list data is to use the `<Collection />` component which operates very similarly to the original [Sveltefire one](https://github.com/codediodeio/sveltefire#collection) with the addition of the `traceId`, `log`, `maxWait`, `once`, `refField` props being reactive as can be seen in the example below.

<Story name="list greetings" knobs={{refField: '', max: '1-10;5'}} let:props={{refField, max}} showCode>
  <Collection
    path="messages"
    queryConstraints={[limit(max), orderBy('updatedAt', 'desc')]}
    startWith={preloadedMessages}
    let:data={messages}
    {refField}
    log>
    {#each messages as message}
      <b>{message.text}</b> | <small>ID: {message.id} | {message.updatedAt?.toDate()}</small>
      <br />
      <Button size="sm" onclick={() => changeGreeting(message.id)}>Update</Button>
      <Button size="sm" onclick={() => deleteGreeting(message.id, messages)} color="red" form="simple">Delete</Button>
      {#if refField}
        <pre style="font-size: 70%;">{JSON.stringify(message, null, 2)}</pre>
      {/if}
      <hr />
    {/each}
  </Collection>
</Story>

The `<Collection />` component works asynchronously and so can't handle SSR loading. That can only be done in a page load file, but you should consider pairing the `<Collection />` component with the isomorphic (client/server) `getCollection()` method discussed in [[1-load-data-in-load-function]] for a SSR + realtime-updating client side experience. Just pass the data retrieved on page load into the `startWith` prop of the `<Collection />` and everything will just work. It will also provide with you type completion assuming that you've properly typed your data fetched using `getCollection()`.

After reading [[1-load-data-in-load-function#Load Document]], feel free to test out page loaded data for the above messages using the following links:

- <a href={`/demo/messages`}>Hover to preload firestore data for all messages on client (see console log)</a>
- <a href={`/demo/messages`} target="_blank">Load firestore data for all messages server-side (opens new tab)</a>
- <a href={`/demo/api/messages`} target="_blank">Messages API endpoint</a>

## Update

Did you try the `Update` buttons in the list above? Similar to the `add` method, `update` has the same behavior as Firestore's `updateDoc` method but simplifies the setup by automatically creating a document reference from a path string. It will leave alone the `createdAt` and `createdBy` fields and just update the `updatedAt` and `updatedBy` fields. Here's the code for that:

```ts
import { update } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
function updateName(id: string, name: string) {
  update<IMessage>(`messages/${id}`, { text: 'Hello from ' + name });
}
```

## Delete

Did you try the `Delete` buttons in the list above? (Go easy so others have samples to view). Here's the code for that:

```ts
import { deleteDocument } from 'sveltefirets';
function deleteGreeting(id: string) {
  deleteDocument(`messages/${id}`);
}
```

## Read (Document)

Same as using the `<Collection />` component, the easiest way to show live data for a document is to use the `<Doc />` component which operates very similarly to the original [Sveltefire one](https://github.com/codediodeio/sveltefire#doc) with the addition of the `traceId`, `log`, `maxWait`, `once` props being reactive. Go ahead and update the id (in the controls to the right), pulling from the list above.


<Story showCode name="read" knobs={{id: 'testMessage'}} let:props={{id}}>
  <Doc path="messages/{id}" let:data={message}>
    <Button href="/demo/message/{message.id}">Preload firestore data on client</Button>
    <Button href="/demo/message/{message.id}" target="_blank">Load firestore data server-side</Button>
    <Button href="/demo/api/{message.id}" target="_blank">Message API endpoint</Button>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    <div slot="fallback">
      No document found with this id. Choose an ID from the above list of greetings.
    </div>
  </Doc>
</Story>

## Set

`set` operates a little different than Firebase's `setDoc` method. It will first check if the document you are setting already exists. If so, it will use the `update` method. If not, it will use `setDoc` but with the same 4 metadata additions added by the `add` method described above.

```ts
import { set } from 'sveltefirets';
import type { IMessage } from '$lib/message.interface';
function setName(id: string, name: string) {
  set<IMessage>(`messages/${id}`, { text: 'Hello from ' + name });
}
```

There may be a case for renaming this as `upsert` in the future and creating a new `set` method that more closely resembles the Firebase `setDoc`.

[//begin]: # "Autogenerated link references for markdown compatibility"
[1-load-data-in-load-function]: 1-load-data-in-load-function "Load Data in Load function"
[1-load-data-in-load-function#Load Document]: 1-load-data-in-load-function "Load Data in Load function"
[//end]: # "Autogenerated link references"