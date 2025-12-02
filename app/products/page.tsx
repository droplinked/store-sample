/**
 * Products listing page with filtering and pagination
 * 
 * REFACTORED: Split into smaller, reusable components
 * - ProductsHeader: Page title and description
 * - CategoryFilter: Sidebar with category links
 * - ProductGrid: Main product grid with data fetching
 * - ProductGridSkeleton: Loading state
 * - Pagination: Page navigation
 */

'use client';

import { useSearchParams } from 'next/navigation';
import ProductsHeader from '@/components/product/ProductsHeader';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductGrid from '@/components/product/ProductGrid';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || undefined;

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ProductsHeader category={category} />

        <div className="grid gap-8 lg:grid-cols-5">
          <CategoryFilter selectedCategory={category} />

          <div className="lg:col-span-4">
            <ProductGrid page={page} category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
