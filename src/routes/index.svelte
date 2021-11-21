<script lang="ts">
  import { Collection, Doc, getDocument, hello } from 'sveltefirets';

  getDocument('templates/CrJauqXJ249p7r0OxE53').then((template) => {
    console.log({ template }); // will be null on server
  });
</script>

<h1>{hello('Dan')}</h1>

<Doc path={`templates/CrJauqXJ249p7r0OxE53`} startWith={{ name: 'Bill' }} log let:data={template}>
  <pre>{JSON.stringify(template, null, 2)}</pre>
</Doc>

<Collection path="templates" startWith={[{ name: 'Bob' }, { name: 'Betty' }]} let:data={people} log>
  {#each people as person}
    <pre>{JSON.stringify(person.name, null, 2)}</pre>
  {/each}
</Collection>

<!-- queryConstraints={[where('createdBy', '==', $user.uid), orderBy('updatedAt', 'desc')]}> -->
