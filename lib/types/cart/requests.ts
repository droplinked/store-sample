/**
 * API request types for cart operations
 */

import { z } from 'zod';

/**
 * Request to create a new cart
 */
export interface CreateCartRequest {
  shopId: string;
  email?: string;
  customerId?: string;
  returnUrl: string;
}

/**
 * Request to add product to cart
 */
export interface AddToCartRequest {
  skuId: string;
  quantity: number;
  m2m_data?: {
    position: string;
    artworkUrl: string;
  };
}

/**
 * Request to update cart item quantity
 */
export interface UpdateCartItemRequest {
  quantity: number;
}

/**
 * Request to apply discount code
 */
export interface ApplyDiscountRequest {
  code: string;
}

/**
 * Schema for validating quantity input
 */
export const QuantityInputSchema = z.number().int().positive({
  message: 'Quantity must be a positive integer',
});


/**
 * Schema for validating variant selection input
 */
export const VariantSelectionInputSchema = z.record(
  z.string(),
  z.string().min(1, 'Variant option cannot be empty')
);

/**
 * Schema for validating add to cart input
 */
export const AddToCartInputSchema = z.object({
  skuId: z.string().min(1, 'SKU ID is required'),
  quantity: QuantityInputSchema,
  m2m_data: z
    .object({
      position: z.string(),
      artworkUrl: z.string().url(),
    })
    .optional(),
});

/**
 * Schema for validating update cart item input
 */
export const UpdateCartItemInputSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
  quantity: QuantityInputSchema,
});

/**
 * Schema for validating remove cart item input
 */
export const RemoveCartItemInputSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

