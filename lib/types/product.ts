/**
 * Product-related type definitions
 * Based on Droplinked API specification
 */

import { z } from 'zod';

/**
 * Product image model
 */
export interface ProductImage {
  id?: string; // Optional - API doesn't always provide it
  original: string; // Full-size image URL
  thumbnail: string; // Thumbnail URL
  alt: string; // Alt text for accessibility
}

/**
 * Product SKU (Stock Keeping Unit) - represents a specific variant
 */
export interface ProductSKU {
  id: string;

  // Pricing
  price: number; // Current price (after shop-level discount)
  rawPrice?: number | null; // Original price

  // Inventory
  inventory: {
    policy: boolean; // Track inventory?
    quantity: number; // -1 = unlimited, 0 = out of stock, >0 = in stock
  };

  // Variant Attributes (e.g., color: red, size: large)
  attributes: {
    key: string; // "color", "size"
    value: string; // "red", "large"
    caption: string; // "Red", "Large" (display name)
  }[];

  // Optional
  image?: string | null; // SKU-specific image

  // Dimensions for shipping calculations
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  } | null;
}

/**
 * Product property (defines available variants)
 */
export interface ProductProperty {
  value: string; // Property key (e.g., "color")
  title: string; // Display name (e.g., "Color")
  isCustom?: boolean;
  items: {
    // Available options
    value: string; // "red"
    caption: string; // "Red"
  }[];
}

/**
 * Complete product model
 */
export interface Product {
  // Basic Info
  id: string;
  title: string;
  slug: string; // URL-friendly identifier
  description: string;

  // Type determines behavior
  type: 'digital' | 'physical' | 'pod';
  // digital = No shipping, instant delivery
  // physical = Physical product, requires shipping
  // pod = Print-on-Demand, special handling

  status: 'draft' | 'published' | 'archived';

  // Media
  images: ProductImage[];
  defaultImageIndex: number;

  // Visibility
  isVisible: boolean; // Public or private
  isPurchasable: boolean; // Can be bought

  // Pricing
  discountPercentage?: number | null; // Shop-level discount

  // Collection
  collectionId?: string | null;
  collectionName?: string | null;

  // Token-Gating (NFT/Token Required to Purchase)
  isGated: boolean;
  rulesetId?: string | null; // ID of access rules
  gatedDescription?: string | null; // Message for gated products

  // Variants (SKUs)
  skus: ProductSKU[];
  properties: ProductProperty[]; // Defines available variants

  // Tags (optional)
  tags?: string[];

  // Shipping (for physical products)
  shippingProfileId?: string | null;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Simplified product for listing pages
 */
export interface ProductListItem {
  id: string;
  title: string;
  slug: string;
  images: ProductImage[];
  lowestPrice: number; // API returns lowestPrice, not lowestSkuPrice
  discountPercentage?: number;
  isGated: boolean;
  type: 'digital' | 'physical' | 'pod'; // API uses 'physical' not 'normal'
  collectionName: string | null;
  thumbnail?: string;
  isPurchasable: boolean;
  discountRuleset?: boolean;
  gatedRuleset?: boolean;
}

// ============================================================================
// Zod Schemas for Validation
// ============================================================================

export const ProductImageSchema = z.object({
  id: z.string().optional(),
  original: z.string().url(),
  thumbnail: z.string().url(),
  alt: z.string(),
});

export const ProductSKUSchema = z.object({
  id: z.string(),
  price: z.number().nonnegative(),
  rawPrice: z.number().nonnegative().nullish(),
  inventory: z.object({
    policy: z.boolean(),
    quantity: z.number().int(),
  }),
  attributes: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      caption: z.string(),
    })
  ),
  image: z.string().url().nullish(),
  dimensions: z
    .object({
      length: z.number().nonnegative(),
      width: z.number().nonnegative(),
      height: z.number().nonnegative(),
      weight: z.number().nonnegative(),
    })
    .nullish(),
});

export const ProductPropertySchema = z.object({
  value: z.string(),
  title: z.string(),
  isCustom: z.boolean().optional().default(false),
  items: z.array(
    z.object({
      value: z.string(),
      caption: z.string(),
    })
  ),
});

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(''),
  type: z.enum(['digital', 'physical', 'pod']).catch('physical'),
  status: z.enum(['draft', 'published', 'archived']).catch('published'),
  images: z.array(ProductImageSchema).default([]),
  defaultImageIndex: z.number().int().nonnegative().default(0),
  isVisible: z.boolean().default(true),
  isPurchasable: z.boolean().default(true),
  discountPercentage: z.number().min(0).max(100).nullish(),
  collectionId: z.string().nullish(),
  collectionName: z.string().nullish(),
  isGated: z.boolean().default(false),
  rulesetId: z.string().nullish(),
  gatedDescription: z.string().nullish(),
  skus: z.array(ProductSKUSchema).default([]),
  properties: z.array(ProductPropertySchema).default([]),
  tags: z.array(z.string()).optional().default([]),
  shippingProfileId: z.string().nullish(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
}).passthrough();

export const ProductListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  images: z.array(ProductImageSchema).default([]),
  lowestPrice: z.number().nonnegative().default(0),
  discountPercentage: z.number().min(0).max(100).optional(),
  isGated: z.boolean().default(false),
  type: z.enum(['digital', 'physical', 'pod']).catch('physical'),
  collectionName: z.string().nullable(),
  thumbnail: z.string().optional(),
  isPurchasable: z.boolean().default(true),
  discountRuleset: z.boolean().optional(),
  gatedRuleset: z.boolean().optional(),
}).passthrough();

// Type exports from schemas
export type ProductImageType = z.infer<typeof ProductImageSchema>;
export type ProductSKUType = z.infer<typeof ProductSKUSchema>;
export type ProductPropertyType = z.infer<typeof ProductPropertySchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductListItemType = z.infer<typeof ProductListItemSchema>;
