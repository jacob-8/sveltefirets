export * from './interfaces';
export { initFirebase } from './init';

// Firestore Helpers
export {
  getUid,
  colRef,
  docRef,
  getCollection,
  getDocument,
  add,
  set,
  update,
  deleteDocument,
  docExists,
} from './client/firestore';
export { addOnline, setOnline, updateOnline, deleteDocumentOnline } from './client/firestore-lite';

// Components
export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
export { default as FirebaseUiAuth } from './client/components/FirebaseUiAuth.svelte';

// Stores & Auth
export { collectionStore, docStore } from './client/stores';
export { authState, createUserStore, logOut } from './client/user';
export { updateUserData } from './client/updateUserData';
