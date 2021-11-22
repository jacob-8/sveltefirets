import { CollectionReference, DocumentReference } from 'firebase/firestore/lite';
declare type CollectionPredicate<T> = string | CollectionReference<T>;
declare type DocPredicate<T> = string | DocumentReference<T>;
export declare function addOnline<T>(ref: CollectionPredicate<T>, data: T, opts?: {
    abbreviate?: boolean;
}): Promise<DocumentReference<T>>;
export declare function setOnline<T>(ref: DocPredicate<T>, data: T, opts?: {
    abbreviate?: boolean;
    merge?: boolean;
}): Promise<void>;
export declare function updateOnline<T>(ref: DocPredicate<T>, data: Partial<T>, opts?: {
    abbreviate?: boolean;
}): Promise<void>;
export declare function deleteDocumentOnline<T>(ref: DocPredicate<T>): Promise<void>;
export {};
