/**
 * Add to cart button with quantity selector
 */

'use client';

import { useCart } from '@/lib/hooks/useCart';
import { ProductSKU } from '@/lib/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface AddToCartButtonProps {
  selectedSku?: ProductSKU | null;
}

export default function AddToCartButton({
  selectedSku,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSku) return;
    
    setIsAdding(true);
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    await addToCart({ skuId: selectedSku.id, quantity });
    setIsAdding(false);
    setQuantity(1);
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (!selectedSku) {
    return (
      <button
        disabled
        className="w-full rounded-full bg-gray-100 py-4 text-base font-bold text-gray-400 cursor-not-allowed"
      >
        Please select a variant
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div
        className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2"
        role="group"
        aria-label="Quantity selector"
      >
        <button
          onClick={decrement}
          className="h-10 w-10 rounded-full text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all text-xl font-medium"
          aria-label="Decrease quantity"
          type="button"
        >
          −
        </button>
        <span
          className="w-12 text-center text-lg font-bold text-slate-900"
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </span>
        <button
          onClick={increment}
          className="h-10 w-10 rounded-full text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all text-xl font-medium"
          aria-label="Increase quantity"
          type="button"
        >
          +
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isAdding}
        className="flex-1 rounded-xl bg-slate-900 py-4 text-base font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:bg-linear-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer"
        aria-label={`Add ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`}
        type="button"
      >
        {isAdding ? (
          <div className="flex items-center justify-center gap-2">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
              role="status"
              aria-label="Adding to cart"
            />
            <span>Adding...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Add to Cart
          </span>
        )}
      </motion.button>
    </div>
  );
}
