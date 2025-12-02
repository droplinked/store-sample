/**
 * Features Section Component
 * 
 * @description
 * Showcases the key features and benefits of the e-commerce platform.
 * Displays three feature cards with icons and descriptions.
 * 
 * @component
 * @example
 * ```tsx
 * import { FeaturesSection } from '@/components/home';
 * 
 * <FeaturesSection />
 * ```
 * 
 * @features
 * - Three animated feature cards
 * - Hover effects with rotation and scale
 * - Gradient backgrounds for visual appeal
 * - Sequential animation on scroll
 * 
 * @customization
 * Modify the `features` array to change displayed features:
 * ```typescript
 * const features = [
 *   { title: 'Custom Feature', desc: '...', icon: '🎯', color: '...' }
 * ];
 * ```
 * 
 * @accessibility
 * - Semantic section tags
 * - Descriptive headings
 * - High contrast colors
 */

'use client';

import { motion } from 'framer-motion';

/** Fade-in animation configuration */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const;

const features = [
  {
    title: 'Lightning Fast',
    desc: 'Optimized for speed, ensuring you never wait.',
    icon: '⚡',
    color:
      'bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 border-orange-100',
  },
  {
    title: 'Secure & Safe',
    desc: 'Your data is protected by bank-grade security.',
    icon: '🛡️',
    color:
      'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 border-slate-100',
  },
  {
    title: '24/7 Support',
    desc: "We're here for you, day and night.",
    icon: '💬',
    color:
      'bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600 border-rose-100',
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-20 bg-white/50 backdrop-blur-sm"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2
            id="features-heading"
            className="text-4xl font-black text-slate-900 mb-4"
          >
            Why Choose Us?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We believe in providing more than just products. We provide an
            experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`w-24 h-24 rounded-4xl ${feature.color} border flex items-center justify-center text-4xl mb-6 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
