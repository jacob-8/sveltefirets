import type { RequestHandler } from '@sveltejs/kit';
import { getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';

import type { Message } from '../../message.interface';

export const GET: RequestHandler = async () => {
  const messages = await getCollection<Message>(`messages`, [
    limit(5),
    orderBy('updatedAt', 'desc'),
  ]);
  console.log({ messages });

  if (messages) {
    return new Response(JSON.stringify(messages));
  } else {
    return new Response('Messages not found', { status: 404 });
  }
};
