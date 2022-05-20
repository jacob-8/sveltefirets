<script lang="ts">
  import { add } from 'sveltefirets';
  import type { IMessage } from './message.interface';
  let name = 'John';

  function sayHello() {
    add<IMessage>('messages', { text: 'Hello from ' + name });
    name = '';
  }
</script>

<h2>Create greeting</h2>
<input
  type="text"
  bind:value={name}
  maxlength="10"
  placeholder="Enter name"
  on:keyup={(e) => e.key === 'Enter' && sayHello()} />
<button type="button" on:click={sayHello}>Add</button>
