/**
 * Web Vitals reporting component
 * Tracks and reports Core Web Vitals metrics
 */

'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVitals } from '@/lib/utils/performance';

export function WebVitals() {
  useReportWebVitals(metric => {
    reportWebVitals(metric);
  });

  return null;
}
