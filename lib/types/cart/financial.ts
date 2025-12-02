/**
 * Financial calculation types for cart
 */

import { z } from 'zod';

/**
 * Financial details for cart/order
 */
export interface FinancialDetails {
  tax: {
    total: number;
    droplinked: number; // Platform fee
    producer: number; // Merchant tax
  };

  discounts: {
    ruleset: number; // Token-gated discount amount
    giftCard: number; // Coupon discount amount
  };

  shipping: {
    total: number;
    dropLinkedShare: number;
    merchantShare: number;
  };

  amounts: {
    productTotal: number; // Sum of item prices
    discountTotal: number; // Total discount
    taxTotal: number;
    shippingTotal: number;
    totalBeforeDiscount: number;
    finalTotalBeforeTax: number;
    totalAmount: number; // FINAL CHECKOUT AMOUNT
    productTotalAfterDiscount: number;
  };
}

/**
 * Zod schema for FinancialDetails validation
 */
export const FinancialDetailsSchema = z.object({
  tax: z.object({
    total: z.number().nonnegative(),
    droplinked: z.number().nonnegative(),
    producer: z.number().nonnegative(),
  }),
  discounts: z.object({
    ruleset: z.number().nonnegative(),
    giftCard: z.number().nonnegative(),
  }),
  shipping: z.object({
    total: z.number().nonnegative(),
    dropLinkedShare: z.number().nonnegative(),
    merchantShare: z.number().nonnegative(),
  }),
  amounts: z.object({
    productTotal: z.number().nonnegative(),
    discountTotal: z.number().nonnegative(),
    taxTotal: z.number().nonnegative(),
    shippingTotal: z.number().nonnegative(),
    totalBeforeDiscount: z.number().nonnegative(),
    finalTotalBeforeTax: z.number().nonnegative(),
    totalAmount: z.number().nonnegative(),
    productTotalAfterDiscount: z.number().nonnegative(),
  }),
});

/**
 * Type inferred from FinancialDetailsSchema
 */
export type FinancialDetailsType = z.infer<typeof FinancialDetailsSchema>;
