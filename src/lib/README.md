# SvelteFireTS

- SvelteKit 
- Typescript
- Firebase 9 beta
- *includes FirebaseUI web + Firebase 8 brought in via CDN only when login modal is opened - FirebaseUI web allows for easy authentication in dozens of languages and many providers without you need to manage the authentication forms - this will be upgraded to use Firebase 9 once it goes GA*

## Inspiration: [Fireship.io](https://fireship.io/)

<img src="static/fireship.png" alt="Firship.io" width="150"/>
<!-- ![Fireship.io](/static/fireship.png) -->

Jeff Delaney gets most of the credit for SvelteFireTS. I started with https://github.com/codediodeio/sveltefire then added Typescript and borrowed some convenient helpers from [Firestore Advanced Usage Angularfire](https://fireship.io/lessons/firestore-advanced-usage-angularfire/). Please sign up at [Fireship.io](https://fireship.io/) and subscribe to the [Fireship Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA) for some great tutorials.

## Usage Examples
- You can see an example of these components and utilities as a whole being used by the [Living Dictionaries](https://github.com/livingtongues/living-dictionaries) web app, a SvelteKit production app. Search the repo for imports from the `$sveltefire` directory.

- Though things have changed, the above mentioned Sveltefire repo where this library was written in Javascript is still useful to get up and running.  

- A setup guide and individual use cases will be detailed out next, but in the meantime you can visit https://modularfirebase.web.app/common-use-cases/firestore/ for good docs on common Firebase 9 use cases (though it's documentation for the Alpha and is possibly out-dated now, it's much more useful than the main Firebase docs for quickly finding use cases)
