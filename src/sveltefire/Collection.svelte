<script lang="ts">
  import { browser } from '$app/env';
  import type { CollectionReference, QueryConstraint } from 'firebase/firestore';
  export let path: CollectionReference<T> | string;
  export let queryConstraints: QueryConstraint[] = []; // usage example: [where('role', '==', 'contributor'), orderBy("name")];
  export let traceId = '';
  export let log = false;
  type T = $$Generic;
  export let startWith: T[] = undefined;
  export let maxWait = 10000;
  export let once = false;

  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { collectionStore } from './stores';

  const opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once,
  };

  let store = collectionStore<T>(path, queryConstraints, opts);

  const dispatch = createEventDispatcher<{
    ref: { ref: CollectionReference<T> };
    data: { data: T[] };
  }>();

  let unsub: Unsubscriber;

  // Props changed
  $: {
    if (browser) {
      if (unsub) {
        unsub();
        store = collectionStore(path, queryConstraints, opts);
        dispatch('ref', { ref: store.ref });
      }

      unsub = store.subscribe((data) => {
        dispatch('data', {
          data,
        });
      });
      // use emitted data with on:data={(e) => console.log(e.detail.data)}
    }
  }

  onMount(() => dispatch('ref', { ref: store.ref }));
  onDestroy(() => unsub && unsub());
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
