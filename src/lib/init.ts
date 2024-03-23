import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeFirestore, CACHE_SIZE_UNLIMITED, type Firestore, persistentLocalCache, persistentMultipleTabManager, enablePersistentCacheIndexAutoCreation, getPersistentCacheIndexManager } from 'firebase/firestore';
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

  db = initializeFirestore(firebaseApp, {
    ...browser ? {
      localCache: persistentLocalCache({
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        tabManager: persistentMultipleTabManager()
      }),
    } : {}
  });

  const indexManager = getPersistentCacheIndexManager(db)
  enablePersistentCacheIndexAutoCreation(indexManager); // https://www.youtube.com/watch?v=iQOTjUko9WM
  return firebaseApp;
}

/** Won't work for Firestore Lite as it returns normal Firestore */
export function getDb() {
  if (!db)
    getFirebaseApp()
  return db;
}
