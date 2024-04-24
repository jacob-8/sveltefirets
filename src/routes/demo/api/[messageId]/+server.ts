import type { RequestHandler } from '@sveltejs/kit';
import { getDocument } from 'sveltefirets';

import type { Message } from '../../message.interface';

export const GET: RequestHandler = async (request) => {
  const message = await getDocument<Message>(`messages/${request.params.messageId}`);
  console.log({message});

  if (message) {
    return new Response(JSON.stringify(message));
  } else {
    return new Response('Message not found', { status: 404 });
  }
};
