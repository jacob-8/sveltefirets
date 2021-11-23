export const platform = 'client';
export * from './interfaces';
export { initFirebase } from './client/init';

// Helpers
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
export { updateUserData } from './client/updateUserData';

// Components
export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
export { default as FirebaseUiAuth } from './client/components/FirebaseUiAuth.svelte';

// Stores
export { authState, createUserStore, logOut } from './client/user';