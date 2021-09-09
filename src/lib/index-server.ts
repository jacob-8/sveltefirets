export const hello = (name: string) => {
  console.log('server hello');
  return `Hello, ${name}, from server!`;
};

// export { default as Collection } from './server/components/Collection.svelte';

import Collection from './server/components/Collection.svelte';
export { Collection };