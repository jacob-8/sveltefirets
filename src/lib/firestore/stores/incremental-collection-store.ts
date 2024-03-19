import { readable, writable } from 'svelte/store';
import {
  onSnapshot,
  query,
  type CollectionReference,
  type QueryConstraint,
} from 'firebase/firestore';

import { colRef, getCollection } from '../firestore';
import { startTrace, stopTrace } from '../perf';

export async function incrementalCollectionStore<T>(
  path: CollectionReference<T> | string,
  options: {
    initialQueryConstraints: QueryConstraint[],
    realtimeQueryConstraints?: QueryConstraint[],
    log?: boolean;
    traceId?: string;
    maxWait?: number;
    once?: boolean;
    idField?: string;
    refField?: string;
  }) {
  const { initialQueryConstraints = [], realtimeQueryConstraints = [], log, traceId, maxWait = 10000, once, idField = 'id', refField } = options;

  const ref = typeof path === 'string' ? colRef<T>(path) : path;
  const initial_collection = await getCollection<T>(ref, initialQueryConstraints);
  
  if (typeof window === 'undefined') {
    const { subscribe } = readable(initial_collection);
    return {
      subscribe,
      ref,
      get error() {
        return false;
      },
    };
  }

  const { subscribe, set } = writable(initial_collection, start);
  const q = query(ref, ...realtimeQueryConstraints);
  const trace = traceId && startTrace(traceId);
  const start_realtime_ms = Date.now();
  let _error = null;

  function start() {
    const teardown = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          ...(idField ? { [idField]: docSnap.id } : null),
          ...(refField ? { [refField]: docSnap.ref } : null),
        }));

        if (log) {
          const type = 'Updated Query';
          console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
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

  function next(val: T[], err?: Error) {
    _error = err || null;
    if (initial_collection.length === val.length && Date.now() - start_realtime_ms < 100) 
      return console.log('ignoring next');
    set(val);
    trace && stopTrace(trace);
  };

  return {
    subscribe,
    ref,
    get error() {
      return _error;
    },
  };
}