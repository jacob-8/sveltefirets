<script context="module" lang="ts">
  let ui: firebaseui.auth.AuthUI;
  declare const firebaseui: typeof import('./firebaseui');
  declare global {
    interface Window {
      firebase: any;
    }
  }
</script>

<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import { onMount } from 'svelte';
  import { loadScriptOnce, loadStylesOnce } from './helpers/loader';
  import { firebaseConfig } from '$sveltefire/config';
  import { updateUserData } from '$sveltefire/helpers/updateUserData';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let context: 'force' = undefined;

  let loading = true;
  let container: HTMLDivElement;

  onMount(async () => {
    await loadScriptOnce('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
    await loadScriptOnce('https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js');
    if (window && window.firebase && window.firebase.apps && window.firebase.apps.length === 0) {
      window.firebase.initializeApp(firebaseConfig);
    }
    await loadStylesOnce('https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css');
    await loadScriptOnce('https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js');
    initAuthUi();
  });

  function initAuthUi() {
    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          const user = authResult.user;
          // var credential = authResult.credential;
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          // const providerId = authResult.additionalUserInfo.providerId; // password or google.com
          // var operationType = authResult.operationType; //signIn
          updateUserData(user, isNewUser);
          dispatch('close', {
            text: 'auth success',
          });

          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function (error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          return handleUIError(error);
        },
        uiShown: function () {
          // The widget is rendered.
          loading = false;
        },
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disabling for moment if it makes harder with redirect (is ok if works through popup)
      signInFlow: 'popup',
      // signInSuccessUrl: "<url-to-redirect-to-on-success>",
      signInOptions: [
        window.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID // add Flag CSS back if using phone auth
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // tosUrl: '.../terms',
      // privacyPolicyUrl: function() {
      //   window.location.assign("your-privacy-policy-url");
      // }
    };

    if (ui) {
      ui.reset();
      ui.start(container, uiConfig);
    } else {
      ui = new firebaseui.auth.AuthUI(window.firebase.auth());
      ui.start(container, uiConfig);
    }
  }

  async function handleUIError(error: firebaseui.auth.AuthUIError): Promise<void> {
    console.error(error);
    window.location.replace('/');
  }
</script>

<Modal on:close>
  <span slot="heading">Sign In</span>
  {#if context === 'force'}
    <h4 class="text-lg text-center">Please create an account to continue.</h4>
  {/if}

  {#if loading}
    <div>Loading...</div>
  {/if}
  <div bind:this={container} />
</Modal>
