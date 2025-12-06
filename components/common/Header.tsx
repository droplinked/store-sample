'use client';

import Link from 'next/link';
import { useCart } from '@/lib/hooks/useCart';
import { Search, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-slate-900 text-xl font-bold tracking-wider hover:text-orange-600 transition-colors rounded-lg px-2 py-1"
          aria-label="Store home"
        >
          STORE
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8" role="navigation">
          <Link
            href="/products"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium rounded-lg px-3 py-2"
          >
            Shop
          </Link>
          <Link
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium rounded-lg px-3 py-2"
          >
            Collections
          </Link>
          <Link
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium rounded-lg px-3 py-2"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium rounded-lg px-3 py-2"
          >
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            className="text-slate-600 hover:text-slate-900 transition-colors rounded-lg p-2"
            aria-label="Search products"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <button
            className="text-slate-600 hover:text-slate-900 transition-colors rounded-lg p-2"
            aria-label="User account"
          >
            <User size={20} aria-hidden="true" />
          </button>
          <Link
            href="/cart"
            className="relative text-slate-600 hover:text-slate-900 transition-colors rounded-lg p-2"
            aria-label={`Shopping cart with ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-bold text-white"
                  aria-hidden="true"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </nav>
    </header>
  );
}
