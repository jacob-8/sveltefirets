<script lang="ts">
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { setOnline } from 'sveltefirets';
  import { Doc } from 'sveltefirets';
  let id = 'testmessage';
</script>

<!-- prettier-ignore -->
# Firestore Lite 

By design Firebase' `addDoc`, `setDoc`, `updateDoc`, and `deleteDoc` methods (and by extension this library's `add`, `set`, `update`, and `deleteDocument` helper methods detailed in the `CRUD` page) return promises that resolve once changes are written to the server and NOT the cache. If poor internet or no internet exists, these promises won't resolve nor reject. They just hang. So in a use case where a user with weak internet creates a new item and you write your code to await the addition of the item to the database before navigating to a page where that item can be edited further, nothing will happen and users will be left wondering what is broken with the site. You won't discover this in development because you have great internet! But it could plague you if you are unaware. This is why this library also includes the equivalent Firestore Lite helpers methods: `addOnline`, `setOnline`, `updateOnline`, and `deleteOnline`:

## addOnline

TODO

## setOnline

<Button
  onclick={() => {
    setOnline(`messages/${id}`, { text: 'Just a test' });
  }}>Use setOnline</Button>

<Doc path={`messages/${id}`} let:data={message}>
  <pre>{JSON.stringify(message, null, 2)}</pre>
  <div slot="fallback">
    No document found with this id. Choose one from the above list of greetings (add a greeting
    first if there are none).
  </div>
</Doc>

## updateOnline

TODO

## deleteOnline

TODO

## When to use

The most compelling use case for these is if the creation of a document is mission critical. Like creating a new dictionary that a user will then add entries to and invite others to collaborate on. That would be a poor experience if somehow the dictionary was never added to the server. So we use `setOnline` to ensure the dictionary is created before allowing the user to move forward.

### Further information

Read these for useful tips on how to handle online/offline writes:
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754
- https://stackoverflow.com/questions/49818095/firebase-firestore-when-do-promises-from-offline-write-operations-resolve
- https://stackoverflow.com/questions/49829714/firebase-firestore-get-document-id-after-adding-data-offline
- https://github.com/firebase/firebase-js-sdk/issues/1497
- https://firebase.google.com/docs/firestore/manage-data/enable-offline
- https://github.com/firebase/firebase-js-sdk/issues/520
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754#47676754