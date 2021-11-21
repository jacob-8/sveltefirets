export const hello = (name: string) => {
  console.log('client hello');
  return `Hello, ${name}, from client!`;
};

export { default as Collection } from './client/components/Collection.svelte';
export { default as Doc } from './client/components/Doc.svelte';
export { getDocument } from './client/firestore';
export { db, firebaseApp } from './client/init';