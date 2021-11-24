# SvelteFireTS

- SvelteKit (tested on 1.0.0-next.196)
- Typescript
- Firebase 9.5
- *includes an optional FirebaseAuthUi component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) + Firebase 9 compat via CDN only when component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you needing to manage the authentication forms*

## How to use

Note that this is very much in progress and only works on the client but prepares the stage to work also on the server. Many options are not configurable like offline persistence or metadata additions. This is how I like to use Firebase, but I hope to make this library more configurable over time for those who don't use the same options as I do. Still here's how you can get started with what's available:

- `npm install -D sveltefirets`
- configure the package to play nice with Vite in your `svelte.config.js` file:
```js
kit: { 
	vite: {
		ssr: {
			noExternal: ['sveltefirets']
		}
	}
}
```
- run the `initFirebase` method with your Firebase config in your root `__layout.svelte`:
```html
<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    initFirebase(firebaseConfig);
    return {};
  };
</script>
<slot />
``` 
- Refer to the demo app in `/src` (try it out at https://sveltefirets.vercel.app) for further implementation until I add docs.

## Inspiration: [Fireship.io](https://fireship.io/)

<img src="static/fireship.png" alt="Firship.io" width="150"/>
<!-- ![Fireship.io](/static/fireship.png) -->

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.

## Developing
- `npm i`
- `npm run package`
- `npm run dev`

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
