# Authentication with FirebaseUi for Web

If you want an extremely easy and battle-tested way to set up auth, consider using the `FirebaseUiAuth` component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) and the Firebase 9 compat library via CDN when the component is mounted.

## Auth Providers

Support a number of Auth providers (of which only Google and Email will actually work in this firebase project - the others require further steps in the Firebase console to be able to use).

[[0-FirebaseUI-for-web.composition]]

## i18n

Supports [42 languages and
dialects](https://github.com/firebase/firebaseui-web/blob/master/LANGUAGES.md) out of the box. We'll show an Arabic example since it's also right-to-left which just works.

[[0-FirebaseUI-for-web.arabic.composition]]

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


[//begin]: # "Autogenerated link references for markdown compatibility"
[0-FirebaseUI-for-web.composition]: 0-FirebaseUI-for-web.composition "0-FirebaseUI-for-web"
[0-FirebaseUI-for-web.arabic.composition]: 0-FirebaseUI-for-web.arabic.composition "0-FirebaseUI-for-web.arabic"
[//end]: # "Autogenerated link references"