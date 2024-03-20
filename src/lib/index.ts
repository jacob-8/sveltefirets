// Main
export { getFirebaseApp, getDb } from './init';
export { firebaseConfig } from './config';

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
} from './firestore/firestore';
export { addOnline, setOnline, updateOnline, deleteDocumentOnline } from './firestore/firestore-lite';
export { getUid } from './auth/uid';

// Components
export { default as Collection } from './firestore/Collection.svelte';
export { default as Doc } from './firestore/Doc.svelte';
export { default as FirebaseUiAuth } from './auth/FirebaseUiAuth.svelte';

// Stores & Auth
export { docStore } from './firestore/stores/doc-store';
export { collectionStore } from './firestore/stores/collection-store';
export { awaitableDocStore } from './firestore/stores/awaitable-doc-store';
export { incrementalCollectionStore } from './firestore/stores/incremental-collection-store';
export { authState, createUserStore, logOut } from './auth/user';
export { updateUserData, saveUserData } from './auth/updateUserData';

// Types & Enums
export type { IBaseUser, IFirestoreMetaData, IFirestoreMetaDataAbbreviated, AuthResult } from './interfaces';
export { type LanguageCode, languagesWithTranslations } from './auth/languageCodes';

// Helpers
export { loadScriptOnce, loadStylesOnce } from './helpers/loader';