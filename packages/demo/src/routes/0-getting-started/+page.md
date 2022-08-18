# Getting Started

## Install SvelteFireTS
`npm i -D sveltefirets` or `pnpm add -D sveltefirets`
- Because `firebase` is a dependency of this package, you may not need to include `firebase` in your package.json to use its methods and types but you probably still should for clarity: `npm i -D firebase`

## Add [Firebase Project Config](https://firebase.google.com/docs/web/learn-more#config-object) Via Env Variables
- Add your Firebase config object for the project you use to develop with to a `.env` file in the same folder as `svelte.config.js` as a string:
```
PUBLIC_FIREBASE_CONFIG={"apiKey":"...","authDomain":"YOURPROJECTID.firebaseapp.com","databaseURL":"https://YOURPROJECTID.firebaseio.com","projectId":"YOURPROJECTID","storageBucket":"YOURPROJECTID.appspot.com","messagingSenderId":"...","appId":"...","measurementId":"..."}
```

- SvelteFireTS will use these values the first time it is called to initialize. This will save your client side start time a few moments on pages that don't utilize Firebase if applicable. 

- If needing to access the config values in your site, just `import { firebaseConfig } from 'sveltefirets`;

- Any config placed into your hosting provider's env variables (e.g. Vercel) under the `PUBLIC_FIREBASE_CONFIG` key will automatically override these and allow for easy use of different projects between dev and production.
- *If wanting to share config between projects in a monorepo set the [`envDir`](https://vitejs.dev/config/#envdir) property in your `vite.config.js` to `../../` and place the `.env` file in the repo root.*


## Next Steps

**You are ready to use SvelteFireTS in any manner described in these docs!** 
