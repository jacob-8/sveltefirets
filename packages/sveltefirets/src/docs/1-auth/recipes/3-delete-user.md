<script lang="ts">
  import { getAuth, deleteUser } from 'firebase/auth';
  import { user } from '$lib/user';
  import { deleteDocument, FirebaseUiAuth, saveUserData } from 'sveltefirets';
  import Button from 'svelte-pieces/ui/Button.svelte';
</script>

<!-- prettier-ignore -->
# Delete User

{#if $user}
  <Button
    onclick={async () => {
      try {
        if (!confirm('Are you sure you want to delete?')) return;
        const auth = getAuth();
        const u = auth.currentUser;
        await deleteDocument(`users/${$user.uid}`);
        await deleteUser(u);
        alert('Account deleted, sign in again to see a new createdAt date');
      } catch (e) {
        alert(e);
      }
    }}>Delete your account: {$user.email}</Button>

  <pre>{JSON.stringify($user, null, 1)}</pre>
{:else}
  <div class="not-prose">
    You must first sign in to try it:
    <FirebaseUiAuth on:authresult={(e) => saveUserData(e.detail)} />
  </div>
{/if}
