/// <reference types="@sveltejs/kit" />

import type { FirebaseApp } from 'firebase/app';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	interface Stuff {
		firebaseApp: FirebaseApp
	}
}
