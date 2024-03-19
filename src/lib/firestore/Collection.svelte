<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import type { CollectionReference, QueryConstraint } from 'firebase/firestore';
  import { collectionStore } from './stores/collection-store';

  export let path: CollectionReference<T> | string;
  export let queryConstraints: QueryConstraint[] = []; // usage example: [where('role', '==', 'contributor'), orderBy("name")];
  export let traceId = '';
  export let log = false;
  type T = $$Generic;
  export let startWith: T[] = undefined;
  export let maxWait = 10000;
  export let once = false;
  export let refField: string = undefined;

  const opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once,
    refField,
  };

  let store = collectionStore<T>(path, queryConstraints, opts);

  const dispatch = createEventDispatcher<{
    ref: { ref: CollectionReference<T> };
    data: { data: T[] };
  }>();

  let unsub: Unsubscriber;

  // Props changed
  $: {
    if (typeof window !== 'undefined') {
      if (unsub) {
        unsub();
        const updatedOpts = { ...opts, traceId, log, maxWait, once, refField };
        store = collectionStore(path, queryConstraints, updatedOpts);
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
