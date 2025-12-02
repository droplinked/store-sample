/**
 * SKU Matching and Product Utilities
 * Implements algorithms from AI_IMPLEMENTATION_GUIDE.md Section 4.2
 */

import type { ProductSKU, Product } from '@/lib/types';

/**
 * Find matching SKU based on selected variant options
 * Algorithm from AI_IMPLEMENTATION_GUIDE.md Section 4.2
 *
 * @param product - The product containing all SKUs
 * @param selectedOptions - User's selected variant options (e.g., { color: "red", size: "L" })
 * @returns Matching SKU or null if no match found
 *
 * @example
 * const sku = findMatchingSku(product, { color: "red", size: "L" });
 * if (sku) {
 *   console.log(`Price: ${sku.price}`);
 * }
 */
export function findMatchingSku(
  product: Product,
  selectedOptions: Record<string, string>
): ProductSKU | null {
  // For digital products with single SKU
  if (product.type === 'digital' && product.skus.length === 1) {
    return product.skus[0] || null;
  }

  // Find SKU that matches all selected options
  return (
    product.skus.find((sku) => {
      // Skip if no attributes
      if (!sku.attributes || sku.attributes.length === 0) {
        return false;
      }

      // Check if ALL attributes match the selected options
      return sku.attributes.every(
        (attr) => selectedOptions[attr.key] === attr.value
      );
    }) || null
  );
}

/**
 * Get first available SKU (with stock)
 * Used for initializing default selection
 *
 * @param product - The product containing all SKUs
 * @returns First available SKU or first SKU if none available
 */
export function getFirstAvailableSku(product: Product): ProductSKU | null {
  if (product.skus.length === 0) return null;

  // For digital products, return first SKU
  if (product.type === 'digital') {
    return product.skus[0] || null;
  }

  // Find first SKU with stock
  const availableSku = product.skus.find((sku) => {
    // If inventory tracking is disabled, always available
    if (!sku.inventory.policy) return true;

    // If quantity is -1, unlimited stock
    if (sku.inventory.quantity === -1) return true;

    // If quantity > 0, in stock
    return sku.inventory.quantity > 0;
  });

  // Return available SKU or first SKU as fallback
  return availableSku || product.skus[0] || null;
}

/**
 * Get initial variant selection from a SKU
 * Converts SKU attributes to selectedOptions format
 *
 * @param sku - The SKU to get options from
 * @returns Record of variant key to value
 */
export function getInitialSelection(
  sku: ProductSKU
): Record<string, string> {
  if (!sku.attributes || sku.attributes.length === 0) {
    return {};
  }

  return sku.attributes.reduce(
    (acc, attr) => {
      acc[attr.key] = attr.value;
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Validate quantity against SKU inventory
 *
 * @param sku - The SKU to check
 * @param quantity - Desired quantity
 * @returns Object with isValid flag and error message if invalid
 */
export function validateQuantity(
  sku: ProductSKU,
  quantity: number
): { isValid: boolean; error?: string } {
  // Quantity must be positive integer
  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return {
      isValid: false,
      error: 'Quantity must be a positive integer',
    };
  }

  // If inventory tracking is disabled, any quantity is valid
  if (!sku.inventory.policy) {
    return { isValid: true };
  }

  // If quantity is -1, unlimited stock
  if (sku.inventory.quantity === -1) {
    return { isValid: true };
  }

  // Out of stock
  if (sku.inventory.quantity === 0) {
    return {
      isValid: false,
      error: 'This product is out of stock',
    };
  }

  // Check if quantity exceeds available stock
  if (quantity > sku.inventory.quantity) {
    return {
      isValid: false,
      error: `Only ${sku.inventory.quantity} available in stock`,
    };
  }

  return { isValid: true };
}

/**
 * Check if SKU is available for purchase
 *
 * @param sku - The SKU to check
 * @returns True if SKU is available
 */
export function isSkuAvailable(sku: ProductSKU): boolean {
  // If inventory tracking is disabled, always available
  if (!sku.inventory.policy) return true;

  // If quantity is -1, unlimited stock
  if (sku.inventory.quantity === -1) return true;

  // Check if in stock
  return sku.inventory.quantity > 0;
}

/**
 * Get variant options from product properties
 * Transforms properties into a usable format for variant selectors
 *
 * @param product - The product with properties
 * @returns Object mapping variant names to their options
 *
 * @example
 * // Returns: { color: [{value: "red", caption: "Red"}], size: [{value: "L", caption: "Large"}] }
 * const options = getVariantOptions(product);
 */
export function getVariantOptions(product: Product): Record<
  string,
  Array<{ value: string; caption: string }>
> {
  if (!product.properties || product.properties.length === 0) {
    return {};
  }

  return product.properties.reduce(
    (acc, property) => {
      acc[property.value] = property.items;
      return acc;
    },
    {} as Record<string, Array<{ value: string; caption: string }>>
  );
}

/**
 * Get display name for variant option
 *
 * @param product - The product
 * @param variantKey - The variant key (e.g., "color")
 * @returns Display name (e.g., "Color")
 */
export function getVariantDisplayName(
  product: Product,
  variantKey: string
): string {
  const property = product.properties.find((p) => p.value === variantKey);
  return property?.title || variantKey;
}
