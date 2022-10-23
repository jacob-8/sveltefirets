# SvelteFireTS

<img src="https://img.shields.io/npm/v/sveltefirets?color=000000&label=">

[Try it in Stackblitz!](https://stackblitz.com/github/jacob-8/sveltefirets/tree/main/packages/demo)

Easily use [Firebase](https://firebase.google.com/docs) ([9.12](https://firebase.google.com/support/release-notes/js) currently) in a declarative manner. Built for **[SvelteKit](https://kit.svelte.dev/)** (tested on [1.0.0-next.522](https://github.com/sveltejs/kit/releases) and Vercel) but it could be used with any Svelte framework. Spun off of [SvelteFire](https://github.com/codediodeio/sveltefire), the primary additions here are: 
- Typescript
- Firestore convenience helpers
- Auth store
- SSR ready (for unauthenticated data fetching)
- [FirebaseUI for Web](https://firebase.google.com/docs/auth/web/firebaseui) (optional) - to allow for easy authentication in dozens of languages and many providers without needing to manage the authentication forms.

## Open to Contributions

If there are any configuration settings or features you'd like to see added please [create an issue](https://github.com/jacob-8/sveltefirets/issues/new) to start a discussion about features you'd like. After discussion, hopefully you can add a pull request to implement such.

This library has been used in production by multiple applications for a long time and is ready for use, but before releasing 1.0, the `set` helper method which automatically is either an `update` or a `set` depending on whether a document exists should be renamed to `upsert` in order to make `set` more closely resemble Firestore's `setDoc`.

Post 1.0, it would be good to add the rest of [SvelteFire](https://github.com/codediodeio/sveltefire)'s helper components (upload, etc) to make this a true superset library.

## Inspiration: [Fireship.io](https://fireship.io/)

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.

