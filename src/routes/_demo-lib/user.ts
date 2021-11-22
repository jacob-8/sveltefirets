import type { IBaseUser } from 'sveltefirets';
import { createUserStore } from 'sveltefirets';
import { firebaseConfig } from './firebaseConfig';

interface IUser extends IBaseUser {
  theme: string;
}

export const user = createUserStore<IUser>(`${firebaseConfig.projectId}_firebase_user`);
