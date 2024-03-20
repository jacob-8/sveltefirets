import { readable, writable } from 'svelte/store';
import {
  onSnapshot,
  query,
  type QueryConstraint,
} from 'firebase/firestore';

import { colRef, getCollection, type CollectionPredicate } from '../firestore';
import { startTrace, stopTrace } from '../perf';

export async function incrementalCollectionStore<T>(
  path: CollectionPredicate<T>,
  options: {
    initialQueryConstraints: QueryConstraint[],
    realtimeQueryConstraints?: QueryConstraint[],
    log?: boolean;
    traceId?: string;
    idField?: string;
    refField?: string;
  }) {
  const { initialQueryConstraints = [], realtimeQueryConstraints = [], log, traceId, idField = 'id', refField } = options;

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

        if (initial_collection.length === data.length && Date.now() - start_realtime_ms < 100) 
          return log && console.log('ignoring next because it is the same as initial');

        next(data);
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