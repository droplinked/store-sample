/**
 * Category Filter Sidebar
 */

import Link from 'next/link';

interface CategoryFilterProps {
  selectedCategory?: string;
}

// TODO: Fetch from API when endpoint is available
const CATEGORIES = [
  { id: 'testc', name: 'Test Collection' },
  { id: 'digital', name: 'Digital Products' },
  { id: 'public', name: 'Public Products' },
];

export default function CategoryFilter({ selectedCategory }: CategoryFilterProps) {
  return (
    <aside className="hidden lg:col-span-1 lg:block">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/products"
                className={`text-sm transition-colors ${
                  !selectedCategory
                    ? 'font-bold text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Products
              </Link>
            </li>
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.id)}`}
                  className={`text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'font-bold text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-sm font-medium text-slate-900">
            💡 Ready for Droplinked API?
          </p>
          <p className="text-xs text-slate-600">
            This store is structured to seamlessly swap mock data with real API calls.
          </p>
        </div>
      </div>
    </aside>
  );
}
