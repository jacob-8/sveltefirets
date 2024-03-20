import { readable, writable } from 'svelte/store';
import {
  onSnapshot,
} from 'firebase/firestore';

import { getDocumentOrError, type DocPredicate } from '../firestore';
import { startTrace, stopTrace } from '../perf';

export async function awaitableDocStore<T>(
  path: DocPredicate<T>,
  options: { 
    log?: boolean; 
    traceId?: string; 
  } = {}
) {
  const { log, traceId } = options;

  const { data: initial_doc, ref, error } = await getDocumentOrError(path);

  if (typeof window === 'undefined') {
    const { subscribe } = readable(initial_doc);
    return {
      subscribe,
      initial_doc,
      ref,
      error,
    };
  }

  const { subscribe, set } = writable(initial_doc, start);
  const trace = traceId && startTrace(traceId);

  let _error = null;

  function start() {
    const teardown = onSnapshot(
      ref,
      (snapshot) => {
        const data: T & { id?: string } = snapshot.data() || null;
        if (data)
          data.id = snapshot.id;
        
        if (log) {
          console.groupCollapsed(`Doc ${snapshot.id}`);
          console.log(`Path: ${ref.path}`);
          console.table(data);
          console.groupEnd();
        }

        const same_as_initial = JSON.stringify(data) === JSON.stringify(initial_doc);
        if (same_as_initial) {
          if (log) console.log({ same_as_initial, initial_doc, data });
          return;
        }

        next(data);
      },
      (error) => {
        console.error(error);
        next(null, error);
      }
    );

    return () => teardown();
  };

  function next(val: T, err?: Error) {
    _error = err || null;
    set(val);
    trace && stopTrace(trace);
  };

  return {
    subscribe,
    initial_doc,
    ref,
    get error() {
      return error || _error;
    },
  };
}