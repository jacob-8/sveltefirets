<script >import { onDestroy, onMount, createEventDispatcher } from 'svelte';
import { collectionStore } from '../stores';
export let path;
export let queryConstraints = []; // usage example: [where('role', '==', 'contributor'), orderBy("name")];
export let traceId = '';
export let log = false;
export let startWith = undefined;
export let maxWait = 10000;
export let once = false;
export let refField = undefined;
$: opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once,
    refField,
};
let store = collectionStore(path, queryConstraints, opts);
const dispatch = createEventDispatcher();
let unsub;
// Props changed
$: {
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
