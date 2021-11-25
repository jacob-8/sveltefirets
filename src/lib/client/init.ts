import { initializeApp, getApps, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { Writable, writable } from 'svelte/store';

export const firebaseAppStore: Writable<FirebaseApp> = writable(null);
let firebaseApp: FirebaseApp = null;

export function initFirebase(config: FirebaseOptions) {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length) {
    firebaseApp = getApps()[0];
  } else {
    firebaseApp = initializeApp(config);
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
  }
  firebaseAppStore.set(firebaseApp);
  return firebaseApp;
}
