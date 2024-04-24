# SvelteFireTS

**April 2024 Status Update:** I still use this library in production and it's very useful, but I've moved on to using Supabase by and large. Because this library is stable, because the original [SvelteFire](https://github.com/codediodeio/sveltefire) gets a few updates here and there, and because I'm not expanding my use of Firebase, most active development has ceased. But it works great in SvelteKit 2 and Svelte 4. My recommendation is to [read the docs](https://sveltefirets.vercel.app/), [read the code](https://github.com/jacob-8/sveltefirets), [read Jeff's code](https://github.com/codediodeio/sveltefire), then copy what you need and hone it to your use case. You'll be a better developer for it. 

As I've progressed in my understanding of how to use SvelteKit well, I've learned that it will make component design and mocking (I use [Kitbook](https://kitbook.vercel.app/)) much easier if you establish backend connections in the layout/page ts files and pass data and mutation operations to components via the page data prop. So that is why I say write your own. I presently no longer use the `<Doc>` and `<Collection>` components but solely lean on the `getDoc`, `getCollection`, `docStore` and `collectionStore` methods for this reason.

----

[![NPM](https://img.shields.io/npm/v/sveltefirets?color=yellow&label=NPM)](https://www.npmjs.com/package/sveltefirets)

Easily use [Firebase](https://firebase.google.com/docs) in Svelte. Built for **[SvelteKit 2.0+](https://kit.svelte.dev/)** but it could be used with any Svelte framework.

- SvelteKit (tested on 2.5.1)
- Typescript
- Firestore convenience helpers
- Auth store
- SSR ready (for unauthenticated data fetching)
- Firebase (tested on 10.9.0)
- *includes an optional FirebaseAuthUi component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) + Firebase 10 compat via CDN only when component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you needing to manage the authentication forms*

<!-- Kitbook Skip -->

## Usage Instructions

[Read the docs](https://sveltefirets.vercel.app/)

<!-- Kitbook Skip End -->

## Open to Contributions

If there are any configuration settings or features you'd like to see added please [create an issue](https://github.com/jacob-8/sveltefirets/issues/new) to start a discussion about features you'd like. After discussion, hopefully you can add a pull request to implement such.

Note that the `set` helper method which automatically is either an `update` or a `set` depending on whether a document exists should really be renamed to `upsert` in order to make `set` more closely resemble Firestore's `setDoc`.

## Developing
- `pnpm install`
- `pnpm dev`

## Inspiration: [Fireship.io](https://fireship.io/)

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.
