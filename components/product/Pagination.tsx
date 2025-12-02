/**
 * Pagination Component
 */

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildPageUrl: (page: number) => string;
  hasMore: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  buildPageUrl,
  hasMore,
}: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasMore ? currentPage + 1 : null;

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {prevPage ? (
        <Link
          href={buildPageUrl(prevPage)}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg border border-gray-300 opacity-50 cursor-not-allowed"
        >
          Previous
        </button>
      )}
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      {nextPage ? (
        <Link
          href={buildPageUrl(nextPage)}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg border border-gray-300 opacity-50 cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  );
}
