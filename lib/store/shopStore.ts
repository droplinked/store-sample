/**
 * Shop Zustand Store
 * Manages shop data, currency configuration, and theming
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shop, Currency } from '@/lib/types';

interface ShopState {
  shop: Shop | null;
  isLoading: boolean;
  error: string | null;
}

interface ShopActions {
  setShop: (shop: Shop) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearShop: () => void;
  formatPrice: (amount: number) => string;
}

type ShopStore = ShopState & { actions: ShopActions };

/**
 * Format price according to shop's currency configuration
 * Algorithm from AI_IMPLEMENTATION_GUIDE.md Section 3.2
 */
export function formatPrice(amount: number, currency: Currency): string {
  // 1. Round to decimal places
  const rounded = amount.toFixed(currency.decimalPlaces);

  // 2. Split into parts
  const parts = rounded.split('.');
  const whole = parts[0] || '0';
  const decimal = parts[1];

  // 3. Add thousands separator
  const withSeparator = whole.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    currency.thousandsSeparator
  );

  // 4. Join with decimal separator
  const formatted = decimal
    ? `${withSeparator}${currency.decimalSeparator}${decimal}`
    : withSeparator;

  // 5. Add currency symbol
  const space = currency.spaceBetweenAmountAndSymbol ? ' ' : '';

  return currency.symbolPosition === 'before'
    ? `${currency.symbol}${space}${formatted}`
    : `${formatted}${space}${currency.symbol}`;
}

/**
 * Shop store with Zustand
 * Persists shop data to localStorage
 */
export const useShopStore = create<ShopStore>()(
  persist(
    (set, get) => ({
      // State
      shop: null,
      isLoading: false,
      error: null,

      // Actions
      actions: {
        setShop: (shop) => {
          set({ shop, error: null });

          // Apply shop theme
          if (shop.design?.primaryColor) {
            document.documentElement.style.setProperty(
              '--color-primary',
              shop.design.primaryColor
            );
          }

          if (shop.backgroundColor) {
            document.documentElement.style.setProperty(
              '--color-background',
              shop.backgroundColor
            );
          }
        },

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error, isLoading: false }),

        clearShop: () => {
          set({ shop: null, error: null });
          // Clear from localStorage
          localStorage.removeItem('shop-storage');
        },

        formatPrice: (amount: number) => {
          const { shop } = get();
          if (!shop || !shop.currency) {
            // Fallback formatting
            return `$${amount.toFixed(2)}`;
          }
          return formatPrice(amount, shop.currency);
        },
      },
    }),
    {
      name: 'shop-storage',
      partialize: (state) => ({
        shop: state.shop,
      }),
    }
  )
);

// Convenience selectors
export const useShop = () => useShopStore((state) => state.shop);
export const useShopActions = () => useShopStore((state) => state.actions);
export const useShopLoading = () => useShopStore((state) => state.isLoading);
export const useShopError = () => useShopStore((state) => state.error);
