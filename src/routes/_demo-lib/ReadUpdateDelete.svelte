<script lang="ts">
import { limit, orderBy } from 'firebase/firestore';

  import { Collection, deleteDocument, update } from 'sveltefirets';
  import type { IMessage } from './message.interface';

  let refField: string;

  const preloadedMessages: IMessage[] = [
    { text: '1st from the server' },
    { text: '2nd from the server' },
  ];

  function changeGreeting(messageId: string) {
    const newName = prompt('Enter updated name:');
    if (newName) {
      update<IMessage>(`messages/${messageId}`, { text: `Actually the name is ${newName}` });
    }
  }
</script>

<div
  style="display: flex; align-items: center;
justify-content: space-between;">
  <h2>Read, Update, and Delete greetings</h2>

  <input type="text" bind:value={refField} maxlength="5" placeholder="Optional ref field" />
</div>
<Collection path="messages" queryConstraints={[limit(5), orderBy('updatedAt', 'desc')]} startWith={preloadedMessages} let:data={messages} {refField} log>
  <!-- where('createdBy', '==', $user.uid) -->
  {#each messages as message}
    <b>{message.text}</b>, sent on {message.updatedAt && message.updatedAt.toDate()}
    <pre style="font-size: 70%;">{JSON.stringify(message, null, 2)}</pre>
    <button type="button" on:click={() => changeGreeting(message.id)}>Update</button>
    <button type="button" on:click={() => deleteDocument(`messages/${message.id}`)}>Delete</button>
    <hr />
  {/each}
</Collection>

