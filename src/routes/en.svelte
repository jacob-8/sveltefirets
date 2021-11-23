<script lang="ts">
  import { FirebaseUiAuth, updateUserData } from 'sveltefirets';
  import { goto } from '$app/navigation';
</script>

<FirebaseUiAuth
  languageCode="en"
  on:success={() => goto('/')}
  on:updateuserdata={(e) => updateUserData(e.detail.user, e.detail.isNewUser)} />
