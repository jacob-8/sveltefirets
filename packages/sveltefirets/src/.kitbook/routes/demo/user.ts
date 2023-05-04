import { createUserStore, firebaseConfig, type IBaseUser } from '$lib';

interface IUser extends IBaseUser {
  theme: string;
}

export const user = createUserStore<IUser>({
  userKey: `${firebaseConfig.projectId}_firebase_user`,
  log: true,
});
