export declare const platform = "client";
export * from './interfaces';
export { firebaseConfig } from './config';
export { db, firebaseApp } from './client/init';
export { getUid, colRef, docRef, getCollection, getDocument, add, set, update, deleteDocument, docExists, } from './client/firestore';
export { addOnline, setOnline, updateOnline, deleteDocumentOnline } from './client/firestore-lite';
export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
