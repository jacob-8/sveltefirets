import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, type Firestore } from 'firebase/firestore';

let firebaseConfig: FirebaseOptions = null;
let firebaseApp: FirebaseApp = null;
let db: Firestore = null;

const browser = typeof window !== 'undefined';

export function setConfig(config: FirebaseOptions) {
  console.log(`firebase config set on ${browser ? 'client' : 'server'} ${config.projectId}`);
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
    if (browser) {
      throw Error(
        'Sveltefirets firebaseConfig not set on client. Did you run `setConfig(config)` before using Firestore? In SvelteKit this is done in your root __layout.svelte file (and any other root layouts you may be using).'
      );
    }
    throw Error(
      'Sveltefirets firebaseConfig not set on server. Did you run `setConfig(config)` before a server endpoint used Firestore? In SvelteKit, do this in your hooks.ts file.'
    );
  }

  firebaseApp = initializeApp(firebaseConfig);
  console.log('firebase initialized');

  if (browser) {
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
  }
  return firebaseApp;
}

export function getDb() {
  if (db) {
    return db;
  }

  db = getFirestore(getFirebaseApp());
  return db;
}
