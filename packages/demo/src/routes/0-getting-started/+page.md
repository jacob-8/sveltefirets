# Getting Started

## Install SvelteFireTS
`npm i -D sveltefirets` or `pnpm add -D sveltefirets`
- Because `firebase` is a dependency of this package, you may not need to include `firebase` in your package.json to use its methods and types but you probably still should for clarity: `npm i -D firebase`

## Add [Firebase Project Config](https://firebase.google.com/docs/web/learn-more#config-object)

### Option 1: Easy Method
Create a `firebaseConfig.ts` file in your `lib` directory that exports your config:
```ts
export const firebaseConfig = {
  apiKey: '...',
  authDomain: 'YOURPROJECTID.firebaseapp.com',
  databaseURL: 'https://YOURPROJECTID.firebaseio.com',
  projectId: 'YOURPROJECTID',
  storageBucket: 'YOURPROJECTID.appspot.com',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};
```

### Option 2: Use Env Variables
If using different firebase projects for different environments (e.g. dev vs. prod), add the config object for the project you use to develop with to a `.env` file in the same folder as `svelte.config.js` as a string:
```
VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"YOURPROJECTID.firebaseapp.com","databaseURL":"https://YOURPROJECTID.firebaseio.com","projectId":"YOURPROJECTID","storageBucket":"YOURPROJECTID.appspot.com","messagingSenderId":"...","appId":"...","measurementId":"..."}
```
and set up your `firebaseConfig.ts` file like this:
```ts
import type { FirebaseOptions } from 'firebase/app';
export let firebaseConfig: FirebaseOptions = {};
const envFirebaseConfigValue = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string) as FirebaseOptions;
if (envFirebaseConfigValue.projectId) {
  firebaseConfig = envFirebaseConfigValue;
} else {
  throw Error('VITE_FIREBASE_CONFIG is not set.');
}
```

- Any config placed into your hosting provider's env variables (e.g. Vercel) under the `VITE_FIREBASE_CONFIG` key will automatically override these and allow for easy use of different projects between dev and production.
- *If wanting to share config between projects in a monorepo set the [`envDir`](https://vitejs.dev/config/#envdir) property in your `vite.config.js` to `../../` and place the `.env` file in the repo root.*

## Pass Firebase Config to SvelteFireTS

### Client Side

Run `setConfig` with your Firebase Config object in your root layout(s) load file, usually `src/routes/+layout.ts`:

```ts
import { setConfig } from 'sveltefirets';
import { firebaseConfig } from '$lib/firebaseConfig';
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = () => {
  setConfig(firebaseConfig);
  return {};
};
```

### Server Side

Run `setConfig` with your Firebase Config object like this in `hooks.ts`:

```ts
import { setConfig } from 'sveltefirets';
import { firebaseConfig } from '$lib/firebaseConfig';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  setConfig(firebaseConfig);
  const response = await resolve(event);
  return response;
};
```

This ensures that before any data is fetched from an endpoint, SvelteFireTS will have the proper configuration to init Firebase with.

## Next Steps

**You are ready to use SvelteFireTS in any manner described in these docs!** 

*Note that the `setConfig` method used above does not initialize Firebase but rather makes the cofiguration available to SvelteFireTS. Firebase will be initialized the first time it is needed, thus saving your client side start time a few moments on pages that don't utilize Firebase if you have any. If you have sitewide authentication then this is a moot point.*