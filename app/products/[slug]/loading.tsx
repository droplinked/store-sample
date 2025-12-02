/**
 * Loading skeleton for product detail page
 */

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb skeleton */}
      <div className="border-b border-gray-100 px-4 py-6 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <span className="text-gray-300">/</span>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <span className="text-gray-300">/</span>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Product Detail skeleton */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left: Product Gallery skeleton */}
            <div className="animate-pulse">
              {/* Main image */}
              <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Right: Product Info skeleton */}
            <div className="space-y-10 animate-pulse">
              {/* Header */}
              <div className="space-y-4">
                <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                <div className="h-12 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-3/4 bg-gray-200 rounded"></div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 bg-gray-100 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-100 pb-8 space-y-3">
                <div className="h-5 w-full bg-gray-100 rounded"></div>
                <div className="h-5 w-full bg-gray-100 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-100 rounded"></div>
              </div>

              {/* Price and variant selection area */}
              <div className="space-y-6">
                <div className="h-10 w-32 bg-gray-200 rounded"></div>

                {/* Variant selectors */}
                <div className="space-y-4">
                  <div>
                    <div className="h-4 w-16 bg-gray-100 rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
                  </div>
                  <div>
                    <div className="h-4 w-12 bg-gray-100 rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                {/* Quantity selector */}
                <div>
                  <div className="h-4 w-20 bg-gray-100 rounded mb-2"></div>
                  <div className="h-12 w-32 bg-gray-100 rounded-lg"></div>
                </div>

                {/* Add to cart button */}
                <div className="h-14 w-full bg-gray-200 rounded-xl"></div>
              </div>

              {/* Product Specs */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-gray-100 pt-10 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-16 bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="border-t border-gray-100 pt-8">
                <div className="h-4 w-12 bg-gray-100 rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-20 bg-gray-100 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Long Description */}
              <div className="border-t border-gray-100 pt-8 space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products skeleton */}
          <div className="mt-24 border-t border-gray-100 pt-16">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-3 w-16 bg-gray-100 rounded"></div>
                      <div className="h-5 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                        <div className="h-9 w-9 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
