import type { RequestHandler } from '@sveltejs/kit';
import { getDocument } from 'sveltefirets';

import type { IMessage } from '$lib/message.interface';

export const GET: RequestHandler = async (request) => {
  const message = await getDocument<IMessage>(`messages/${request.params.messageId}`);
  console.log({message});

  if (message) {
    return {
      status: 200,
      body: JSON.stringify(message),
    };
  } else {
    return {
      status: 404,
      body: 'Message not found',
    };
  }
};
