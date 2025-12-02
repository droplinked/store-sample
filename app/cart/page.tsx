'use client';

import { useCart } from '@/lib/hooks/useCart';
import { useState, useEffect } from 'react';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { LoadingCart } from '@/components/cart/LoadingCart';
import { CartList } from '@/components/cart/CartList';
import { OrderSummary } from '@/components/cart/OrderSummary';
import {
  handleError,
  handleSuccess,
  showLoading,
} from '@/lib/utils/errorHandler';
import toast from 'react-hot-toast';
import { getCart } from '@/lib/api/cart';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, isInitialized } = useCart();
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [localCart, setLocalCart] = useState(cart);

  // Fetch cart data only when cart page is opened
  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem('cart_id');
      
      if (!cartId) {
        return;
      }

      if (cart) {
        setLocalCart(cart);
        return;
      }

      setIsLoadingCart(true);
      try {
        const cartData = await getCart(cartId);
        setLocalCart(cartData);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load cart:', error);
        }
        localStorage.removeItem('cart_id');
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();
  }, [cart]);

  // Update local cart when context cart changes
  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!localCart?.checkoutUrl) {
      toast.error('Checkout URL not available');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    const toastId = showLoading('Redirecting to checkout...');

    try {
      window.location.href = localCart.checkoutUrl;
    } catch (error) {
      const errorMessage = handleError(
        error,
        'Failed to initiate checkout',
        false
      );
      toast.error(errorMessage, { id: toastId });
      setCheckoutError(errorMessage);
      setIsCheckingOut(false);
    }
  };

  const handleQuantityChange = async (skuId: string, quantity: number) => {
    try {
      await updateQuantity(skuId, quantity);
    } catch (error) {
      handleError(error, 'Failed to update quantity');
    }
  };

  const handleRemove = async (skuId: string) => {
    try {
      await removeItem(skuId);
      handleSuccess('Item removed from cart');
    } catch (error) {
      handleError(error, 'Failed to remove item');
    }
  };

  if (!isInitialized || isLoadingCart) {
    return <LoadingCart />;
  }

  if (!localCart || localCart.items.length === 0) {
    return <EmptyCart />;
  }

  const { financialDetails } = localCart;
  const subtotal = financialDetails.amounts.productTotal;
  const finalTotal = financialDetails.amounts.totalAmount;

  return (
    <div className="min-h-screen bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-12">
          Shopping Cart
        </h1>

        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartList
              items={localCart.items}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              finalTotal={finalTotal}
              checkoutError={checkoutError}
              isCheckingOut={isCheckingOut}
              itemsCount={localCart.items.length}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
