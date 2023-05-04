import { redirect, error } from '@sveltejs/kit';

import { getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';
import type { IMessage } from '../message.interface';

import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
  try {
    const messages = await getCollection<IMessage>(`messages`, [
      limit(5),
      orderBy('updatedAt', 'desc'),
    ]);
    if (messages) {
      console.log({ messages });
      return { messages };
    } else {
      throw redirect(301, '/');
    }
  } catch (err) {
    throw error(500, err);
  }
};
