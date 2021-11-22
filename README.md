# SvelteFireTS

- SvelteKit 
- Typescript
- Firebase 9
- *includes FirebaseUI web + Firebase 8 brought in via CDN only when login component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you need to manage the authentication forms - this will be upgraded to use Firebase 9 once it goes GA*

## How to use

Note that this is very much in progress and only works on the client but prepares the stage to work also on the server. Still here's how you can get started:

- `npm install -D sveltefirets`
- add to your `svelte.config.js` file:
```
kit: { 
	vite: {
		ssr: {
			noExternal: ['sveltefirets']
		}
	}
}
```
- initFirebase in your root layout.svelte:
```
<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from './firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    initFirebase(firebaseConfig);
    return {};
  };
</script>
``` 
- Refer to the demo app in `/src` for further implementation until I add docs.

## Inspiration: [Fireship.io](https://fireship.io/)

<img src="static/fireship.png" alt="Firship.io" width="150"/>
<!-- ![Fireship.io](/static/fireship.png) -->

Jeff Delaney gets most of the credit for SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript and borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/). If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.

## Developing
- `npm i`
- `npm run package`
- `npm run dev`

## Offline Persistence Considerations

By design addDoc(), setDoc(), updateDoc(), and deleteDoc() return promises that are only resolved once changes are written to the server. If poor internet or no internet exists, these promises won't resolve. So in a use case where a user creates a new item and you await the addition of the item to the database before navigating to a page where that item can be edited further, nothing will happen and users will be left wondering what is broken with the site.

Further information and useful tips on how to handle online/offline writes:
https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754
https://stackoverflow.com/questions/49818095/firebase-firestore-when-do-promises-from-offline-write-operations-resolve
https://stackoverflow.com/questions/49829714/firebase-firestore-get-document-id-after-adding-data-offline
https://github.com/firebase/firebase-js-sdk/issues/1497
https://firebase.google.com/docs/firestore/manage-data/enable-offline
https://github.com/firebase/firebase-js-sdk/issues/520
https://stackoverflow.com/questions/47674341/firestore-offline-promise-handling/47676754#47676754