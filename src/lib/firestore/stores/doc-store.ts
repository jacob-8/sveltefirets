import { writable } from 'svelte/store';
import {
  onSnapshot,
} from 'firebase/firestore';

import { docRef, type DocPredicate } from '../firestore';
import { startTrace, stopTrace } from '../perf';

export function docStore<T>(
  path: DocPredicate<T>,
  options: { 
    log?: boolean; 
    traceId?: string; 
    startWith?: T; 
    maxWait?: number; 
    once?: boolean 
  } = {}
) {
  const { startWith, log, traceId, maxWait, once } = options;

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

  const { subscribe, set } = writable(startWith, start);

  const ref = typeof path === 'string' ? docRef<T>(path) : path;
  const trace = traceId && startTrace(traceId);

  let _loading = typeof startWith !== undefined;
  let _firstValue = true;
  let _error = null;
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

  function start() {
    _waitForIt =
      maxWait &&
      setTimeout(
        () => _loading && next(null, new Error(`Timeout at ${maxWait}.`)),
        maxWait
      );

    const teardown = onSnapshot(
      ref,
      (snapshot) => {
        const data: T & { id?: string } = snapshot.data() || (_firstValue && startWith) || null;
        if (data)
          data.id = snapshot.id;
        
        if (log) {
          console.groupCollapsed(`Doc ${snapshot.id}`);
          console.log(`Path: ${ref.path}`);
          console.table(data);
          console.groupEnd();
        }

        next(data);

        once && teardown();
      },
      (error) => {
        console.error(error);
        next(null, error);
      }
    );

    return () => teardown();
  };

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