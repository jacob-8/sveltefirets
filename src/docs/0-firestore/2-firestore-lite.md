<script lang="ts">
  import { Story } from 'kitbook';
  import { Button, Store } from 'svelte-pieces';
  import { Doc, addOnline, setOnline, updateOnline, deleteDocumentOnline } from 'sveltefirets';

  const testMessagePath = "messages/testMessage";
</script>

<!-- prettier-ignore -->
# Firestore Lite 

By design Firebase' `addDoc`, `setDoc`, `updateDoc`, and `deleteDoc` methods (and by extension this library's `add`, `set`, `update`, and `deleteDocument` helper methods detailed in the `CRUD` page) return promises that resolve once changes are written to the server and NOT the cache. If poor internet or no internet exists, these promises won't resolve nor reject. They just hang. So in a use case where a user with weak internet creates a new item and you write your code to await the addition of the item to the database before navigating to a page where that item can be edited further, nothing will happen and users will be left wondering what is broken with the site. You won't discover this in development because you have great internet! But it could plague you if you are unaware. This is why this library also includes the equivalent Firestore Lite helpers methods: `addOnline`, `setOnline`, `updateOnline`, and `deleteOnline`:

<Story name="addOnline">
  <Store
    startWith={'nothing added yet - click to add and display message id'}
    let:set
    let:store={addedId}>
    <Button
      onclick={async () => {
        const { id } = await addOnline('messages', { text: 'Message added via addOnline' });
        set(id);
      }}>addOnline</Button>
    {addedId}
  </Store>
</Story>

The next three blocks work in tandem. Start with the set, then update it, and finally delete it.

<Story name="setOnline">
  <Button
    onclick={async () => {
      await setOnline(testMessagePath, { text: 'Just a test' });
    }}>setOnline</Button>
  <Doc path={testMessagePath} let:data={message}>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    <div slot="fallback">
      No document found with 'testMessage' id - please use the button above to "setOnline"
    </div>
  </Doc>
</Story>

Notice how the `createdAt` timestamp won't change when using updateOnline:

<Story name="updateOnline">
  <Button
    onclick={async () => {
      await updateOnline(testMessagePath, { text: 'Update the test' });
    }}>updateOnline</Button>
  <Doc path={testMessagePath} let:data={message}>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    <div slot="fallback">
      No document found with 'testMessage' id - please use setOnline above first
    </div>
  </Doc>
</Story>

<Story name="deleteDocumentOnline">
  <Button
    onclick={async () => {
      await deleteDocumentOnline(testMessagePath, { text: 'Update the test' });
    }}>deleteDocumentOnline</Button>
  <Doc path={testMessagePath} let:data={message}>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    <div slot="fallback">
      No document exists with the 'testMessage' id. Please create one above using "setOnline" first to test this out.
    </div>
  </Doc>
</Story>

When you look at the code for each of these, you'll notice they are being awaited. Obviously you can still use these without awaiting, but the primary point is to only use them when you need to ensure data has been updated on the server, so we demo them here with async-await. If you don't need to await the update reaching the server then you are better off using the normal `add`, `set`, `update`, and `deleteDocument` methods as these take advantage of the Firestore cache in case internet is cut suddenly.


<!-- prettier-ignore -->
## When to use 

The most compelling use case for these is
if the creation of a document is mission critical. Like creating a new dictionary that a user will
then add entries to and invite others to collaborate on. That would be a poor experience if somehow
the dictionary was never added to the server. So we use `setOnline` to ensure the dictionary is
created before allowing the user to move forward. 

### Further information 

Read these for useful tips on how to handle online/offline writes: 
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754 
- https://stackoverflow.com/questions/49818095/firebase-firestore-when-do-promises-from-offline-write-operations-resolve
- https://stackoverflow.com/questions/49829714/firebase-firestore-get-document-id-after-adding-data-offline
- https://github.com/firebase/firebase-js-sdk/issues/1497
- https://firebase.google.com/docs/firestore/manage-data/enable-offline
- https://github.com/firebase/firebase-js-sdk/issues/520
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754#47676754
