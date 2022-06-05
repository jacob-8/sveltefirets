import { getPerformance, trace, type PerformanceTrace } from 'firebase/performance';
import { getFirebaseApp } from './init';

export function startTrace(name: string) {
  const perf = getPerformance(getFirebaseApp());
  const t = trace(perf, name);
  t.start();
  return t;
}

export function stopTrace(t: PerformanceTrace) {
  t.stop();
  return null;
}

// add more from https://modularfirebase.web.app/common-use-cases/performance-monitoring/
