<script >import { writable } from 'svelte/store';
export let log = false;
export let startWith = undefined;
const store = (() => {
    if (log) {
        console.log({ startWith });
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
    };
})();
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
