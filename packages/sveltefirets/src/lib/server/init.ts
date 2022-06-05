import {
  initializeApp,
  getApps,
  type FirebaseApp,
  type FirebaseOptions,
} from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

let firebaseConfig: FirebaseOptions = null;
let firebaseApp: FirebaseApp = null;
let db: Firestore = null;

export function setConfig(config: FirebaseOptions) {
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
    throw Error(
      'Sveltefirets firebaseConfig not set on server. Did you run `setConfig(config)` before a server endpoint used Firestore? In SvelteKit, do this in your hooks.ts file.'
    );
  }

  firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
}

export function getDb() {
  if (db) {
    return db;
  }

  db = getFirestore(getFirebaseApp());
  return db;
}
