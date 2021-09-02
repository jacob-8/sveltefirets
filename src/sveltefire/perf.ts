import { getPerformance, trace } from 'firebase/performance';
import type { PerformanceTrace } from 'firebase/performance';
import { firebaseApp } from '.';

export function startTrace(name: string) {
  const perf = getPerformance(firebaseApp);
  const t = trace(perf, name);
  t.start();
  return t;
}

export function stopTrace(t: PerformanceTrace) {
  t.stop();
  return null;
}

// add more from https://modularfirebase.web.app/common-use-cases/performance-monitoring/
