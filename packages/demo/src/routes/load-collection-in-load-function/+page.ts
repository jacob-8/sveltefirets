import { redirect, error } from '@sveltejs/kit';

import { getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';
import type { IMessage } from '$lib/message.interface';

import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  try {
    const messages = await getCollection<IMessage>(`messages`, [
      limit(5),
      orderBy('updatedAt', 'desc'),
    ]);
    if (messages) {
      return { messages };
    } else {
      throw redirect(301, '/');
    }
  } catch (error) {
    throw error(500, error);
  }
};
