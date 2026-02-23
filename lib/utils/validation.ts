/**
 * URL Parameter Validation Utilities (MED-2)
 *
 * @description
 * Validates URL parameters before using them in API calls to prevent
 * injection attacks and malformed requests.
 */

import { z } from 'zod';

// ============================================================================
// Validation Schemas
// ============================================================================

/**
 * Shop name validation schema
 * - Alphanumeric characters, hyphens, and underscores
 * - 1-50 characters
 * - No special characters that could be used for injection
 */
export const shopNameSchema = z
  .string()
  .min(1, 'Shop name is required')
  .max(50, 'Shop name must be less than 50 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Shop name must contain only letters, numbers, hyphens, and underscores'
  );

/**
 * Cart ID validation schema
 * - MongoDB ObjectId format (24 hex characters) or UUID
 * - Can also accept alphanumeric strings with hyphens
 */
export const cartIdSchema = z
  .string()
  .min(1, 'Cart ID is required')
  .max(100, 'Cart ID must be less than 100 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Cart ID must contain only letters, numbers, hyphens, and underscores'
  );

/**
 * SKU ID validation schema
 * - Alphanumeric characters, hyphens, and underscores
 * - 1-100 characters
 */
export const skuIdSchema = z
  .string()
  .min(1, 'SKU ID is required')
  .max(100, 'SKU ID must be less than 100 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'SKU ID must contain only letters, numbers, hyphens, and underscores'
  );

/**
 * Product slug validation schema
 * - URL-friendly string
 * - Alphanumeric, hyphens, underscores
 */
export const productSlugSchema = z
  .string()
  .min(1, 'Product slug is required')
  .max(200, 'Product slug must be less than 200 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Product slug must contain only letters, numbers, hyphens, and underscores'
  );

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates shop name parameter (MED-2)
 * @param shopName - Shop name/slug to validate
 * @returns Validated shop name
 * @throws Error if validation fails
 */
export function validateShopName(shopName: string): string {
  const result = shopNameSchema.safeParse(shopName);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid shop name';
    throw new Error(`Validation failed for shopName: ${errorMessage}`);
  }

  return result.data;
}

/**
 * Validates cart ID parameter (MED-2)
 * @param cartId - Cart ID to validate
 * @returns Validated cart ID
 * @throws Error if validation fails
 */
export function validateCartId(cartId: string): string {
  const result = cartIdSchema.safeParse(cartId);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid cart ID';
    throw new Error(`Validation failed for cartId: ${errorMessage}`);
  }

  return result.data;
}

/**
 * Validates SKU ID parameter (MED-2)
 * @param skuId - SKU ID to validate
 * @returns Validated SKU ID
 * @throws Error if validation fails
 */
export function validateSkuId(skuId: string): string {
  const result = skuIdSchema.safeParse(skuId);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid SKU ID';
    throw new Error(`Validation failed for skuId: ${errorMessage}`);
  }

  return result.data;
}

/**
 * Validates product slug parameter (MED-2)
 * @param slug - Product slug to validate
 * @returns Validated slug
 * @throws Error if validation fails
 */
export function validateProductSlug(slug: string): string {
  const result = productSlugSchema.safeParse(slug);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || 'Invalid product slug';
    throw new Error(`Validation failed for slug: ${errorMessage}`);
  }

  return result.data;
}

/**
 * Validates multiple parameters at once
 * @param params - Object containing parameters to validate
 * @returns Object with validated values
 * @throws Error with all validation failures
 */
export function validateUrlParams(params: {
  shopName?: string;
  cartId?: string;
  skuId?: string;
  slug?: string;
}): {
  shopName?: string;
  cartId?: string;
  skuId?: string;
  slug?: string;
} {
  const errors: string[] = [];
  const result: Record<string, string> = {};

  if (params.shopName !== undefined) {
    const validation = shopNameSchema.safeParse(params.shopName);
    if (!validation.success) {
      errors.push(`shopName: ${validation.error.issues[0]?.message}`);
    } else {
      result.shopName = validation.data;
    }
  }

  if (params.cartId !== undefined) {
    const validation = cartIdSchema.safeParse(params.cartId);
    if (!validation.success) {
      errors.push(`cartId: ${validation.error.issues[0]?.message}`);
    } else {
      result.cartId = validation.data;
    }
  }

  if (params.skuId !== undefined) {
    const validation = skuIdSchema.safeParse(params.skuId);
    if (!validation.success) {
      errors.push(`skuId: ${validation.error.issues[0]?.message}`);
    } else {
      result.skuId = validation.data;
    }
  }

  if (params.slug !== undefined) {
    const validation = productSlugSchema.safeParse(params.slug);
    if (!validation.success) {
      errors.push(`slug: ${validation.error.issues[0]?.message}`);
    } else {
      result.slug = validation.data;
    }
  }

  if (errors.length > 0) {
    throw new Error(`URL parameter validation failed: ${errors.join(', ')}`);
  }

  return result;
}
