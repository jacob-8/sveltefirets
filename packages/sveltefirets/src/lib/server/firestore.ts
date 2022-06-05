// not using lite versions on server because on client we favor using full firestore cache-first versions instead of a fetch request on every data request (which count as a read even when a user hovers over a link with sveltekite:prefetch for example) and server and client must be using both lite or both regular firestore otherwise we will have errors when trying to pass in queryConstraints from the opposite package (firestore vs firestore-lite).

import {
  type CollectionReference,
  type DocumentReference,
  type QueryConstraint,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
} from 'firebase/firestore';
import { getDb } from './init';

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

export function colRef<T>(
  ref: CollectionPredicate<T>,
): CollectionReference<T> {
  const db = getDb();
  return typeof ref === 'string' ? (collection(db, ref) as CollectionReference<T>) : ref;
}

export function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
  if (typeof ref === 'string') {
    const pathParts = ref.split('/');
    const documentId = pathParts.pop();
    const collectionString = pathParts.join('/');
    return doc<T>(colRef(collectionString), documentId);
  } else {
    return ref;
  }
}

export async function getCollection<T>(
  path: CollectionPredicate<T>,
  queryConstraints: QueryConstraint[] = [],
): Promise<T[]> {
  const ref = typeof path === 'string' ? colRef<T>(path) : path;
  const q = query(ref, ...queryConstraints);
  const collectionSnap = await getDocs(q);
  return collectionSnap.docs.map((docSnap) => ({
    ...docSnap.data(),
    id: docSnap.id,
  }));
}

export async function getDocument<T>(ref: DocPredicate<T>): Promise<T> {
  const docSnap = await getDoc(docRef(ref));
  return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
}
