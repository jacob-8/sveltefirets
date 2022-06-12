import type { Timestamp } from 'firebase/firestore';
import type { IFirestoreMetaData } from '.';

export type IBaseUser = User & Omit<IFirestoreMetaData, 'id'>;

interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  lastVisit?: Timestamp;
  signInMethod?: SignInMethods;
  emailVerified?: boolean;
}

export type SignInMethods = 'google.com' | 'password' | 'emailLink' | 'facebook.com' | 'github.com' | 'phone' | 'twitter.com';