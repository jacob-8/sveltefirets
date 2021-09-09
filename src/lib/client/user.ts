import { writable } from 'svelte/store';
import type { Unsubscriber } from 'svelte/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import type { IBaseUser } from '../interfaces';
import { db, firebaseApp } from './init';
import { setCookie } from '../helpers/cookies';
import { docStore } from './stores';
import { firebaseConfig } from '../config';

const userKey = `${firebaseConfig.projectId}_firebase_user`;

function createUserStore() {
  const { subscribe, set } = writable<IBaseUser>(null);
  let unsub: Unsubscriber;

  if (typeof window !== 'undefined') {
    const auth = getAuth(firebaseApp);
    let cached = null;
    cached = JSON.parse(localStorage.getItem(userKey));
    set(cached);

    onAuthStateChanged(
      auth,
      (u) => {
        if (u) {
          unsub && unsub();
          const userStore = docStore<IBaseUser>(`users/${u.uid}`, { log: true });
          unsub = userStore.subscribe((user) => {
            if (user) {
              set(user);
              cacheUser(user);
              denoteVisitOnce(user.uid);
            }
          });
        } else {
          set(null);
          removeCachedUser();
        }
      },
      (err) => console.error(err.message)
    );
  }

  const signOutFn = async () => {
    const auth = getAuth(firebaseApp);
    unsub && unsub();
    await signOut(auth);
  };

  return {
    subscribe,
    signOut: signOutFn,
  };
}

export const user = createUserStore();

function cacheUser(user: IBaseUser) {
  localStorage.setItem(userKey, JSON.stringify(user));
  const minimalUser: Partial<IBaseUser> = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
  }; // Cookies are limited to 4kb, about 1,000-4000 characters
  setCookie('user', JSON.stringify(minimalUser), { 'max-age': 31536000 });
}

function removeCachedUser() {
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
