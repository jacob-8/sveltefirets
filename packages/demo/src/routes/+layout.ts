import type { LayoutLoad } from './$types';
export const load: LayoutLoad = () => {
  const modules = import.meta.glob('./**/*.{md,svx}');
  return { kitbook: { modules } };
};
