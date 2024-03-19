import { get } from 'svelte/store';
import { authState } from './user';

export const getUid = () => {
  const u = get(authState);
  return (u && u.uid) || 'anonymous'; // 'anonymous' allows support messages to be saved by non-logged-in users
};
