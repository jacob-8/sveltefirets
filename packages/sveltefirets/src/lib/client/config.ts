import type { FirebaseOptions } from 'firebase/app';

// @ts-ignore
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';

if (!PUBLIC_FIREBASE_CONFIG) {
  throw Error('PUBLIC_FIREBASE_CONFIG is not set in your env variables.');
}

export const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

if (!firebaseConfig.projectId) {
  throw Error('PUBLIC_FIREBASE_CONFIG is not set properly in your env variables.');
}
