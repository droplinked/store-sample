/**
 * Product image gallery with thumbnail selector
 */

'use client';

import { useState } from 'react';
import { ProductImage } from '@/lib/types';
import { OptimizedImage } from '@/components/common/OptimizedImage';

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        <OptimizedImage
          src={selectedImage.original}
          alt={selectedImage.alt}
          fill
          priority={selectedImageIndex === 0}
          loading={selectedImageIndex === 0 ? undefined : 'lazy'}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg=="
          showSkeleton={selectedImageIndex !== 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all ${
                selectedImageIndex === index
                  ? 'border-primary shadow-md scale-105'
                  : 'border-transparent hover:border-gray-200'
              }`}
              role="tab"
              aria-selected={selectedImageIndex === index}
              aria-label={`View image ${index + 1}: ${image.alt}`}
              type="button"
            >
              <OptimizedImage
                src={image.thumbnail}
                alt={`Thumbnail ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="80px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg=="
                showSkeleton={true}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
