/**
 * Product card component with responsive design
 */

'use client';

import Link from 'next/link';
import { Product, ProductListItem } from '@/lib/types';
import { formatPrice } from '@/lib/store/shopStore';
import { useShop } from '@/lib/store/shopStore';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/common/OptimizedImage';

interface ProductCardProps {
  product: Product | ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const shop = useShop();

  const currency = shop?.currency || {
    abbreviation: 'USD',
    code: 'USD',
    symbol: '$',
    conversionRateToUSD: 1,
    decimalPlaces: 2,
    decimalSeparator: '.',
    thousandsSeparator: ',',
    symbolPosition: 'before',
    spaceBetweenAmountAndSymbol: false,
  };

  // Handle different image structures (ProductImage vs old structure if any)
  const primaryImage = product.images?.[0] || {
    original: 'https://via.placeholder.com/300x300?text=No+Image',
    thumbnail: 'https://via.placeholder.com/300x300?text=No+Image',
    alt: product.title,
  };

  // Determine price
  const price = 'lowestPrice' in product 
    ? product.lowestPrice 
    : (product as Product).skus?.[0]?.price || 0;

  const discount = product.discountPercentage || 0;
  
  // Calculate original price if discount exists
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      prefetch={true}
      className="group block h-full rounded-2xl"
      aria-label={`View details for ${product.title}`}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-orange-500/10"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <OptimizedImage
            src={primaryImage.thumbnail || primaryImage.original}
            alt={primaryImage.alt || product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            showSkeleton={true}
          />

          {/* Liquid Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-orange-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute right-3 top-3 rounded-full bg-gradient-primary backdrop-blur-sm px-3 py-1 text-xs font-bold text-white shadow-sm">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Liquid Background Blob on Hover */}
          <div className="absolute inset-0 bg-linear-to-br from-orange-50/50 to-slate-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" />

          {/* Category/Collection */}
          {(('collectionName' in product && product.collectionName) || 
            ('collectionId' in product && product.collectionId)) && (
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-hover:text-orange-600 transition-colors">
              {'collectionName' in product && product.collectionName ? product.collectionName : 'Collection'}
            </p>
          )}

          {/* Name */}
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-gradient-primary transition-all">
            {product.title}
          </h3>

          {/* Price & Action */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">
                  {formatPrice(price, currency)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through decoration-slate-300">
                    {formatPrice(originalPrice, currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Hover Action Indicator */}
            <div
              className="h-10 w-10 rounded-full bg-gradient-primary text-white flex items-center justify-center opacity-0 transform translate-y-2 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-orange-500/30"
              aria-hidden="true"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
