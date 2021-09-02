import { writable } from 'svelte/store';
import { onSnapshot, query } from 'firebase/firestore';
import type { CollectionReference, DocumentReference, QueryConstraint } from 'firebase/firestore';

import { db } from '.';
import { colRef, docRef } from './firestore';
import { startTrace, stopTrace } from './perf';

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
      db: undefined,
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

  // Timout
  // Runs of first subscription
  const start = () => {
    // Timout for fallback slot
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
    db,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    },
  };
}

export function collectionStore<T>(
  path: CollectionReference<T> | string,
  queryConstraints: QueryConstraint[] = [],
  opts: { log?: boolean; traceId?: string; startWith?: T[]; maxWait?: number; once?: boolean } = {
    maxWait: 10000,
  }
) {
  const { startWith, log, traceId, maxWait, once, idField, refField } = {
    idField: 'id',
    refField: 'ref',
    ...opts,
  };

  if (!browser) {
    const store = writable(startWith);
    const { subscribe } = store;
    return {
      subscribe,
      db: undefined,
      ref: undefined,
      get loading() {
        return false;
      },
      get error() {
        return false;
      },
      get meta() {
        return { first: null, last: null };
      },
    };
  }

  const ref = typeof path === 'string' ? colRef<T>(path) : path;
  const q = query(ref, ...queryConstraints);
  const trace = traceId && startTrace(traceId);

  let _loading = typeof startWith !== undefined;
  let _error = null;
  let _meta = { first: null, last: null };
  let _teardown;
  let _waitForIt;

  // Metadata for result
  const calcMeta = (val) => {
    return val && val.length
      ? { first: val[0], last: val[val.length - 1] }
      : { first: null, last: null };
  };

  const next = (val: T[], err?: Error) => {
    _loading = false;
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    _meta = calcMeta(val);
    set(val);
    trace && stopTrace(trace);
  };

  const start = () => {
    _waitForIt =
      maxWait &&
      setTimeout(
        () => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`)),
        maxWait
      );

    _teardown = onSnapshot(
      q,
      (snapshot) => {
        // Will always return an array
        const data = snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          // Allow end user override fields mapped for ID and Ref
          ...(idField ? { [idField]: docSnap.id } : null),
          ...(refField ? { [refField]: docSnap.ref } : null),
        }));

        if (log) {
          const type = _loading ? 'New Query' : 'Updated Query';
          console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
          console.log(`Path: ${ref.path}`);
          console.table(data);
          console.groupEnd();
        }
        next(data);
        once && _teardown();
      },

      (error) => {
        console.error(error);
        next(null, error);
      }
    );

    return () => _teardown();
  };

  const store = writable(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    db,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    },
    get meta() {
      return _meta;
    },
  };
}
