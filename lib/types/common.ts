/**
 * Common type definitions and utilities
 */

import { z } from 'zod';

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Error response from API
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// ============================================================================
// Error Classes
// ============================================================================

/**
 * ApiError represents an error from the backend API
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * ValidationError represents a validation failure
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * CartError represents a cart-specific error
 */
export class CartError extends Error {
  constructor(
    message: string,
    public code:
      | 'CART_NOT_FOUND'
      | 'ITEM_NOT_FOUND'
      | 'INVALID_QUANTITY'
      | 'CART_EXPIRED'
      | 'OUT_OF_STOCK'
  ) {
    super(message);
    this.name = 'CartError';
    Object.setPrototypeOf(this, CartError.prototype);
  }
}

// ============================================================================
// Zod Schemas for Validation
// ============================================================================

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().optional(),
  });

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    hasMore: z.boolean(),
  });

export const ApiErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().int(),
  details: z.record(z.string(), z.array(z.string())).optional(),
});

// Type exports
export type ApiErrorResponseType = z.infer<typeof ApiErrorResponseSchema>;

// ============================================================================
// Backend/Legacy Types (for test compatibility)
// ============================================================================

/**
 * Backend product SKU format with variantOptions
 * Used for testing and backward compatibility
 */
export interface BackendProductSKU {
  id: string;
  sku: string;
  price: number;
  stock: number;
  variantOptions: Record<string, string>;
}

/**
 * Backend product format
 * Used for testing and backward compatibility
 */
export interface BackendProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: unknown[];
  category: string;
  tags: string[];
  inStock: boolean;
  variants?: { name: string; options: string[] }[];
  skus?: BackendProductSKU[];
}

