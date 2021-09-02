// Inspired by https://fireship.io/lessons/firestore-advanced-usage-angularfire/
import { get } from 'svelte/store';
import { user } from './user';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import type { CollectionReference, DocumentReference } from 'firebase/firestore';
import { db } from '.';
import type { IUser } from './interfaces';

export const getUid = () => {
  const u = get(user) as IUser;
  return (u && u.uid) || 'anonymous'; // useful if allowing support messages to be saved by non-logged-in users
};

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

export function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
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

export async function getDocument<T>(ref: DocPredicate<T>): Promise<T> {
  const docSnap = await getDoc(docRef(ref));
  return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
}

export function add<T>(
  ref: CollectionPredicate<T>,
  data: T,
  opts: {
    abbreviateMetadata?: boolean;
  } = {}
): Promise<DocumentReference<T>> {
  return addDoc(colRef(ref), {
    ...data,
    [opts.abbreviateMetadata ? 'ua' : 'updatedAt']: serverTimestamp(),
    [opts.abbreviateMetadata ? 'ca' : 'createdAt']: serverTimestamp(),
    [opts.abbreviateMetadata ? 'ub' : 'updatedBy']: getUid(),
    [opts.abbreviateMetadata ? 'cb' : 'createdBy']: getUid(),
  });
}

export async function set<T>(
  ref: DocPredicate<T>,
  data: T,
  opts: {
    abbreviateMetadata?: boolean;
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
          [opts.abbreviateMetadata ? 'ua' : 'updatedAt']: serverTimestamp(),
          [opts.abbreviateMetadata ? 'ca' : 'createdAt']: serverTimestamp(),
          [opts.abbreviateMetadata ? 'ub' : 'updatedBy']: getUid(),
          [opts.abbreviateMetadata ? 'cb' : 'createdBy']: getUid(),
        },
        { merge: opts.merge }
      ));
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

export function update<T>(
  ref: DocPredicate<T>,
  data: Partial<T>,
  opts: {
    abbreviateMetadata?: boolean;
  } = {}
): Promise<void> {
  return updateDoc(docRef(ref), {
    ...data,
    [opts.abbreviateMetadata ? 'ua' : 'updatedAt']: serverTimestamp(),
    [opts.abbreviateMetadata ? 'ub' : 'updatedBy']: getUid(),
  }).catch((err) => {
    alert(err);
  });
}

export function deleteDocument<T>(ref: DocPredicate<T>): Promise<void> {
  return deleteDoc(docRef(ref));
}

export async function docExists<T>(ref: DocPredicate<T>): Promise<boolean> {
  return (await getDoc(docRef(ref))).exists();
}
