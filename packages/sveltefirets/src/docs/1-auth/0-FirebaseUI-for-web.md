<script lang="ts">
  import { logOut, FirebaseUiAuth, saveUserData } from 'sveltefirets';
  import { user } from '../../routes/demo/user';
  import { Story } from 'kitbook';
  import Button from 'svelte-pieces/ui/Button.svelte';
</script>

<!-- prettier-ignore -->
# Authentication with FirebaseUi for Web

If you want an extremely easy and battle-tested way to set up auth, consider using the `FirebaseUiAuth` component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) and the Firebase 9 compat library via CDN when the component is mounted.

## Auth Providers

Support a number of Auth providers (of which only Google and Email will actually will in this firebase project - the authors require further steps in the Firebase console to be able to use).

<Story name="Adjust Providers" knobs={{google: true, facebook: false, twitter: false, github: false, emailPassword: false, emailPasswordless: true, phone: false, anonymous: false}} let:props>
  {#if $user}
    You are logged in and here is your User document from Firestore:
  
    <pre>{JSON.stringify($user, null, 1)}</pre>
    <Button form="filled" onclick={logOut}>Log Out</Button>
  {:else}
    <FirebaseUiAuth
      signInWith={props}
      on:authresult={(e) => saveUserData(e.detail)} />
  {/if}
</Story>

## i18n

Supports [42 languages and
dialects](https://github.com/firebase/firebaseui-web/blob/master/LANGUAGES.md) out of the box.

<Story name="Spanish (es)">
  {#if $user}
    You are logged in and here is your User document from Firestore:
  
    <pre>{JSON.stringify($user, null, 1)}</pre>
    <Button form="filled" onclick={logOut}>Log Out</Button>
  {:else}
    <FirebaseUiAuth
      languageCode={'es'}
      signInWith={{ google: true, emailPasswordless: true }}
      on:authresult={(e) => saveUserData(e.detail)} />
    {/if}
</Story>

<Story name="Arabic (ar) - right-to-left">
  {#if $user}
    You are logged in and here is your User document from Firestore:
  
    <pre>{JSON.stringify($user, null, 1)}</pre>
    <Button form="filled" onclick={logOut}>Log Out</Button>
  {:else}
    <FirebaseUiAuth
      languageCode={'ar'}
      signInWith={{ google: true, emailPasswordless: true }}
      on:authresult={(e) => saveUserData(e.detail)} />
    {/if}
</Story>

If you simply add the `<FirebaseUiAuth />` component to your page, you'll receive the English version with Google and Email sign in options (they'll only work if you've enabled them in your Firebase Console of course).

## Customize

If you would like to change languages, sign in methods, or receive the user data back from Firebase upon login to be able to save in your database (Firestore or elsewhere), then the following example will help:

```svelte
<script lang="ts">
  import { FirebaseUiAuth, saveUserData } from 'sveltefirets';
</script>

<FirebaseUiAuth
  languageCode={'es'}
  signInWith={{ google: true, emailPasswordless: true, anonymous: true }}
  on:authresult={(e) => saveUserData(e.detail)} />
```
At present the other exposed props are `tosUrl` (terms of service url), `privacyPolicyUrl`, `signInSuccessUrl` (not needed if using the `updateduserdata` and `success` events) and `continueUrl` and `forceSameDevice` will only apply to `emailPasswordless` login (see that recipe for more info). If you need further customization, create a PR or just copy the `FirebaseUiAuth` component into your own project and adjust as needed.

## Save User to Firestore

The `saveUserData` method seen above will save your user's data to a `users` collection in Firestore and will add a `createdAt` timestamp for new users or `updatedAt` and `lastVisit` timestamps for returning users.

## Other Ideas

- Anyone is welcome to contribute a PR that adds an example explaining how to easily add and enable one-tap sign-up: https://github.com/firebase/firebaseui-web#one-tap-sign-up