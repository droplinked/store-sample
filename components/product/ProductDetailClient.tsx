/**
 * Client component for product detail page
 * Handles variant selection and dynamic price updates
 * Requirements: 2.2, 2.3, 2.4
 */

'use client';

import { useState } from 'react';
import { Product, ProductSKU } from '@/lib/types';
import AddToCartButton from './AddToCartButton';
import SKUSelector from './SKUSelector';


interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  // Initialize with first available SKU
  const [selectedSku, setSelectedSku] = useState<ProductSKU | null>(
    product.skus.find(sku => 
      !sku.inventory.policy || 
      sku.inventory.quantity === -1 || 
      sku.inventory.quantity > 0
    ) || product.skus[0] || null
  );

  // Check if SKU is in stock
  const isInStock = selectedSku
    ? !selectedSku.inventory.policy || 
      selectedSku.inventory.quantity === -1 || 
      selectedSku.inventory.quantity > 0
    : false;

  const displayStock = selectedSku?.inventory.quantity;
  const displayPrice = selectedSku?.price || 0;
  const displayRawPrice = selectedSku?.rawPrice;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Price & Stock */}
      <div className="space-y-3 sm:space-y-4 border-y border-gray-100 py-6 sm:py-8">
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl font-bold text-primary">
            ${displayPrice.toFixed(2)}
          </span>
          {displayRawPrice && displayRawPrice > displayPrice && (
            <>
              <span className="text-lg sm:text-xl text-gray-400 line-through decoration-gray-300">
                ${displayRawPrice.toFixed(2)}
              </span>
              {(() => {
                const discount = Math.round(
                  ((displayRawPrice - displayPrice) / displayRawPrice) * 100
                );
                return discount > 0 ? (
                  <span className="rounded-full bg-red-500 px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-bold text-white shadow-sm">
                    Save {discount}%
                  </span>
                ) : null;
              })()}
            </>
          )}
        </div>
        <p className="flex items-center gap-2 text-xs sm:text-sm font-medium">
          {isInStock ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-500 shrink-0"></span>
              <span className="text-green-700">
                In Stock & Ready to Ship
                {displayStock !== undefined &&
                  displayStock !== -1 &&
                  displayStock > 0 &&
                  ` (${displayStock} available)`}
              </span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500 shrink-0"></span>
              <span className="text-red-700">Out of Stock</span>
            </>
          )}
        </p>
      </div>

      {/* Variant Selection (SKU Selection) */}
      {product.skus.length > 1 && (
        <div className="border-b border-gray-100 pb-6 sm:pb-8">
          <SKUSelector
            skus={product.skus}
            selectedSku={selectedSku}
            onSkuChange={setSelectedSku}
          />
        </div>
      )}

      {/* Add to Cart */}
      <div className="pt-2 sm:pt-4">
        {isInStock ? (
          <AddToCartButton
            selectedSku={selectedSku}
          />
        ) : (
          <button
            disabled
            className="w-full rounded-xl bg-gray-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-gray-500 cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
