import { SvelteComponentTyped } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        log?: boolean;
        startWith?: T[];
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        before: {};
        default: {
            data: T[];
            ref: any;
            error: boolean;
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
