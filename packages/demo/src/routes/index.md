# SvelteFireTS

<img src="https://img.shields.io/npm/v/sveltefirets?color=000000&label=">

Easily use [Firebase](https://firebase.google.com/docs) ([9.9](https://firebase.google.com/support/release-notes/js) currently) in a declarative manner. Built for **[SvelteKit](https://kit.svelte.dev/)** (tested on [1.0.0-next.391](https://github.com/sveltejs/kit/releases) and Vercel) but it could be used with any Svelte framework. Spun off of [SvelteFire](https://github.com/codediodeio/sveltefire), the primary additions here are: 
- Typescript
- SSR ready
- [FirebaseUI for Web](https://firebase.google.com/docs/auth/web/firebaseui) (optional) - to allow for easy authentication in dozens of languages and many providers without needing to manage the authentication forms.

## Work in Progress

Note that this is very much in progress and many options are not yet configurable like offline persistence (forced opt-in) or metadata additions. This library is set up how I like to use Firebase, but I hope to make this library more configurable over time for those who don't use the same options as I do. Please [create an issue](https://github.com/jacob-8/sveltefirets/issues/new) to start a discussion about features you'd like.

## Inspiration: [Fireship.io](https://fireship.io/)

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.

