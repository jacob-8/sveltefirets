export const platform = 'server';
export * from './interfaces';
export { firebaseConfig } from './config';
// Helpers
function noop() {
    return new Promise((resolve) => resolve(null));
}
const db = null, firebaseApp = null, getUid = () => null, colRef = null, docRef = null, getCollection = noop, getDocument = noop, add = noop, set = noop, update = noop, deleteDocument = noop, docExists = noop, addOnline = noop, setOnline = noop, updateOnline = noop, deleteDocumentOnline = noop;
export { db, firebaseApp, getUid, colRef, docRef, getCollection, getDocument, add, set, update, deleteDocument, docExists, addOnline, setOnline, updateOnline, deleteDocumentOnline, };
// Components
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
