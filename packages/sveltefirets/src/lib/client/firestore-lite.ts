// Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations. See notes in Readme.md for more info.

import {
  type CollectionReference,
  type DocumentReference,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore/lite';

import { getDb } from './init';
import { getUid } from './uid';

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
  const db = getDb();
  return typeof ref === 'string' ? (collection(db, ref) as CollectionReference<T>) : ref;
}

function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
  if (typeof ref === 'string') {
    const pathParts = ref.split('/');
    const documentId = pathParts.pop();
    const collectionString = pathParts.join('/');
    return doc<T>(colRef(collectionString), documentId);
  } else {
    return ref;
  }
}

// not exporting lite versions of getCollection nor getDocument on client in favor of using full firestore cache-first versions.

async function getDocument<T>(ref: DocPredicate<T>): Promise<T> {
  const docSnap = await getDoc(docRef(ref));
  return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
}

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
export function addOnline<T>(
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

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
export async function setOnline<T>(
  ref: DocPredicate<T>,
  data: T,
  opts: {
    abbreviate?: boolean;
    merge?: boolean;
  } = {}
): Promise<void> {
  const snap = await getDocument(ref);
  return await (snap
    ? updateOnline(ref, data)
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

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
export async function updateOnline<T>(
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

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
export function deleteDocumentOnline<T>(ref: DocPredicate<T>): Promise<void> {
  return deleteDoc(docRef(ref));
}
