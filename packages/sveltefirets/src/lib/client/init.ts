import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { type Writable, writable } from 'svelte/store';

console.log('hello from sveltefirets client init');

let firebaseConfig: FirebaseOptions = null;
let firebaseApp: FirebaseApp = null;
export const firebaseAppStore: Writable<FirebaseApp> = writable(null);

export function setConfig(config: FirebaseOptions) {
  console.log('firebase config set on client: ' + config);
  firebaseConfig = config;
}

export function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length) {
    firebaseApp = getApps()[0];
    firebaseAppStore.set(firebaseApp);
    return firebaseApp;
  }

  if (!firebaseConfig) {
    throw Error('Sveltefirets firebaseConfig not set on server. Did you run `setConfig(config)` before a server endpoint used Firestore? In Sveltekit this is done in your hooks.ts file.');
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
  firebaseAppStore.set(firebaseApp);
  return firebaseApp;
}
