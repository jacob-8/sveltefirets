<script>
  import { saveUserData, logOut } from 'sveltefirets';
  import { user } from '$lib/user';
  import Button from 'svelte-pieces/ui/Button.svelte';
</script>

<h1>Account page</h1>
<p>Email link sign in landing example page</p>

{#if $user}
  You are logged in and here is your User document from Firestore:

  <pre>{JSON.stringify($user, null, 1)}</pre>
  <Button form="filled" onclick={logOut}>Log Out</Button>
{:else}
  {#await import('sveltefirets') then { FirebaseUiAuth }}
    <FirebaseUiAuth
      signInWith={{ emailPasswordless: true }}
      on:authresult={(e) => saveUserData(e.detail)} />
  {/await}
{/if}
