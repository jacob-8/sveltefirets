import type { FirebaseOptions } from 'firebase/app';

// @ts-ignore
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public'; 
// when using sveltefirets in non-SvelteKit environments, a file that exports this will need to be aliased to '$env/static/public'. The other option is to listen to process.env.PUBLIC_FIREBASE_CONFIG or window.PUBLIC_FIREBASE_CONFIG depending on server/client.

if (!PUBLIC_FIREBASE_CONFIG) {
  throw Error('PUBLIC_FIREBASE_CONFIG is not set in your env variables.');
}

export const firebaseConfig: FirebaseOptions = JSON.parse(PUBLIC_FIREBASE_CONFIG);

if (!firebaseConfig.projectId) {
  throw Error('PUBLIC_FIREBASE_CONFIG is not set properly in your env variables.');
}
