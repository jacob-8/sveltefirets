<script lang="ts">
  import { getAuth, signInAnonymously } from '@firebase/auth';
  import { createUserStore, logOut } from 'sveltefirets';
  import { user } from './user';
</script>

<h2>Authentication</h2>

{#if $user}
  <pre>{JSON.stringify($user, null, 1)}</pre>
  <button type="button" on:click={logOut}>Log Out</button>
{:else}
  <button
    type="button"
    on:click={() => {
      const auth = getAuth();
      signInAnonymously(auth);
    }}>Log In Anonymously</button>
{/if}

<button
  type="button"
  on:click={() => {
    const u = createUserStore('key');
    u.subscribe((user) => {
      console.log(user);
    });
  }}>Create user store</button>
