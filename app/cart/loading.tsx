/**
 * Loading skeleton for cart page
 */

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="animate-pulse mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded"></div>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          {/* Cart Items skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <div className="flex gap-4 animate-pulse">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  <div className="h-3 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Cart items */}
              <div className="divide-y divide-gray-100">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="px-6 py-6 animate-pulse">
                    <div className="flex gap-6">
                      {/* Image skeleton */}
                      <div className="h-24 w-24 bg-gray-200 rounded-xl shrink-0"></div>

                      {/* Details skeleton */}
                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-48 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-100 rounded"></div>

                        <div className="flex items-center gap-8 mt-4">
                          <div className="h-4 w-16 bg-gray-100 rounded"></div>
                          <div className="h-10 w-28 bg-gray-100 rounded-xl"></div>
                          <div className="h-5 w-20 bg-gray-200 rounded"></div>
                        </div>
                      </div>

                      {/* Remove button skeleton */}
                      <div className="h-8 w-8 bg-gray-100 rounded-full shrink-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 rounded-2xl bg-white p-8 border border-gray-100 shadow-lg animate-pulse">
              {/* Title */}
              <div className="h-6 w-40 bg-gray-200 rounded"></div>

              {/* Summary items */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between">
                  <div className="h-5 w-20 bg-gray-100 rounded"></div>
                  <div className="h-5 w-24 bg-gray-100 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-gray-100 rounded"></div>
                  <div className="h-5 w-20 bg-gray-100 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-5 w-16 bg-gray-100 rounded"></div>
                  <div className="h-5 w-20 bg-gray-100 rounded"></div>
                </div>
              </div>

              {/* Coupon input skeleton */}
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
                <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-end">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Checkout button skeleton */}
              <div className="h-14 w-full bg-gray-200 rounded-xl"></div>

              {/* Continue shopping link skeleton */}
              <div className="h-5 w-40 bg-gray-100 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
