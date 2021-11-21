export const hello = (name: string) => {
  console.log('server hello');
  return `Hello, ${name}, from server!`;
};

function noop() {
  return new Promise((resolve) => resolve(null));
}

export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';

const db = null,
  firebaseApp = null,
  getDocument = noop;

export { db, firebaseApp, getDocument };
