export const hello = (name: string) => {
  console.log('client hello');
  return `Hello, ${name}, from client!`;
};

// export { default as Collection } from './client/components/Collection.svelte';

import Collection from './client/components/Collection.svelte';
import Doc from './client/components/Doc.svelte';
import { getDocument } from './client/firestore';
import { db, firebaseApp } from './client/init';
export { Collection, Doc, db, firebaseApp, getDocument };