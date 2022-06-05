<script lang="ts">
  import { firebaseConfig } from './firebaseConfig';
</script>

<h3>Firebase Config:</h3>
{#if firebaseConfig.projectId}
  <pre>{JSON.stringify(firebaseConfig, null, 1)}</pre>
{:else}
  You need to create a
  <a href="https://firebase.google.com/">Firebase Project</a>
  and run setConfig with your config in hooks.ts (for server) and in __layout.svelte load in SvelteKit (for client).
{/if}
