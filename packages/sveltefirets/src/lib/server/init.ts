import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';

console.log('hello from sveltefirets server init');
// if (process && process.env && process.env['FIREBASE_CONFIG']) {
//   console.log('from sveltefirets' + process.env['FIREBASE_CONFIG']);
// }

// if (FIREBASE_CONFIG) {
//   console.log(FIREBASE_CONFIG)
// }

let firebaseConfig: FirebaseOptions = null;
let firebaseApp: FirebaseApp = null;

export function setConfig(config: FirebaseOptions) {
  console.log('firebase config set on server: ' + config);
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
    throw Error('Sveltefirets firebaseConfig not set on server. Did you run `setConfig(config)` before a server endpoint used Firestore? In Sveltekit this is done in your hooks.ts file.');
  }

  firebaseApp = initializeApp(firebaseConfig);
  console.log('firebase initialized on server');
  return firebaseApp;
}
