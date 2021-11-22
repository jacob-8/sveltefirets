// Inspired by https://fireship.io/lessons/firestore-advanced-usage-angularfire/
import { collection, doc, getDocs, getDoc, query, addDoc, setDoc, deleteDoc, updateDoc, serverTimestamp, } from 'firebase/firestore';
import { db } from './init';
import { get } from 'svelte/store';
import { user } from './user';
export const getUid = () => {
    const u = get(user);
    return (u && u.uid) || 'anonymous'; // 'anonymous' allows support messages to be saved by non-logged-in users
};
export function colRef(ref) {
    return typeof ref === 'string' ? collection(db, ref) : ref;
}
export function docRef(ref) {
    if (typeof ref === 'string') {
        const pathParts = ref.split('/');
        const documentId = pathParts.pop();
        const collectionString = pathParts.join('/');
        return doc(colRef(collectionString), documentId);
    }
    else {
        return ref;
    }
}
export async function getCollection(path, queryConstraints = []) {
    const ref = typeof path === 'string' ? colRef(path) : path;
    const q = query(ref, ...queryConstraints);
    const collectionSnap = await getDocs(q);
    return collectionSnap.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
    }));
}
export async function getDocument(ref) {
    const docSnap = await getDoc(docRef(ref));
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
}
export function add(ref, data, opts = {}) {
    return addDoc(colRef(ref), {
        ...data,
        [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
        [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
        [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
        [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
    });
}
export async function set(ref, data, opts = {}) {
    const snap = await getDocument(ref);
    return await (snap
        ? update(ref, data)
        : setDoc(docRef(ref), {
            ...data,
            [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
            [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
            [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
            [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
        }, { merge: opts.merge }));
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update
export async function update(ref, data, opts = {}) {
    // @ts-ignore
    return updateDoc(docRef(ref), {
        ...data,
        [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
        [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
    });
}
export function deleteDocument(ref) {
    return deleteDoc(docRef(ref));
}
export async function docExists(ref) {
    return (await getDoc(docRef(ref))).exists();
}
