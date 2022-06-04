<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const firebaseApp = initFirebase(firebaseConfig);
    return { stuff: { firebaseApp } };
  };
</script>

<slot />
