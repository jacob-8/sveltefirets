import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';

let firebaseApp: FirebaseApp = null;
export function initFirebase(config: FirebaseOptions) {
  if (firebaseApp) {
    return firebaseApp;
  }
  
  if (getApps().length) {
    firebaseApp = getApps()[0];
  } else {
    firebaseApp = initializeApp(config);
    console.log('firebase initialized on server');
  }
  return firebaseApp;
}
