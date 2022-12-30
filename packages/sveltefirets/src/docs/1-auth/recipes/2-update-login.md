<script lang="ts">
  import { verifyBeforeUpdateEmail, getAuth } from 'firebase/auth';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { user } from '$lib/user';
  import { FirebaseUiAuth, saveUserData } from 'sveltefirets';
</script>

<!-- prettier-ignore -->
# Update Login

- Note that the below code can't be used to change providers, so if a user uses Google to login they can only change to another Google email. You must verify they are changing to a Google managed email before proceeding. One option is to check the `user.providerIds` array beforehand if you utilize the `saveUserData` method of this library.

```svelte
<script lang="ts">
  import { verifyBeforeUpdateEmail, getAuth } from 'firebase/auth';
</script>
<button type="button" on:click={() => {
  const newEmail = prompt('Whats the new email?');
  if (newEmail) {
    const auth = getAuth();
    const user = auth.currentUser;
    verifyBeforeUpdateEmail(user, newEmail, { url: 'https://sveltefirets.vercel.app/account' });
  }
}}>Update Email</button>
```

<div class="not-prose">
  {#if $user}
    <Button
      onclick={() => {
        try {
          const newEmail = prompt('Whats the new email?');
          if (newEmail) {
            const auth = getAuth();
            const firebase_user = auth.currentUser;
            verifyBeforeUpdateEmail(firebase_user, newEmail, { url: 'https://sveltefirets.vercel.app/account' });
          }
        } catch (e) {
          alert(e)
        }
      }}>Update Email from {$user.email}</Button>
  {:else}
    You must first sign in to try it:
    <FirebaseUiAuth on:authresult={(e) => saveUserData(e.detail)} />
  {/if}
</div>

- See [verifyBeforeUpdateEmail() docs](https://firebase.google.com/docs/reference/js/v8/firebase.User#verifybeforeupdateemail) to learn about the possible errors that you should be catching.
- See https://firebase.google.com/docs/auth/web/account-linking to learn how to link accounts (add a new sign in method instead of change the email for a particular one)

