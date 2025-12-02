/**
 * Cart Item Row Component
 * 
 * @description
 * Renders a single cart item row in the shopping cart table.
 * Displays product image, details, quantity controls, and remove button.
 * 
 * @component
 * @example
 * ```tsx
 * import { CartItemRow } from '@/components/cart/CartItem';
 * 
 * <CartItemRow
 *   cartItem={item}
 *   onQuantityChange={(skuId, qty) => updateQuantity(skuId, qty)}
 *   onRemove={(skuId) => removeFromCart(skuId)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.cartItem - Cart item data
 * @param {string} props.cartItem.productId - Product ID
 * @param {string} props.cartItem.skuId - SKU ID
 * @param {string} props.cartItem.slug - Product slug for linking
 * @param {number} props.cartItem.quantity - Current quantity
 * @param {number} props.cartItem.price - Unit price
 * @param {string} props.cartItem.title - Product title
 * @param {string} props.cartItem.thumbnail - Product image URL
 * @param {string} [props.cartItem.collectionName] - Optional collection name
 * @param {Function} props.onQuantityChange - Callback for quantity updates
 * @param {Function} props.onRemove - Callback for item removal
 * 
 * @features
 * - Linked product image and title
 * - Increment/decrement quantity controls
 * - Real-time price calculation
 * - Remove button with icon
 * - Responsive layout
 * 
 * @accessibility
 * - Semantic table row structure
 * - aria-labels on buttons
 * - Keyboard navigable controls
 */

import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';

import { CartItem } from '@/lib/types';

interface CartItemRowProps {
  cartItem: CartItem;
  onQuantityChange: (skuId: string, quantity: number) => void;
  onRemove: (skuId: string) => void;
}

export function CartItemRow({
  cartItem,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-6 pr-6">
        <Link href={`/products/${cartItem.slug}`}>
          <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-slate-50 border border-slate-200">
            {cartItem.thumbnail && (
              <OptimizedImage
                src={cartItem.thumbnail}
                alt={cartItem.title}
                fill
                loading="lazy"
                className="object-cover"
                sizes="100px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg=="
                showSkeleton={true}
              />
            )}
          </div>
        </Link>
      </td>
      <td className="py-6 px-4">
        <Link
          href={`/products/${cartItem.slug}`}
          className="text-base font-bold text-slate-900 hover:text-slate-700 transition-colors"
        >
          {cartItem.title}
        </Link>
        <p className="text-sm text-slate-500 mt-1">
          {cartItem.productType || 'Product'}
        </p>
        {cartItem.sku?.attributes && cartItem.sku.attributes.length > 0 && (
          <p className="text-sm text-slate-500 mt-1">
            {cartItem.sku.attributes.map(attr => attr.caption).join(', ')}
          </p>
        )}
      </td>
      <td className="py-6 px-4 text-sm font-medium text-slate-900">
        ${cartItem.unitPrice.toFixed(2)}
      </td>
      <td className="py-6 px-4">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl w-fit px-2">
          <button
            onClick={() =>
              onQuantityChange(cartItem.skuId, cartItem.quantity - 1)
            }
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-2 py-1 text-sm font-semibold w-8 text-center">
            {cartItem.quantity}
          </span>
          <button
            onClick={() =>
              onQuantityChange(cartItem.skuId, cartItem.quantity + 1)
            }
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-6 px-4 text-right">
        <span className="text-base font-bold text-slate-900">
          ${cartItem.totalPrice.toFixed(2)}
        </span>
      </td>
      <td className="py-6 px-4 text-right">
        <button
          onClick={() => onRemove(cartItem.skuId)}
          className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          aria-label="Remove item"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}
