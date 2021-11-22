import { createUserStore } from 'sveltefirets';
import { firebaseConfig } from './firebaseConfig';

export const user = createUserStore(`${firebaseConfig.projectId}_firebase_user`);
