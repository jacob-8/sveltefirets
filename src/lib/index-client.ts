export const hello = (name: string) => {
  console.log('client hello');
  return `Hello, ${name}, from client!`;
};

//////////////

export { firebaseConfig } from './config';
export { db, firebaseApp } from './client/init';

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

// Components
export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
