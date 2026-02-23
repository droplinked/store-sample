import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Droplinked S3 buckets - Virtual-hosted style (bucket.s3.amazonaws.com)
      {
        protocol: 'https',
        hostname: 'upload-file-droplinked.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'droplinked-assets.s3.amazonaws.com',
      },
      // Droplinked S3 buckets - Path-style (s3.amazonaws.com/bucket/**)
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/upload-file-droplinked/**',
      },
    ],
    // Enable modern image formats
    formats: ['image/avif', 'image/webp'],
    // Optimize image quality
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable React compiler for better performance (when available)
  reactStrictMode: true,

  // Optimize production builds
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Optimize bundle size
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Security headers (HIGH-3, HIGH-4, LOW-1)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Strict-Transport-Security (HSTS) - HIGH-3
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // X-Content-Type-Options - LOW-1
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Content-Security-Policy - HIGH-4
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data: blob: https://s3.amazonaws.com https://*.s3.amazonaws.com; font-src 'self'; connect-src 'self' https://api.io.droplinked.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
