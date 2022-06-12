import type { AuthResult, IBaseUser, SignInMethods } from '../interfaces';
import type { User } from 'firebase/auth';
import { serverTimestamp, setDoc, type WithFieldValue } from 'firebase/firestore';
import { docRef } from './firestore';

export async function saveUserData(authResult: AuthResult) {
  console.log({ authResult });
  const {
    user,
    additionalUserInfo: { isNewUser, providerId },
  } = authResult;

  const data: WithFieldValue<IBaseUser> = {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
  };

  if (user.displayName || isNewUser) {
    data.displayName = user.displayName || user.email.split('@')[0];
  }

  if (user.photoURL) {
    data.photoURL = user.photoURL;
  }

  if (authResult.credential && authResult.credential.signInMethod) {
    data.signInMethod = authResult.credential.signInMethod as SignInMethods;
  } else if (user.emailVerified) {
    data.signInMethod = 'emailLink'; // if there is no credential then they must have used email and if they are also verified then it is either email link or they manually verified themselves at some point after signing up with email and password. So no credential + emailLink really signifies some sort of email sign in that has been verified. Wish firebase would properly return the providerId as 'emailLink' but it doesn't. It returns 'password' even for emailLink sign ins.
  } else if (providerId === 'password') {
    data.signInMethod = 'password';
  }

  const timestamp = serverTimestamp();
  if (isNewUser) {
    data.createdAt = timestamp;
  } else {
    data.updatedAt = timestamp;
    data.lastVisit = timestamp;
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for authentication to complete for new users before trying to save to the database
    await setDoc<IBaseUser>(docRef(`users/${user.uid}`), data, { merge: true });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @deprecated Since version 0.0.25. Will be deleted in the future. Use saveUserData instead because it handles the full AuthResult.
 */
export async function updateUserData(user: User, isNewUser: boolean) {
  console.warn('updateUserData is deprecated - use saveUserData instead');
  return await saveUserData({
    user,
    additionalUserInfo: { isNewUser, providerId: null, profile: null },
    credential: null,
    operationType: null,
  });
}
