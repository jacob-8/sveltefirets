import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, type Firestore } from 'firebase/firestore';
import { type Writable, writable } from 'svelte/store';

console.log('hello from sveltefirets client init');

let firebaseConfig: FirebaseOptions = null;
let firebaseApp: FirebaseApp = null;
let db: Firestore = null;

export function setConfig(config: FirebaseOptions) {
  console.log('firebase config set on client: ' + config.projectId);
  firebaseConfig = config;
}

export function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length) {
    firebaseApp = getApps()[0];
    return firebaseApp;
  }

  if (!firebaseConfig) {
    throw Error('Sveltefirets firebaseConfig not set on client. Did you run `setConfig(config)` before using Firestore? In SvelteKit this is done in your root __layout.svelte file (and any other root layouts you may be using).');
  }

  firebaseApp = initializeApp(firebaseConfig);
  console.log('firebase initialized on client');

  const db = getFirestore();
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn(
        'When multiple tabs open, Firestore persistence can only be enabled in one tab at a time.'
      );
    } else if (err.code == 'unimplemented') {
      console.warn(
        'The current browser does not support all of the features required to enable Firestore persistence.'
      );
    }
  });
  return firebaseApp;
}

export function getDb() {
  if (db) {
    return db;
  }

  db = getFirestore(getFirebaseApp());
  return db;
}