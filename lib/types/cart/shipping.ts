/**
 * Shipping-related types for cart
 */

import { z } from 'zod';

/**
 * Shipping rate option
 */
export interface ShippingRate {
  rateId: string;
  carrier: string; // "USPS", "FedEx", "UPS"
  service: string; // "Priority Mail", "Ground"
  name: string; // Display name
  price: number;
  estimatedDays: number;
  selected: boolean; // Currently selected
}

/**
 * Shipping option (shipment group)
 */
export interface ShippingOption {
  type: 'THIRD_PARTY' | 'CUSTOM' | 'POD';
  shipmentId: string; // Unique identifier for this shipment
  productIds: string[]; // Products in this shipment
  rates: ShippingRate[]; // Available shipping methods
}

/**
 * Request to select shipping method
 */
export interface SelectShippingRequest {
  selectedShippingRate: {
    shipmentId: string;
    rateId: string;
  }[];
}

/**
 * Zod schema for ShippingRate validation
 */
export const ShippingRateSchema = z.object({
  rateId: z.string(),
  carrier: z.string(),
  service: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  estimatedDays: z.number().int().nonnegative(),
  selected: z.boolean(),
});

/**
 * Zod schema for ShippingOption validation
 */
export const ShippingOptionSchema = z.object({
  type: z.enum(['THIRD_PARTY', 'CUSTOM', 'POD']),
  shipmentId: z.string(),
  productIds: z.array(z.string()),
  rates: z.array(ShippingRateSchema),
});

/**
 * Type inferred from ShippingRateSchema
 */
export type ShippingRateType = z.infer<typeof ShippingRateSchema>;

/**
 * Type inferred from ShippingOptionSchema
 */
export type ShippingOptionType = z.infer<typeof ShippingOptionSchema>;
