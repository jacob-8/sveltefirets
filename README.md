# SvelteFireTS

[![NPM](https://img.shields.io/npm/v/sveltefirets?color=yellow&label=NPM)](https://www.npmjs.com/package/sveltefirets)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/jacobbowdoin)

- SvelteKit (tested on 1.0.0-next.522)
- Typescript
- Firestore convenience helpers
- Auth store
- SSR ready (for unauthenticated data fetching)
- Firebase 9.12
- *includes an optional FirebaseAuthUi component that brings in [FirebaseUI web](https://github.com/firebase/firebaseui-web) + Firebase 9 compat via CDN only when component shown - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you needing to manage the authentication forms*


## Usage Instructions

[Read the docs](https://sveltefirets.vercel.app/) or
[try editing them as a demo online in Stackblitz](https://stackblitz.com/github/jacob-8/sveltefirets/tree/main/packages/demo)

## Developing
- `pnpm i`
- `pnpm dev`


## Inspiration: [Fireship.io](https://fireship.io/)

Jeff Delaney gets credit for much of SvelteFireTS. I started with [SvelteFire](https://github.com/codediodeio/sveltefire) then added Typescript, borrowed some convenient helpers from Jeff's [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/), and made it work with SvelteKit's SSR + Client situation. If you like what you see here, you should sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for great tutorials.
