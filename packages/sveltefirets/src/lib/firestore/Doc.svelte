<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import type { DocumentReference } from 'firebase/firestore';
  import { docStore } from './stores';

  export let path: DocumentReference<T> | string;
  export let log = false;
  export let traceId = '';
  type T = $$Generic;
  export let startWith: T = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
  export let maxWait = 10000;
  export let once = false;

  const opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once,
  };

  let store = docStore(path, opts);

  const dispatch = createEventDispatcher<{
    ref: { ref: DocumentReference<T> };
    data: { data: T };
  }>();

  let unsub: Unsubscriber;

  // Props changed
  $: {
    if (typeof window !== 'undefined') {
      if (unsub) {
        // Unsub and create new store
        unsub();
        store = docStore(path, opts);
        dispatch('ref', { ref: store.ref });
      }

      unsub = store.subscribe((data) => {
        dispatch('data', {
          data,
        });
      });
    }
  }

  onMount(() => dispatch('ref', { ref: store.ref }));
  onDestroy(() => unsub && unsub());
</script>

<slot name="before" />

{#if $store}
  <slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />
