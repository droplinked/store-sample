/**
 * API Client for communicating with the backend API
 * Handles authentication, error handling, and request/response logging
 */

import { ApiError } from '@/lib/types';

/**
 * Configuration options for the API client
 */
export interface ApiClientConfig {
  timeout?: number;
  useProxy?: boolean;
}

/**
 * Request options for API calls
 */
export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * ApiClient class for making authenticated requests to the backend API
 */
export class ApiClient {
  private timeout: number;
  private useProxy: boolean;

  constructor(config: ApiClientConfig = {}) {
    this.timeout = config.timeout || 30000; // Default 30 seconds
    this.useProxy = config.useProxy ?? true; // Use proxy by default to avoid CORS
  }

  /**
   * Build the request URL, using proxy if enabled
   */
  private buildUrl(endpoint: string): string {
    if (this.useProxy) {
      // Route through Next.js API proxy
      const url = new URL('/api/proxy', window.location.origin);
      url.searchParams.set('path', endpoint);
      return url.toString();
    }
    // Direct API call (will likely hit CORS)
    return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }

  /**
   * Make an authenticated request to the API
   */
  async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    const requestTimeout = options?.timeout || this.timeout;

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Parse and return successful response
      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError(
            408,
            `Request timeout: The request to ${endpoint} took longer than ${requestTimeout}ms`,
            { endpoint, timeout: requestTimeout }
          );
        }

        // Network error (no response received)
        throw new ApiError(
          0,
          `Network error: Failed to connect to the API. ${error.message}`,
          { endpoint, originalError: error.message }
        );
      }

      // Unknown error
      throw new ApiError(
        0,
        `Unknown error occurred while making request to ${endpoint}`,
        { endpoint }
      );
    }
  }

  /**
   * Handle error responses from the API
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: unknown;
    let errorMessage = response.statusText || 'Request failed';

    try {
      errorData = await response.json();

      // Try to extract error message from common API error formats
      if (errorData && typeof errorData === 'object') {
        const data = errorData as Record<string, unknown>;

        if (typeof data.message === 'string') {
          errorMessage = data.message;
        } else if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        }
      }
    } catch {
      // If response body is not JSON, use status text
      errorMessage = response.statusText || `HTTP ${response.status} error`;
    }

    throw new ApiError(
      response.status,
      `API request failed: ${errorMessage}`,
      errorData
    );
  }

  /**
   * Convenience method for GET requests
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Convenience method for POST requests
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Convenience method for PATCH requests
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Create a configured API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Default API client instance for use throughout the application
 * Routes requests through Next.js API proxy to avoid CORS issues
 */
export const apiClient = createApiClient({
  useProxy: true,
  timeout: 30000,
});
