// Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations. See notes in Readme.md for more info.

import {
  type CollectionReference,
  type DocumentReference,
  type DocumentData,
  type WithFieldValue,
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore/lite';

import { getUid } from '../auth/uid';

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
  const db = getFirestore();
  return typeof ref === 'string' ? (collection(db, ref) as CollectionReference<T>) : ref;
}

function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
  if (typeof ref === 'string') {
    const pathParts = ref.split('/');
    const documentId = pathParts.pop();
    const collectionString = pathParts.join('/');
    return doc(colRef<T>(collectionString), documentId);
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

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
 export async function setOnline<T>(
  ref: DocPredicate<T>,
  data: Partial<T>,
  opts: {
    abbreviate?: boolean;
    merge?: boolean;
  } = {}
): Promise<void> {
  const snap = await getDocument(ref);
  if (snap) {
    return await updateOnline(ref, data);
  }
  data[opts.abbreviate ? 'ca' : 'createdAt'] = serverTimestamp();
  data[opts.abbreviate ? 'cb' : 'createdBy'] = getUid();
  data[opts.abbreviate ? 'ua' : 'updatedAt'] = serverTimestamp();
  data[opts.abbreviate ? 'ub' : 'updatedBy'] = getUid();
  return await setDoc(docRef(ref), data, { merge: opts.merge });
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
 export async function updateOnline<T>(
  ref: DocPredicate<T>,
  data: DocumentData,
  opts: {
    abbreviate?: boolean;
  } = {}
): Promise<void> {
  data[opts.abbreviate ? 'ua' : 'updatedAt'] = serverTimestamp();
  data[opts.abbreviate ? 'ub' : 'updatedBy'] = getUid();
  // return updateDoc(docRef(ref), data as UpdateData<T>);
  return updateDoc(docRef(ref), data);
}

/**
 * Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations.
 * Be sure to import firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors */
export function deleteDocumentOnline<T>(ref: DocPredicate<T>): Promise<void> {
  return deleteDoc(docRef(ref));
}
