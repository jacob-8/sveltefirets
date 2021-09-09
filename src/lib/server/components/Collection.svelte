<script lang="ts">
  import { writable } from 'svelte/store';
  export let log = false;
  type T = $$Generic;
  export let startWith: T[] = undefined;

  const store = (() => {
    if (log) {
      console.log('path');
      console.table(startWith);
    }
    const { subscribe } = writable(startWith);
    return {
      subscribe,
      db: undefined,
      ref: undefined,
      get loading() {
        return false;
      },
      get error() {
        return false;
      },
      get meta() {
        return { first: null, last: null };
      },
    };
  })();
</script>

<slot name="before" />

{#if $store}
  <slot
    data={$store}
    ref={store.ref}
    error={store.error}
    first={store.meta.first}
    last={store.meta.last} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />
