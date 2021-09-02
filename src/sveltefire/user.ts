import { writable } from 'svelte/store';
import type { Unsubscriber } from 'svelte/store';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import type { IUser } from './interfaces';
import { db, firebaseApp } from '.';
import { setCookie } from './helpers/cookies';
import { docStore } from './stores';

const userKey = 'firebase_user';
let denotedVisit = false;

function createUserStore() {
  const { subscribe, set } = writable<IUser>(null);
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
          const userStore = docStore<IUser>(`users/${u.uid}`, { log: true });
          unsub = userStore.subscribe((user) => {
            if (user) {
              set(user);
              cacheUser(user);
              !denotedVisit && denoteVisit(user);
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

function cacheUser(user: IUser) {
  localStorage.setItem(userKey, JSON.stringify(user));
  const minimalUser: Partial<IUser> = {
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

async function denoteVisit(user: IUser) {
  try {
    await updateDoc(doc(db, 'users', user.uid), { lastVisit: serverTimestamp() });
    denotedVisit = true;
  } catch (err) {
    console.error(err);
  }
}
