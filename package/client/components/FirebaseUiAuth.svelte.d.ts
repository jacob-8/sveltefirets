import { SvelteComponentTyped } from "svelte";
declare const firebaseui: typeof import('./firebaseui');
declare global {
    interface Window {
        firebase: any;
    }
}
import type { User } from 'firebase/auth';
declare const __propDef: {
    props: {
        tosUrl?: firebaseui.auth.Config['tosUrl'];
        privacyPolicyUrl?: firebaseui.auth.Config['privacyPolicyUrl'];
    };
    events: {
        close: CustomEvent<string>;
        updateuserdata: CustomEvent<{
            user: User;
            isNewUser: boolean;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type FirebaseUiAuthProps = typeof __propDef.props;
export declare type FirebaseUiAuthEvents = typeof __propDef.events;
export declare type FirebaseUiAuthSlots = typeof __propDef.slots;
export default class FirebaseUiAuth extends SvelteComponentTyped<FirebaseUiAuthProps, FirebaseUiAuthEvents, FirebaseUiAuthSlots> {
}
export {};
