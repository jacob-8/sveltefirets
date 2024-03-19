import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp = null;
let db: Firestore = null;

const browser = typeof window !== 'undefined';

export function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  const currentApps = getApps();
  if (currentApps.length) {
    firebaseApp = currentApps[0];
    return firebaseApp;
  }

  firebaseApp = initializeApp(firebaseConfig);
  console.log(`${firebaseConfig.projectId} initialized on ${browser ? 'client' : 'server'}`);

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

/**
 * Note: Won't work for Firestore Lite as it returns normal Firestore */
export function getDb() {
  if (db) {
    return db;
  }

  db = getFirestore(getFirebaseApp());
  return db;
}
