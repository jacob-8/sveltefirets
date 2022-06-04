# SvelteFireTS

- SvelteKit (tested on 1.0.0-next.348)
- Typescript
- Firebase 9.8
- *includes an optional FirebaseAuthUi component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) + Firebase 9 compat via CDN only when component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you needing to manage the authentication forms*

## How to use

Note that this is very much in progress and many options are not yet configurable like offline persistence or metadata additions. This library is set up how I like to use Firebase, but I hope to make this library more configurable over time for those who don't use the same options as I do. Still here's how you can get started with what's available:

- `npm install -D sveltefirets`
- run `initFirebase` with your Firebase config in your root `__layout.svelte`:
```html
<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const firebaseApp = initFirebase(firebaseConfig);
    return { stuff: { firebaseApp } };
  };
</script>
<slot />
``` 
- Technically because `firebase` is a dependency of this package, you may not need to include `firebase` in your package.json to use its methods and types but you probably still should for clarity: `npm install firebase`
- Add the type for `stuff.firebaseApp` prop to your `app.d.t.s` file:
```ts
declare namespace App {
  ...
  interface Stuff {
    firebaseApp: import('firebase/app').FirebaseApp
  }
}
```
- Refer to the [source code](https://github.com/jacob-8/sveltefirets/tree/main/packages/demo) for the [demo app](https://sveltefirets.vercel.app) in `/packages/demo` for usage until better docs are added.

## Developing
- `pnpm i`
- `pnpm dev`

## Inspiration: [Fireship.io](https://fireship.io/)

<img src="static/fireship.png" alt="Firship.io" width="150"/>
<!-- ![Fireship.io](/static/fireship.png) -->

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.

## Offline Persistence Considerations

By design Firebase' `addDoc`, `setDoc`, `updateDoc`, and `deleteDoc` methods (and by extension this library's `add`, `set`, `update`, and `deleteDocument` helper methods) return promises that resolve only once changes are written to the server and NOT the cache. If poor internet or no internet exists, these promises won't resolve. So in a use case where a user with weak internet creates a new item and you write your code to await the addition of the item to the database before navigating to a page where that item can be edited further, nothing will happen and users will be left wondering what is broken with the site. You won't discover this in development because you have great internet! But it could plague you if you are unaware. This is why I've set up this library to also include the equivalent Firestore Lite helpers methods as seen in https://github.com/jacobbowdoin/sveltefirets/blob/main/src/lib/client/firestore-lite.ts#L49 - `addOnline`, `setOnline`, `updateOnline`, and `deleteOnline`.

Further information and useful tips on how to handle online/offline writes:
https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754
https://stackoverflow.com/questions/49818095/firebase-firestore-when-do-promises-from-offline-write-operations-resolve
https://stackoverflow.com/questions/49829714/firebase-firestore-get-document-id-after-adding-data-offline
https://github.com/firebase/firebase-js-sdk/issues/1497
https://firebase.google.com/docs/firestore/manage-data/enable-offline
https://github.com/firebase/firebase-js-sdk/issues/520
https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754#47676754
