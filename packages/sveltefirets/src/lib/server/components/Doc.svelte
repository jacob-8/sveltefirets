<script lang="ts">
  import { writable } from 'svelte/store';
  export let log = false;
  type T = $$Generic;
  export let startWith: T = undefined;

  const store = (() => {
    if (log) {
      console.log({ startWith });
    }
    const { subscribe } = writable(startWith);
    return {
      subscribe,
      ref: undefined,
      get loading() {
        return false;
      },
      get error() {
        return false;
      },
    };
  })();
</script>

<slot name="before" />

{#if $store}
  <slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
  <slot name="loading" />
{:else if startWith}
  <slot name="fallback" />
{/if}

<slot name="after" />
