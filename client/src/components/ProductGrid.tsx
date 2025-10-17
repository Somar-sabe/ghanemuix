import { useState, useMemo } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { FiltersBar } from './FiltersBar';
import { ProductGridSkeleton } from './LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onProductClick?: (product: Product) => void;
  showFilters?: boolean;
  initialCount?: number;
  layout?: 'grid' | 'list';
}

/**
 * Product Grid Component
 * Masonry-style responsive grid with filtering, sorting, and pagination
 * Staggered animation on initial load
 */
export function ProductGrid({
  products,
  loading = false,
  onProductClick,
  showFilters = true,
  initialCount = 9,
  layout = 'grid'
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'rating'>('score');
  const [displayCount, setDisplayCount] = useState(initialCount);

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [products, selectedCategory, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedProducts.length;

  if (loading) {
    return (
      <div className="space-y-4">
        {showFilters && (
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3">
            <div className="max-w-7xl mx-auto px-4 h-20 animate-pulse bg-muted rounded" />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ProductGridSkeleton count={initialCount} />
        </div>
      </div>
    );
  }

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or browse all categories
          </p>
          {selectedCategory !== 'all' && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedCategory('all')}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <FiltersBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex flex-col gap-4'
          }
          data-testid="product-grid"
        >
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              style={{
                animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              <ProductCard
                product={product}
                onClick={() => onProductClick?.(product)}
                layout={layout}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setDisplayCount(prev => prev + initialCount)}
              data-testid="button-load-more"
              className="min-w-[200px]"
            >
              Load More ({filteredAndSortedProducts.length - displayCount} remaining)
            </Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
