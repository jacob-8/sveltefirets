<script lang="ts">
  export let tosUrl = undefined;
  export let privacyPolicyUrl = undefined;
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    close: string | null;
    updateuserdata: { user: any; isNewUser: boolean };
  }>();
</script>
