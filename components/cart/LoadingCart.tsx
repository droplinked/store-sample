/**
 * Loading Cart Component
 * 
 * @description
 * Loading state component displayed while cart data is being initialized.
 * Shows animated skeleton to prevent layout shift.
 * 
 * @component
 * @example
 * ```tsx
 * import { LoadingCart } from '@/components/cart/LoadingCart';
 * 
 * if (!isInitialized) {
 *   return <LoadingCart />;
 * }
 * ```
 * 
 * @features
 * - Animated pulse effect
 * - Centered layout
 * - Minimal, unobtrusive design
 * 
 * @performance
 * - Lightweight component
 * - CSS-only animations
 * - No external dependencies
 */

export function LoadingCart() {
  return (
    <div className="min-h-screen bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
          <div className="h-4 w-32 bg-gray-100 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
