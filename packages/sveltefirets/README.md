# SvelteFireTS

[![NPM](https://img.shields.io/npm/v/sveltefirets?color=yellow&label=NPM)](https://www.npmjs.com/package/sveltefirets)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/jacobbowdoin)

[Try in Stackblitz!](https://stackblitz.com/github/jacob-8/sveltefirets/tree/main/packages/demo) or [Read the docs](https://sveltefirets.vercel.app/)

Easily use [Firebase](https://firebase.google.com/docs) ([9.15](https://firebase.google.com/support/release-notes/js) currently) in a declarative manner. Built for **[SvelteKit 1.0+](https://kit.svelte.dev/)** but it could be used with any Svelte framework.

- Typescript
- Firestore convenience helpers
- Auth store
- SSR ready (for unauthenticated data fetching)
- *includes an optional FirebaseAuthUi component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) + Firebase 9 compat via CDN only when component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you needing to manage the authentication forms*

## Open to Contributions

If there are any configuration settings or features you'd like to see added please [create an issue](https://github.com/jacob-8/sveltefirets/issues/new) to start a discussion about features you'd like. After discussion, hopefully you can add a pull request to implement such.

This library has been used in production by multiple applications for a long time and is ready for use, but before releasing 1.0, the `set` helper method which automatically is either an `update` or a `set` depending on whether a document exists should be renamed to `upsert` in order to make `set` more closely resemble Firestore's `setDoc`.

Post 1.0, it would be good to add the rest of [SvelteFire](https://github.com/codediodeio/sveltefire)'s helper components (upload, etc) to make this a true superset library.

## Developing
- `pnpm i`
- `pnpm dev`

## Inspiration: [Fireship.io](https://fireship.io/)

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.
