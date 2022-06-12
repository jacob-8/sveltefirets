import type { Timestamp } from 'firebase/firestore';
import type { IFirestoreMetaData } from '.';

export type IBaseUser = User & Omit<IFirestoreMetaData, 'id'>;

interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  lastVisit?: Timestamp;
  providerIds?: SignInMethods[]; // 'emailLink' method will still say 'password'
  emailVerified?: boolean;
  emailLink?: boolean; // set to true if they are both a new user and email is verified; this is the only way to distinguish apart from users who use email+pass and then later manually verify their email if the app provides that option.
}

export type SignInMethods = 'google.com' | 'password' | 'emailLink' | 'facebook.com' | 'github.com' | 'phone' | 'twitter.com';