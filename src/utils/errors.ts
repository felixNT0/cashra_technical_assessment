/**
 * Error handling utilities
 * In production, these would integrate with error tracking services
 */

type ErrorContext = {
  action?: string;
  component?: string;
  [key: string]: unknown;
};

/**
 * Logs errors with context
 * In production, this would send to error tracking service (e.g., Sentry)
 */
export const logError = (error: unknown, context?: ErrorContext): void => {
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error, context);
  }
  // In production: send to error tracking service
  // Example: Sentry.captureException(error, { extra: context });
};

/**
 * Creates a safe error message for user display
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};

