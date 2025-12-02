/**
 * Product Grid with Client-side Data Fetching
 */

'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';
import Pagination from '@/components/product/Pagination';
import { getProducts } from '@/lib/api/products';
import { handleError } from '@/lib/utils/errorHandler';
import type { ProductListItem } from '@/lib/types';

interface ProductGridProps {
  page: number;
  category?: string;
}

export default function ProductGrid({ page, category }: ProductGridProps) {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const shopName = process.env.NEXT_PUBLIC_SHOP_NAME;
        
        if (!shopName) {
          throw new Error('NEXT_PUBLIC_SHOP_NAME environment variable is not set');
        }
        
        const response = await getProducts(shopName, {
          page,
          limit: 12,
          ...(category && { collectionId: category }),
        });
        
        setProducts(response.data);
        setTotal(response.total);
        setHasMore(response.hasMore);
      } catch (error) {
        handleError(error, 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [page, category]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / 12);

  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('page', pageNum.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        buildPageUrl={buildPageUrl}
        hasMore={hasMore}
      />
    </div>
  );
}
