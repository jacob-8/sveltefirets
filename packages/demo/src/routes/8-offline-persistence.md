## Offline Persistence Considerations

By design Firebase' `addDoc`, `setDoc`, `updateDoc`, and `deleteDoc` methods (and by extension this library's `add`, `set`, `update`, and `deleteDocument` helper methods) return promises that resolve only once changes are written to the server and NOT the cache. If poor internet or no internet exists, these promises won't resolve. So in a use case where a user with weak internet creates a new item and you write your code to await the addition of the item to the database before navigating to a page where that item can be edited further, nothing will happen and users will be left wondering what is broken with the site. You won't discover this in development because you have great internet! But it could plague you if you are unaware. This is why I've set up this library to also include the equivalent Firestore Lite helpers methods as seen in https://github.com/jacobbowdoin/sveltefirets/blob/main/packages/sveltefirets/src/lib/client/firestore-lite.ts - `addOnline`, `setOnline`, `updateOnline`, and `deleteOnline`.

Further information and useful tips on how to handle online/offline writes:
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754
- https://stackoverflow.com/questions/49818095/firebase-firestore-when-do-promises-from-offline-write-operations-resolve
- https://stackoverflow.com/questions/49829714/firebase-firestore-get-document-id-after-adding-data-offline
- https://github.com/firebase/firebase-js-sdk/issues/1497
- https://firebase.google.com/docs/firestore/manage-data/enable-offline
- https://github.com/firebase/firebase-js-sdk/issues/520
- https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754#47676754
