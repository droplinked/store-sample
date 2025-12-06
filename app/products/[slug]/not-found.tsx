import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Product Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It
          may have been removed or is no longer available.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Browse all products
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
