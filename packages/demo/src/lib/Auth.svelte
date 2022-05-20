<script lang="ts">
  import { getAuth, signInAnonymously } from '@firebase/auth';
  import { logOut, FirebaseUiAuth, updateUserData } from 'sveltefirets';
  import { firebaseConfig } from './firebaseConfig';
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
  <p>
    Or use FirebaseUI for Web for easy auth. It also includes support for 42 languages and dialects
    out of the box. Spanish is demoed here and you can also try English and Arabic.
  </p>
  <button on:click={() => window.open('/en')}>Go to English Auth</button>
  <button on:click={() => window.open('/ar')}>Go to Arabic Auth (RTL)</button>
  <FirebaseUiAuth
    languageCode="es"
    signInWith={{ google: true, emailPasswordless: true, anonymous: true }}
    {firebaseConfig}
    on:updateuserdata={(e) => updateUserData(e.detail.user, e.detail.isNewUser)} />
{/if}
