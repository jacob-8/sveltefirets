const noopPromise = () => new Promise((resolve) => resolve(null));
const noop = () => null;

const initFirebase = () => console.log('does not init on server yet'),
  getUid = noop,
  colRef = noop,
  docRef = noop,
  getCollection = noopPromise,
  getDocument = noopPromise,
  add = noopPromise,
  set = noopPromise,
  update = noopPromise,
  deleteDocument = noopPromise,
  docExists = noopPromise,
  addOnline = noopPromise,
  setOnline = noopPromise,
  updateOnline = noopPromise,
  deleteDocumentOnline = noopPromise,
  collectionStore = noop,
  docStore = noop,
  authState = null,
  createUserStore = noop,
  logOut = noop,
  updateUserData = noopPromise;

export * from './interfaces';
export { initFirebase };

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
};
export { addOnline, setOnline, updateOnline, deleteDocumentOnline };

// Components
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
export { default as FirebaseUiAuth } from './client/components/FirebaseUiAuth.svelte';

// Stores & Auth
export { collectionStore, docStore };
export { authState, createUserStore, logOut };
export { updateUserData };
