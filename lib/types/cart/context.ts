/**
 * Cart context types for React state management
 */

import type { Cart } from './cart';

/**
 * Cart context type for React Context API
 */
export interface CartContextType {
  cart: Cart | null;
  addToCart: (params: { skuId: string; quantity: number }) => Promise<void>;
  updateQuantity: (skuId: string, quantity: number) => Promise<void>;
  removeItem: (skuId: string) => Promise<void>;
  clearCart: () => void;
  isInitialized: boolean;
}
