/* eslint-disable @typescript-eslint/no-unused-vars */
// Inspired by https://fireship.io/lessons/firestore-advanced-usage-angularfire/
import {
  type CollectionReference,
  type DocumentReference,
  type QueryConstraint,
  type WithFieldValue,
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
  type DocumentData,
  type PartialWithFieldValue,
} from 'firebase/firestore';

import { getDb } from '../init';
import { getUid } from '../auth/uid';

export type CollectionPredicate<T> = string | CollectionReference<T>;
export type DocPredicate<T> = string | DocumentReference<T>;

export function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
  const db = getDb();
  return typeof ref === 'string' ? (collection(db, ref) as CollectionReference<T>) : ref;
}

export function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
  if (typeof ref === 'string') {
    const pathParts = ref.split('/');
    const documentId = pathParts.pop();
    const collectionString = pathParts.join('/');
    return doc(colRef<T>(collectionString), documentId);
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

export async function getDocumentOrError<T>(ref: DocPredicate<T>): Promise<{ data?: T, ref?: DocumentReference<T>, error?: { code: string, name: string}}> {
  try {
    const _ref = docRef<T>(ref);
    const docSnap = await getDoc(_ref);
    return { 
      data: docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null,
      ref: _ref,
    };
  } catch (error) {
    return { data: null, ref: null, error };
  }
}

export function add<T>(
  ref: CollectionPredicate<T>,
  data: WithFieldValue<T>,
  opts: {
    abbreviate?: boolean;
  } = {}
): Promise<DocumentReference<T>> {
  data[opts.abbreviate ? 'ca' : 'createdAt'] = serverTimestamp();
  data[opts.abbreviate ? 'cb' : 'createdBy'] = getUid();
  data[opts.abbreviate ? 'ua' : 'updatedAt'] = serverTimestamp();
  data[opts.abbreviate ? 'ub' : 'updatedBy'] = getUid();
  return addDoc(colRef(ref), data);
}

export async function set<T>(
  ref: DocPredicate<T>,
  data: PartialWithFieldValue<T>,
  opts: {
    abbreviate?: boolean;
    merge?: boolean; // useless in a context where `update` is called for prior existing documents
  } = {}
): Promise<void> {
  const snap = await getDocument(ref);
  if (snap) {
    return await update(ref, data);
  }
  data[opts.abbreviate ? 'ca' : 'createdAt'] = serverTimestamp();
  data[opts.abbreviate ? 'cb' : 'createdBy'] = getUid();
  data[opts.abbreviate ? 'ua' : 'updatedAt'] = serverTimestamp();
  data[opts.abbreviate ? 'ub' : 'updatedBy'] = getUid();
  return await setDoc(docRef(ref), data, { merge: opts.merge });
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

export async function update<T>(
  ref: DocPredicate<T>,
  data: PartialWithFieldValue<T>,
  opts: {
    abbreviate?: boolean;
  } = {}
): Promise<void> {
  data[opts.abbreviate ? 'ua' : 'updatedAt'] = serverTimestamp();
  data[opts.abbreviate ? 'ub' : 'updatedBy'] = getUid();
  return updateDoc(docRef(ref), data as DocumentData);
}

export function deleteDocument<T>(ref: DocPredicate<T>): Promise<void> {
  return deleteDoc(docRef(ref));
}

export async function docExists<T>(ref: DocPredicate<T>): Promise<boolean> {
  return (await getDoc(docRef(ref))).exists();
}
