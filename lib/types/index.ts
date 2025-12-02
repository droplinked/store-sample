/**
 * Consolidated type definitions for the e-commerce storefront
 * Based on Droplinked API specification
 */

// Export all types from individual modules
export * from './shop';
export * from './product';
export * from './cart';
export * from './common';

// Re-export Zod schemas
export {
  ShopSchema,
  CurrencySchema,
  PaymentMethodSchema,
} from './shop';

export {
  ProductSchema,
  ProductSKUSchema,
  ProductPropertySchema,
  ProductImageSchema,
  ProductListItemSchema,
} from './product';

export {
  CartSchema,
  CartItemSchema,
  AddressSchema,
  ShippingOptionSchema,
  ShippingRateSchema,
  FinancialDetailsSchema,
  QuantityInputSchema,
  VariantSelectionInputSchema,
  AddToCartInputSchema,
  UpdateCartItemInputSchema,
  RemoveCartItemInputSchema,
} from './cart/';

export {
  ApiResponseSchema,
  PaginatedResponseSchema,
  ApiErrorResponseSchema,
} from './common';

// Backwards compatibility aliases
import { ProductSchema } from './product';
import { CartSchema, CartItemSchema } from './cart/';

export const BackendProductSchema = ProductSchema;
export const BackendCartSchema = CartSchema;
export const BackendCartItemSchema = CartItemSchema;
