import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for production error tracking
 */
export const initSentry = () => {
  if (import.meta.env.PROD && import.meta.env.SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.1, // Capture 10% of transactions
      // Session Replay
      replaysSessionSampleRate: 0.1, // Sample 10% of sessions
      replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
      // Environment
      environment: import.meta.env.MODE,
      // Filter out common non-critical errors
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
      ],
    });
  }
};
