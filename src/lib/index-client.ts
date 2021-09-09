export const hello = (name: string) => {
  console.log('client hello');
  return `Hello, ${name}, from client!`;
};

// export { default as Collection } from './client/components/Collection.svelte';

import Collection from './client/components/Collection.svelte';
export { Collection };