import type { IUser } from '../interfaces';
import type { User } from 'firebase/auth';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { docRef } from '../firestore';

export async function updateUserData(user: User, isNewUser: boolean) {
  const data: IUser = {
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
    //@ts-ignore
    data.createdAt = timestamp;
  } else {
    //@ts-ignore
    data.updatedAt = timestamp;
    //@ts-ignore
    data.lastVisit = timestamp;
  }

  try {
    await setDoc(docRef(`users/${user.uid}`), data, { merge: true });
  } catch (err) {
    console.error(err);
  }
}
