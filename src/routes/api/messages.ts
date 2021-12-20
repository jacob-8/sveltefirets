import type { RequestHandler } from '@sveltejs/kit';
import { initFirebase, getCollection } from 'sveltefirets';
import { limit, orderBy } from 'firebase/firestore';

import { firebaseConfig } from '../_demo-lib/firebaseConfig';
import type { IMessage } from '../_demo-lib/message.interface';

export const get: RequestHandler = async () => {
  const firebaseApp = initFirebase(firebaseConfig);
  const messages = await getCollection<IMessage>(
    `messages`,
    [limit(5), orderBy('updatedAt', 'desc')],
    firebaseApp
  );
  console.log('loaded: ', { messages });

  if (messages) {
    return {
      status: 200,
      body: JSON.stringify(messages),
    };
  } else {
    return {
      status: 404,
      body: 'Messages not found',
    };
  }
};
