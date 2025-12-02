/**
 * Empty Cart Component
 * 
 * @description
 * Displays when the shopping cart is empty.
 * Shows a friendly message and CTA to start shopping.
 * 
 * @component
 * @example
 * ```tsx
 * import { EmptyCart } from '@/components/cart/EmptyCart';
 * 
 * if (cart.items.length === 0) {
 *   return <EmptyCart />;
 * }
 * ```
 * 
 * @features
 * - Empty state illustration (shopping bag icon)
 * - Helpful message guiding users
 * - "Start Shopping" CTA button
 * - Centered, responsive layout
 * 
 * @accessibility
 * - Clear heading structure
 * - Descriptive text
 * - High contrast button
 * 
 * @design
 * - Clean, minimalist design
 * - Friendly messaging
 * - Encourages user action
 */

import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. Explore
            our products to find something you love.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
