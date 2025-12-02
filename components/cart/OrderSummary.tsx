/**
 * Order Summary Component
 *
 * @description
 * Displays order totals, discount codes, and checkout button.
 * Sticky sidebar component for cart and checkout flow.
 *
 */

import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  finalTotal: number;
  checkoutError?: string | null;
  isCheckingOut: boolean;
  itemsCount: number;
  onCheckout: () => void;
}

export function OrderSummary({
  subtotal,
  finalTotal,
  checkoutError,
  isCheckingOut,
  itemsCount,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 space-y-6 rounded-2xl bg-white p-8 border border-gray-100 shadow-lg">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-4 border-t border-gray-100 pt-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary">
            ${finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {checkoutError && (
        <div className="rounded-xl bg-red-50 p-4 border border-red-100">
          <p className="text-sm text-red-700 font-medium flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {checkoutError}
          </p>
        </div>
      )}

      <button
        onClick={onCheckout}
        disabled={itemsCount === 0 || isCheckingOut}
        className="w-full rounded-xl bg-slate-900 py-4 font-medium text-white hover:bg-slate-800 transition-colors relative overflow-hidden disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
      >
        {isCheckingOut ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Proceed to Checkout'
        )}
      </button>

      <Link
        href="/products"
        className="block text-center py-2 font-medium text-slate-500 hover:text-slate-900 transition-colors text-sm"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
