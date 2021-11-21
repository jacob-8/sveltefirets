export const hello = (name: string) => {
  console.log('server hello');
  return `Hello, ${name}, from server!`;
};

// export { default as Collection } from './server/components/Collection.svelte';

function noop() {
  return new Promise((resolve) => resolve(null));
}

import Collection from './server/components/Collection.svelte';
import Doc from './server/components/Doc.svelte';
const db = null,
  firebaseApp = null,
  getDocument = noop;


export { Collection, Doc, db, firebaseApp, getDocument };
