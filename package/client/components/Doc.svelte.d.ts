import { SvelteComponentTyped } from "svelte";
import type { DocumentReference } from 'firebase/firestore';
declare class __sveltets_Render<T> {
    props(): {
        path: string | DocumentReference<T>;
        log?: boolean;
        traceId?: string;
        startWith?: T;
        maxWait?: number;
        once?: boolean;
    };
    events(): {
        ref: CustomEvent<{
            ref: DocumentReference<T>;
        }>;
        data: CustomEvent<{
            data: T;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        before: {};
        default: {
            data: T;
            ref: DocumentReference<T>;
            error: any;
        };
        loading: {};
        fallback: {};
        after: {};
    };
}
export declare type DocProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export declare type DocEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export declare type DocSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Doc<T> extends SvelteComponentTyped<DocProps<T>, DocEvents<T>, DocSlots<T>> {
}
export {};
