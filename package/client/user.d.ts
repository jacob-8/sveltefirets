import type { Unsubscriber } from 'svelte/store';
import type { IBaseUser } from '../interfaces';
export declare const user: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<IBaseUser>, invalidate?: (value?: IBaseUser) => void) => Unsubscriber;
    signOut: () => Promise<void>;
};
