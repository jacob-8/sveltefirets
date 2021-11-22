import { SvelteComponentTyped } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        log?: boolean;
        startWith?: T;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        before: {};
        default: {
            data: T;
            ref: any;
            error: boolean;
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
