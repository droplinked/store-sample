/**
 * Optimized Image Component with Lazy Loading
 * 
 * @description
 * Enhanced Next.js Image component with lazy loading, blur placeholder,
 * and loading skeleton for better user experience.
 * 
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/product.jpg"
 *   alt="Product name"
 *   width={400}
 *   height={400}
 *   priority={false}
 * />
 * ```
 */

'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  showSkeleton?: boolean;
}

export function OptimizedImage({
  showSkeleton = true,
  className = '',
  src,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Loading Skeleton with Shimmer */}
      {showSkeleton && isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          {/* Pulsing overlay for extra visibility */}
          <div className="absolute inset-0 animate-pulse bg-slate-200/30" />
        </div>
      )}

      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <Image
          {...props}
          src={src}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
