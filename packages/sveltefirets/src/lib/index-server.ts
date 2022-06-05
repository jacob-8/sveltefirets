// Deprecated the server only options as the `svelte` export key is needing to be used in package.json and I don't know of any way to differentiate the `svelte` key between client and server

// Server noops
const noopPromise = () => new Promise((resolve) => resolve(null));
const noop = () => null;

const getUid = noop,
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
  updateUserData = noopPromise,
  loadStylesOnce = noopPromise,
  loadScriptOnce = noopPromise;

// Main
export { setConfig, getFirebaseApp, getDb } from './server/init';

// Firestore Helpers
export { colRef, docRef, getCollection, getDocument } from './server/firestore';
export { getUid, add, set, update, deleteDocument, docExists };
export { addOnline, setOnline, updateOnline, deleteDocumentOnline };

// Components
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
export { default as FirebaseUiAuth } from './server/components/FirebaseUiAuth.svelte';

// Stores & Auth
export { collectionStore, docStore };
export { authState, createUserStore, logOut };
export { updateUserData };

// Types & Enums
export type { IBaseUser, IFirestoreMetaData, IFirestoreMetaDataAbbreviated } from './interfaces';
export { type LanguageCode, languagesWithTranslations } from './client/components/languageCodes';

// Helpers
export { loadScriptOnce, loadStylesOnce };
