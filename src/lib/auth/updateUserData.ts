import type { AuthResult, IBaseUser, SignInMethods } from '../interfaces';
import type { User } from 'firebase/auth';
import { arrayUnion, serverTimestamp, setDoc, type WithFieldValue } from 'firebase/firestore';
import { docRef } from '../firestore/firestore';

export async function saveUserData(authResult: AuthResult) {
  console.log({ authResult });
  const {
    user,
    additionalUserInfo: { isNewUser, providerId },
  } = authResult;

  const userData: WithFieldValue<IBaseUser> = {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
  };

  if (user.displayName || isNewUser) {
    userData.displayName = user.displayName || user.email.split('@')[0];
  }

  if (user.photoURL) {
    userData.photoURL = user.photoURL;
  }

  if (authResult.credential && authResult.credential.signInMethod) {
    userData.providerIds = arrayUnion(authResult.credential.signInMethod as SignInMethods);
  } else if (providerId === 'password') { // email signIns don't return a credential
    userData.providerIds = arrayUnion('password');
  }
  
  if (isNewUser && providerId === 'password' && user.emailVerified) {
    userData.emailLink = true; // If a new user uses email and if they are also verified then it is the email link method. Firebase returns 'password' as the providerId even for emailLink signIns.
  }

  const timestamp = serverTimestamp();
  if (isNewUser) {
    userData.createdAt = timestamp;
  } else {
    userData.updatedAt = timestamp;
    userData.lastVisit = timestamp;
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for authentication to complete for new users before trying to save to the database
    await setDoc(docRef(`users/${user.uid}`), userData, { merge: true });
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
