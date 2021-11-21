<script lang="ts">
  import { Collection, Doc, getDocument, hello } from 'sveltefirets';

  getDocument('messages/CrJauqXJ249p7r0OxE53').then((message) => {
    console.log({ message }); // will be null on server
  });
</script>

<h1>{hello('Dan')}</h1>

<Doc path={`messages/CrJauqXJ249p7r0OxE53`} startWith={{ name: 'Bill' }} log let:data={message}>
  <pre>{JSON.stringify(message, null, 2)}</pre>
</Doc>

<Collection path="messages" startWith={[{ name: 'Bob' }, { name: 'Betty' }]} let:data={messages} log>
  {#each messages as message}
    <pre>{JSON.stringify(message.name, null, 2)}</pre>
  {/each}
</Collection>

<!-- queryConstraints={[where('createdBy', '==', $user.uid), orderBy('updatedAt', 'desc')]}> -->
