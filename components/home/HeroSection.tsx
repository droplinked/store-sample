/**
 * Hero Section Component
 * 
 * @description
 * The main hero/banner section displayed at the top of the homepage.
 * Features animated text and call-to-action buttons with Framer Motion animations.
 * 
 * @component
 * @example
 * ```tsx
 * import { HeroSection } from '@/components/home';
 * 
 * export default function HomePage() {
 *   return (
 *     <div>
 *       <HeroSection />
 *     </div>
 *   );
 * }
 * ```
 * 
 * @features
 * - Smooth fade-in and slide-up animations
 * - Staggered animation for child elements
 * - Responsive design for mobile/tablet/desktop
 * - Accessibility: semantic HTML with proper ARIA labels
 * - Call-to-action buttons for product browsing
 * 
 * @accessibility
 * - Uses semantic <section> tag
 * - aria-label for screen readers
 * - Keyboard navigable buttons
 * 
 * @performance
 * - Client component for animations
 * - Optimized motion variants
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/** Animation configuration for fade-in and slide-up effect */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const;

/** Animation configuration for staggered children animations */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

export function HeroSection() {
  return (
    <section
      className="relative px-4 pt-24 pb-16 sm:px-6 lg:px-8"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left space-y-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
            >
              <span className="flex h-2 w-2 rounded-full bg-slate-900 mr-2"></span>
              New Season Arrivals
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl text-balance"
            >
              Premium Style <br />
              For <span className="text-slate-700">Everyone.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 max-w-lg leading-relaxed"
            >
              Discover a shopping experience that combines elegance with
              energy. Curated, premium, and effortlessly sophisticated.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-base font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Start Exploring
              </Link>
              <Link
                href="#featured"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-8 py-4 text-base font-medium text-slate-900 hover:border-slate-900 transition-colors"
              >
                View Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
