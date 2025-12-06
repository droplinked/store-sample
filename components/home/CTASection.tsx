/**
 * Call-to-Action (CTA) Section Component
 * 
 * @description
 * Final call-to-action section encouraging users to start shopping.
 * Features animated heading and prominent CTA button.
 * 
 * @component
 * @example
 * ```tsx
 * import { CTASection } from '@/components/home';
 * 
 * <CTASection />
 * ```
 * 
 * @features
 * - Scroll-triggered animations
 * - Large, prominent CTA button
 * - Gradient background on button
 * - Hover effects for interactivity
 * 
 * @accessibility
 * - aria-label for screen readers
 * - High contrast button
 * - Focus indicators
 * 
 * @performance
 * - Optimized animation with Framer Motion
 * - Lazy animation trigger (whileInView)
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20" aria-label="Call to action">
      <div className="mx-auto max-w-4xl text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-slate-900 mb-8"
        >
          Ready to dive in?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-10 py-5 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Shopping Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
