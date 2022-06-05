import { createUserStore, type IBaseUser } from 'sveltefirets';
import { firebaseConfig } from './firebaseConfig';

interface IUser extends IBaseUser {
  theme: string;
}

export const user = createUserStore<IUser>({
  userKey: `${firebaseConfig.projectId}_firebase_user`,
  log: true,
});
