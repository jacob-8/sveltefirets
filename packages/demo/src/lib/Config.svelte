<script lang="ts">
  import { firebaseConfig } from 'sveltefirets';
</script>

<h3>Firebase Config:</h3>
{#if firebaseConfig.projectId}
  <pre>{JSON.stringify(firebaseConfig, null, 1)}</pre>
{:else}
  You need to create a
  <a href="https://firebase.google.com/">Firebase Project</a>
  and add it to your .env variables as described in "Getting Started".
{/if}
