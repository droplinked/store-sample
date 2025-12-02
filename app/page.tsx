'use client';

import { getFeaturedProducts } from '@/lib/api/products';
import { ProductListItem } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  HeroSection,
  FeaturedProducts,
  FeaturesSection,
  CTASection,
} from '@/components/home';
import { handleError } from '@/lib/utils/errorHandler';

export default function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || 'bedishop1';
        const res = await getFeaturedProducts(4, shopName);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setProducts(res || []);
        }
      } catch (error) {
        if (isMounted) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error loading products:', error);
          }
          handleError(error, 'Failed to load featured products');
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    load();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-primary/20">
      <div className="fixed inset-0 -z-10 bg-white" />
      <HeroSection />
      <FeaturedProducts products={products} loading={loading} />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
