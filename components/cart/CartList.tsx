/**
 * Cart List Component
 * 
 * @description
 * Renders the shopping cart items in a table layout.
 * Provides a structured view of all cart items with headers.
 * 
 * @component
 * @example
 * ```tsx
 * import { CartList } from '@/components/cart/CartList';
 * 
 * <CartList
 *   items={cart.items}
 *   onQuantityChange={updateQuantity}
 *   onRemove={removeFromCart}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {CartItem[]} props.items - Array of cart items
 * @param {Function} props.onQuantityChange - Quantity update handler
 * @param {Function} props.onRemove - Item removal handler
 * 
 * @features
 * - Responsive table layout
 * - Column headers (Product, Details, Price, Qty, Total)
 * - Iterates through cart items
 * - Clean, bordered design
 * 
 * @accessibility
 * - Semantic table structure
 * - Column headers with proper scope
 * - Keyboard navigable
 * 
 * @responsive
 * - Desktop: Full table layout
 * - Mobile: Consider switching to card layout (future enhancement)
 */

import { CartItemRow } from './CartItem';

import { CartItem } from '@/lib/types';

interface CartListProps {
  items: CartItem[];
  onQuantityChange: (skuId: string, quantity: number) => void;
  onRemove: (skuId: string) => void;
}

export function CartList({ items, onQuantityChange, onRemove }: CartListProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-gray-100 bg-gray-50/50">
          <tr>
            <th className="py-4 pl-6 pr-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Product
            </th>
            <th className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Details
            </th>
            <th className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Price
            </th>
            <th className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Qty
            </th>
            <th className="py-4 px-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
              Total
            </th>
            <th className="py-4 px-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map(item => (
            <CartItemRow
              key={item.skuId}
              cartItem={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
