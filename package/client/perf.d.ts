import type { PerformanceTrace } from 'firebase/performance';
export declare function startTrace(name: string): PerformanceTrace;
export declare function stopTrace(t: PerformanceTrace): any;
