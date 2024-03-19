import { writable } from 'svelte/store';
import {
  onSnapshot,
  type DocumentReference,
} from 'firebase/firestore';

import { docRef } from '../firestore';
import { startTrace, stopTrace } from '../perf';

export function docStore<T>(
  path: DocumentReference<T> | string,
  opts: { log?: boolean; traceId?: string; startWith?: T; maxWait?: number; once?: boolean } = {}
) {
  const { startWith, log, traceId, maxWait, once } = opts;

  if (typeof window === 'undefined') {
    const store = writable<T>(startWith);
    const { subscribe } = store;
    return {
      subscribe,
      ref: undefined,
      get loading() {
        return false;
      },
      get error() {
        return false;
      },
    };
  }

  const ref = typeof path === 'string' ? docRef<T>(path) : path;
  const trace = traceId && startTrace(traceId);

  let _loading = typeof startWith !== undefined;
  let _firstValue = true;
  let _error = null;
  let _teardown;
  let _waitForIt;

  // State should never change without emitting a new value
  // Clears loading state on first call
  const next = (val: T, err?: Error) => {
    _loading = false;
    _firstValue = false;
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    set(val);
    trace && stopTrace(trace);
  };

  // Timeout
  // Runs of first subscription
  const start = () => {
    // Timeout for fallback slot
    _waitForIt =
      maxWait &&
      setTimeout(
        () => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`)),
        maxWait
      );

    // Realtime firebase subscription
    _teardown = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.data() || (_firstValue && startWith) || null;
        if (data) {
          // @ts-ignore
          data.id = snapshot.id;
        }
        // Optional logging
        if (log) {
          console.groupCollapsed(`Doc ${snapshot.id}`);
          console.log(`Path: ${ref.path}`);
          console.table(data);
          console.groupEnd();
        }

        // Emit next value
        next(data);

        // Teardown after first emitted value if once
        once && _teardown();
      },

      // Handle firebase thrown errors
      (error) => {
        console.error(error);
        next(null, error);
      }
    );

    // Removes firebase listener when store completes
    return () => _teardown();
  };

  // Svelte store
  const store = writable(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    },
  };
}