/**
 * Loading skeleton for products listing page
 */

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-96 bg-gray-100 rounded"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="space-y-6 animate-pulse">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <ul className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <li key={i}>
                      <div className="h-4 w-24 bg-gray-100 rounded"></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
              </div>
            </div>
          </aside>

          {/* Main content - Product grid skeleton */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg overflow-hidden border border-gray-100"
                >
                  {/* Image skeleton */}
                  <div className="aspect-square bg-gray-200"></div>

                  {/* Content skeleton */}
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

            {/* Pagination skeleton */}
            <div className="mt-12 flex items-center justify-center gap-2 animate-pulse">
              <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
              <div className="h-5 w-32 bg-gray-100 rounded"></div>
              <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
