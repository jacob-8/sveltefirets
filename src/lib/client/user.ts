import { derived, Writable } from 'svelte/store';
import type { Unsubscriber } from 'svelte/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

import { firebaseAppStore } from './init';
import { docStore } from './stores';
import type { IBaseUser } from '../interfaces';
import { setCookie } from '../helpers/cookies';

const userKey = `firebase_user`;

export const user = derived<Writable<FirebaseApp>, IBaseUser>(
  firebaseAppStore,
  ($firebaseApp, set) => {
    console.log($firebaseApp);
    if ($firebaseApp.options) {
      console.log('initing user store');

      let unsub: Unsubscriber;
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (u) => {
          console.log('user changed', u); // will this print on sign out?
          if (u) {
            unsub && unsub();
            const userStore = docStore<IBaseUser>(`users/${u.uid}`, { log: true });
            unsub = userStore.subscribe((user) => {
              if (user) {
                set(user);
                cacheUser(user, userKey);
                denoteVisitOnce(user.uid);
              }
            });
          } else {
            set(null);
            removeCachedUser(userKey);
          }
        },
        (err) => console.error(err.message)
      );
    }
  },
  JSON.parse(localStorage.getItem(userKey)) || null
);

export const logOut = async () => {
  const auth = getAuth();
  await signOut(auth);
};

function cacheUser(user: IBaseUser, userKey: string) {
  localStorage.setItem(userKey, JSON.stringify(user));
  const minimalUser: Partial<IBaseUser> = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
  }; // Cookies are limited to 4kb, about 1,000-4000 characters
  setCookie('user', JSON.stringify(minimalUser), { 'max-age': 31536000 });
}

function removeCachedUser(userKey: string) {
  localStorage.removeItem(userKey);
  const yesterday = new Date(new Date());
  yesterday.setDate(yesterday.getDate() - 1);
  setCookie('user', null, { expires: yesterday });
}

const denoteVisitOnce = (() => {
  let denoted = false;
  return async function (uid: string) {
    if (!denoted) {
      denoted = true;
      try {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', uid), { lastVisit: serverTimestamp() });
      } catch (err) {
        console.error(err);
      }
      return true;
    } else {
      return true;
    }
  };
})();

// OLD
// unsub = onSnapshot(doc(db, 'users', u.uid), (snapshot) => {
//   const user = snapshot.data() as IBaseUser;
//   if (user) {
//     console.log('retrieved: ', user);
//   }
// });
