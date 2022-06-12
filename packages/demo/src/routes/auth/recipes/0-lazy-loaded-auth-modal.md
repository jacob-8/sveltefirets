## Lazy Loaded Auth Modal Recipe

Here's a simple way to achieve user login, say via a button in a header component. First create an `AuthModal` component that utilizes `FirebaseUiAuth`:

```svelte
<script lang="ts">
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import { FirebaseUiAuth, saveUserData } from 'sveltefirets';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    close: boolean;
  }>();
</script>

<Modal on:close>
  <span slot="heading">Sign In</span>
  <FirebaseUiAuth
    signInWith={{ google: true, emailPassword: true }}
    on:success={() => dispatch('close')}
    on:authresult={(e) => saveUserData(e.detail)} />
</Modal>
```

Then asynchronously load this modal only when a visitor clicks the "Login" button:

```svelte
<script lang="ts">
  import Button from 'svelte-pieces/ui/Button.svelte';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import user from '$lib/stores/user'; // see "Create User Store" example from the "FirebaseUi For Web" page
</script>

{#if $user}
  <!-- If logged in show user's name and add a link to account page or a user menu -->
  {$user.displayName}
{:else}
  <ShowHide let:show let:toggle>
    <Button form="filled" onclick={toggle}>Login</Button>
    {#if show}
      {#await import('./AuthModal.svelte') then { default: AuthModal }}
        <AuthModal on:close={toggle} />
      {/await}
    {/if}
  </ShowHide>
{/if}
```