<script lang="ts">
  import { GeoPoint } from 'firebase/firestore';

  import { Story } from 'kitbook';
  import { Button } from 'svelte-pieces';
  import { deleteDocument, Doc, set } from 'sveltefirets';

  const id = 'messages/geopoint';
</script>

<!-- prettier-ignore -->
# GeoPoint

Here is a simple comparison of Firebase GeoPoints vs regular objects that have the `latitude` and `longitude` properties. While queries can be made with [GeoFire](https://github.com/firebase/geofire-js) hashes, they do not utilize GeoPoints and thus there is no real benefit to using GeoPoints.

<Story showCode>
  <Button
    onclick={() =>
      set(id, {
        text: 'GeoPoint test',
        geoPoint: new GeoPoint(10, 10),
        latLngPoint: { latitude: 10, longitude: 10 },
      })}>Set GeoPoint</Button>
  <Button onclick={() => deleteDocument(id)}>Delete GeoPoint</Button>
</Story>

<Doc path={id} let:data={message} log>
  <pre>{JSON.stringify(message, null, 2)}</pre>
  <div slot="fallback">
    No document found with an id of: '{id}'.
  </div>
</Doc>
