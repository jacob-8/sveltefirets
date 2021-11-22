import { SvelteComponentTyped } from "svelte";
import type { CollectionReference, QueryConstraint } from 'firebase/firestore';
declare class __sveltets_Render<T> {
    props(): {
        path: string | CollectionReference<T>;
        queryConstraints?: QueryConstraint[];
        traceId?: string;
        log?: boolean;
        startWith?: T[];
        maxWait?: number;
        once?: boolean;
        refField?: string;
    };
    events(): {
        ref: CustomEvent<{
            ref: CollectionReference<T>;
        }>;
        data: CustomEvent<{
            data: T[];
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        before: {};
        default: {
            data: T[];
            ref: CollectionReference<T>;
            error: any;
            first: any;
            last: any;
        };
        loading: {};
        fallback: {};
        after: {};
    };
}
export declare type CollectionProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export declare type CollectionEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export declare type CollectionSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Collection<T> extends SvelteComponentTyped<CollectionProps<T>, CollectionEvents<T>, CollectionSlots<T>> {
}
export {};
