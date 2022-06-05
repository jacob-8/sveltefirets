# sveltefirets

## 0.0.19

- - Removed need to pass Firebase config to `FirebaseUiAuth.svelte` component (and code optimizations)

## 0.0.18

- - Installed version works from both server and client side.
  - Inited firebaseApp no longer needs passed into data retrieving functions server side. Instead, Firebase config must be passed to SvelteFireTS in the root `__layout.svelte` load client side and in `hooks.ts` server side.