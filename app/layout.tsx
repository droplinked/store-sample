import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/hooks/useCart';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { WebVitals } from '@/components/common/WebVitals';
import { ToastProvider } from '@/components/common/ToastProvider';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ShopInitializer } from '@/components/common/ShopInitializer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://store-sample.com';

export const metadata: Metadata = {
  title: 'Store Sample - Modern E-Commerce Storefront',
  description:
    'A production-grade e-commerce storefront built with Next.js 14, TypeScript, and Tailwind CSS. Ready to integrate with Droplinked API.',
  keywords: ['ecommerce', 'storefront', 'nextjs', 'typescript', 'tailwindcss'],
  authors: [{ name: 'Store Sample' }],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Store Sample - Modern E-Commerce Storefront',
    description:
      'A production-grade e-commerce storefront built with Next.js 14.',
    siteName: 'Store Sample',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store Sample - Modern E-Commerce Storefront',
    description:
      'A production-grade e-commerce storefront built with Next.js 14.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        {/* Prevent Dark Reader from modifying inline styles to avoid hydration mismatches */}
        <meta name="darkreader-lock" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://via.placeholder.com" />

        {/* Preconnect to critical origins */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Web Vitals monitoring */}
        <WebVitals />
        
        {/* Toast notifications */}
        <ToastProvider />

        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-slate-900 focus:px-6 focus:py-3 focus:text-white focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ShopInitializer />
          <CartProvider>
            <Header />
            <main id="main-content" className="min-h-screen bg-gray-50">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
