/**
 * Featured Products Section Component
 * 
 * @description
 * Displays a curated selection of featured/trending products.
 * Includes loading skeleton for better UX during data fetching.
 * 
 * @component
 * @example
 * ```tsx
 * import { FeaturedProducts } from '@/components/home';
 * 
 * function HomePage() {
 *   const [products, setProducts] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     async function load() {
 *       const data = await getFeaturedProducts(4, shopName);
 *       setProducts(data);
 *       setLoading(false);
 *     }
 *     load();
 *   }, []);
 * 
 *   return <FeaturedProducts products={products} loading={loading} />;
 * }
 * ```
 * 
 * @param {Object} props - Component props
 * @param {ProductListItem[]} props.products - Array of featured products
 * @param {boolean} props.loading - Loading state indicator
 * 
 * @features
 * - Animated product grid with stagger effect
 * - Loading skeleton with shimmer animation
 * - Responsive grid layout (1-2-4 columns)
 * - "View All" link to products page
 * 
 * @performance
 * - Uses scroll-triggered animations (whileInView)
 * - Renders skeleton to prevent layout shift
 * - Optimized for Core Web Vitals
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { ProductListItem } from '@/lib/types';

/** Stagger animation configuration */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
} as const;

interface FeaturedProductsProps {
  products: ProductListItem[];
  loading: boolean;
}

function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl overflow-hidden border border-gray-100 bg-white"
        >
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-6 space-y-4">
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
            <div className="h-6 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
            <div className="flex items-center justify-between mt-6">
              <div className="h-7 w-24 bg-gray-200 rounded"></div>
              <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <section
      id="featured"
      className="py-20 relative"
      aria-labelledby="featured-heading"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-50/20 to-transparent -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2
              id="featured-heading"
              className="text-4xl font-black text-slate-900"
            >
              Trending <span className="text-gradient-primary">Now</span>
            </h2>
            <p className="mt-2 text-slate-500">Curated picks just for you</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 rounded-lg px-3 py-2"
            aria-label="View all products"
          >
            View All{' '}
            <span className="text-xl" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

        {loading ? (
          <FeaturedProductsSkeleton />
        ) : products && products.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map(product => (
              <motion.div key={product.id} variants={scaleIn}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
