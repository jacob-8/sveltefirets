import type { IBaseUser } from '../interfaces';
import type { User } from 'firebase/auth';
import { serverTimestamp, setDoc, type WithFieldValue } from 'firebase/firestore';
import { docRef } from './firestore';

export async function updateUserData(user: User, isNewUser: boolean) {
  const data: WithFieldValue<IBaseUser> = {
    uid: user.uid,
    email: user.email,
  };

  if (user.displayName) {
    data.displayName = user.displayName;
  }
  if (user.photoURL) {
    data.photoURL = user.photoURL;
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
