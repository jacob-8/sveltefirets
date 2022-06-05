/* eslint-disable @typescript-eslint/no-unused-vars */
// Inspired by https://fireship.io/lessons/firestore-advanced-usage-angularfire/
import {
  type CollectionReference,
  type DocumentReference,
  type QueryConstraint,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { get } from 'svelte/store';
import { getDb } from './init';
import { authState } from './user';

export const getUid = () => {
  const u = get(authState);
  return (u && u.uid) || 'anonymous'; // 'anonymous' allows support messages to be saved by non-logged-in users
};

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

export function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
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
  queryConstraints: QueryConstraint[] = []
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

export function add<T>(
  ref: CollectionPredicate<T>,
  data: T,
  opts: {
    abbreviate?: boolean;
  } = {}
): Promise<DocumentReference<T>> {
  return addDoc(colRef(ref), {
    ...data,
    [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
    [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
    [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
    [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
  });
}

export async function set<T>(
  ref: DocPredicate<T>,
  data: T,
  opts: {
    abbreviate?: boolean;
    merge?: boolean;
  } = {}
): Promise<void> {
  const snap = await getDocument(ref);
  return await (snap
    ? update(ref, data)
    : setDoc(
        docRef(ref),
        {
          ...data,
          [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
          [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
          [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
          [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
        },
        { merge: opts.merge }
      ));
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

export async function update<T>(
  ref: DocPredicate<T>,
  data: Partial<T>,
  opts: {
    abbreviate?: boolean;
  } = {}
): Promise<void> {
  // @ts-ignore
  return updateDoc(docRef(ref), {
    ...data,
    [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
    [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
  });
}

export function deleteDocument<T>(ref: DocPredicate<T>): Promise<void> {
  return deleteDoc(docRef(ref));
}

export async function docExists<T>(ref: DocPredicate<T>): Promise<boolean> {
  return (await getDoc(docRef(ref))).exists();
}
