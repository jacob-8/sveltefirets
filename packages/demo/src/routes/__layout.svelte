<script context="module" lang="ts">
  // import { initFirebase } from 'sveltefirets';
  // import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    // const firebaseApp = initFirebase(firebaseConfig);
    // return { stuff: { firebaseApp } };
    return { };
  };
</script>

<slot />
