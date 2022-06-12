<script context="module" lang="ts">
  let ui: firebaseui.auth.AuthUI;
  declare const firebaseui: typeof import('./firebaseui');
</script>

<script lang="ts">
  import {
    EmailAuthProvider,
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    PhoneAuthProvider,
    TwitterAuthProvider,
    type User,
  } from 'firebase/auth';
  import { onMount, createEventDispatcher } from 'svelte';
  import { loadScriptOnce, loadStylesOnce } from '../loader';
  import type { LanguageCode } from './languageCodes';
  import { getFirebaseApp } from '../init';
  import type { AuthResult } from '../../interfaces';

  export let languageCode: LanguageCode = 'en';
  export let signInWith: {
    google?: boolean;
    facebook?: boolean;
    twitter?: boolean;
    github?: boolean;
    emailPassword?: boolean;
    emailPasswordless?: boolean;
    phone?: boolean;
    anonymous?: boolean;
  } = { google: true, emailPasswordless: true };
  export let tosUrl: firebaseui.auth.Config['tosUrl'] = undefined; // '.../terms' | () => window.location.assign("your-terms-url");
  export let privacyPolicyUrl: firebaseui.auth.Config['privacyPolicyUrl'] = undefined;
  export let signInSuccessUrl: string = undefined;
  export let continueUrl: string = undefined;
  export let forceSameDevice = false;

  const dispatch = createEventDispatcher<{
    success: string | null;
    updateuserdata: { user: User; isNewUser: boolean }; // deprecated
    authresult: AuthResult;
  }>();
  let uiShown = false;
  let firebaseUiLoaded = false;
  let container: HTMLDivElement;

  onMount(async () => {
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.8.2/firebase-app-compat.js');
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.8.2/firebase-auth-compat.js');
    if (languageCode === 'iw' || languageCode === 'ar') {
      await loadStylesOnce('https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth-rtl.css');
    } else {
      await loadStylesOnce('https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css');
    }
    await loadScriptOnce(
      `https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth__${languageCode}.js`
    );
    firebaseUiLoaded = true;
  });

  let uiConfig: firebaseui.auth.Config;
  $: if (firebaseUiLoaded) {
    uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: AuthResult) => {
          dispatch('updateuserdata', {
            user: authResult.user,
            isNewUser: authResult.additionalUserInfo.isNewUser,
          }); // deprecated in favor of authresult
          dispatch('authresult', authResult);
          dispatch('success', 'auth success');
          return !!signInSuccessUrl; // if  true uses first signInSuccessUrl parameter given in the URL then the default signInSuccessUrl given in config here; if false, page won't redirect automatically
        },
        signInFailure: (error) => {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          return handleUIError(error);
        },
        uiShown: () => (uiShown = true),
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disabling for moment if it makes harder with redirect (is ok if works through popup)
      signInFlow: 'popup',
      signInOptions: [
        signInWith.google && GoogleAuthProvider.PROVIDER_ID,
        signInWith.facebook && FacebookAuthProvider.PROVIDER_ID,
        signInWith.twitter && TwitterAuthProvider.PROVIDER_ID,
        signInWith.github && GithubAuthProvider.PROVIDER_ID,
        signInWith.emailPassword && EmailAuthProvider.PROVIDER_ID,
        signInWith.emailPasswordless && {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          forceSameDevice,
          emailLinkSignIn: () => {
            return {
              url: continueUrl,
            };
          },
        },
        signInWith.phone && PhoneAuthProvider.PROVIDER_ID,
        signInWith.anonymous && firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl,
      tosUrl,
      privacyPolicyUrl,
    };

    initAuthUi();
  }

  function initAuthUi() {
    if (ui) {
      ui.reset();
      ui.start(container, uiConfig);
    } else {
      ui = new firebaseui.auth.AuthUI(getAuth(getFirebaseApp()));
      ui.start(container, uiConfig);
    }
  }

  async function handleUIError(error: firebaseui.auth.AuthUIError): Promise<void> {
    console.error(error);
    window.location.replace('/');
  }
</script>

{#if !uiShown}
  <slot>
    <div>Loading...</div>
  </slot>
{/if}
<div bind:this={container} />
