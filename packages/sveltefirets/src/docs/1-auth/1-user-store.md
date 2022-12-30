
## Create User store

If you utilize `saveUserData` as shown in the previous page: [FirebaseUi for Web](/1-auth/0-FirebaseUI-for-web), then you can eaily create a user store (automatically persisted in local storage, and minimally in cookies) to be used across your application like this:

```ts
import { createUserStore, firebaseConfig, type IBaseUser } from 'sveltefirets';

export interface IUser extends IBaseUser {
  theme: string; // whatever custom properties your project has
}

export const user = createUserStore<IUser>({
  userKey: `${firebaseConfig.projectId}_firebase_user`,
  log: true,
});
```

Both of those parameters are optional and you could just do `export const user = createUserStore<IUser>();` If you develop multiple firebase projects on the same port it's nice to specify the `userKey` as that avoids localStorage cache confusion.

### How to know when Firebase Auth is still loading

Sometimes you would like to wait for Auth to finish loading before showing user content or a login component. On a slow connection, it can be disorienting to see a login component when you are already authenticated. We can use the `user` store created in the last example and check the `authState` store like this:

```svelte
<script>
  import { authState } from 'sveltefirets';
  import { user } from '$lib/user';
</script>

{#if $authState !== undefined}
  {#if $user}
     User authenticated
  {:else}
     <LoginComponent />
  {/if}
{:else}
  Loading auth...
{/if}
```

### Using cookies to eliminate the need to wait for Firebase Auth

If you don't like showing a loading state until Firebase Auth inits nor do you like FOUS (flash of unauthenticated state) for display elements like a user menu in your header, there is a good option for you. On log in SvelteFireTS automatically sets a minimal user cookie containing the `uid`, `displayName`, `email`, and `photoURL` values. This cookie is removed on log out. The following code is an example of how the cookie data could be used to set a user property in your page data that will be used until Firebase Auth finishes initing:

```ts
// +layout.server.ts
import type { IUser } from '$lib/user';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ cookies, request }) => {
  return {
    user: JSON.parse(cookies.get('user') || null) as IUser, // this is brief for demonstration; use a try-catch block to catch errors in actual usage
  };
};

// +layout.ts
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async ({ data }) => {
  return {
    user: data.user,
  };
};
```

```svelte
<!-- Foo.svelte -->
<script>
  import { page } from '$app/stores';
  import { authState } from 'sveltefirets';
  import { user as userStore } from '$lib/user';
  $: user = $userStore || (authState === undefined && $page.data?.user) || null; 
  // only use page data set from the cookie before authState has been inited so that when a user logs out, the user value here doesn't fall back to the page data  value initially set by the cookie. Even though the cookie is cleared on logout, the page data is not updated.
</script>
{user?.email}
```

The user cookie set by SvelteFireTS should **NOT** be used in conjunction with Firebase Admin on your backend as there's nothing secure about it. It's purely to aid in optimistic UI display before the client app hydrates. Please see Firebase docs and other libraries like https://github.com/ManuelDeLeon/sveltekit-firebase-ssr if you'd like to set up authenticated server-side data fetching. This library only serves to fetch data server side that is readable by anyone. If you find innovations in other libraries that you think would play nicely with what you see here, please feel free to add an issue and submit a PR!