<script lang="ts">
  import { logOut, FirebaseUiAuth, saveUserData } from 'sveltefirets';
  import { user } from '$lib/user';
  import { Story } from 'kitbook';
  import Button from 'svelte-pieces/ui/Button.svelte';
</script>

{#if $user}
  You are logged in and here is your User document from Firestore:

  <pre>{JSON.stringify($user, null, 1)}</pre>
  <Button form="filled" onclick={logOut}>Log Out</Button>
{:else}
  Refresh to see the proper language:

  <Story name="Arabic">
    <FirebaseUiAuth
      languageCode={'ar'}
      signInWith={{ google: true, emailPasswordless: true }}
      on:authresult={(e) => saveUserData(e.detail)} />
  </Story>
{/if}
