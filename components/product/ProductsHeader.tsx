/**
 * Products Page Header
 */

interface ProductsHeaderProps {
  category?: string;
}

export default function ProductsHeader({ category }: ProductsHeaderProps) {
  const title = category ? `${category}` : 'All Products';
  const description = category
    ? `Browse our collection of ${category} products`
    : 'Browse our collection of premium products';

  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-slate-600">
        {description}
      </p>
    </div>
  );
}
