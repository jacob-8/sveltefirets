import { setConfig } from 'sveltefirets';
import { firebaseConfig } from '$lib/firebaseConfig';

import type { LayoutLoad } from './$types';
export const load: LayoutLoad = () => {
  setConfig(firebaseConfig);
  const modules = import.meta.glob('./**/*.{md,svx}');
  return { kitbook: { modules } };
};
