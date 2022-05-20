import type { RequestHandler } from '@sveltejs/kit';
import { initFirebase, getDocument } from 'sveltefirets';

import { firebaseConfig } from '../_demo-lib/firebaseConfig';
import type { IMessage } from '../_demo-lib/message.interface';

export const get: RequestHandler = async (request) => {
  const firebaseApp = initFirebase(firebaseConfig);
  const message = await getDocument<IMessage>(`messages/${request.params.messageId}`, firebaseApp);
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
