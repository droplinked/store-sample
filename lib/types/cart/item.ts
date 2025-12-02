/**
 * Cart item types
 */

import { z } from 'zod';

/**
 * Cart item model
 */
export interface CartItem {
  productId: string;
  slug: string;
  skuId: string;

  sku: {
    variantKey: string;
    attributes: {
      key: string;
      value: string;
      caption: string;
    }[];
  };

  quantity: number;

  // Product Info
  title: string;
  description: string;
  productType: 'DIGITAL' | 'normal' | 'POD' | 'EVENT';
  thumbnail: string;

  // Pricing
  unitPrice: number; // Price per item
  totalPrice: number; // quantity * unitPrice (after discounts)
  totalPriceBeforeDiscount: number;

  // Discounts
  ruleset: {
    type: string;
    discountPercentage: number; // Token-gated discount
  };

  // Print-on-Demand data
  m2m: {
    position: string;
    artworkUrl: string;
  } | null;
}

/**
 * Zod schema for CartItem validation
 */
export const CartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  skuId: z.string(),
  sku: z.object({
    variantKey: z.string(),
    attributes: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
        caption: z.string(),
      })
    ),
  }),
  quantity: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  productType: z.enum(['DIGITAL', 'normal', 'POD', 'EVENT']),
  thumbnail: z.string().url(),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  totalPriceBeforeDiscount: z.number().nonnegative(),
  ruleset: z.object({
    type: z.string(),
    discountPercentage: z.number().min(0).max(100),
  }),
  m2m: z
    .object({
      position: z.string(),
      artworkUrl: z.string().url(),
    })
    .nullable(),
});

/**
 * Type inferred from CartItemSchema
 */
export type CartItemType = z.infer<typeof CartItemSchema>;
