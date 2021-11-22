// Use when wanting to receive back promises that will resolve or error when internet is flaky, unlike regular firestore methods which won't resolve right away in these situations. See notes in Readme.md for more info.
// NOTE: Be sure to import your firestore methods such as serverTimestamp() from firebase/firestore/lite otherwise you will receive errors
import { getFirestore, collection, doc, getDoc, addDoc, setDoc, deleteDoc, updateDoc, serverTimestamp, } from 'firebase/firestore/lite';
import { get } from 'svelte/store';
import { user } from './user';
const getUid = () => {
    const u = get(user);
    return (u && u.uid) || 'anonymous'; // 'anonymous' allows support messages to be saved by non-logged-in users
};
function colRef(ref) {
    const db = getFirestore();
    return typeof ref === 'string' ? collection(db, ref) : ref;
}
function docRef(ref) {
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
async function getDocument(ref) {
    const docSnap = await getDoc(docRef(ref));
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
}
export function addOnline(ref, data, opts = {}) {
    return addDoc(colRef(ref), {
        ...data,
        [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
        [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
        [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
        [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
    });
}
export async function setOnline(ref, data, opts = {}) {
    const snap = await getDocument(ref);
    return await (snap
        ? updateOnline(ref, data)
        : setDoc(docRef(ref), {
            ...data,
            [opts.abbreviate ? 'ca' : 'createdAt']: serverTimestamp(),
            [opts.abbreviate ? 'cb' : 'createdBy']: getUid(),
            [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
            [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
        }, { merge: opts.merge }));
} // could split apart into set and upsert if desired, https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update
export async function updateOnline(ref, data, opts = {}) {
    // @ts-ignore
    return updateDoc(docRef(ref), {
        ...data,
        [opts.abbreviate ? 'ua' : 'updatedAt']: serverTimestamp(),
        [opts.abbreviate ? 'ub' : 'updatedBy']: getUid(),
    });
}
export function deleteDocumentOnline(ref) {
    return deleteDoc(docRef(ref));
}
