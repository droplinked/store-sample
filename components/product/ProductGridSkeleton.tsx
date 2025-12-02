/**
 * Product Grid Skeleton - Loading state
 */

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg overflow-hidden border border-gray-100 bg-white"
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
  );
}
