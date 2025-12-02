/**
 * Error Handling Utilities
 * 
 * @description
 * Centralized error handling utilities for consistent error messages
 * and user-friendly toast notifications throughout the application.
 */

import toast from 'react-hot-toast';

/**
 * Error types for categorization
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
}

/**
 * User-friendly error messages
 */
export const ERROR_MESSAGES = {
  [ErrorType.NETWORK]: 'Unable to connect. Please check your internet connection.',
  [ErrorType.API]: 'Something went wrong. Please try again later.',
  [ErrorType.VALIDATION]: 'Please check your input and try again.',
  [ErrorType.AUTHENTICATION]: 'Authentication failed. Please log in again.',
  [ErrorType.NOT_FOUND]: 'The requested item was not found.',
  [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.',
};

/**
 * Custom Application Error Class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType = ErrorType.UNKNOWN,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Determine error type from error object
 */
export function getErrorType(error: unknown): ErrorType {
  if (error instanceof AppError) {
    return error.type;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return ErrorType.NETWORK;
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    
    if (err.statusCode === 404 || err.status === 404) {
      return ErrorType.NOT_FOUND;
    }
    
    if (err.statusCode === 401 || err.status === 401 || err.statusCode === 403 || err.status === 403) {
      return ErrorType.AUTHENTICATION;
    }
    
    if (err.statusCode === 400 || err.status === 400 || err.name === 'ValidationError') {
      return ErrorType.VALIDATION;
    }
    
    if (err.statusCode >= 500 || err.status >= 500) {
      return ErrorType.API;
    }
  }

  return ErrorType.UNKNOWN;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  // If it's an AppError with a message, use that
  if (error instanceof AppError && error.message) {
    return error.message;
  }

  // If it's a regular Error with a message
  if (error instanceof Error && error.message) {
    // Don't expose technical error messages in production
    if (process.env.NODE_ENV === 'production') {
      const errorType = getErrorType(error);
      return ERROR_MESSAGES[errorType];
    }
    return error.message;
  }

  // If it's an object with a message property
  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    if (err.message) {
      return process.env.NODE_ENV === 'production' 
        ? ERROR_MESSAGES[getErrorType(error)]
        : err.message;
    }
    if (err.error) {
      return process.env.NODE_ENV === 'production'
        ? ERROR_MESSAGES[getErrorType(error)]
        : err.error;
    }
  }

  // Fallback to generic message
  return ERROR_MESSAGES[ErrorType.UNKNOWN];
}

/**
 * Handle error and show toast notification
 * 
 * @param error - The error object
 * @param customMessage - Optional custom message to override default
 * @param showToast - Whether to show toast notification (default: true)
 * @returns The error message string
 * 
 * @example
 * ```typescript
 * try {
 *   await fetchData();
 * } catch (error) {
 *   handleError(error);
 * }
 * ```
 */
export function handleError(
  error: unknown,
  customMessage?: string,
  showToast: boolean = true
): string {
  const message = customMessage || getErrorMessage(error);
  const errorType = getErrorType(error);

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Handler]', {
      type: errorType,
      message,
      error,
    });
  }

  // Show toast notification
  if (showToast) {
    toast.error(message, {
      id: `error-${Date.now()}`, // Prevent duplicate toasts
    });
  }

  // In production, you would send to error tracking service
  // Example: Sentry.captureException(error);

  return message;
}

/**
 * Handle success and show toast notification
 * 
 * @param message - Success message to display
 * @param duration - How long to show the toast (default: 3000ms)
 * 
 * @example
 * ```typescript
 * handleSuccess('Product added to cart!');
 * ```
 */
export function handleSuccess(message: string, duration?: number) {
  toast.success(message, {
    duration,
    id: `success-${Date.now()}`,
  });
}

/**
 * Show loading toast
 * 
 * @param message - Loading message
 * @returns Toast ID for updating or dismissing
 * 
 * @example
 * ```typescript
 * const toastId = showLoading('Adding to cart...');
 * try {
 *   await addToCart();
 *   toast.success('Added to cart!', { id: toastId });
 * } catch (error) {
 *   toast.error('Failed to add to cart', { id: toastId });
 * }
 * ```
 */
export function showLoading(message: string): string {
  return toast.loading(message);
}

/**
 * Dismiss a specific toast
 */
export function dismissToast(toastId: string) {
  toast.dismiss(toastId);
}

/**
 * Dismiss all toasts
 */
export function dismissAllToasts() {
  toast.dismiss();
}

/**
 * Async function wrapper with error handling
 * 
 * @param fn - Async function to wrap
 * @param errorMessage - Custom error message
 * @returns Wrapped function with error handling
 * 
 * @example
 * ```typescript
 * const safeLoadProducts = withErrorHandling(
 *   async () => await getProducts(),
 *   'Failed to load products'
 * );
 * 
 * const products = await safeLoadProducts();
 * ```
 */
export function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage?: string
): () => Promise<T | undefined> {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, errorMessage);
      return undefined;
    }
  };
}
