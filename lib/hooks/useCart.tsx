'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { Cart, CartContextType } from '@/lib/types';
import {
  addProductToCart,
  createCart,
  getCart,
  removeCartProduct,
  updateCartProductQuantity,
} from '@/lib/api/cart';

const CART_STORAGE_KEY = 'cart_id';

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasCheckedCart, setHasCheckedCart] = useState(false);

  // Only check cart once on mount, don't fetch from API on every refresh
  useEffect(() => {
    if (hasCheckedCart) return;

    const initializeCart = async () => {
      const cartId = localStorage.getItem(CART_STORAGE_KEY);
      
      if (!cartId) {
        setIsInitialized(true);
        setHasCheckedCart(true);
        return;
      }

      // Only fetch cart if we're going to use it (e.g., on cart page)
      // For now, just mark as initialized without fetching
      setIsInitialized(true);
      setHasCheckedCart(true);
    };

    initializeCart();
  }, [hasCheckedCart]);

  const createNewCart = async (): Promise<string> => {
    // Try to get shopId from shop store first, fallback to env
    const shopStore = (await import('@/lib/store/shopStore')).useShopStore.getState();
    const shopId = shopStore.shop?.id || process.env.NEXT_PUBLIC_SHOP_ID;
    
    if (!shopId) {
      throw new Error('Shop ID is not configured. Please ensure shop data is loaded.');
    }

    const cartData = await createCart({
      shopId,
      returnUrl: `${window.location.origin}`,
    });

    if (!cartData || !cartData.id) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Invalid cart data received:', cartData);
      }
      throw new Error('Failed to create cart: Invalid response from server');
    }

    localStorage.setItem(CART_STORAGE_KEY, cartData.id);
    setCart(cartData);
    return cartData.id;
  };

  const addToCart = useCallback(
    async (params: { skuId: string; quantity: number }) => {
      try {
        let cartId = localStorage.getItem(CART_STORAGE_KEY);

        // If no cart exists, create one
        if (!cartId) {
          cartId = await createNewCart();
        }

        // If cart state is empty but we have cartId, fetch it first
        if (!cart && cartId) {
          try {
            const existingCart = await getCart(cartId);
            setCart(existingCart);
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.error('Failed to fetch existing cart, creating new one:', error);
            }
            localStorage.removeItem(CART_STORAGE_KEY);
            cartId = await createNewCart();
          }
        }

        const cartData = await addProductToCart(cartId, params);
        setCart(cartData);
        toast.success('Added to cart!');
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Add to cart error:', error);
        }
        toast.error('Failed to add to cart');
        throw error;
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(async (skuId: string, quantity: number) => {
    try {
      const cartId = localStorage.getItem(CART_STORAGE_KEY);
      if (!cartId) return;

      const cartData = await updateCartProductQuantity(cartId, skuId, quantity);
      setCart(cartData);
    } catch (error) {
      toast.error('Failed to update quantity');
      throw error;
    }
  }, []);

  const removeItem = useCallback(async (skuId: string) => {
    try {
      const cartId = localStorage.getItem(CART_STORAGE_KEY);
      if (!cartId) return;

      const cartData = await removeCartProduct(cartId, skuId);
      setCart(cartData);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
      throw error;
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart(null);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const value: CartContextType = {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isInitialized,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook to use cart context
/**
 * Hook to access cart context
 * Must be used within a CartProvider
 *
 * @returns Cart context with state and actions
 * @throws Error if used outside of CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
