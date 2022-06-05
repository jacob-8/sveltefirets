// Main
export { setConfig, getFirebaseApp, getDb } from './client/init';

// Firestore Helpers
export {
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
export { getUid } from './client/uid';

// Components
export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
export { default as FirebaseUiAuth } from './client/components/FirebaseUiAuth.svelte';

// Stores & Auth
export { collectionStore, docStore } from './client/stores';
export { authState, createUserStore, logOut } from './client/user';
export { updateUserData } from './client/updateUserData';

// Types & Enums
export type { IBaseUser, IFirestoreMetaData, IFirestoreMetaDataAbbreviated } from './interfaces';
export { type LanguageCode, languagesWithTranslations } from './client/components/languageCodes';

// Helpers
export { loadScriptOnce, loadStylesOnce } from './client/loader';