<script lang="ts">
  import { FirebaseUiAuth, updateUserData } from 'sveltefirets';
  import { goto } from '$app/navigation';
  import { firebaseConfig } from './_demo-lib/firebaseConfig';
</script>

<FirebaseUiAuth
  languageCode="en"
  {firebaseConfig}
  on:success={() => goto('/')}
  on:updateuserdata={(e) => updateUserData(e.detail.user, e.detail.isNewUser)} />
