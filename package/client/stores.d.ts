import type { CollectionReference, DocumentReference, QueryConstraint } from 'firebase/firestore';
export declare function docStore<T>(path: DocumentReference<T> | string, opts?: {
    log?: boolean;
    traceId?: string;
    startWith?: T;
    maxWait?: number;
    once?: boolean;
}): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<T>, invalidate?: (value?: T) => void) => import("svelte/store").Unsubscriber;
    db: import("@firebase/firestore").Firestore;
    ref: DocumentReference<T>;
    readonly loading: boolean;
    readonly error: any;
};
export declare function collectionStore<T>(path: CollectionReference<T> | string, queryConstraints?: QueryConstraint[], opts?: {
    log?: boolean;
    traceId?: string;
    startWith?: T[];
    maxWait?: number;
    once?: boolean;
    refField?: string;
}): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<T[]>, invalidate?: (value?: T[]) => void) => import("svelte/store").Unsubscriber;
    db: import("@firebase/firestore").Firestore;
    ref: CollectionReference<T>;
    readonly loading: boolean;
    readonly error: any;
    readonly meta: {
        first: any;
        last: any;
    };
};
