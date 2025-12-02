/**
 * Address-related types for shipping
 */

import { z } from 'zod';

/**
 * Address model for shipping
 */
export interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

/**
 * Zod schema for Address validation
 */
export const AddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().nullable(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone is required'),
});

/**
 * Type inferred from AddressSchema
 */
export type AddressType = z.infer<typeof AddressSchema>;
