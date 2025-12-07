/**
 * Product detail page - Client Component
 */

'use client';

import ProductCard from '@/components/product/ProductCard';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductGallery from '@/components/product/ProductGallery';
import { getProductBySlug, getProducts } from '@/lib/api/products';
import type { Product, ProductListItem } from '@/lib/types';
import { handleError } from '@/lib/utils/errorHandler';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="gap-8 lg:gap-16 lg:grid lg:grid-cols-2 items-start animate-pulse">
            <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
            <div className="w-full space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-100 rounded w-full"></div>
              <div className="h-6 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  const [related, setRelated] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Prevent double loading in React Strict Mode
    if (hasLoaded) return;

    async function load() {
      try {
        const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || 'bedishop1';
        const allProducts = await getProducts(shopName, { page: 1, limit: 8 });
        const relatedProducts = allProducts.data
          .filter(p => p.id !== currentProductId)
          .slice(0, 4);
        setRelated(relatedProducts);
        setHasLoaded(true);
      } catch (error) {
        handleError(error, 'Failed to load related products');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentProductId, hasLoaded]);

  if (loading || related.length === 0) return null;

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">You might also like</h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Prevent double loading in React Strict Mode
    if (hasLoaded && product?.slug === slug) return;

    async function load() {
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        setHasLoaded(true);
      } catch (error) {
        handleError(error, 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, hasLoaded, product?.slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  // JSON-LD structured data for product
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://store-sample.com';
  const today = new Date();
  const priceValidUntil = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const lowestPriceSku = product.skus.length > 0
    ? product.skus.reduce((lowest, sku) =>
        sku.price < lowest.price ? sku : lowest
      )
    : null;

  const isInStock = product.skus.some(sku =>
    !sku.inventory.policy || sku.inventory.quantity === -1 || sku.inventory.quantity > 0
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map(img => img.original),
    sku: product.skus[0]?.id || product.id,
    brand: {
      '@type': 'Brand',
      name: 'Store Sample',
    },
    offers: lowestPriceSku ? {
      '@type': 'Offer',
      url: `${baseUrl}/products/${slug}`,
      priceCurrency: 'USD',
      price: lowestPriceSku.price,
      availability: isInStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceValidUntil,
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium overflow-x-auto">
            <Link
              href="/"
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/products"
              className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="gap-8 lg:gap-16 lg:grid lg:grid-cols-2 items-start">
            {/* Left: Product Gallery - Sticky */}
            <div className="w-full lg:sticky lg:top-8 lg:self-start">
              <ProductGallery images={product.images} />
            </div>

            {/* Right: Product Info - Scrollable */}
            <div className="w-full space-y-6 sm:space-y-8 lg:space-y-10 mt-8 lg:mt-0">
              {/* Header */}
              <div className="space-y-3 sm:space-y-4">
                {product.collectionName && (
                  <Link
                    href={`/products?collection=${encodeURIComponent(product.collectionId || '')}`}
                    className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary hover:bg-indigo-100 transition-colors"
                  >
                    {product.collectionName}
                  </Link>
                )}

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl text-balance">
                  {product.title}
                </h1>

                {product.isGated && product.gatedDescription && (
                  <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-medium text-purple-800 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="flex-1">{product.gatedDescription}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div 
                className="prose prose-sm sm:prose-base prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Client-side variant selection and add to cart */}
              <ProductDetailClient product={product} />

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="border-t border-gray-100 pt-6 sm:pt-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/products?search=${encodeURIComponent(tag)}`}
                        className="rounded-full bg-gray-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16 sm:mt-20 lg:mt-24 border-t border-gray-100 pt-12 sm:pt-14 lg:pt-16">
            <RelatedProducts currentProductId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
