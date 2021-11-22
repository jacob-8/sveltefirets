import { CollectionReference, DocumentReference, QueryConstraint } from 'firebase/firestore';
export declare const getUid: () => string;
declare type CollectionPredicate<T> = string | CollectionReference<T>;
declare type DocPredicate<T> = string | DocumentReference<T>;
export declare function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T>;
export declare function docRef<T>(ref: DocPredicate<T>): DocumentReference<T>;
export declare function getCollection<T>(path: CollectionPredicate<T>, queryConstraints?: QueryConstraint[]): Promise<T[]>;
export declare function getDocument<T>(ref: DocPredicate<T>): Promise<T>;
export declare function add<T>(ref: CollectionPredicate<T>, data: T, opts?: {
    abbreviate?: boolean;
}): Promise<DocumentReference<T>>;
export declare function set<T>(ref: DocPredicate<T>, data: T, opts?: {
    abbreviate?: boolean;
    merge?: boolean;
}): Promise<void>;
export declare function update<T>(ref: DocPredicate<T>, data: Partial<T>, opts?: {
    abbreviate?: boolean;
}): Promise<void>;
export declare function deleteDocument<T>(ref: DocPredicate<T>): Promise<void>;
export declare function docExists<T>(ref: DocPredicate<T>): Promise<boolean>;
export {};
