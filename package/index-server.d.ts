export declare const platform = "server";
export * from './interfaces';
export { firebaseConfig } from './config';
declare function noop(): Promise<unknown>;
declare const db: any, firebaseApp: any, getUid: () => any, colRef: any, docRef: any, getCollection: typeof noop, getDocument: typeof noop, add: typeof noop, set: typeof noop, update: typeof noop, deleteDocument: typeof noop, docExists: typeof noop, addOnline: typeof noop, setOnline: typeof noop, updateOnline: typeof noop, deleteDocumentOnline: typeof noop;
export { db, firebaseApp, getUid, colRef, docRef, getCollection, getDocument, add, set, update, deleteDocument, docExists, addOnline, setOnline, updateOnline, deleteDocumentOnline, };
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
