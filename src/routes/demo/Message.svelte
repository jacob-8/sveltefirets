<script lang="ts">
  import type { Message } from "./message.interface";
  import { Button } from "svelte-pieces";
  import { deleteDocument, update } from 'sveltefirets';

  export let message: Message;
  export let messages_count: number;

  function changeGreeting(messageId: string) {
    const newName = prompt("Enter updated name:");
    if (newName) {
      update<Message>(`messages/${messageId}`, {
        text: `Actually the name is ${newName}`,
      });
    }
  }

  function deleteGreeting(messageId: string) {
    if (messages_count > 2) {
      deleteDocument(`messages/${messageId}`);
    } else {
      alert(
        "Keep at least two messages around for demonstration. Try adding a few more and then you will be able to delete.",
      );
    }
  }
</script>

<b>{message.text}</b> |
<small>ID: {message.id} | {message.updatedAt?.toDate()}</small>
<br />
<Button size="sm" onclick={() => changeGreeting(message.id)}>Update</Button>
<Button
  size="sm"
  onclick={() => deleteGreeting(message.id)}
  color="red"
  form="simple">Delete</Button
>
<hr />
