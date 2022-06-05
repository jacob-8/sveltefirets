# Getting Started

## Add [Firebase Project Config](https://firebase.google.com/docs/web/learn-more#config-object) to `.env` file as a string
```
VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"YOURPROJECTID.firebaseapp.com","databaseURL":"https://YOURPROJECTID.firebaseio.com","projectId":"YOURPROJECTID","storageBucket":"YOURPROJECTID.appspot.com","messagingSenderId":"...","appId":"...","measurementId":"..."}
```
- Replace each value with your own.
- The `.env` file lives alongside your `svelte.config.js` but you can place it elsewhere (useful for sharing in a monorepo) by setting [`config.kit.vite.envDir`](https://vitejs.dev/config/#envdir) to `../../` for example.
- Values placed into your hosting provider's env variables (e.g. Vercel) will override these and allow for easy use of different projects between dev and production.

### Make your config available to Sveltefirets on the server

If using Vercel or any Node based hosting provider you can add the config to `process.env` like this in `hooks.ts`:

```js
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  process.env.FIREBASE_CONFIG = import.meta.env.VITE_FIREBASE_CONFIG;
  const response = await resolve(event);
  return response;
};
```

Not researched yet, but if using Cloudflare Workers, you may be able to put in your wrangler.toml the following: `FIREBASE_CONFIG = "..."` as per [this](https://developers.cloudflare.com/workers/platform/environment-variables). See [this](https://community.cloudflare.com/t/how-can-i-read-environment-variable-dynamically/353207) also. Probably not needed, but `process.env.FIREBASE_CONFIG` in the above `hooks.ts` code may need to be `self.FIREBASE_CONFIG` or `global.FIREBASE_CONFIG`.

### Set global variable client side in root __layout.svelte file, then Firebase will be inited only when needed

## Next

- `npm install -D sveltefirets`
- add `initFirebase` with your Firebase config in your root `__layout.svelte`:
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