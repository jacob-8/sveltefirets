export const platform = 'server';
export * from './interfaces';

function noop() {
  return new Promise((resolve) => resolve(null));
}
const initFirebase = () => console.log('does not init on server yet'),
  getUid = () => null,
  colRef = null,
  docRef = null,
  getCollection = noop,
  getDocument = noop,
  add = noop,
  set = noop,
  update = noop,
  deleteDocument = noop,
  docExists = noop,
  addOnline = noop,
  setOnline = noop,
  updateOnline = noop,
  deleteDocumentOnline = noop,
  user = null;
export {
  initFirebase,
  getUid,
  colRef,
  docRef,
  getCollection,
  getDocument,
  add,
  set,
  update,
  deleteDocument,
  docExists,
  addOnline,
  setOnline,
  updateOnline,
  deleteDocumentOnline,
  user
};

// Components
export { default as Collection } from './server/components/Collection.svelte';
export { default as Doc } from './server/components/Doc.svelte';
