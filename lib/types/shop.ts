/**
 * Shop-related type definitions
 * Based on Droplinked API specification
 */

import { z } from 'zod';

/**
 * Currency configuration for shop pricing
 */
export interface Currency {
  abbreviation: string; // "USD", "EUR"
  symbol: string; // "$", "€"
  conversionRateToUSD: number;
  decimalPlaces: number; // 2 for most currencies
  thousandsSeparator: string; // ","
  decimalSeparator: string; // "."
  symbolPosition: 'before' | 'after';
  spaceBetweenAmountAndSymbol: boolean;
}

/**
 * Payment method configuration
 */
export interface PaymentMethod {
  id: string;
  type: 'STRIPE' | 'PAYPAL' | 'ETH' | 'POLYGON' | 'SOLANA' | string;
  isActive: boolean;
  chainId?: string; // For crypto payments
  destinationAddress?: string; // Wallet address for crypto
  tokens?: {
    // Accepted tokens (for crypto)
    id: string;
    isActive: boolean;
    decimals: number;
    type: string;
  }[];
}

/**
 * Shop social media links
 */
export interface SocialMedia {
  instagram: string | null;
  twitter: string | null;
  discord: string | null;
  telegram: string | null;
  youtube: string | null;
}

/**
 * Shop design/theme configuration
 */
export interface ShopDesign {
  primaryColor: string;
  fontFamily: string;
  headerBackground: string;
  // ... other design properties can be added
}

/**
 * Complete shop model
 */
export interface Shop {
  // Identifiers
  id: string;
  url: string; // Unique identifier (e.g., "myshop")
  name: string;
  ownerId: string;

  // Branding
  logo: string; // URL to logo image
  description: string;
  backgroundColor: string;

  // Settings
  isAgeRestricted: boolean;
  launchDate: string | null; // ISO date string for countdown

  // Currency Configuration
  currency: Currency;

  // Payment Methods
  paymentMethods: PaymentMethod[];

  // Social Media Links
  socialMedia: SocialMedia;

  // Design/Theme
  design: ShopDesign;
}

// ============================================================================
// Zod Schemas for Validation
// ============================================================================

export const CurrencySchema = z.object({
  abbreviation: z.string(),
  symbol: z.string(),
  conversionRateToUSD: z.number().positive(),
  decimalPlaces: z.number().int().nonnegative().default(2),
  thousandsSeparator: z.string().default(','),
  decimalSeparator: z.string().default('.'),
  symbolPosition: z.enum(['before', 'after']).default('before'),
  spaceBetweenAmountAndSymbol: z.boolean().default(false),
}).passthrough();

export const PaymentMethodSchema = z.object({
  type: z.string(),
  enabled: z.boolean(),
  label: z.string().optional(),
  provider: z.string().optional(),
  network: z.string().optional(),
  id: z.string().optional(),
  isActive: z.boolean().optional(),
  chainId: z.string().optional(),
  destinationAddress: z.string().optional(),
  tokens: z
    .array(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
        decimals: z.number().int().nonnegative(),
        type: z.string(),
      })
    )
    .optional(),
}).passthrough();

export const LoginMethodSchema = z.object({
  name: z.string(),
  type: z.string(),
  isActivated: z.boolean(),
}).passthrough();

export const SocialMediaSchema = z.object({
  instagram: z.string().nullable().optional(),
  twitter: z.string().nullable().optional(),
  discord: z.string().nullable().optional(),
  telegram: z.string().nullable().optional(),
  youtube: z.string().nullable().optional(),
}).passthrough();

export const ShopDesignSchema = z.object({
  primaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
  headerBackground: z.string().optional(),
}).passthrough();

export const ShopSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  url: z.string(),
  name: z.string(),
  ownerId: z.string().optional(),
  logo: z.string().optional(),
  description: z.string().default(''),
  backgroundColor: z.string().optional(),
  isAgeRestricted: z.boolean().default(false),
  launchDate: z.string().nullable(),
  currency: CurrencySchema,
  paymentMethods: z.array(PaymentMethodSchema).default([]),
  loginMethods: z.array(LoginMethodSchema).optional().default([]),
  socialLinks: z.array(z.any()).optional().default([]),
  socialMedia: SocialMediaSchema.optional(),
  design: ShopDesignSchema.optional(),
  shopTemplate: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deployedContracts: z.array(z.any()).optional().default([]),
}).passthrough();

// Type exports from schemas
export type CurrencyType = z.infer<typeof CurrencySchema>;
export type PaymentMethodType = z.infer<typeof PaymentMethodSchema>;
export type SocialMediaType = z.infer<typeof SocialMediaSchema>;
export type ShopDesignType = z.infer<typeof ShopDesignSchema>;
export type ShopType = z.infer<typeof ShopSchema>;
