# sveltefirets

## 0.0.27

- - Fix broken Firestore Lite methods by getting correct Firestore Lite instance

## 0.0.26

- - Using `providerIds` array instead of `signInMethod` on user object
 
## 0.0.25

- - Fix: User store will initialize immediately after firebase config set. v0.0.24 introduced a bug whereby the User store wouldn't initialize until something else called Firebase into action.
  - Deprecated `updateUserData()` in favor of `saveUserData()` which accepts entire authResult object from FirebaseUi for Web to add `signInMethod` and `emailVerified` fields to the base user object. Correspondingly deprecated the `updateuserdata` event in favor of `authresult` for `FirebaseUiAuth.svelte`.

## 0.0.24

- - Add `continueUrl` prop to `FirebaseUiAuth.svelte` to make passwordless email authentication feasible using a landing page in single-page apps that conditionally load `FirebaseUiAuth` 

## 0.0.21

- - First version where installed package version successfully works from both server and client side when installed in another project.

## 0.0.19

- - Removed need to pass Firebase config to `FirebaseUiAuth.svelte` component (and code optimizations)

## 0.0.18

- - Inited firebaseApp no longer needs passed into data retrieving functions server side. Instead, Firebase config must be passed to SvelteFireTS in the root `__layout.svelte` load client side and in `hooks.ts` server side.