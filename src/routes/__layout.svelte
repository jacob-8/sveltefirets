<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from './firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    await initFirebase(firebaseConfig);
    return {};
  };
</script>

<slot />