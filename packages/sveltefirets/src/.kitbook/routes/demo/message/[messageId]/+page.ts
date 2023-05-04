import { redirect, error } from '@sveltejs/kit';
import type { IMessage } from '../../message.interface';

import { getDocument } from 'sveltefirets';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params: { messageId } }) => {
  try {
    const message = await getDocument<IMessage>(`messages/${messageId}`);
    if (message) {
      console.log({message});
      return { message, messageId };
    } else {
      throw redirect(301, '/');
    }
  } catch (err) {
    throw error(500, err);
  }
};
