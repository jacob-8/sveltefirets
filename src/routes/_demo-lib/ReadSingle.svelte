<script lang="ts">
  import { Doc } from 'sveltefirets';
  let id: string;
</script>

<h2>Read a Single Doc</h2>

<input style="margin-bottom: 10px;" type="text" bind:value={id} placeholder="Enter document id" />

<Doc path={`messages/${id}`} let:data={message}>
  <pre>{JSON.stringify(message, null, 2)}</pre>
  <div slot="fallback">
    No document found with this id. Choose one from the above list of greetings (add a greeting
    first if there are none).
  </div>
</Doc>

<!-- <Doc
  path={`messages/${id}`}
  startWith={{ text: 'single document read from server' }}
  log
  let:data={message}>
  <pre>{JSON.stringify(message, null, 2)}</pre>
</Doc> -->
