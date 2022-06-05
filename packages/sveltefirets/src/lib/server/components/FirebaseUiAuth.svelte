<script lang="ts">
  export let languageCode = 'en';
  export let tosUrl = undefined;
  export let privacyPolicyUrl = undefined;
  export let signInSuccessUrl = undefined;
  export let signInWith = {};
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    success: string | null;
    updateuserdata: { user: any; isNewUser: boolean };
  }>();
</script>
