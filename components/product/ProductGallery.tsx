/**
 * Product image gallery with thumbnail selector
 */

'use client';

import { useState, useEffect } from 'react';
import { ProductImage } from '@/lib/types';

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    setHighQualityLoaded(false);
  }, [selectedImageIndex]);

  // Preload adjacent images for faster switching
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadImages = [];
    
    // Preload next image
    if (selectedImageIndex < images.length - 1) {
      const nextImage = images[selectedImageIndex + 1];
      if (nextImage?.original) {
        const nextImg = new Image();
        nextImg.src = nextImage.original;
        preloadImages.push(nextImg);
      }
    }
    
    // Preload previous image
    if (selectedImageIndex > 0) {
      const prevImage = images[selectedImageIndex - 1];
      if (prevImage?.original) {
        const prevImg = new Image();
        prevImg.src = prevImage.original;
        preloadImages.push(prevImg);
      }
    }
  }, [selectedImageIndex, images]);

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
      {/* Preload first image */}
      {selectedImageIndex === 0 && (
        <link rel="preload" as="image" href={selectedImage.original} />
      )}

      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        {/* Loading skeleton with shimmer */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 z-10">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            {/* Pulsing overlay for extra visibility */}
            <div className="absolute inset-0 animate-pulse bg-slate-200/30" />
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-slate-300 mx-auto mb-2"
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
              <p className="text-xs text-slate-400">Failed to load image</p>
            </div>
          </div>
        )}

        {/* Low quality placeholder (thumbnail) - loads first */}
        <img
          key={`thumbnail-${selectedImageIndex}`}
          src={selectedImage.thumbnail}
          alt={selectedImage.alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            highQualityLoaded ? 'opacity-0' : 'opacity-100'
          } ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ filter: 'blur(8px)', transform: 'scale(1.1)' }}
          onLoad={() => {
            setImageLoading(false);
          }}
          onError={() => {
            setImageLoading(false);
          }}
        />

        {/* Loading indicator when high quality is loading */}
        {!imageLoading && !highQualityLoaded && !imageError && (
          <div className="absolute top-0 left-0 right-0 z-20">
            {/* YouTube/LinkedIn style progress bar */}
            <div className="h-1 bg-slate-200/30 overflow-hidden">
              <div className="h-full w-1/3 bg-primary animate-shimmer" />
            </div>
          </div>
        )}

        {/* High quality image - loads in background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`image-${selectedImageIndex}`}
          src={selectedImage.original}
          alt={selectedImage.alt}
          fetchPriority={selectedImageIndex === 0 ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            highQualityLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            setHighQualityLoaded(true);
            setImageError(false);
          }}
          onError={(e) => {
            console.error('Image failed to load:', selectedImage.original);
            setImageError(true);
          }}
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
              onMouseEnter={() => {
                // Preload image on hover for instant switching
                const img = new Image();
                img.src = image.original;
              }}
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
              <img
                src={image.thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
