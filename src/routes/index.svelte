<script lang="ts">
  import { Collection, hello } from 'sveltefirets';
</script>

<h1>Welcome to {hello('Dan')}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Collection path="templates" startWith={[{ name: 'Bob' }, { name: 'Betty' }]} let:data={people}>
  {#each people as person}
    <pre>{JSON.stringify(person, null, 2)}</pre>
  {/each}
</Collection>

<!-- queryConstraints={[where('createdBy', '==', $user.uid), orderBy('updatedAt', 'desc')]}> -->
