<script context="module" lang="ts">
  import { initFirebase } from 'sveltefirets';
  import { firebaseConfig } from './_demo-lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    const firebaseApp = initFirebase(firebaseConfig);
    return { stuff: { firebaseApp } };
  };
</script>

<slot />
