import { AnalyticsEvent } from '@/types';

/**
 * Analytics Hook
 * Mock analytics tracking for demo purposes
 * Logs events to console in development
 */
export function useAnalytics() {
  const trackEvent = (event: AnalyticsEvent) => {
    console.log('[Analytics]', event);
    
    const events = JSON.parse(localStorage.getItem('analytics') || '[]');
    events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('analytics', JSON.stringify(events.slice(-100)));
  };

  return { trackEvent };
}
