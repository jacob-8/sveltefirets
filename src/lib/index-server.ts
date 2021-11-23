export const platform = 'server';
export * from './interfaces';

const noopPromise = () => new Promise((resolve) => resolve(null));
const noop = () => null;

const initFirebase = () => console.log('does not init on server yet'),
  getUid = noop,
  colRef = null,
  docRef = null,
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
  authState = null, 
  createUserStore = noop,
  logOut = noop,
  updateUserData = noopPromise;
export {
  initFirebase,
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
  addOnline,
  setOnline,
  updateOnline,
  deleteDocumentOnline,
  authState, 
  createUserStore,
  logOut,
  updateUserData,
};

// Components
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
export { default as FirebaseUiAuth } from './client/components/FirebaseUiAuth.svelte';
