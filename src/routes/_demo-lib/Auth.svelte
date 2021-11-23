<script lang="ts">
  import { getAuth, signInAnonymously } from '@firebase/auth';
  import { logOut, FirebaseUiAuth, updateUserData } from 'sveltefirets';
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
    }}>Log In Anonymously using just Firebase</button>
  <hr />
  <p>Or use FirebaseUI for Web:</p>
  <FirebaseUiAuth
    on:close
    on:updateuserdata={(e) => updateUserData(e.detail.user, e.detail.isNewUser)} />
{/if}
