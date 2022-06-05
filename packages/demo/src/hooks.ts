import { setConfig } from 'sveltefirets';
import { firebaseConfig } from '$lib/firebaseConfig';

import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  setConfig(firebaseConfig);
  const response = await resolve(event);
  return response;
};
