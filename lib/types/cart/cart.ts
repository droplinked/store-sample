/**
 * Main cart types
 */

import { z } from 'zod';
import type { Address } from './address';
import type { ShippingOption } from './shipping';
import type { FinancialDetails } from './financial';
import type { CartItem } from './item';
import { AddressSchema } from './address';
import { ShippingOptionSchema } from './shipping';
import { FinancialDetailsSchema } from './financial';
import { CartItemSchema } from './item';

/**
 * Complete cart model
 */
export interface Cart {
  // Identifiers
  id: string;
  shopId: string;
  customerId: string | null;
  email: string | null;

  // Status
  status: 'ACTIVE' | 'EXPIRED';

  // Items
  items: CartItem[];

  // Shipping (for physical products)
  shippingAddressId: string | null;
  shippingAddress: Address | null;
  availableShipping: ShippingOption[];

  // Discounts
  giftcard: {
    type: 'PERCENTAGE' | 'AMOUNT';
    value: number;
    code: string;
  } | null;

  // Financial Details (calculated by backend)
  financialDetails: FinancialDetails;

  // Important URLs
  checkoutUrl: string; // Direct checkout link
  returnUrl: string;

  // Additional
  additional: {
    note: string;
  };

  // Timestamps
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Zod schema for Cart validation
 */
export const CartSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  customerId: z.string().nullable(),
  email: z.string().email().nullable(),
  status: z.enum(['ACTIVE', 'EXPIRED']),
  items: z.array(CartItemSchema),
  shippingAddressId: z.string().nullable(),
  shippingAddress: AddressSchema.nullable(),
  availableShipping: z.array(ShippingOptionSchema),
  giftcard: z
    .object({
      type: z.enum(['PERCENTAGE', 'AMOUNT']),
      value: z.number().positive(),
      code: z.string(),
    })
    .nullable(),
  financialDetails: FinancialDetailsSchema,
  checkoutUrl: z.string().url(),
  returnUrl: z.string().url(),
  additional: z.object({
    note: z.string(),
  }),
  expiredAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Type inferred from CartSchema
 */
export type CartType = z.infer<typeof CartSchema>;
